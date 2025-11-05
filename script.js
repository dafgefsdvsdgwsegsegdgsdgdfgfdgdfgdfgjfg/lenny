// DOM Elements
const cursor = document.querySelector('.cursor');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const animatedElements = document.querySelectorAll('.animate-in');
const skillLevels = document.querySelectorAll('.skill-level');
const contactForm = document.querySelector('.contact-form');

// Custom cursor
document.addEventListener('mousemove', (e) => {
  if (window.innerWidth > 1024) {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  } else {
    cursor.style.display = 'none';
  }
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Interactive elements cursor effects
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card');

interactiveElements.forEach(element => {
  element.addEventListener('mouseenter', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
    cursor.style.mixBlendMode = 'difference';
    cursor.style.border = '1px solid white';
  });
  
  element.addEventListener('mouseleave', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.mixBlendMode = 'difference';
    cursor.style.border = '2px solid var(--primary-color)';
  });
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('active')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu when clicking on a link
navLinksItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
});

// Einfacher Copy-Schutz

// Rechtsklick verhindern
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

// Textauswahl verhindern
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

// Strg+C verhindern
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
    e.preventDefault();
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerHeight = document.querySelector('header').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.15
};

const animationObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Once animation is complete, unobserve the element
      if (entry.target.classList.contains('animate-in')) {
        animationObserver.unobserve(entry.target);
      }
    }
  });
}, observerOptions);

// Observe all animated elements
animatedElements.forEach(element => {
  animationObserver.observe(element);
});

// Animate skill bars when in view
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add a small delay before starting the animation
      setTimeout(() => {
        // Get the width from the inline style
        const width = entry.target.style.width;
        // First set width to 0
        entry.target.style.width = '0%';
        // Then animate to the target width
        setTimeout(() => {
          entry.target.style.width = width;
        }, 50);
      }, 200);
      
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all skill levels
skillLevels.forEach(skill => {
  skillObserver.observe(skill);
});

// Active nav link on scroll
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinksItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
  
  // Sticky header shadow
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  }
});

// Form submission (prevent default and show success message)
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    // Simulate API call delay
    setTimeout(() => {
      // Create success message
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
        <div style="
          background-color: rgba(110, 87, 224, 0.1);
          color: var(--primary-color);
          padding: 15px;
          border-radius: 10px;
          text-align: center;
          margin-top: 20px;
        ">
          <p style="font-weight: 500; margin-bottom: 10px;">
            Message sent successfully!
          </p>
          <p>Thank you for reaching out. I'll get back to you soon.</p>
        </div>
      `;
      
      // Replace form with success message
      contactForm.style.opacity = '0';
      setTimeout(() => {
        contactForm.parentNode.replaceChild(successMessage, contactForm);
        successMessage.style.opacity = '0';
        setTimeout(() => {
          successMessage.style.transition = 'opacity 0.5s ease';
          successMessage.style.opacity = '1';
        }, 50);
      }, 300);
      
    }, 1500);
  });
}

// Initialize animations for elements in the viewport on page load
window.addEventListener('load', () => {
  // Show elements that are already in the viewport when the page loads
  animatedElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    ) {
      setTimeout(() => {
        element.classList.add('visible');
      }, 100);
    }
  });
  
  // Set active nav link on page load
  let current = '';
  let scrollPosition = window.scrollY;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollPosition >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  if (current) {
    navLinksItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  } else {
    // If no section is active, set the first nav link as active
    navLinksItems[0].classList.add('active');
  }
});

// Parallax effect for hero section
const heroSection = document.querySelector('.hero');
const blob = document.querySelector('.blob');
const circle = document.querySelector('.circle');

if (heroSection && blob && circle) {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (scrollPosition < window.innerHeight) {
      blob.style.transform = `translateY(${scrollPosition * 0.1}px)`;
      circle.style.transform = `translateY(${scrollPosition * 0.2}px) rotate(${scrollPosition * 0.05}deg) translate(50px)`;
    }
  });
}

// Project card hover effect
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
    card.style.boxShadow = '0 20px 30px rgba(0, 0, 0, 0.1)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
    card.style.boxShadow = var(--shadow);
  });
});

// Current year in footer
const yearElement = document.querySelector('.footer-content p:first-child');
if (yearElement) {
  const currentYear = new Date().getFullYear();
  yearElement.innerHTML = `&copy; ${currentYear} My Portfolio. All rights reserved.`;
}
