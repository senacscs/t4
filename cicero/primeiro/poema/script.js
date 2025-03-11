const grande = document.getElementById("grande");
const pequenos = document.querySelectorAll(".pequenos>img");

pequenos.forEach(element => {
    element.addEventListener("click", function(){
        grande.src = element.src;
    })
});