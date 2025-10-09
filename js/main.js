// Modern Single Page Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initMobileMenu();
    initDropdownMenu();
    initSmoothScrolling();
    initParallax();
    initCounters();
    
    // Navigation functionality
    function initNavigation() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar scroll effect
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class for styling
            if (scrollTop > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Active navigation highlighting
        function updateActiveNav() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
        
        window.addEventListener('scroll', updateActiveNav);
        updateActiveNav(); // Initial call
    }
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('nav-menu');
                    const hamburger = document.getElementById('hamburger');
                    if (mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            });
        });
    }
    
    // Mobile menu functionality
    function initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }
    
    // Dropdown menu functionality - Enhanced for Acceldata style
    function initDropdownMenu() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (toggle && menu) {
                // For desktop: hover behavior is handled by CSS
                // For mobile: click behavior
                toggle.addEventListener('click', function(e) {
                    // Only handle click on mobile
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        
                        // Toggle the dropdown
                        const isOpen = menu.classList.contains('mobile-open');
                        
                        // Close all other dropdowns
                        document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                            otherMenu.classList.remove('mobile-open');
                        });
                        
                        // Toggle current dropdown
                        if (!isOpen) {
                            menu.classList.add('mobile-open');
                        }
                        
                        // Rotate arrow
                        const arrow = toggle.querySelector('.dropdown-arrow');
                        if (arrow) {
                            if (isOpen) {
                                arrow.classList.remove('rotated');
                            } else {
                                arrow.classList.add('rotated');
                            }
                        }
                    }
                });
                
                // Close dropdown when clicking outside (desktop only)
                document.addEventListener('click', function(e) {
                    if (window.innerWidth > 768 && !dropdown.contains(e.target)) {
                        menu.classList.remove('mobile-open');
                        const arrow = toggle.querySelector('.dropdown-arrow');
                        if (arrow) {
                            arrow.classList.remove('rotated');
                        }
                    }
                });
                
                // Handle window resize
                window.addEventListener('resize', function() {
                    if (window.innerWidth > 768) {
                        menu.classList.remove('mobile-open');
                        const arrow = toggle.querySelector('.dropdown-arrow');
                        if (arrow) {
                            arrow.classList.remove('rotated');
                        }
                    }
                });
                
                // Enhanced keyboard navigation
                toggle.addEventListener('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggle.click();
                    } else if (e.key === 'Escape') {
                        menu.classList.remove('mobile-open');
                        const arrow = toggle.querySelector('.dropdown-arrow');
                        if (arrow) {
                            arrow.classList.remove('rotated');
                        }
                    }
                });
                
                   // Handle dropdown item clicks
                   const dropdownItems = menu.querySelectorAll('.platform-dropdown-item, .agent-dropdown-item, .dropdown-item');
                   dropdownItems.forEach(item => {
                    item.addEventListener('click', function() {
                        // Close dropdown after clicking an item
                        if (window.innerWidth <= 768) {
                            menu.classList.remove('mobile-open');
                            const arrow = toggle.querySelector('.dropdown-arrow');
                            if (arrow) {
                                arrow.style.transform = 'rotate(0deg)';
                            }
                        }
                    });
                });
            }
        });
    }
    
    // Scroll effects and animations
    function initScrollEffects() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animatedElements = document.querySelectorAll(
            '.feature-card, .agent-card, .pricing-card, .security-card, .stat-item'
        );
        
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Parallax effects
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.gradient-orb');
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.5 + (index * 0.1);
                element.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }
    
    // Counter animations
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current).toLocaleString() + counter.textContent.replace(/[\d,]/g, '').replace(/[^\D]/g, '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString() + counter.textContent.replace(/[\d,]/g, '').replace(/[^\D]/g, '');
                }
            };
            
            updateCounter();
        };
        
        // Intersection Observer for counters
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // Enhanced animations
    function initAnimations() {
        // Add CSS for animations
        const style = document.createElement('style');
        style.textContent = `
            .feature-card,
            .agent-card,
            .pricing-card,
            .security-card,
            .stat-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .feature-card.animate-in,
            .agent-card.animate-in,
            .pricing-card.animate-in,
            .security-card.animate-in,
            .stat-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
            
            @media (max-width: 768px) {
                .nav-menu {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    right: 0;
                    background: var(--white);
                    border-top: 1px solid var(--gray-200);
                    padding: 2rem;
                    transform: translateY(-100%);
                    transition: transform 0.3s ease;
                    box-shadow: var(--shadow-lg);
                }
                
                .nav-menu.active {
                    transform: translateY(0);
                }
                
                .nav-menu .nav-link {
                    display: block;
                    padding: 1rem 0;
                    border-bottom: 1px solid var(--gray-100);
                }
                
                .nav-menu .nav-link:last-child {
                    border-bottom: none;
                }
                
                .nav-cta {
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid var(--gray-100);
                }
            }
            
            body.menu-open {
                overflow: hidden;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Button hover effects
    function initButtonEffects() {
        const buttons = document.querySelectorAll('.btn-primary, .btn-outline');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Initialize button effects
    initButtonEffects();
    
    // Form handling (if forms are added later)
    function initForms() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Add loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    const originalText = submitBtn.textContent;
                    submitBtn.textContent = 'Sending...';
                    submitBtn.disabled = true;
                    
                    // Simulate form submission (replace with actual logic)
                    setTimeout(() => {
                        submitBtn.textContent = 'Sent!';
                        setTimeout(() => {
                            submitBtn.textContent = originalText;
                            submitBtn.disabled = false;
                        }, 2000);
                    }, 1000);
                }
            });
        });
    }
    
    // Initialize forms
    initForms();
    
    // Performance optimization: Debounce scroll events
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
    
    // Apply debouncing to scroll events
    const debouncedScrollHandler = debounce(function() {
        // Any additional scroll-based functionality can go here
    }, 16); // ~60fps
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // ESC key closes mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
    });
    
    // Lazy loading for images (if added later)
    function initLazyLoading() {
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
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Analytics tracking (placeholder)
    function trackEvent(eventName, eventData) {
        console.log('Analytics Event:', eventName, eventData);
        // Replace with actual analytics tracking
        // gtag('event', eventName, eventData);
    }
    
    // Track CTA clicks
    document.querySelectorAll('a[href="#trial"], a[href="#demo"]').forEach(link => {
        link.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            trackEvent('cta_click', {
                button_text: buttonText,
                button_href: this.getAttribute('href')
            });
        });
    });
    
    // Track page views
    trackEvent('page_view', {
        page: 'home',
        timestamp: new Date().toISOString()
    });
    
    console.log('🚀 TuringForce SPA initialized successfully!');
});

// Utility functions
const TuringForce = {
    // Smooth scroll to element
    scrollTo: function(elementId, offset = 80) {
        const element = document.getElementById(elementId);
        if (element) {
            const targetPosition = element.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },
    
    // Show notification (for future use)
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    },
    
    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Check if element is in viewport
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};
