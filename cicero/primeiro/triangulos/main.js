const TOP = document.getElementById("top");
const RIGHT = document.getElementById("right");
const BOTTOM = document.getElementById("bottom");
const LEFT = document.getElementById("left");

const QUADBIG = document.getElementById("quadBig");
const QUADRO = document.getElementById("quadro");

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

function pegarCor(input) {
    if(input.value == ""){
        return "50px solid transparent";
    }
    else{
        return "50px solid " + input.value
    }
}

function setCor(){
    QUADBIG.style.borderTop = pegarCor(TOP);
    QUADBIG.style.borderRight = pegarCor(RIGHT);
    QUADBIG.style.borderBottom = pegarCor(BOTTOM);
    QUADBIG.style.borderLeft = pegarCor(LEFT);
}

//ignora tudo isso aqui

function criarLinha(width,num){
    let linha = []
    for(j = 1; j <= width; j++){
        linha.push({
            nome: num + "_" + j,
            cores: ["","","",""] //top, right, bottom, left
        });
    }

    return linha;
}

function criarTabela(width,height){
    let quadro = []
    for(i = 1; i <= height; i++){
        quadro.push(criarLinha(width,i));
    }

    return quadro;
}

function criarLinhaQuadro(data,num){
    let linha = criarElem("div","linha",[["id",num]])
    data.forEach(element => {
        linha.appendChild(criarElem())
    });
}

function criarQuadro(width, height) {
    let tabela = criarTabela(width,height);
    tabela.forEach(element => {
        
    });
}

//desisto
