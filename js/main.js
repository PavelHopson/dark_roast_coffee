// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Header scroll effect — add background on scroll
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('bg-charcoal-900', 'shadow-lg');
        header.classList.remove('bg-transparent');
      } else {
        header.classList.remove('bg-charcoal-900', 'shadow-lg');
        header.classList.add('bg-transparent');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Time-of-day gallery tabs
  document.querySelectorAll('[data-time-tab]').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.timeTab;
      document.querySelectorAll('[data-time-tab]').forEach(t => t.classList.remove('active', 'bg-gold-500', 'text-charcoal-900'));
      tab.classList.add('active', 'bg-gold-500', 'text-charcoal-900');
      document.querySelectorAll('[data-time-content]').forEach(c => c.classList.add('hidden'));
      const content = document.querySelector(`[data-time-content="${target}"]`);
      if (content) content.classList.remove('hidden');
    });
  });

  // Menu filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active', 'bg-gold-500'));
      btn.classList.add('active', 'bg-gold-500');
    });
  });

  // Cart count
  let cartCount = 0;
  const cartCountEl = document.getElementById('cart-count');
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      cartCount++;
      if (cartCountEl) cartCountEl.textContent = cartCount;
      btn.textContent = 'Добавлено ✓';
      btn.classList.add('bg-green-600');
      setTimeout(() => {
        btn.textContent = 'В корзину';
        btn.classList.remove('bg-green-600');
      }, 1500);
    });
  });

  // Size option buttons
  document.querySelectorAll('.size-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.size-options') || btn.parentElement;
      if (parent) parent.querySelectorAll('.size-option').forEach(b => b.classList.remove('bg-gold-500', 'text-charcoal-900'));
      btn.classList.add('bg-gold-500', 'text-charcoal-900');
    });
  });

  // Brewing method buttons
  document.querySelectorAll('.brewing-method').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.brewing-methods') || btn.parentElement;
      if (parent) parent.querySelectorAll('.brewing-method').forEach(b => b.classList.remove('bg-gold-500', 'text-charcoal-900'));
      btn.classList.add('bg-gold-500', 'text-charcoal-900');
    });
  });

  // Reservation form — set today's date as min/value
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Reservation form submit
  const reservationForm = document.querySelector('form');
  if (reservationForm && window.location.pathname.includes('reservation')) {
    reservationForm.addEventListener('submit', e => {
      e.preventDefault();
      alert('Бронирование отправлено! Мы свяжемся с вами для подтверждения.');
    });
  }

  // Simple lightbox for gallery images
  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.addEventListener('click', () => {
      const src = img.src || img.querySelector('img')?.src;
      if (!src) return;
      const overlay = document.createElement('div');
      overlay.className = 'fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-pointer';
      overlay.innerHTML = `<img src="${src}" class="max-w-full max-h-[90vh] object-contain rounded-lg" />`;
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  });

  // Scroll animations (Intersection Observer)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

  // Hotspot tooltips
  window.showHotspot = (id) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('hidden');
  };

  // Quiz functionality
  let quizScore = 0;
  let quizStep = 0;
  document.querySelectorAll('.quiz-answer').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.correct === 'true') quizScore++;
      quizStep++;
      const questions = document.querySelectorAll('.quiz-question');
      questions.forEach(q => q.classList.add('hidden'));
      if (quizStep < questions.length) {
        questions[quizStep].classList.remove('hidden');
      } else {
        const result = document.getElementById('quiz-result');
        if (result) {
          result.classList.remove('hidden');
          result.innerHTML = `<p class="text-2xl font-bold text-gold-500">Ваш результат: ${quizScore}/${questions.length}</p>`;
        }
      }
    });
  });
});
