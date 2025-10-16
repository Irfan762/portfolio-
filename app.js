// Professional Portfolio JavaScript

// Global variables for state management
let currentSection = 'home';
let isScrolling = false;
let typingIndex = 0;
let typingTextIndex = 0;
const typingTexts = [
  'AI Enthusiast',
  'Problem Solver', 
  'Innovation Leader',
  'Tech Explorer'
];

// DOM elements
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const typingTextElement = document.getElementById('typing-text');
const contactForm = document.getElementById('contact-form');
const skillBars = document.querySelectorAll('.skill-progress');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  initializeNavigation();
  initializeTypingAnimation();
  initializeSkillBars();
  initializeScrollAnimations();
  initializeContactForm();
  initializeMobileMenu();
});

// Navigation functionality
function initializeNavigation() {
  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
      
      // Close mobile menu if open
      closeMobileMenu();
    });
  });

  // Update navigation on scroll
  window.addEventListener('scroll', throttle(updateNavigation, 100));
  
  // Initial navigation update
  updateNavigation();
}

// Update navigation based on scroll position
function updateNavigation() {
  if (isScrolling) return;
  
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      updateActiveNavLink(sectionId);
      currentSection = sectionId;
    }
  });
  
  // Update navbar background based on scroll
  if (window.scrollY > 50) {
    navbar.style.backgroundColor = 'rgba(var(--color-brown-600-rgb), 0.1)';
  } else {
    navbar.style.backgroundColor = 'rgba(var(--color-brown-600-rgb), 0.05)';
  }
}

// Update active navigation link
function updateActiveNavLink(activeId) {
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${activeId}`) {
      link.classList.add('active');
    }
  });
}

// Mobile menu functionality
function initializeMobileMenu() {
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
}

function toggleMobileMenu() {
  // Mobile menu implementation would go here
  // For now, we'll just close it when clicking navigation links
}

function closeMobileMenu() {
  // Mobile menu close implementation would go here
}

// Typing animation for hero section
function initializeTypingAnimation() {
  if (!typingTextElement) return;
  
  function typeText() {
    const currentText = typingTexts[typingTextIndex];
    
    if (typingIndex < currentText.length) {
      typingTextElement.textContent = currentText.substring(0, typingIndex + 1);
      typingIndex++;
      setTimeout(typeText, 100);
    } else {
      setTimeout(eraseText, 2000);
    }
  }
  
  function eraseText() {
    const currentText = typingTexts[typingTextIndex];
    
    if (typingIndex > 0) {
      typingTextElement.textContent = currentText.substring(0, typingIndex - 1);
      typingIndex--;
      setTimeout(eraseText, 50);
    } else {
      typingTextIndex = (typingTextIndex + 1) % typingTexts.length;
      setTimeout(typeText, 500);
    }
  }
  
  // Start the typing animation
  typeText();
}

// Skill bar animations
function initializeSkillBars() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }
}

// Animate skill progress bars
function animateSkillBars() {
  skillBars.forEach(bar => {
    const targetWidth = bar.getAttribute('data-width');
    if (targetWidth) {
      // Add a small delay for staggered animation
      setTimeout(() => {
        bar.style.width = targetWidth;
      }, Math.random() * 300);
    }
  });
}

// Scroll animations for other elements
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const scrollObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll('.project-card, .achievement-card, .timeline-item, .stat-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    scrollObserver.observe(el);
  });
}

// Contact form functionality
function initializeContactForm() {
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleFormSubmission(this);
  });
}

// Handle contact form submission
function handleFormSubmission(form) {
  const formData = new FormData(form);
  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnLoader = submitBtn.querySelector('.btn-loader');
  
  // Show loading state
  btnText.classList.add('hidden');
  btnLoader.classList.remove('hidden');
  submitBtn.disabled = true;
  
  // Simulate form submission (replace with actual API call)
  setTimeout(() => {
    // Reset form
    form.reset();
    
    // Show success message
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Reset button state
    btnText.classList.remove('hidden');
    btnLoader.classList.add('hidden');
    submitBtn.disabled = false;
  }, 2000);
}

// Show notification to user
function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    padding: 16px 20px;
    background: var(--color-success);
    color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    font-size: 14px;
  `;
  
  if (type === 'error') {
    notification.style.background = 'var(--color-error)';
  }
  
  notification.textContent = message;
  
  // Add to DOM
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Hide and remove notification
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

// Utility function to throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Utility function to debounce events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Handle keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
  // Handle escape key to close modals/menus
  if (e.key === 'Escape') {
    closeMobileMenu();
  }
  
  // Handle arrow key navigation between sections
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    if (e.target === document.body) {
      e.preventDefault();
      navigateToNextSection(e.key === 'ArrowDown');
    }
  }
});

// Navigate to next/previous section with arrow keys
function navigateToNextSection(isDown) {
  const sections = ['home', 'about', 'skills', 'projects', 'experience', 'achievements', 'contact'];
  const currentIndex = sections.indexOf(currentSection);
  let nextIndex;
  
  if (isDown) {
    nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
  } else {
    nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
  }
  
  const nextSection = document.getElementById(sections[nextIndex]);
  if (nextSection) {
    isScrolling = true;
    nextSection.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => { isScrolling = false; }, 1000);
  }
}

// Initialize theme detection and handling
function initializeTheme() {
  // Detect system theme preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Listen for theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    // Theme changed, could update UI accordingly
    updateThemeVariables(e.matches);
  });
  
  // Initial theme setup
  updateThemeVariables(prefersDark);
}

// Update theme-specific variables
function updateThemeVariables(isDark) {
  // Any theme-specific JavaScript updates would go here
  // The CSS already handles the theme switching via media queries
}

// Performance optimization: Lazy load images when they come into view
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Initialize all features
function initializeAllFeatures() {
  initializeTheme();
  initializeLazyLoading();
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAllFeatures);
} else {
  initializeAllFeatures();
}

// Export functions for potential external use
window.portfolioApp = {
  showNotification,
  updateActiveNavLink,
  navigateToNextSection
};