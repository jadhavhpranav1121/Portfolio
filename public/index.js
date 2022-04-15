var preloader=document.getElementById('loading');
function loader(){
    preloader.style.display='none';
}
$(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
        $('.navigation').addClass('floatingNav');
    } else {
        $('.navigation').removeClass('floatingNav');
    }
});




// Typing effect

const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

const textArray = ["hard", "fun", "a journey", "LIFE"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

// active

// function activeClass(e) {
//   var elems = document.querySelectorAll(".active");
//   [].forEach.call(elems, function(el) {
//     el.classList.remove("active");
//   });
//   e.target.className = "hover-3 active";
// }



// function type() {
//   if (charIndex < textArray[textArrayIndex].length) {
//     if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
//     typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
//     charIndex++;
//     setTimeout(type, typingDelay);
//   } 
//   else {
//     cursorSpan.classList.remove("typing");
//   	setTimeout(erase, newTextDelay);
//   }
// }

// function erase() {
// 	if (charIndex > 0) {
//     if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
//     typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
//     charIndex--;
//     setTimeout(erase, erasingDelay);
//   } 
//   else {
//     cursorSpan.classList.remove("typing");
//     textArrayIndex++;
//     if(textArrayIndex>=textArray.length) textArrayIndex=0;
//     setTimeout(type, typingDelay + 1100);
//   }
// }

// document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
//   if(textArray.length) setTimeout(type, newTextDelay + 250);
// });


// AOS
  AOS.init();