
        function escolherOpcao(opcao) {
            switch (opcao) {
                case 1:
                    document.getElementById("resultado").textContent = "Você é lindo(a)!";
                    break;
                case 2:
                    document.getElementById("resultado").textContent = "Você é um monstro!";
                    break;
                case 3:
                    document.getElementById("resultado").textContent = "Tchau!";
                    break;
                default:
                    document.getElementById("resultado").textContent = "Opção inválida!";
            }
        }