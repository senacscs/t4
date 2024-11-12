function trocarVariaveis() {
      
    let a = parseInt(document.getElementById("valorA").value);
    let b = parseInt(document.getElementById("valorB").value);

    document.getElementById("resultado").innerText = `Antes da troca: A = ${a}, B = ${b}`;

    
    let temp = a;
    a = b;
    b = temp;


    document.getElementById("resultado").innerText += `\nDepois da troca: A = ${a}, B = ${b}`;
  }