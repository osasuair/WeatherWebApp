let weather;

function init() {
    getWeather();
}

function renderPage() {
    
}

function getWeather() {
    xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
        //If the response is available and was successful
		if(this.readyState==4 && this.status==200){
			//Take the response text (that is in JSON format), parse it into JS object
			weather = JSON.parse(this.responseText);
            console.log(weather); //look at the object; what keys does it have?
		}
    }
    //request one question from a web server
	xhttp.open("GET", "https://api.open-meteo.com/v1/forecast?latitude=45.4235&longitude=-75.6979&hourly=temperature_2m,rain&daily=temperature_2m_max,temperature_2m_min&timezone=America%2FNew_York");
	xhttp.send(); 
}