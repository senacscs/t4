function capitalizarNome(nome) {
    return nome.trim().split(' ').map(palavra =>
        palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()
    ).join(' ');
}

function iniciarCadastro() {
    let alunos = prompt("Quantos alunos deseja cadastrar?");
    alunos = parseInt(alunos);

    while (isNaN(alunos) || alunos <= 0) {
        alunos = prompt("Valor inválido! Quantos alunos deseja cadastrar?");
        alunos = parseInt(alunos);
    }

    for (let i = 1; i <= alunos; i++) {
        let nome = prompt(`Nome do aluno ${i}:`);
        while (!nome || nome.trim() === "") {
            nome = prompt(`Nome inválido! Nome do aluno ${i}:`);
        }
        nome = capitalizarNome(nome);

        let nota1 = prompt(`Nota 1 do aluno ${i}:`);
        nota1 = parseFloat(nota1);
        while (isNaN(nota1) || nota1 < 0 || nota1 > 10) {
            nota1 = prompt(`Nota inválida! Nota 1 do aluno ${i}:`);
            nota1 = parseFloat(nota1);
        }

        let nota2 = prompt(`Nota 2 do aluno ${i}:`);
        nota2 = parseFloat(nota2);
        while (isNaN(nota2) || nota2 < 0 || nota2 > 10) {
            nota2 = prompt(`Nota inválida! Nota 2 do aluno ${i}:`);
            nota2 = parseFloat(nota2);
        }

        let media = calcularMedia(nota1, nota2);
        let situacao = media >= 6 ? "Aprovado" : "Reprovado";

        document.getElementById("resultado").innerHTML += `
                    <div class="aluno">
                        <h3>${nome}</h3>
                        <p>Média: ${media.toFixed(1)}</p>
                        <p>Situação:<strong> ${situacao}</strong></p>
                    </div>
                `;
    }
}

function calcularMedia(n1, n2) {
    return (n1 + n2) / 2;
}