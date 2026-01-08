// Smooth scroll for navigation
document.addEventListener('DOMContentLoaded', function() {
    const navItems = document.querySelectorAll('nav li');
    const sections = document.querySelectorAll('section');
    
    navItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            if (index < sections.length) {
                sections[index].scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Shop Now button smooth scroll
    const shopBtn = document.querySelector('.btn-primary');
    if (shopBtn) {
        shopBtn.addEventListener('click', function() {
            document.querySelector('.products').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // Product cards animation on scroll
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Discount images - parallax effect removed for fixed positioning

    // Add to cart functionality for product buttons
    const productButtons = document.querySelectorAll('.card button');
    productButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Create notification
            const notification = document.createElement('div');
            notification.textContent = 'Added to cart!';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #c30000;
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                z-index: 1000;
                animation: slideInRight 0.3s ease;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }, 2000);
        });
    });

    // Discount caption pulse effect on scroll into view
    const discountCaption = document.querySelector('.discount-caption');
    if (discountCaption) {
        const captionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 1s ease-out, shimmer 3s ease-in-out infinite, pulse 2s ease-in-out infinite';
                }
            });
        }, { threshold: 0.5 });
        
        captionObserver.observe(discountCaption);
    }

    // Footer links smooth interaction
    const footerLinks = document.querySelectorAll('.footer-links a');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.6);
                width: 20px;
                height: 20px;
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Navbar scroll effect (disabled on mobile for better UX)
    let lastScroll = 0;
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Only hide navbar on scroll for desktop
        if (window.innerWidth > 768) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
    });
    
    nav.style.transition = 'transform 0.3s ease';

    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset navbar on resize
            if (window.innerWidth <= 768) {
                nav.style.transform = 'translateY(0)';
            }
            
            // Adjust notification position on mobile
            const notifications = document.querySelectorAll('[style*="position: fixed"]');
            notifications.forEach(notif => {
                if (window.innerWidth <= 480) {
                    notif.style.right = '10px';
                    notif.style.left = '10px';
                    notif.style.top = '10px';
                }
            });
        }, 250);
    });

    // Touch-friendly interactions for mobile
    if ('ontouchstart' in window) {
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes ripple {
        to {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }
`;
document.head.appendChild(style);
