// https://ionic.io/ionicons
const projetos = [
    {name: "Portugol_JS",
        descricao: "linguagem de Portugol, para a linguagem de programação JS(Java Script).",
        icon: "code-slash",
        padrao: "portugoljs"
    },
]

function renderProjetos() {
    const container = document.querySelector('.card-container');
    projetos.forEach(projeto => {
        const card = document.createElement('a');
        card.href = `segundo/${projeto.padrao}`;
        card.innerHTML = `
            <div class="card">
                <div class="card-icon">
                    <ion-icon name="${projeto.icon}"></ion-icon>
                </div>
                <div class="card-text">
                    <h1>${projeto.name}</h1>
                    <p>${projeto.descricao}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderProjetos);