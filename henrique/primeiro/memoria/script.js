const cards = [
    'a.jpg', 'a.jpg', 'b.jpg', 'b.jpg', 
    'c.jpg', 'c.jpg', 'd.jpg', 'd.jpg',
    'e.jpg', 'e.jpg', 'f.jpg', 'f.jpg',
    'g.jpg', 'g.jpg', 'h.jpg', 'h.jpg'
];

let cardValues = [];
let cardIDs = [];
let matchedCards = [];
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(cards);
    const gameContainer = document.getElementById('game-container');
    
    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-id', index);
        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <div>?</div> <!-- Ou outra informação para a frente -->
                </div>
                <div class="card-back">
                    <img src="${card}" alt="Carta">
                </div>
            </div>
        `;
        cardElement.addEventListener('click', flipCard);
        gameContainer.appendChild(cardElement);
    });
}

function flipCard() {
    const selected = this;
    const cardID = selected.getAttribute('data-id');
    
    if (cardIDs.includes(cardID) || matchedCards.includes(cardID)) return;

    selected.classList.add('flipped');
    cardValues.push(cards[cardID]);
    cardIDs.push(cardID);
    
    if (cardValues.length === 2) {
        setTimeout(checkMatch, 1000);
    }
}

function checkMatch() {
    const [firstCardID, secondCardID] = cardIDs;
    const firstCardValue = cardValues[0];
    const secondCardValue = cardValues[1];
    
    if (firstCardValue === secondCardValue) {
        matchedCards.push(firstCardID, secondCardID);
        score += 10;
        document.getElementById('score').textContent = score;
    } else {
        const firstCard = document.querySelector(`[data-id='${firstCardID}']`);
        const secondCard = document.querySelector(`[data-id='${secondCardID}']`);
        
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
    }

    cardValues = [];
    cardIDs = [];
}

createBoard();
