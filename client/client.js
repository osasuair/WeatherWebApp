let weather;

function init() {
    getWeather();
}

function renderTop() {
    let top = document.getElementById("titleDate");
    let title = document.createElement("h1");
    title.innerText = "Weather App";
    top.appendChild(title);

    let date = document.createElement("h2");
    const d = new Date();
    date.innerText = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
    top.appendChild(date);

    return d.getDay();
}

function renderDays(day) {
    let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let days = document.getElementById("days");

    for(let i = 0; i< 7; ++i) {
        days.innerHTML += `<p>Day: ${week[(i+day)%7]}<br>
                                Temperature Max: ${weather.daily.temperature_2m_max[i]} ${weather.daily_units.temperature_2m_max}<br>
                                Temperature Min: ${weather.daily.temperature_2m_min[i]} ${weather.daily_units.temperature_2m_min}<br>
                           <p>`;
        days.innerHTML += "<br><br>"
    }
}

function getWeather() {
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        //If the response is available and was successful
		if(this.readyState==4 && this.status==200){
			//Take the response text (that is in JSON format), parse it into JS object
			weather = JSON.parse(this.responseText);
            console.log(weather); //look at the object; what keys does it have?

            let day = renderTop();
            renderDays(day);
		}
    }
    //request one question from a web server
	xhttp.open("GET", "https://api.open-meteo.com/v1/forecast?latitude=45.4235&longitude=-75.6979&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York");
	xhttp.send(); 
}