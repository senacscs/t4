document.getElementById('searchInput').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const boxes = document.querySelectorAll('.box');
    
    boxes.forEach(box => {
        const text = box.innerText.toLowerCase();
        if (text.includes(searchTerm)) {
            box.style.display = 'block'; 
        } else {
            box.style.display = 'none'; 
        }
    });
});