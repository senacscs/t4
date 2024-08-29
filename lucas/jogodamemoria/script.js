document.addEventListener('DOMContentLoaded', () => {
    const arrayDeCartas = [
      {
        name: '1',
        img: 'https://i.pinimg.com/736x/62/dd/b6/62ddb6e20fc2672cb07b3886e81a780a.jpg'
      },
      {
        name: '2',
        img: 'https://i.pinimg.com/736x/c4/ff/f6/c4fff62c7d3df8e318890edd7a8fdf29.jpg'
      },
      {
        name: '3',
        img: 'https://i.pinimg.com/736x/03/e3/01/03e3012ce53afc1431ac3295129321ad.jpg'
      },
      {
        name: '4',
        img: 'https://i.pinimg.com/736x/09/b1/5b/09b15bb6012b660f4698ff11c307aba7.jpg'
      },
      {
        name: '5',
        img: 'https://i.pinimg.com/474x/b5/c0/b1/b5c0b135dc4dc9356f02ee5c8c0821c8.jpg'
      },
      {
        name: '6',
        img: 'https://i.pinimg.com/474x/e4/a1/e0/e4a1e0616a48f43470dcb5d5b728e2fb.jpg'
      },
      {
        name: '1',
        img: 'https://i.pinimg.com/736x/62/dd/b6/62ddb6e20fc2672cb07b3886e81a780a.jpg'
      },
      {
        name: '2',
        img: 'https://i.pinimg.com/736x/c4/ff/f6/c4fff62c7d3df8e318890edd7a8fdf29.jpg'
      },
      {
        name: '3',
        img: 'https://i.pinimg.com/736x/03/e3/01/03e3012ce53afc1431ac3295129321ad.jpg'
      },
      {
        name: '4',
        img: 'https://i.pinimg.com/736x/09/b1/5b/09b15bb6012b660f4698ff11c307aba7.jpg'
      },
      {
        name: '5',
        img: 'https://i.pinimg.com/474x/b5/c0/b1/b5c0b135dc4dc9356f02ee5c8c0821c8.jpg'
      },
      {
        name: '6',
        img: 'https://i.pinimg.com/474x/e4/a1/e0/e4a1e0616a48f43470dcb5d5b728e2fb.jpg'
      }
    ]
    arrayDeCartas.sort(() => 0.5 - Math.random())
    const tabuleiro = document.querySelector('.tabuleiro')
    const resultado = document.querySelector('#pontuacao')
    const placeholder = 'https://i.pinimg.com/564x/52/a4/dc/52a4dcd6150483b2fbf874a909d81261.jpg'
    const branco = 'https://i.pinimg.com/564x/7b/5a/06/7b5a06317aecf1c137d3f675d6d55118.jpg'
  
    var cartasClicadas = []
    var cartasClicadasId = []
    var cartasCombinadas = []
  
    function criarTabuleiro() {
      for (let i = 0; i < arrayDeCartas.length; i++) {
        var carta = document.createElement('img')
        carta.setAttribute('src', placeholder)
        carta.setAttribute('data-id', i)
        carta.addEventListener('click', viraCarta)
        tabuleiro.appendChild(carta)
      }
    }
  
    function viraCarta() {
      var cartaId = this.getAttribute('data-id')
      cartasClicadas.push(arrayDeCartas[cartaId].name)
      cartasClicadasId.push(cartaId)
      this.setAttribute('src', arrayDeCartas[cartaId].img)
      if (cartasClicadas.length === 2) {
        setTimeout(checarPorCombinacao, 500)
      }
    }
    function checarPorCombinacao() {
      var cartas = document.querySelectorAll('img')
      const primeiraCarta = cartasClicadasId[0]
      const segundaCarta = cartasClicadasId[1]
      if (primeiraCarta === segundaCarta) {
        cartas[primeiraCarta].setAttribute('src', placeholder)
        cartas[segundaCarta].setAttribute('src', placeholder)
        alert('Você clicou na mesma carta!')
      }
      else if (cartasClicadas[0] === cartasClicadas[1]) {
        cartas[primeiraCarta].setAttribute('src', branco)
        cartas[segundaCarta].setAttribute('src', branco)
        cartasCombinadas.push(cartasClicadas)
        cartas[primeiraCarta].removeEventListener('click', viraCarta)
        cartas[segundaCarta].removeEventListener('click', viraCarta)
      }
      else {
        cartas[primeiraCarta].setAttribute('src', placeholder)
        cartas[segundaCarta].setAttribute('src', placeholder)
      }
      cartasClicadas = []
      cartasClicadasId = []
      resultado.textContent = cartasCombinadas.length
      if (cartasCombinadas.length === arrayDeCartas.length / 2) {
        resultado.textContent = 'Você ganhou!!!'
      }
    }
    criarTabuleiro()
  })