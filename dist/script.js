document.documentElement.classList.remove("no-js");

const motion = document.querySelector("[data-lottie-src]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (motion && !prefersReducedMotion.matches) {
  const source = motion.dataset.lottieSrc;

  fetch(source)
    .then((response) => {
      if (!response.ok) throw new Error("Motion placeholder could not be loaded.");
      return response.json();
    })
    .then((animation) => {
      const image = motion.querySelector(".hero__motion-image");
      const duration = ((animation.op - animation.ip) / animation.fr) * 1000;

      image.animate(
        [
          { transform: "translate3d(-1.4%, 0.8%, 0) scale(0.94) rotate(-1deg)", opacity: 0.72 },
          { transform: "translate3d(1.2%, -0.6%, 0) scale(1.02) rotate(0.7deg)", opacity: 1 },
          { transform: "translate3d(-1.4%, 0.8%, 0) scale(0.94) rotate(-1deg)", opacity: 0.72 },
        ],
        {
          duration,
          iterations: Infinity,
          easing: "ease-in-out",
        },
      );

      motion.classList.add("is-animated");
    })
    .catch(() => {
      // Static PNG already acts as the accessible fallback.
    });
}

const cta = document.querySelector(".cta");

cta?.addEventListener("click", () => {
  window.dispatchEvent(
    new CustomEvent("kompas:membership-cta", {
      detail: { campaign: "31-tahun-kompas", placement: "anniversary-sale" },
    }),
  );
});
