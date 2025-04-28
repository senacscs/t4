function showText(linkElement) {
  event.preventDefault();

  const parentDiv = linkElement.closest('.mm');
  const textDiv = parentDiv.querySelector('.text-info');


  // Mostra o texto
  textDiv.style.display = "block";

  // Função para esconder se clicar fora
  function hideText(event) {
    // Verifica se o clique foi fora do .text-info
    if (!textDiv.contains(event.target) && event.target !== linkElement) {
      textDiv.style.display = "none";
      document.removeEventListener('click', hideText); // Remove o listener depois
    }
  }

  // Adiciona o listener no documento
  setTimeout(() => { // Pequeno atraso para não contar o clique atual
    document.addEventListener('click', hideText);
  }, 10);
}
