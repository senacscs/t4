const lista = [
    {
        // Ana Alice
        name: "Num fiz 🌳",
        link: "img/img1.png",
        descicao: `
            Num fiz também
        `
    },
    {
        // Ana Elisa
        name: "Um olhar à cima 🌳",
        link: "img/img2.png",
        descicao: `
            A imagem convida à contemplação da beleza que se revela quando desviamos o olhar do óbvio. Um lembrete visual de que há muito mais na vida do que aquilo que está à nossa frente — é preciso olhar para cima, sonhar, perceber o invisível.

            📍 Praça da Catedral – Santa Cruz do Sul, RS
            🌳 Perspectiva voltada para o alto, valorizando o céu ou a copa das árvores
            👁️ Proposta reflexiva sobre percepção e atenção
            🌤️ Luz natural ressaltando formas e texturas
            ✨ Mensagem sobre ver além do aparente
        `
    },
    {
        // Andrei
        name: "Brisa boa 🌳",
        link: "img/img3.png",
        descicao: `
            A foto revela o icônico túnel verde formado pelas árvores da Rua Marechal Floriano, em um momento de tranquilidade e reforma urbana. A luz do sol penetra pelas copas altas, criando um caminho de sombras dançantes que atravessam a rua. A sensação é de frescor e história viva em meio ao cotidiano da cidade.

            📍 Rua Marechal Floriano – Santa Cruz do Sul, RS
            🌳 Túnel natural de árvores altas cobertas por musgos
            🛣️ Reforma urbana em andamento, com rua de paralelepípedos
            🌿 Galhos entrelaçados filtrando a luz do sol
            ✨ Efeito de sombra projetado pelo dossel arbóreo
            🌆 Espaço urbano que mescla natureza e arquitetura
        `
    },
    {
        // Augusto
        name: "Túnel de árvores 🌳",
        link: "img/img4.png",
        descicao: `
            A imagem registra um dia ensolarado no centro da cidade, onde a luz suave atravessa as copas entrelaçadas das árvores e preenche a rua com sombra filtrada. A presença dos bancos e canteiros azuis destaca o cuidado urbano e o convite ao descanso. Um retrato do cotidiano em harmonia com a natureza.

            📍 Rua Marechal Floriano – Santa Cruz do Sul, RS
            🌳 Árvores altas formando um túnel natural sobre a rua
            🪑 Bancos e canteiros azuis que embelezam e acolhem
            🌿 Luz do sol atravessando as folhas verde-claras
            🚗 Movimento urbano leve em meio ao verde
            ✨ Atmosfera de calma e conexão com o ambiente
        `
    },
    {
        // Bernardo
        name: "Sombras verdes na cidade 🌳",
        link: "img/img5.png",
        descicao: `
            A imagem mostra um trecho em reforma no centro da cidade, onde antigos troncos de árvores seguem firmes, mesmo após a poda drástica. Novos brotos surgem como sinal de resistência e renovação. Um contraste entre o concreto das obras e a força silenciosa da natureza que insiste em viver.

            📍 Rua Marechal Floriano – Santa Cruz do Sul, RS
            🌳 Troncos de árvores podadas com brotos verdes surgindo
            🚧 Obra de reurbanização visível ao longo da calçada
            🌿 Sinais de resiliência vegetal em meio ao concreto
            🏬 Fachadas comerciais compondo o ambiente urbano
            ✨ Diálogo entre transformação e permanência da vida natural
        `
    },
    {
        // Clara
        name: "O céu se derrama em folhas 🌇",
        link: "img/img6.png",
        descicao: `
            O sol poente atravessa os galhos das árvores, desenhando silhuetas no asfalto e nas fachadas dos prédios. A luz dourada suaviza o contraste urbano e revela a beleza tranquila do entardecer em Santa Cruz do Sul.

            📍 Centro – Santa Cruz do Sul, RS
            🌇 Pôr do sol entre árvores e edifícios
            🌳 Copas fechadas formando sombras densas
            🏢 Arquitetura urbana com toques modernos
            ✨ Atmosfera serena e contemplativa
            📷 Fotografia com foco na luz natural e contraste
        `
    },
    {
        // Dalke
        name: "Outra volta ao centro 🌳",
        link: "img/img7.png",
        descicao: `
            Uma imponente tipuana domina o centro da imagem, capturada de baixo para cima em um dia ensolarado e tranquilo em Santa Cruz do Sul. O céu azul se abre entre os galhos da árvore, enquanto a luz do sol realça o verde vibrante das folhas, criando um contraste harmonioso e bonito contra o fundo claro.

            📍 Santa Cruz do Sul, RS
            ☀️ Dia ensolarado e céu azul claro
            🌿 Folhagem verde iluminada pela luz natural
            📷 Perspectiva de baixo para cima, destacando a grandiosidade da árvore
            🌳 Árvores e natureza urbana em perfeita convivência
        `
    },
    {
        // Eduardo Dure
        name: "Tipuana em frente ao Marista 🌳",
        link: "img/img8.png",
        descicao: `
            A imagem destaca o tronco de uma árvore com casca espessa e textura rugosa, marcada por tons acinzentados e alaranjados. Nas reentrâncias da casca, brotam epífitas e pequenas samambaias, sinalizando um ambiente úmido e saudável. Ao fundo, o colorido das fachadas e vasos azuis emolduram a cena urbana com um toque de natureza viva. 🌿

            📍 Centro – Santa Cruz do Sul, RS  
            🌳 Tronco robusto com casca descamando em tons terrosos  
            🌱 Presença de epífitas e samambaias nas reentrâncias  
            🏙️ Elementos urbanos coloridos ao fundo  
            ✨ Contraste entre textura natural e arquitetura vibrante
        `
    },
    {
        // Eduardo Moraes
        name: "Mais uma volta no centro 🌳",
        link: "img/img9.png",
        descicao: `
            A imagem mostra uma vista de baixo para cima de uma árvore imponente, revelando a textura espessa e descascada de seu tronco. A perspectiva enfatiza os galhos altos cobertos por folhas finas e pendentes, enquanto pequenas epífitas e raízes aéreas emergem das reentrâncias da casca. A luz do sol atravessa a copa verde, criando um contraste vibrante entre a madeira e o céu azul. 🌿

            📍 Santa Cruz do Sul, RS
            🌳 Perspectiva de baixo evidenciando tronco rugoso e descascado
            🌱 Epífitas e raízes aéreas entre as fissuras da casca
            ☀️ Luz solar filtrada pela copa frondosa
            ✨ Contraste entre a textura da árvore e o céu azul
        `
    },
    {
        // Ernesto
        name: "De árvore a papel 🌳",
        link: "img/img10.png",
        descicao: `
            A fotografia mostra uma árvore urbana crescendo junto à fachada de um prédio comercial, com tronco grosso e escurecido. Seus galhos são cobertos por uma densa vegetação de epífitas, especialmente barba-de-velho, que escorre como uma cortina verde natural. A estrutura metálica de um palco ou cobertura atravessa a cena, criando um contraste entre a natureza viva e os elementos construídos do centro da cidade. 🌿

            📍 Centro – Santa Cruz do Sul, RS
            🌳 Árvore urbana com tronco escuro e espesso
            🌱 Densa presença de barba-de-velho nos galhos
            🏢 Fachada comercial ao fundo com elementos metálicos
            ✨ Contraste entre vegetação espontânea e estrutura urbana
        `
    },
    {
        // Lucas
        name: "",
        link: "img/img11.png",
        descicao: ``
    },
    {
        // Gustavo
        name: "Resto da história das tipuanas 🌳",
        link: "img/img12.png",
        descicao: `
            A imagem destaca uma árvore de tronco escuro e curvado em uma calçada central da cidade, com canteiro delimitado em concreto. A copa é composta por galhos altos e finos, cobertos por barba-de-velho que balança suavemente com o vento. A luz do sol atravessa as folhagens, projetando sombras e pontos de luz sobre a fachada azul do edifício histórico ao fundo. 🌞🌳

            📍 Centro – Santa Cruz do Sul, RS
            🌳 Árvore com tronco escuro e curvado
            🌿 Barba-de-velho pendente nos galhos
            🏢 Fachada histórica azul ao fundo com detalhes art déco
            ✨ Efeito de luz e sombra nas paredes e calçada
        `
    },
    {
        // Henrique
        name: "Manhã na praça 🌳",
        link: "img/img13.png",
        descicao: `
            Foto tirada na Praça Getúlio Vargas, no coração de Santa Cruz do Sul, em uma manhã de céu limpo. Uma árvore de galhos abertos e secos se destaca no enquadramento, criando um forte contraste com o céu ao fundo e com a vegetação mais densa ao redor. A escolha do preto e branco evidencia o jogo de formas e vazios, reforçando a composição gráfica e a sensação de silêncio na cena. 🖤🌳

            📍 Praça Getúlio Vargas – Santa Cruz do Sul, RS
            🕗 Manhã de 29 de abril de 2025, por volta das 8h
            🌳 Galhos secos e abertos contrastando com outras árvores
            ⚪ Escolha de preto e branco para destacar o contraste
            ✨ Equilíbrio entre forma, vazio e luz natural
        `
    },
    {
        // Iuri
        name: "",
        link: "img/img14.png",
        descicao: ``
    },
    {
        // João
        name: "",
        link: "img/img15.png",
        descicao: ``
    },
    {
        // Joaquim
        name: "Manhã na Praça Getúlio Vargas 🌳",
        link: "img/img16.png",
        descicao: `
            Foto tirada no centro de Santa Cruz do Sul, na Praça Getúlio Vargas, na manhã do dia 29 de abril de 2025, por volta das 8h. A imagem mostra as árvores com seus galhos cobertos por epífitas, criando um jogo de luz e sombra que destaca a natureza em meio à arquitetura urbana. O enquadramento chama atenção pelo equilíbrio entre forma e vazio, realçado pelas cores vivas da manhã.

            📍 Local: Praça Getúlio Vargas, Santa Cruz do Sul
            🗓️ Data: 29 de abril de 2025
            ⏰ Horário: Cerca de 8h da manhã
            📸 Ponto: Próximo ao chafariz
            🎨 Estilo: Realce das cores naturais e contraste com o céu azul
        `
    },
    {
        // Johann
        name: "Uma volta ao centro 🌳",
        link: "img/img17.png",
        descicao: `
        Foto tirada na praça da catedral em Santa Cruz do Sul, Rio Grande do Sul, Brasil. A imagem mostra uma Tipuana grande e frondosa, com galhos escuros e retorcidos, alguns cobertos por musgo e plantas epífitas. As folhas verde-claras são esparsas, deixando a luz do sol da tarde passar por entre elas, criando um belo contraste de luz e sombra no chão.

        📍 Localização: Praça da Catedral, Santa Cruz do Sul, Rio Grande do Sul, Brasil
        📅 Data: 29 de abril de 2025
        🕓 Horário: Por volta das 16h
    `
    },
    {
        // Larissa
        name: "",
        link: "img/img18.png",
        descicao: ``
    },
    {
        // Ludwig
        name: "A última volta no centro 🌺",
        link: "img/img19.png",
        descicao: `
            Entre a sombra das árvores altas e o céu limpo de Santa Cruz do Sul, um ramo florido de buganvília surge em vermelho vibrante. A composição contrasta o verde escuro das copas com a explosão inesperada de cor, criando uma cena de beleza discreta e poética.

            📍 Santa Cruz do Sul, RS
            🌿 Vegetação densa com diversas espécies
            🌺 Flores vermelhas em destaque
            🌤️ Céu azul claro de fundo
            🎨 Contraste natural entre sombra e luz
            📷 Composição vertical e dramática, com ênfase nos detalhes botânicos
        `
    },
    {
        // Luis
        name: "",
        link: "img/img20.png",
        descicao: ``
    },
    {
        // Manu
        name: "",
        link: "img/img21.png",
        descicao: ``
    },
    {
        // Marina
        name: "",
        link: "img/img22.png",
        descicao: ``
    },
    {
        // Matheus
        name: "",
        link: "img/img23.png",
        descicao: ``
    },
    {
        // Mitt
        name: "",
        link: "img/img24.png",
        descicao: ``
    },
    {
        // Nicole
        name: "",
        link: "img/img25.png",
        descicao: ``
    },
    {
        // Pedro Alvez
        name: "",
        link: "img/img26.png",
        descicao: ``
    },
    {
        // Pedro Arthur
        name: "",
        link: "img/img27.png",
        descicao: ``
    },
    {
        // Pedro Backes
        name: "",
        link: "img/img28.png",
        descicao: ``
    },
    {
        // Sara
        name: "",
        link: "img/img29.png",
        descicao: ``
    },
    {
        // Scherer
        name: "",
        link: "img/img30.png",
        descicao: ``
    },
    {
        // Theo
        name: "",
        link: "img/img31.png",
        descicao: ``
    }
];