/* ============================================================
   KRISHNA GLASS HOUSE — Main JavaScript
   Handles: Header scroll, Mobile drawer, Mega menu, Hero slider,
            Scroll reveal, Gallery lightbox, Gallery filters
   ============================================================ */

// Register service worker for PWA installability and offline support.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  });
}

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

  /* ---------- 12. FAQ Accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all siblings
      item.parentElement.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

});

/* Fade-in keyframes for gallery filter */
const styleSheet = document.createElement('style');
styleSheet.textContent = `@keyframes fadeIn{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}`;
document.head.appendChild(styleSheet);

/* ============================================================
   BACK TO TOP BUTTON
   ============================================================ */
(function () {
  const btn = document.createElement('button');
  btn.id = 'back-to-top';
  btn.setAttribute('aria-label', 'Back to top');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>`;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ============================================================
   AI CHATBOT — Krishna Glass House Assistant (Groq / Kimi K2)
   ============================================================ */
(function () {
  const GROQ_KEY   = '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';
  const GROQ_MODELS = [
    'llama-3.1-8b-instant',
    'llama3-70b-8192',
    'mixtral-8x7b-32768'
  ];
  const GROQ_URL   = 'https://api.groq.com/openai/v1/chat/completions';

  const SYSTEM_PROMPT = `You are KGH Assistant — the friendly, knowledgeable AI support agent for Krishna Glass House. You help visitors of the website krishnaglass.explyra.me.

BUSINESS DETAILS YOU MUST KNOW:
- Business Name: Krishna Glass House (Aluminium, Wallpaper & PVC Works)
- Owner / Founder: Saksham Bhasin (Primary)
- Co-Owner: Pankaj Bhasin
- Founded: December 2021
- GSTIN: 07DPZPB3958D1ZL
- Business Type: Premium Interior Hub — Mid to Premium price range (₹₹)
- Service Area: Delhi NCR & West Delhi

CONTACT:
- Phone (Saksham): +91 87001 62623
- Phone (Pankaj): +91 99995 51275
- WhatsApp: +91 87001 62623
- Email: mfskufgu@gmail.com
- Website: https://krishnaglass.explyra.me/

LOCATION:
- Shop No. 2, Mohan Nagar, Pankha Road, Opposite D-Block Janakpuri, New Delhi — 110046
- Google Maps: https://maps.app.goo.gl/MxcHDSm7aD1qwjck9

BUSINESS HOURS:
- Monday–Sunday: 10:00 AM – 8:00 PM
- CLOSED on Wednesdays

SERVICES:
1. Custom Glass Facades – Curtain walls, spider glazing, Saint-Gobain/Modiguard glass
2. Aluminium & uPVC Windows/Doors – Sliding, casement, folding systems
3. PVC Wall Panels & Designer Wallpapers – Waterproof, imported, marble/wood grain
4. Glass Railings & Balustrades – 10mm/12mm toughened, frameless, SS hardware
5. Office Glass Partitions – Soundproof, frosted/clear, floor-to-ceiling
6. LED Mirrors – Touch-sensor, warm/cool light, custom sizes for bathrooms & salons
7. Toughened Glass – Saint-Gobain & Modiguard 10mm/12mm high-strength
8. Complete Interior Solutions – Homes & offices

RATINGS:
- Google: 5.0★ (15+ reviews): https://g.page/r/CUW1QB530ymnEAE/review
- JustDial: 5.0★ (19+ reviews): https://jsdl.in/DT-23LJF8HYEIO

SOCIAL MEDIA:
- Instagram: https://www.instagram.com/krishnaglass09/
- Facebook: https://www.facebook.com/krishnaglass09
- YouTube: https://www.youtube.com/@krishnaglasshouse.netfly
- Twitter/X: https://twitter.com/KrishnaGla18836
- Houzz: https://www.houzz.in/user/krishnaglasshouse

TEAM:
- Saksham Bhasin (Owner): Portfolio at https://sakshambhasin.netlify.app/
- Pankaj Bhasin (Associate): Portfolio at https://pankajbhasin.netlify.app/
- Mitanshu Bhasin (Website Designer): https://mitanshu.explyra.me/

RULES:
- Be concise, warm and professional. Max 3-4 short sentences per reply unless asked for more detail.
- When ANY contact or WhatsApp question is asked, ALWAYS include the tag [SHOW_WHATSAPP] in your reply so the UI shows a clickable WhatsApp button.
- When asked for directions or location, share the Google Maps link.
- Never share bank account details.
- Always answer in the language the user writes in.`;

  const messages = [{ role: 'system', content: SYSTEM_PROMPT }];

  /* ── DOM Injection ── */
  const fab = document.createElement('button');
  fab.id = 'kgh-chat-fab';
  fab.setAttribute('aria-label', 'Chat with us');
  fab.innerHTML = `
    <span class="kgh-chat-fab-pulse"></span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>`;

  const panel = document.createElement('div');
  panel.id = 'kgh-chat-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'KGH AI Assistant');
  panel.innerHTML = `
    <div class="kgh-chat-header">
      <div class="kgh-chat-avatar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/>
          <path d="M12 8v4M12 16h.01"/>
        </svg>
      </div>
      <div class="kgh-chat-header-info">
        <strong>KGH Assistant</strong>
        <span><span class="kgh-chat-status-dot"></span>Online — Krishna Glass House</span>
      </div>
      <button class="kgh-chat-close" id="kgh-chat-close" aria-label="Close chat">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div class="kgh-chat-messages" id="kgh-chat-messages"></div>
    <div class="kgh-chips" id="kgh-chips">
      <button class="kgh-chip" data-q="What services do you offer?">Services</button>
      <button class="kgh-chip" data-q="How can I contact you?">Contact</button>
      <button class="kgh-chip" data-q="What are your business hours?">Hours</button>
      <button class="kgh-chip" data-q="Where are you located?">Location</button>
      <button class="kgh-chip" data-q="What is your price range?">Pricing</button>
    </div>
    <div class="kgh-chat-input-area">
      <input type="text" id="kgh-chat-input" placeholder="Ask anything…" autocomplete="off" maxlength="300">
      <button class="kgh-chat-send" id="kgh-chat-send" aria-label="Send message">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
    <div class="kgh-chat-footer">Powered by Groq · Krishna Glass House AI</div>`;

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  const messagesEl  = document.getElementById('kgh-chat-messages');
  const inputEl     = document.getElementById('kgh-chat-input');
  const sendBtn     = document.getElementById('kgh-chat-send');
  const closeBtn    = document.getElementById('kgh-chat-close');
  const chipsEl     = document.getElementById('kgh-chips');

  /* ── Helpers ── */
  const botIcon = () => `<div class="kgh-msg-bot-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="M12 8v4M12 16h.01"/></svg></div>`;

  const waBtn = () => `<a href="https://wa.me/918700162623?text=Hi%2C%20I%20found%20you%20on%20the%20website%20and%20would%20like%20a%20quote." target="_blank" rel="noopener" class="kgh-whatsapp-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg> WhatsApp Us</a>`;

  function scrollDown() {
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function appendMsg(role, html) {
    const wrap = document.createElement('div');
    wrap.className = `kgh-msg ${role}`;
    if (role === 'bot') {
      wrap.innerHTML = `${botIcon()}<div class="kgh-msg-bubble">${html}</div>`;
    } else {
      wrap.innerHTML = `<div class="kgh-msg-bubble">${html}</div>`;
    }
    messagesEl.appendChild(wrap);
    scrollDown();
    return wrap;
  }

  function sanitizeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  async function requestGroqWithFallback(payloadMessages) {
    let lastError = new Error('No model response');

    for (const model of GROQ_MODELS) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 18000);

      try {
        const res = await fetch(GROQ_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${GROQ_KEY}`
          },
          body: JSON.stringify({
            model,
            messages: payloadMessages,
            temperature: 0.65,
            max_tokens: 400
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
          let details = '';
          try {
            const errorJson = await res.json();
            details = errorJson?.error?.message || '';
          } catch {
            details = '';
          }
          throw new Error(`API ${res.status}${details ? `: ${details}` : ''}`);
        }

        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content;
        if (!reply) {
          throw new Error('Empty AI response');
        }

        return reply;
      } catch (err) {
        clearTimeout(timeoutId);
        lastError = err;
      }
    }

    throw lastError;
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'kgh-msg bot';
    wrap.id = 'kgh-typing-indicator';
    wrap.innerHTML = `${botIcon()}<div class="kgh-msg-bubble"><div class="kgh-typing"><span></span><span></span><span></span></div></div>`;
    messagesEl.appendChild(wrap);
    scrollDown();
  }

  function hideTyping() {
    document.getElementById('kgh-typing-indicator')?.remove();
  }

  /* ── Greeting ── */
  appendMsg('bot', '👋 Hi! I\'m the <strong>KGH Assistant</strong> for <strong>Krishna Glass House</strong>.<br>Ask me anything about our services, pricing, location or contact info!');

  /* ── Send Message ── */
  async function sendMessage(text) {
    const q = text.trim();
    if (!q) return;

    // hide chips after first interaction
    chipsEl.style.display = 'none';
    inputEl.value = '';
    sendBtn.disabled = true;

    appendMsg('user', sanitizeHtml(q));
    messages.push({ role: 'user', content: q });

    showTyping();

    try {
      if (!navigator.onLine) {
        throw new Error('No internet connection');
      }

      const reply = await requestGroqWithFallback(messages);
      messages.push({ role: 'assistant', content: reply });

      hideTyping();

      const showWA = reply.includes('[SHOW_WHATSAPP]');
      const cleanReply = reply.replace('[SHOW_WHATSAPP]', '').trim();
      const formattedReply = sanitizeHtml(cleanReply).replace(/\n/g, '<br>');
      const finalHtml = showWA ? `${formattedReply}<br>${waBtn()}` : formattedReply;

      appendMsg('bot', finalHtml);
    } catch (err) {
      hideTyping();
      appendMsg('bot', '⚠️ Oops! Something went wrong. Please <a href="https://wa.me/918700162623" target="_blank" style="color:var(--color-accent);text-decoration:underline">WhatsApp us directly</a> for help.');
      console.error('KGH Chat error:', err);
    }

    sendBtn.disabled = false;
    inputEl.focus();
  }

  /* ── Events ── */
  fab.addEventListener('click', () => {
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
      // stop pulse after first open
      fab.querySelector('.kgh-chat-fab-pulse')?.remove();
      inputEl.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('open');
  });

  sendBtn.addEventListener('click', () => sendMessage(inputEl.value));

  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage(inputEl.value);
  });

  chipsEl.querySelectorAll('.kgh-chip').forEach(chip => {
    chip.addEventListener('click', () => sendMessage(chip.getAttribute('data-q')));
  });

  // Close panel on outside click
  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== fab && !fab.contains(e.target)) {
      panel.classList.remove('open');
    }
  });
})();

