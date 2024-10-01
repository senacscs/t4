function scrollDivSmoothly() {
  // Obtém o elemento div a ser rolado
  const element = document.getElementById('scroll-container');

  // Calcula a nova posição de rolagem (ajuste o valor para controlar a velocidade)
  let newPosition = element.scrollTop + 1;

  // Aplica a nova posição de rolagem
  element.scrollTop = newPosition;

  // Chama a função novamente após um intervalo de tempo (ajuste o valor para controlar a velocidade)
  setTimeout(scrollDivSmoothly, 45);
}

// Inicia a rolagem automática
scrollDivSmoothly();