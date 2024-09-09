function pesquisar() {
    const pesquisa = document.getElementById('campo-pesquisa').value.toLowerCase();
    const resultados = document.getElementById('resultados-pesquisa');
    resultados.innerHTML = '';
  
    jogadores.forEach(jogador => {
      if (jogador.nome.toLowerCase().includes(pesquisa) ||
          jogador.posicao.toLowerCase().includes(pesquisa) ||
          jogador.nacionalidade.toLowerCase().includes(pesquisa)) {
        const resultado = document.createElement('div');
        resultado.classList.add('item-resultado');
        resultado.innerHTML = `
          <img src="${jogador.imagem}" alt="${jogador.nome}">
          <h2>${jogador.nome}</h2>
          <p><strong>Posição:</strong> ${jogador.posicao}</p>
          <p><strong>Nacionalidade:</strong> ${jogador.nacionalidade}</p>
          <p>${jogador.descricao}</p>
        `;
        resultados.appendChild(resultado);
      }
    });
  }