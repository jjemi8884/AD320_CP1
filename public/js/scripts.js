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

function init(){
    checkSessionUser();
    id("loginText").addEventListener("click", loginPopup);
}

function checkSessionUser() {
    //const sessionUser = getCookie("sessionUser");
    // if(sessionUser){
    //     console.log("User still logged in with User:" + sessionUser);
    // }
}

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
        alert("Error Code " + response.error);
    };
}




function loginChange(userName){
    //hide login button
    id("loginPopup").classList.add("hidden");
    //change login to usr name
    id("loginText").innerHTML = "logged in as: " + userName;
    //display login out button and activate it
    id("logOut").classList.remove("hidden");
    id("lodOut").addEventListener("click", logOut);

}

async function logOut(){
    const responce = await fetch('/logout')
    .then( () => {
        if(!responce.ok){
            alert("failed to log out, try again!" + responce.status);
        }
    })
    .then( () => {
        //reset the login in stuff.
        //remove cookie 
    })

       
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


