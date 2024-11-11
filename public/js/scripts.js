/*
Jusitn Jemison
Date 10/29/2024

My styles page javaScript. 
This will handle function that are across all pages in the website including:
login


-->*/

/** LOGIN SCRIPT */

"use strict"




window.addEventListener("load", init);


/**
 * the init funciton will start the listener for the login and check if a user is logged in.
 */
function init(){
    
    checkSessionUser();
    id("loginText").addEventListener("click", loginPopup);
    id("loginBtn").addEventListener("click", getLogin);
    id("loginPopup").addEventListener("input", inputValid);
    id("logOut").addEventListener("click", logOut);
}

/**
 * This funciton will check if a user is already logged in and change the header to reflect
 * that status. Each time a webpage is loaded it will see if the user is logged in.
 */
function checkSessionUser() {
    const sessionUser = window.sessionStorage.getItem("userName");
     if(sessionUser){
        loggedIn(sessionUser);
     }
}


/**
 * Control the popu for the login.
 */
async function loginPopup() {

    //init
    id("loginBtn").disabled = true;
        
    //toggle login
    id("loginPopup").classList.remove("hidden");   
}


/**
 * this is the function that will call the server to provide the log in credentials.
 * It creates the post request including the password and the username. 
 * Should receive a session cookie and results from the server if it is successful. 
 */
async function getLogin() {
    let userName = id("userName").value;
    let pword = id("pword").value; 
    //could salt and hash pword here.
    
  
    const response = await fetch('/send-userLogin', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
                user: userName, 
                password: pword                
            })
    })
    .then((response) => response.json())
    if(response.loginSuccess){
        console.log(response);
        window.sessionStorage.setItem("userName", userName);
        id("loginPopup").classList.add("hidden");
        loggedIn(userName);
    } else {
        clearLogin();
        alert(response.error);
    };
    
}

/**
 * Function to set up the HTML once a user loggs in.
 */
function loggedIn(userName){
     //change login to usr name
    id("loginText").innerHTML = "logged in as: " + userName;
    //display login out button and activate it
    id("logOut").classList.remove("hidden");
    
}


/**
 * Funciton to log out of the system
 * @param {userName} userName 
 */
async function logOut() {

    try{
        console.log("loggin out");
        const userName = window.sessionStorage.getItem("userName");
        //remove user session storage login in info
        //tell the server we are logging out.
        const response = await fetch('/send-userLogOff', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: userName              
            })
        })
        if(response.logOutSuccess){
            console.log("session is terminated");
        }
        //end session cookie
        window.sessionStorage.removeItem("userName");
        window.cookieStore.delete("sessionID")
        id("logOut").classList.add("hidden");
        clearLogin();
        console.log("you have logged out");
        alert(`You have successfully logged out`);
    } catch {
           
        alert(`Could not log out. Error  Please try again`);
    }
}



/**
 * small function to clear the contents of the login in button
 */
function clearLogin(){
    id("loginText").innerHTML= "Login";
    id("userName").value = "";
    id("pword").value = "";
}

/**
 * Will see if a email and pword is valid or not
 */
async function inputValid(){
    if(id("userName").checkValidity() && id("pword").checkValidity()){
        id("loginBtn").disabled = false;

    }else{
        id("loginBtn").disabled = true;
    }
}


/**
 * HELPER FUNCTIONS
 */

function id (element){
    return document.getElementById(element);
}


