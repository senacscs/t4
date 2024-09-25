function invertSections() {
    const mainContent = document.getElementById('main-content');
    const sections = Array.from(mainContent.querySelectorAll('section'));
    sections.reverse().forEach(section => mainContent.appendChild(section));
 }
 