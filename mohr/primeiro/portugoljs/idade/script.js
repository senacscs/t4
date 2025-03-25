function verificarIdade(event) {
    event.preventDefault();
    const idade = parseInt(document.getElementById('idade').value);

    let resultado = '';

    if (idade < 18) {
        resultado = 'Você é menor de idade';
    } else {
        resultado = 'Você é maior de idade';
    }

    document.getElementById('resultado').innerText = resultado;
}
