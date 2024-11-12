function calcular() {
    
    const a = parseFloat(document.getElementById("num1").value);
    const b = parseFloat(document.getElementById("num2").value);

    
    if (isNaN(a) || isNaN(b)) {
      document.getElementById("resultado").innerText = "Por favor, digite valores numéricos válidos.";
      return;
    }

    
    const soma = a + b;
    const sub = a - b;
    const mult = a * b;
    const div = b !== 0 ? (a / b).toFixed(2) : "Divisão por zero não é permitida";

    
    document.getElementById("resultado").innerHTML = `
      <p>A soma dos números é igual a: ${soma}</p>
      <p>A subtração dos números é igual a: ${sub}</p>
      <p>A multiplicação dos números é igual a: ${mult}</p>
      <p>A divisão dos números é igual a: ${div}</p>
    `;
  }