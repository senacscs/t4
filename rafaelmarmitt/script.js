let curs = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
 let x = e.pageX;
 let y = e.pageY;
 curs.style.left = x - 15 + "px";
 curs.style.top = y - 15 + "px";
}); 