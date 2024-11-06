function log(lugar, output) {
    let p = document.createElement("p");
    p.className = "output";
    p.innerHTML = output;

    lugar.appendChild(p);
}
function limpar(lugar) {
    texto = document.getElementsByTagName("p");
    while(texto[0]){
        texto[0].parentNode.removeChild(texto[0]);
    }
}

function olaMundo() {
    let olamundo = document.getElementById("olamundo");
    limpar(olamundo);
    log(olamundo, "olá mundo :D");
}
function numero() {
    let numero = document.getElementById("numero");
    let input = document.querySelector("#numero #input");
    limpar(numero);
    log(numero,"tu digitou o número " + input.value);
}
function nome() {
    let nome = document.getElementById("nome");
    let input = document.querySelector("#nome #input");
    limpar(nome);
    log(nome,"bom dia, " + input.value);
}
function matematica() {
    let coiso = document.getElementById("matematica");
    let input = document.querySelector("#matematica #input").value;
    let input2 = document.querySelector("#matematica #input2").value;
    limpar(coiso);
    log(coiso,"soma: " + (parseInt(input)+parseInt(input2)));
    log(coiso,"subtração: " + (input-input2));
    log(coiso,"multiplicação: " + (input*input2));
    log(coiso,"divisão: " + (input/input2));
}

// Operação: 5 + 4 * 2 = 13
// Operação: (5 + 4) * 2 = 18
// Operação: 1 + 2 / 3 * 4 = 1.1666666666666667
// Operação: (1 + 2) / (3 * 4) = 0.25

function pemdas() {
    let coiso = document.getElementById("pemdas");
    limpar(coiso);
    log(coiso,"5 + 4 * 2 = " + (5+4*2));
    log(coiso,"(5 + 4) * 2 = " + ((5+4)*2));
    log(coiso,"1 + 2 / 3 * 4 = " + (1+2/3*4) );
    log(coiso,"(1 + 2) / (3 * 4) = " + ((1 + 2) / (3 * 4)) );
}

function divisao() {
    let coiso = document.getElementById("divisao");
    let input = document.querySelector("#divisao #input");
    limpar(coiso);
    log(coiso, `${input.value}/2 = ${input.value/2}`);
    log(coiso, `${input.value}%3 = ${input.value%3}`);
}
function potencia() {
    let coiso = document.getElementById("potencia");
    let input = document.querySelector("#potencia #input");
    limpar(coiso);
    log(coiso, `${input.value}^3 = ${input.value**2}`);
    log(coiso, `sqrt(${input.value}) = ${Math.sqrt(input.value)}`);
}


function template() {
    let coiso = document.getElementById("coiso");
    let input = document.querySelector("#coiso #input");
    limpar(coiso);
    log(coiso, input.value);
}
