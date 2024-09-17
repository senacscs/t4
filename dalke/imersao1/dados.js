const racas = [
    {
        raça: "Nelore",
        nomeCientifico: "Bos indicus",
        origem: "Índia",
        aptidao: "corte",
        pesoMedio: "450-550 kg",
        pelagem: "cinzenta ou vermelha",
        adaptabilidade: "clima tropical",
        descricao: "Raça zebuína de origem indiana, amplamente difundida no Brasil. Adaptada a condições tropicais, possui grande resistência a doenças e parasitas, além de boa conversão alimentar. Apresenta bosse cervical proeminente e pelagem curta e brilhante.",
        imagem: "imagens/nelore.jpg"
    },
    {
        raça: "Angus",
        nomeCientifico: "Bos taurus",
        origem: "Escócia",
        aptidao: "corte",
        pesoMedio: "600-800 kg",
        pelagem: "preta",
        adaptabilidade: "clima temperado",
        descricao: "Raça bovina britânica, conhecida por sua carne de alta qualidade, marmoreio e precocidade sexual. Animais precoces, com carcaça pesada e bem conformada. Pelagem curta, densa e brilhante.",
        imagem: "imagens/angus.jpg"
    },
    {
        raça: "Jersey",
        nomeCientifico: "Bos taurus taurus",
        origem: "Ilha de Jersey",
        aptidao: "leiteira",
        pesoMedio: "400-500 kg",
        pelagem: "castanha ou cinza",
        adaptabilidade: "clima temperado",
        descricao: "Pequena raça conhecida por seu leite rico em gordura e proteína. Alta fertilidade e longevidade.",
        imagem: "imagens/jersey.jpg"
    },
    {
        raça: "Red Poll",
        nomeCientifico: "Bos taurus taurus",
        origem: "Inglaterra",
        aptidao: "Dupla aptidão (leite e corte)",
        pesoMedio: "550-700 kg",
        pelagem: "Vermelha",
        adaptabilidade: "Clima temperado",
        descricao: "Raça antiga, conhecida por sua pelagem vermelha e chifres em forma de rosca. Produz leite e carne de boa qualidade.",
        imagem: "imagens/red_poll.jpg"
    },
    
    {
        raça: "Charolês",
        nomeCientifico: "Bos taurus taurus",
        origem: "França",
        aptidao: "Corte",
        pesoMedio: "1000-1200 kg",
        pelagem: "Branca",
        adaptabilidade: "Clima temperado",
        descricao: "Uma das maiores raças bovinas, conhecida por seu crescimento rápido e carcaça musculosa.",
        imagem: "imagens/charoles.jpg"
    },
    
    {
        raça: "Watusi",
        nomeCientifico: "Bos taurus africanus",
        origem: "África",
        aptidao: "Corte",
        pesoMedio: "400-600 kg",
        pelagem: "Variada (vermelha, branca, cinza)",
        adaptabilidade: "Clima tropical",
        descricao: "Famosa por seus chifres longos e curvos, essa raça africana é adaptada a ambientes áridos.",
        imagem: "imagens/watusi.jpg"
    },

    {
        raça: "Indubrasil",
        nomeCientifico: "Bos taurus indicus x Bos taurus taurus",
        origem: "Brasil",
        aptidao: "Corte",
        pesoMedio: "Variável",
        pelagem: "Variada",
        adaptabilidade: "Clima tropical",
        descricao: "Raça sintética brasileira, resultado do cruzamento de raças zebuínas e europeias, com alta adaptação ao trópico.",
        imagem: "imagens/indubrasil.jpg"
    },
   
{
    raça: "Holstein",
    nomeCientifico: "Bos taurus taurus",
    origem: "Países Baixos",
    aptidao: "Leiteira",
    pesoMedio: "650-800 kg",
    pelagem: "Preto e branco",
    adaptabilidade: "Clima temperado",
    descricao: "A raça leiteira mais popular do mundo, conhecida por sua alta produção de leite.",
    imagem: "imagens/holstein.jpg"
},

{
    raça: "Brahman",
    nomeCientifico: "Bos indicus",
    origem: "Índia",
    aptidao: "Corte",
    pesoMedio: "600-800 kg",
    pelagem: "Cinza, vermelha ou branca",
    adaptabilidade: "Clima tropical",
    descricao: "Raça zebuína utilizada para melhorar a adaptação de outras raças a climas quentes e úmidos.",
    imagem: "imagens/brahman.jpg"
},

{
    raça: "Simental",
    nomeCientifico: "Bos taurus taurus",
    origem: "Suíça",
    aptidao: "Dupla aptidão (corte e leite)",
    pesoMedio: "800-1000 kg",
    pelagem: "Variada (vermelha, branca, pintada)",
    adaptabilidade: "Clima temperado",
    descricao: "Raça de dupla aptidão, com boa produção de leite e carne de qualidade.",
    imagem: "imagens/simental.jpg"
},

{
    raça: "Guzerá",
    nomeCientifico: "Bos indicus",
    origem: "Índia",
    aptidao: "Dupla aptidão (corte e leite)",
    pesoMedio: "500-700 kg",
    pelagem: "Cinza ou branca",
    adaptabilidade: "Clima tropical",
    descricao: "Raça zebuína de grande porte, com boa produção de leite e carne.",
    imagem: "imagens/guzera.jpg"
},

{
    raça: "Brown Swiss",
    nomeCientifico: "Bos taurus",
    origem: "Suíça",
    aptidao: "Leiteira",
    pesoMedio: "600-800 kg",
    pelagem: "Cinza ou marrom",
    adaptabilidade: "Clima temperado",
    descricao: "Raça leiteira de grande porte, conhecida por sua alta produção de leite e temperamento dócil. Os animais apresentam uma excelente conversão alimentar e são valorizados por sua longevidade produtiva.",
    imagem: "imagens/brown_swiss.jpeg"
},

{
    raça: "Limousin",
    nomeCientifico: "Bos taurus",
    origem: "França",
    aptidao: "Corte",
    pesoMedio: "800-1000 kg",
    pelagem: "Vermelha",
    adaptabilidade: "Clima temperado",
    descricao: "Raça de corte conhecida por sua excelente qualidade de carne, com alto marmoreio e bom rendimento de carcaça. Apresenta crescimento rápido e boa conformação muscular.",
    imagem: "imagens/limousin.jpeg"
},

{
    raça: "Shorthorn",
    nomeCientifico: "Bos taurus",
    origem: "Inglaterra",
    aptidao: "Dupla aptidão (leite e corte)",
    pesoMedio: "800-1000 kg",
    pelagem: "Vermelha, roxa, ou branca",
    adaptabilidade: "Clima temperado",
    descricao: "Raça de dupla aptidão, com boa produção de leite e carne de qualidade. É valorizada por sua rusticidade e adaptabilidade a diferentes sistemas de produção.",
    imagem: "imagens/shorthorn.jpg"
},

{
    raça: "Dexter",
    nomeCientifico: "Bos taurus",
    origem: "Irlanda",
    aptidao: "Dupla aptidão",
    pesoMedio: "300-400 kg",
    pelagem: "Vermelha, roxa, ou branca",
    adaptabilidade: "Clima temperado",
    descricao: "Raça de pequeno porte, de dupla aptidão, ideal para pequenas propriedades e sistemas de produção extensivos. É conhecida por sua rusticidade e facilidade de manejo.",
    imagem: "imagens/dexter.jpg"
},

{
    raça: "Marchigiana",
    nomeCientifico: "Bos taurus",
    origem: "Itália",
    aptidao: "Corte",
    pesoMedio: "800-1000 kg",
    pelagem: "Cinza ocre",
    adaptabilidade: "Clima temperado",
    descricao: "Raça de corte de origem italiana, conhecida por sua excelente qualidade de carne e rusticidade. Apresenta boa conformação muscular e é adaptada a diferentes sistemas de produção.",
    imagem: "imagens/marchigiana.jpg"
},
  
    {
      raça: "Red Angus",
      nomeCientifico: "Bos taurus",
      origem: "Estados Unidos",
      aptidao: "Corte",
      pesoMedio: "600-800 kg",
      pelagem: "Vermelha",
      adaptabilidade: "Clima temperado e tropical",
      descricao: "Uma variedade da raça Angus, conhecida por sua pelagem vermelha. Destaca-se pela precocidade, qualidade da carne e rusticidade.",
      imagem: "imagens/red_angus.jpg"
    },
    {
      raça: "Brangus",
      nomeCientifico: "Bos taurus x Bos indicus",
      origem: "Estados Unidos",
      aptidao: "Corte",
      pesoMedio: "600-800 kg",
      pelagem: "Preta ou vermelha",
      adaptabilidade: "Clima tropical e subtropical",
      descricao: "Cruzamento entre Angus e Brahman, combinando a qualidade da carne do Angus com a adaptabilidade do Brahman ao clima tropical.",
      imagem: "imagens/brangus.jpg"
    },
    {
      raça: "Senepol",
      nomeCientifico: "Bos taurus",
      origem: "Ilhas Virgens",
      aptidao: "Corte",
      pesoMedio: "500-700 kg",
      pelagem: "Branca",
      adaptabilidade: "Clima tropical",
      descricao: "Raça adaptada a climas quentes e úmidos, com excelente fertilidade e produção de leite.",
      imagem: "imagens/senepol.jpg"
    },

      
        {
          raça: "Caracu",
          nomeCientifico: "Bos taurus indicus",
          origem: "Brasil",
          aptidao: "Corte e trabalho",
          pesoMedio: "500-700 kg",
          pelagem: "Variada (preta, vermelha, pintada)",
          adaptabilidade: "Clima tropical",
          descricao: "Raça brasileira de origem zebuína, conhecida por sua rusticidade e resistência a doenças. É utilizada tanto para produção de carne quanto para trabalho na agricultura.",
          imagem: "imagens/caracu.jpg"
        },
        {
          raça: "Tabapuã",
          nomeCientifico: "Bos taurus indicus",
          origem: "Brasil",
          aptidao: "Corte e leite",
          pesoMedio: "500-700 kg",
          pelagem: "Vermelha ou pintada",
          adaptabilidade: "Clima tropical",
          descricao: "Raça brasileira de dupla aptidão, com boa produção de leite e carne. É adaptada a condições de pastagem extensiva.",
          imagem: "imagens/tabapuã.jpg"
        },
        {
          raça: "Chianina",
          nomeCientifico: "Bos taurus",
          origem: "Itália",
          aptidao: "Corte",
          pesoMedio: "1000 kg",
          pelagem: "Branca",
          adaptabilidade: "Clima temperado",
          descricao: "Uma das maiores raças bovinas do mundo, conhecida por sua carne de alta qualidade e rusticidade. É utilizada em cruzamentos para melhorar o tamanho e a precocidade de outras raças.",
          imagem: "imagens/chianina.jpg"
        },
        {
            raça: "Sindi",
            nomeCientifico: "Bos indicus",
            origem: "Índia",
            aptidao: "Corte e leite",
            pesoMedio: "500-700 kg",
            pelagem: "variada (Cinza, branca, vermelha ou preta)",
            adaptabilidade: "Clima tropical",
            descricao: "Raça zebuína de dupla aptidão, conhecida por sua rusticidade e adaptabilidade a diferentes condições climáticas. É utilizada tanto para produção de carne quanto de leite.",
            imagem: "imagens/sindi.jpg"
          },
          {
            raça: "Hereford",
            nomeCientifico: "Bos taurus",
            origem: "Inglaterra",
            aptidao: "Corte",
            pesoMedio: "800-1000 kg",
            pelagem: "Vermelha com face, pescoço e membros brancos",
            adaptabilidade: "Clima temperado",
            descricao: "Raça britânica de corte, conhecida por sua rusticidade e habilidade materna. É amplamente utilizada em cruzamentos para melhorar a qualidade da carne e a precocidade de outras raças.",
            imagem: "imagens/hereford.jpg"
          },
          {
            raça: "Galloway",
            nomeCientifico: "Bos taurus",
            origem: "Escócia",
            aptidao: "Corte e dupla aptidão",
            pesoMedio: "600-800 kg",
            pelagem: "Preta ou vermelha",
            adaptabilidade: "Clima frio e temperado",
            descricao: "Raça britânica conhecida por sua pelagem longa e densa, que a protege do frio. É utilizada tanto para produção de carne quanto para produção de leite em menor escala.",
            imagem: "imagens/galloway.jpg"
          },

]
