const filterBtn = document.querySelectorAll(".filter-btn");
const miniatures = document.querySelectorAll(".residency");
const all = document.querySelector(".all")
const current = document.getElementById("current");

const resetColor = () => filterBtn.forEach((filter) =>{
    filter.classList.remove("selected")
    filter.classList.add("unselected")
    all.classList.remove("selected")
    all.classList.add("unselected")
    })

filterBtn.forEach((filter) =>{
    let type = filter.textContent
    filter.addEventListener('click', () => {
        resetColor()
        filter.classList.add("selected")
        filter.classList.remove("unselected")
        miniatures.forEach((miniature) =>{
            if (miniature.classList.contains(type)){
                miniature.style.display = "block"
            }else{
                miniature.style.display = "none"
            }
        })
    })
})


all.addEventListener("click", () => {
    resetColor();
    all.classList.remove("unselected");
    all.classList.add("selected");
    miniatures.forEach((miniature) =>{
        miniature.style.display = "block";
    });
});

const selectCurrent = () => {
    miniatures.forEach((miniature) =>{
        if (miniature.classList.contains("current")){
            miniature.style.display = "block"
        }else{
            miniature.style.display = "none"
        }
    })
}

selectCurrent();