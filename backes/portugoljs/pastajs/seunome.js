
function saudar() {
    
    let nome = document.getElementById("nome").value;

 
    if (nome) {
      document.getElementById("resultado").innerText = `Olá, ${nome}! Seja bem-vindo(a)!`;
    } else {
      document.getElementById("resultado").innerText = "Por favor, digite seu nome.";
    }
  }