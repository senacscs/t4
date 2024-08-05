const boxes = document.querySelectorAll(".box-wrapper");

function activateTab(box) {
	boxes.forEach((t) => t.classList.remove("active"));
	box.classList.add("active");
}

boxes.forEach((box) => {
	box.addEventListener("mouseover", () => {
		activateTab(box);
	});

	box.addEventListener("click", () => {
		activateTab(box);
	});
});
