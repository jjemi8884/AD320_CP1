"use strict"

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

app.post('/get-userLogin', async (req, res) => {
    const {user , password} = req.body;
    if(!userName){
        return res.status(400).json({error: "did not receive a user name, cannot process account"});
    }else if(!password){
        return res.status(400).json({error: "did not receive password, cannot process acocunt"});
    }

    //we have the userName and password
    try{
        const db = await connectToDB();

        //email check (no sql injection here)

        //try to see if user is in the system
        let userDB = await db.get('SELECT * FROM Customers WHERE email= ?', [user]);
        if(userBD) {
            let passwordDB = await db.get('SELECT password FROM Customer WHERE email=?', [user])
            if(password === passwordDB){
                //do the session key thing 
                res.status(200).json({session: "cookie"});
            }
        }      


    } catch (error) {
        res.status(500).json({error: 'did not process informaiton in SQL'});
    }
})

function createSessionKey(){
    let m
}

// Start the server if this file is run directly
if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });
} else {
    module.exports = app; // Export the app for testing
}