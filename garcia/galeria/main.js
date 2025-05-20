const pubSection = document.querySelector('.pub');
lista.forEach((item, index) => {
    const img = document.createElement('img');
    img.src = item.link; 
    img.alt = item.name;
    img.setAttribute('data-base', index); 
    img.setAttribute('onclick', "openCard(this)");
    pubSection.appendChild(img);
});

function openCard(card) {
    const focus = document.getElementById("focus");
    focus.classList.remove("fechado");
    focus.classList.add("aberto");

    const imgs = document.querySelectorAll(".igm");
    const imgContainer = focus.querySelector(".img");
    const lateralTitle = focus.querySelector(".linha1 h3");
    const lateralDescription = focus.querySelector(".linha2-text p");

    const index = card.getAttribute('data-base');
    const item = lista[index];

    imgs.forEach(img => {
        img.src = item.link;
        img.alt = item.name;
    });

    imgContainer.style.backgroundImage = `url(${item.link})`;

    lateralTitle.textContent = item.name;
    lateralDescription.innerHTML = `<strong>${item.name}</strong> ${item.descicao.replace(/\n/g, "<br>")}`;

    document.body.classList.add("focus-active");
}

function closeCard() {
    const focus = document.getElementById("focus");
    focus.classList.remove("aberto");
    focus.classList.add("fechado");

    document.body.classList.remove("focus-active");
}