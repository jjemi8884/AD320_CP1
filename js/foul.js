//Duck weather
const btnWeather = document.getElementById("btnWeather");
const disWeather = document.getElementById("weatherDiv");
const zipWeahter = document.getElementById("zipWeather");
const zipCodeBx = document.getElementById("zipcode");
const zipSec = document.getElementById("zipSection");

btnWeather.addEventListener('click', getWeatherURL);

function getWeatherURL(){
    
    
    let url = "https://api.weather.gov/points/47.2355,-122.1292";
    
    fetch(url)
    .then((response) => {
        if (!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        getLocalWeather(data.properties.forecast);
    })
   
}

function getLocalWeather(url){
    fetch(url)
    .then((response) => {
        if(!response.ok){
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
            let forcast = data.properties.periods[0];
            updateFoulWeather(forcast);
        })
}

function updateFoulWeather(forcast){
    let temp = forcast.temperature;
    let rainPercent = forcast.probabilityOfPrecipitation.value;
    let wind = forcast.windSpeed;
    disWeather.innerHTML = `
    <p>Current Temp is ${temp}</p>
    <p>${rainPercent}% chance of rain</p>
    <p>Current wind is ${wind}
    <div>${duckMood(temp, rainPercent,wind)}</div>
    `;
    zipSec.classList.remove("hidden");
}

function duckMood(temp, rain, wind){
    let re = new RegExp("\d")
    let intWind = re.exec(wind);
    if(temp > 30 && temp < 80 && rain > 50 && intWind < 10){
       
        return `<h2> This is a amazing duck day, good chance of rain, not to hot and no snow</h2>
                <img src= "images/Happy Duck.png" alt="A happy mallard duck with its beak open"/>
                <p>image source: https://img.fotocommunity.com/a-happy-duck-is-a-happy-duck-cc3352a8-32a5-4557-a9a2-3b18fa45271a.jpg?height=1080</p> 
                `
    }else if (temp > 30 && temp < 80 && intWind < 10  ){
        return `<h2> This is good duck day, no rain, not to hot and no snow, a good lazy day</h2>
                <img src= "images/meDuck.png" alt="A sleeping white puff duck"/>
                <p>image source: Shot by me, that is the famous duck Puffy</p> 
                `
    }else {
        return `<h2> This is not a good duck day and we are just waiting for it to be over!</h2>
                <img src = "images/madDuck.png" alt="a image of a mad duck looking at the water" />
                <p>image source: https://live.staticflickr.com/4096/4936089974_6cdd131d91_b.jpg </p>
                
                `

    }
}

//the button
const bzip = document.getElementById("btnZip");
const zipInput = document.getElementById("zipcode");

zipInput.addEventListener("input", (e) => {
    
})
  