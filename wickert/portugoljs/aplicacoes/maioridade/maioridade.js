function verif() {
    let exi = document.getElementById('disresult');
    const maioridade = 18;
    let idade = document.getElementById('idinput').value;
    let result = maioridade - idade;
    if (result > 0) {
        exi.innerText = `Faltam ${result} anos para você alcançar a maioridade.`
    }
    else {        
        exi.innerText = `Você ja alcançou a maioridade.`
    }
}