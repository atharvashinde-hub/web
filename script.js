// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : '');
  });
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
  }
}

// Expandable conversational cards
function closeAllExpands() {
  document.querySelectorAll('.expandable.expanded').forEach(card => {
    card.classList.remove('expanded');
    const content = card.querySelector('.expand-content');
    if (content) content.remove();
  });
}
document.querySelectorAll('.expandable .expand-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const card = this.closest('.expandable');
    if (card.classList.contains('expanded')) {
      card.classList.remove('expanded');
      const content = card.querySelector('.expand-content');
      if (content) content.remove();
      return;
    }
    closeAllExpands();
    card.classList.add('expanded');
    const title = card.getAttribute('data-title');
    const contentText = card.getAttribute('data-content');
    const contentDiv = document.createElement('div');
    contentDiv.className = 'expand-content';
    contentDiv.innerHTML = `<strong>${title}</strong><br><span>${contentText}</span>`;
    card.appendChild(contentDiv);
    setTimeout(() => { contentDiv.classList.add('show'); }, 10);
  });
});

// Animate skills bars on scroll (if you add animated bars back)
function animateSkills() {
  document.querySelectorAll('.skills-list .fill').forEach(bar => {
    const rect = bar.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      bar.style.width = bar.parentElement.getAttribute('data-width') || bar.style.width;
      bar.classList.add('animated');
    }
  });
}
window.addEventListener('scroll', animateSkills);
window.addEventListener('DOMContentLoaded', animateSkills);

// Sticky nav highlight
const navLinks = document.querySelectorAll('.navbar a');
const sections = Array.from(document.querySelectorAll('main > section'));
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
function fadeInOnScroll() {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    }
  });
}
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', fadeInOnScroll); 