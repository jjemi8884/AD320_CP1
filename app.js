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



//Route to serve the home page (tested)
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Route to serve the about page (tested)
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

//Route to serve the contact page (tested)
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

// Route to serve the fouweather page (tested)
app.get('/foulweather', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'foulWeather.html'));
});

// Route to serve the about page (tested)
app.get('/eggPurchase', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'eggPurchase.html'));
});

// Route to get the results of an admin check
app.get('/admin-check', async (req, res) => {
    const sessionID = req.cookies.sessionID;    
    try{
        console.log("request for admin menu from sessionID: " + sessionID);
        const db = await connectToDB();
        const dbQuery = await db.get("SELECT * FROM customers WHERE sessionID = ?", sessionID);
        if(dbQuery.Admin === 1){
            res.status(200).json({isAdmin:true});
            console.log("valid admin sign into admin menu")
        }else{
            res.status(200).json({isAdmin:false});
            console.log("Invalid admin sign into admin menu")
        }

    }catch{
        res.status(400).json({error:" having some issue be with you in minute"})
        console.log("Failed autho for admin")
    }
})

//database connection (tested in userLogin and out)
async function connectToDB() {
    const db = await sqlite.open({
        filename: './sjfarmDB.db',
        driver: sqlite3.Database
    });
    return db;
} 

//Initalize the Database (test from calling below)
async function initializeDatabase(){
    const db = await connectToDB();
}

// //start your servers (databases) kind of like start your engines :)
initializeDatabase();


/**
 * Funciton to get post request form the client and process their request to log into their account
 * T
 */
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
                console.log("Creating New Session Key: " + sessionID);
                const dbResult = await db.run('UPDATE customers SET sessionID =? WHERE email=?', sessionID, customer);
                if(dbResult.changes == 1){
                    console.log("Updated Database with Session ID")
                    db.close();
                    res.cookie("sessionID", sessionID, {expires: new Date(Date.now() + 60 * 1000)});
                    console.log("successful login")
                    res.json({loginSuccess: true,});
                }else{
                    db.close();
                    console.log("Failed login for user " + customer + ", dataBase Fail");
                    res.status(500).json({error: "bad"});
                }
                
            }else{
                db.close();
                console.log("Failed login for user " + customer + ", incorrect password");
                res.status(500).json({error: "wrong login credentials"});
            }
        }else{
            db.close();
            console.log("Falied login for user " + customer + ", user not in database");
                res.status(500).json({error: "wrong login credentials"});
        }    


    } catch (error) {
        //never get here
    }
})


/**
 * Function to log a user off the database
 */
app.post('/send-userLogOff', async (req, res) => {
    try{
        const userName = req.body.user;
        const sessionID = req.cookies['sessionID'];
        console.log("User " + req.body.user + " requeted log off");
        const db = await connectToDB();
        const randomSessionID = getSessionId();
        let result = await db.run("UPDATE Customers SET sessionID = ? where email = ?", randomSessionID ,userName);
        console.log(result.changes + " is the number of users logged off");
        if (result.changes === 1){
            res.json({logOutSuccess : true});
            console.log("remove sessionID from user" + userName);
        }else{
            res.json({logOutSuccess : false});
        }
        await db.close();
    }catch{
        //never get here
    }
    })

/**
 * Why reinvent  the wheel when this person created the perfect Seesion Id Generator!
 * Generates an unused sessionid and returns it to the user.
 * (Tested by login)
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