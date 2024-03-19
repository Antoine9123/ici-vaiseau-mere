/*************************
 *                       *
 *  Love Art / Make Art  *
 *                       *
 *************************/

let makeArtEnable = false

const loveArtNavBtn = document.querySelectorAll(".love-art");
const makeArtNavBtn = document.querySelectorAll(".make-art");

const updateDisplay = () => {
    if(makeArtEnable){
        loveArtNavBtn.forEach((btn) => btn.style.display = "none")
        makeArtNavBtn.forEach((btn) => btn.style.display = "inline")
    }else{
        makeArtNavBtn.forEach((btn) => btn.style.display = "none")
        loveArtNavBtn.forEach((btn) => btn.style.display = "inline")
    }
}
updateDisplay();



let checkbox = document.querySelector("input[type='checkbox']");
checkbox.checked = false;
checkbox.addEventListener("change", (e) => {
    makeArtEnable = checkbox.checked;
    updateDisplay();
});