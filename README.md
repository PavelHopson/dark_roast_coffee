<p align="center">
  <img src="./dark-roast-banner.svg" width="100%" alt="Dark Roast Coffee">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/Tailwind_CSS_3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Responsive-4CAF50?style=for-the-badge&logo=google-chrome&logoColor=white" alt="Responsive">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="MIT License">
</p>

# Dark Roast Coffee

Премиальный многостраничный сайт кофейни в темной стилистике. Разработан на чистом HTML5 + Tailwind CSS с акцентом на атмосферу, минимализм и адаптивный дизайн. Готов к продакшену.

---

## Pages

| Страница | Файл | Описание |
|----------|------|----------|
| Homepage | `pages/homepage.html` | Главная страница с hero-секцией, навигацией и ключевыми блоками |
| Menu Experience | `pages/menu_experience.html` | Интерактивное меню с категориями напитков и десертов |
| Our Philosophy | `pages/our_philosophy.html` | Философия бренда, история и ценности кофейни |
| Atmosphere Gallery | `pages/atmosphere_gallery.html` | Галерея атмосферы заведения с фотографиями интерьера |
| Reservation System | `pages/reservation_system.html` | Система бронирования столиков с формой и выбором времени |
| Coffee Education | `pages/coffee_education_center.html` | Образовательный раздел: мастер-классы, способы заваривания |

---

## Tech Stack

- **HTML5** -- семантическая верстка, доступность
- **Tailwind CSS 3.4** -- утилитарный CSS-фреймворк с кастомной конфигурацией
- **Кастомная палитра** -- тёмные тона, кофейные акценты, золотые детали
- **Шрифты** -- Playfair Display, Source Sans Pro, Crimson Text, Montserrat
- **Адаптивный дизайн** -- от мобильных устройств до 4K-мониторов

---

## Quick Start

```bash
# Установить зависимости
npm install

# Собрать CSS
npm run build:css

# Открыть сайт
open index.html
```

Для режима разработки с автопересборкой:

```bash
npm run dev
```

---

## Project Structure

```
dark_roast_coffee/
├── css/
│   ├── tailwind.css          # Исходный Tailwind + кастомные утилиты
│   └── main.css              # Скомпилированный CSS
├── pages/                    # HTML-страницы сайта
│   ├── homepage.html
│   ├── menu_experience.html
│   ├── our_philosophy.html
│   ├── atmosphere_gallery.html
│   ├── reservation_system.html
│   └── coffee_education_center.html
├── public/                   # Статические ресурсы
├── index.html                # Точка входа (редирект на homepage)
├── tailwind.config.js        # Конфигурация Tailwind CSS
└── package.json              # Зависимости и скрипты
```

---

## Screenshots

Главная страница

<img width="928" height="556" alt="Homepage" src="https://github.com/user-attachments/assets/bf5ff7af-1ef8-4942-aa59-a8d0570c0f46" />

Меню

<img width="929" height="854" alt="Menu" src="https://github.com/user-attachments/assets/e2bb146b-cf57-4b1a-b04a-d6ce25757dfb" />
<img width="783" height="921" alt="Menu cards" src="https://github.com/user-attachments/assets/a5953899-ef9c-41c2-9416-912ccd252dc5" />
<img width="781" height="891" alt="Menu details" src="https://github.com/user-attachments/assets/22f353c1-b020-43a7-88dc-1c8d797f19bb" />

Философия

<img width="952" height="855" alt="Philosophy" src="https://github.com/user-attachments/assets/ecb878f0-4e0f-416e-9555-ced7abe74307" />
<img width="911" height="510" alt="Philosophy section" src="https://github.com/user-attachments/assets/9f41ac39-2aba-4dca-9dad-8056f67c9e7a" />
<img width="814" height="823" alt="Philosophy details" src="https://github.com/user-attachments/assets/277074c0-86f7-4f04-b317-f96f00c4a618" />
<img width="781" height="923" alt="Philosophy values" src="https://github.com/user-attachments/assets/e0bea6e5-6308-4f23-8aa1-c8e1d67c58a4" />

Атмосфера

<img width="1155" height="885" alt="Atmosphere gallery" src="https://github.com/user-attachments/assets/fb8275e5-f062-44cd-937c-dc9c6d8f9b5c" />
<img width="405" height="709" alt="Atmosphere mobile" src="https://github.com/user-attachments/assets/f481670a-745e-4073-ba00-b2a43d3fafa6" />

Бронирование

<img width="583" height="910" alt="Reservation form" src="https://github.com/user-attachments/assets/197439f3-97e1-42d9-aa71-00ae3043c33c" />
<img width="607" height="631" alt="Reservation confirmation" src="https://github.com/user-attachments/assets/007f3cd8-668e-4d9e-8a35-fb01b8b5cf53" />

---

## License

[MIT](./LICENSE) -- 2025 PavelHopson
