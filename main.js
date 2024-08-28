function criarElem(tag, atrib = null) {
    let elem = document.createElement(tag);
    if(atrib != null){
        for (j = 0; j < atrib.length; j++) {
            elem.setAttribute(atrib[j][0], atrib[j][1]);
        }
    }
    return elem;
}


//CRIANDO LISTA DE FILTROS

const filtros = document.getElementById('filters');

for (i = 0; i < projetos.length; i++) {
    const span = criarElem('span', [["class","branco"]]);
    const input = criarElem('input',[["type","radio"],["name","filter-param"],["class","filter"],["value",projetos[i].url]]);

    span.appendChild(document.createTextNode(projetos[i].nome));
    filtros.appendChild(input);
    filtros.appendChild(span);
}

//CRIANDO LISTA DE ALUNOS

alunos.sort(function (a, b) {
    if (a.nome < b.nome) {
        return -1;
    }
    if (a.nome > b.nome) {
        return 1;
    }
    return 0;
})

console.log(alunos)

const lista = document.getElementById('lista');
const erro = document.getElementById('erro');

erro.remove()


for (i = 0; i < alunos.length; i++) {
    const p = criarElem('p');
    const div = criarElem('div', [["class", "nomes"]]);
    const a = criarElem('a', [["href", `./${alunos[i].pasta}/`],["target", "_blank"]]);

    p.appendChild(document.createTextNode(alunos[i].nome));

    div.appendChild(p);
    a.appendChild(div);
    lista.appendChild(a);
}
