const inputs = document.querySelectorAll("input.filter");
const links = document.querySelectorAll("section > a");
let value;

inputs.forEach(function(i) {
    i.addEventListener("input",function(){
        value = this.value
        for (i = 0; i < links.length; i++) {
            links[i].setAttribute("href", `./${alunos[i].pasta}/${value}`)
        }
    })
});

