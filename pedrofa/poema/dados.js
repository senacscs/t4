function getNextValentinesDay() {
    let now = new Date();
    let year = now.getFullYear();
    let valentinesDay = new Date(year, 5, 12);

    if (now > valentinesDay) {
        valentinesDay = new Date(year + 1, 5, 12);
    }
    return valentinesDay;
}

function updateTimer() {
    const nextValentinesDay = getNextValentinesDay();
    const now = new Date();
    const difference = nextValentinesDay - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
}

// Atualiza o timer a cada segundo
setInterval(updateTimer, 1000);

// Inicia o timer imediatamente ao carregar a página
updateTimer();

