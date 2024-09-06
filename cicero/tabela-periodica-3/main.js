let elementos = [];
let tabelaObj = [[], [], [], [], [], [], [], [], []];
data.map(item => {
    elementos.push({
        num: item.atomicNumber,
        massa: item.atomicMass,
        nome: item.name,
        simbolo: item.symbol,
        estado: item.standardState == "" ? "***" : item.standardState,
        fusao: item.meltingPoint == "" ? "***" : item.meltingPoint,
        ebul: item.boilingPoint == "" ? "***" : item.boilingPoint,
        tipo: item.groupBlock,
        corCpk: item.cpkHexColor,
        ano: item.yearDiscovered === "Ancient" ? "Antigo" : item.yearDiscovered,
        densidade: item.density == "" ? "***" : item.density,
        camadas: item.electronicConfiguration,
        eletroneg: item.electronegativity === "" ? "N/A" : item.electronegativity,
    });
});
elementos.map(elementos => {
    switch (elementos.tipo) {
        case "nonmetal": elementos.tipo = "Não Metal"; elementos.cor = "328da8"; break;
        case "noble gas": elementos.tipo = "Gás Nobre"; elementos.cor = "a35b12"; break;
        case "alkali metal": elementos.tipo = "Metal Alcalino"; elementos.cor = "c3cc1b"; break;
        case "alkaline earth metal": elementos.tipo = "Metal Alcalinoterroso"; elementos.cor = "5fcc1b"; break;
        case "metalloid": elementos.tipo = "Metaloide"; elementos.cor = "271f80"; break;
        case "halogen": elementos.tipo = "Halogênio"; elementos.cor = "a38812"; break;
        case "transition metal": elementos.tipo = "Metal de Transição"; elementos.cor = "826d5e"; break;
        case "metal": elementos.tipo = "Metal Pós-Transição"; elementos.cor = "8f283b"; break;
        case "actinoid": elementos.tipo = "Actinídeo"; elementos.cor = "28758f"; break;
        case "lanthanoid": elementos.tipo = "Lantanídeo"; elementos.cor = "963e96"; break;
    };
    switch (elementos.estado) {
        case "solid": elementos.estado = "Sólido"; break;
        case "gas": elementos.estado = "Gasoso"; break;
        case "liquid": elementos.estado = "Líquido"; break;
    }
});

tabelaObj[0] = elementos.slice(0, 2);
tabelaObj[1] = elementos.slice(2, 10);
tabelaObj[2] = elementos.slice(10, 18);
tabelaObj[3] = elementos.slice(18, 36);
tabelaObj[4] = elementos.slice(36, 54);
tabelaObj[4] = elementos.slice(36, 54);
tabelaObj[5] = elementos.slice(54, 57).concat(elementos.slice(71, 86));
tabelaObj[6] = elementos.slice(86, 89).concat(elementos.slice(103, 118));

tabelaObj[7] = elementos.slice(57, 71);
tabelaObj[8] = elementos.slice(89, 103);

let per1 = document.getElementById("per1");
let per2 = document.getElementById("per2");
let per3 = document.getElementById("per3");
let per4 = document.getElementById("per4");
let per5 = document.getElementById("per5");
let per6 = document.getElementById("per6");
let per7 = document.getElementById("per7");

let lant = document.getElementById("lant");
let acti = document.getElementById("acti");

let periodos = [per1, per2, per3, per4, per5, per6, per7, lant, acti];

for (i = 0; i <= 8; i++) {
    periodos[i] = [periodos[i], tabelaObj[i]];
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

function criarElemento(data) {
    let elem = criarElem("div", "elem", [["id", data.simbolo]]);
    let nome = criarElem("p", "nome");
    nome.innerHTML = data.simbolo;
    let numero = criarElem("p", "numero");
    numero.innerHTML = data.num;
    let massa = criarElem("p", "massa");
    massa.innerHTML = typeof data.massa === "string" ? parseFloat(data.massa).toFixed(2) : `(${data.massa})`;

    elem.appendChild(numero);
    elem.appendChild(nome);
    elem.appendChild(massa);

    elem.style.backgroundColor = `#${data.cor}`;
    elem.info = data;

    return elem;
}

function criarReboco(len, pai){
    for(i = 0; i < len; i++){
        let reboco = criarElem("div","reboco");
        pai.appendChild(reboco)
    }
}

function criarInfo(info, dado) {
    let p = criarElem("p");
    let bold = criarElem("span", "bold");
    bold.innerHTML = `${info}: `
    p.appendChild(bold);
    let data = criarElem("span", "dado");
    data.innerHTML = dado;
    p.appendChild(data);
    let text = document.getElementById("text");
    text.appendChild(p);
}

periodos.forEach(linha => {
    linha[1].forEach(elem => {
        switch (elem.simbolo) {
            case "He": criarReboco(16,linha[0]); break;
            case "B": case "Al": criarReboco(10,linha[0]); break;
            case "Ce": case "Th": criarReboco(2,linha[0]); break;
        
            default: break;
        }
        linha[0].appendChild(criarElemento(elem));
    });
});

function mostrarElem(elem) {
    let elemNome = document.getElementById("elemNome");
    let elemBig = document.getElementById("elemBig");
    let elemNum = document.getElementById("elemNum");
    let elemSigla = document.getElementById("elemSigla");
    let elemMassa = document.getElementById("elemMassa");
    let camadas = document.getElementById("camadas");

    const info = elem.info;

    elemNome.innerHTML = info.nome;
    elemNum.innerHTML = info.num;
    elemSigla.innerHTML = info.simbolo;
    elemMassa.innerHTML = typeof info.massa === "string" ? parseFloat(info.massa).toFixed(2) : `(${info.massa})`;
    camadas.innerHTML = info.camadas;

    elemBig.style.backgroundColor = `#${info.cor}`;

    document.getElementById("text").innerHTML = "";

    criarInfo("Número Atômico", info.num);
    criarInfo("Massa Atômica", typeof info.massa === "string" ? info.massa : `(${info.massa})`);
    criarInfo("Eletronegatividade", info.eletroneg);
    criarInfo("Tipo", info.tipo);
    criarInfo("Ano Descoberto", info.ano);
    criarInfo("Estado", info.estado);
    criarInfo("Ponto de Fusão", info.fusao + "K");
    criarInfo("Ponto de Ebulição", info.ebul + "K");
    criarInfo("Densidade", info.densidade + "g/cm³");
}

document.querySelectorAll(".elem").forEach(function (elem) {
    elem.addEventListener("click", function () { mostrarElem(elem); }, false);
});

mostrarElem(document.getElementById("H"));