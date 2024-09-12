let dados = [
    {
        titulo: "Derek",
        descricao: "Derek é um rapper e freestyler brasileiro, amplamente conhecido no cenário das batalhas de rap. Ele se destacou especialmente em competições de batalha de rimas.",
        link: "https://notthesamo.com/por-tras-do-corre-de-derek-luccas/",
        tags: "trap ttf rap",
        imagem: "imagens/derek.jpg"
    },
    {
        titulo: "Ryu the Runner",
        descricao: "Ryu the Runner é um rapper e freestyler brasileiro, conhecido por seu estilo agressivo e técnico, além de sua presença em batalhas, Ryu também desenvolveu uma carreira no rap, lançando músicas e projetos que refletem seu talento com letras fortes e densas.",
        link: "https://www.last.fm/pt/music/Ryu,+the+Runner/+wiki",
        tags: "corredor rap trap",
        imagem: "imagens/ryu.webp"
    },
    {
        titulo: "BK",
        descricao: "BK (também conhecido como Abebe Bikila) é um rapper carioca, um dos nomes mais respeitados no rap nacional contemporâneo. Ele é conhecido por suas letras introspectivas, que abordam temas sociais, políticos e pessoais com profundidade e lirismo.",
        link: "https://pt.wikipedia.org/wiki/BK%27",
        tags: "Abebe rap carioca",
        imagem: "imagens/bk.jpg"
    },
    {
        titulo: "Yunk Vino",
        descricao: "Rapper brasileiro conhecido por seu estilo melódico e influências do trap. Ganhou popularidade com suas letras introspectivas e colaborações com outros artistas do cenário trap.",
        link: "https://www.last.fm/pt/music/Yunk+Vino/+wiki7",
        tags: "vino rap trap lean",
        imagem: "imagens/yunkvino.jpg"
    },
    {
        titulo: "Kyan",
        descricao: "Rapper e freestyler com um estilo energético e uma abordagem agressiva nas batalhas de rima. Ele equilibra a cena de batalha com sua carreira musical, trazendo rimas afiadas e impacto lírico.",
        link: "https://www.last.fm/pt/music/Kyan/+wiki",
        tags: "Freestyle RimasAgressivas BatalhasDeRap mu540",
        imagem: "imagens/kyan.png"
    },
    {
        titulo: "Big Bllakk",
        descricao: "Rapper que se destaca por seu estilo imponente e pesado. Ele traz letras que abordam a realidade das ruas e a vivência do cotidiano, com uma entrega forte e marcante.",
        link: "https://www.last.fm/pt/music/Big+Bllakk",
        tags: "RapDeRua SomPesado Vivência big black blak",
        imagem: "imagens/bigbllakk.jpg"
    },
    {
        titulo: "LEALL",
        descricao: "Rapper carioca que mistura lirismo consciente com uma sonoridade sombria. Suas letras são recheadas de críticas sociais e reflexões sobre a realidade urbana.",
        link: "https://monkeybuzz.com.br/materias/leall-lapidado-para-o-sucesso/",
        tags: "LirismoConsciente CríticaSocial RealidadeUrbana leal",
        imagem: "imagens/leall.webp"
    },
    {
        titulo: "Major RD",
        descricao: "Conhecido por seu estilo afiado e ágil nas rimas, Major RD se destacou tanto no rap de estúdio quanto nas batalhas de rima, trazendo uma versatilidade notável entre freestyle e composições.",
        link: "https://pt.wikipedia.org/wiki/Major_RD",
        tags: "Freestyle Versatilidade RimasAfiadas BatalhasDeRap RD major",
        imagem: "imagens/majorrd.jpg"
    },
    {
        titulo: "pumapjl",
        descricao: "Rapper e produtor, Pumapjl tem uma sonoridade voltada para o trap e o rap alternativo, trazendo beats atmosféricos e um estilo vocal mais melódico.",
        link: "https://monkeybuzz.com.br/materias/o-boom-bap-proibidao-do-febre-90s/",
        tags: "TrapAlternativo SomMelódico puma",
        imagem: "imagens/puma.jpg"
    },
    {
        titulo: "Teto",
        descricao: "Rapper e cantor de trap que ganhou grande popularidade com sua assinatura melódica e refrões marcantes. Ele faz parte da nova geração do trap nacional, com hits que ressoam entre o público jovem.",
        link: "https://pt.wikipedia.org/wiki/Teto_(rapper)",
        tags: "30praum rap trap NovaGeraçãoTrap",
        imagem: "imagens/teto.jpg"
    },
    {
        titulo: "Vulgo FK",
        descricao: "Trapstar brasileiro com letras que misturam lifestyle, conquistas e histórias de superação. Ele se destaca no cenário pela sua presença e autenticidade no gênero.",
        link: "https://tangerina.uol.com.br/musica/vulgo-fk-perfil/",
        tags: "Lifestyle rap Trap",
        imagem: "imagens/vulgofk.jpg"
    },
    {
        titulo: "Baco Exu do Blues",
        descricao: "Baco Exu do Blues é um rapper e cantor brasileiro que se destaca por sua sonoridade única, mesclando elementos do rap com influências da música brasileira e da cultura afro-brasileira.",
        link: "https://pt.wikipedia.org/wiki/Baco_Exu_do_Blues",
        tags: "rap brasileiro música negra poesia experimental",
        imagem: "imagens/baco.jpg"
    },
    {
        titulo: "Veigh",
        descricao: "Rapper e cantor que transita entre o trap melódico e o R&B. Suas músicas frequentemente falam de relacionamentos, conquistas e uma visão mais emocional do mundo ao seu redor.",
        link: "https://pt.wikipedia.org/wiki/Veigh",
        tags: "trap rap R&B Emocional dos predios",
        imagem: "imagens/veigh.jpg"
    },
    {
        titulo: "KayBlack",
        descricao: "Rapper com uma forte presença no cenário do funk e trap, KayBlack mistura temas de superação com letras motivacionais, criando uma conexão autêntica com seu público.",
        link: "https://oglobo.globo.com/cultura/musica/noticia/2023/04/conheca-kayblack-o-rapper-que-fala-de-amor-e-esta-com-quatro-musicas-no-top-50-brasil.ghtml",
        tags: "FunkTrap rap trap superação",
        imagem: "imagens/kayblack.jpg"
    },
    {
        titulo: "Derxan",
        descricao: "Um dos novos nomes do trap brasileiro, Derxan combina rimas sobre sua vivência e ambições com batidas que variam do trap clássico ao mais experimental.",
        link: "https://www.last.fm/pt/music/Derxan/+wiki",
        tags: "rap trap novo",
        imagem: "imagens/derxan.avif"
    },
    {
        titulo: "Jé",
        descricao: "Rapper e freestyler que se destaca nas batalhas de rima pela habilidade de improvisação e também nas composições, onde explora uma ampla gama de temas com criatividade e fluidez.",
        link: "https://www.last.fm/pt/music/Jé+Santiago/+wiki",
        tags: "Freestyle rap trap BatalhasDeRap",
        imagem: "imagens/je.jpg"
    },
    {
        titulo: "Matuê",
        descricao: "Um dos maiores nomes do trap no Brasil, Matuê revolucionou o cenário com sua sonoridade única, misturando melodias envolventes com letras que falam sobre sucesso, lutas e superação. Seu álbum Máquina do Tempo foi um marco no trap brasileiro.",
        link: "https://pt.wikipedia.org/wiki/Matuê",
        tags: "TrapStar trap rap 30praum",
        imagem: "imagens/matue.webp"
    },
    {
        titulo: "Leozin",
        descricao: "Rapper e trapper com um estilo suave e letras introspectivas. Ele conquistou uma base fiel de fãs ao combinar uma estética visual marcante com músicas que refletem sobre a vida e ambições.",
        link: "https://aminoapps.com/c/naruto-shippuden-online/page/item/leozin/8X4a_XvUXIj4Lvxzmw1888NKYEaNx107a2",
        tags: "TrapSuave rap trap",
        imagem: "imagens/leozin.jpg"
    },
    {
        titulo: "Froid",
        descricao: "Um dos principais nomes do rap nacional, Froid é conhecido por seu lirismo afiado, abordando temas complexos como política, questões sociais e existenciais. Sua entrega crua e introspectiva atraiu um grande público.",
        link: "https://pt.wikipedia.org/wiki/Froid_(rapper)",
        tags: "LirismoAfiado social RapConsciente rap",
        imagem: "imagens/froid.webp"

    },
    {
        titulo: "Borges",
        descricao: "Rapper carioca em ascensão, Borges é conhecido por suas letras que refletem a realidade das favelas e a luta diária. Ele ganhou destaque com seu estilo realista e direto, misturando trap com consciência social.",
        link: "https://pt.wikipedia.org/wiki/Borges_(cantor)#:~:text=Luiz%20Felipe%20Borges%20Campos%20(Rio,%2C%20Iphone%20Branco%2C%20e%20Loucura.",
        tags: "TrapCarioca favela rap trap RapConsciente bg",
        imagem: "imagens/borges.jpg"
    },
    {
        titulo: "L7NNON",
        descricao: "Rapper do Rio de Janeiro que combina lirismo e hits comerciais. Ele explora temas variados, de superação pessoal a críticas sociais, com uma entrega que mistura rap tradicional com influências de trap e funk.",
        link: "https://pt.wikipedia.org/wiki/L7nnon",
        tags: "CríticaSocial rpa trap carioca",
        imagem: "imagens/l7.jpg"
    },
    {
        titulo: "Xamã",
        descricao: "Um dos maiores artistas da cena atual, Xamã é conhecido por suas letras poéticas e influências de MPB, rap e trap. Ele aborda temas como amor, espiritualidade e vida nas favelas, com uma entrega vocal carismática e envolvente.",
        link: "https://pt.wikipedia.org/wiki/Xamã_(rapper)",
        tags: "LetrasPoéticas MPBTrap #Favela rap",
        imagem: "imagens/xama.webp"
    }
];