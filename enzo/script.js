// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.custom-cursor');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
    });

    document.querySelectorAll('.interactive-element').forEach(element => {
        element.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
        });
        element.addEventListener('mouseout', () => {
            cursor.classList.remove('hover');
        });
    });
});
