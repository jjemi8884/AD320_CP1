"use strict"

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');
const cookieParser = require("cookie-parser");


const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')));

// Route to serve the home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to serve the about page
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

// Route to serve the contact page
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Route to serve the fouweather page
app.get('/foulweather', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'foulWeather.html'));
});

// Route to serve the about page
app.get('/eggPurchase', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'eggPurchase.html'));
});

//database connection
async function connectToDB() {
    const db = await sqlite.open({
        filename: './sjfarmDB.db',
        driver: sqlite3.Database
    });
    return db;
} 

//Initalize the Database
async function initializeDatabase(){
    const db = await connectToDB();
}

// //start your servers (databases) kind of like start your engines :)
initializeDatabase();

app.post('/send-userLogin', async (req, res) => {
   const customer = req.body.user;
   const pword = req.body.password;
    if(!customer || !pword ){
        return res.status(418).json({error: "did not receive a user name or password, cannot process account"});
    }
    
    //we have the userName and password
    try{
        const db = await connectToDB();

        //email check (no sql injection here)
        

        //try to see if user is in the system
        let userDB = await db.get('SELECT * FROM customers WHERE email= ?',customer);
        console.log("query DB");
        if(userDB) {
            console.log("user in DB");
            let passwordDB = await db.get('SELECT password FROM customers WHERE email=?', customer)
            let passworedInDB = passwordDB;
            if(pword === passworedInDB.password){
                const sessionID = getSessionId();
                console.log("Creating New Session Key" + sessionID);
                await db.exec('UPDATE customers SET sessionID =? WHERE email=?', sessionID, customer);
                console.log("Updated Database with Session ID")
                res.cookie("sessionID", sessionID, {expires: new Date(Date.now() + 60 * 1000)});
                console.log("successful login")
                res.json({loginSuccess: true,});
                
            }else{
                res.json({loginSuccsss: false});
            }
        }      


    } catch (error) {
        res.status(500).json({error: 'did not process informaiton in SQL'});
    }
})

/**
 * Why reinvent  the wheel when this person created the perfect Seesion Id Generator!
 * Generates an unused sessionid and returns it to the user.
 * @returns {string} - The random session id.
 */
function getSessionId() {
    // This wizardry comes from https://gist.github.com/6174/6062387
    let id =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
    return id;
  }



// Start the server if this file is run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
} else {
    module.exports = app; // Export the app for testing
}