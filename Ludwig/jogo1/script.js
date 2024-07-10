function verificarResposta(enigma) {
    var respostaCorreta;
    var respostaInput;

    switch (enigma) {
        case 1:
            respostaCorreta = "2"; // Resposta para o Enigma 1
            respostaInput = document.getElementById("resposta1").value.trim().toLowerCase();
            break;
        case 2:
            respostaCorreta = "1"; // Resposta para o Enigma 2
            respostaInput = document.getElementById("resposta2").value.trim().toLowerCase();
            break;
        case 3:
            respostaCorreta = "-2"; // Resposta para o Enigma 3
            respostaInput = document.getElementById("resposta3").value.trim().toLowerCase();
            break;
        case 4:
            respostaCorreta = "-5"; // Resposta para o Enigma 4
            respostaInput = document.getElementById("resposta4").value.trim().toLowerCase();
            break;
        case 5:
            respostaCorreta = "5"; // Resposta para o Enigma 5
            respostaInput = document.getElementById("resposta5").value.trim().toLowerCase();
            break;
        case 6:
            respostaCorreta = "0.75"; // Resposta para o Enigma 6
            respostaInput = document.getElementById("resposta6").value.trim().toLowerCase();
            break;
        case 7:
            respostaCorreta = "2"; // Resposta para o Enigma 7
            respostaInput = document.getElementById("resposta7").value.trim().toLowerCase();
            break;
        case 8:
            respostaCorreta = "2, 4"; // Resposta para o Enigma 8
            respostaInput = document.getElementById("resposta8").value.trim().toLowerCase().replace(/ /g, '');
            break;
        default:
            break;
    }

    if (respostaInput === respostaCorreta) {
        alert("Resposta correta! Clique em OK para avançar para o próximo enigma.");
        document.getElementById("enigma" + enigma).style.display = "none";
        document.getElementById("enigma" + (enigma + 1)).style.display = "block";
    } else {
        alert("Resposta incorreta. Tente novamente!");
    }
}