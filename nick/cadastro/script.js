let idade = 18; 
let nome;
let possuicadastro = true;

nome = prompt ("Qual seu nome?");
idade = parseInt (prompt("Digite sua idade"));
if (idade < 12) {
    alert("Acesso negado. Idade insuficiente para cadastro.");
} else if (idade >= 12 && idade <= 17 && possuicadastro === true) {
    alert("Acesso permitido com restrições para menores");
} else if (idade >= 18 || possuicadastro === true) {
    alert("Acesso completo permitido");
} else {
    alert("Usuário precisa se cadastrar primeiro.");
}