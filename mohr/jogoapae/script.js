let audioAtivo = false;

function falar(texto) {
  if (!audioAtivo) return;
  speechSynthesis.cancel();

  const fala = new SpeechSynthesisUtterance(texto);
  fala.lang = "pt-BR";
  fala.rate = 1;
  fala.pitch = 1;

  speechSynthesis.speak(fala);
}

function falarNome(nome) {
  falar(nome);
}

function pararAudio() {
  speechSynthesis.cancel();
}

function audioDescricaoInicial() {
  const botao = document.getElementById("gambiarra");

  if (!audioAtivo) {
    audioAtivo = true;
    botao.innerHTML = "🔊 Áudio ligado";

    falar(
      "Bem-vindo ao Jardim dos Guardiões. Primeiro, escolha um avatar entre capivara, tigre, urso, dragão, gato ou cachorro para iniciar o jogo."
    );
  } else {
    audioAtivo = false;
    speechSynthesis.cancel();
    botao.innerHTML = "🔇 Áudio desligado";
  }
}

let arvoreAtual = null;
let etapa = 0;
let dia = 1;

let sacoAberto = false;
let plantado = false;
let regado = false;
let pragaAtiva = false;

let vida = 100;
let energia = 100;
let agua = 0;
let moedas = 20;

let acaoAtual = "loja";

let regandoMiniGame = false;
let animacaoRega = null;
let cursorY = 130;
let velocidadeCursor = 0;
let zonaY = 60;
let velocidadeZona = 0.9;
let progressoRega = 35;
let segurando = false;

let miniPragaAtivo = false;
let pragasRestantes = 0;
let tempoPraga = 30;
let intervaloPraga = null;

const arvores = [
  {
    nome: "Palmeira",
    emoji: "🌴",
    preco: 0,
    comprada: true,
    completas: 0,
    plantas: ["🌱", "🌿", "🌴", "🌴"]
  },
  {
    nome: "Macieira",
    emoji: "🍎",
    preco: 10,
    comprada: false,
    completas: 0,
    plantas: ["🌱", "🌿", "🌳", "🍎"]
  },
  {
    nome: "Árvore Florida",
    emoji: "🌸",
    preco: 15,
    comprada: false,
    completas: 0,
    plantas: ["🌱", "🌿", "🌳", "🌸"]
  },
  {
    nome: "Planta Misteriosa",
    emoji: "🧍",
    preco: 20,
    comprada: false,
    completas: 0,
    plantas: ["🌱", "🌿", "🌳", "imagens/planta-boneco.png"]
  },
  {
    nome: "Bananeira",
    emoji: "🍌",
    preco: 25,
    comprada: false,
    completas: 0,
    plantas: ["🌱", "🌿", "🌴", "🍌"]
  },
  {
    nome: "Pinheiro",
    emoji: "🌲",
    preco: 30,
    comprada: false,
    completas: 0,
    plantas: ["🌱", "🌿", "🌲", "🌲"]
  },
  {
    nome: "Cacto",
    emoji: "🌵",
    preco: 35,
    comprada: false,
    completas: 0,
    plantas: ["🌱", "🌿", "🌵", "🌵"]
  }
];

const missoes = [
  {
    texto: "O feirante chegou e precisa de 3 árvores floridas.",
    tipo: "Árvore Florida",
    quantidade: 3,
    recompensaMoedas: 20
  },
  {
    texto: "A escola pediu 2 macieiras para o pomar.",
    tipo: "Macieira",
    quantidade: 2,
    recompensaMoedas: 18
  },
  {
    texto: "Um turista quer uma área tropical com 2 palmeiras.",
    tipo: "Palmeira",
    quantidade: 2,
    recompensaMoedas: 15
  },
  {
    texto: "O cientista quer estudar 1 planta misteriosa.",
    tipo: "Planta Misteriosa",
    quantidade: 1,
    recompensaMoedas: 25
  },
  {
    texto: "A feira de frutas precisa de 2 bananeiras.",
    tipo: "Bananeira",
    quantidade: 2,
    recompensaMoedas: 25
  },
  {
    texto: "A cidade quer 2 pinheiros para decorar a praça.",
    tipo: "Pinheiro",
    quantidade: 2,
    recompensaMoedas: 30
  },
  {
    texto: "O deserto precisa de 1 cacto resistente.",
    tipo: "Cacto",
    quantidade: 1,
    recompensaMoedas: 20
  }
];

let missaoAtual = 0;

document.addEventListener("keydown", function(e) {
  if (e.code === "Space" && regandoMiniGame) {
    e.preventDefault();
    segurando = true;
  }
});

document.addEventListener("keyup", function(e) {
  if (e.code === "Space") {
    segurando = false;
  }
});

document.addEventListener("mousedown", function() {
  if (regandoMiniGame) segurando = true;
});

document.addEventListener("mouseup", function() {
  segurando = false;
});

function escolherPersonagem(imagem) {
  document.getElementById("animal").src = imagem;
  document.getElementById("tela-personagens").classList.add("hidden");
  document.getElementById("tela-jogo").classList.remove("hidden");
  document.getElementById("gambiarra").classList.add("hidden");

  atualizarStatus();
  montarLojaSementes();
  atualizarMissao();
  atualizarObjetivo("loja", "Escolha uma semente na loja para começar.");
  destacarLoja();
}

function montarLojaSementes() {
  const loja = document.getElementById("loja-sementes");
  loja.innerHTML = "";

  arvores.forEach((arvore, index) => {
    const botao = document.createElement("button");
    botao.classList.add("card-semente");

    botao.onmouseenter = function() {
      if (arvore.comprada) {
        falarNome("Jogar " + arvore.nome);
      } else {
        falarNome("Comprar " + arvore.nome + ". Custa " + arvore.preco + " moedas.");
      }
    };

    botao.onmouseleave = pararAudio;

    if (arvore.comprada) {
      botao.classList.add("semente-comprada");
      botao.innerHTML = `
        <div class="icone-semente">${arvore.emoji}</div>
        <div class="texto-semente">
          <strong>Jogar ${arvore.nome}</strong>
          <small>Disponível • cultivadas: ${arvore.completas}</small>
        </div>
      `;
      botao.onclick = () => escolherArvore(index);
    } else {
      botao.classList.add("semente-bloqueada");
      botao.innerHTML = `
        <div class="icone-semente">${arvore.emoji}</div>
        <div class="texto-semente">
          <strong>Comprar ${arvore.nome}</strong>
          <small>Custa ${arvore.preco} moedas</small>
        </div>
      `;
      botao.onclick = () => comprarArvore(index);
    }

    loja.appendChild(botao);
  });
}

function destacarLoja() {
  const loja = document.querySelector(".loja");
  if (!loja) return;

  loja.classList.remove("destaque-loja");

  setTimeout(() => {
    loja.classList.add("destaque-loja");
  }, 10);

  setTimeout(() => {
    loja.classList.remove("destaque-loja");
  }, 4000);
}

function atualizarMissao() {
  if (missaoAtual >= missoes.length) {
    document.getElementById("missao-texto").innerText =
      "Todas as missões foram concluídas! Você virou Guardião da Natureza.";
    document.getElementById("missao-progresso").innerText = "🏆 Parabéns!";
    return;
  }

  const missao = missoes[missaoAtual];
  const arvore = arvores.find(a => a.nome === missao.tipo);

  document.getElementById("missao-texto").innerText = missao.texto;
  document.getElementById("missao-progresso").innerText =
    `Progresso: ${arvore.completas}/${missao.quantidade} | Recompensa: ${missao.recompensaMoedas} moedas`;
}

function verificarMissao() {
  if (missaoAtual >= missoes.length) return;

  const missao = missoes[missaoAtual];
  const arvore = arvores.find(a => a.nome === missao.tipo);

  if (arvore.completas >= missao.quantidade) {
    moedas += missao.recompensaMoedas;

    document.getElementById("mensagem").innerText =
      `Missão concluída! Você ganhou ${missao.recompensaMoedas} moedas.`;

    missaoAtual++;
    atualizarStatus();
    atualizarMissao();
  }
}

function comprarArvore(index) {
  const arvore = arvores[index];

  if (moedas < arvore.preco) {
    document.getElementById("mensagem").innerText =
      "Você não tem moedas suficientes para comprar essa semente.";
    destacarLoja();
    return;
  }

  moedas -= arvore.preco;
  arvore.comprada = true;

  atualizarStatus();
  montarLojaSementes();

  document.getElementById("mensagem").innerText =
    `Você comprou ${arvore.nome}! Agora clique nela para jogar.`;

  destacarLoja();
}

function escolherArvore(index) {
  arvoreAtual = index;
  etapa = 0;
  dia = 1;
  sacoAberto = false;
  plantado = false;
  regado = false;
  pragaAtiva = false;
  vida = 100;
  agua = 0;

  document.getElementById("nome-arvore").innerText = arvores[arvoreAtual].nome;
  document.getElementById("progresso").style.width = "0%";
  document.getElementById("praga").classList.add("hidden");

  const planta = document.getElementById("planta");
  planta.innerHTML = "";
  planta.classList.add("hidden");
  planta.classList.remove("crescer", "balancar");

  atualizarStatus();
  atualizarObjetivo("sementes", "Abra o saco de sementes.");

  document.getElementById("mensagem").innerText =
    `Você escolheu ${arvores[arvoreAtual].nome}. Abra o saco de sementes.`;
}

function atualizarStatus() {
  document.getElementById("vida").innerText = vida;
  document.getElementById("energia").innerText = energia;
  document.getElementById("agua").innerText = agua;
  document.getElementById("moedas").innerText = moedas;
  document.getElementById("dia").innerText = dia;
}

function atualizarObjetivo(acao, texto) {
  acaoAtual = acao;
  document.getElementById("objetivo-texto").innerText = texto;

  document.querySelectorAll("button").forEach(botao => {
    botao.classList.remove("botao-destaque");
  });

  if (acao === "loja") destacarLoja();
  if (acao === "sementes") document.getElementById("btn-sementes").classList.add("botao-destaque");
  if (acao === "plantar") document.getElementById("btn-plantar").classList.add("botao-destaque");
  if (acao === "regar") document.getElementById("btn-regar").classList.add("botao-destaque");
  if (acao === "dia") document.getElementById("btn-dia").classList.add("botao-destaque");
  if (acao === "praga") document.getElementById("btn-praga").classList.add("botao-destaque");
  if (acao === "descansar") document.getElementById("btn-descansar").classList.add("botao-destaque");
}

function animarAnimal(classe) {
  const animal = document.getElementById("animal");
  animal.classList.remove("andar", "pular", "regando");

  setTimeout(() => {
    animal.classList.add(classe);
  }, 10);
}

function mostrarItem(imagem) {
  const itemAcao = document.getElementById("item-acao");
  itemAcao.src = imagem;
  itemAcao.classList.remove("hidden");

  setTimeout(() => {
    itemAcao.classList.add("hidden");
  }, 1200);
}

function gastarEnergia(valor) {
  energia -= valor;

  if (energia < 0) energia = 0;

  atualizarStatus();

  if (energia === 0) {
    document.getElementById("mensagem").innerText =
      "Seu animal ficou sem energia! Clique em descansar.";
    atualizarObjetivo("descansar", "Seu animal está cansado. Clique em descansar.");
    return false;
  }

  return true;
}

function perderVida(valor, motivo) {
  vida -= valor;

  if (vida < 0) vida = 0;

  const planta = document.getElementById("planta");
  planta.classList.add("dano");

  setTimeout(() => {
    planta.classList.remove("dano");
  }, 500);

  atualizarStatus();

  if (vida === 0) {
    document.getElementById("mensagem").innerText =
      "A planta morreu 😭 A semente será reiniciada.";
    setTimeout(reiniciarArvore, 1800);
  } else {
    document.getElementById("mensagem").innerText = motivo;
  }
}

function atualizarBarra() {
  const totalEtapas = arvores[arvoreAtual].plantas.length;
  const porcentagem = (etapa / totalEtapas) * 100;
  document.getElementById("progresso").style.width = porcentagem + "%";
}

function mostrarPlanta() {
  const planta = document.getElementById("planta");
  const plantaAtual = arvores[arvoreAtual].plantas[etapa - 1];

  planta.innerHTML = "";
  planta.classList.remove("hidden", "crescer", "balancar");

  if (plantaAtual.includes("imagens/")) {
    planta.innerHTML = `<img src="${plantaAtual}" alt="planta">`;
  } else {
    planta.innerText = plantaAtual;
  }

  setTimeout(() => {
    planta.classList.add("crescer");
  }, 10);

  if (etapa === arvores[arvoreAtual].plantas.length) {
    setTimeout(() => {
      planta.classList.add("balancar");
    }, 900);
  }
}

function abrirSaco() {
  if (arvoreAtual === null) {
    document.getElementById("mensagem").innerText =
      "Primeiro escolha uma semente na loja.";
    destacarLoja();
    return;
  }

  if (acaoAtual !== "sementes") return;
  if (!gastarEnergia(5)) return;

  sacoAberto = true;
  animarAnimal("pular");
  mostrarItem("imagens/saco-sementes.png");

  document.getElementById("mensagem").innerText =
    "Você abriu o saco de sementes! Agora plante.";

  atualizarObjetivo("plantar", "Agora plante a semente na terra.");
}

function plantar() {
  if (acaoAtual !== "plantar") return;
  if (!gastarEnergia(10)) return;

  plantado = true;
  etapa = 1;

  animarAnimal("andar");
  mostrarPlanta();
  atualizarBarra();

  document.getElementById("mensagem").innerText =
    "Semente plantada! Agora regue.";

  atualizarObjetivo("regar", "Regue a planta.");
}

function regar() {
  if (acaoAtual !== "regar") return;

  if (energia < 8) {
    document.getElementById("mensagem").innerText =
      "Seu animal está sem energia! Clique em descansar.";
    atualizarObjetivo("descansar", "Seu animal está cansado. Clique em descansar.");
    return;
  }

  iniciarMiniGameRega();
}

function iniciarMiniGameRega() {
  if (regandoMiniGame) return;

  if (animacaoRega !== null) {
    cancelAnimationFrame(animacaoRega);
    animacaoRega = null;
  }

  const miniGame = document.getElementById("miniJogoRega");
  const cursor = document.getElementById("cursor");
  const zona = document.getElementById("zonaVerde");
  const progresso = document.getElementById("progressoRega");

  if (!miniGame || !cursor || !zona || !progresso) {
    document.getElementById("mensagem").innerText =
      "Erro: o mini game de rega não está no HTML.";
    return;
  }

  regandoMiniGame = true;
  cursorY = 130;
  velocidadeCursor = 0;
  zonaY = 60;
  velocidadeZona = 0.35;
  progressoRega = 35;
  segurando = false;

  miniGame.classList.remove("hidden");
  cursor.style.top = cursorY + "px";
  zona.style.top = zonaY + "px";
  progresso.style.width = progressoRega + "%";

  animacaoRega = requestAnimationFrame(loopRega);
}

function loopRega() {
  if (!regandoMiniGame) return;

  const cursor = document.getElementById("cursor");
  const zona = document.getElementById("zonaVerde");

  if (!cursor || !zona) return;

  if (segurando) {
    velocidadeCursor -= 0.16;
  } else {
    velocidadeCursor += 0.14;
  }

  velocidadeCursor *= 0.93;
  cursorY += velocidadeCursor;

  if (cursorY < 0) {
    cursorY = 0;
    velocidadeCursor = 0;
  }

  if (cursorY > 148) {
    cursorY = 148;
    velocidadeCursor = 0;
  }

  zonaY += velocidadeZona;

  if (zonaY <= 0) {
  zonaY = 0;
  velocidadeZona = 0.9;
}

  if (zonaY >= 125) {
  zonaY = 125;
  velocidadeZona = -0.9;
}

  cursor.style.top = cursorY + "px";
  zona.style.top = zonaY + "px";

  const cursorMeio = cursorY + 11;
  const zonaTop = zonaY;
  const zonaBottom = zonaY + 45;

  if (cursorMeio >= zonaTop && cursorMeio <= zonaBottom) {
    progressoRega += 0.25;
  } else {
    progressoRega -= 0.12;
  }

  if (progressoRega < 0) progressoRega = 0;
  if (progressoRega > 100) progressoRega = 100;

  document.getElementById("progressoRega").style.width = progressoRega + "%";

  if (progressoRega >= 100) {
    finalizarMiniGameRega();
    return;
  }

  animacaoRega = requestAnimationFrame(loopRega);
}

function finalizarMiniGameRega() {
  regandoMiniGame = false;

  if (animacaoRega !== null) {
    cancelAnimationFrame(animacaoRega);
    animacaoRega = null;
  }

  const miniGame = document.getElementById("miniJogoRega");
  if (miniGame) miniGame.classList.add("hidden");

  gastarEnergia(8);

  agua++;
  regado = true;
  segurando = false;

  animarAnimal("regando");
  mostrarItem("imagens/regador-agua.png");

  document.getElementById("mensagem").innerText =
    "Boa irrigação! Agora passe o dia.";

  atualizarStatus();
  atualizarObjetivo("dia", "Agora passe o dia.");
}

function passarDia() {
  if (acaoAtual !== "dia") return;

  const cenario = document.querySelector(".cenario");
  const clima = document.getElementById("clima");

  if (pragaAtiva) {
    perderVida(20, "A praga atacou a planta porque você não cuidou dela!");
    pragaAtiva = false;
    document.getElementById("praga").classList.add("hidden");
    atualizarObjetivo("regar", "Regue a planta novamente.");
    return;
  }

  if (!gastarEnergia(12)) return;

  dia++;

  const climaDoDia = sortearClima();

  if (climaDoDia === "chuva") {
    clima.innerText = "🌧️";
    etapa += 1;
    vida += 5;
    document.getElementById("mensagem").innerText =
      "Choveu! A planta ficou mais saudável.";
  } else if (climaDoDia === "tempestade") {
    clima.innerText = "⛈️";
    cenario.classList.add("tempestade");
    etapa += 1;
    perderVida(10, "Teve tempestade! A planta cresceu, mas perdeu vida.");
  } else if (climaDoDia === "frio") {
    clima.innerText = "❄️";
    etapa += 1;
    perderVida(5, "Fez frio! A planta cresceu mais devagar.");
  } else {
    clima.innerText = "☀️";
    etapa += 1;
    document.getElementById("mensagem").innerText =
      "O dia passou e a planta cresceu um pouco.";
  }

  if (vida > 100) vida = 100;

  const totalEtapas = arvores[arvoreAtual].plantas.length;
  if (etapa > totalEtapas) etapa = totalEtapas;

  agua = 0;
  regado = false;

  animarAnimal("pular");

  cenario.classList.add("noite");

  setTimeout(() => {
    cenario.classList.remove("noite", "tempestade");
    clima.innerText = "☀️";
  }, 1200);

  mostrarPlanta();
  atualizarBarra();
  atualizarStatus();

  if (etapa >= totalEtapas) {
    completarArvore();
    return;
  }

  sortearPraga();

  if (!pragaAtiva) {
    atualizarObjetivo("regar", "Regue a planta para continuar crescendo.");
  }
}

function sortearClima() {
  const numero = Math.floor(Math.random() * 100);

  if (numero < 70) return "sol";
  if (numero < 85) return "chuva";
  if (numero < 95) return "frio";
  return "tempestade";
}

function sortearPraga() {
  const chance = Math.floor(Math.random() * 100);

  if (chance < 60 && dia > 1) {
    pragaAtiva = true;
    document.getElementById("praga").classList.remove("hidden");
    document.getElementById("mensagem").innerText += " Cuidado, apareceram pragas!";
    atualizarObjetivo("praga", "Elimine as pragas para salvar a planta.");
  }
}

function espantarPraga() {
  if (!pragaAtiva) {
    document.getElementById("mensagem").innerText =
      "Não tem nenhuma praga agora.";
    return;
  }

  if (energia < 10) {
    document.getElementById("mensagem").innerText =
      "Seu animal está sem energia! Clique em descansar.";
    atualizarObjetivo("descansar", "Seu animal está cansado. Clique em descansar.");
    return;
  }

  iniciarMiniGamePraga();
}

function iniciarMiniGamePraga() {
  if (miniPragaAtivo) return;

  const miniGame = document.getElementById("miniJogoPraga");
  const area = document.getElementById("areaPragas");
  const tempo = document.getElementById("tempoPraga");

  if (!miniGame || !area || !tempo) {
    document.getElementById("mensagem").innerText =
      "Erro: o mini game de pragas não está no HTML.";
    return;
  }

  if (intervaloPraga) {
    clearInterval(intervaloPraga);
    intervaloPraga = null;
  }

  miniPragaAtivo = true;
  pragasRestantes = 7;
  tempoPraga = 30;

  miniGame.classList.remove("hidden");
  area.innerHTML = "";
  tempo.innerText = tempoPraga;

  for (let i = 0; i < pragasRestantes; i++) {
    criarPragaMini();
  }

  intervaloPraga = setInterval(() => {
    tempoPraga--;
    tempo.innerText = tempoPraga;

    if (tempoPraga <= 0) {
      perderMiniGamePraga();
    }
  }, 1000);
}

function criarPragaMini() {
  const area = document.getElementById("areaPragas");
  if (!area) return;

  const praga = document.createElement("div");
  praga.classList.add("praga-mini");
  praga.innerText = "🐛";

  const x = Math.random() * 85;
  const y = Math.random() * 75;

  praga.style.left = x + "%";
  praga.style.top = y + "%";

  praga.onclick = function() {
    if (!praga.parentNode) return;

    praga.onclick = null;
    praga.remove();
    pragasRestantes--;

    if (pragasRestantes <= 0) {
      vencerMiniGamePraga();
    }
  };

  area.appendChild(praga);
}

function vencerMiniGamePraga() {
  miniPragaAtivo = false;

  if (intervaloPraga) {
    clearInterval(intervaloPraga);
    intervaloPraga = null;
  }

  const miniGame = document.getElementById("miniJogoPraga");
  const area = document.getElementById("areaPragas");

  if (miniGame) miniGame.classList.add("hidden");
  if (area) area.innerHTML = "";

  pragaAtiva = false;
  document.getElementById("praga").classList.add("hidden");

  gastarEnergia(10);

  vida += 15;
  if (vida > 100) vida = 100;

  moedas += 3;

  atualizarStatus();
  animarAnimal("andar");

  document.getElementById("mensagem").innerText =
    "Você eliminou todas as pragas! A planta recuperou vida e você ganhou 3 moedas.";

  atualizarObjetivo("regar", "Agora regue a planta.");
}

function perderMiniGamePraga() {
  miniPragaAtivo = false;

  if (intervaloPraga) {
    clearInterval(intervaloPraga);
    intervaloPraga = null;
  }

  const miniGame = document.getElementById("miniJogoPraga");
  const area = document.getElementById("areaPragas");

  if (miniGame) miniGame.classList.add("hidden");
  if (area) area.innerHTML = "";

  pragaAtiva = false;
  document.getElementById("praga").classList.add("hidden");

  perderVida(20, "As pragas atacaram a planta! Ela perdeu vida.");
  atualizarObjetivo("regar", "Regue a planta para tentar recuperar.");
}

function descansar() {
  energia += 35;

  if (energia > 100) energia = 100;

  atualizarStatus();
  animarAnimal("pular");

  document.getElementById("mensagem").innerText =
    "Seu animal descansou e recuperou energia.";

  if (arvoreAtual === null) atualizarObjetivo("loja", "Escolha uma semente na loja.");
  else if (!sacoAberto) atualizarObjetivo("sementes", "Abra o saco de sementes.");
  else if (!plantado) atualizarObjetivo("plantar", "Plante a semente.");
  else if (pragaAtiva) atualizarObjetivo("praga", "Elimine as pragas.");
  else if (!regado) atualizarObjetivo("regar", "Regue a planta.");
  else atualizarObjetivo("dia", "Passe o dia.");
}

function completarArvore() {
  arvores[arvoreAtual].completas++;
  moedas += 12;

  const nome = arvores[arvoreAtual].nome;

  document.getElementById("mensagem").innerText =
    `Você completou ${nome}! Ganhou 12 moedas. Agora escolha outra semente na loja.`;

  atualizarStatus();
  verificarMissao();
  atualizarMissao();

  arvoreAtual = null;
  montarLojaSementes();

  atualizarObjetivo("loja", "Escolha outra semente na loja para continuar.");
  destacarLoja();
}

function reiniciarArvore() {
  etapa = 0;
  dia = 1;
  sacoAberto = false;
  plantado = false;
  regado = false;
  pragaAtiva = false;
  agua = 0;
  vida = 100;

  const planta = document.getElementById("planta");
  planta.innerHTML = "";
  planta.classList.add("hidden");

  document.getElementById("progresso").style.width = "0%";
  document.getElementById("praga").classList.add("hidden");

  atualizarStatus();
  atualizarObjetivo("sementes", "Abra o saco de sementes.");

  document.getElementById("mensagem").innerText =
    "A semente reiniciou. Abra o saco de sementes novamente.";
}