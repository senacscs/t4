// https://ionic.io/ionicons
const projetos = [
    {name: "Currículo",
        descricao: "Acesso ao meu currículo.",
        icon: "person-outline",
        padrao: "curriculo"
    },

    {name: "Tabela",
        descricao: "Primeira tabela feita em HTML e CSS.",
        icon: "albums-outline",
        padrao: "tabela1"
    },

    {name: "Calendário 1",
        descricao: "Calendário de um mês, utilizando HTML e CSS.",
        icon: "calendar-number-outline",
        padrao: "calendarioP"
    },

    {name: "Calendário 2",
        descricao: "Calendário com os 12 meses, utilizando HTML e CSS.",
        icon: "calendar-outline",
        padrao: "calendarioG"
    },

    {name: "Formulário 1",
        descricao: "Formulários aplicando os conceitos de inputs, labels, value e estruturação para coleta de dados.",
        icon: "reader-outline",
        padrao: "formulario"
    },

    {name: "Formulário 2",
        descricao: "Formulários aplicando os conceitos de inputs, labels, value e estruturação para coleta de dados.",
        icon: "id-card-outline",
        padrao: "formulario2"
    },

    {name: "Tabela Periódica",
        descricao: "Tabela Periódica permitindo acessar informações sobre cada elemento.",
        icon: "beaker-outline",
        padrao: "tabelaperiodica"
    },

    {name: "Displays",
        descricao: "Site onde explica cada tipo de display.",
        icon: "grid-outline",
        padrao: "displys"
    },

    {name: "Combinadores",
        descricao: "",
        icon: "layers-outline",
        padrao: "combinadores"
    },

    {name: "Pseudo Elementos",
        descricao: "",
        icon: "code-slash-outline",
        padrao: "pseudoelementos"
    },

    {name: "Pseudo Classes",
        descricao: "",
        icon: "cube-outline",
        padrao: "pseudoclasses"
    },

    {name: "Galeria de Flores",
        descricao: "",
        icon: "camera-outline",
        padrao: "galeria"
    },

    {name: "Galeria Tipuanas",
        descricao: "",
        icon: "images-outline",
        padrao: "tia"
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