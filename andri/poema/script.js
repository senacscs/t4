document.addEventListener('DOMContentLoaded', () => {
    const starContainer = document.querySelector('.stars');

    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 10 + 10;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
    
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        
    
        star.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;
        
    
        star.style.animation = `twinkling ${Math.random() * 1 + 0.5}s infinite alternate, moveStar ${Math.random() * 5 + 5}s infinite linear`;
        
        starContainer.appendChild(star);
    }
});
