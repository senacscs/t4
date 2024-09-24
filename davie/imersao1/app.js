function pesquisar() {
  // Obtém a seção HTML onde os resultados serão exibidos
  let section = document.getElementById("resultados-pesquisa");

  let campoPesquisa = document.getElementById("campo-pesquisa").value

  // se campoPesquisa for uma string sem nada
  if (!campoPesquisa) {
      section.innerHTML = "<p class='fundo'>Nada foi encontrado. Digite o apelido ou nome do cantor, mas estadunidense.</p>"
      return 
  }

  campoPesquisa = campoPesquisa.toLowerCase()

  // Inicializa uma string vazia para armazenar os resultados
  let resultados = "";
  let titulo = ""; 
  let descricao = "";
  let tags = "";
  let imagem = "";


  // Itera sobre cada dado da lista de dados
  for (let dado of dados) {
      titulo = dado.titulo.toLowerCase()
      descricao = dado.descricao.toLowerCase()
      tags = dado.tags.toLowerCase()
      // se titulo includes campoPesquisa
      if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
          // cria um novo elemento
          resultados += `
          <div class="item-resultado">
              <h2>
                  <a href="#" target="_blank">${dado.titulo}</a>
              </h2>
              <img src=${dado.imagem}>
              <p class="descricao-meta">${dado.descricao}</p>
              <a href=${dado.link} target="_blank">Veja mais sobre:</a>
          </div>
      `;
      }
  }

  if (!resultados) {
      resultados = "<p class='fundo'>Não existe ainda.</p>"
  }

  // Atribui os resultados gerados à seção HTML
  section.innerHTML = resultados;
}
const button = document.getElementById('send');

button.addEventListener('click', () => {
  button.classList.add('piscar');
  setTimeout(() => {
    button.classList.remove('piscar');
  }, 1000);
});