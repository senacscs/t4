const canvas = document.getElementById("generativeCanvas");
const ctx = canvas.getContext("2d");

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

let scrollProgress = 0;
let lines = [];

class Line {
    constructor(y) {
        this.y = y;
        this.originalY = y;
        this.color = `hsl(${0}, 100%, 50%)`; // Vermelho
        this.points = [];
        this.numberOfPoints = Math.floor(width / 10);

        for (let i = 0; i < this.numberOfPoints; i++) {
            this.points.push({
                x: i * (width / (this.numberOfPoints - 1)),
                y: 0
            });
        }
    }


update(scroll) {
    this.y = this.originalY - scroll * 0.35; // Compromisso entre 0.5 e 0.2

    if (this.y < -100) {
        this.y = height + 100;
        this.originalY = this.y;
    }

    for (let i = 0; i < this.numberOfPoints; i++) {
        this.points[i].y =
            Math.sin((i + scroll * 0.1) * 0.2) * 20 +
            Math.sin((i + scroll * 0.05) * 0.1) * 40;
    }
}

	draw() {
		ctx.beginPath();
		ctx.moveTo(this.points[0].x, this.y + this.points[0].y);

		for (let i = 1; i < this.numberOfPoints; i++) {
			const prevPoint = this.points[i - 1];
			const currentPoint = this.points[i];

			const controlX = (prevPoint.x + currentPoint.x) / 2;
			const controlY = this.y + (prevPoint.y + currentPoint.y) / 2;

			ctx.quadraticCurveTo(
				controlX,
				controlY,
				currentPoint.x,
				this.y + currentPoint.y
			);
		}

		ctx.strokeStyle = this.color;
		ctx.lineWidth = 2;
		ctx.stroke();
	}
}

function initLines() {
	lines = [];
	for (let i = 0; i < 20; i++) {
		lines.push(new Line(i * 50));
	}
}

function animate() {
    ctx.fillStyle = "rgba(255, 182, 193, 0.5)"; // Rosa claro com transparência
    ctx.fillRect(0, 0, width, height);

    for (let line of lines) {
        line.update(scrollProgress);
        line.draw();
    }

    // Verifica se o usuário atingiu o final da página
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        return; // Interrompe a animação
    }

    requestAnimationFrame(animate);
}
function handleScroll() {
	scrollProgress = window.pageYOffset;
}

function handleResize() {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	initLines();
}

window.addEventListener("scroll", handleScroll);
window.addEventListener("resize", handleResize);

initLines();
animate();
