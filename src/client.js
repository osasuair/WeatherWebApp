let latitude = "45.4235";
let longitude = "-75.6979";
const d = new Date();
let day = d.getDay();
let weather;

function init() {
    getWeather();
}

/* 
Draws Top of Page
 */
function renderTop() {
    let top = document.getElementById("titleDate");
    
    let date = document.createElement("h2");
    date.setAttribute("class", "col-sm")
    date.innerText = `${d.getFullYear()}/${d.getMonth()+1}/${d.getDate()}`
    top.appendChild(date);

    top.innerHTML += `<h2 class="col-sm">Current Temp: ${Math.round(weather.hourly.temperature_2m[d.getHours()-1])} ${weather.hourly_units.temperature_2m}<br>Latitude: ${latitude} -- Longitude: ${longitude}</h2>`
}

function renderDays() {
    let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let days = document.getElementById("days");
    

    for(let i = 0; i< 7; ++i) {
        days.innerHTML += `<div id="${week[i]}" class="col-sm day rounded"></div>`
        let dayD = document.getElementById(week[i]);
        dayD.innerHTML += `<h1>${week[(i+day)%7]}</h1>`;
        dayD.innerHTML += `<p id="currentTemp">${Math.round((weather.hourly.temperature_2m.slice(i*24, (i+1)*24).reduce((prev, curr) => prev+curr))/24)} ${weather.hourly_units.temperature_2m}<p>`

        dayD.innerHTML +=`<p>Temperature Max: ${weather.daily.temperature_2m_max[i]} ${weather.daily_units.temperature_2m_max}</p>
                       <p>Temperature Min: ${weather.daily.temperature_2m_min[i]} ${weather.daily_units.temperature_2m_min}</p>`;
        for(let j = 0; j< 24; ++j) {
            dayD.innerHTML += `<p>${((j+11)%12)+1}:00 ${j<12?"am" : "pm"} -> ${weather.hourly.temperature_2m[(i*24)+j]} ${weather.hourly_units.temperature_2m} &ensp;</p>`
        }
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

            renderTop();
            renderDays();
		}
    }
    //request one question from a web server
	xhttp.open("GET", "https://api.open-meteo.com/v1/forecast?latitude="+latitude+"&longitude="+longitude+"&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York");
	xhttp.send(); 
}