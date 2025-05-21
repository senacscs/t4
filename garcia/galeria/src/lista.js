const lista = [
    {
        // Ana Alice
        name: "Sombras e luzes da Marechal Floriano 🌳",
        link: "img/img1.png",
        descicao: `
            Linda a foto né?
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
        name: "O broto 🌳",
        link: "img/img11.png",
        descicao: `
            A imagem mostra uma árvore urbana que ressurge com vigor mesmo após a poda drástica. Os galhos jovens e flexíveis brotam com folhas verde-vivas, contrastando com o tronco robusto e marcado pelo tempo. Ao fundo, o letreiro da farmácia reforça o cenário cotidiano da calçada, onde natureza e cidade coexistem.

            📍 Rua Marechal Floriano – Santa Cruz do Sul, RS
            🌳 Árvore podada com brotos jovens em crescimento
            🌿 Folhas verde-vivas destacando-se contra o céu azul
            🧱 Tronco grosso com casca rugosa e escurecida
            🏙️ Integração da vegetação com o ambiente urbano
        `
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
    name: "Árvores e flores 🌳🌸",
    link: "img/img14.png",
    descicao: `
        A imagem destaca a harmonia entre a força das árvores urbanas e a delicadeza das flores que as acompanham. Galhos robustos se entrelaçam com ramos floridos, criando um contraste de texturas e cores vivas. A luz natural evidencia os detalhes das folhas e pétalas, enquanto o cenário urbano ao fundo reforça a convivência entre natureza e cidade.

        📍 Local não especificado – Santa Cruz do Sul, RS
        🌳 Árvores frondosas e flores em destaque
        🌸 Contraste entre troncos, folhas e pétalas coloridas
        ☀️ Iluminação natural ressaltando as cores
        ✨ Integração entre vegetação e ambiente urbano
    `
    },
    {
        // João
        name: "A vida vista de baixo",
        link: "img/img15.png",
        descicao: `
        A imagem captura uma cena ensolarada em um espaço público, com uma Tipuana imponente, galhos escuros e retorcidos — alguns cobertos de musgo — que espalham sombras únicas no chão.
        As folhas verde-claras permitem que a luz do sol da tarde passe, criando um belo efeito de luz e sombra no chão da praça. ✨

        📍 Praça da Catedral – Santa Cruz do Sul, RS
        🌳 Tipuana frondosa com galhos escuros e retorcidos
        🌿 Musgos e epífitas nos galhos, indicando umidade
        ☀️ Folhas verde-claras que filtram a luz do sol
        ✨ Efeito de luz e sombra no chão da praça
    `
    },
    {
        // Joaquim
        name: "Onde a cidade respira em folhas e luz 🌳",
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
        name: "De baixo do nosso céu 🌳",
        link: "img/img18.HEIC",
        descicao: `
            Foto tirada na esquina da Rua Marechal Floriano com a Rua Júlio de Castilhos, no centro de Santa Cruz do Sul, às 07:56 da manhã. A imagem se destaca pela posição privilegiada que captura várias Tipuanas alinhadas, revelando o famoso túnel verde da cidade. A luz do sol da manhã reflete suavemente sobre as copas e galhos, criando um efeito visual encantador. Além da natureza, a foto também registra comércios e espaços urbanos importantes, reforçando o vínculo entre o ambiente natural e a vida cotidiana. Essa foi, sem dúvidas, a melhor foto do dia!

            📍 Localização: Esquina da Rua Marechal Floriano com Júlio de Castilhos, Santa Cruz do Sul – RS
            📅 Data: 29 de abril de 2025
            🕗 Horário: 07:56 da manhã
            🌳 Destaques: Túnel verde, Tipuanas, reflexo do sol, espaços urbanos e comércios locais
        `
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
        name: "Caminho verde 🌳",
        link: "img/img20.png",
        descicao: `
            A imagem revela um caminho arborizado em um parque urbano, onde a luz dourada do sol poente atravessa os espaços entre as copas densas e vibrantes. A vegetação exuberante cria uma atmosfera serena e fresca, enquanto a simetria da passarela e o chafariz ao fundo guiam o olhar por entre as sombras suaves.

            📍 Praça Getúlio Vargas – Santa Cruz do Sul, RS
            🌳 Árvores altas com copas densas e verdes vibrantes
            🛤️ Caminhos simétricos ladeados por vegetação
            ☀️ Luz do fim de tarde filtrada pelas folhas
            💧 Chafariz central ao fundo, compondo o cenário
        `
    },
    {
        // Manu
        name: "Entre luzes e folhagens 🌳",
        link: "img/img21.png",
        descicao: `
            A imagem apresenta um trecho tranquilo de praça, onde uma alameda sombreada por árvores cobertas de musgos cria um ambiente acolhedor. A luz suave do final da tarde realça os tons verdes e destaca um banco branco solitário, convidando ao descanso e contemplação em meio à natureza urbana.

            📍 Praça da Bandeira – Santa Cruz do Sul, RS
            🌳 Árvores altas com galhos cobertos de musgo
            🪑 Banco branco em destaque sob a sombra das árvores
            ☀️ Iluminação suave do entardecer entre as folhagens
            🌿 Gramados bem cuidados e vegetação ornamental
        `
    },
    {
        // Marina
        name: "Além das árvores 🌳",
        link: "img/img22.png",
        descicao: `
            A imagem olha para o alto em meio à mata urbana, revelando uma abertura circular na copa das árvores que emoldura o céu intensamente azul. Uma única árvore se destaca no centro, com uma grande epífita em forma de coroa em seu topo. A luz suave da manhã ou do fim da tarde toca os galhos cobertos de musgos, criando contrastes sutis entre sombra e brilho.

            📍 Praça da Bandeira – Santa Cruz do Sul, RS
            🌳 Vista vertical entre copas fechadas e galhos retorcidos
            🌿 Epífita destacando-se como uma coroa no topo da árvore
            ☀️ Iluminação suave nas folhas e galhos com musgo
            🔵 Céu azul intenso emoldurado pela vegetação
        `
    },
    {
        // Matheus
        name: "Penúltima volta no centro 🌳",
        link: "img/img23.png",
        descicao: `
            A imagem mostra uma árvore de copa densa ao entardecer, com o céu alaranjado refletindo entre as folhas e galhos robustos. A luz dourada suaviza os contornos e projeta longas sombras no solo gramado ao redor.

            📍 Espaço urbano arborizado – Local não especificado
            🌳 Árvore frondosa com galhos robustos
            🌿 Copa fechada, criando sombra ampla
            ☀️ Céu com tons alaranjados no entardecer
            ✨ Luz suave atravessando a copa, criando efeito acolhedor
        `
    },
    {
        // Mitt
        name: "Céu bordado por galhos 🌳",
        link: "img/img24.png",
        descicao: `
            A foto apresenta uma árvore isolada em um campo aberto, com tronco reto e copa ampla. O céu azul claro ao fundo destaca o verde vibrante das folhas, enquanto a luz direta do sol projeta a sombra da árvore sobre a grama.

            📍 Campo aberto – Local não especificado
            🌳 Árvore de tronco retilíneo e copa bem distribuída
            🌿 Folhagem densa e verde vibrante
            ☀️ Céu claro, com sol iluminando lateralmente
            ✨ Sombra da copa desenhada nitidamente sobre o gramado
        `
    },
    {
        // Nicole
        name: "Onde a luz dança entre as folhas 🌳",
        link: "img/img25.png",
        descicao: `
            A imagem exibe uma árvore exuberante em um ambiente urbano, com tronco grosso e ramos ascendentes. A luz solar filtrada pelas folhas cria um jogo de luzes no solo pavimentado, transmitindo calma e frescor.

            📍 Calçadão urbano – Local não especificado
            🌳 Tronco espesso com ramificação voltada para o alto
            🌿 Folhas médias filtrando a luz do dia
            ☀️ Sol de intensidade moderada no final da manhã
            ✨ Padrão de luz e sombra suave no solo
        `
    },
    {
        // Pedro Alvez
        name: "A árvore da elegância 🌳",
        link: "img/img26.png",
        descicao: `
            Nesta imagem, uma árvore solitária destaca-se em meio a uma área gramada, com tronco fino e copa em formato arredondado. O céu limpo e a incidência solar direta criam uma sombra bem definida que acompanha a forma da copa.

            📍 Espaço verde isolado – Local não especificado
            🌳 Árvore de tronco fino e copa arredondada
            🌿 Folhas pequenas e uniformes
            ☀️ Céu limpo com sol em posição alta
            ✨ Sombra simétrica e destacada sobre o gramado
        `
    },
    {
        // Pedro Arthur
        name: "Tipuana 🌳",
        link: "img/img27.png",
        descicao: `
            A imagem mostra uma árvore grande, com ramificação horizontal e folhagem densa. A luz solar lateral acentua o volume da copa e realça os contornos dos galhos, enquanto o chão recebe um padrão difuso de luz e sombra.

            📍 Área natural aberta – Local não especificado
            🌳 Galhos espessos com disposição horizontal
            🌿 Folhagem abundante e verde-escura
            ☀️ Iluminação lateral realçando as formas
            ✨ Sombra suave e recortada sob a copa
        `
    },
    {
        // Pedro Backes
        name: "Estou no centro 🌳",
        link: "img/img28.png",
        descicao: `
            A imagem revela uma alameda arborizada sob céu azul intenso, onde troncos robustos e galhos cobertos por musgos e epífitas se erguem imponentes. A luz solar atravessa a copa densa, criando jogos de sombra no chão e nas pessoas que descansam nos bancos brancos do caminho.

            📍 Praça da Catedral – Santa Cruz do Sul, RS
            🌳 Árvores altas e frondosas com troncos espessos
            🌿 Musgos e epífitas pendendo dos galhos
            ☀️ Iluminação natural intensa com céu limpo
            ✨ Jogo de luz e sombra entre as copas e o chão
        `
    },
    {
        // Sara
        name: "Raízes no céu 🌳",
        link: "img/img29.png",
        descicao: `
            A cena mostra uma árvore de galhos escuros e retorcidos, destacados contra o céu azul da tarde. A copa densa filtra suavemente a luz do sol, criando uma atmosfera acolhedora. O musgo que reveste os galhos acrescenta textura e um toque de mistério ao ambiente da praça.

            📍 Praça Getúlio Vargas – Santa Cruz do Sul, RS
            🌳 Árvore de galhos escuros com formas orgânicas
            🌿 Presença de musgos e vegetação aérea
            ☀️ Luz suave do fim da tarde filtrada pela copa
            ✨ Sombra difusa criando ambiente sereno
        `
    },
    {
        // Scherer
        name: "Árvores 🌳",
        link: "img/img30.png",
        descicao: `
            Sob a luz da manhã, as copas das árvores formam um teto verde vibrante sobre a praça. Os galhos, revestidos de musgo e entrelaçados em padrões marcantes, contrastam com o céu azul ao fundo. A presença urbana ao redor reforça a relação entre natureza e cidade.

            📍 Praça Getúlio Vargas – Santa Cruz do Sul, RS
            🌳 Árvores frondosas emoldurando o espaço urbano
            🌿 Galhos cobertos de musgo e folhagem abundante
            ☀️ Céu limpo destacando o verde das copas
            ✨ Contraste entre a natureza viva e o concreto
        `
    },
    {
        // Theo
        name: "Onde o verde abraça a alma alemã 🌳",
        link: "img/img31.png",
        descicao: `
            Mesmo em meio a obras, a força da natureza persiste. A imagem mostra troncos podados começando a rebrotar, com folhas jovens surgindo ao lado das copas antigas. A arborização da rua forma um túnel verde sobre a movimentação urbana.

            📍 Rua Marechal Floriano – Santa Cruz do Sul, RS
            🌳 Árvores antigas com rebrota de folhas verdes
            🌿 Musgos e vegetação nas copas e troncos
            ☀️ Céu aberto com sol iluminando a calçada
            ✨ Túnel verde contrastando com a revitalização da rua
        `
    },
    {
    // Davi
    name: "A Tipuana 🌳",
    link: "img/img32.png",
    descicao: `
        A fotografia apresenta uma Tipuana majestosa, com tronco espesso e galhos longos que se espalham formando uma copa ampla. A luz do dia atravessa as folhas verde-claras, criando um jogo de sombras suave sobre o solo. O cenário urbano ao redor reforça a presença marcante da árvore, símbolo de resistência e beleza em meio à cidade.

        📍 Local não especificado – Santa Cruz do Sul, RS
        🌳 Tipuana de copa ampla e galhos retorcidos
        🌿 Folhagem verde-claras filtrando a luz
        ☀️ Sombra suave projetada no chão
        ✨ Destaque para a imponência e vitalidade da árvore
    `
    }
];

export { lista };