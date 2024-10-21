function verificar(){
    let maioridade = 18
    let idade = document.getElementById('idade').value;
    let anos = maioridade - idade;

    if(anos > 0)
        {
        document.getElementById('res').innerText = `falta(m) ${anos} para atingir a maioridade`
    }
    else
    {
        document.getElementById('res').innerText = `você ja atingiu a maioridade`
    }
}