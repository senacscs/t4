
// variaveis globais

var vec = [1,0,0,0,0,0];
var vecNovo = [1,0,0,0,0,0];
var numBrancos = 0; // guarda quantas celulas brancas ha 
var numBrancosNovo = 0;
var numLinhas, numColunas;
var solucaoString;
var dica;

/////////////// CALCULANDO JOGOS E SOLUCOES ///////////////

/*

Sistema 2x3 em forma de matriz aumentada

[ 1 1 0 1 0 0 | A ]   [ 1 0 0 0 1 1 | B + C         ]
[ 1 1 1 0 1 0 | B ]   [ 0 1 0 0 1 0 | A + D         ]
[ 0 1 1 0 0 1 | C ] ~ [ 0 0 1 0 1 1 | A + C + D     ]
[ 1 0 0 1 1 0 | D ]   [ 0 0 0 1 0 1 | B + C + D     ]
[ 0 1 0 1 1 1 | E ]   [ 0 0 0 0 0 0 | A + B + C + E ]
[ 0 0 1 0 1 1 | F ]   [ 0 0 0 0 0 0 | A + C + D + F ]

*/

function novoJogo23() {
    var v = Array(6);
    var i;
    var soma = 0; // nunca retorna [0,0,0,0,?,?]
    while (soma == 0) {
	for (i = 0; i < 6; i++) {
	    v[i] = Math.floor((Math.random() * 2));
	}
	for (i = 0; i < 4; i++) {
	    soma = soma + v[i];
	}	
    }
    return v;
}

function novoJogo23possivel() {
    var v = novoJogo23();
    // ajustar E e F para satisfazer as equacoes de consistencia
    // A + B + C + E = 0
    // A + C + D + F = 0
    var A = v[0];
    var B = v[1];
    var C = v[2];
    var D = v[3];
    var E = (A + B + C) % 2;
    var F = (A + C + D) % 2;
    v[4] = E;
    v[5] = F;
    return v;
}

function solucao23(v,e,f) {
    var sol = Array(3);
    var A = v[0];
    var B = v[1];
    var C = v[2];
    var D = v[3];
    var E = v[4];
    var F = v[5];
    // a + e + f = B + C
    sol[0] = (e + f + B + C) % 2;
    // b + e = A + D
    sol[1] = (e + A + D) % 2;
    // c + e + f =  A + C + D
    sol[2] = (e + f + A + C + D) % 2;
    return sol;
}

function solucaoString23(v) {
    var A = v[0];
    var B = v[1];
    var C = v[2];
    var D = v[3];
    var E = v[4];
    var F = v[5];
    var s;
    // equacoes de consistencia:
    // A + B + C + E = 0
    // A + C + D + F = 0
    var eq1 = A + B + C + E + 1; // 1 + equacao 1
    var eq2 = A + C + D + F + 1; // 1 + equacao 2
    // se alguma equacao de consistencia nao for zero, o produto abaixo Ã© par
    if ((eq1 * eq2) % 2 == 0) {
	s = "ImpossÃ­vel";
    } else {
	s = "4 soluÃ§Ãµes para a 1Âª linha:\n  [";
	s = s + solucao23(v,0,0) + "],\n  [";
	s = s + solucao23(v,0,1) + "],\n  [";
	s = s + solucao23(v,1,0) + "],\n  [";
	s = s + solucao23(v,1,1) + "]";
    }
    return s;
}

// dica
function dica23() {
    // a + e + f = B + C       => a = e + f 
    // b + e = A + D           => b = D
    // c + e + f =  A + C + D  => c = D + e + f
    return "Se sÃ³ a Ãºltima linha [D,E,F] estiver acesa,\n1Âª linha: [0, D, D]";
}

/*

Sistema 3x3 como matriz aumentada

[ 1 1 0 1 0 0 0 0 0 | A0 ]   [ 1 0 0 0 0 0 0 0 0 | A + C + F + G + H  ]
[ 1 1 1 0 1 0 0 0 0 | B1 ]   [ 0 1 0 0 0 0 0 0 0 | E + G + H + I      ]
[ 0 1 1 0 0 1 0 0 0 | C2 ]   [ 0 0 1 0 0 0 0 0 0 | A + C + D + H + I  ]
[ 1 0 0 1 1 0 1 0 0 | D3 ]   [ 0 0 0 1 0 0 0 0 0 | C + E + F + I      ]
[ 0 1 0 1 1 1 0 1 0 | E4 ] ~ [ 0 0 0 0 1 0 0 0 0 | B + D + E + F + H  ]
[ 0 0 1 0 1 1 0 0 1 | F5 ]   [ 0 0 0 0 0 1 0 0 0 | A + D + E + G      ]
[ 0 0 0 1 0 0 1 1 0 | G6 ]   [ 0 0 0 0 0 0 1 0 0 | A + B + F + G + I  ]
[ 0 0 0 0 1 0 1 1 1 | H7 ]   [ 0 0 0 0 0 0 0 1 0 | A + B + C + E      ]
[ 0 0 0 0 0 1 0 1 1 | I8 ]   [ 0 0 0 0 0 0 0 0 1 | B + C + D + G + I  ]

*/

function novoJogo33() {
    var v = Array(9);
    var i;
    var soma = 0; // nunca retorna [0,0,0,0,0,0,0,0,0]
    while (soma == 0) {
	for (i = 0; i < 9; i++) {
	    v[i] = Math.floor((Math.random() * 2));
	    soma = soma + v[i];
	}
    }
    return v;
}

function solucaoString33(v) {
    var sol = Array(3);
    var A = v[0];
    var B = v[1];
    var C = v[2];
    var D = v[3];
    var E = v[4];
    var F = v[5];
    var G = v[6];
    var H = v[7];
    var I = v[8];
    // a = A + C + F + G + H
    sol[0] = (A + C + F + G + H) % 2;
    // b = E + G + H + I
    sol[1] = (E + G + H + I) % 2;
    // c = A + C + D + H + I
    sol[2] = (A + C + D + H + I) % 2;
    return "1Âª linha: [" + sol + "]";
}

// dica
function dica33() {
    // a = A + C + F + G + H  =>  a = G + H
    // b = E + G + H + I      =>  b = G + H + I
    // c = A + C + D + H + I  =>  c = H + I
    return "Se sÃ³ a Ãºltima linha [G,H,I] estiver acesa,\n1Âª linha: [G+H, G+H+I, H+I]";
}

/*

Sistema 5x5 em forma de matriz aumentada

[ 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | A ]
[ 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | B ]
[ 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | C ]
[ 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | D ]
[ 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | E ]
[ 1 0 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | F ]
[ 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 | G ]
[ 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 | H ]
[ 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 | I ]
[ 0 0 0 0 1 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 | J ]
[ 0 0 0 0 0 1 0 0 0 0 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 | K ]
[ 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 | L ]
[ 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 | M ]
[ 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 | N ]
[ 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 0 0 0 0 1 0 0 0 0 0 | O ]
[ 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 1 0 0 0 1 0 0 0 0 | P ]
[ 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 | Q ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 0 | R ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 0 1 0 | S ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 0 0 0 0 1 | T ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 1 1 0 0 0 | U ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 0 | V ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 0 | W ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 1 | X ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 | Y ]

Escalonado:

[ 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 | B+C+D+H+J+N+O+T ]
[ 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 | A+B+D+E+G+M+N+O+S ]
[ 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 | A+C+D+E+F+H+I+M+N+P+Q+R+S+T+V ]
[ 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 | A+D+F+G+H+J+K+L+N+O+P+Q+R+T+U+X ]
[ 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 | B+C+E+F+K+M+O+R+T+U+V ]
[ 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 | C+E+G+H+J+M+S+T ]
[ 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | B+D+F+G+I+J+N+P+Q+R+V ]
[ 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 | A+B+D+I+J+K+L+N+U+V+X ]
[ 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | B+D+F+G+I+J+L+R+S+T+X ]
[ 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 | A+B+C+D+G+H+J+L+M+N+P+Q+V+X ]
[ 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 1 0 | E+I+J+M+O+P+Q+R+S+V ]
[ 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0 | B+C+D+F+H+J+K+L+N+O+P+Q+R+T+U+X ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 | B+C+E+F+J+K+M+N+R+U+V ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 1 0 | A+B+C+G+I+M+N+O+S ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 1 0 | A+B+E+H+I+J+K+N+O+P+Q+S+U ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 1 1 | B+D+F+G+I+J+L+N+U+V+X ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 | B+F+G+H+N+P+Q+S+T+V+X ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 1 | C+E+G+H+J+K+M+P+Q+S+T+U ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 | D+H+I+J+L+P+Q+S+T+V+X ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 1 | A+B+D+E+K+L+N+O+U+V+X ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1 | D+E+H+L+M+O+P+R+T+U+V ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 | B+E+F+G+H+I+J+M+N+O+P+R+T+U+X ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 | D+H+I+J+L+P+Q+S+T+V ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | B+C+D+F+H+J+K+L+N+O+P+R+T+V+W+X ]
[ 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 | A+B+D+E+K+L+N+O+U+V+X+Y ]

*/

function novoJogo55() {
    var v = Array(25);
    var i;
    var soma = 0; // nunca retorna [0,0,0,...,0,0,?,?]
    while (soma == 0) {
	for (i = 0; i < 25; i++) {
	    v[i] = Math.floor((Math.random() * 2));
	}
	for (i = 0; i < 23; i++) {
	    soma = soma + v[i];
	}
    }
    return v;
}

function novoJogo55possivel() {
    var v = novoJogo55();
    // ajustar X e Y para satisfazer as equacoes de consistencia
    // B + C + D + F + H + J + K + L + N + O + P + R + T + V + W + X = 0
    // A + B + D + E + K + L + N + O + U + V + X + Y = 0
    var A = v[0];
    var B = v[1];
    var C = v[2];
    var D = v[3];
    var E = v[4];
    var F = v[5];
    var G = v[6];
    var H = v[7];
    var I = v[8];
    var J = v[9];
    var K = v[10];
    var L = v[11];
    var M = v[12];
    var N = v[13];
    var O = v[14];
    var P = v[15];
    var Q = v[16];
    var R = v[17];
    var S = v[18];
    var T = v[19];
    var U = v[20];
    var V = v[21];
    var W = v[22];
    var X = (B + C + D + F + H + J + K + L + N + O + P + R + T + V + W) % 2;
    var Y = (A + B + D + E + K + L + N + O + U + V + X) % 2;
    v[23] = X;
    v[24] = Y;
    return v;
}


function solucao55(v,x,y) {
    var sol = Array(5);
    var A = v[0];
    var B = v[1];
    var C = v[2];
    var D = v[3];
    var E = v[4];
    var F = v[5];
    var G = v[6];
    var H = v[7];
    var I = v[8];
    var J = v[9];
    var K = v[10];
    var L = v[11];
    var M = v[12];
    var N = v[13];
    var O = v[14];
    var P = v[15];
    var Q = v[16];
    var R = v[17];
    var S = v[18];
    var T = v[19];
    var U = v[20];
    var V = v[21];
    var W = v[22];
    var X = v[23];
    var Y = v[24];
    // a+y = B+C+D+H+J+N+O+T
    sol[0] = (y+B+C+D+H+J+N+O+T) % 2;
    // b+x = A+B+D+E+G+M+N+O+S
    sol[1] = (x+A+B+D+E+G+M+N+O+S) % 2;
    // c+x+y = A+C+D+E+F+H+I+M+N+P+Q+R+S+T+V
    sol[2] = (x+y+A+C+D+E+F+H+I+M+N+P+Q+R+S+T+V) % 2;
    // d+x = A+D+F+G+H+J+K+L+N+O+P+Q+R+T+U+X
    sol[3] = (x+A+D+F+G+H+J+K+L+N+O+P+Q+R+T+U+X) % 2;
    // e+y = B+C+E+F+K+M+O+R+T+U+V
    sol[4] = (y+B+C+E+F+K+M+O+R+T+U+V) % 2;
    return sol;
}

function solucaoString55(v) {
    var A = v[0];
    var B = v[1];
    var C = v[2];
    var D = v[3];
    var E = v[4];
    var F = v[5];
    var G = v[6];
    var H = v[7];
    var I = v[8];
    var J = v[9];
    var K = v[10];
    var L = v[11];
    var M = v[12];
    var N = v[13];
    var O = v[14];
    var P = v[15];
    var Q = v[16];
    var R = v[17];
    var S = v[18];
    var T = v[19];
    var U = v[20];
    var V = v[21];
    var W = v[22];
    var X = v[23];
    var Y = v[24];
    var s;
    // equacoes de consistencia: 
    // B+C+D+F+H+J+K+L+N+O+P+R+T+V+W+X = 0
    // A+B+D+E+K+L+N+O+U+V+X+Y = 0
    var eq1 = B+C+D+F+H+J+K+L+N+O+P+R+T+V+W+X+1;
    var eq2 =  A+B+D+E+K+L+N+O+U+V+X+Y+1;
    // se alguma equacao de consistencia nao for zero, o produto abaixo Ã© par
    if ( (eq1 * eq2) % 2 == 0 ) {
	s = "ImpossÃ­vel";
    } else {
	s = "4 soluÃ§Ãµes para a 1Âª linha:\n  [";
	s = s + solucao55(v,0,0) + "],\n  [";
	s = s + solucao55(v,0,1) + "],\n  [";
	s = s + solucao55(v,1,0) + "],\n  [";
	s = s + solucao55(v,1,1) + "]";
    }
    return s;
}

// dica
function dica55() {
    // Das equaÃ§Ãµes da soluÃ§Ã£o, zerando tudo exceto U,V,W,X,Y: 
    // a = y
    // b = x 
    // c = V + x + y
    // d = U + X + x => d = u
    // e = U + V + y
    var d = "Se sÃ³ a Ãºltima linha [U,V,W,X,Y] estiver acesa,\n1Âª linha: [0, 0, V, U+X, U+V]";
    return d;
}

function letraParaNumero(letra) {
    return letra.charCodeAt() - 97;
}

function numeroParaLetra(valor) {
    return String.fromCharCode(97 + valor);
}


/////////////// MENUS E ACOES NO HTML ///////////////

/*
Ideia:

* quando o menu de nivel muda, chama 'preparaJogo()' para adequar o
  menu opÃ§Ãµes.

* quando clica 


*/ 




function adicionaOpcao(menu,texto,valor) {
    // metodo de adicionar opcoes pego de:
    // https://www.dyn-web.com/tutorials/forms/select/option/
    // referencia DOM de
    // https://www.w3schools.com/jsref/coll_select_options.asp
    // https://www.w3schools.com/jsref/prop_option_value.asp
    var opt = document.createElement("OPTION");
    opt.text = texto;
    opt.value = valor;
    menu.options.add(opt);
}

function novoJogo() {

    var tipo = document.getElementById('tipo').value;
    var opcao = document.getElementById('opcoes').value;
    var elem, i;
    
    switch (tipo) {
	
    case "23":
	numLinhas = 2;
	numColunas = 3;
	solucaoString = solucaoString23;
	dica = dica23;
	
	switch (opcao) {
	case "1": // todas acesas
	    vec = [1,1,1,1,1,1];
	    break;
	case "2": // 2Âª apagada
	    vec = [1,0,1,1,1,1];
	    break;
	case "3": // AleatÃ³rio
	    vec = novoJogo23();
	    break;
	case "4": // Aleatorio possivel
	    vec = novoJogo23possivel();
	    break; 
	}
	break;

    case "33":
	numLinhas = 3;
	numColunas = 3;
	solucaoString = solucaoString33;
	dica = dica33;

	switch (opcao) {
	case "1": // todas acesas
	    vec = [1,1,1,1,1,1,1,1,1];
	    break;
	case "2": // Canto apagado
	    vec = [0,1,1,1,1,1,1,1,1];
	    break;
	case "3": // AleatÃ³rio
	    vec = novoJogo33();
	    break;
	}
	break;

    case "55":
	numLinhas = 5;
	numColunas = 5;
	solucaoString = solucaoString55;
	dica = dica55;

	switch (opcao) {
	case "1": // todas acesas
	    vec = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
	    break;
	case "2": // "1Âº, 10Âº, 15Âº apagadas"
	    vec = [0,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1];
	    break;
	case "3": // "1Âº, 10Âº, 16Âº apagadas"
	    vec = [0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1];
	    break;
	case "4": // AleatÃ³rio
	    vec = novoJogo55();
	    break;
	case "5": // AleatÃ³rio possivel
	    vec = novoJogo55possivel();
	    break;
	}
    }

    // calcula numBrancos
    numBrancos = numLinhas * numColunas;
    for (i = 0; i < numLinhas * numColunas; i++) {
	numBrancos = numBrancos - vec[i];
    }

    // atualiza checkboxes 'letra' + tipo. Ex. "a23"
    for (i = 0; i < numLinhas * numColunas; i++) {
	elem = document.getElementById(numeroParaLetra(i) + tipo);
	elem.checked = vec[i];
    }

    // salva jogo para poder reiniciar
    vecNovo = [...vec];
    numBrancosNovo = numBrancos;
}

function reiniciarJogo() {
    var elem, i;
    var tipo = "" + numLinhas + numColunas;

    vec = [...vecNovo];
    numBrancos = numBrancosNovo;

    for (i = 0; i < numLinhas * numColunas; i++) {
	elem = document.getElementById(numeroParaLetra(i) + tipo);
	elem.checked = vec[i];
    }
}

function mostraTabela(lc) {
    var tabela23 = document.getElementById("tabela23");
    var tabela33 = document.getElementById("tabela33");
    var tabela55 = document.getElementById("tabela55");
    switch (lc) {
    case 23:
	tabela23.style.display = "";
	tabela33.style.display = "none";
	tabela55.style.display = "none";
	break;
    case 33:
	tabela23.style.display = "none";
	tabela33.style.display = "";
	tabela55.style.display = "none";
	break;
    case 55:
	tabela23.style.display = "none";
	tabela33.style.display = "none";
	tabela55.style.display = "";
	break;
    }
}

function preparaJogo() {
    var opcoesSel = document.getElementById('opcoes');
    // removendo todas as opcoes do menu
    while ( opcoesSel.options.length > 0 ) {
	opcoesSel.remove(0);
    }
    // adicionando opcoes de acordo com tipo
    switch (document.getElementById('tipo').value) {
    case "23":
	mostraTabela(23);
	adicionaOpcao(opcoesSel, "Todas acesas"      , 1);
	adicionaOpcao(opcoesSel, "2Âª apagada"        , 2);
	adicionaOpcao(opcoesSel, "AleatÃ³rio"         , 3);
	adicionaOpcao(opcoesSel, "AleatÃ³rio possivel", 4);
	break;
    case "33":
	mostraTabela(33);
	adicionaOpcao(opcoesSel, "Todas acesas" , 1);
	adicionaOpcao(opcoesSel, "Canto apagado", 2);
	adicionaOpcao(opcoesSel, "AleatÃ³rio"    , 3);
	break;
    case "55":
	mostraTabela(55);
	adicionaOpcao(opcoesSel, "Todas acesas"         , 1);
	adicionaOpcao(opcoesSel, "1Âº, 10Âº, 15Âº apagadas", 2);
	adicionaOpcao(opcoesSel, "1Âº, 10Âº, 16Âº apagadas", 3);
	adicionaOpcao(opcoesSel, "AleatÃ³rio"            , 4);
	adicionaOpcao(opcoesSel, "AleatÃ³rio possivel"   , 5);
    }
    novoJogo();
}

// cambia 0 <-> 1 em "vec" e atualiza "numBrancos"
function atualizaVec (num) {
    if (vec[num]) {
	numBrancos++;
	vec[num] = 0;
    } else {
	numBrancos--;
	vec[num] = 1;
    }
}

function vizinhos(num) {
    var viz = [-1,-1,-1,-1];

    // 0=(0,0) 1=(0,1) .. nColunas-1=(0,nColunas-1)
    // nColunas=(1,0) numColunas+1(0,1) .. (1,nColunas-1)
    // . . . . . . . . . . . . . . .
    // (nlinhas-1,0) (nLinhas-1,1) .. (nLinhas-1,nColunas-1)

    var j = num % numColunas;
    var i = (num - j) / numColunas;
    
    if (i > 0) { // tem vizinho acima
	viz[0] = num - numColunas;
    }
    if (i < numLinhas - 1) { // tem vizinho abaixo
	viz[1] = num + numColunas;
    }
    if (j > 0) { // tem vizinho Ã  esquerda
	viz[2] = num - 1;
    }
    if (j < numColunas - 1) { // tem vizinho Ã  direita
	viz[3] = num + 1;
    }
    return viz;
}

function acaoBotao(botao) {
    var num = letraParaNumero(botao);
    var viz = vizinhos(num);
    var elem,elemStr,i;

    atualizaVec(num);

    for (i = 0; i < 4; i++) {
	if (viz[i] >= 0) {
	    atualizaVec(viz[i]);
	    elemStr = "" + numeroParaLetra(viz[i]) + numLinhas + numColunas;
	    elem = document.getElementById(elemStr);
	    elem.checked = vec[viz[i]];
	}
    }
    
    if (numBrancos == numLinhas * numColunas) {
	alert("Ganhou!");
    }
}




