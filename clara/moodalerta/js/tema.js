// Tema do MoodAlert: claro por padrão, escolha salva no navegador.
(function () {
    var CHAVE = 'moodalert-tema';

    function lerTema() {
        try {
            return localStorage.getItem(CHAVE) === 'dark' ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    }

    function aplicarTema(tema) {
        document.documentElement.setAttribute('data-theme', tema);
        document.querySelectorAll('[data-tema-opcao]').forEach(function (btn) {
            var ativo = btn.getAttribute('data-tema-opcao') === tema;
            btn.classList.toggle('active', ativo);
            btn.setAttribute('aria-pressed', ativo ? 'true' : 'false');
        });
        document.querySelectorAll('[data-tema-toggle]').forEach(function (btn) {
            var icone = btn.querySelector('ion-icon');
            if (icone) icone.setAttribute('name', tema === 'dark' ? 'sunny-outline' : 'moon-outline');
            btn.setAttribute('title', tema === 'dark' ? 'Usar tema claro' : 'Usar tema escuro');
            btn.setAttribute('aria-label', btn.getAttribute('title'));
        });
    }

    function definirTema(tema) {
        try { localStorage.setItem(CHAVE, tema); } catch (e) { /* sem armazenamento */ }
        aplicarTema(tema);
    }

    // Aplica já no <head> para não piscar o tema errado.
    aplicarTema(lerTema());

    document.addEventListener('DOMContentLoaded', function () {
        aplicarTema(lerTema());
        document.addEventListener('click', function (ev) {
            var opcao = ev.target.closest('[data-tema-opcao]');
            if (opcao) {
                definirTema(opcao.getAttribute('data-tema-opcao'));
                return;
            }
            if (ev.target.closest('[data-tema-toggle]')) {
                definirTema(lerTema() === 'dark' ? 'light' : 'dark');
            }
        });
    });

    window.definirTema = definirTema;
})();
