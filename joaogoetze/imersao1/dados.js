let dados = [
    {
        titulo: "Siamês",
        descricao: "Conhecido por seus olhos azuis intensos e pelagem clara com extremidades escuras. São elegantes e têm um temperamento imprevisível, podendo ser tanto tranquilos quanto ativos.",
        link: "https://pt.wikipedia.org/wiki/Siamês",
        tags: "Gato Siamês Olhos Azuis Pelagem Clara Tranquilo Ativo",
        foto: "Siames.jpeg",
    },
    {
        titulo: "Persa",
        descricao: "Famoso por sua pelagem longa e focinho achatado. São gatos tranquilos e amáveis, ideais para quem tem outros pets ou crianças.",
        link: "https://pt.wikipedia.org/wiki/Persa",
        tags: "Gato Persa Pelagem Longa Focinho Achatado Tranquilo Amável",
        foto: "https://th.bing.com/th/id/OIP.DpQgAM1s8e0qGrdr7Q-iDQHaE6?w=310&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
        titulo: "Maine Coon",
        descricao: "Uma das maiores raças de gatos domésticos. São conhecidos por sua pelagem densa e personalidade amigável. São ótimos companheiros e se dão bem com outros animais.",
        link: "https://pt.wikipedia.org/wiki/Maine_Coon",
        tags: "Gato Maine Coon Pelagem Densa Amigável Companheiro",
        foto: "https://th.bing.com/th/id/OIP.y_R6Re3yyG24LoqFbIhJ_gHaGW?w=233&h=199&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
        titulo: "Scottish Fold",
        descricao: "Reconhecível por suas orelhas dobradas para a frente. São gatos tranquilos e carinhosos, populares entre celebridades.",
        link: "https://pt.wikipedia.org/wiki/Scottish_Fold",
        tags: "Gato Scottish Fold Orelhas Dobradas Tranquilo Carinhoso",
        foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Scottish_Fold_-_CFF_cat_show_Heinola_2008-05-03_IMG_7882.JPG/300px-Scottish_Fold_-_CFF_cat_show_Heinola_2008-05-03_IMG_7882.JPG"
    },
    {
        titulo: "Sphynx",
        descricao: "Conhecido por sua falta de pelo, o que lhe dá uma aparência única. São gatos muito afetuosos e adoram a companhia humana.",
        link: "https://pt.wikipedia.org/wiki/Sphynx",
        tags: "Gato Sphynx Sem Pelo Afetuoso Companhia Humana",
        foto: "https://th.bing.com/th/id/OIP.N41EYGItXthtrg9r6MmR6QHaEo?w=315&h=196&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
        "titulo": "Gato de Botas",
        "descricao": "Famoso personagem de contos de fadas e filmes, conhecido por sua inteligência, astúcia e botas icônicas. Ele é um gato aventureiro e carismático, frequentemente ajudando seus amigos com sua esperteza.",
        "link": "https://pt.wikipedia.org/wiki/Gato_de_Botas",
        "tags": "Botas",
        "foto": "https://th.bing.com/th/id/OIP.CPAnFHs1hFS-xjloh0KLfwHaDp?rs=1&pid=ImgDetMain",
    },
    {
        titulo: "Bengal",
        descricao: "Tem uma aparência selvagem com manchas que lembram um leopardo. São ativos e inteligentes, adoram brincar e explorar.",
        link: "https://pt.wikipedia.org/wiki/Bengal",
        tags: "Gato Bengal Aparência Selvagem Manchas Ativo Inteligente",
        foto: "Bengal.jpeg"
    },
    {
        titulo: "Ragdoll",
        descricao: "Conhecido por sua natureza dócil e pelagem macia. Eles tendem a relaxar completamente quando são pegos no colo, daí o nome 'Ragdoll' (boneca de pano).",
        link: "https://pt.wikipedia.org/wiki/Ragdoll",
        tags: "Gato Ragdoll Dócil Pelagem Macia Relaxado",
        foto: "Ragdoll.jpeg",
    },
    {
        titulo: "Devon Rex",
        descricao: "Tem uma pelagem curta e encaracolada e grandes orelhas. São gatos brincalhões e adoram a companhia de seus tutores.",
        link: "https://pt.wikipedia.org/wiki/Devon_Rex",
        tags: "Gato Devon Rex Pelagem Curta Encaracolada Brincalhão Companhia",
        foto: "https://th.bing.com/th/id/OIP.Tg5Z0WUb7SExbFeYe3OxHgHaE6?w=257&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
        titulo: "British Shorthair",
        descricao: "Conhecido por sua pelagem densa e rosto arredondado. São gatos tranquilos e afetuosos, ideais para a vida em apartamento.",
        link: "https://pt.wikipedia.org/wiki/British_Shorthair",
        tags: "Gato British Shorthair Pelagem Densa Rosto Arredondado Tranquilo Afetuoso",
        foto: "british-shorthair-750x419.jpg",
    },
    {
        titulo: "Abyssinian",
        descricao: "Uma das raças mais antigas, conhecida por sua pelagem curta e aparência elegante. São gatos ativos e curiosos.",
        link: "https://pt.wikipedia.org/wiki/Abyssinian",
        tags: "Gato Abyssinian Pelagem Curta Aparência Elegante Ativo Curioso",
        foto: "OIP.jpg",
    },
    {
        titulo: "Azul Russo",
        descricao: "Conhecido por sua pelagem azul-prateada e olhos verdes são facilmente confundiveis com gatos como British Shorthair e Chartreux. São gatos tranquilos, leais e afetuosos, ideais para ambientes calmos.",
        link: "https://pt.wikipedia.org/wiki/Azul_russo",
        tags: "Gato Azul Russo Pelagem Azul Olhos Verdes Tranquilo Leal Afetuoso",
        foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Jasmina.JPG/330px-Jasmina.JPG",
    },
    {
        titulo: "Chartreux",
        descricao: "O Chartreux é uma raça de gato originária da França, conhecida por sua pelagem azul-acinzentada densa e olhos de cor cobre ou laranja. Eles são frequentemente confundidos com o Azul Russo e o British Shorthair devido à semelhança na cor da pelagem.",
        link: "https://pt.wikipedia.org/wiki/Chartreux",
        tags: "Gato Chartreux Pelagem Azul Olhos Dourados Silencioso Inteligente Apegado",
        foto: "data:image/jpeg;base64,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",
    },
    {
        titulo: "Turco Van",
        descricao: "Conhecido por sua pelagem branca com manchas coloridas e amor pela água. São gatos ativos, curiosos e sociáveis.",
        link: "https://pt.wikipedia.org/wiki/Turco_Van",
        tags: "Gato Turco Van Pelagem Branca Manchas Coloridas Ativo Curioso Sociável",
        foto: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Push_van_cat.jpg/300px-Push_van_cat.jpg",
    },
    {
        titulo: "American Curl",
        descricao: "Destaca-se por suas orelhas curvadas para trás. São gatos afetuosos, brincalhões e se adaptam bem a diferentes ambientes.",
        link: "https://www.peritoanimal.com.br/racas-de-gatos/gato-american-curl.html",
        tags: "Gato American Curl Orelhas Curvadas Afetuoso Brincalhão Adaptável",
        foto: "https://th.bing.com/th/id/OIP.Fc1GPvy9pje1BoFBIlKvigHaFj?w=259&h=195&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    }
] 


