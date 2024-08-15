function updateScroller() {
    const scrollY = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
  
    const top = Math.round((scrollY / (documentHeight - viewportHeight)) * 100);
    const bottom = Math.round(
      ((scrollY + viewportHeight - documentHeight) /
        (documentHeight - viewportHeight)) *
        100
    );
  
    document.querySelector(".one").textContent = `${top}%`;
    document.querySelector(".two").textContent = `${bottom}%`;
  
    if (viewportHeight + window.pageYOffset > 1.2 * viewportHeight) {
      document.querySelector(".scroll").style.opacity = "1";
    } else {
      document.querySelector(".scroll").style.opacity = "0";
    }
  }
  
  window.addEventListener("scroll", updateScroller);
  window.addEventListener("resize", updateScroller);
  updateScroller();
  