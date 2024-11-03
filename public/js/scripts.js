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
    id("loginText").addEventListener("click", loginPopup);
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
    const userInfo = {
        user : userName, 
        password : pword 
    };
    const response = await fetch('/sent-userLogin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({userInfo})
    });
    if(response.ok){
        console.log(response);
    } else {
        alert("Error Code " + response.status);
    };
}


/**
 * Will see if a zipcode is valid or not
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


