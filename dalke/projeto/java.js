function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  // super simple router - go to page specified in hash, otherwise go to "default"
  function router (route) {
    const pageName = route ? route : $('.default.page').attr('data-page-name');
    const $page = $(`[data-page-name="${pageName}"]`);
    $('.page').css('display', 'none');
    $('[data-page]').removeClass('active');
    $(`[data-page="${pageName}"]`).addClass('active');
    $page.css('display', 'block');
  }
  router();
  
  // fake loader
  let progress = 0;
  const fakeLoaderInterval = window.setInterval(function() {
    const $lp = $('.loading-progress');
    progress = progress + getRandomArbitrary(10, 25)
    $lp.css('transform', `translateX(${progress}%)`);
  
    if (progress >= 75) {
      window.clearInterval(fakeLoaderInterval);
      $lp.css('transform', 'translateX(100%)');
      setTimeout(() => $('.loading').css('transform', 'translateY(calc(100% + 10px))'), 400);
    }
  }, getRandomArbitrary(100, 500));
  
  // navigation
  $('.main-nav li a').on('click', e => {
    const $this = $(e.currentTarget);
    const route = $this.attr('data-page');
  
    $('.main-nav li a').removeClass('active');
    $this.addClass('active');
    router(route);
  });

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