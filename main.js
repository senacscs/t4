function criarElem(tag, atrib) {
    let elem = document.createElement(tag);
    if (atrib != [[]]) {
        for (j = 0; j < atrib.length; j++) {
            elem.setAttribute(atrib[j][0], atrib[j][1]);
        }
    }
    return elem;
}

alunos.sort(function(a,b){
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
    const p = criarElem('p', [[]]);
    const div = criarElem('div',[["class","nomes"]]);
    const a = criarElem('a',[["href","./"+alunos[i].pasta],["target","_blank"]]);

    p.appendChild(document.createTextNode(alunos[i].nome));

    div.appendChild(p);
    a.appendChild(div);
    lista.appendChild(a);
}