function verificar() {
    const letra = document.getElementById('letra').value.toUpperCase();
    
    if (letra === '') {
        document.getElementById('resultado').innerHTML = 'Digite uma letra!';
    } else if ('AEIOU'.includes(letra)) {
        document.getElementById('resultado').innerHTML = `A letra '${letra}' é uma vogal.`;
    } else {
        document.getElementById('resultado').innerHTML = `A letra '${letra}' é uma consoante.`;
    }
}