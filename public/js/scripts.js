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
    let login = id("loginPopup");
    
    
    //toggle login
    login.classList.toggle("hidden");

    //check for valid inputs
    login.addEventListener("input", inputValid);

    //submit the info and get login 
    let loginSuccess = id("loginBtn").addEventListener("click", getLogin);
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
        loginChange(userName);
    } else {
        clearLogin();
        alert(response.error);
    };
}



/**
 * This function will log in and out a user.
 * It constact the server and gets a session cookie to ensure secure communications.
 * It will also log out the user and contact the server to remvoe the seesion cookie. 
 * @param {userName} userName 
 */
async function loginChange(userName){
    //is the user logging in?
    if(userName){
        //user is loging into their account
        window.sessionStorage.setItem("userName", userName);
        //hide login button
        id("loginPopup").classList.add("hidden");
        loggedIn(userName);
    } else {
        //user is loging out of their account

        //remvoe user session storage llogin in info
        window.sessionStorage.removeItem("userName");
        
        //tell the server we are logging out.
        const response = await fetch('/send-userLogOff', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                    user: userName,               
                })
            })

        //end session cookie
        window.cookieStore.delete("sessionID")
        .then( () => {
            id("logOut").classList.add("hidden");
            clearLogin();
           
        })
        .then( () => {
             console.log("you have logged out");
             alert(`You have successfully logged out`);
        })
        .catch( () => {       
          alert(`Could not log out. Error  Please try again`);
        })
    }
}

/**
 * Function to set up the HTML once a user loggs in.
 */
function loggedIn(userName){
     //change login to usr name
    id("loginText").innerHTML = "logged in as: " + userName;
    //display login out button and activate it
    id("logOut").classList.remove("hidden");
    id("logOut").addEventListener("click", logOut);
}


/**
 * Small funciton start the log out process by calling the loginChange function.
 */
async function logOut(){
    loginChange();       
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


