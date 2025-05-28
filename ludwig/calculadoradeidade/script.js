function verificarIdade() {
    const anoNascimento = parseInt(document.getElementById('anoNascimento').value);
    const anoAtual = parseInt(document.getElementById('anoAtual').value);
    const resultado = document.getElementById('resultado');

    // Verificação de validade
    if (isNaN(anoNascimento) || isNaN(anoAtual)) {
        resultado.innerText = "Por favor, preencha os dois campos corretamente.";
        return;
    }

    if (anoNascimento > anoAtual) {
        resultado.innerText = "O ano de nascimento não pode ser maior que o ano atual.";
        return;
    }

    const idade = anoAtual - anoNascimento;
    let categoria = "";

    if (idade < 12) {
        categoria = "Criança";
    } else if (idade < 18) {
        categoria = "Adolescente";
    } else if (idade < 60) {
        categoria = "Adulto";
    } else {
        categoria = "Idoso";
    }

    resultado.innerText = `Idade: ${idade} anos - Categoria: ${categoria}`;
}
