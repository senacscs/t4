function verJanela(a) {
    const janela = document.querySelector('.janela');
    const janelaImg = janela.querySelector('.janelaimg img:first-child');
    const descricao = janela.querySelector('.lateral p');

    const index = a.getAttribute('data-index');
    descricao.textContent = des[index]?.descricao || "Descrição não disponível";

    janelaImg.src = a.src;
    janela.style.width = '70%';
    janela.style.height = '80%';
    janela.style.borderWidth = '1px';
    janela.style.transition = 'all 0.3s ease';
}

function fecharJanela() {
    const janela = document.querySelector('.janela');
    janela.style.width = '0%';
    janela.style.height = '0%';
    janela.style.borderWidth = '0px';
}

function curtir(a) {
    let curtida = a;
    curtida.classList.toggle('curtido');
    const atual = curtida.getAttribute('name');
    curtida.setAttribute('name', atual === 'heart-outline' ? 'heart' : 'heart-outline');
}

const des = [
    { nome: "Imagem 1", descricao: "Descrição da imagem 1" },
    { nome: "Imagem 2", descricao: "Descrição da imagem 2" },
    { nome: "Imagem 3", descricao: "Descrição da imagem 3" },
    { nome: "Imagem 4", descricao: "Descrição da imagem 4" },
    { nome: "Imagem 5", descricao: "Descrição da imagem 5" },
    { nome: "Imagem 6", descricao: "Descrição da imagem 6" },
    { nome: "Imagem 7", descricao: "Descrição da imagem 7" },
    { nome: "Imagem 8", descricao: "Descrição da imagem 8" },
    { nome: "Imagem 9", descricao: "SLA" },
    { nome: "Imagem 10", descricao: "Descrição da imagem 10" },
    { nome: "Imagem 11", descricao: "Descrição da imagem 11" },
    { nome: "Imagem 12", descricao: "Descrição da imagem 12" },
    { nome: "Imagem 13", descricao: "Descrição da imagem 13" },
    { nome: "Imagem 14", descricao: "Descrição da imagem 14" },
    { nome: "Imagem 15", descricao: "Descrição da imagem 15" },
    { nome: "Imagem 16", descricao: "Descrição da imagem 16" },
    { nome: "Imagem 17", descricao: "Descrição da imagem 17" },
    { nome: "Imagem 18", descricao: "Descrição da imagem 18" },
    { nome: "Imagem 19", descricao: "Descrição da imagem 19" },
    { nome: "Imagem 20", descricao: "Descrição da imagem 20" },
    { nome: "Imagem 21", descricao: "Descrição da imagem 21" },
    { nome: "Imagem 22", descricao: "Descrição da imagem 22" },
    { nome: "Imagem 23", descricao: "Descrição da imagem 23" },
    { nome: "Imagem 24", descricao: "Descrição da imagem 24" },
    { nome: "Imagem 25", descricao: "Descrição da imagem 25" },
    { nome: "Imagem 26", descricao: "Descrição da imagem 26" },
    { nome: "Imagem 27", descricao: "Descrição da imagem 27" },
    { nome: "Imagem 28", descricao: "Descrição da imagem 28" },
    { nome: "Imagem 29", descricao: "Descrição da imagem 29" },
    { nome: "Imagem 30", descricao: "Descrição da imagem 30" },
    { nome: "Imagem 31", descricao: "Descrição da imagem 31" },
    { nome: "Imagem 32", descricao: "Descrição da imagem 32" },
    { nome: "Imagem 33", descricao: "Descrição da imagem 33" },
    { nome: "Imagem 34", descricao: "Descrição da imagem 34" },
    { nome: "Imagem 35", descricao: "Descrição da imagem 35" }
];

let i = 3726
function seguir(a) {
    let seguidores = document.getElementById("seg")

    if(i > 3726) {
        seguidores.innerText = i--
        a.innerText = "Seguindo"
    }
    else {
        seguidores.innerText = i++
        a.innerText = "Seguir"
    }

}