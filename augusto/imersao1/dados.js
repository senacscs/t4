let dados = [
  {
    titulo: "Valorant",
    descricao:
      "Valorant é um jogo de tiro em primeira pessoa (FPS) tático desenvolvido e publicado pela Riot Games. Lançado em 2020, o jogo combina elementos de tiro tático com habilidades únicas dos personagens, criando uma experiência de jogo estratégica e dinâmica.",
    link: "https://www.riotgames.com/en/valorant",
    tags: "FPS tático tático Riot Games",
  },
  {
    titulo: "Roblox",
    descricao:
      "Roblox é uma plataforma de jogos online e um sistema de criação de jogos, desenvolvido e publicado pela Roblox Corporation. Lançado em 2006, ele permite que os usuários criem e joguem jogos feitos por outros jogadores, oferecendo uma ampla gama de experiências interativas.",
    link: "https://www.roblox.com/",
    tags: "plataforma de jogos criação online",
  },
  {
    titulo: "CS:GO",
    descricao:
      "Counter-Strike: Global Offensive (CS:GO) é um jogo de tiro em primeira pessoa desenvolvido pela Valve e Hidden Path Entertainment. Lançado em 2012, é a quarta edição da série Counter-Strike e é conhecido por seu jogo competitivo e altamente estratégico.",
    link: "https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/",
    tags: "FPS competitivo Valve estratégia",
    cate: "fps"
  },
  {
    titulo: "Dead by Daylight",
    descricao: "Dead by Daylight é um jogo de terror e sobrevivência multiplayer assimétrico desenvolvido pela Behaviour Interactive. Lançado em 2016, o jogo coloca um grupo de sobreviventes contra um assassino controlado por outro jogador, oferecendo uma experiência tensa e imprevisível.",
    link: "https://www.deadbydaylight.com/",
    tags: "terror multiplayer sobrevivência"
},
{
    titulo: "Fortnite",
    descricao: "Fortnite é um jogo de battle royale e construção desenvolvido pela Epic Games. Lançado em 2017, ele se tornou um fenômeno cultural com seu modo de jogo gratuito e estilo visual único, combinando ação rápida com construção criativa.",
    link: "https://www.epicgames.com/fortnite",
    tags: "battle royale construção multiplayer"
},
{
    titulo: "Minecraft",
    descricao: "Minecraft é um jogo de sandbox e construção desenvolvido pela Mojang Studios. Lançado em 2011, o jogo permite aos jogadores explorar, construir e sobreviver em um mundo gerado proceduralmente, oferecendo liberdade criativa praticamente ilimitada.",
    link: "https://www.minecraft.net/",
    tags: "sandbox construção criatividade exploração"
},
{
    titulo: "The Elder Scrolls V: Skyrim",
    descricao: "The Elder Scrolls V: Skyrim é um jogo de RPG de mundo aberto desenvolvido pela Bethesda Game Studios. Lançado em 2011, o jogo é conhecido por seu vasto mundo explorável, narrativa rica e sistema de habilidades altamente personalizável.",
    link: "https://store.steampowered.com/app/72850/The_Elder_Scrolls_V_Skyrim/",
    tags: "RPG mundo aberto Bethesda exploração"
},
{
    titulo: "Dota 2",
    descricao: "Dota 2 é um jogo de MOBA (Multiplayer Online Battle Arena) desenvolvido pela Valve Corporation. Lançado em 2013, é uma sequência do mod Defense of the Ancients e é conhecido por seu jogo estratégico em equipe e uma cena competitiva altamente ativa.",
    link: "https://store.steampowered.com/app/570/Dota_2/",
    tags: "MOBA estratégia competitivo Valve"
},
{
    titulo: "Hades",
    descricao: "Hades é um jogo de ação e roguelike desenvolvido pela Supergiant Games. Lançado em 2020, o jogo combina combate rápido com uma narrativa envolvente e a possibilidade de explorar o submundo grego, oferecendo uma experiência desafiadora e recompensadora.",
    link: "https://store.steampowered.com/app/1145360/Hades/",
    tags: "roguelike ação mitologia Supergiant Games"
},
{
    titulo: "Cyberpunk 2077",
    descricao: "Cyberpunk 2077 é um RPG de mundo aberto desenvolvido pela CD Projekt Red. Lançado em 2020, o jogo se passa em uma distopia futurista e oferece uma narrativa profunda, exploração expansiva e um sistema de personalização de personagens complexo.",
    link: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
    tags: "RPG mundo aberto futurista CD Projekt Red"
},
{
    titulo: "Stardew Valley",
    descricao: "Stardew Valley é um jogo de simulação de fazenda e RPG desenvolvido por ConcernedApe. Lançado em 2016, o jogo permite aos jogadores administrar uma fazenda, construir relacionamentos e explorar uma vila encantadora, oferecendo uma experiência relaxante e envolvente.",
    link: "https://store.steampowered.com/app/413150/Stardew_Valley/",
    tags: "simulação fazenda RPG indie"
},
{
    titulo: "Baldur's Gate 3",
    descricao: "Baldur's Gate 3 é um RPG desenvolvido pela Larian Studios, ambientado no universo de Dungeons & Dragons. Lançado em 2023, o jogo é conhecido por sua narrativa rica, escolhas significativas e um sistema de combate baseado em turnos que oferece profundidade estratégica.",
    link: "https://store.steampowered.com/app/1086940/Baldurs_Gate_3/",
    tags: "RPG Dungeons & Dragons narrativa Larian Studios"
},
{
    titulo: "Apex Legends",
    descricao: "Apex Legends é um jogo de battle royale desenvolvido pela Respawn Entertainment. Lançado em 2019, o jogo oferece uma abordagem inovadora com personagens com habilidades únicas e um sistema de ping avançado, promovendo um jogo em equipe dinâmico e estratégico.",
    link: "https://www.ea.com/games/apex-legends",
    tags: "battle royale Respawn multiplayer"
},
{
    titulo: "Hollow Knight",
    descricao: "Hollow Knight é um jogo de ação e aventura estilo metroidvania desenvolvido pela Team Cherry. Lançado em 2017, o jogo se destaca por sua arte 2D deslumbrante, exploração profunda e combate desafiador, ambientado em um mundo subterrâneo misterioso.",
    link: "https://store.steampowered.com/app/367520/Hollow_Knight/",
    tags: "metroidvania ação exploração Team Cherry"
},
{
    titulo: "Free Fire",
    descricao: "Free Fire é um jogo de battle royale desenvolvido pela 111 Dots Studio e publicado pela Garena. Lançado em 2017, é conhecido por suas partidas rápidas e foco em gameplay leve e acessível, com uma grande variedade de personagens e armas.",
    link: "https://freefire.garena.com/",
    tags: "battle royale multiplayer Garena"
},
{
    titulo: "Rainbow Six Siege",
    descricao: "Rainbow Six Siege é um jogo de tiro tático desenvolvido pela Ubisoft. Lançado em 2015, o jogo é conhecido por sua jogabilidade focada em estratégias e táticas, com ênfase em combate em ambientes destrutíveis e equipes com habilidades distintas.",
    link: "https://rainbow6.ubisoft.com/siege/",
    tags: "FPS tático Ubisoft multiplayer"
},
{
    titulo: "Bloodborne",
    descricao: "Bloodborne é um jogo de ação e RPG desenvolvido pela FromSoftware e publicado pela Sony Computer Entertainment. Lançado em 2015, é conhecido por sua atmosfera gótica, combate rápido e desafiador, e um mundo interconectado e sombrio.",
    link: "https://www.playstation.com/en-us/games/bloodborne-ps4/",
    tags: "RPG ação FromSoftware gótico"
},
{
    titulo: "Project Zomboid",
    descricao: "Project Zomboid é um jogo de sobrevivência em mundo aberto desenvolvido pela The Indie Stone. Lançado em acesso antecipado em 2013, o jogo oferece uma experiência realista de sobrevivência em um mundo pós-apocalíptico cheio de zumbis, com um forte foco na gestão de recursos e construção.",
    link: "https://projectzomboid.com/",
    tags: "sobrevivência zumbis indie"
},
{
    titulo: "Skate 3",
    descricao: "Skate 3 é um jogo de simulação de skate desenvolvido pela EA Black Box e publicado pela Electronic Arts. Lançado em 2010, é conhecido por sua jogabilidade fluida, mecânica de truques intuitiva e um ambiente aberto para exploração e criatividade.",
    link: "https://www.ea.com/games/skate/skate-3",
    tags: "skateboarding simulação esportes"
},
{
    titulo: "Dark Souls",
    descricao: "Dark Souls é um RPG de ação desenvolvido pela FromSoftware e publicado pela Namco Bandai Games. Lançado em 2011, o jogo é aclamado por seu desafio intenso, design de nível complexo e uma narrativa que exige interpretação e exploração do mundo sombrio e interconectado.",
    link: "https://store.steampowered.com/app/211420/DARK_SOULS_Remastered/",
    tags: "RPG ação desafio FromSoftware"
},
{
    titulo: "Dark Souls II",
    descricao: "Dark Souls II é a sequência de Dark Souls, desenvolvido pela FromSoftware e publicado pela Namco Bandai Games. Lançado em 2014, o jogo expande a fórmula com um mundo maior, novas mecânicas e uma história independente, mantendo o desafio característico da série.",
    link: "https://store.steampowered.com/app/236430/DARK_SOULS_II/",
    tags: "RPG ação desafio FromSoftware"
},
{
    titulo: "Dark Souls III",
    descricao: "Dark Souls III é a terceira e última entrada principal da série Dark Souls, desenvolvida pela FromSoftware e publicada pela Bandai Namco Entertainment. Lançado em 2016, o jogo combina elementos das edições anteriores com uma narrativa mais coesa e um sistema de combate refinado.",
    link: "https://store.steampowered.com/app/374320/DARK_SOULS_III/",
    tags: "RPG ação desafio FromSoftware"
},
{
    titulo: "Far Cry",
    descricao: "Far Cry é um jogo de tiro em primeira pessoa desenvolvido pela Crytek e publicado pela Ubisoft. Lançado em 2004, o jogo se passa em uma ilha tropical cheia de inimigos e oferece um mundo aberto e dinâmico com um foco em combate e exploração.",
    link: "https://store.steampowered.com/app/13500/Far_Cry/",
    tags: "FPS mundo aberto Ubisoft"
},
{
    titulo: "Far Cry 2",
    descricao: "Far Cry 2 é a sequência do original Far Cry, desenvolvido pela Ubisoft Montreal e publicado pela Ubisoft. Lançado em 2008, o jogo se passa em uma região fictícia da África e é conhecido por seu sistema de mundo aberto, armas realistas e uma narrativa focada na sobrevivência.",
    link: "https://store.steampowered.com/app/19900/Far_Cry_2/",
    tags: "FPS mundo aberto Ubisoft África"
},
{
    titulo: "Far Cry 3",
    descricao: "Far Cry 3 é a terceira edição da série Far Cry, desenvolvida pela Ubisoft Montreal e publicada pela Ubisoft. Lançado em 2012, o jogo se passa em uma ilha tropical e é aclamado por seu enredo envolvente, personagem principal carismático e mundo aberto cheio de atividades e inimigos.",
    link: "https://store.steampowered.com/app/220240/Far_Cry_3/",
    tags: "FPS mundo aberto Ubisoft ilha"
},
{
    titulo: "Far Cry 4",
    descricao: "Far Cry 4 é a sequência de Far Cry 3, desenvolvida pela Ubisoft Montreal e publicada pela Ubisoft. Lançado em 2014, o jogo se passa nas montanhas do Himalaia e apresenta um novo antagonista carismático, uma narrativa envolvente e um mundo aberto vasto com múltiplas facções.",
    link: "https://store.steampowered.com/app/273350/Far_Cry_4/",
    tags: "FPS mundo aberto Ubisoft Himalaia"
},
{
    titulo: "Far Cry Primal",
    descricao: "Far Cry Primal é uma edição spin-off da série Far Cry, desenvolvida pela Ubisoft Montreal e publicada pela Ubisoft. Lançado em 2016, o jogo se passa na Idade da Pedra e apresenta uma abordagem única com foco em combate com armas primitivas e interação com a fauna pré-histórica.",
    link: "https://store.steampowered.com/app/317520/Far_Cry_Primal/",
    tags: "FPS pré-história Ubisoft"
},
{
    titulo: "Far Cry 5",
    descricao: "Far Cry 5 é a quinta edição da série Far Cry, desenvolvida pela Ubisoft Montreal e publicada pela Ubisoft. Lançado em 2018, o jogo se passa nos Estados Unidos, em um condado fictício do Montana, e é conhecido por seu enredo sobre uma seita apocalíptica e uma abordagem de mundo aberto com uma forte ênfase na narrativa.",
    link: "https://store.steampowered.com/app/552520/Far_Cry_5/",
    tags: "FPS mundo aberto Ubisoft EUA"
},
{
    titulo: "Far Cry New Dawn",
    descricao: "Far Cry New Dawn é um spin-off e sequência direta de Far Cry 5, desenvolvido pela Ubisoft Montreal e publicado pela Ubisoft. Lançado em 2019, o jogo se passa 17 anos após os eventos de Far Cry 5 e apresenta um mundo pós-apocalíptico colorido e um sistema de combate aprimorado.",
    link: "https://store.steampowered.com/app/721150/Far_Cry_New_Dawn/",
    tags: "FPS pós-apocalíptico Ubisoft"
},
{
    titulo: "Far Cry 6",
    descricao: "Far Cry 6 é a sexta edição principal da série Far Cry, desenvolvida pela Ubisoft Toronto e publicada pela Ubisoft. Lançado em 2021, o jogo se passa na ilha fictícia de Yara, inspirada em Cuba, e apresenta um novo antagonista e uma narrativa focada na resistência contra um regime opressor.",
    link: "https://store.steampowered.com/app/1344050/Far_Cry_6/",
    tags: "FPS mundo aberto Ubisoft Cuba"
}, 
{
    titulo: "FIFA 15",
    descricao: "FIFA 15 é um jogo de futebol desenvolvido pela EA Canada e publicado pela EA Sports. Lançado em 2014, o jogo apresenta gráficos melhorados, novas mecânicas de jogo e uma experiência mais realista de futebol.",
    link: "https://www.ea.com/games/fifa/fifa-15",
    tags: "futebol EA Sports"
},
{
    titulo: "FIFA 16",
    descricao: "FIFA 16 é a edição de 2015 da série de jogos de futebol da EA Sports. Introduz novos recursos, como a inclusão de times femininos e melhorias no sistema de controle e jogabilidade.",
    link: "https://www.ea.com/games/fifa/fifa-16",
    tags: "futebol EA Sports feminino"
},
{
    titulo: "FIFA 17",
    descricao: "FIFA 17 foi lançado em 2016 e é conhecido por introduzir o motor gráfico Frostbite, proporcionando uma melhoria significativa nos gráficos e na jogabilidade. Também introduziu uma nova narrativa com o modo 'The Journey'.",
    link: "https://www.ea.com/games/fifa/fifa-17",
    tags: "futebol EA Sports Frostbite"
},
{
    titulo: "FIFA 18",
    descricao: "FIFA 18, lançado em 2017, continuou a evolução da série com melhorias no modo 'The Journey' e a inclusão de novas mecânicas de jogabilidade. O jogo também recebeu elogios pelos seus gráficos aprimorados.",
    link: "https://www.ea.com/games/fifa/fifa-18",
    tags: "futebol EA Sports gráficos"
},
{
    titulo: "FIFA 19",
    descricao: "FIFA 19, lançado em 2018, trouxe a UEFA Champions League para a série pela primeira vez e continuou a refinar as mecânicas de jogo e os gráficos. O modo 'The Journey' também foi expandido.",
    link: "https://www.ea.com/games/fifa/fifa-19",
    tags: "futebol UEFA EA Sports"
},
{
    titulo: "FIFA 20",
    descricao: "FIFA 20 foi lançado em 2019 e introduziu o modo 'Volta Football', que se concentra em jogos de futsal e street soccer. Também trouxe melhorias na jogabilidade e na inteligência artificial.",
    link: "https://www.ea.com/games/fifa/fifa-20",
    tags: "futebol EA Sports Volta"
},
{
    titulo: "FIFA 21",
    descricao: "FIFA 21, lançado em 2020, trouxe melhorias na jogabilidade e nos gráficos, além de ajustes no modo 'Ultimate Team' e novas opções de personalização. O jogo também melhorou a inteligência artificial e o modo de carreira.",
    link: "https://www.ea.com/games/fifa/fifa-21",
    tags: "futebol EA Sports Ultimate Team"
},
{
    titulo: "FIFA 22",
    descricao: "FIFA 22, lançado em 2021, introduziu o novo motor de jogo HyperMotion para melhorar a jogabilidade e a movimentação dos jogadores. Também continuou a expandir o modo 'Ultimate Team' e 'Carreira'.",
    link: "https://www.ea.com/games/fifa/fifa-22",
    tags: "futebol EA Sports HyperMotion"
},
{
    titulo: "FIFA 23",
    descricao: "FIFA 23, lançado em 2022, foi o último jogo da série a usar o nome FIFA antes da mudança para EA Sports FC. O jogo trouxe novas melhorias gráficas e de jogabilidade, e continuou a expandir o modo 'Ultimate Team' e 'Carreira'.",
    link: "https://www.ea.com/games/fifa/fifa-23",
    tags: "futebol EA Sports gráficos"
},
{
    titulo: "EA Sports FC 24",
    descricao: "EA Sports FC 24 é o primeiro jogo da série após a mudança de nome de FIFA. Lançado em 2023, o jogo mantém a fórmula de sucesso com novas inovações em jogabilidade, gráficos e modos de jogo.",
    link: "https://www.ea.com/games/ea-sports-fc/ea-sports-fc-24",
    tags: "futebol EA Sports nova era"
},
{
    titulo: "League of Legends",
    descricao: "League of Legends é um dos maiores jogos de MOBAs do mundo, onde duas equipes de cinco jogadores se enfrentam em um campo de batalha estratégico. Lançado em 2009, o jogo continua a evoluir com novos campeões, atualizações e eventos, mantendo sua popularidade através de um equilíbrio refinado e uma comunidade vibrante.",
    link: "https://www.leagueoflegends.com",
    tags: "MOBA, estratégia, campeões, eSports"
},
{
    titulo: "Overwatch",
    descricao: "Overwatch é um jogo de tiro em equipe lançado em 2016, que combina ação rápida com uma rica variedade de heróis, cada um com habilidades únicas. O jogo é conhecido por seus mapas dinâmicos e modos de jogo variados, proporcionando uma experiência multiplayer altamente colaborativa e envolvente.",
    link: "https://playoverwatch.com",
    tags: "FPS, heróis, ação, multiplayer"
},
{
    titulo: "Bloons TD 6",
    descricao: "Bloons TD 6 é a mais recente adição à popular série de defesa de torres, oferecendo um desafio estratégico divertido e envolvente. Lançado em 2018, o jogo apresenta novas torres, mapas e modos, permitindo aos jogadores enfrentar ondas cada vez mais difíceis de bloons com uma variedade de estratégias e melhorias.",
    link: "https://www.ninjakiwi.com/Games/Tower-Defense/Bloons-TD-6",
    tags: "estratégia, defesa de torres, bloons, diversão"
},
{
    titulo: "Grand Theft Auto V",
    descricao: "Grand Theft Auto V, lançado em 2013, é um jogo de ação e aventura em mundo aberto desenvolvido pela Rockstar Games. O jogo se passa na fictícia cidade de Los Santos e segue três protagonistas jogáveis em uma trama de crime e intriga. É conhecido por seu vasto mundo aberto, narrativa envolvente e detalhada, e um modo online expansivo.",
    link: "https://www.rockstargames.com/V",
    tags: "ação, aventura, mundo aberto, crime"
},
{
    titulo: "Grand Theft Auto: San Andreas",
    descricao: "Grand Theft Auto: San Andreas, lançado em 2004, é um jogo de ação e aventura em mundo aberto que se passa no estado fictício de San Andreas. O jogo segue a história de CJ, um gangster que retorna à sua cidade natal para recuperar seu antigo território e enfrentar diversas ameaças. É aclamado por sua vasta área de jogo, variedade de missões e personalização de personagens.",
    link: "https://www.rockstargames.com/sanandreas",
    tags: "ação, aventura, mundo aberto, gangster"
}
];
