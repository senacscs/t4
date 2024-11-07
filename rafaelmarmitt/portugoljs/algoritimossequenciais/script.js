function toggleMenu() {
    const menu = document.getElementById('menu');
    const arrow = document.getElementById('arrow');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block'; // Mostra o menu
        arrow.classList.add('arrow-down'); // Adiciona classe para rotacionar a seta
    } else {
        menu.style.display = 'none'; // Esconde o menu
        arrow.classList.remove('arrow-down'); // Remove classe para restaurar a seta
    }
}