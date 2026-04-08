/**
 * Dark Roast Coffee — Main JavaScript
 * Professional interactions, animations, and UI components
 */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // NAVIGATION
  // ============================================

  // Mobile menu toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      // Animate hamburger → X
      const icon = menuBtn.querySelector('svg');
      if (icon) {
        icon.innerHTML = isOpen
          ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>'
          : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
      }
    });
  }

  // Header scroll effect
  const header = document.getElementById('main-header') || document.querySelector('header');
  if (header) {
    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;

      if (currentScroll > scrollThreshold) {
        header.classList.add('nav-scrolled');
      } else {
        header.classList.remove('nav-scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================================
  // SCROLL ANIMATIONS (IntersectionObserver)
  // ============================================

  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        animationObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe all animated elements
  document.querySelectorAll('.animate-on-scroll, .animate-fade-left, .animate-fade-right, .animate-scale-in').forEach(el => {
    animationObserver.observe(el);
  });

  // Auto-add scroll animations to sections that don't have them
  document.querySelectorAll('section > div > h2, section > div > h3').forEach((heading, i) => {
    if (!heading.classList.contains('animate-on-scroll') && !heading.closest('.animate-on-scroll')) {
      heading.classList.add('animate-on-scroll');
      animationObserver.observe(heading);
    }
  });

  // ============================================
  // COUNTER ANIMATION
  // ============================================

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count || el.textContent, 10);
        if (isNaN(target)) return;

        let current = 0;
        const increment = target / 40;
        const suffix = el.dataset.suffix || '';

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target + suffix;
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + suffix;
          }
        }, 30);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.count-up').forEach(el => counterObserver.observe(el));

  // ============================================
  // IMAGE PARALLAX ON SCROLL
  // ============================================

  const parallaxElements = document.querySelectorAll('.img-parallax img');
  if (parallaxElements.length > 0) {
    window.addEventListener('scroll', () => {
      parallaxElements.forEach(img => {
        const rect = img.getBoundingClientRect();
        const speed = 0.1;
        const yPos = (rect.top - window.innerHeight / 2) * speed;
        img.style.transform = `translateY(${yPos}px)`;
      });
    }, { passive: true });
  }

  // ============================================
  // LIGHTBOX
  // ============================================

  document.querySelectorAll('[data-lightbox], .img-zoom').forEach(el => {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', () => {
      const img = el.tagName === 'IMG' ? el : el.querySelector('img');
      if (!img) return;

      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = `
        <div class="lightbox-close">&times;</div>
        <img src="${img.src}" alt="${img.alt || ''}" />
      `;

      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      requestAnimationFrame(() => lightbox.classList.add('active'));

      const close = () => {
        lightbox.classList.remove('active');
        setTimeout(() => {
          lightbox.remove();
          document.body.style.overflow = '';
        }, 300);
      };

      lightbox.addEventListener('click', close);
      document.addEventListener('keydown', function esc(e) {
        if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
      });
    });
  });

  // ============================================
  // TOAST NOTIFICATIONS
  // ============================================

  window.showToast = (message, type = 'success', duration = 3000) => {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="flex items-center gap-3">
        <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
        <span>${message}</span>
      </div>
    `;

    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('active'));

    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => toast.remove(), 400);
    }, duration);
  };

  // ============================================
  // MODAL SYSTEM
  // ============================================

  window.showModal = (title, body, icon = '✓') => {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal-content">
        <div class="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center text-3xl"
             style="background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05));">
          <span style="color: var(--color-accent);">${icon}</span>
        </div>
        <h3 class="text-2xl font-bold mb-3" style="font-family: 'Playfair Display', serif;">${title}</h3>
        <p class="text-gray-600 mb-8 leading-relaxed">${body}</p>
        <button class="btn-primary w-full" onclick="this.closest('.modal-overlay').classList.remove('active'); setTimeout(() => this.closest('.modal-overlay').remove(), 400);">
          Отлично
        </button>
      </div>
    `;

    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => overlay.classList.add('active'));

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => overlay.remove(), 400);
      }
    });
  };

  // ============================================
  // TIME-OF-DAY GALLERY TABS
  // ============================================

  // Support both data attributes and classes
  const timeTabs = document.querySelectorAll('[data-time-tab], .time-tab');
  timeTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.timeTab || tab.dataset.time || tab.textContent.trim().toLowerCase();

      timeTabs.forEach(t => {
        t.classList.remove('bg-accent', 'text-primary', 'bg-gold-500', 'text-charcoal-900');
        t.classList.add('bg-transparent');
      });
      tab.classList.add('bg-accent', 'text-primary');
      tab.classList.remove('bg-transparent');

      document.querySelectorAll('[data-time-content]').forEach(c => {
        c.classList.add('hidden');
        c.style.opacity = '0';
      });

      const content = document.querySelector(`[data-time-content="${target}"]`);
      if (content) {
        content.classList.remove('hidden');
        requestAnimationFrame(() => {
          content.style.transition = 'opacity 0.5s ease';
          content.style.opacity = '1';
        });
      }
    });
  });

  // ============================================
  // MENU FILTERS (Real filtering)
  // ============================================

  const filterButtons = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card, [data-category]');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || btn.textContent.trim().toLowerCase();

      filterButtons.forEach(b => {
        b.classList.remove('bg-accent', 'text-primary', 'bg-gold-500', 'text-charcoal-900');
      });
      btn.classList.add('bg-accent', 'text-primary');

      menuCards.forEach(card => {
        const category = card.dataset.category || '';
        const shouldShow = filter === 'all' || filter === 'все' || category.includes(filter);

        if (shouldShow) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => { card.style.display = 'none'; }, 400);
        }
      });
    });
  });

  // ============================================
  // CART SYSTEM (with localStorage)
  // ============================================

  const CART_KEY = 'dark-roast-cart';
  let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');

  const updateCartBadge = () => {
    const badge = document.getElementById('cart-count');
    if (badge) {
      badge.textContent = cart.length;
      badge.style.display = cart.length > 0 ? '' : 'none';
    }
  };

  updateCartBadge();

  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('[data-product]') || btn.closest('.menu-card') || btn.parentElement;
      const name = card?.querySelector('h3, h4')?.textContent || 'Кофе';
      const price = card?.querySelector('[data-price]')?.textContent || '';

      cart.push({ name, price, id: Date.now() });
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
      updateCartBadge();

      // Button feedback
      const originalText = btn.textContent;
      btn.textContent = 'Добавлено ✓';
      btn.style.background = 'var(--color-success)';
      btn.style.color = 'white';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.style.color = '';
      }, 1500);

      showToast(`${name} добавлен в корзину`, 'success');
    });
  });

  // Size/brewing option toggles
  document.querySelectorAll('.size-option, .brewing-method').forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.size-options, .brewing-methods') || btn.parentElement;
      if (parent) {
        parent.querySelectorAll('.size-option, .brewing-method').forEach(b => {
          b.classList.remove('bg-accent', 'text-primary', 'bg-gold-500', 'text-charcoal-900');
        });
      }
      btn.classList.add('bg-accent', 'text-primary');
    });
  });

  // ============================================
  // RESERVATION FORM
  // ============================================

  // Set dynamic date
  const dateInput = document.querySelector('input[type="date"]');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    if (!dateInput.value || dateInput.value < today) {
      dateInput.value = today;
    }
  }

  // Form validation + submit
  const reservationForm = document.querySelector('form');
  if (reservationForm && window.location.pathname.includes('reservation')) {
    reservationForm.addEventListener('submit', e => {
      e.preventDefault();

      // Validate required fields
      const name = reservationForm.querySelector('[name="name"], #name');
      const phone = reservationForm.querySelector('[name="phone"], #phone');

      if (name && !name.value.trim()) {
        name.classList.add('ring-2', 'ring-red-400');
        name.focus();
        showToast('Пожалуйста, введите ваше имя', 'error');
        return;
      }

      if (phone && !phone.value.trim()) {
        phone.classList.add('ring-2', 'ring-red-400');
        phone.focus();
        showToast('Пожалуйста, введите телефон', 'error');
        return;
      }

      // Remove error states
      reservationForm.querySelectorAll('.ring-red-400').forEach(el => {
        el.classList.remove('ring-2', 'ring-red-400');
      });

      // Show loading
      const submitBtn = reservationForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.classList.add('btn-loading');
        submitBtn.disabled = true;
      }

      // Simulate submission
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.classList.remove('btn-loading');
          submitBtn.disabled = false;
        }

        const nameVal = name?.value || 'Гость';
        const dateVal = dateInput?.value || 'сегодня';
        const timeEl = reservationForm.querySelector('select, [name="time"]');
        const timeVal = timeEl?.value || '';

        showModal(
          'Бронирование подтверждено!',
          `${nameVal}, ваш столик забронирован на ${dateVal}${timeVal ? ' в ' + timeVal : ''}. Мы отправим подтверждение на ваш телефон.`,
          '☕'
        );

        reservationForm.reset();
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
      }, 1500);
    });

    // Clear error on input
    reservationForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('ring-2', 'ring-red-400');
      });
    });
  }

  // ============================================
  // QUIZ SYSTEM
  // ============================================

  let quizScore = 0;
  let quizStep = 0;

  document.querySelectorAll('.quiz-answer').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.dataset.correct === 'true') quizScore++;
      quizStep++;

      // Highlight correct/wrong
      btn.classList.add(btn.dataset.correct === 'true' ? 'bg-green-600' : 'bg-red-600');
      btn.classList.add('text-white');

      const questions = document.querySelectorAll('.quiz-question');

      setTimeout(() => {
        questions.forEach(q => q.classList.add('hidden'));

        if (quizStep < questions.length) {
          const next = questions[quizStep];
          next.classList.remove('hidden');
          next.style.opacity = '0';
          requestAnimationFrame(() => {
            next.style.transition = 'opacity 0.4s ease';
            next.style.opacity = '1';
          });
        } else {
          const result = document.getElementById('quiz-result');
          if (result) {
            result.classList.remove('hidden');
            const percent = Math.round((quizScore / questions.length) * 100);
            const level = percent >= 80 ? 'Кофейный эксперт!' :
                          percent >= 50 ? 'Уверенный любитель' : 'Начинающий ценитель';
            const emoji = percent >= 80 ? '🏆' : percent >= 50 ? '☕' : '🌱';

            result.innerHTML = `
              <div class="text-center py-8">
                <div class="text-6xl mb-4">${emoji}</div>
                <h3 class="text-3xl font-bold mb-2" style="font-family: 'Playfair Display', serif;">${level}</h3>
                <p class="text-xl mb-2" style="color: var(--color-accent);">${quizScore} из ${questions.length} правильных</p>
                <div class="w-full bg-gray-200 rounded-full h-3 mt-6 mb-4 max-w-xs mx-auto">
                  <div class="h-3 rounded-full transition-all duration-1000" style="width: ${percent}%; background: linear-gradient(135deg, var(--color-accent), var(--color-accent-light));"></div>
                </div>
                <p class="text-gray-500 text-sm">Приходите к нам — мы научим вас ещё большему!</p>
              </div>
            `;
          }
        }
      }, 600);
    });
  });

  // ============================================
  // HOTSPOT TOOLTIPS (Atmosphere page)
  // ============================================

  window.showHotspot = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle('hidden');
      el.classList.toggle('animate-visible');
    }
  };

  // ============================================
  // HERO VIDEO FALLBACK
  // ============================================

  const heroVideo = document.querySelector('section video');
  if (heroVideo) {
    heroVideo.addEventListener('error', () => {
      const parent = heroVideo.parentElement;
      if (parent) {
        heroVideo.remove();
        parent.style.backgroundImage = 'url(https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&q=80)';
        parent.style.backgroundSize = 'cover';
        parent.style.backgroundPosition = 'center';
      }
    });

    // Fallback after timeout (Vimeo can be slow)
    setTimeout(() => {
      if (heroVideo.readyState === 0) {
        heroVideo.dispatchEvent(new Event('error'));
      }
    }, 5000);
  }

  // ============================================
  // PAGE LOAD ANIMATION
  // ============================================

  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

});
