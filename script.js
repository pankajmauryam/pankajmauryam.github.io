// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll to contact function for CTA button
function scrollToContact() {
    const contactSection = document.getElementById('contact');
    contactSection.scrollIntoView({ behavior: 'smooth' });
}

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: contactForm.querySelector('input[type="text"]').value,
        email: contactForm.querySelector('input[type="email"]').value,
        message: contactForm.querySelector('textarea').value
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        // For a static site, we'll simulate success
        // In production, you'd send this to a backend service
        // Example using Formspree, Netlify Forms, etc.
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show success message
        formMessage.textContent = 'Thank you! Your message has been sent successfully.';
        formMessage.classList.remove('error');
        formMessage.classList.add('success');
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success');
        }, 5000);
        
    } catch (error) {
        // Show error message
        formMessage.textContent = 'Oops! There was an error sending your message. Please try again.';
        formMessage.classList.remove('success');
        formMessage.classList.add('error');
    } finally {
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});

// Scroll animation for feature cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and experience cards
document.querySelectorAll('.feature-card, .experience-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Add active class to nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add smooth scroll behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Counter animation for stats (optional)
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Experience card highlight on hover
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        document.querySelectorAll('.experience-card').forEach(c => {
            if (c !== this) {
                c.style.opacity = '0.8';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        document.querySelectorAll('.experience-card').forEach(c => {
            c.style.opacity = '1';
        });
    });
});

// Lazy loading images (if you add images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('Saaswerx website initialized successfully!');
