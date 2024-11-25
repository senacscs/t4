const header = document.getElementById("header");
const john = document.getElementById("botao");

john.addEventListener("click", function (elem) {
    header.style.opacity = 0;
    setTimeout(() => {
        header.parentNode.removeChild(header);
    }, 2000);
});

function nomedigitado() {
    const nome = document.getElementById("nome").value;
    document.getElementById("resultado").innerText = `Olá, ${nome}!`;
    const welcomeButton = document.createElement('button');
    welcomeButton.id = 'welcome-button';
    welcomeButton.textContent = `Seja bem-vindo, ${name}! Clique para começar`;

}