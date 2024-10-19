

const imagesScroll =[
    "images/_NIK0762.JPG",
    "images/_NIK0814.JPG",
    "images/_NIK0955.JPG",
    "images/Screenshot 2024-10-15 162859.png"
];

let scrollIndex = 0;

const scrollImg = document.getElementById("imgScroll");
const scrollSection = document.getElementById("pageScroll")

let scrollInterval = setInterval(slideShow, 4000);

let showOn = false;

function slideShow(){
    scrollIndex = (scrollIndex + 1) % imagesScroll.length;
    scrollImg.src = imagesScroll[scrollIndex];
    showOn = true;

    }

let btnScroll = document.getElementById("btnScroll");
btnScroll.addEventListener('click', toggleImg);

function toggleImg(){
    if(showOn) {
        
        btnScroll.innerHTML = 'Start Show';
        showOn = false;
        clearInterval(scrollInterval);
        
    } else {

        btnScroll.innerHTML = 'Stop Show';
        scrollInterval = setInterval(slideShow, 4000);
        
        
    }
}

