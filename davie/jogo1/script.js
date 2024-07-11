function check2(){
    var resposta = document.getElementById('resposta').value;
    if(resposta == "-5"){
        location.href = "questao3.html"
        alert('Próximo Enigma.');
    }else{
        location.href = "questao1.html"
    }
}

function check3(){
    var resposta = document.getElementById('resposta').value;
    if(resposta == "-3"){
        location.href = "questao4.html"
        alert('Próximo Enigma.');
    }else{
        location.href = "questao2.html"
    }
}

function check4(){
    var resposta = document.getElementById('resposta').value;
    if(resposta == "1/2 e 1"){
        location.href = "questao3.html"
        alert('Próximo Enigma.');
    }else{
        location.href = "questao5.html"
    }
}

function check5(){
    var resposta = document.getElementById('resposta').value;
    if(resposta == "1 e -3/2"){
        location.href = "questao6.html"
        alert('Próximo Enigma.');
    }else{
        location.href = "questao4.html"
    }
}

function check6(){
    var resposta = document.getElementById('resposta').value;
    if(resposta == "{1,5}"){
        location.href = "questao7.html"
        alert('Tá indo muito bem!');
    }else{
        location.href = "questao1.html"
        alert("Voltou tudo, HAHA!")
    }
}

function check7(){
    var resposta = document.getElementById('resposta').value;
    if(resposta == "-4"){
        location.href = "questao8.html"
        alert("Foi indo muito bem! Agora é a última!");
    }else{
        location.href = "questao1.html"
        alert("Quase chegou na última questão!")
    }
}

function check8(){
    var resposta = document.getElementById('resposta').value;
    if(resposta == "{-2,3}"){
        location.href = ".html"
        alert("Parabéns, acertou todas as questões do jeito que foi pedido.");
    }else{
        location.href = "questao1.html"
        alert("Voltou tudo, agora estude mais e para de querer adivinhar!");
    }
}