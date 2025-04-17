const layers = document.querySelectorAll('.layer');

function parallax() {
  const y = window.scrollY;
  for (let i = 1; i < layers.length; i++) {
    layers[layers.length-i].style.transform = `translateY(${(i*0.1) * y}px)`;
  }
}

window.addEventListener('scroll', parallax, false);

//particles js

tsParticles.load("tsparticles", {
  particles: {
    number: {
      value: 30, // Aantal particles, pas aan indien nodig
      density: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      type: "image",
      image: [
        {
          src: "https://iili.io/2ofIXAN.png",
          width: 34,
          height: 50
        },
        {
          src: "https://iili.io/2ofIW9p.png",
          width: 50,
          height: 50
        },
        {
          src: "https://iili.io/2ofIMSR.png",
          width: 19,
          height: 50
        },
        {
          src: "https://iili.io/2ofSQuj.png",
          width: 48,
          height: 50
        }
        // Voeg meer afbeeldingen toe indien gewenst
        // Voeg meer afbeeldingen toe indien gewenst
      ]
    },
    opacity: {
      value: 0.9,
      random: true
    },
    size: {
      value: 10, // Gebruik een vaste grootte die overeenkomt met de afbeelding
      random: false // Uitschakelen voor consistente grootte
    },
    move: {
      enable: true,
      speed: 2, // Snelheid waarmee bladeren vallen
      direction: "bottom", // Richting naar beneden
      random: true,
      straight: false, // Laat ze dwarrelen in plaats van recht vallen
      out_mode: "out", // Particles gaan uit beeld en verdwijnen
      bounce: false
    },
    rotate: {
      value: 45, // Rotatie van de afbeelding
      random: true,
      animation: {
        enable: true,
        speed: 10, // Draaisnelheid
        sync: false
      }
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: false // Geen interactie bij hover
      },
      onclick: {
        enable: true,
        mode: "push" // Voeg meer particles toe bij klik
      }
    },
    modes: {
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

//end particles
