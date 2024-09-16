//adicionando o relogio
window.location.replace("https://senacscs.github.io/t4/wickert/indexsla/index.html");

function updateTime() {
    const timeElement = document.getElementById('time');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    timeElement.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime();

function atualizarData() {
    // Obter a data e hora atuais
    const agora = new Date();
    
    // Formatar a data como dia/mês/ano
    const opcoes = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const dataFormatada = agora.toLocaleDateString('pt-BR', opcoes);
    
    // Atualizar o conteúdo do elemento com a data formatada
    document.getElementById('data2').textContent = `Data Atual: ${dataFormatada}`;
}

// Atualizar a data imediatamente
atualizarData();

// Atualizar a data a cada 1 segundo
setInterval(atualizarData, 1000);