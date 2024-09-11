function pesquisar() {
  const pesquisa = document.getElementById('campo-pesquisa').value.toLowerCase();
  const resultados = document.getElementById('resultados-pesquisa');
  resultados.innerHTML = '';

  racas.forEach(raca => {
      if (raca.raça.toLowerCase().includes(pesquisa) ||
          raca.nomeCientifico.toLowerCase().includes(pesquisa) ||
          raca.origem.toLowerCase().includes(pesquisa) ||
          raca.aptidao.toLowerCase().includes(pesquisa) ||
          raca.descricao.toLowerCase().includes(pesquisa)) {
          const resultado = document.createElement('div');
          resultado.classList.add('item-resultado');
          resultado.innerHTML = `
              <img class="capas" aling="left" src=${raca.imagem}>
              <h2>${raca.raça} (${raca.nomeCientifico})</h2>
              <p><strong>Origem:</strong> ${raca.origem}</p>
              <p><strong>Aptidão:</strong> ${raca.aptidao}</p>
              <p>${raca.descricao}</p>
          `;
          resultados.appendChild(resultado);
      }
  });
}