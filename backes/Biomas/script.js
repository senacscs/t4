document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const menuLinks = document.querySelectorAll('.nav-menu a');

    // Função para alternar a classe 'active'
    function toggleMenu() {
        navMenu.classList.toggle('active');
    }

    // Adiciona evento de clique no botão hamburguer
    menuBtn.addEventListener('click', toggleMenu);

    // Adiciona evento de clique nos links do menu para fechar
    menuLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
        });
    });
});

document.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition > sectionTop + sectionHeight) {
            section.classList.add('fade');
        } else {
            section.classList.remove('fade');
        }
    });
});

