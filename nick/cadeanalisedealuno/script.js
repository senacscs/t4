function iniciarCadastro() {
    document.getElementById("resultado").innerHTML = "";
    
    let quantidade = prompt("Quantos alunos deseja cadastrar?");

    while (isNaN(quantidade) || quantidade <= 0) {
        quantidade = prompt("Por favor, digite um número válido maior que zero.\nQuantos alunos deseja cadastrar?");
    }
    quantidade = parseInt(quantidade);
    
    for (let i = 1; i <= quantidade; i++) {
        let nome, nota1, nota2;

        nome = prompt(`Digite o  nome do aluno ${i}:`);
        while (!nome || nome.trim() === "") {
            nome = prompt(`Nome inválido. Por favor, digite o nome do aluno ${i}:`);
        }
        
        nota1 = prompt(`Digite a primeira nota de ${nome}:`);
        while (isNaN(nota1) || nota1 === "" || nota1 < 0 || nota1 > 10) {
            nota1 = prompt(`Nota inválida. Por favor, digite a primeira nota de ${nome} (0-10):`);
        }
        nota1 = parseFloat(nota1);
        
        nota2 = prompt(`Digite a segunda nota de ${nome}:`);
        while (isNaN(nota2) || nota2 === "" || nota2 < 0 || nota2 > 10) {
            nota2 = prompt(`Nota inválida. Por favor, digite a segunda nota de ${nome} (0-10):`);
        }
        nota2 = parseFloat(nota2);
        
        const media = calcularMedia(nota1, nota2);
        const situacao = media >= 6 ? "Aprovado" : "Reprovado";
        
        const resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML += `
            <div class="aluno">
                <p><strong>Aluno:</strong> ${nome}</p>
                <p><strong>Nota 1:</strong> ${nota1.toFixed(1)}</p>
                <p><strong>Nota 2:</strong> ${nota2.toFixed(1)}</p>
                <p><strong>Média:</strong> ${media.toFixed(1)}</p>
                <p class="${situacao.toLowerCase()}"><strong>Situação:</strong> ${situacao}</p>
            </div>
        `;
    }
}

function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}