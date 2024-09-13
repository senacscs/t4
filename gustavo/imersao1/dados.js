let dados = [
    {
        titulo: "Fortnite Battle Royale",
        descricao: " Conhecido por suas constantes atualizações e construções épicas, Fortnite oferece um mundo aberto vibrante e cheio de possibilidades. Além do modo Battle Royale, o jogo conta com o modo Criativo, onde os jogadores podem construir suas próprias ilhas e minigames.",
        link: "https://www.fortnite.com/@epic/battle-royale?lang=en-US",
        imagem: "imagns/FortniteBattleRoyale.jpg",
        tags: "Fortnite Battle Royale"
    },
    {
        titulo: "PUBG Battlegrounds",
        descricao: "Um dos pioneiros do gênero, PUBG oferece um gameplay mais realista e mapas extensos para explorar. A busca por armas e equipamentos, combinada com a necessidade de se esconder da zona de perigo, proporciona uma experiência intensa.",
        link: "https://store.playstation.com/de-de/product/EP5262-CUSA14391_00-PTSBUN0000000000",
        imagem: "imagens/PUBGBattlegrounds.jpg",
        tags: "PUBG Battlegrounds"
    },
    {
        titulo: "Apex Legends",
        descricao: "Com personagens carismáticos e habilidades únicas, Apex Legends traz um ritmo acelerado e jogabilidade focada em equipe. As lendas, como são chamados os personagens, possuem habilidades complementares, o que torna o trabalho em equipe fundamental para a vitória.",
        link: "https://www.nintendo.com/us/store/products/apex-legends-switch/",
        imagem: "imagens/ApexLegends.jpg",
        tags: "Apex Legends"
    },
    {
        titulo: "Call of Duty: Warzone",
        descricao: "A franquia Call of Duty traz sua marca registrada de tiroteios intensos para um mundo aberto massivo. Warzone oferece um gameplay frenético, com veículos, contratos e um sistema de gulag que adicionam uma camada extra de estratégia.",
        link: "https://www.callofduty.com/store/games/warzone",
        imagem: "imagens/CallofDutyWarzone.jpg",
        tags: "Call of Duty: Warzone"
    },
    {
        titulo: "Scavengers",
        descricao: "Um Battle Royale com foco em sobrevivência e crafting, ambientado em um futuro pós-apocalíptico. Os jogadores devem explorar o mapa em busca de recursos para construir armas, ferramentas e abrigo, além de enfrentar outros sobreviventes.",
        link: "https://www.bing.com/search?pglt=41&q=Scavengers&cvid=d907f1490dc0451fbacc24db72ca4f2a&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQABhAMgYIAhAAGEAyBggDEAAYQDIGCAQQABhAMgYIBRAAGEAyBggGEAAYQDIGCAcQABhAMgYICBAAGEAyCAgJEOkHGPxV0gEHODg2ajBqMagCALACAA&FORM=ANNAB1&PC=U531",
        imagem: "imagens/Scavengers.jpg",
        tags: "Scavengers"
    },
    {
        titulo: "Ring of Elysium",
        descricao: "Um jogo com um mapa gigante e diversas opções de veículos para explorar, oferecendo uma experiência mais estratégica. Além do modo Battle Royale, Ring of Elysium conta com outros modos de jogo, como um modo de fuga em equipe.",
        link: "https://www.bing.com/search?q=%20Ring%20of%20Elysium&qs=n&form=QBRE&sp=-1&lq=0&pq=%20ring%20of%20elysium&sc=6-16&sk=&cvid=3F33C90AEAE44F8696F7CC7B59A6E5AD&ghsh=0&ghacc=0&ghpl=",
        imagem: "imagens/RingofElysium.jpg",
        tags: "Ring of Elysium"
    },   
    {
        titulo: "Free Fire",
        descricao: "Um dos Battle Royales mais populares para dispositivos móveis, com partidas rápidas e jogabilidade intuitiva. Free Fire oferece uma experiência divertida e acessível, com personagens personalizáveis e um sistema de progressão gratificante.",
        link: "https://play.google.com/store/apps/details?id=com.dts.freefireth&hl=pt_BR&pli=1",
        imagem: "imagens/freefire.jpg",
        tags: "Free Fire"
    },
    {
        titulo: "Naraka: Bladepoint",
        descricao: "Um Battle Royale que oferece uma experiência de Battle Royale única, combinando a emoção do combate medieval com a adrenalina dos jogos de ação. Se você está cansado dos tradicionais Battle Royales e busca algo novo e emocionante, Naraka é definitivamente um jogo que você precisa experimentar.",
        link: "https://www.bing.com/search?pglt=41&q=Naraka%3A+Bladepoint&cvid=d3196a4089ca4a28916ffddc974fef1f&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg6MggIAhDpBxj8VdIBCDM1ODBqMGoxqAIAsAIA&FORM=ANNAB1&PC=U531",
        imagem: "imagens/NarakaBladepoint.jpg",
        tags: "Naraka: Bladepoint"
    },
    {
        titulo: "Spellbreak",
        descricao: "É  um Battle Royale único que coloca a magia no centro da ação. Se você é fã de jogos de fantasia e quer experimentar um combate mágico inovador, Spellbreak é a escolha perfeita.",
        link: "https://www.bing.com/search?q=Spellbreak&qs=n&form=QBRE&sp=-1&lq=0&pq=spellbreak&sc=6-10&sk=&cvid=6B56962197DF46D7991CC6617932D417&ghsh=0&ghacc=0&ghpl=",
        imagem: "imagens/Spellbreak.jpg",
        tags: "Spellbreak"
    },
    {
        titulo: "Vampire: The Masquerade - Bloodhunt",
        descricao: "É um Battle Royale único que combina a ação frenética dos jogos de tiro com o universo rico e intrigante dos vampiros. Se você busca uma experiência de jogo emocionante e cheia de adrenalina, Bloodhunt é a escolha perfeita.",
        link: "https://www.bing.com/search?q=Spellbreak&qs=n&form=QBRE&sp=-1&lq=0&pq=spellbreak&sc=6-10&sk=&cvid=6B56962197DF46D7991CC6617932D417&ghsh=0&ghacc=0&ghpl=",
        imagem: "imagens/VampireTheMasqueradeBloodhunt.jpg",
        tags: "Vampire: The Masquerade - Bloodhunt"
    },
    {
        titulo: "The Elder Scrolls V: Skyrim",
        descricao: "Um dos RPGs mais aclamados de todos os tempos, Skyrim oferece um mundo aberto vasto e detalhado, repleto de dragões, magia e liberdade para escolher seu próprio caminho.",
        link: "https://www.nintendo.com/pt-br/store/products/the-elder-scrolls-v-skyrim-switch/",
        imagem: "imagens/TheElderScrollsVSkyrim.jpg",
        tags: "The Elder Scrolls V: Skyrim"
    },
    {
        titulo: "The Witcher 3: Wild Hunt",
        descricao: "Com uma narrativa envolvente, personagens complexos e um mundo rico em detalhes, The Witcher 3 é uma experiência épica que combina combate intenso com exploração.",
        link: "https://www.thewitcher.com/us/en/witcher3",
        imagem: "imagens/TheWitcher3WildHunt.jpg",
        tags: "The Witcher 3: Wild Hunt"
    },
    {
        titulo: "Grand Theft Auto V",
        descricao: "Um dos jogos mais vendidos da história, GTA V oferece um mundo aberto vibrante e cheio de possibilidades, com missões épicas, personagens memoráveis e um modo online multiplayer.",
        link: "https://www.rockstargames.com/gta-v",
        imagem: "imagens/GrandTheftAutoV.jpg",
        tags: "Grand Theft Auto V"
    },
    {
        titulo: "Red Dead Redemption 2",
        descricao: "Uma obra de arte interativa, Red Dead Redemption 2 oferece um mundo aberto deslumbrante, com uma história emocionante, personagens complexos e uma atenção incrível aos detalhes.",
        link: "https://www.bing.com/search?q=Red%20Dead%20Redemption%202&qs=n&form=QBRE&sp=-1&lq=0&pq=red%20dead%20redemption%202&sc=6-21&sk=&cvid=EDF7A04DDE39461C83F803C61699A90B&ghsh=0&ghacc=0&ghpl=",
        imagem: "RedDeadRedemption2.jpg",
        tags: "Red Dead Redemption 2"
    },
    {
        titulo: "Ghost of Tsushima",
        descricao: "TsushimaUma carta de amor aos filmes de samurai, Ghost of Tsushima oferece uma experiência visualmente deslumbrante, com um combate fluido e uma história emocionante sobre honra e vingança.",
        link: "https://www.bing.com/search?q=Ghost%20of%20Tsushima&qs=n&form=QBRE&sp=-1&lq=0&pq=ghost%20of%20tsushima&sc=6-17&sk=&cvid=189C36AE124B4CE5A884A10693F727D6&ghsh=0&ghacc=0&ghpl=",
        imagem: "GhostofTsushima.jpg",
        tags: "Ghost of Tsushima"
    },
    {
        titulo: "Horizon Zero Dawn",
        descricao: "Uma aventura épica em um mundo pós-apocalíptico dominado por máquinas, Horizon Zero Dawn combina combate intenso com exploração e uma história envolvente.",
        link: "https://www.bing.com/search?q=Horizon%20Zero%20Dawn&qs=n&form=QBRE&sp=-1&lq=0&pq=horizon%20zero%20dawn&sc=6-17&sk=&cvid=65E011604623428EABFEFD8735663694&ghsh=0&ghacc=0&ghpl=",
        imagem: "HorizonZeroDawn.jpg",
        tags: "Horizon Zero Dawn"
    },   
    {
        titulo: "Elden Ring",
        descricao: "Um RPG de ação desafiador que oferece um mundo aberto vasto e interconectado, repleto de perigos e recompensas.",
        link: "https://www.bing.com/search?q=Elden%20Ring&qs=n&form=QBRE&sp=-1&lq=0&pq=&sc=10-0&sk=&cvid=773E9596C42349BFAAB6A532F70D5A22&ghsh=0&ghacc=0&ghpl=",
        imagem: "EldenRing.jpg",
        tags: "Elden Ring"
    },
    {
        titulo: "Cyberpunk 2077",
        descricao: "Um RPG de mundo aberto ambientado em um futuro distópico, Cyberpunk 2077 oferece uma narrativa ramificada, personagens complexos e um mundo visualmente impressionante.",
        link: "https://www.playstation.com/en-us/games/cyberpunk-2077/",
        imagem: "Cyberpunk2077.jpg",
        tags: "Cyberpunk 2077"
    },
    {
        titulo: "Minecraft",
        descricao: "Um dos jogos mais populares de todos os tempos, Minecraft oferece um mundo aberto infinito para explorar e criar, com infinitas possibilidades.",
        link: "https://www.nintendo.com/us/store/products/minecraft-switch/",
        imagem: "Minecraft.jpg",
        tags: "Minecraft"
    },
    {
        titulo: "No Man's Sky",
        descricao: "Uma aventura espacial que gera proceduralmente um universo infinito para explorar, No Man's Sky oferece uma experiência única e em constante evolução.",
        link: "https://www.nintendo.com/us/store/products/no-mans-sky-switch/",
        imagem: "NoMan'sSky.jpg",
        tags: "No Man's Sky"
    },

];