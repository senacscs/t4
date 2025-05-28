function calcular() {
    const nome = document.getElementById('nome').value;
    const distancia = parseFloat(document.getElementById('distancia').value);
    const velocidade = parseFloat(document.getElementById('velocidade').value);
    const consumo = parseFloat(document.getElementById('consumo').value);
    const preco = parseFloat(document.getElementById('preco').value);
  
    if (!nome || isNaN(distancia) || isNaN(velocidade) || isNaN(consumo) || isNaN(preco)) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }
  
    const tempo = distancia / velocidade;
    const litros = distancia / consumo;
    const custo = litros * preco;
  
    const resultado = `
      <strong>Olá, ${nome}!</strong><br>
      Tempo estimado de viagem: ${tempo.toFixed(2)} horas<br>
      Litros de gasolina necessários: ${litros.toFixed(2)} L<br>
      Gasto total em reais: R$ ${custo.toFixed(2)}
    `;
  
    document.getElementById('resultado').innerHTML = resultado;
    console.log(resultado);
  }
  