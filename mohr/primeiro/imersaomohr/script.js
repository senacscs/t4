const imagem = document.getElementById('imagemPula');
const velocidade = 3; // Pixels por movimento
let posX = 0;
let posY = 0;
let direcaoX = 1;
let direcaoY = 1;

function moverImagem() {
  const larguraTela = window.innerWidth;
  const alturaTela = window.innerHeight;
  const larguraImagem = imagem.offsetWidth;
  const alturaImagem = imagem.offsetHeight;

  // Atualiza a posição da imagem
  posX += velocidade * direcaoX;
  posY += velocidade * direcaoY;

  // Verifica se a imagem bateu nas bordas horizontais
  if (posX + larguraImagem >= larguraTela || posX <= 0) {
    direcaoX *= -1; // Inverte a direção horizontal
  }

  // Verifica se a imagem bateu nas bordas verticais
  if (posY + alturaImagem >= alturaTela || posY <= 0) {
    direcaoY *= -1; // Inverte a direção vertical
  }

  // Define a nova posição da imagem
  imagem.style.left = posX + 'px';
  imagem.style.top = posY + 'px';

  // Chama a função de novo para continuar o movimento
  requestAnimationFrame(moverImagem);
}

// Inicia a animação
moverImagem();
