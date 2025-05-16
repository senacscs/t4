const nota1 = parseFloat(prompt("Digite a primeira nota (0-10):"));
const nota2 = parseFloat(prompt("Digite a segunda nota (0-10):"));

    const media = (nota1 + nota2) / 2;
    
    const mediaArredondada = Math.floor(media);
    
    let Nota;
    switch (mediaArredondada) {
        case 10:
        case 9:
            Nota = "A";
            break;
        case 8:
        case 7:
            Nota = "B";
            break;
        case 6:
        case 5:
            Nota = "C";
            break;
        case 4:
        case 3:
            Nota = "D";
            break;
        case 2:
        case 1:
        case 0:
            Nota = "E";
            break;
        default:
            Nota = "Média inválida";
    }
    
    alert(`Média: ${media.toFixed(1)}\nNota: ${Nota}`);
