gsap.utils.toArray(".section").forEach((section, i) => {
    gsap.to(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 70%",
        toggleClass: {
          targets: gsap.utils.toArray("li")[i],
          className: "active"
        }
      }
    });
  });
  