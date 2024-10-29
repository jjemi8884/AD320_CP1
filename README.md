| Event | Element Listening to Event  | Response/Elements Changed |
| ----- | --------------------------- | --------------------------|
| Click | Button with #ID btnWeather (foul)  | Fetch Data from NOAA website (2 fetches actually) to display current weather at the SJ Farms |
| Input | Input with the #ID zip code (foul) | will not accept anything other than a 5 digit number(if you ender a incorrect Zip code then an angry duck appears), will be outline in red until you input a valid zip code and then it will turn green on the inside.|
| Click | Button with the #ID btnZip (foul) | First fetch data form the Geocode.maps.co to turn the zip code into a latitude and longitude, then send that over to NOAA weather to get the current weather in that location and the appropriate duck will display on the screen.|
| Click | Button with #id btnScroll (Index.html) | Will start and stop the slide show, just incase you want to admire a particular duck for a while.
