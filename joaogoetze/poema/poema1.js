// Seleciona o elemento que vai conter o poema
const poemaElement = document.getElementById('poema');

// O poema como uma string
const poema = `POEMA-1:Infância de Manuel Bandeira (escritas.org)                                                                                                
Corrida de ciclistas.
Só me recordo de um bambual debruçado no rio.
Três anos?
Foi em Petrópolis.
Procuro mais longe em minhas reminiscências.
Quem me dera me lembrar da teta negra de minh'ama-de-leite...
... Meus olhos não conseguem romper os ruços definitivos do tempo.
Ainda em Petrópolis... um pátio de hotel... brinquedos pelo chão...
Depois a casa de São Paulo.
Miguel Guimarães, alegre, míope e mefistofélico,
Tirando reloginhos de plaquê da concha de minha orelha.
O urubu pousado no muro do quintal.
Fabrico uma trombeta de papel.
Comando...
O urubu obedece.
Fujo, aterrado do meu primeiro gesto de magia.
Depois... a praia de Santos...
Corridas em círculos riscados na areia...
Outra vez Miguel Guimarães, juiz de chegada, com os seus presentinhos.
A ratazana enorme apanhada na ratoeira.
Outro bambual...
O que inspirou a meu irmão o seu único poema:
Eu ia por um caminho,
Encontrei um maracatu.
O qual vinha direitinho
Pelas flechas de um bambu.
As marés de equinócio,
O jardim submerso...
Meu tio Cláudio erguendo do chão uma ponta de mastro destroçado.
Poesia dos naufrágios!
Depois Petrópolis novamente.
Eu, junto do tanque, de linha amarrada no incisivo de leite, sem coragem de puxar.
Véspera de Natal... Os chinelinhos atrás da porta...
E a manhã seguinte, na cama, deslumbrado com os brinquedos trazidos pela fada.
E a chácara da Gávea?
E a casa da Rua Don'Ana?
Boy, o primeiro cachorro.
Não haveria outro nome depois
(Em casa até as cadelas se chamavam Boy).
Medo de gatunos...
Para mim eram homens com cara de pau.
A volta a Pernambuco!
Descoberta dos casarões de telha-va.
Meu avô materno — um santo...
Minha avó batalhadora.
A casa da Rua da União.
O pátio — núcleo de poesia.
O banheiro — núcleo de poesia.
O cambrone — núcleo de poesia (la fraicheur des latrines!).
A alcova de música — núcleo de mistério.
Tapetinhos de peles de animais.
Ninguém nunca ia lá... Silêncio... Obscuridade...
O piano de armário, teclas amarelecidas, cordas desafinadas.
Descoberta da rua!
Os vendedores a domicílio.
Ai mundo dos papagaios de papel, dos piões, da amarelinha!
Uma noite a menina me tirou da roda de coelho-sai, me levou, imperiosa e ofegante, 
para um desvão da casa de Dona Aninha Viegas, levantou a sainha e disse mete.
Depois meu avô... Descoberta da morte!
Com dez anos vim para o Rio.
Conhecia a vida em suas verdades essenciais.
Estava maduro para o sofrimento
E para a poesia!
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