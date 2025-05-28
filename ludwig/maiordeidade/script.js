function verificarAcesso() {
    const nome = document.getElementById("nome").value.trim();
    const idade = parseInt(document.getElementById("idade").value);
    const possuiCadastro = document.getElementById("possuiCadastro").checked;
    const mensagem = document.getElementById("mensagem");

    if (nome === "" || isNaN(idade)) {
        mensagem.innerText = "Por favor, preencha todos os campos corretamente.";
        return;
    }

    if (idade < 12) {
        mensagem.innerText = `Acesso negado para ${nome}: idade insuficiente para cadastro.`;
    } else if (idade >= 12 && idade <= 17 && possuiCadastro === true) {
        mensagem.innerText = `Acesso permitido com restrições para menores. Bem-vindo, ${nome}.`;
    } else if (idade >= 18 || possuiCadastro === true) {
        mensagem.innerText = `Acesso completo permitido. Bem-vindo, ${nome}.`;
    } else {
        mensagem.innerText = `Usuário ${nome} precisa se cadastrar primeiro.`;
    }
}
