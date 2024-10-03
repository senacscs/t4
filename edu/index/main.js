const header = document.getElementById("header");
const john = document.getElementById("john_hk");

john.addEventListener("click", function (elem) {
    header.style.opacity = 0;
    setTimeout(() => {
        header.parentNode.removeChild(header);
    }, 2000);
});

// SITES :D

const sites = [
    { nome: "Olá Mundo", url: "olamundo", src: "skong.png" },
    { nome: "Indicações HTML", url: "indicacoeshtml", src: "grimm.png" },
    { nome: "Indicações CSS", url: "indicacoescss", src: "false.png" },
    { nome: "Responsáveis", url: "responsaveis", src: "grub.png" },
    { nome: "Projeto", url: "projeto", src: "paleking.png" },
    { nome: "Currículo", url: "curriculo", src: "cornifer.png" },
    { nome: "Teste_ODS", url: "teste_ods", src: "nosk.png" },
    { nome: "Tecnologia Matemática", url: "tecnologiamat", src: "sly.png"},
    { nome: "Autocuidado", url: "autocuidado", src: "vessel.png" },
    { nome: "Imersão", url: "imersao1", src: "iselda.png" },
    { nome: "Ponte Da Vinci", url: "pontedavinci", src: "besouro.png"},
    { nome: "Poemas", url: "poema", src: "dreamers.png"},
]

const sitesDiv = document.getElementById("sites");

function criarSite(info) {
    // return `
    //     <section>
    //         <a href="./${info.url}" target="_blank">
    //         <div>${info.nome}</div>
    //         </a>
    //     </section>
    // `

    return `
    <a href="../${info.url}" target="_blank">
        <h1>${info.nome}</h1>
        <img src="img/${info.src? info.src : "ghost.jpeg"}" alt="john hollow knight">
      </a>`
}

sites.forEach(elem => {
    sitesDiv.innerHTML += criarSite(elem);
});