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
            console.log("valid admin sign into admin menu");
        }else{
            res.status(200).json({isAdmin:false});
        }

    }catch{
        res.status(200).json({isAdmin: false});
    }
})

app.get('/eggInventory', async (req, res) => {

    try{

        const db = await connectToDB();

        const eggsGathered = await db.all(`
            SELECT sum(e.quanity) AS 'total', speciesName 
            FROM eggs e JOIN speciesType s 
            ON e.speciesType = s.speciesID 
            GROUP BY s.speciesName 
            ORDER BY speciesName;`);
            
        const eggsSold = await db.all(`
            SELECT sum(sh.quanity) AS eggSold, s.speciesName 
            FROM ShoppingCart sh JOIN eggs e 
            ON sh.eggID = e.eggID JOIN speciesType s 
            ON e.speciesType = s.speciesID 
            GROUP BY s.speciesName 
            ORDER BY speciesName;`);
        

        //update the quantities 
        const duckInv = Number(eggsGathered[1].total) - Number(eggsSold[1].eggSold);
        const chickenInv = Number(eggsGathered[0].total) - Number(eggsSold[0].eggSold);
        const gooseInv = Number(eggsGathered[2].total) - Number(eggsSold[2].eggSold);

        db.close;

        res.status(200).json({ok: true, duck: duckInv, goose : gooseInv, chicken: chickenInv});

    }catch {
        req.status(400).json({error : "unable too connect to Database."});
    }
})

app.post('/addEggInv', async (req, res) => {
    
    console.log("Added eggs to Inventory");
    //get the response 
    const typeOfEgg = req.body.typeOfEgg;
    const numOfEgg = req.body.numEggs;
    try{
        const db = await connectToDB();
        await db.run("INSERT INTO eggs VALUES (NULL, ?, ?, ?)", [numOfEgg, typeOfEgg, new Date().toISOString()]);
        res.status(200).json({})       
    }catch{
        res.status(500);
    }

})

//method to buy eggs
app.post('/buyEggs', async (req, res) => {
    try{
        const db = await connectToDB();
        const customer = req.body.customer;
        const numDuckEggs = req.body.duckEggs;
        const numGooseEggs = req.body.gooseEggs;
        const numChickenEggs = req.body.chickenEggs;
        const total = (numDuckEggs  * 5) + (numGooseEggs * 10) + (numChickenEggs * 4); 
        
        const eggsGathered = await db.all(`
            SELECT sum(e.quanity) AS 'total', speciesName 
            FROM eggs e JOIN speciesType s 
            ON e.speciesType = s.speciesID 
            GROUP BY s.speciesName 
            ORDER BY speciesName;`);
            
        const eggsSold = await db.all(`
            SELECT sum(sh.quanity) AS eggSold, s.speciesName 
            FROM ShoppingCart sh JOIN eggs e 
            ON sh.eggID = e.eggID JOIN speciesType s 
            ON e.speciesType = s.speciesID 
            GROUP BY s.speciesName 
            ORDER BY speciesName;`);
            
                
            //update the quantities 
        const duckInv = Number(eggsGathered[1].total) - Number(eggsSold[1].eggSold) - Number(numDuckEggs * 12);
        const chickenInv = Number(eggsGathered[0].total) - Number(eggsSold[0].eggSold) - Number(numChickenEggs * 12 );
        const gooseInv = Number(eggsGathered[2].total) - Number(eggsSold[2].eggSold) - Number(numGooseEggs * 12);
            
       
        // //get the current account balance
        const dbCustomer = await db.get("SELECT * from Customers WHERE email=?" ,customer);
        const customerBalance = total + dbCustomer.currentBalance;
        if(duckInv < 0 || chickenInv < 0 || gooseInv < 0){
            console.log("We are low on inventory and can not fulfill orders.");
             res.status(200);
             res.json({eggsGood : false})
             db.close();
        }else{
            res.json({eggsGood : true, cost: customerBalance});

             //update transactions
            
            // //update user
             const customerTableUpdate = await db.run(`UPDATE customers SET lastDateBought = ? WHERE email = ?`, [new Date().toISOString(),customer])
             const customerTableUpdate2 = await db.run(`UPDATE customers SET currentBalance = ?WHERE email = ?`, [customerBalance, customer]);
            
            // //update sales transaction
            //get the customer ID
            const custID = await db.get("SELECT CustomerID FROM customers WHERE email=?", customer);
            
            const transactionInsert = await db.run("INSERT INTO Transactions VALUES (NULL, ?, ?)", [custID.CustomerID , new Date().toISOString()]);
            
            
            // //add duck
            if(numDuckEggs > 0){
                await db.run("INSERT INTO ShoppingCart VALUES (?, 1, ?)", [transactionInsert.lastID, Number(numDuckEggs * 12) ]);
            }
            
            // //add goose
            if(numGooseEggs > 0){
                 await db.run("INSERT INTO ShoppingCart VALUES (?, 2, ?)", [transactionInsert.lastID, Number(numGooseEggs * 12) ]);
            }
            
            // // //add chickens
            if(numChickenEggs > 0){
              await db.run("INSERT INTO ShoppingCart VALUES (?, 3, ?)", [transactionInsert.lastID, Number(numChickenEggs * 12) ]);
            }
            
            
             console.log("duck: " + duckInv + " /Chicken: " + chickenInv + "/Goose: " + gooseInv);
           
             db.close();
        }

    }catch{
        res.status(418).json("bad things happened");
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
                    res.cookie("sessionID", sessionID, {expires: new Date(Date.now() + 60 * 10000)});
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