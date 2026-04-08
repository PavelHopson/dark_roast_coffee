<div align="center">

# ☕ Dark Roast Coffee

### Премиальный лендинг кофейни в тёмной стилистике

[![Демо](https://img.shields.io/badge/ДЕМО-dark--roast--coffee.pages.dev-D4956B?style=for-the-badge&logo=cloudflarepages&logoColor=white)](https://dark-roast-coffee.pages.dev/pages/homepage.html)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)

</div>

---

## О проекте

**Dark Roast Coffee** — многостраничный лендинг премиальной кофейни с полностью тёмным дизайном, медными/янтарными акцентами и современными CSS-эффектами.

**[→ Открыть демо](https://dark-roast-coffee.pages.dev/pages/homepage.html)**

---

## Страницы

| Страница | Описание |
|----------|----------|
| [Homepage](https://dark-roast-coffee.pages.dev/pages/homepage.html) | Герой-секция, статистика, карточки кофе, мастерство, галерея, отзывы, CTA |
| [Menu](https://dark-roast-coffee.pages.dev/pages/menu_experience.html) | Интерактивное меню с фильтрами, корзина (localStorage), размеры и методы заваривания |
| [Philosophy](https://dark-roast-coffee.pages.dev/pages/our_philosophy.html) | Манифест, этика поставок, процесс обжарки, команда |
| [Atmosphere](https://dark-roast-coffee.pages.dev/pages/atmosphere_gallery.html) | Фотогалерея по времени суток (утро/день/вечер), элементы дизайна |
| [Reservation](https://dark-roast-coffee.pages.dev/pages/reservation_system.html) | Форма бронирования с валидацией, выбором времени, добавками, модальным подтверждением |
| [Education](https://dark-roast-coffee.pages.dev/pages/coffee_education_center.html) | Гайды по завариванию, истории происхождения, кофейный квиз |

---

## Дизайн-система

### Цветовая палитра
```
Фон:     #0D0D0D → #141414 → #1A1A1A → #222222
Акцент:  #D4956B → #E8B882 (медный/янтарный)
Текст:   #FFFCF9 → #F5E6D3 → #D4C0A8 → #B8A68E (кремовый)
```

### Типографика
- **Playfair Display** — заголовки (serif, элегантный)
- **Source Sans Pro** — основной текст (sans-serif, читаемый)
- **Montserrat** — кнопки и лейблы (CTA)
- **Crimson Text** — цитаты и акцентный текст

### Компоненты
- `card` — тёмные карты с медной подсветкой при hover
- `card-feature` — с градиентной линией сверху
- `card-glass` — glassmorphism с backdrop-blur
- `btn-primary` — градиент + glow + подъём при hover
- `img-zoom` — плавный zoom изображений
- `text-gradient` — переливающийся медный текст
- `bg-mesh` — тёплые gradient mesh фоны
- `section-label` — мелкий uppercase медный текст

### Анимации
- Scroll-triggered fade-in/up с IntersectionObserver
- Staggered delays для каскадного появления карточек
- Fade-left/right для двухколоночных макетов
- Hero gradient overlay на фоновом изображении
- Карточки с translateY + shadow при hover

---

## Интерактивность (JavaScript)

| Функция | Описание |
|---------|----------|
| Модальные окна | Заменяют alert() — подтверждение бронирования, корзина |
| Toast-уведомления | Success/error/info при действиях |
| Lightbox | Клик по фото → полноэкранный просмотр (Esc для закрытия) |
| Фильтры меню | Реальная фильтрация карточек с анимацией |
| Корзина | localStorage persistence + badge счётчик |
| Форма бронирования | Валидация + loading state + success modal |
| Кофейный квиз | Результаты с emoji, уровнями и progress bar |
| Навигация | Scroll-эффект хедера (blur + тёмный фон) |
| Галерея | Табы утро/день/вечер с плавными переходами |

---

## Стек

| Технология | Роль |
|-----------|------|
| HTML5 | Семантическая вёрстка |
| Tailwind CSS 3.4 | Утилитарные стили + кастомная тема |
| Vanilla JS | Интерактивность без зависимостей |
| Pexels | Фотографии (бесплатно, без ограничений) |
| Cloudflare Pages | Хостинг + CDN |

---

## Быстрый старт

```bash
git clone https://github.com/PavelHopson/dark_roast_coffee.git
cd dark_roast_coffee
npm install
npm run build:css
# Открыть pages/homepage.html в браузере
```

Режим разработки:
```bash
npm run dev  # watch mode — автопересборка CSS
```

---

## Структура проекта

```
dark_roast_coffee/
├── css/
│   ├── tailwind.css          # Исходный CSS + кастомные компоненты
│   └── main.css              # Скомпилированный CSS
├── js/
│   └── main.js               # Вся интерактивность
├── pages/
│   ├── homepage.html          # Главная
│   ├── menu_experience.html   # Меню
│   ├── our_philosophy.html    # Философия
│   ├── atmosphere_gallery.html # Галерея
│   ├── reservation_system.html # Бронирование
│   └── coffee_education_center.html # Обучение
├── public/                    # Favicon, manifest
├── index.html                 # Редирект на homepage
├── tailwind.config.js         # Тема: цвета, шрифты, тени
└── package.json
```

---

## Деплой

### Cloudflare Pages
```bash
npx wrangler pages deploy . --project-name=dark-roast-coffee
```

### GitHub Pages
Автоматически из ветки `main`.

---

## Лицензия

[MIT](LICENSE)

---

<div align="center">
<sub>Сделано с ☕ в Eclipse Forge</sub>
</div>
