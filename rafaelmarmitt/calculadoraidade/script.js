function verificaridade() {

    const anoNascimento = parseInt(document.getElementById('nascimento').value);
    const anoAtual = parseInt(document.getElementById('ano').value);
    const resultadoElement = document.getElementById('resultado');


    if (isNaN(anoNascimento) || isNaN(anoAtual)) {
        resultadoElement.innerText = "Por favor, insira anos válidos!";
        resultadoElement.style.color = "red";
        return;
    }

    if (anoAtual < anoNascimento) {
        resultadoElement.innerText = "O ano atual não pode ser menor que o ano de nascimento!";
        resultadoElement.style.color = "red";
        return;
    }

    const idade = anoAtual - anoNascimento;

    let categoria;
    if (idade < 12) {
        categoria = "Criança";
    } else if (idade >= 12 && idade <= 17) {
        categoria = "Adolescente";
    } else if (idade >= 18 && idade <= 59) {
        categoria = "Adulto";
    } else {
        categoria = "Idoso";
    }
    resultadoElement.innerText = `Idade: ${idade} anos - Categoria: ${categoria}`;
    resultadoElement.style.color = "#0080ff";
    resultadoElement.style.fontWeight = "bold";
    resultadoElement.style.marginTop = "20px";
}