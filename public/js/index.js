
/*
Jusitn Jemison
Date 10/29/2024

My index weather page javaScript. 
This is jave script handles a button push to contol the slide show. 

-->*/

"use Strict"
const imagesScroll =[
    
    "/public/images/_NIK0252.JPG",
    "/public/images/_NIK0579.JPG",
    "/public/images/_NIK0580.JPG",
    "/public/images/_NIK0581.JPG",
    "/public/images/_NIK0582.JPG",
    "/public/images/_NIK0583.JPG",
    "/public/images/_NIK0586.JPG",
    "/public/images/_NIK0588.JPG",
    "/public/images/_NIK0589.JPG",
    "/public/images/_NIK0591.JPG",
    "/public/images/_NIK0597.JPG",
    "/public/images/_NIK0598.JPG",
    "/public/images/_NIK0599.JPG",
    "/public/images/_NIK0600.JPG",
    "/public/images/_NIK0601.JPG",
    "/public/images/_NIK0602.JPG",
    "/public/images/_NIK0603.JPG",
    "/public/images/_NIK0604.JPG",
    "/public/images/_NIK0605.JPG",
    "/public/images/_NIK0606.JPG",
    "/public/images/_NIK0608.JPG",
    "/public/images/_NIK0609.JPG",
    "/public/images/_NIK0611.JPG",
    "/public/images/_NIK0612.JPG",
    "/public/images/_NIK0614.JPG",
    "/public/images/_NIK0615.JPG",
    "/public/images/_NIK0616.JPG",
    "/public/images/_NIK0618.JPG",
    "/public/images/_NIK0635.JPG",
    "/public/images/_NIK0636.JPG",
    "/public/images/_NIK0643.JPG",
    "/public/images/_NIK0654.JPG",
    "/public/images/_NIK0649.JPG",
    "/public/images/_NIK0653.JPG",
    "/public/images/_NIK0673.JPG",
    "/public/images/_NIK0674.JPG",
    "/public/images/_NIK0675.JPG",
    "/public/images/_NIK0775.JPG",
    "/public/images/_NIK0809.JPG",
    "/public/images/_NIK0858.JPG",
    "/public/images/_NIK0864.JPG",
    "/public/images/_NIK0871.JPG",
    "/public/images/_NIK0873.JPG",
    "/public/images/_NIK0904.JPG"
  ]

let scrollIndex = 0;

const scrollImg = document.getElementById("imgScroll");
const scrollSection = document.getElementById("pageScroll")

let showOn = false;

/**
 * the function that will start and stop the slide show. and control the pictures.
 */
function slideShow(){
    scrollIndex = (scrollIndex + 1) % imagesScroll.length;
    scrollImg.src = imagesScroll[scrollIndex];
    showOn = true;

    }

let btnScroll = document.getElementById("btnScroll");
btnScroll.addEventListener('click', toggleImg);

/**
 * funciton that will toggle the scrolling of an image
 */
function toggleImg(){
    console.log('show stopped');
    if(showOn) {
        
        btnScroll.innerHTML = 'Start Show';
        showOn = false;
        clearInterval(scrollInterval);
        
    } else {

        btnScroll.innerHTML = 'Stop Show';
        scrollInterval = setInterval(slideShow, 4000);
        
        
    }
}






    

