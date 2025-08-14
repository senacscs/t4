const iE = document.getElementById("nomeEquipe");
const eC = document.getElementById("equipesContainer");

let cronometroAtivo = null;
let intervalAtivo = null;

function adicionarEquipe() {
    const equipe = iE.value.trim();
    if (equipe) {
        const div = document.createElement("div");
        div.className = "equipe";


        // Header com nome e cronômetro
        const header = document.createElement("div");
        header.className = "equipe-header";

        // Nome da equipe com reticências
        const nomeSpan = document.createElement("span");
        nomeSpan.className = "equipe-nome";
        nomeSpan.title = equipe;
        nomeSpan.textContent = equipe;
        header.appendChild(nomeSpan);

        // Cronômetro
        const cronometro = document.createElement("span");
        cronometro.textContent = "00:00:00.00";
        cronometro.className = "cronometro";
        header.appendChild(cronometro);

        div.appendChild(header);

        // Botão iniciar/parar em linha separada
        const btn = document.createElement("button");
        btn.textContent = "Iniciar cronômetro";
        // Variáveis para controle de tempo dinâmico
        let start = null;
        let tempoPausado = 0;

        btn.onclick = function() {
            if (cronometroAtivo && cronometroAtivo !== cronometro) {
                // Parar o cronômetro anterior
                clearInterval(intervalAtivo);
                cronometroAtivo.dataset.running = "false";
                cronometroAtivo.parentElement.parentElement.querySelector("button").textContent = "Iniciar cronômetro";
            }
            if (cronometro.dataset.running === "true") {
                // Parar este cronômetro
                clearInterval(intervalAtivo);
                cronometro.dataset.running = "false";
                btn.textContent = "Iniciar cronômetro";
                // Salva o tempo pausado
                tempoPausado = parseFloat(cronometro.dataset.tempo) || 0;
            } else {
                // Iniciar este cronômetro
                let tempo = cronometro.dataset.tempo ? parseFloat(cronometro.dataset.tempo) : 0;
                tempoPausado = tempo;
                start = Date.now();
                cronometro.dataset.running = "true";
                btn.textContent = "Parar cronômetro";
                cronometroAtivo = cronometro;
                intervalAtivo = setInterval(() => {
                    let tempoAtual = tempoPausado + (Date.now() - start) / 1000;
                    cronometro.dataset.tempo = tempoAtual;
                    cronometro.textContent = formatarTempoMilesimos(tempoAtual);
                }, 10);
            }
        };
        div.appendChild(btn);

        // Área de penalidades
        const penalidadesDiv = document.createElement("div");
        penalidadesDiv.className = "penalidades";

        const penalidades = [
            { label: "-5s", valor: 5 },
            { label: "-10s", valor: 10 },
            { label: "-15s", valor: 15 }
        ];
        penalidades.forEach(p => {
            const btnP = document.createElement("button");
            btnP.className = "penalidade-btn";
            btnP.textContent = p.label;
            btnP.onclick = function() {
                let tempo = cronometro.dataset.tempo ? parseFloat(cronometro.dataset.tempo) : 0;
                tempo -= p.valor;
                cronometro.dataset.tempo = tempo;
                cronometro.textContent = formatarTempoMilesimos(tempo);
                // Se o cronômetro estiver rodando, ajuste o tempo de início para refletir a penalidade imediatamente
                if (cronometro.dataset.running === "true") {
                    tempoPausado = tempo;
                    start = Date.now();
                }
            };
            penalidadesDiv.appendChild(btnP);
        });
        div.appendChild(penalidadesDiv);

        eC.appendChild(div);
        iE.value = ""; // Limpa o campo de entrada
    } else {
        alert("Por favor, insira o nome da equipe.");
    }
}


function formatarTempoMilesimos(segundos) {
    const negativo = segundos < 0;
    segundos = Math.abs(segundos);
    const h = String(Math.floor(segundos / 3600)).padStart(2, '0');
    const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
    const s = String(Math.floor(segundos % 60)).padStart(2, '0');
    const ms = String(Math.floor((segundos % 1) * 100)).padStart(2, '0');
    return `${negativo ? '-' : ''}${h}:${m}:${s}.${ms}`;
}