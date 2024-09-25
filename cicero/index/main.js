let play = document.getElementById("play");
let options = document.getElementById("options");
let credits = document.getElementById("credits");
let quit = document.getElementById("quit");

let main = document.getElementById("main");
let anos = document.getElementById("anos");

let doodad = document.getElementById("doodad");

let act1 = document.getElementById("act1");

let ato1;
let ato2;
let ato3;

let lImageHumouristique = [
    "aguia.webp",
    "baller.webp",
    "grug.jpg",
    "jesus.jpg",
    "kratos.gif",
    "v1.jpg",
];

let body = document.body;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
function criarElem(tag, classe = null, atrib = null) {
    let elem = document.createElement(tag);
    if (classe != null) {
        elem.setAttribute("class", classe)
    }
    if(atrib != null){
        for (j = 0; j < atrib.length; j++) {
            elem.setAttribute(atrib[j][0], atrib[j][1]);
        }
    }

    return elem;
}

//PLAY
let tela = "menu";
play.addEventListener("click", function () {
    if (tela == "menu") {
        main.style.display = "none";
        anos.style.display = "flex";
        doodad.style.display = "none";
        tela = "anos";
    }
});

window.addEventListener("keydown", function (e) {
    if (e.code == "Escape") {
        if (tela == "anos") {
            main.style.display = "flex";
            anos.style.display = "none";
            tela = "menu";
        }
        if (tela.startsWith("act")){
            anos.style.display = "flex";
            ato1.style.display = "none";

            tela = "anos";
        }
    }
})

// OPTIONS
let comicsans = false;
options.addEventListener("click", function () {
    if (comicsans) {
        body.style.fontFamily = "ultrakill";
        comicsans = false;
    }
    else {
        body.style.fontFamily = "'Comic Sans MS'";
        comicsans = true;
    }
});

//CREDITS
credits.addEventListener("click", function () {
    doodad.src = "./img/ha/" + lImageHumouristique[getRandomInt(6)];
    doodad.style.display = "inline";
});


//  QUIT
quit.addEventListener("click", function () {
    window.close();
});

//LISTA DE TRABALHOS

let TRABALHOS = [
    {
        nome: "LAYER 1: BESTEIRAS",
        content: [
            { nome: "SITE DA OFICINA", url: "oficina", img: "esqueleto.jpg" },
            { nome: "PRIMEIRO SITE", url: "olamundo", img: "grug.jpg" },
            { nome: "SITE NO PAPEL", url: "teste_ods", img: "emoji.jpg"},
            { nome: "TABELA PERIÓDICA 3.0", url: "tabela-periodica-3", img: "ciencia.jpg" },
        ]
    },
    {
        nome: "LAYER 2: MATEMÁTICA",
        content: [
            { nome: "4-1: SLAVES TO POWER", url: "jogo1", img: "egito.jpg" },
            { nome: "polia", url: "tecnologiamat", img: "polia.bmp" },
            { nome: "DA VINKI?", url: "pontedavinci", img: "davinki.jpg" },
        ]
    },
    {
        nome: "LAYER 3: TÉCNICO",
        content: [
            { nome: "INDICAÇÕES HTML", url: "indicacoeshtml", img: "design.webp" },
            { nome: "INDICAÇÕES CSS", url: "indicacoescss", img: "design.jpg" },
            { nome: "SITE PRA MAMÃE", url: "responsaveis", img: "ursinho.gif" },
        ]
    },
    {
        nome: "LAYER 4: COISAS DE ÚTIL PRA VIDA",
        content: [
            { nome: "PROJETO DE PI", url: "projeto" }
        ]
    }
]

//CRIAR TELA DE LEVELS

function criarLevel(lista){
    let level = criarElem("div", "nivel");
    let p = criarElem("p");
    p.innerHTML = lista.nome;
    let a = criarElem("a", null, atrib = [["href","../"+lista.url], ["target","_blank"]])
    let img = criarElem("img", null, atrib = [["src",lista.img ? "./img/level/"+lista.img : "./img/ha/kratos.gif"]]);
    let nominho = criarElem("span","nominho");
    nominho.innerHTML = lista.url;

    a.appendChild(img)
    level.appendChild(p);
    level.appendChild(a);
    level.appendChild(nominho)

    return level;
}

function criarCamada(lista){
    let layer = criarElem("div","layer");
    let galbo = criarElem("div", "galbo");
    let niveis = criarElem("div", "niveis");
    let p = criarElem("p");
    p.innerHTML = lista.nome;

    lista.content.forEach(elem => {
        niveis.appendChild(criarLevel(elem));
    });
    galbo.appendChild(p);

    layer.appendChild(galbo);
    layer.appendChild(niveis);

    return layer;
}

function criarAto(nome, niveis){
    let ato = criarElem("div", "levels", atrib = [["id",nome]]);
    let goobert = criarElem("div", "goobert");

    niveis.forEach(elem => {
        goobert.appendChild(criarCamada(elem));
    });

    ato.appendChild(goobert);

    return ato;
    
}

ato1 = criarAto("ato1", TRABALHOS);
body.appendChild(ato1);

// ACT SELECT

act1.addEventListener("click", function(){
    anos.style.display = "none";
    ato1.style.display = "flex";
    tela = "act1";
});