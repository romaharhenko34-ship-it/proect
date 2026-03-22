

// ─── Header scroll effect ───
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── Mobile menu ───
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu?.classList.toggle('open');
}

// ─── Menu tabs ───
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const cat = tab.dataset.tab;

    // Update active tab
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show/hide cards
    document.querySelectorAll('.menu-card').forEach(card => {
      if (card.dataset.cat === cat) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// ─── Popup / Modal ─── (13. Default popup)
function openPopup() {
  document.getElementById('popupOverlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.getElementById('popupOverlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

function closePopupOutside(e) {
  if (e.target.id === 'popupOverlay') closePopup();
}

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePopup();
});

// ─── Booking form submit ───
function handleBooking(e) {
  e.preventDefault();
  closePopup();
  showToast();
  e.target.reset();
}

// ─── Newsletter form ───
function handleNewsletter(e) {
  e.preventDefault();
  showToast('Вы подписались на рассылку!');
  e.target.reset();
}

// ─── Toast notification ───
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  if (msg) toast.querySelector('span').textContent = msg;
  toast.classList.remove('hide');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hide');
  }, 3500);
}

// ─── Scroll-triggered fade animations ───
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.menu-card, .highlight-item, .stat, .atmo-card').forEach(el => {
  el.style.opacity = '0';
  el.style.animation = 'fadeInUp 0.7s ease forwards paused';
  observer.observe(el);
});

// Add staggered delays for grids
document.querySelectorAll('.menu-card').forEach((el, i) => {
  el.style.animationDelay = `${i * 0.1}s`;
});
document.querySelectorAll('.highlight-item').forEach((el, i) => {
  el.style.animationDelay = `${i * 0.1}s`;
});
