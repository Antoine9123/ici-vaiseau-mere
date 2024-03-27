/*************************
 *                       *
 *  Love Art / Make Art  *
 *                       *
 *************************/


//select all links in the nav bar
const navBtn = document.querySelectorAll(".nav-btn");
//select links in the nav bar for the love art section
const loveArtNavBtn = document.querySelectorAll("nav a.love-art");
//select links in the nav bar for the make art section
const makeArtNavBtn = document.querySelectorAll("nav a.make-art");


//this will hide or display the links depending on the mode
const displayNavBtn = () => {
    if(makeArtEnable){
        loveArtNavBtn.forEach((btn) => btn.style.display = "none")
        makeArtNavBtn.forEach((btn) => btn.style.display = "inline")
    }else{
        makeArtNavBtn.forEach((btn) => btn.style.display = "none")
        loveArtNavBtn.forEach((btn) => btn.style.display = "inline")
    }
}
const lineThroughLink = () => {
    navBtn.forEach((btn) => { 
        btn.style.textDecoration = btn.classList.contains("wip") 
        ? "line-through" 
        : "none";
    })
}


// this generate the event listener on the love art / make art switch.
// the swith behave like a checkbox button.
let checkbox = document.querySelector("input[type='checkbox']");
checkbox.addEventListener("change", (e) => {
    makeArtEnable = checkbox.checked;
    displayNavBtn();
});

// if the body of the html page has the class make-art, 
// the switch button is switched to make art
// and only the make art buttons are displayed.
checkbox.checked = document.body.classList.contains("make-art");


// this variable stores if we are in the love art or make art section.
// true = make Art, false = love art
// it is set to match what ever the button says.
let makeArtEnable = checkbox.checked

//call the variable to be executed when de page is displayed
displayNavBtn();
lineThroughLink();
highlightCurrentPage();