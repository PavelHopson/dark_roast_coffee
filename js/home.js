(() => {
  const button = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!button || !menu) return;
  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
    button.querySelector("span").textContent = open ? "−" : "＋";
  };
  button.addEventListener("click", () => setOpen(menu.hidden));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !menu.hidden) {
      setOpen(false);
      button.focus();
    }
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 700 && !menu.hidden) setOpen(false);
    },
    { passive: true },
  );
})();
