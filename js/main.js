/**
 * BRIGHT TECH - Main JavaScript
 * Navigation, Mobile Menu, and Core Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
});

/**
 * Navigation - Scroll Effects
 */
function initNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  let lastScroll = 0;
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > scrollThreshold) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });
}

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navLinksItems = document.querySelectorAll('.nav-link');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close menu when clicking a link
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav')?.offsetHeight || 0;
        const targetPosition = targetElement.offsetTop - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Scroll Animations - Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (!animatedElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          // Optionally unobserve after animation
          // observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  animatedElements.forEach(el => observer.observe(el));
}

/**
 * Language Switcher
 */
function switchLanguage(lang) {
  const currentPath = window.location.pathname;
  const fileName = currentPath.split('/').pop() || 'index.html';

  let newPath;

  if (lang === 'ar') {
    // Switch to Arabic
    if (fileName.includes('-ar.html')) {
      return; // Already Arabic
    }
    newPath = fileName.replace('.html', '-ar.html');
  } else {
    // Switch to English
    if (!fileName.includes('-ar.html')) {
      return; // Already English
    }
    newPath = fileName.replace('-ar.html', '.html');
  }

  window.location.href = newPath;
}

/**
 * Form Validation (Basic)
 */
function validateForm(form) {
  const inputs = form.querySelectorAll('[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      isValid = false;
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }

    // Email validation
    if (input.type === 'email' && input.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        isValid = false;
        input.classList.add('error');
      }
    }
  });

  return isValid;
}

/**
 * Contact Form Handler
 */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm(form)) {
      // Form is valid - would normally submit to backend
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Simulate submission
      setTimeout(() => {
        submitBtn.textContent = 'Sent!';
        form.reset();

        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 2000);
      }, 1500);
    }
  });
}

// Initialize contact form if on contact page
document.addEventListener('DOMContentLoaded', initContactForm);

/**
 * Portfolio Filter
 */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-card');

  if (!filterBtns.length || !portfolioItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Filter items
      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.opacity = '0';
          setTimeout(() => {
            item.style.opacity = '1';
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Initialize portfolio filter if on portfolio page
document.addEventListener('DOMContentLoaded', initPortfolioFilter);

/**
 * Testimonial Slider
 */
function initTestimonialSlider() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  const slides = slider.querySelectorAll('.testimonial-card');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dots = slider.querySelectorAll('.slider-dot');

  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.style.display = i === index ? 'block' : 'none';
      slide.style.opacity = i === index ? '1' : '0';
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      currentSlide = i;
      showSlide(currentSlide);
    });
  });

  // Auto-advance
  setInterval(nextSlide, 5000);

  // Initialize
  showSlide(0);
}

// Initialize testimonial slider if exists
document.addEventListener('DOMContentLoaded', initTestimonialSlider);
