const hamburguer = document.querySelector(".hamburguer");
const nav = document.querySelector(".nav");
hamburguer.addEventListener("click", () => nav.classList.toggle("active"));

const burguer = document.querySelector(".burguer");
const nav1 = document.querySelector(".nav1");
burguer.addEventListener("click", () => nav1.classList.toggle("active"));



// Função para verificar o idioma armazenado no localStorage
function getSavedLanguage() {
    return localStorage.getItem('preferredLang');
}

// Função para definir e salvar o idioma
function setLanguage(lang) {
    localStorage.setItem('preferredLang', lang);
    showLanguage(lang);
}

// Função para mostrar o conteúdo do idioma selecionado
function showLanguage(lang) {
    document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');
    document.getElementById(lang).style.display = 'block';
}

// Detectar o idioma do navegador e redirecionar se não houver preferência salva
function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('pt') ? 'pt' : 'en';
}

// Configuração inicial ao carregar a página
const lang = getSavedLanguage() || detectBrowserLanguage();
setLanguage(lang);