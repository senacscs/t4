function calcularConceito() {
    let nota1 = parseFloat(prompt("Digite a primeira nota:"));
    let nota2 = parseFloat(prompt("Digite a segunda nota:"));

    if (isNaN(nota1) || isNaN(nota2)) {
      alert("Por favor, insira notas válidas.");
      return;
    }

    let media = (nota1 + nota2) / 2;

    let mediaArredondada = Math.floor(media);

    let conceito;

    switch (mediaArredondada) {
      case 10:
      case 9:
        conceito = "A";
        break;
      case 8:
      case 7:
        conceito = "B";
        break;
      case 6:
      case 5:
        conceito = "C";
        break;
      case 4:
      case 3:
        conceito = "D";
        break;
      case 2:
      case 1:
      case 0:
        conceito = "E";
        break;
      default:
        conceito = "Nota inválida";
    }

    alert("Conceito: " + conceito);
  }