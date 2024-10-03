// Seleciona o elemento que vai conter o poema
const poemaElement = document.getElementById('poema');

// O poema como uma string
const poema = `POEMA-5:Sentimento do Mundo de Carlos Drummond de Andrade (escritas.org)
Tenho apenas duas mãos
e o sentimento do mundo,
mas estou cheio de escravos,
minhas lembranças escorrem
e o corpo transige
na confluência do amor.

Quando me levantar, o céu
estará morto e saqueado,
eu mesmo estarei morto,
morto meu desejo, morto
o pântano sem acordes.

Os camaradas não disseram
que havia uma guerra
e era necessário
trazer fogo e alimento.
Sinto-me disperso,
anterior a fronteiras,
humildemente vos peço
que me perdoeis.

Quando os corpos passarem,
eu ficarei sozinho
desfiando a recordação
do sineiro, da viúva e do microscopista
que habitavam a barraca
e não foram encontrados
ao amanhecer

esse amanhecer
mais noite que a noite.
 //-~-~-~-~-~-~--~-~-~-~-~-~-~-~-~-~--~-~-~-~-FIM dos poemas-~-~-~-~-~-~-~--~-~-~-~-~--~-~-~-~-~-~-~-~--~-~-~-//
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