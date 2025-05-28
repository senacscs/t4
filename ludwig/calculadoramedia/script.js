function calcularConceito() {
    let nota1 = parseFloat(prompt("Digite a primeira nota (0 a 10):"));
    let nota2 = parseFloat(prompt("Digite a segunda nota (0 a 10):"));
  
    if (isNaN(nota1) || isNaN(nota2) || nota1 < 0 || nota1 > 10 || nota2 < 0 || nota2 > 10) {
      alert("Por favor, insira notas válidas entre 0 e 10.");
      return;
    }
  
    let media = Math.floor((nota1 + nota2) / 2);
    let conceito;
  
    switch (media) {
      case 9:
      case 10:
        conceito = "A";
        break;
      case 7:
      case 8:
        conceito = "B";
        break;
      case 5:
      case 6:
        conceito = "C";
        break;
      case 3:
      case 4:
        conceito = "D";
        break;
      case 0:
      case 1:
      case 2:
        conceito = "E";
        break;
      default:
        conceito = "Inválido";
    }
  
    alert(`Média arredondada: ${media}\nConceito: ${conceito}`);
  }
  