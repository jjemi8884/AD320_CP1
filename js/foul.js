"use strict";

//Duck weather
const btnWeather = document.getElementById("btnWeather");
const weatherData = document.getElementById("weatherData");
const zipWeahter = document.getElementById("zipWeather");
const zipCodeBx = document.getElementById("zipcode");
const zipSec = document.getElementById("zipSection");
const weatherPic = document.getElementById("weatherPic");
const cityDisplay = document.getElementById("city");


btnWeather.addEventListener('click', getHomeWeather);
//this is near the farm
const homeUrl = "https://api.weather.gov/points/47.2355,-122.1292";

function getHomeWeather(){
    getWeatherURL(homeUrl);
    cityDisplay.innerHTML="Just south of Seattle the current weather is:";
}


function getWeatherURL(url){
     
    
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
    weatherData.innerHTML = `
        <p>Temp is ${temp}</p>
        <p>${rainPercent}% chance of rain</p>
        <p>wind is ${wind}
    `;
    weatherPic.innerHTML=`
        <div>${duckMood(temp, rainPercent,wind)}</div>
    `;
    zipSec.classList.remove("hidden");
}

function duckMood(temp, rain, wind){
    let re = new RegExp("\d")
    let intWind = re.exec(wind);
    if(temp > 32 && temp < 80 && rain > 50 && intWind < 10){
       
        return `<h2> This is a amazing duck weather, good chance of rain, not to hot and not freezing out!</h2>
                <img src= "images/Happy Duck.png" width=500px alt="A happy mallard duck with its beak open"/>
                <p>image source: https://img.fotocommunity.com/a-happy-duck-is-a-happy-duck-cc3352a8-32a5-4557-a9a2-3b18fa45271a.jpg?height=1080</p> 
                `
    }else if (temp > 32 && temp < 80 && intWind < 10  ){
        return `<h2> This is good duck weather, no rain, not to hot and no snow, a good lazy day</h2>
                <img src= "images/meDuck.png" width=500px alt="A sleeping white puff duck"/>
                <p>image source: Shot by me, that is the famous duck Puffy</p> 
                `
    }else {
        return `<h2> This horrible duck weather, a good duck day and we are just waiting for it to be over!</h2>
                <img src = "images/madDuck.png" width=500px alt="a image of a mad goose looking at the water" />
                <p>image source: https://live.staticflickr.com/4096/4936089974_6cdd131d91_b.jpg </p>
                
                `

    }
}

const zipButton = document.getElementById("btnZip");
const zipcodeInput = document.getElementById("zipcode");
const zipDisplay = document.getElementById("zipDisplay");


//button will destiple when there is not a valid input
zipcodeInput.addEventListener("input", () =>{
    if(zipcodeInput.checkValidity()){
        zipButton.disabled = false;

    }else{
        zipButton.disabled = true;
    }
})

//get the right zip code
zipButton.addEventListener("click", () => {
    zipDisplay.innerHTML = `<p>Loading.....<\p>`;
    let url = "https://geocode.maps.co/search?country=US&postalcode="+ zipcodeInput.value + "&api_key=6719c298a950c097595614cre30636a"
    fetch(url)
    .then((response) =>{
        if(!response.ok){
            zipDisplay.innerHTML = `<p>Error loading, received a ${response.status} status<\p>`;
            throw new Error(`HTTP error: ${response.status}`)
        }else{
            return response.json();
        }
    })
    .then((data) =>{
        if(data.length === 0){
            zipDisplay.innerHTML = `<p>Error loading, Please check your zip code.<\p>`;
        }else{
            let city = data[0].display_name.split(",");
            console.log(city[0]);
            cityDisplay.innerHTML=`<p>${city[0]} ${city[2]} current weather is:`;
            zipDisplay.innerHTML = "";
            const re = /(^(-\d{2,3}.\d{4}))|(^\d{2,3}.\d{4})/;
            let latRaw = re.exec(data[0].lat);
            let lat = latRaw[0];
            let longRaw = re.exec(data[0].lon);
            let long = longRaw[0];            
            getWeatherURL(`https://api.weather.gov/points/${lat},${long}`)
        }
    })

})











  