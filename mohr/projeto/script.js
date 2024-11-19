function getSavedLanguage() {
    return localStorage.getItem('preferredLang');
}

function setLanguage(lang) {
    localStorage.setItem('preferredLang', lang);
    showLanguage(lang);
}

function showLanguage(lang) {
    document.querySelectorAll('.lang').forEach(el => el.style.display = 'none');
    document.getElementById(lang).style.display = 'block';
}

function detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('pt') ? 'pt' : 'en';
}

const lang = getSavedLanguage() || detectBrowserLanguage();
setLanguage(lang);

function toggle(element) {
    element.classList.toggle("change");
  }
  