// Seleciona o elemento que vai conter o poema
const poemaElement = document.getElementById('poema');

// O poema como uma string
const poema = `POEMA-3: Além-Tédio de Mário Sá-Carneiro(Nossa Poesia)
Nada me expira já, nada me vive -
Nem a tristeza nem as horas belas.
De as não ter e de nunca vir a tê-las,
Fartam-me até as coisas que não tive.
Como eu quisera, emfim de alma esquecida,
Dormir em paz num leito de hospital...
Cansei dentro de mim, cansei a vida
De tanto a divagar em luz irreal.
Outrora imaginei escalar os céus
À força de ambição e nostalgia,
E doente-de-Novo, fui-me Deus
No grande rastro fulvo que me ardia.
Parti. Mas logo regressei à dor,
Pois tudo me ruiu... Tudo era igual:
A quimera, cingida, era real,
A propria maravilha tinha côr!
Ecoando-me em silêncio, a noite escura
Baixou-me assim na queda sem remédio;
Eu próprio me traguei na profundura,
Me sequei todo, endureci de tedio.
E só me resta hoje uma alegria:
É que, de tão iguais e tão vazios,
Os instantes me esvoam dia a dia
Cada vez mais velozes, mais esguios...
POEMA: Sentimento do Mundo de Carlos Drummond de Andrade (escritas.org)
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
      setTimeout(apagarLinha, 4000); // Espera 2 segundos antes de apagar a linha
    }
  }

  function apagarLinha() {
    poemaElement.textContent = '';
    setTimeout(mostrarLinha, 111); // Espera 1 segundo antes de mostrar a próxima linha
  }

  mostrarLinha(); // Inicia o processo
}

mostrarEEsconderPoema();