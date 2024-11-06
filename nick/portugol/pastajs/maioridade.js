function verificarMaioridade() {
  
    let idade = parseInt(document.getElementById("idade").value);

    if (idade >= 18) {
      document.getElementById("resultado").innerText = "Você é maior de idade.";
    } else {
      document.getElementById("resultado").innerText = "Você é menor de idade.";
    }
  }