'use strict';
// Változók
const imgArray=[];
let imgIndex;
const leftArrow=document.querySelector('.fa-chevron-circle-left');
const rightArrow=document.querySelector('.fa-chevron-circle-right');
const image=document.querySelector('.img__holder');
const caption=document.querySelector('.caption');
const upperC=document.querySelector('.upper__counter');


let leftImage;
let currentImage;
// képtömb feltöltés
let imgStyle=image.style.backgroundImage;
for (let i = 0; i < 10; i++) {
    imgArray[i]=`img${i+1}.jpg`;    
}
console.log(imgArray);
// paging feltöltés
let iList="";
for (let i = 0; i < 10; i++) {
    iList+=`<i class="fas fa-circle check${i}"></i>`
}
document.querySelector('.paging').innerHTML=iList;
let paging=document.querySelectorAll('.paging i');
// -----------------
/*---------------------------------*/

(function(){
    
    // init, mert a background-image-et nem olvass elsőre
    imgStyle=`url('../img/img${1}.jpg')`;
    imgStyle=image.style.backgroundImage;
    console.log(imgStyle);
    leftImage=1;
    paging[0].classList.toggle('img__active');
    const pagingList=document.querySelectorAll('.paging i');
        
    // Jelenlegi kép indexe
    const currentImageIndex=()=>{
        imgStyle=image.style.backgroundImage;
        let number=Number(imgStyle.split('').filter(item=>Number.isInteger(Number(item))).join(''));
        (number==0)?number++:'';
        console.log('current image index: '+Number(number));
       
        return number;
    }
   

    // Kép megváltoztatása
    const changeImage=(number)=>{
        image.style.backgroundImage=`url('../img/img${number}.jpg')`;
        
    }
    // aktív pötty színezése
    const changeActiveStyle=(number)=>{
        pagingList[leftImage-1].classList.toggle('img__active');
        pagingList[number-1].classList.toggle('img__active')
        leftImage=number;
        
    }
    // felső számláló és alsó caption kiírás
    const upperCounter=(number)=>{upperC.textContent=
        `${number}/${imgArray.length}`;
        caption.textContent=`${number}. Kép`
        changeActiveStyle(number);
        
    }
    // Paging click
    const pagingClick=(ev)=>{
        let currentImage=ev.currentTarget;
        //changeActiveStyle(currentImage);
        let targetListElements=ev.currentTarget.classList;
        let listCounter=Object.values(targetListElements)
        .find((item)=>item
        .includes('check'))
        .split('check').pop();
        changeImage(Number(listCounter)+1);
        let captionNumber=Number(listCounter)+1;
        //caption.textContent=`${captionNumber}. Kép`
        upperCounter(captionNumber);
        currentImageIndex();
    }
    
    // Lapozás balra/jobbra click
    const leftPaging=(ev)=>{
        imgIndex=currentImageIndex();   
        imgIndex--;
        (imgIndex<=1)?imgIndex=10:''; 
        console.log(imgIndex);
        changeImage(imgIndex);
        upperCounter(imgIndex);
    };
    const rightPaging=(ev)=>{
        imgIndex=currentImageIndex();
        imgIndex++
        (imgIndex>10)?imgIndex=1:'';    
        changeImage(imgIndex);
        upperCounter(imgIndex);
        
        
    };
    // Evenlistener arrow
    leftArrow.addEventListener('click',leftPaging);
    rightArrow.addEventListener('click',rightPaging);
    // Eventlistener paging
    paging.forEach(element => {
        element.addEventListener('click', pagingClick)
    });
}
)()