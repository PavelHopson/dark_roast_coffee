(() => {
  const all = (selector) => Array.from(document.querySelectorAll(selector));
  const countWord = (n, forms) => {
    const lastTwo = n % 100;
    const last = n % 10;
    return lastTwo >= 11 && lastTwo <= 14
      ? forms[2]
      : last === 1
        ? forms[0]
        : last >= 2 && last <= 4
          ? forms[1]
          : forms[2];
  };
  const setupFilters = (
    buttonSelector,
    itemSelector,
    buttonKey,
    itemKey,
    countSelector,
    forms,
  ) => {
    const buttons = all(buttonSelector);
    const items = all(itemSelector);
    const counter = document.querySelector(countSelector);
    if (!buttons.length || !counter) return;
    buttons.forEach((button) =>
      button.addEventListener("click", () => {
        const selected = button.dataset[buttonKey];
        buttons.forEach((item) =>
          item.setAttribute("aria-pressed", String(item === button)),
        );
        let visible = 0;
        items.forEach((item) => {
          item.hidden =
            selected !== "all" && item.dataset[itemKey] !== selected;
          if (!item.hidden) visible++;
        });
        counter.textContent = `${visible} ${countWord(visible, forms)}`;
      }),
    );
  };
  setupFilters(
    "[data-roast-filter]",
    "[data-product]",
    "roastFilter",
    "roast",
    "[data-filter-count]",
    ["сорт", "сорта", "сортов"],
  );
  setupFilters(
    "[data-gallery-filter]",
    "[data-gallery-kind]",
    "galleryFilter",
    "galleryKind",
    "[data-gallery-count]",
    ["изображение", "изображения", "изображений"],
  );

  const items = all("[data-product]");
  const list = document.querySelector("[data-cart-items]");
  if (items.length && list) {
    const products = new Map(
      items.map((item) => [
        item.dataset.product,
        { name: item.dataset.name, price: Number(item.dataset.price) },
      ]),
    );
    const storageKey = "dark-roast-demo-cart-v1";
    let cart = Object.create(null);
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
      for (const [id, quantity] of Object.entries(saved)) {
        if (
          products.has(id) &&
          Number.isInteger(quantity) &&
          quantity > 0 &&
          quantity <= 99
        )
          cart[id] = quantity;
      }
    } catch {
      /* Browsing without storage remains usable for this session. */
    }
    const feedback = document.querySelector("[data-cart-feedback]");
    const save = () => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(cart));
      } catch {
        feedback.textContent =
          "Браузер не сохранил корзину: она доступна только до закрытия страницы.";
      }
    };
    const render = () => {
      let quantity = 0;
      let total = 0;
      list.replaceChildren();
      for (const [id, count] of Object.entries(cart)) {
        const product = products.get(id);
        if (!product) continue;
        quantity += count;
        total += product.price * count;
        const row = document.createElement("li");
        const text = document.createElement("span");
        text.textContent = `${product.name} × ${count} — ${(product.price * count).toLocaleString("ru-RU")} ₽`;
        const remove = document.createElement("button");
        remove.type = "button";
        remove.textContent = "Удалить";
        remove.setAttribute("aria-label", `Удалить ${product.name}`);
        remove.addEventListener("click", () => {
          delete cart[id];
          save();
          render();
        });
        row.append(text, remove);
        list.append(row);
      }
      document.querySelector("[data-cart-empty]").hidden = quantity > 0;
      document.querySelector("[data-cart-total]").textContent =
        `${total.toLocaleString("ru-RU")} ₽`;
      all("[data-cart-count]").forEach((node) => {
        node.textContent = String(quantity);
      });
    };
    all("[data-add]").forEach((button) =>
      button.addEventListener("click", () => {
        const id = button.dataset.add;
        if (!products.has(id)) return;
        cart[id] = Math.min((cart[id] || 0) + 1, 99);
        feedback.textContent = `${products.get(id).name} добавлен в демо-корзину.`;
        save();
        render();
      }),
    );
    document
      .querySelector("[data-cart-clear]")
      .addEventListener("click", () => {
        cart = Object.create(null);
        feedback.textContent = "Корзина очищена.";
        save();
        render();
      });
    render();
  }

  const quiz = document.querySelector("[data-quiz]");
  if (quiz)
    quiz.addEventListener("submit", (event) => {
      event.preventDefault();
      const answers = new FormData(quiz);
      const score = [
        ["q1", "pressure"],
        ["q2", "milk"],
        ["q3", "particles"],
      ].filter(([key, value]) => answers.get(key) === value).length;
      document.querySelector("[data-quiz-result]").textContent =
        `Правильных ответов: ${score} из 3.`;
    });

  const reservation = document.querySelector("[data-reservation]");
  if (reservation) {
    const now = new Date();
    const localDate = [
      now.getFullYear(),
      String(now.getMonth() + 1).padStart(2, "0"),
      String(now.getDate()).padStart(2, "0"),
    ].join("-");
    reservation.elements.date.min = localDate;
    reservation.addEventListener("submit", (event) => {
      event.preventDefault();
      document.querySelector("[data-reservation-result]").textContent =
        "Форма проверена. Данные не отправлены; столик не забронирован.";
    });
    document.querySelector("[data-reservation-submit]").disabled = false;
  }
})();
