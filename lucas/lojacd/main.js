<script>
  const searchBtn = document.getElementById('searchToggle'); // ID CORRETO
  const searchInput = document.getElementById('searchInput');
  const albums = document.querySelectorAll('.album');

  // Abrir/fechar o campo de busca
  searchBtn.addEventListener('click', () => {
    searchInput.classList.toggle('active');
    searchInput.focus();
  });

  // Filtrar álbuns pela busca
  searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();

    albums.forEach(album => {
      const title = album.getAttribute('data-title').toLowerCase();
      if (title.includes(term)) {
        album.style.display = "block";
      } else {
        album.style.display = "none";
      }
    });
  });

  // PEGAR TODOS OS BOTÕES DE ADICIONAR
const addButtons = document.querySelectorAll('.btn-add');

addButtons.forEach(button => {
  button.addEventListener('click', () => {
    
    const title = button.getAttribute('data-title'); // nome do CD
    
    // pegar carrinho já existente
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // adicionar o novo item
    cart.push({
      title: title,
      price: "59,90" // opcional — se quiser, podemos puxar automático depois
    });

    // salvar de volta
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`✔ ${title} foi adicionado ao carrinho!`);
  });
});

</script>
