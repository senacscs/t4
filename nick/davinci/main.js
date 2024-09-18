function removeFadeOut( el, speed ) {
    var seconds = speed/1000;
    el.style.transition = "opacity "+seconds+"s ease";

    el.style.opacity = 0;
    setTimeout(function() {
        el.parentNode.removeChild(el);
    }, speed);
}

const telona = document.getElementById("telona");
const botao = document.getElementById("botao");
const body = document.body;

botao.addEventListener("click", function() {
    removeFadeOut(telona,1000);
});