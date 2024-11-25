function nome() {
    const seuNome = document.getElementById('valordonome').value;
    let pDoTexto = document.getElementById('exibir')
    if (seuNome !== "") {
        pDoTexto.innerText = 
        `Seu nome é ${seuNome}.`
    }
}