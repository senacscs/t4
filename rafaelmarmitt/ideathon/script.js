const image = document.querySelector('.imagem');
image.addEventListener('click', () => {
  let rotation = parseInt(image.style.transform.replace('rotate(', '').replace('deg)', '')) || 0; 
  rotation += 90;
  image.style.transform = `rotate(${rotation}deg)`; 
});