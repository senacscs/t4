function calcularViagem() {
    const nome = document.getElementById('nome').value;
    const distancia = parseFloat(document.getElementById('distancia').value);
    const velocidade = parseFloat(document.getElementById('velocidade').value);
    const consumo = parseFloat(document.getElementById('consumo').value);
    const preco = parseFloat(document.getElementById('preco').value);

    if (!nome || isNaN(distancia) || isNaN(velocidade) || isNaN(consumo) || isNaN(preco)) {
      alert("Por favor, preencha todos os campos corretamente!");
      return;
    }

    const tempoViagem = distancia / velocidade;
    const litrosNecessarios = distancia / consumo;
    const gastoTotal = litrosNecessarios * preco;

    alert("Olá " + nome + "!\n" +
          "Tempo estimado de viagem: " + tempoViagem.toFixed(2) + " horas.\n" +
          "Litros necessários: " + litrosNecessarios.toFixed(2) + " litros.\n" +
          "Gasto total: R$" + gastoTotal.toFixed(2));

    console.log(`Olá ${nome}!`);
    console.log(`Tempo estimado de viagem: ${tempoViagem.toFixed(2)} horas.`);
    console.log(`Litros necessários: ${litrosNecessarios.toFixed(2)} litros.`);
    console.log(`Gasto total: R$${gastoTotal.toFixed(2)}`);

    document.getElementById('resultado').innerHTML = `
      <strong>Olá ${nome}!</strong><br>
      Tempo estimado de viagem: ${tempoViagem.toFixed(2)} horas.<br>
      Litros necessários: ${litrosNecessarios.toFixed(2)} litros.<br>
      Gasto total: R$${gastoTotal.toFixed(2)}
    `;
  }