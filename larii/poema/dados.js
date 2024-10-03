const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const imageContainer = document.getElementById('imageContainer');

// Lista de imagens simuladas
const images = [
    "https://i.pinimg.com/736x/62/de/59/62de59c0d39e19bf66e36558b032f29b.jpg",
    "https://i.pinimg.com/736x/08/0a/5c/080a5c6ef327c5542ffe800743f432fa.jpg",
    "https://i.pinimg.com/736x/f3/4e/da/f34edad9d693a5cedd6c3c802a510bad.jpg",
    "https://i.pinimg.com/736x/d9/83/1b/d9831b66591e15c71c15fb48d80dedea.jpg",
    "https://i.pinimg.com/736x/19/8a/5c/198a5cc9aa5d560b1a1a9200eedcf4b2.jpg",
    "https://i.pinimg.com/736x/95/e5/d9/95e5d96280d1ccdf22f68bd0faea62c8.jpg",
    "https://i.pinimg.com/736x/da/46/23/da462347d30bf385ceddc317b989ff19.jpg",
    "https://i.pinimg.com/736x/39/51/57/3951576f3f5109586eb524145438fb90.jpg",
    "https://i.pinimg.com/736x/ca/b7/ec/cab7ec4937cccc763b943fbda1d92613.jpg",
];

// URL para redirecionar quando clicar na última imagem
const redirectUrl = "http://127.0.0.1:5500/outrospoemas/index.html";

searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    displayImages();
});

function displayImages() {
    imageContainer.innerHTML = ""; 
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = "Imagem de Amor Próprio";
        
        // Adiciona um evento de clique à imagem
        img.addEventListener('click', () => {
            if (index === images.length - 1) {
                window.location.href = redirectUrl; // Redireciona se for a última imagem
            } else {
                // Lógica para o que deve acontecer se não for a última imagem (opcional)
                console.log("Imagem clicada:", src);
            }
        });

        imageContainer.appendChild(img);
    });
}
