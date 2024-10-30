/*
Jusitn Jemison
Date 10/29/2024

My Foul weather page javaScript. 
This is the webpage that will display the weather, how ducks like it. 
It uses fetches
-->*/

"use strict";

//mouse over footer to disappear.


window.addEventListener("load", init);
const loadingDisplay = id("zipDisplay");

/**
 * the function to initalize the button for weather, Should but used when loading software
 */
function init(){
    id("btnWeather").addEventListener('click', getHomeWeather);
    footerDis();
    chickenBomb();   
}

/**
 * a funciton that will make the footer disapear, because why not!
 */
function footerDis(){
    
    setTimeout(() => {document.querySelector("footer").addEventListener('mouseover', () => {
    document.querySelector("footer").classList.add("hidden");
    })}, 10000);
    
}

//Duck weather
//this is near the farm
const homeUrl = "https://api.weather.gov/points/47.2355,-122.1292";

/**
 * Function for starting the process of getting the home weather at hardcoded location.
 */
function getHomeWeather(){
    getWeatherURL(homeUrl);
    id("city").classList.remove("hidden");
}

function getWeatherURL(url){
     
    loadingDisplay.classList.remove("hidden");
    fetch(url)
    .then((response) => {
        if (!response.ok){
            handleError(response);
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        
        getLocalWeather(data.properties.forecast);
    })
    .catch(handleError);
}


/**
 * Function used to get the forcast information from the NAOO website
 * @param {URL for the location that is retrieved with the getWeatherURL} url 
 */
function getLocalWeather(url){
    //console.log("getting local Weather report")

    fetch(url)
    .then((response) => {
        if(!response.ok){
            handleError(response);
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
            let forcast = data.properties.periods[0];
            updateFoulWeather(forcast);
        })
    //.catch(handleError); 
}

/**
 * Function used to display the forcast information
 * @param {Object that holds the forcast information} forcast 
 */
function updateFoulWeather(forcast){
    let temp = forcast.temperature;
    let rainPercent = forcast.probabilityOfPrecipitation.value;
    let wind = forcast.windSpeed;
    loadingDisplay.classList.add("hidden");
    id("weatherData").innerHTML = `
        <p>Temp is ${temp}</p>
        <p>${rainPercent}% chance of rain</p>
        <p>wind is ${wind}
    `;
    resetPic();
    duckMood(temp, rainPercent,wind);
    id("zipSection").classList.remove("hidden");
    
    if(document.contains(id("art"))){
        id("body").removeChild(id("art"));
        id("btnZip").addEventListener("click", zipWeather);
        id("zipcode").addEventListener("input", inputValid)   
    }
};

/**
 * Function to reset the picture areas to allow room for the new picture.
 */
function resetPic(){
    let par = id("weatherPic");
    for (let child of par.children){
        if(!child.classList.contains("hidden")){
            child.classList.add("hidden");
        }
    }   
}

/**
 * Function to get the duckie weather from the provided parameters.
 * @param {Temp number} temp 
 * @param {percentage of rain/snow expected} rain 
 * @param {wind number} wind 
 */
function duckMood(temp, rain, wind){
    let re = new RegExp("\d")
    let intWind = re.exec(wind);
    let weatherClass = "badWeather";
    if(temp > 32 && temp < 80 && rain > 50 && intWind < 10){
       weatherClass = "amazingWeather" ;              
    }else if (temp > 32 && temp < 80 && intWind < 10  ){
        weatherClass = "goodWeather" ;          
    }
    let displayWeather = document.getElementsByClassName(weatherClass);
    id("weatherPic").classList.remove("hidden");
    for(let i = 0; i < displayWeather.length; i++){
        
        displayWeather[i].classList.remove("hidden");
    }
}

/**
 * Will see if a zipcode is valid or not
 */
function inputValid(){
    if(id("zipcode").checkValidity()){
        id("btnZip").disabled = false;

    }else{
        id("btnZip").disabled = true;
    }
}

/**
 * the function that will get the zip code from the input, convert it to a 
 * lat and long, and then call the NOAA website to display the weather.
 */
//get the right zip code
function zipWeather(){
        let url = "https://geocode.maps.co/search?country=US&postalcode="+ id("zipcode").value + "&api_key=6719c298a950c097595614cre30636a"
        fetch(url)
        .then((response) =>{
            if(!response.ok){
                id("zipDisplay").innerHTML = `<p>Error loading, received a ${response.status} status.<\p>`;
                handleError(response);
                throw new Error(`HTTP error: ${response.status}`)
            }else{
                return response.json();
            }
        })
        .then((data) =>{
            if(data.length === 0){
                resetPic();
                for(let error of document.getElementsByClassName("error")){
                    error.classList.remove("hidden");
                }
            }else{
                let city = data[0].display_name.split(",");
                console.log(city[0]);
                id("city").innerHTML=`<p>${city[0]} ${city[2]} current weather is:`;
                id("zipDisplay").innerHTML = "";
                const re = /(^(-\d{2,3}.\d{4}))|(^\d{2,3}.\d{4})/;
                let latRaw = re.exec(data[0].lat);
                let lat = latRaw[0];
                let longRaw = re.exec(data[0].lon);
                let long = longRaw[0];            
                getWeatherURL(`https://api.weather.gov/points/${lat},${long}`)
            }
        })
        .catch(handleError)
}

/**
 * The function to handle errors and display a funny message.
 * @param {responce object received from the fetch commands} response 
 */
function handleError(response){
    resetPic();
    
    for(let error of document.getElementsByClassName("htmlError")){
        error.classList.remove("hidden");
    }
    console.log(response.status);
}

/**
 * Here is your Async funcition I hope you enjoy
 * I think I enjoyed it. But I now smile knowing what 
 * fun you will have with this.
 * 
 * I have also added the footer dis funtion to the end to not start right away!
 */
async function chickenBomb(){
    //start the timer
    const chicken = id("chickenBombs");
    setInterval(function () {
        //show the chicken bomb
        chicken.classList.remove("hidden");
        setTimeout(function () {
            chicken.classList.add("hidden")}, 2000);   
    }, 10000)
    
}


//-----------------------helper functions-------------------------//


function id (elementID){
    return document.getElementById(elementID)
}






  