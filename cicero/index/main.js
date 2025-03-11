let play = document.getElementById("play");
let options = document.getElementById("options");
let credits = document.getElementById("credits");
let quit = document.getElementById("quit");

let main = document.getElementById("main");
let anos = document.getElementById("anos");

let doodad = document.getElementById("doodad");
let spamton = document.getElementById("spamton");

let act1 = document.getElementById("act1");
let act2 = document.getElementById("act2");

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
    if (atrib != null) {
        for (j = 0; j < atrib.length; j++) {
            elem.setAttribute(atrib[j][0], atrib[j][1]);
        }
    }

    return elem;
}

let bodyBg = {
    posX: 0,
    posY: 0,
    velX: 0,
    velY: 0
};
setInterval(function(){
    bodyBg.posX += bodyBg.velX;
    bodyBg.posY += bodyBg.velY;
    // if(bodyBg.posX >= 150) {
    //     bodyBg.posX = 50;
    // }
    // if(bodyBg.posY >= 150) {
    //     bodyBg.posY = 50;
    // }
    body.style.backgroundPosition = `${bodyBg.posX}px ${bodyBg.posY}px`
},10);

let simX = 0;
let simY = 0;

setInterval(function(){
    simX += 0.1;
    simY += 0.1;
    document.getElementById("sim").style.backgroundPosition = `${simX}px ${simY}px`
},10);

function setBgSpeed(posX, posY, velX,velY){
    bodyBg.posX = posX;
    bodyBg.posY = posY;
    bodyBg.velX = velX;
    bodyBg.velY = velY;
}
setBgSpeed(0,0,1,1);

//PLAY
let tela = "menu";
play.addEventListener("click", function () {
    if (tela == "menu") {
        main.style.display = "none";
        anos.style.display = "flex";
        // doodad.style.display = "none";
        tela = "anos";
        document.body.style.background = 'url("./img/elevador.bmp")';
        setBgSpeed(window.innerWidth/2,0,0,20);
    }
});

window.addEventListener("keydown", function (e) {
    if (e.code == "Escape") {
        if (tela == "anos") {
            main.style.display = "flex";
            anos.style.display = "none";
            tela = "menu";
            document.body.style.background = 'url("img/coiso.png")';
            setBgSpeed(0,0,1,1);
        }
        if (tela.startsWith("act")) {
            anos.style.display = "flex";
            ato1.style.display = "none";

            tela = "anos";
            document.body.style.background = 'url("./img/elevador.bmp")';
            setBgSpeed(window.innerWidth/2,0,0,20);
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

var dancinha = "não";

credits.addEventListener("click", function () {
    // doodad.src = "./img/ha/" + lImageHumouristique[getRandomInt(6)];
    // doodad.style.display = "inline";
    if(dancinha === "não") {
        dancinha = "sim";
        spamton.src = "img/spamton.webp";
    }
    else {
        dancinha = "não";
        spamton.src = "img/him.gif";
    }
});


//  QUIT
quit.addEventListener("click", function () {
    window.close();
});

//CRIAR TELA DE LEVELS

function getLevelImg(lista,pasta) {
    if (lista.img) {
        if (lista.img.charAt(0) === "#") {
            return lista.img.substring(1);
        }
        return "./img/level/" + pasta + "/" + lista.img
    }
    return "./img/ha/kratos.gif"
}

function getLevelUrl(lista,pasta) {
    if(lista.url.charAt(0) === "#") {
        return "../" + lista.url.substring(1);
    }
    if(lista.url.charAt(0) === "&") {
        return lista.url.substring(1);
    }
    return "../" + pasta + "/" + lista.url;

}

function criarLevel(lista, pasta) {
    let level = criarElem("div", "nivel");
    let p = criarElem("p");
    p.innerHTML = lista.nome;
    let a = criarElem("a", null, atrib = [["href", getLevelUrl(lista,pasta)], ["target", "_blank"]])
    let img = criarElem("img", null, atrib = [["src", getLevelImg(lista,pasta)]]);
    let nominho = criarElem("span", "nominho");
    nominho.innerHTML = lista.url.charAt(0) === "&" || lista.url.charAt(0) === "#" ? "" : lista.url;

    a.appendChild(img)
    level.appendChild(p);
    level.appendChild(a);
    level.appendChild(nominho)

    return level;
}

function criarCamada(lista, pasta) {
    let layer = criarElem("div", "layer");
    let galbo = criarElem("div", "galbo");
    let niveis = criarElem("div", "niveis");
    let p = criarElem("p");
    p.innerHTML = lista.nome;

    lista.content.forEach(elem => {
        niveis.appendChild(criarLevel(elem,pasta));
    });
    galbo.appendChild(p);

    layer.appendChild(galbo);
    layer.appendChild(niveis);

    return layer;
}

function criarAto(nome, niveis) {
    let ato = criarElem("div", "levels", atrib = [["id", nome]]);
    let goobert = criarElem("div", "goobert");

    let pasta = niveis[0]

    niveis[1].forEach(elem => {
        goobert.appendChild(criarCamada(elem,pasta));
    });

    ato.appendChild(goobert);

    return ato;

}

ato1 = criarAto("ato1", ANO1);
body.appendChild(ato1);

ato2 = criarAto("ato2", ANO2);
body.appendChild(ato2);

// ACT SELECT

act1.addEventListener("click", function () {
    anos.style.display = "none";
    ato1.style.display = "flex";
    tela = "act1";
});
act2.addEventListener("click", function () {
    anos.style.display = "none";
    ato2.style.display = "flex";
    tela = "act2";
});