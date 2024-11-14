// Função de Transição de Página
function pageTransition() {
    const tl = gsap.timeline();
    tl.to('ul.transition li', { duration: 0.5, scaleY: 1, transformOrigin: "bottom left", stagger: 0.2 })
      .to('ul.transition li', { duration: 0.5, scaleY: 0, transformOrigin: "bottom left", stagger: 0.1, delay: 0.1 });
}
 
// Função de Animação de Conteúdo
function contentAnimation() {
    gsap.from('#landingPage', { duration: 1.5, translateY: 50, opacity: 0 });
}
 
// Função de Atraso com Promise
function delay(n = 2000) {
    return new Promise(resolve => setTimeout(resolve, n));
}
 
// Configuração do Barba.js para Transições de Página
$(function () {
    barba.init({
        sync: true,
        transitions: [{
            async leave() {
                const done = this.async();
                pageTransition();
                await delay(1000);
                done();
            },
            async enter() {
                contentAnimation();
            },
            async once() {
                contentAnimation();
            }
        }]
    });
});