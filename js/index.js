

const imagesScroll =[
    
    "images/_NIK0252.JPG",
    "images/_NIK0579.JPG",
    "images/_NIK0580.JPG",
    "images/_NIK0581.JPG",
    "images/_NIK0582.JPG",
    "images/_NIK0583.JPG",
    "images/_NIK0586.JPG",
    "images/_NIK0588.JPG",
    "images/_NIK0589.JPG",
    "images/_NIK0591.JPG",
    "images/_NIK0597.JPG",
    "images/_NIK0598.JPG",
    "images/_NIK0599.JPG",
    "images/_NIK0600.JPG",
    "images/_NIK0601.JPG",
    "images/_NIK0602.JPG",
    "images/_NIK0603.JPG",
    "images/_NIK0604.JPG",
    "images/_NIK0605.JPG",
    "images/_NIK0606.JPG",
    "images/_NIK0608.JPG",
    "images/_NIK0609.JPG",
    "images/_NIK0611.JPG",
    "images/_NIK0612.JPG",
    "images/_NIK0614.JPG",
    "images/_NIK0615.JPG",
    "images/_NIK0616.JPG",
    "images/_NIK0618.JPG",
    "images/_NIK0635.JPG",
    "images/_NIK0636.JPG",
    "images/_NIK0643.JPG",
    "images/_NIK0654.JPG",
    "images/_NIK0649.JPG",
    "images/_NIK0653.JPG",
    "images/_NIK0673.JPG",
    "images/_NIK0674.JPG",
    "images/_NIK0675.JPG",
    "images/_NIK0775.JPG",
    "images/_NIK0809.JPG",
    "images/_NIK0858.JPG",
    "images/_NIK0864.JPG",
    "images/_NIK0871.JPG",
    "images/_NIK0873.JPG",
    "images/_NIK0904.JPG"
  ]

let scrollIndex = 0;

const scrollImg = document.getElementById("imgScroll");
const scrollSection = document.getElementById("pageScroll")

let showOn = false;

function slideShow(){
    scrollIndex = (scrollIndex + 1) % imagesScroll.length;
    scrollImg.src = imagesScroll[scrollIndex];
    showOn = true;

    }

let btnScroll = document.getElementById("btnScroll");
btnScroll.addEventListener('click', toggleImg);

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


    

