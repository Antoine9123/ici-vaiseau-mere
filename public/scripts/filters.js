const filterBtn = document.querySelectorAll(".filter-btn");
const miniatures = document.querySelectorAll(".residency");
const cross = document.querySelector(".cross")

const resetColor = () => filterBtn.forEach((filter) =>{
    filter.classList.remove("selected")
    filter.classList.add("unselected")
    })

filterBtn.forEach((filter) =>{
    let type = filter.textContent
    filter.addEventListener('click', () => {
        resetColor()
        filter.classList.add("selected")
        filter.classList.remove("unselected")
        cross.style.display = "block";
        miniatures.forEach((miniature) =>{
            if (miniature.classList.contains(type)){
                miniature.style.display = "block"
            }else{
                miniature.style.display = "none"
            }
        })
    })
})


cross.addEventListener("click", () => {
    filterBtn.forEach((filter) => {
        filter.classList.remove("selected");
        filter.classList.add("unselected");
    });
    miniatures.forEach((miniature) =>{
        miniature.style.display = "block";
    });
    cross.style.display = "none";
});