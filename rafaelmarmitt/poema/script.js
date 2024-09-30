var stairs = document.getElementById('stairs');

function onWinScroll() {
  var scrollVal = window.pageYOffset || document.body.scrollTop;
	stairs.style.perspectiveOrigin = '10% ' + (scrollVal/3000)*100 + '%';
}

window.addEventListener('scroll', onWinScroll);

const intro = document.querySelector('.intro');