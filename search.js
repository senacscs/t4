const searchInput = document.getElementById("searchInput");
const nomes = document.querySelectorAll(".nomes");

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    nomes.forEach(nome => {
        const name = nome.querySelector("p").textContent.toLowerCase();

        if (name.startsWith(searchTerm)) {
            nome.style.display = "inline-block";
        } else {
            nome.style.display = "none";
        }
    });
});