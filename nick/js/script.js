
let nome = prompt("Digite seu nome:");
let distancia = parseInt(prompt("Digite a distância da viagem (em km):"));
let velocidade = parseInt(prompt("Digite a velocidade média (em km/h):"));
let consumo = parseInt(prompt("Digite o consumo do carro (km por litro):"));
let precoGasolina = parseFloat(prompt("Digite o preço da gasolina (por litro):"));

let tempo = distancia / velocidade;
let litrosNecessarios = distancia / consumo;
let gastoTotal = litrosNecessarios * precoGasolina;

console.log(`Olá, ${nome}!`);
console.log(`Tempo estimado da viagem: ${tempo.toFixed(2)} horas`);
console.log(`Litros de gasolina necessários: ${litrosNecessarios.toFixed(2)} litros`);
console.log(`Gasto total estimado: R$ ${gastoTotal.toFixed(2)}`);

alert(
  `Olá, ${nome}!\n` +
  `Tempo estimado da viagem: ${tempo.toFixed(2)} horas\n` +
  `Litros de gasolina necessários: ${litrosNecessarios.toFixed(2)} litros\n` +
  `Gasto total estimado: R$ ${gastoTotal.toFixed(2)}`
);
