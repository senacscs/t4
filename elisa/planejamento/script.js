const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
    backToTopButton.style.visibility = isBackToTopRendered
        ? "visible"
        : "hidden";
    backToTopButton.style.opacity = isBackToTopRendered
        ? 1
        : 0;
    backToTopButton.style.transform = isBackToTopRendered
        ? "scale(1)"
        : "scale(0)";
};

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        isBackToTopRendered = true;
        alterStyles(isBackToTopRendered);
    } else {
        isBackToTopRendered = false;
        alterStyles(isBackToTopRendered);
    }
});

//search bar
const searchInput = document.getElementById("searchInput");
const projectsShow = document.querySelectorAll(".card");

searchInput.addEventListener("input", function () {
    const searchTerm = searchInput
        .value
        .toLowerCase();

    projectsShow.forEach(projectCard => {
        const name = projectCard
            .querySelector(".card h2")
            .textContent
            .toLowerCase();

        if (name.startsWith(searchTerm)) {
            projectCard.style.display = "block";
        } else {
            projectCard.style.display = "none";
        }
    });
})
    ;