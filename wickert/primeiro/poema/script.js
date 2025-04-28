let lastScrollPosition = window.scrollY;

    window.addEventListener('scroll', function () {
      let currentScrollPosition = window.scrollY;
      
      if (currentScrollPosition < lastScrollPosition) {
        // Se o usuário tentar rolar para cima, mantemos a posição anterior
        window.scrollTo(0, lastScrollPosition);
      } else {
        // Atualizamos a posição se ele estiver rolando para baixo
        lastScrollPosition = currentScrollPosition;
      }
    });