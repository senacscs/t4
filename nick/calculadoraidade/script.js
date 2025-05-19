function calcular() {
    let nascimento = parseInt(document.getElementById('nascimento').value);
    let atual = parseInt(document.getElementById('atual').value);
    let resultado = document.getElementById('resultado');
                       
    if (isNaN(nascimento)) {
        resultado.textContent = "Digite um ano de nascimento válido";
        return;
    }

    if (isNaN(atual)) {
        resultado.textContent = "Digite um ano atual válido";
        return;
    }

    if (atual <= nascimento) {
        resultado.textContent = "O ano atual deve ser maior que o de nascimento";
        return;
    }

    const idade = atual - nascimento;
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

    resultado.textContent = `Você tem ${idade} anos (${categoria})`;
}