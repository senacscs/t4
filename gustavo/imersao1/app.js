function pesquisar() {
    const input = document.getElementById('campo-pesquisa').value.toLowerCase();
    const resultados = document.getElementById('resultados-pesquisa');
    resultados.innerHTML = ''; // Limpa os resultados anteriores

    const atletasFiltrados = atletas.filter(atleta => 
        atleta.nome.toLowerCase().includes(input) || atleta.esporte.toLowerCase().includes(input)
    );

    if (atletasFiltrados.length === 0) {
        resultados.innerHTML = '<p>Nenhum atleta encontrado.</p>';
        return;
    }

    atletasFiltrados.forEach(atleta => {
        const atletaElement = document.createElement('div');
        atletaElement.classList.add('atleta');
        
        const nomeElement = document.createElement('h2');
        nomeElement.textContent = atleta.nome;

        const esporteElement = document.createElement('p');
        esporteElement.textContent = `Esporte: ${atleta.esporte}`;

        const titulosElement = document.createElement('ul');
        atleta.titulos.forEach(titulo => {
            const tituloElement = document.createElement('li');
            tituloElement.textContent = titulo;
            titulosElement.appendChild(tituloElement);
        });

        atletaElement.appendChild(nomeElement);
        atletaElement.appendChild(esporteElement);
        atletaElement.appendChild(titulosElement);

        resultados.appendChild(atletaElement);
    });
}
