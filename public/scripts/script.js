// FONCTION TO RENAME FOLDER (ANTOINE ADDED)
const format_name_folder = (name) => {
    let formatted_name = name.replace(/[^\w\s]/g, "").replace(/\s+/g, "_");
    console.log(formatted_name)
    return formatted_name.toLowerCase();
}

/*************************
 *                       *
 *  Love Art / Make Art  *
 *                       *
 *************************/

// this variable stores if we are in the love art or make art section.
// true = make Art, false = love art
// it is set to match what ever the button says.
let makeArtEnable = false

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


// this generate the event listener on the love art / make art switch.
// the swith behave like a checkbox button.
let checkboxes = document.querySelectorAll("input[type='checkbox']");
checkboxes.forEach((checkbox) => {
    addEventListener("change", (e) => {
        makeArtEnable = checkbox.checked;
        displayNavBtn();
        console.log("button checked")
    });
    checkbox.checked = document.body.classList.contains("make-art");

});

// if the body of the html page has the class make-art, 
// the switch button is switched to make art
// and only the make art buttons are displayed.

// checkbox.checked = document.body.classList.contains("make-art");




//call the variable to be executed when de page is displayed
displayNavBtn();


/******************
 *                *
 *   Burger Menu  *
 *                *
 ******************/

const hamburger = document.querySelector(".hamburger")
const activables = document.querySelectorAll(".nav-menu,main,footer")

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    activables.forEach((elem) => elem.classList.toggle("active"))
})
