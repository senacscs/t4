function mostrarNumero() {
 
    const numero = document.getElementById("numero").value;

  
    if (numero) {
      document.getElementById("resultado").innerText = `O número digitado foi: ${numero}`;
    } else {
      document.getElementById("resultado").innerText = "Por favor, digite um número.";
    }
  }