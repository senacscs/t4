const searchInput = document.getElementById("filtro");
const bloco = document.querySelectorAll(".bloco");

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    bloco.forEach(nome => {
        const name = nome.querySelector("h3").textContent.toLowerCase();

        if (name.startsWith(searchTerm)) {
            nome.style.display = "flex";
        } else {
            nome.style.display = "none";
        }
    });
});