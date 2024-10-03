// Seleciona o elemento que vai conter o poema
const poemaElement = document.getElementById('poema');

// O poema como uma string
const poema = `POEMA-4:Nostalgia de Mario Benedetti (poemas-del-alma.com) - Traduzido por mim
Do que a nostalgia se alimenta?
Evoca-se doçura,
céus atormentados,
tempestades celestiais, escândalos silenciosos,
paciência esticada,
árvores ao vento
, opróbrios dispensáveis,
belezas do mercado
, cantos e alvoroços,
garoas como tristeza
, espingardas de sono
, perdões merecidos
, mas com esses mínimos
a nostalgia
não está armada, são meros simulacros
O válido, a única
nostalgia é pela sua pele.
`;

// Função para adicionar o poema ao elemento e iniciar o efeito de desaparecimento
function mostrarEEsconderPoema() {
  // Divide o poema em linhas
  const linhas = poema.split('\n');

  let index = 0;

  // Função recursiva para mostrar e apagar uma linha por vez
  function mostrarLinha() {
    if (index < linhas.length) {
      poemaElement.textContent = linhas[index];
      index++;
      setTimeout(apagarLinha, 3500); // Espera 3.5 segundos antes de apagar a linha
    }
  }

  function apagarLinha() {
    poemaElement.textContent = '';
    setTimeout(mostrarLinha, 1); // Espera 0.001 segundo antes de mostrar a próxima linha
  }

  mostrarLinha(); // Inicia o processo
}

mostrarEEsconderPoema();