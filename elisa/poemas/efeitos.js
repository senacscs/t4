document.addEventListener('DOMContentLoaded', () => {
    const eyesContainer = document.querySelector('.eyes');
    const eyes = document.querySelectorAll('.eyes > div');

    if (!eyesContainer || eyes.length !== 2) return;

    const containerRect = eyesContainer.getBoundingClientRect();
    const containerCenterX = containerRect.left + containerRect.width / 2;
    const containerCenterY = containerRect.top + containerRect.height / 2;

    function moveEyes() {
        const randomAngle = Math.random() * Math.PI * 2; // Gera um ângulo aleatório
        const randomDistance = Math.random() * (eyes[0].offsetWidth / 4); // Gera uma distância aleatória

        const moveX = Math.cos(randomAngle) * randomDistance;
        const moveY = Math.sin(randomAngle) * randomDistance;

        eyes.forEach(eye => {
            const eyeBall = eye.querySelector('i');
            eyeBall.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    }

    // Faz os olhos se moverem a cada 500ms
    setInterval(moveEyes, 500);
});
const texto = "\nO amor, quando se revela, \nNão se sabe revelar.\nSabe bem olhar p'ra ela,\nMas não lhe sabe falar. \n\nQuem quer dizer o que sente \nNão sabe o que há de dizer. \nFala: parece que mente... \nCala: parece esquecer... \n\nAh, mas se ela adivinhasse, \nSe pudesse ouvir o olhar, \nE se um olhar lhe bastasse \nP'ra saber que a estão a amar! \n\nMas quem sente muito, cala; \nQuem quer dizer quanto sente \nFica sem alma nem fala, \nFica só, inteiramente! \n\nMas se isto puder contar-lhe \nO que não lhe ouso contar, \nJá não terei que falar-lhe \nPorque lhe estou a falar... \n\nFernando Pessoa";
    const elemento = document.getElementById('digitando');
    let index = 0;
    function digitarTexto() {
      if (index < texto.length) {
        elemento.innerHTML += texto.charAt(index);
        index++;
        setTimeout(digitarTexto, 50); // Atraso de 50ms entre cada caractere
      }
    }

    digitarTexto(); // Iniciar o efeito