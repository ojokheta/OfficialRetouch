// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Contact Form Handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !service) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Create WhatsApp message
        const whatsappMessage = `Hello! I'm interested in booking an appointment.
        
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Service: ${service}
Message: ${message || 'No additional message'}

I look forward to hearing from you!`;
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Open WhatsApp with pre-filled message
        const whatsappURL = `https://wa.me/2348157057989?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
        
        // Show success message
        alert('Thank you for your interest! You will be redirected to WhatsApp to complete your booking.');
        
        // Reset form
        this.reset();
    });
}

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .achievement, .timeline-item, .education-item, .motion-fade-up, .motion-fade-left, .motion-fade-right, .motion-zoom-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Counter animations for stats
function initCounters() {
    const counters = document.querySelectorAll('.count');
    if (!counters.length) return;

    const speed = 1200; // total duration in ms

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const updateCount = () => {
                    const target = +el.getAttribute('data-target');
                    const current = +el.innerText;
                    const increment = Math.ceil(target / (speed / 30));
                    if (current < target) {
                        el.innerText = Math.min(current + increment, target);
                        requestAnimationFrame(updateCount);
                    } else {
                        el.innerText = target;
                        obs.unobserve(el);
                    }
                };
                el.innerText = '0';
                updateCount();
            }
        });
    }, { threshold: 0.6 });

    counters.forEach(c => counterObserver.observe(c));
}

document.addEventListener('DOMContentLoaded', initCounters);

// Social Media Link Analytics (Optional)
document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('click', function() {
        const platform = this.href.includes('instagram') ? 'Instagram' : 
                        this.href.includes('tiktok') ? 'TikTok' : 
                        this.href.includes('wa.me') ? 'WhatsApp' : 'Unknown';
        console.log(`User clicked on ${platform} link`);
    });
});

// Dynamic Nav Active Highlighting
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html'; // Gets current filename
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active'); // Clear all actives first
        
        // Match href to current page (strip .html if needed)
        const linkPage = link.getAttribute('href').replace('.html', '') || 'index';
        const cleanCurrent = currentPage.replace('.html', '');
        
        if (cleanCurrent === linkPage) {
            link.classList.add('active');
        }
    });
});