function numeroDigitado() {
    const MAIORIDADE = 18;
    let idade = parseFloat(document.getElementById("idade").value);
    let anos = MAIORIDADE - idade
 
    if (anos > 0) {
        document.write("Falta(m) ", anos, " ano(s) para você atingir a maioridade.");
    } else {
        document.write("Você ja atingiu a maioridade.");
    }
}