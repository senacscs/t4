
    document.addEventListener('DOMContentLoaded', () => {
        const navLinks = document.querySelectorAll('nav a');
        const headings = document.querySelectorAll('h2');

        function activateHeading(id) {
            headings.forEach(h2 => {
                if (h2.id === id) {
                    h2.classList.add('active');
                } else {
                    h2.classList.remove('active');
                }
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault(); // Evita o comportamento padrão de rolar para a seção
                const targetId = link.getAttribute('href').substring(1); // Remove o '#'
                activateHeading(targetId);
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' }); // Rolagem suave para a seção
            });
        });
    });

