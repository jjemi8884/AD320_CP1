/**
Jusitn Jemison
Date 11/10/2024

THe js file that will hold all the JS for this page.
*/


window.addEventListener("load", init)

/**
 * initial function to start all the processes and set up the screen to the correct 
 * view (admin or customer)
 */
function init(){
    //see if the person logged in is a admin.
    checkAdmin(true);
    id("logOut").addEventListener("click", checkAdmin, 0);
    id("loginBtn").addEventListener("click", () => {
        setTimeout(checkAdmin, 2000, 1)
    })
    id("addToCart").addEventListener("click", addToCart);
    id("buyBtn").addEventListener("click", buyEggs);
    id("resetCart").addEventListener("click", resetCart);
    if(window.localStorage.getItem("eggCart")){
        currentCart();
    }else{
        resetCart();
    }

    id('userHistory').addEventListener('click', displayCustomers);

}

/**
 * function to show the admin menu if they are admins.
 * @param {0 or 1 if this ia a logout or login} logOutCheck 
 */
async function checkAdmin(logOutCheck){
    //send request to server to see if admin.
    const response = await fetch('/admin-check')
    .then((response) => response.json())
    if(response.isAdmin && logOutCheck){
        if(id("adminMenuid").classList.contains('hidden')){
            id("adminMenuid").classList.remove("hidden");
        }
        
    }else{
       if(!id("adminMenuid").classList.contains("hidden")){
            id("adminMenuid").classList.add("hidden");
       }
    }
}

async function displayEggInventory(){

}

/**
 * make purchase of eggs and get a responce from the server
 */
async function buyEggs(){
    //is user logged in?
    if(!window.sessionStorage.getItem("userName")){
        alert("Please log into to Buy Eggs");
    }else{
        const price = getPrice();
        //alert("You have bought eggs for $" + getPrice() + ".00");

        //get the cart
        const eggCart = window.localStorage.getItem("eggCart");
        const eggCartJSON = JSON.parse(eggCart);

        const eggCartServer = {
            'duckEggs': eggCartJSON[0].duckEggs,
            'gooseEggs': eggCartJSON[1].gooseEggs,
            'chickenEggs': eggCartJSON[2].chickenEggs
        }

        //send the cart to the server
        try{
           

            const email = window.sessionStorage.getItem("userName");
            
            const response = await fetch("/buyEggs", {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    customer: window.sessionStorage.getItem("userName"),
                    duckEggs : eggCartJSON[0].duckEggs,
                    gooseEggs : eggCartJSON[1].gooseEggs,
                    chickenEggs : eggCartJSON[2].chickenEggs
                })
            })
            .then((response) => response.json())
            if(response.eggsGood){
                alert("Order has been processed you own $" + response.cost + ".00 Dollars, you can pay during pick");
                resetCart();
            }else{
                alert("Sorry, we do not have the current invenotry to fulfill that order.");
            }
            
        }catch{
            alert("Lost connection with the server");
        }
    

    }
}

function currentCart(){
const currentCart = window.localStorage.getItem("eggCart");
const currentCartJSON = JSON.parse(currentCart);

id("dEggs").innerHTML = currentCartJSON[0].duckEggs;
id("gEggs").innerHTML = currentCartJSON[1].gooseEggs;
id("cEggs").innerHTML = currentCartJSON[2].chickenEggs;
id("totalCost").innerHTML = getPrice() + ".00";


}

/**
 * this funcion will added items to the cart and save the cart in storage
 */
function addToCart(){
    //local storage
    if(!window.localStorage.getItem("eggCart")){
        //build the egg cart
        let eggCart =[
            {"duckEggs" : 0},
            {"gooseEggs" : 0},
            {"chickenEggs": 0}
        ];

        window.localStorage.setItem("eggCart", JSON.stringify(eggCart));
        
    }
    

    let numEggsRequest = id("numberOfDozen").value;
    let typeOfEgg = id("eggType").value;

    let eggCart = window.localStorage.getItem("eggCart");
    let eggCartJSON = JSON.parse(eggCart);
    
    if(typeOfEgg=== "duckEggs"){
        eggCartJSON[0].duckEggs = Number(eggCartJSON[0].duckEggs) + Number(numEggsRequest);
    }else if(typeOfEgg === "gooseEggs"){
        eggCartJSON[1].gooseEggs = Number(eggCartJSON[1].gooseEggs) +  Number(numEggsRequest);
    }else{
        eggCartJSON[2].chickenEggs = Number(eggCartJSON[2].chickenEggs)+  Number(numEggsRequest);
    }


    
    
    window.localStorage.removeItem("eggCart");
    window.localStorage.setItem("eggCart", JSON.stringify(eggCartJSON));
    

    currentCart();

}

/**
 * will reset the shopping carts and remove data from local storage
 */
function resetCart(){

    if(window.localStorage.getItem("eggCart")){
        window.localStorage.removeItem("eggCart");
    }
    id("dEggs").innerHTML = 0;
    id("gEggs").innerHTML = 0;
    id("cEggs").innerHTML = 0;
    id("totalCost").innerHTML = "0.00";
}
/**
 * HELPER FUNCTIONS
 */

/**
 * cost of itemss
 * @returns the amount owed
 */
function getPrice(){
    const currentCart = window.localStorage.getItem("eggCart");
    const currentCartJSON = JSON.parse(currentCart);
    const duckCost =  (Number(currentCartJSON[0].duckEggs)) * 5;
    const gooseCost = (Number(currentCartJSON[1].gooseEggs)) * 10;
    const chickenCost = (Number(currentCartJSON[2].chickenEggs)) * 4;

    return total = duckCost + gooseCost + chickenCost;
    
}



function id (element){
    return document.getElementById(element);
}