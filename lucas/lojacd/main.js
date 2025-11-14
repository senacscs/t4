document.addEventListener("DOMContentLoaded", () => {
  const searchToggle = document.getElementById("searchToggle");
  const searchInput = document.getElementById("searchInput");

  if (searchToggle && searchInput) {
    searchToggle.addEventListener("click", () => {
      searchInput.classList.toggle("active");
      if (searchInput.classList.contains("active")) {
        searchInput.focus();
      }
    });
  }
});
