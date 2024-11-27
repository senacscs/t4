function verificarIdade() {
    const idade = parseInt(document.getElementById('idade').value);

    if (isNaN(idade)) {
        document.getElementById('resultado').innerHTML = 'Digite uma idade válida!';
    } else {
        const resultado = idade < 18 ? 'Você é menor de idade' : 'Você é maior de idade';
        document.getElementById('resultado').innerHTML = resultado;
    }
}