//Categorias
let valueTests = {}; // Objeto para armazenar o estado de cada 'cat' individualmente
let catPass;
let cat;

function opendiv(event) {    
    // Pega o elemento clicado e o id do avô do elemento clicado
    catPass = event.target;
    cat = catPass.parentElement.parentElement.id;

    // Cria a tag <style> e move para a head, se ainda não existe
    let style = document.querySelector(`#style-${cat}`);
    if (!style) {
        style = document.createElement('style');
        style.id = `style-${cat}`; // Define um ID único para cada estilo
        document.head.appendChild(style);
    }

    // Verifica o valor de valueTest para o ID específico e aplica o estilo correspondente
    if (!valueTests[cat]) {
        style.textContent = 
        `
            #${cat} {
                height: auto;
            }
            #${cat} .subdivt ion-icon {
                transform: rotate(90deg);
            }
        `;
        valueTests[cat] = 1; // Marca que o 'cat' está expandido
    } else {
        style.textContent = 
        `
            #${cat} {
                height: 30px;
                background-color: rgba(0, 0, 0, 0);
            }
            #${cat} .subdivt ion-icon {
                transform: rotate(0deg);
            }
        `;
        valueTests[cat] = 0; // Marca que o 'cat' está recolhido
    }
}

//Aplicações
document.addEventListener("DOMContentLoaded", () => {
    let selectedElement = null; // Para garantir que apenas um elemento está selecionado
  
    const subdiveElements = document.getElementsByClassName('subdive'); // Pegando todos os elementos com a classe 'subdive'
  
    Array.from(subdiveElements).forEach(element => {
      element.addEventListener('click', () => {
        const icon = element.getElementsByTagName('ion-icon')[0]; // Pegando o primeiro ion-icon dentro do elemento .subdive
  
        if (selectedElement === element) {
          // Se o elemento clicado já estiver selecionado, desfaz a transformação e a animação
          element.style.transform = '';
          icon.style.animation = '';
          selectedElement = null; // Desmarcar o elemento selecionado
        } else {
          // Se for um novo elemento, aplica as transformações e animações
          if (selectedElement) {
            // Desmarcar o elemento anterior
            selectedElement.style.transform = '';
            const prevIcon = selectedElement.getElementsByTagName('ion-icon')[0];
            if (prevIcon) {
              prevIcon.style.animation = '';
            }
          }
  
          // Aplica as transformações e animações no elemento atual
          element.style.transform = 'translate(10px)';
          icon.style.animation = 'rotateIcon 1s infinite linear';
          selectedElement = element; // Marca o novo elemento como selecionado
        }
      });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    let selectedElement = null; // Para garantir que apenas um elemento .exibido esteja visível por vez

    // Seleciona todos os elementos .subdive
    const subdiveElements = document.querySelectorAll('.subdive');
    
    // Seleciona todos os elementos .exibido
    const exibidoElements = document.querySelectorAll('.exibido');

    // A cada clique em um .subdive
    subdiveElements.forEach((element, index) => {
        element.addEventListener('click', () => {
            // Verifica se o .exibido correspondente já está visível
            if (selectedElement === exibidoElements[index]) {
                // Se já estiver visível, remove a classe 'visible' para ocultá-lo
                exibidoElements[index].classList.remove('visible');
                selectedElement = null; // Remove a seleção
            } else {
                // Se houver um .exibido visível, esconde-o removendo a classe 'visible'
                if (selectedElement) {
                    selectedElement.classList.remove('visible');
                }

                // Exibe o .exibido correspondente ao .subdive clicado
                exibidoElements[index].classList.add('visible');

                // Marca o novo .exibido como o selecionado
                selectedElement = exibidoElements[index];
            }
        });
    });
});

// Seleciona todos os elementos com a classe .exibido
document.querySelectorAll('.exibido').forEach(parent => {
    // Encontra o último script dentro do elemento .exibido
    const lastScript = parent.querySelector('script:last-of-type');
    
    if (lastScript) {
        // Cria o elemento <a> com o href ajustado
        const linkElement = document.createElement('a');
        linkElement.href = lastScript.src;
        linkElement.target = "_blank";

        // Cria o elemento <img> e adiciona ao <a>
        const imgElement = document.createElement('img');
        imgElement.src = "js.png";
        imgElement.alt = "Logo JS";
        linkElement.appendChild(imgElement);

        // Adiciona o <a> ao final do conteúdo do elemento .exibido
        parent.appendChild(linkElement);
    }
});                                                  