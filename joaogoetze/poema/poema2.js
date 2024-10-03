// Seleciona o elemento que vai conter o poema
const poemaElement = document.getElementById('poema');

// O poema como uma string
const poema = `POEMA-2:Aquilo que a gente lembra, de Fernando Pessoa 
Aquilo que a gente lembra
Sem o querer lembrar,
E incerto se desmembra
Como um fumo no ar,
É a música que a alma tem,
É o perfume que vem,
Vago, inútil, trazido
Por uma brisa de agrado,
Do fundo do que é esquecido,
Dos jardins do passado.
Aquilo que a gente sonha
Sem saber de sonhar,
Aquela boca risonha
Que nunca nos quis beijar,
Aquela vaga ironia
Que uns olhos tiveram um dia
Para a nossa emoção —
Tudo isso nos dá o agrado,
Do aroma que as flores são
Nos jardins do passado.
Não sei o que fiz da vida,
Nem o que quero saber.
Se a tenho por perdida,
Sei eu o que é perder?
Mas tudo é música se há
Alma onde a alma está,
E há um vago, suave sono,
Um sonho morno de agrado,
Quando regresso, dono,
Aos jardins do passado.~
 //-~-~-~-~-~-~--~-~-~-~-~-~-~-~-~-~--~-~-~-~-FIM desse poema-~-~-~-~-~-~-~--~-~-~-~-~--~-~-~-~-~-~-~-~--~-~-~-//
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