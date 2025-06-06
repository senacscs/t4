function pesquisar() {
    // Obtém a seção HTML onde os resultados serão exibidos
    let section = document.getElementById("resultados-pesquisa");

    let campoPesquisa = document.getElementById("campo-pesquisa").value;

    // Se campoPesquisa for uma string vazia
    if (!campoPesquisa) {
        section.innerHTML = "<p>Nada foi encontrado. Você precisa digitar o nome de um jogo ou de algo relacionado.</p>";
        return;
    }

    campoPesquisa = campoPesquisa.toLowerCase();

    // Inicializa uma string vazia para armazenar os resultados
    let resultados = "";
    let titulo = ""; 
    let descricao = "";
    let tags = "";

    // Se a palavra "lista" for digitada, mostra todos os resultados
    if (campoPesquisa === "lista") {
        for (let dado of dados) {
            resultados += `
            <div class="item-resultado">
                <h2>
                    <a href="#" target="_blank">${dado.titulo}</a>
                </h2>
                <p class="descricao-meta">${dado.descricao}</p>
                <a href=${dado.link} target="_blank">Mais informações</a>
            </div>
        `;
        }
    } else {
        // Itera sobre cada dado da lista de dados
        for (let dado of dados) {
            titulo = dado.titulo.toLowerCase();
            descricao = dado.descricao.toLowerCase();
            tags = dado.tags.toLowerCase();
            // Verifica se o campo de pesquisa está presente no título, descrição ou tags
            if (titulo.includes(campoPesquisa) || descricao.includes(campoPesquisa) || tags.includes(campoPesquisa)) {
                resultados += `
                <div class="item-resultado">
                    <h2>
                        <a href="#" target="_blank">${dado.titulo}</a>
                    </h2>
                    <p class="descricao-meta">${dado.descricao}</p>
                    <a href=${dado.link} target="_blank">Mais informações</a>
                </div>
            `;
            }
        }
    }

    if (!resultados) {
        resultados = "<p>Nada foi encontrado</p>";
    }

    // Atribui os resultados gerados à seção HTML
    section.innerHTML = resultados;
}
