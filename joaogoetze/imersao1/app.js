function pesquisar() {
    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    let campoPesquisa = document.getElementById("campo-pesquisa").value;

    // se campoPesquisa for uma string sem nada
    if (!campoPesquisa) {
        section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar a raça do gato ou só gato </p>";
        return;
    }

    campoPesquisa = campoPesquisa.toLowerCase();

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";

    // Itera sobre cada dado da lista de dados
    for (let dado of dados) {
        let titulo = dado.titulo ? dado.titulo.toLowerCase() : "";
        let descricao = dado.descricao ? dado.descricao.toLowerCase() : "";
        let tags = dado.tags ? dado.tags.toLowerCase() : "";

        // se tags includes campoPesquisa
        if (tags.includes(campoPesquisa)) {
            // cria um novo elemento
            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="#" target="_blank">${dado.titulo}</a>
                     <img class="capas" aling="left" src="${dado.foto}">
                </h2>
                <p class="descricao-meta">${dado.descricao}</p>
                <h2><a href=${dado.link} class="informacao" target="_blank">Mais informações</a></h2>
            </div> `;
        }
    }

    if (!resultados) {
        resultados = "<p>Nada foi encontrado veja se você digitou errado</p>";
    }

    // Atribui os resultados gerados à seção HTML
    section.innerHTML = resultados;
}