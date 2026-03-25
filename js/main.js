/* ============================================================
   KRISHNA GLASS HOUSE — Main JavaScript
   Handles: Header scroll, Mobile drawer, Mega menu, Hero slider,
            Scroll reveal, Gallery lightbox, Gallery filters
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Header Scroll Effect ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- 2. Mobile Drawer ---------- */
  const hamburger = document.querySelector('.hamburger');
  const drawer    = document.querySelector('.mobile-drawer');
  const overlay   = document.querySelector('.mobile-drawer-overlay');

  function openDrawer() {
    hamburger?.classList.add('active');
    drawer?.classList.add('open');
    overlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    hamburger?.classList.remove('active');
    drawer?.classList.remove('open');
    overlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', () => {
    drawer?.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  overlay?.addEventListener('click', closeDrawer);

  // Close drawer on mobile nav link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  /* ---------- 3. Mega Menu (Desktop) ---------- */
  const servicesItem = document.querySelector('.nav-item-services');
  if (servicesItem) {
    let megaTimeout;
    servicesItem.addEventListener('mouseenter', () => {
      clearTimeout(megaTimeout);
      servicesItem.classList.add('open');
    });
    servicesItem.addEventListener('mouseleave', () => {
      megaTimeout = setTimeout(() => {
        servicesItem.classList.remove('open');
      }, 200);
    });
  }

  /* ---------- 4. Hero Slider ---------- */
  const slides   = document.querySelectorAll('.hero-slide');
  const dots     = document.querySelectorAll('.hero-dot');
  const prevBtn  = document.querySelector('.hero-arrow-prev');
  const nextBtn  = document.querySelector('.hero-arrow-next');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    if (slides.length === 0) return;
    slides[currentSlide]?.classList.remove('active');
    dots[currentSlide]?.classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide]?.classList.add('active');
    dots[currentSlide]?.classList.add('active');
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoSlide() {
    stopAutoSlide();
    slideInterval = setInterval(nextSlide, 5000);
  }
  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  if (slides.length > 0) {
    nextBtn?.addEventListener('click', () => { nextSlide(); startAutoSlide(); });
    prevBtn?.addEventListener('click', () => { prevSlide(); startAutoSlide(); });
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => { goToSlide(i); startAutoSlide(); });
    });
    startAutoSlide();
  }

  /* ---------- 5. Scroll Reveal ---------- */
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  /* ---------- 6. Counter Animation ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const startTime = performance.now();

          function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuart
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.floor(target * eased) + suffix;
            if (progress < 1) requestAnimationFrame(animate);
          }

          requestAnimationFrame(animate);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));
  }

  /* ---------- 7. Gallery Lightbox ---------- */
  const lightbox     = document.querySelector('.lightbox');
  const lightboxImg  = lightbox?.querySelector('img');
  const lightboxClose = lightbox?.querySelector('.lightbox-close');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      if (lightboxImg && img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeLightbox() {
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ---------- 8. Gallery Filters ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryAll = document.querySelectorAll('.gallery-item[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.getAttribute('data-filter');
      galleryAll.forEach(item => {
        if (cat === 'all' || item.getAttribute('data-category') === cat) {
          item.style.display = '';
          item.style.animation = 'fadeIn .4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---------- 9. Contact Form (client-side validation) ---------- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic visual feedback
      const btn = contactForm.querySelector('.form-submit');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.style.background = '#22c55e';
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 2500);
    });
  }

  /* ---------- 10. Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- 11. Active Nav Highlight ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});

/* Fade-in keyframes for gallery filter */
const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes fadeIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}`;
document.head.appendChild(styleSheet);
