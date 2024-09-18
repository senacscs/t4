let dados = [
    {
        titulo: "Eminem",
        descricao: "Marshall Bruce Mathers III, mais conhecido pelo seu nome artístico Eminem, é um rapper, compositor, produtor musical e ator estadunidense. Adquiriu rápida popularidade em 1999 com o lançamento do disco The Slim Shady LP, o qual venceu o Grammy Award de Melhor Álbum de Rap do ano.",
        link: "https://pt.wikipedia.org/wiki/Eminem",
        imagem: "https://img.odcdn.com.br/cdn-cgi/image/width=1280,height=720,fit=cover/wp-content/uploads/2024/02/Eminem.png",
        tags: "goat rap god eua usa afiado"
    },
    {
        titulo: "Jay-Z",
        descricao: "Shawn Corey Carter, mais conhecido pelo seu nome artístico JAY-Z, é um rapper, compositor, produtor e empresário norte-americano. Ele é um dos artistas de hip hop mais bem sucedidos empresarialmente e financeiramente nos Estados Unidos.",
        link: "https://pt.wikipedia.org/wiki/Jay-Z",
        imagem: "https://s2.glbimg.com/MRrqy7zwOOTbVoajbPNaPk-JyFg=/620x466/e.glbimg.com/og/ed/f/original/2021/11/23/gettyimages-1345217425.jpg",
        tags: "rap usa eua goat"
    },
    {
        titulo: "50 Cent",
        descricao: "Curtis James Jackson III, mais conhecido pelo seu nome artístico 50 Cent, é um rapper, ator, diretor, roteirista e empresário norte-americano. Ficou conhecido com o lançamento dos álbuns Get Rich or Die Tryin' e The Massacre",
        link: "https://pt.wikipedia.org/wiki/50_Cent",
        imagem: "https://a57.foxnews.com/static.foxnews.com/foxnews.com/content/uploads/2024/01/896/500/50-cent.jpg?ve=1&tl=1",
        tags: "moeda negro usa eua rap"
    },
    {
        titulo: "Snoop Dogg",
        descricao: "Calvin Cordozar Broadus, Jr., conhecido pelos nomes artísticos Snoop Doggy Dogg, Snoop Dogg, Snoop Lion e Snoopzilla é um rapper, cantor, compositor, produtor musical e ator norte-americano.",
        link: "https://pt.wikipedia.org/wiki/Snoop_Dogg",
        imagem: "https://mundonegro.inf.br/wp-content/uploads/2022/11/capa-Mundo-Negro-97.jpg",
        tags: "antigo gangster rap"
    },
    {
        titulo: "Kanye West",
        descricao: "Atualmente, como cantor, West é o 4º artista que mais vendeu músicas em formato digital.[9] Além disso, ele acumula uma impressionante coleção de prêmios, incluindo um total de 24 Grammys, tornando-se assim o maior rapper da história da premiação.",
        link: "https://pt.wikipedia.org/wiki/Kanye_West",
        imagem: "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2024%2F08%2F08%2Fye-fried-music-video-vultures-2-ty-dolla-sign-stream-0.jpg?w=960&cbr=1&q=90&fit=max",
        tags: "grammy rap usa"
    },
    {
        titulo: "Dr. Dre",
        descricao: "Andre Romell Young, mais conhecido pelo seu nome artístico Dr. Dre, é um rapper, produtor musical, editor musical, empresário e ator estadunidense. Surgiu na cena musical no fim da década de 1980. É um dos mais conhecidos entre os produtores de rap da atualidade.",
        link: "https://pt.wikipedia.org/wiki/Dr._Dre",
        imagem: "https://i0.wp.com/br.nacaodamusica.com/wp-content/uploads/2021/01/dr-dre.jpg",
        tags: "produtor dre rap"
    },
    {
        titulo: "Ice Cube",
        descricao: "O'Shea Jackson Sr., mais conhecido pelo seu nome artístico Ice Cube, é um rapper e ator americano. Ele iniciou sua carreira em 1984 como membro do grupo C.I.A. e depois entrou para o grupo de gangsta rap N.W.A em 1986.",
        link: "https://pt.wikipedia.org/wiki/Ice_Cube",
        imagem: "https://s2.glbimg.com/5wukjl7yQ4nYb8mlXffmjrZH9z4=/620x466/e.glbimg.com/og/ed/f/original/2021/10/29/image_ed31wUp.png",
        tags: "gelo ice cubo rap usa"
    },
    {
        titulo: "Lil Wayne",
        descricao: "Dwayne Michael Carter, Jr., mais conhecido pelo seu nome artístico de Lil Wayne, é um rapper, cantor, compositor, produtor executivo e empreendedor americano, conhecido por ser um dos maiores influenciadores do rap/trap atual e dono da gravadora Young Money Entertainment.",
        link: "https://pt.wikipedia.org/wiki/Lil_Wayne",
        imagem: "https://macmagazine.com.br/wp-content/uploads/2020/04/28-Lil-Wayne.jpg",
        tags: "baixo negro rap"
    },
    {
        titulo: "The Notorious B.I.G",
        descricao: "Christopher George Latore Wallace, mais conhecido por seus nomes artísticos The Notorious B.I.G., Biggie Smalls, ou simplesmente Biggie, foi um rapper e compositor norte-americano. Enraizado na cena do rap de Nova Iorque e nas tradições do gangsta rap, ele é considerado um dos maiores rappers de todos os tempos.",
        link: "https://pt.wikipedia.org/wiki/The_Nortorious_B.I.G",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUqIkVCjziU7k1r5vPzElXJWiU13zAmijcFA&s",
        tags: "rap goat morto grande"
    },
    {
        titulo: "Tupac",
        descricao: "Tupac Amaru Shakur, mais conhecido pelos seus nomes artísticos 2Pac, Makaveli ou apenas Pac, foi um rapper, ator e compositor estadunidense, considerado por muitos como um dos melhores e mais importantes rappers de todos os tempos. Em 2010, ele já havia vendido pelo menos 75 milhões de cópias pelo mundo.",
        link: "https://pt.wikipedia.org/wiki/Tupac_Shakur",
        imagem: "https://rollingstone.com.br/media/uploads/legacy/2017/img-1043597-tupac-shakur.jpg",
        tags: "rap eua morto negro"
    },
    {
        titulo: "Kendrick Lamar",
        descricao: "Kendrick Lamar Duckworth, mais conhecido como Kendrick Lamar, é um rapper, compositor e produtor musical norte-americano, ele é vencedor de 17 prêmios Grammy e único músico fora da música clássica e de jazz a a receber o Prémio Pulitzer, sendo considerado como um dos artistas mais influentes de sua geração, além de um dos maiores rappers e letristas de todos os tempos.",
        link: "https://pt.wikipedia.org/wiki/Kendrink_Lamar",
        imagem: "https://i0.wp.com/assets.b9.com.br/wp-content/uploads/2020/10/kmb9.jpg?fit=750%2C480&ssl=1",
        tags: "rap negro afiado"
    },
    {
        titulo: "J. Cole",
        descricao: "Jermaine Lamarr Cole, mais conhecido simplesmente como J. Cole, é um rapper e produtor norte-americano nascido na Alemanha. Nasceu no hospital da base geral do Exército dos Estados Unidos em Frankfurt, na Alemanha, aos 8 meses de idade, ele e sua mãe se mudaram para Fayetteville, Carolina do Norte.",
        link: "https://pt.wikipedia.org/wiki/J._Cole",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjGIqJUSg-Iiu3rl1KuqUvzli6Fmum43jaGg&s",
        tags: "branco rap afiado"
    },
    {
        titulo: "Drake",
        descricao: "Aubrey Drake Graham é um rapper, cantor, compositor, produtor musical, ator e empresário canadense. Drake inicialmente ganhou reconhecimento como ator na série de televisão de drama adolescente Degrassi: The Next Generation, no início dos anos 2000, iniciou sua carreira músical de forma independente em 2006, e após reconhecimento, assinou com a Young Money Entertainment em 2009.",
        link: "https://pt.wikipedia.org/wiki/Drake",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpi1v1tteNlNWiqcj9pIhiVtrmFJKPBTgGlQ&s",
        tags: "outubro rap god"
    },
    {
        titulo: "Ludacris",
        descricao: "Ludacris, nome artístico de Christopher Brian Bridges, é um rapper, ator e empreendedor americano. Estreou-se em 1999 com Incognegro, um álbum lançado a título independente pela sua editora, a Disturbing tha Peace. Depois, com a criação da Def Jam South, subsidiária da Def Jam, Ludacris é contratado e torna-se na principal face da mesma.",
        link: "https://pt.wikipedia.org/wiki/Ludacris",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRYxKV1HZ4wg_T1nmtkfDUL-eO-3E7DnF07g&s",
        tags: "negro rap ator"
    },
    {
        titulo: "Travis Scott",
        descricao: "Jacques Berman Webster II, mais conhecido por seu nome artístico Travis Scott, é um rapper, cantor, compositor e produtor musical norte-americano. Em 2012, Scott assinou seu primeiro grande contrato com a gravadora Epic Records.",
        link: "https://pt.wikipedia.org/wiki/Travis_Scott",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWlWHVM4GTuL247FsAGH3aLN8Ohprpkwhezg&s",
        tags: "negro rap tatuado famoso"
    },
    {
        titulo: "Nicki Minaj",
        descricao: "Onika Tanya Maraj, conhecida por seu nome artístico Nicki Minaj, é uma rapper, cantora, compositora, modelo e atriz trinidiana radicada nos Estados Unidos. Minaj nasceu no país caribenho e mudou-se para o bairro nova-iorquino do Queens quando tinha cinco anos de idade, se formando em escolas artísticas mais tarde.",
        link: "https://pt.wikipedia.org/wiki/Nicki_Minaj",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7BDKG7R0eYoi0jCLnfHu8NmsUPDcXikLHuA&s",
        tags: "mulher negro rap"
    },
    {
        titulo: "Cardi B",
        descricao: "Belcalis Marlenis Almánzar, conhecida profissionalmente como Cardi B, é uma rapper, compositora, atriz e personalidade de televisão americana.",
        link: "https://pt.wikipedia.org/wiki/Cardi_B",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRsnv-JXnNDhGXqXfx9moOIHKQSyllMMPwzg&s",
        tags: "mulher negro rap"
    },
    {
        titulo: "Post Malone",
        descricao: "Austin Richard Post, conhecido profissionalmente como Post Malone, é um cantor, rapper, compositor, produtor de discos e guitarrista norte-americano.",
        link: "https://pt.wikipedia.org/wiki/Post_Malone",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkUov8HnNR-QSwlsFpVezGViGOpkv_6smO4g&s",
        tags: "rap foda tatuado"
    },
    {
        titulo: "DMX",
        descricao: "Earl Simmons, conhecido como DMX, foi um rapper, compositor e ator americano. DMX já vendeu trinta milhões de álbuns até hoje e é considerado um dos maiores rappers de todos os tempos. Simmons morreu aos 50 anos, após sofrer um ataque de coração causado por uma overdose.",
        link: "https://pt.wikipedia.org/wiki/DMX",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Q2DpKBqLvHs33zU6HZzVgMN0x_W_7z8jyw&s",
        tags: "negro rap morto x"
    },
    {
        titulo: "Wiz Khalifa",
        descricao: "Cameron Jibril Thomaz, mais conhecido como Wiz Khalifa, é um rapper, cantor, compositor e ator norte-americano. Em 2006, Khalifa lançou seu álbum de estreia, Show and Prove, em 2007 assinou pela Warner Bros Records Sua canção Say Yeah ficou bem colocada nas paradas musicais de 2008, como na Rhythmic Top 40 e na Billboard Rap Songs, recebendo airplay nas rádios.",
        link: "https://pt.wikipedia.org/wiki/Wiz_Khalifa",
        imagem: "https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/Jimmy-Fontaine-jpg-1587050066.jpg",
        tags: "rap again rico"
    },
    {
        titulo: "Pop Smoke",
        descricao: "Bashar Barakah Jackson, mais conhecido pelo nome artístico Pop Smoke, foi um rapper, cantor e compositor estadunidense. Ele colaborou com o rapper Travis Scott, entre outros.",
        link: "https://pt.wikipedia.org/wiki/Pop_Smoke",
        imagem: "https://media.npr.org/assets/img/2020/02/19/gettyimages-1199920197-266f39a36e90bbb2b8b315d9041093ef7ba4d679.jpg?s=1100&c=85&f=jpeg",
        tags: "morto tatuado rap smoke"
    },
    {
        titulo: "Chris Brown",
        descricao: "Christopher Maurice Brown é um cantor, rapper, compositor, dançarino, ator, produtor musical, empreendedor, coreógrafo e grafiteiro norte-americano. É um dos principais artistas do R&B contemporâneo, sendo considerado por muitos como o Rei do R&B e um dos artistas mais influentes do século XXI.",
        link: "https://pt.wikipedia.org/wiki/Chris_Brown",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdRA4QWyN31Y80gpMtTBbaFR_IVaZC_WfyHg&s",
        tags: "playboy pop rico pegador rap"
    },
    {
        titulo: "Pitbull",
        descricao: "Armando Christian Pérez, mais conhecido pelo nome artístico Pitbull é um rapper, cantor, compositor e actor americano de ascendência cubana.",
        link: "https://pt.wikipedia.org/wiki/Pitbull_(rapper)",
        imagem: "https://media.cnn.com/api/v1/images/stellar/prod/140619211341-pitbull-rapper-and-artist-1.jpg?q=x_0,y_402,h_1278,w_2273,c_crop/w_1280",
        tags: "cuba rap pop"
    },
    {
        titulo: "Lil Jon",
        descricao: "Lil Jon, nome artístico de Jonathan Mortimer Smith, é um rapper, produtor, DJ e ator americano, além de ser fundador da gravadora BME Recordings. Criador do estilo Crunk, que consiste num estilo pesado, variando do Hip Hop, mas possui batidas muito mais dançantes e fortes, que animam a música.",
        link: "https://pt.wikipedia.org/wiki/Lil_Jon",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTft5ZdwWWUYjathTFyNF-ghpnC3EwVvoU9A&s",
        tags: "rap town"
    },
    {
        titulo: "Usher",
        descricao: "Usher Raymond IV, mais conhecido como Usher, é um cantor, dançarino e ator norte-americano. Considerado como um artista influente nos cenários do R&B contemporâneo e da pop, vários meios de comunicação social o descrevem como sendo o 'Rei do R&B'.",
        link: "https://pt.wikipedia.org/wiki/Usher",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSy8qJDH3yoO_lOhXnopjoo41OYIJfaSNyNQ&s",
        tags: "yeah rap negro"
    },
    {
        titulo: "Future",
        descricao: "Nayvadius DeMun Wilburn, nascido Nayvadius D. Wilburn e mais conhecido como Future, é um rapper, cantor, compositor e produtor musical norte-americano. Future é um dos principais pioneiros e influenciadores do gênero trap music.",
        link: "https://pt.wikipedia.org/wiki/Future_(rapper)",
        imagem: "https://portalrapmais.com/wp-content/uploads/2022/11/Future-2.jpg",
        tags: "tatuado rap rico trap"
    },
    {
        titulo: "Pharrell Williams",
        descricao: "Pharrell Lanscilo Williams também conhecido apenas por Pharrell, é um cantor, compositor, rapper, e produtor musical norte-americano. Williams e Chad Hugo formam a dupla de produção The Neptunes, produzindo música soul, hip hop e música de R&B.",
        link: "https://pt.wikipedia.org/wiki/Pharrell_Williams",
        imagem: "https://conteudo.imguol.com.br/c/entretenimento/58/2020/06/25/pharrell-williams-1593098250059_v2_900x506.jpg",
        tags: "pop negro rap famoso rico"
    },
    {
        titulo: "Ice Spice",
        descricao: "Isis Naija Gaston, mais conhecida pelo nome artístico Ice Spice, é uma rapper estadunidense. Ela cresceu em Bronx, na cidade de Nova Iorque, e começou sua carreira em 2021, depois de conhecer o produtor musical RiotUSA, enquanto estudava na State University of New York em Purchase.",
        link: "https://pt.wikipedia.org/wiki/Ice_Spice",
        imagem: "https://akamai.sscdn.co/uploadfile/letras/fotos/1/c/b/f/1cbfbaf3d620a2571af23963f8899867.jpg",
        tags: "ruiva rap louca"
    },
    {
        titulo: "Doja Cat",
        descricao: "Amala Ratna Zandile Dlamini, conhecida profissionalmente como Doja Cat, é uma rapper, cantora, compositora, produtora musical e pintora americana. Nascida e criada em Los Angeles, ela começou a fazer e a lançar música no SoundCloud quando era adolescente.",
        link: "https://pt.wikipedia.org/wiki/Doja_Cat",
        imagem: "https://metropolitanafm.com.br/wp-content/uploads/2024/03/img_doja.jpg",
        tags: "feia rap calva"
    },
    {
        titulo: "Taylor Swift",
        descricao: "Taylor Alison Swift é uma cantora, compositora, produtora musical, diretora e empresária estadunidense. Conhecida por suas composições narrativas que geralmente concentram-se em sua vida pessoal, ao qual recebem ampla cobertura mediática.",
        link: "https://pt.wikipedia.org/wiki/Taylor_Swift",
        imagem: "https://s2-quem.glbimg.com/kfU9Roecl7OYuSoQQ-cgdusal8I=/0x0:1400x950/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_b0f0e84207c948ab8b8777be5a6a4395/internal_photos/bs/2024/G/A/MgCwlMSo6yiM68KEvRGQ/design-sem-nome-2024-09-11t210146.737.jpg",
        tags: "pop loira famosa nfl"
    },
    {
        titulo: "Bruno Mars",
        descricao: "Peter Gene Hernandez, mais conhecido pelo nome artístico Bruno Mars, apelidado de 'Novo Rei do Pop', é um cantor, compositor, produtor musical, dançarino e multi-instrumentista americano, nascido e criado no Havaí.",
        link: "https://pt.wikipedia.org/wiki/Bruno_Mars",
        imagem: "https://i.scdn.co/image/aa32d6d4ca2467974403518dd3ebfe8831c5ced1",
        tags: "pop rap famoso playboy rico"
    },
    {
        titulo: "Olivia Rodrigo",
        descricao: "Olivia Isabel Rodrigo é uma cantora, compositora e atriz filipino-americana. Ela alcançou a fama pela primeira vez como atriz infantil nos programas de televisão da Disney Bizaardvark e High School Musical: The Musical: The Series.",
        link: "https://pt.wikipedia.org/wiki/Olivia_Rodrigo",
        imagem: "https://www.hollywoodreporter.com/wp-content/uploads/2022/02/GettyImages-1369736546.jpg?w=1296&h=730&crop=1",
        tags: "pop morena famosa"
    },
    {
        titulo: "Camila Cabello",
        descricao: "Karla Camila Cabello Estrabao, mais conhecida como Camila Cabello, é uma cantora, compositora e atriz cubana-mexicana naturalizada norte-americana. Ela ganhou destaque como integrante do grupo feminino Fifth Harmony, formado no reality show The X Factor em 2012, assinando um contrato com as gravadoras Syco e Epic Records. Enquanto ainda fazia parte do grupo, Cabello começou a se estabelecer como artista solo, lançando as colaborações 'I Know What You Did Last Summer', com Shawn Mendes, e a 'Bad Things', com Machine Gun Kelly",
        link: "https://pt.wikipedia.org/wiki/Camila_Cabello",
        imagem: "https://s2-quem.glbimg.com/0BavpH55bL_hKzYVY-xhU9LMsXg=/0x0:1400x950/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_b0f0e84207c948ab8b8777be5a6a4395/internal_photos/bs/2024/R/L/qpBfOJR0qvjBxVyMgBng/design-sem-nome-2024-09-11t205529.822.jpg",
        tags: "morena pop legal"
    },
    {
        titulo: "Machine Gun Kelly (MGK)",
        descricao: "Colson Baker, mais conhecido por seu nome artístico Machine Gun Kelly ou MGK é um rapper, cantor-compositor, músico e ator norte-americano. O álbum de estreia de Baker, Lace Up, foi lançado em 2012 e foi seguido por quatro subsequentes lançamentos de estúdio.",
        link: "https://pt.wikipedia.org/wiki/Machine_Gun_Kelly",
        imagem: "https://media.9news.com/assets/ETONLINE/images/59f3c5d3-0160-417d-8e2f-3b211cf6a737/59f3c5d3-0160-417d-8e2f-3b211cf6a737_1140x641.jpg",
        tags: "rock tatuado famoso pegador rap"
    },
    {
        titulo: "Harry Styles",
        descricao: "Harry Edward Styles é um cantor, compositor e ator britânico. Sua carreira musical começou em 2010 como concorrente solo na série britânica de competição de música The X Factor. Após sua eliminação, ele foi trazido de volta para se juntar à boy band One Direction, que se tornou uma das boy bands mais vendidas de todos os tempos antes de entrar em um hiato indefinido em 2016.",
        link: "https://pt.wikipedia.org/wiki/Harry_Styles",
        imagem: "https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2019/12/13130609/adore2.jpg",
        tags: "estilo pop direction"
    },
    {
        titulo: "Ariana Grande",
        descricao: "Ariana Grande-Butera é uma cantora, compositora, produtora musical, atriz e empresária norte-americana. Considerada um ícone pop e uma figura influente na música popular, ela é conhecida por seu alcance vocal de quatro oitavas e seu uso característico do registro de apito.",
        link: "https://pt.wikipedia.org/wiki/Ariana_Grande",
        imagem: "https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2024/01/13151246/GettyImages-1202144628.jpg",
        tags: "famosa atriz pop"
    },
    {
        titulo: "Michael Jackson",
        descricao: "Michael Joseph Jackson foi um cantor, compositor e dançarino estadunidense. Apelidado de 'Rei do Pop', foi um dos ícones culturais mais importantes e influentes de todos os tempos e um dos maiores artistas da história da música.",
        link: "https://pt.wikipedia.org/wiki/Michael_Jackson",
        imagem: "https://midias.em.com.br/_midias/jpg/2024/05/27/1200x720/1_michael_jackson___epic_records-37454700.jpg",
        tags: "pop god goat morto rei"
    },
    {
        titulo: "Bob Marley",
        descricao: "Robert Nesta Marley foi um cantor e compositor jamaicano, o mais conhecido músico de reggae de todos os tempos, famoso por popularizar internacionalmente o gênero. Já vendeu mais de 75 milhões de discos e, em 1978, três anos antes de sua morte, foi condecorado pela ONU com a 'Medalha da Paz do Terceiro Mundo'.",
        link: "https://pt.wikipedia.org/wiki/Bob_Marley",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj3D5adMS1X6yrvCIdPz_lYgz0aRNFSWWfQw&s",
        tags: "rei god reggae morto"
    },
    {
        titulo: "Tina Turner",
        descricao: "Tina Turner foi uma cantora suíça nascida nos Estados Unidos. Amplamente referida como a 'Rainha do Rock 'n' Roll', ganhou destaque como vocalista da dupla Ike & Tina Turner Revue, antes de lançar uma carreira de sucesso como artista solo.",
        link: "https://pt.wikipedia.org/wiki/Tina_Turner",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTULVm156zydEn6yTLQG5vqwjJhJrLIOqEhWw&s",
        tags: "suica rainha morto idosa"
    },
    {
        titulo: "Elvis Presley",
        descricao: "Elvis Aaron Presley foi um cantor, músico e ator estadunidense. Apelidado de 'Rei do Rock and Roll' ou simplesmente 'O Rei', é considerado um dos ícones culturais mais significativos do século XX.",
        link: "https://pt.wikipedia.org/wiki/Elvis_Presley",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuSS9afEi4HSDHxA_Y9up3pN1Vnm7qBt9x9w&s",
        tags: "god king eua rock"
    },
    {
        titulo: "Katy Perry",
        descricao: "Katheryn Elizabeth Hudson, conhecida pelo nome artístico Katy Perry, é uma cantora, empresária, e personalidade de televisão estadunidense. Conhecida por sua influência na música pop moderna e seu estilo exagerado, ela foi chamada de 'Rainha do Camp' pela revista Vogue.",
        link: "https://pt.wikipedia.org/wiki/Katy_Perry",
        imagem: "https://biografiaresumida.com.br/wp-content/uploads/2017/12/Katy-Perry-1.jpg",
        tags: "eua pop queen"
    },
    {
        titulo: "Beyoncé",
        descricao: "Beyoncé Giselle Knowles-Carter, é uma cantora, compositora, atriz, modelo, dançarina, empresária, estilista, produtora, diretora e roteirista americana. Referida como 'Queen Bey', ela tem sido amplamente reconhecida por seu talento artístico, voz e apresentações ao vivo.",
        link: "https://pt.wikipedia.org/wiki/Beyoncé",
        imagem: "https://fly.metroimg.com/upload/q_85,w_700/https://uploads.metroimg.com/wp-content/uploads/2023/08/21164924/Beyonce-denunciada-filha-6-anos.jpg",
        tags: "pop queen eua"
    },
    {
        titulo: "Selena Gomez",
        descricao: "Selena Marie Gomez é uma cantora, atriz, compositora, empresária, produtora e apresentadora norte-americana. Tendo iniciado sua carreira na infância, é uma das artistas mais célebres e sucedidas atualmente, já tendo sido indicada ao Globo de Ouro, Emmy, Grammy, AMAs e VMAs.",
        link: "https://pt.wikipedia.org/wiki/Selena_Gomez",
        imagem: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/06/selena-gomez-e1718906928259.jpg?w=1200&h=1200&crop=1",
        tags: "pop eua"
    },
    {
        titulo: "Lady Gaga",
        descricao: "Stefani Joanne Angelina Germanotta, mais conhecida pelo nome artístico Lady Gaga, é uma cantora, compositora, instrumentista, atriz, produtora musical e empresária estadunidense.",
        link: "https://pt.wikipedia.org/wiki/Lady_Gaga",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTANAwtsCbvExxMi9GlesKVGv32WHpb-fKVpA&s",
        tags: "queen pop eua"
    },
    {
        titulo: "Lana Del Rey",
        descricao: "Elizabeth Woolridge Grant, mais conhecida como Lana Del Rey, é uma cantora, compositora, modelo e poetisa norte-americana.",
        link: "https://pt.wikipedia.org/wiki/Lana_Del_Rey",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRut6d5AcBu6YFwfpFcDB3Gd0QLshruHVdU6w&s",
        tags: "pop famosa eua queen"
    },
    {
        titulo: "Justin Bieber",
        descricao: "Justin Drew Bieber é um cantor, compositor e ator canadense. Em 2007, seus vídeos em que cantava covers foram vistos no YouTube por Scooter Braun, que se tornou seu agente e o levou para a cidade de Atlanta, para reunir-se com o cantor Usher.",
        link: "https://pt.wikipedia.org/wiki/Justin_Bieber",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAwK3_iSETroooQLdw-4kXpLRsIYQkQr-Xmw&s",
        tags: "famoso kid pop eua goat"
    },
    {
        titulo: "Rihanna",
        descricao: "Robyn Rihanna Fenty, mais conhecida como Rihanna, é uma cantora, compositora, filantropa, atriz, empresária, modelo, estilista, produtora e heroína barbadense. Uma das maiores e mais influentes artistas femininas da história.",
        link: "https://pt.wikipedia.org/wiki/Rihanna",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ftmPyjVHCnYDdrl8J1dCFoWvcBS5PckuxA&s",
        tags: "pop queen eua"
    },
    {
        titulo: "The Weeknd",
        descricao: "Abel Makkonen Tesfaye, mais conhecido por seu nome artístico The Weeknd, é um cantor, compositor, ator e produtor musical canadense. Conhecido por sua versatilidade sonora e lirismo sombrio, suas músicas exploram temas de escapismo, romance e melancolia, e são frequentemente inspiradas em experiências pessoais.",
        link: "https://pt.wikipedia.org/wiki/The_Weeknd",
        imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlnkvKTu8sBVl2E90YfXe1S4bVFJieF4x-vA&s",
        tags: "week pop eua"
    },
    {
        titulo: "Billie Ellish",
        descricao: "Billie Eilish Pirate Baird O'Connell é uma cantora e compositora estadunidense. Ganhou popularidade em 2016, quando lançou o single de estreia 'Ocean Eyes' no SoundCloud, posteriormente lançado pelas gravadoras Darkroom e Interscope Records.",
        link: "https://pt.wikipedia.org/wiki/Billie_Ellish",
        imagem: "https://imagenes.elpais.com/resizer/v2/NWFSHZYFO5EHVBUYSIWTVXR6MI.aspx?auth=e3dfa52f0ceb53433948cadf50ee71cb1c692ba72d81a58f99724bf8bd3f54f4&width=1960&height=1470&smart=true",
        tags: "pop rap eua usa"
    },
    {
        titulo: "Nate Dogg",
        descricao: "Nate Dogg, nome artístico de Nathaniel Dwayne Hale, foi um cantor, compositor, rapper e ator americano. Começou a cantar na igreja New Hope Trinity Baptist Church Choir, em Long Beach, Califórnia, onde seu pai, Daniel Lee Hale, era pastor.",
        link: "https://pt.wikipedia.org/wiki/Nate_Dogg",
        imagem: "https://m.i.uol.com.br/musica/2011/03/16/o-rapper-nate-dogg-em-evento-em-hollywood-na-california-26052005-1300287106640_956x500.jpg",
        tags: "morto usa eua rap"
    }
];