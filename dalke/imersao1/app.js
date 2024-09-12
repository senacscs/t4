function pesquisar() {
  const pesquisa = document.getElementById('campo-pesquisa').value.toLowerCase();
  const resultados = document.getElementById('resultados-pesquisa');
  resultados.innerHTML = '';

racas.sort((a, b) => {
  const razaA = a.raça.toLowerCase();
  const razaB = b.raça.toLowerCase();
  if (razaA < razaB) {
      return -1;
  }
  if (razaA > razaB) {
      return 1;
  }
  return 0;
});
racas.forEach(raca => {
  console.log(raca.raça);
});

  racas.forEach(raca => {
      if (raca.raça.toLowerCase().includes(pesquisa) ||
          raca.nomeCientifico.toLowerCase().includes(pesquisa) ||
          raca.origem.toLowerCase().includes(pesquisa) ||
          raca.aptidao.toLowerCase().includes(pesquisa) ||
          raca.descricao.toLowerCase().includes(pesquisa)) {
          const resultado = document.createElement('div');
          resultado.classList.add('item-resultado');
          resultado.innerHTML = `
              <div class="resultado-flex">
                  <img class="imagem" src=${raca.imagem}>
                  <div class="dados-animal">
                      <h2>${raca.raça} (${raca.nomeCientifico})</h2>
                      <p><strong>Origem:</strong> ${raca.origem}</p>
                      <p><strong>Aptidão:</strong> ${raca.aptidao}</p>
                      <p><strong>Pelagem:</strong> ${raca.pelagem}</p>
                      <p><strong>Peso:</strong> ${raca.pesoMedio}</p>
                      <p>${raca.descricao}</p>
                  </div>
              </div>
          `;
          resultados.appendChild(resultado);
      }
  });
}