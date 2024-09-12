const series = [
    { title: "Stranger Things", image: "https://i.pinimg.com/736x/e6/b0/17/e6b01765ec1c2c4bdac3fdb5417a46fa.jpg" },
    { title: "The Society", image: "https://upload.wikimedia.org/wikipedia/pt/c/c7/Title_screen_for_The_Society.png" },
    { title: "Shadowhunters", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj6fkQTmQh709tO2HZ1tKorMt1KIpOh6FT8dYed3Ntok9MxhvwH-etqrFqJGPvLuKPpQ71DJTE1ot9Z4M3jc6AuewJVDfdviG9bFqNGZmNcEoceBuA7Mcdc0KP1ZT-sETn_ktFoZxNNMTU/s1600/shadowhunters-min.png" },
    { title: "I am not okay with this", image: "https://upload.wikimedia.org/wikipedia/en/9/98/I_Am_Not_Okay_with_This_Title_Card.jpg" },
    { title: "Breaking Bad", image: "https://pm1.aminoapps.com/6446/87b4500cf616aa7b6ed13b3667690ba272162e4c_hq.jpg" },
    { title: "The Walking Dead ", image: "https://s2-techtudo.glbimg.com/CjB3bt2wVNRVYPbvL619Geh4s6U=/0x0:1152x648/888x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2023/D/o/d74nvrTSSgAoY7pLvieA/walking-dead-capa.jpg" },
    { title: "13 Reasons Why", image: "https://seriesbrasil.com.br/wp-content/uploads/2020/06/13-r-w-capa.png" },
    { title: "A Series of Unfortunate Events", image: "https://upload.wikimedia.org/wikipedia/pt/e/e9/A_Series_of_Unfortunate_Events_logo.jpg" },
    { title: "The Umbrella Academy", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgARFWNQYS8LIICPVnCCz-sRWPlhQHJnbYj88Rdr88mErSIgQKOac2t37QBRKZb9-6K95QnykMtamX6PB9TAocm97lNS1HWD61gPZIuiVdQQaEV0rwTyKoRN_DpHT6UfO7UA4AfWu6QbAE/s1600/the-umbrella-academy-min.png" },
    { title: "Peaky Blinders ", image: "https://upload.wikimedia.org/wikipedia/pt/6/67/Peaky_Blinders.jpg"},
    { title: "The a list", image: "https://upload.wikimedia.org/wikipedia/en/0/01/The_A_List_intertitle.png" },
    { title: "Never Have I Ever", image: "https://upload.wikimedia.org/wikipedia/commons/5/5a/Never_Have_I_Ever_Title_Card.png" },
    { title: "Cobra kai", image: "https://upload.wikimedia.org/wikipedia/en/d/d6/CobraKaiTitleScreen.png" },
    { title: "Chilling Adventures of Sabrina", image: "https://upload.wikimedia.org/wikipedia/pt/c/c5/Chilling_Adventures_of_Sabrina_logo.jpg" },
    { title: "Riverdale", image: "https://upload.wikimedia.org/wikipedia/pt/b/b6/Riverdale_s%C3%A9rie_logo.png" },
    { title: "The Midnight Club", image: "https://upload.wikimedia.org/wikipedia/en/7/7d/The_Midnight_Club.png" },
    { title: "Fate: The Winx Saga", image: "https://upload.wikimedia.org/wikipedia/pt/c/c4/Logo_Serie_TV_Fate-The_Winx_Saga.png" },
    { title: "Ginny and Georgia", image: "https://upload.wikimedia.org/wikipedia/pt/c/c8/Ginny_%26_Georgia_Title_Card.png" },
    { title: "Everything Sucks ", image: "https://www.englishexperts.com.br/wp-content/uploads/2018/03/everything-sucks-768x402.webp" },
    { title: "Boo, Bitch", image: "https://img.quizur.com/f/img648601d960fb22.12229728.jpg?lastEdited=1686503908?o=capa" },
    { title: "Gossip Girl", image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Gg_logo.png" },
    { title: "My Life with the Walter Boys", image: "https://upload.wikimedia.org/wikipedia/en/c/c6/My_Life_with_the_Walter_Boys_Title_Card.png" },
    { title: "Dark", image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhWCo71Imdx5aEIO6VQ2MS8eWvymlsfWpbwvy269YA3UpYgLAAUEcxmEf0evt9b7KntkQMvBKKTVdlwoXbg2M1ycDGW7d46U2dlvZzGXNxrX0p2Oc5w7nSPpsLbq0FjbyBQHaTZpcnYbbE/s1600/Dark-Netflix.jpg" },
    { title: "Anne With An E", image: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Anne_with_an_%22E%22_logo.png" },
    { title: "On My Block ", image: "https://upload.wikimedia.org/wikipedia/pt/3/35/OnMyBlock.png" }
];
 
function displaySeries(seriesList) {
    const seriesContainer = document.getElementById('series-list');
    seriesContainer.innerHTML = '';
 
    seriesList.forEach(series => {
        const seriesItem = document.createElement('div');
        seriesItem.classList.add('series-item');
        seriesItem.innerHTML = `
            <img src="${series.image}" alt="${series.title}">
            <div class="title">${series.title}</div>
        `;
        seriesContainer.appendChild(seriesItem);
    });
}
 
function searchSeries() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredSeries = series.filter(s => s.title.toLowerCase().includes(query));
    displaySeries(filteredSeries);
}
 
displaySeries(series);
 