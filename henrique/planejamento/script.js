class AnimateOnScroll {
    constructor({ offset = 10 } = {}) {
        this.offset = offset;
        this.windowTop = (offset * window.innerHeight) / 100;
        this.windowBottom = window.innerHeight - this.windowTop;

        window.addEventListener("scroll", () => this.update(), { passive: true });
        window.addEventListener("load", () => this.update(), false);
    }

    start(element) {
        element.classList.remove('hidden');
        element.classList.add('zoomIn');
        element.dataset.animated = "true";
    }

    inViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= this.windowBottom &&
            rect.bottom >= this.windowTop
        );
    }

    update() {
        const elements = document.querySelectorAll("span.hidden, h2.hidden, p.hidden, .card.hidden");
        elements.forEach(element => {
            if (this.inViewport(element) || element.dataset.animated) {
                this.start(element);
            }
        });
    }
}

const animation = new AnimateOnScroll({ offset: 15 });

var instance = $(".hs__wrapper");
$.each(instance, function(key, value) {
    var arrows = $(instance[key]).find(".arrow"),
        prevArrow = arrows.filter('.arrow-prev'),
        nextArrow = arrows.filter('.arrow-next'),
        box = $(instance[key]).find(".hs"), 
        x = 0,
        mx = 0,
        maxScrollWidth = box[0].scrollWidth - (box[0].clientWidth / 2) - (box.width() / 2);

    $(arrows).on('click', function() {
        if ($(this).hasClass("arrow-next")) {
            box.animate({ scrollLeft: box.scrollLeft() + box.width() / 2 });
        } else {
            box.animate({ scrollLeft: box.scrollLeft() - box.width() / 2 });
        }
        toggleArrows();
    });

    $(box).on({
        mousemove: function(e) {
            var mx2 = e.pageX - this.offsetLeft;
            if(mx) this.scrollLeft = this.sx + mx - mx2;
        },
        mousedown: function(e) {
            this.sx = this.scrollLeft;
            mx = e.pageX - this.offsetLeft;
        },
        scroll: function() {
            toggleArrows();
        }
    });

    $(document).on("mouseup", function() {
        mx = 0;
    });

    function toggleArrows() {
        if(box.scrollLeft() > maxScrollWidth - 10) {
            nextArrow.addClass('disabled');
        } else if(box.scrollLeft() < 10) {
            prevArrow.addClass('disabled');
        } else {
            nextArrow.removeClass('disabled');
            prevArrow.removeClass('disabled');
        }
    }
});