// Basic JavaScript for the portfolio site

document.addEventListener('DOMContentLoaded', function() {
  
  // Hero section animations - trigger on page load
  const heroImage = document.querySelector('.hero-bg-image');
  const heroContent = document.querySelector('.hero-content');
  
  // Add a slight delay to ensure styles are loaded
  setTimeout(() => {
    if (heroImage) {
      heroImage.style.transform = 'scale(1.1)';
    }
    if (heroContent) {
      heroContent.style.opacity = '1';
      heroContent.style.transform = 'translateX(0)';
    }
  }, 100);
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Contact form handling
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = this.querySelector('input[type=\"text\"]').value;
      const email = this.querySelector('input[type=\"email\"]').value;
      const message = this.querySelector('textarea').value;
      
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      
      const submitBtn = this.querySelector('button[type=\"submit\"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        alert('Thank you for your message!');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1000);
    });
  }

  // Simple animations on scroll
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  });

  sections.forEach(section => observer.observe(section));

});
