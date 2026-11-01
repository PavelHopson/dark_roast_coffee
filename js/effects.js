// Пар над чашкой, зерно вместо курсора и появление блоков. Без анимации при prefers-reduced-motion.
(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("no-motion");
    return;
  }

  const random = (min, max) => min + Math.random() * (max - min);

  const fit = (canvas) => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.getContext("2d").setTransform(ratio, 0, 0, ratio, 0, 0);
    return { width, height };
  };

  const drawWisp = (ctx, w) => {
    const glow = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, w.size);
    glow.addColorStop(0, `rgba(240, 225, 205, ${w.alpha})`);
    glow.addColorStop(1, "rgba(240, 225, 205, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(w.x, w.y, w.size, 0, Math.PI * 2);
    ctx.fill();
  };

  function startHeroSteam(hero) {
    const canvas = document.createElement("canvas");
    canvas.className = "steam-canvas";
    canvas.setAttribute("aria-hidden", "true");
    hero.querySelector(".hero-shade").after(canvas);
    const ctx = canvas.getContext("2d");
    let size = fit(canvas);
    window.addEventListener("resize", () => { size = fit(canvas); });

    const spawn = (w = {}) => {
      // Над чашкой на фото: при обрезке кадра точка смещается вместе с ним
      const wide = size.width > 700;
      const originX = size.width * (wide ? 0.72 : 0.68);
      const originY = size.height * (wide ? 0.47 : 0.52);
      return Object.assign(w, {
        x: originX + random(-size.width * 0.05, size.width * 0.05),
        y: originY,
        size: random(14, 26),
        speed: random(0.28, 0.6),
        phase: random(0, Math.PI * 2),
        life: 0,
        maxLife: random(190, 320),
        alpha: 0,
      });
    };
    const wisps = Array.from({ length: 34 }, () => {
      const w = spawn();
      w.life = random(0, w.maxLife);
      return w;
    });

    let visible = true;
    new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(hero);

    const tick = () => {
      if (visible && !document.hidden) {
        ctx.clearRect(0, 0, size.width, size.height);
        wisps.forEach((w) => {
          w.life += 1;
          w.phase += 0.016;
          w.y -= w.speed;
          w.x += Math.sin(w.phase) * 0.42;
          w.size += 0.1;
          const t = w.life / w.maxLife;
          w.alpha = Math.sin(Math.min(t, 1) * Math.PI) * 0.1;
          if (t >= 1) spawn(w);
          else drawWisp(ctx, w);
        });
      }
      requestAnimationFrame(tick);
    };
    tick();
  }

  function startCursor() {
    document.documentElement.classList.add("bean-cursor");
    const canvas = document.createElement("canvas");
    canvas.className = "cursor-steam";
    canvas.setAttribute("aria-hidden", "true");
    const bean = document.createElement("div");
    bean.className = "cursor-bean";
    bean.setAttribute("aria-hidden", "true");
    bean.innerHTML = `<svg viewBox="0 0 40 40" width="100%" height="100%"><g transform="rotate(35 20 20)"><ellipse cx="20" cy="20" rx="12" ry="17" fill="#4a2a18" stroke="#e6b997" stroke-width="1.6"/><path d="M20 3.5C14 12 26 27 20 36.5" fill="none" stroke="#e6b997" stroke-width="2" stroke-linecap="round"/></g></svg>`;
    document.body.append(canvas, bean);
    const ctx = canvas.getContext("2d");
    let size = fit(canvas);
    window.addEventListener("resize", () => { size = fit(canvas); });

    const wisps = [];
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let rotation = 0;
    let seen = false;
    let travelled = 0;

    window.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      target.x = event.clientX;
      target.y = event.clientY;
      if (!seen) {
        pos.x = target.x;
        pos.y = target.y;
        seen = true;
      }
      bean.classList.add("is-on");
      bean.classList.toggle("is-link", !!event.target.closest?.("a, button, input, select, textarea, label"));
    }, { passive: true });
    document.documentElement.addEventListener("pointerleave", () => bean.classList.remove("is-on"));
    window.addEventListener("pointerdown", () => bean.classList.add("is-press"), { passive: true });
    window.addEventListener("pointerup", () => bean.classList.remove("is-press"), { passive: true });

    const tick = () => {
      const dx = (target.x - pos.x) * 0.32;
      const dy = (target.y - pos.y) * 0.32;
      const moved = Math.hypot(dx, dy);
      pos.x += dx;
      pos.y += dy;
      rotation += dx * 0.9;
      travelled += moved;
      if (seen && travelled > 16) {
        travelled = 0;
        if (wisps.length > 50) wisps.shift();
        wisps.push({ x: pos.x, y: pos.y, size: random(6, 11), phase: random(0, 6), life: 1, alpha: 0 });
      }
      bean.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      bean.firstElementChild.style.rotate = `${rotation}deg`;

      ctx.clearRect(0, 0, size.width, size.height);
      for (let i = wisps.length - 1; i >= 0; i -= 1) {
        const w = wisps[i];
        w.life -= 0.016;
        if (w.life <= 0) {
          wisps.splice(i, 1);
          continue;
        }
        w.phase += 0.05;
        w.y -= 0.55;
        w.x += Math.sin(w.phase) * 0.4;
        w.size += 0.14;
        w.alpha = w.life * 0.2;
        drawWisp(ctx, w);
      }
      requestAnimationFrame(tick);
    };
    tick();
  }

  function startReveal() {
    const nodes = document.querySelectorAll(".intro-heading, .intro-copy, .menu-intro, .drink-card, .moments figure, .closing-inner > *, .paper-section > *, .gallery-item, [data-product]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    nodes.forEach((node) => {
      node.classList.add("reveal");
      observer.observe(node);
    });
  }

  const hero = document.querySelector(".hero");
  if (hero) startHeroSteam(hero);
  startReveal();
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) startCursor();
})();
