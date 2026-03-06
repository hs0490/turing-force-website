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
    // initWorkspaceSwitcher(); // removed - widget deprecated
    
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
    
    // Workspace Switcher functionality
    function initWorkspaceSwitcher() {
        const workspaceSwitcher = document.getElementById('workspace-switcher');
        const workspaceToggle = document.getElementById('workspace-toggle');
        const workspaceDropdown = document.getElementById('workspace-dropdown');
        const workspaceSearchInput = document.getElementById('workspace-search-input');
        const workspaceList = document.getElementById('workspace-list');
        const currentWorkspaceSpan = document.getElementById('current-workspace');
        
        // API configuration - update with your actual API endpoint
        const WORKSPACE_API_BASE = window.WORKSPACE_API_BASE || '/api/workspaces';
        const WORKSPACE_API_ENDPOINTS = {
            list: `${WORKSPACE_API_BASE}`,
            current: `${WORKSPACE_API_BASE}/current`,
            switch: (workspaceId) => `${WORKSPACE_API_BASE}/${workspaceId}/switch`
        };
        
        let workspaces = [];
        let currentWorkspace = null;
        let filteredWorkspaces = [];
        let isLoading = false;
        
        // Fetch workspaces from API
        async function fetchWorkspaces() {
            if (isLoading) return;
            
            isLoading = true;
            showLoadingState();
            
            try {
                const response = await fetch(WORKSPACE_API_ENDPOINTS.list, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // Add authentication header if needed
                        // 'Authorization': `Bearer ${getAuthToken()}`
                    },
                    credentials: 'include' // Include cookies for session-based auth
                });
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch workspaces: ${response.status} ${response.statusText}`);
                }
                
                const data = await response.json();
                
                // Handle different API response formats
                if (Array.isArray(data)) {
                    workspaces = data;
                } else if (data.workspaces && Array.isArray(data.workspaces)) {
                    workspaces = data.workspaces;
                } else if (data.data && Array.isArray(data.data)) {
                    workspaces = data.data;
                } else {
                    throw new Error('Invalid workspace data format');
                }
                
                // Fetch current workspace
                await fetchCurrentWorkspace();
                
                // Update filtered list
                filteredWorkspaces = [...workspaces];
                
                // If no workspaces found, show empty state
                if (workspaces.length === 0) {
                    workspaceList.innerHTML = '<div class="workspace-item" style="justify-content: center; color: var(--gray-500); padding: 2rem; text-align: center;">No workspaces available</div>';
                    currentWorkspaceSpan.textContent = 'No workspace';
                } else {
                    renderWorkspaceList(filteredWorkspaces);
                }
                
            } catch (error) {
                console.error('Error fetching workspaces:', error);
                showErrorState(error.message || 'Unable to connect to workspace API');
            } finally {
                isLoading = false;
            }
        }
        
        // Fetch current workspace from API
        async function fetchCurrentWorkspace() {
            try {
                const response = await fetch(WORKSPACE_API_ENDPOINTS.current, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${getAuthToken()}`
                    },
                    credentials: 'include'
                });
                
                if (response.ok) {
                    const data = await response.json();
                    const workspaceData = data.workspace || data.data || data;
                    
                    // Find matching workspace in the list
                    const found = workspaces.find(w => 
                        w.id === workspaceData.id || 
                        w.workspaceId === workspaceData.id ||
                        w.name === workspaceData.name
                    );
                    
                    if (found) {
                        currentWorkspace = found;
                        currentWorkspaceSpan.textContent = found.name || found.workspaceName || workspaceData.name;
                    } else if (workspaceData.name) {
                        // If workspace not in list, use the API response
                        currentWorkspace = workspaceData;
                        currentWorkspaceSpan.textContent = workspaceData.name;
                    }
                } else {
                    // If no current workspace endpoint, use first workspace or localStorage
                    const savedWorkspace = localStorage.getItem('selectedWorkspace');
                    if (savedWorkspace) {
                        try {
                            const parsed = JSON.parse(savedWorkspace);
                            const found = workspaces.find(w => 
                                w.id === parsed.id || 
                                w.workspaceId === parsed.id ||
                                w.name === parsed.name
                            );
                            if (found) {
                                currentWorkspace = found;
                                currentWorkspaceSpan.textContent = found.name || found.workspaceName;
                            }
                        } catch (e) {
                            console.error('Error parsing saved workspace:', e);
                        }
                    }
                    
                    // Default to first workspace if available
                    if (!currentWorkspace && workspaces.length > 0) {
                        currentWorkspace = workspaces[0];
                        currentWorkspaceSpan.textContent = workspaces[0].name || workspaces[0].workspaceName;
                    }
                }
            } catch (error) {
                console.error('Error fetching current workspace:', error);
                // Fallback to first workspace or localStorage
                if (workspaces.length > 0 && !currentWorkspace) {
                    currentWorkspace = workspaces[0];
                    currentWorkspaceSpan.textContent = workspaces[0].name || workspaces[0].workspaceName;
                }
            }
        }
        
        // Show loading state
        function showLoadingState() {
            workspaceList.innerHTML = '<div class="workspace-item" style="justify-content: center; color: var(--gray-500); padding: 2rem;">Loading workspaces...</div>';
        }
        
        // Show error state
        function showErrorState(message) {
            workspaceList.innerHTML = `<div class="workspace-item" style="justify-content: center; color: var(--error); padding: 2rem; text-align: center;">
                <div style="font-weight: 600; margin-bottom: 0.5rem;">Failed to load workspaces</div>
                <div style="font-size: 0.85rem; margin-top: 0.5rem; color: var(--gray-500);">${message}</div>
                <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.5rem 1rem; background: var(--primary); color: white; border: none; border-radius: var(--radius); cursor: pointer; font-size: 0.9rem;">Retry</button>
            </div>`;
            // Update current workspace display to show error state
            currentWorkspaceSpan.textContent = 'Error';
        }
        
        // Render workspace list
        function renderWorkspaceList(workspacesToRender) {
            workspaceList.innerHTML = '';
            
            if (workspacesToRender.length === 0) {
                workspaceList.innerHTML = '<div class="workspace-item" style="justify-content: center; color: var(--gray-500); padding: 2rem;">No workspaces found</div>';
                return;
            }
            
            workspacesToRender.forEach(workspace => {
                // Handle different workspace object structures
                const workspaceId = workspace.id || workspace.workspaceId;
                const workspaceName = workspace.name || workspace.workspaceName;
                const workspaceRegion = workspace.region || workspace.regionName || workspace.awsRegion || '';
                
                const isActive = currentWorkspace && (
                    (currentWorkspace.id && currentWorkspace.id === workspaceId) ||
                    (currentWorkspace.workspaceId && currentWorkspace.workspaceId === workspaceId) ||
                    (currentWorkspace.name && currentWorkspace.name === workspaceName)
                );
                
                const workspaceItem = document.createElement('div');
                workspaceItem.className = `workspace-item ${isActive ? 'active' : ''}`;
                workspaceItem.setAttribute('data-workspace-id', workspaceId);
                
                workspaceItem.innerHTML = `
                    <div class="workspace-item-check">
                        ${isActive ? '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : ''}
                    </div>
                    <div class="workspace-item-info">
                        <div class="workspace-item-name">${workspaceName}</div>
                        ${workspaceRegion ? `<div class="workspace-item-region">${workspaceRegion}</div>` : ''}
                    </div>
                `;
                
                workspaceItem.addEventListener('click', () => {
                    selectWorkspace(workspace);
                });
                
                workspaceList.appendChild(workspaceItem);
            });
        }
        
        // Select workspace
        async function selectWorkspace(workspace) {
            const workspaceId = workspace.id || workspace.workspaceId;
            const workspaceName = workspace.name || workspace.workspaceName;
            
            // Optimistically update UI
            const previousWorkspace = currentWorkspace;
            currentWorkspace = workspace;
            currentWorkspaceSpan.textContent = workspaceName;
            renderWorkspaceList(filteredWorkspaces);
            
            try {
                // Call API to switch workspace
                const response = await fetch(WORKSPACE_API_ENDPOINTS.switch(workspaceId), {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${getAuthToken()}`
                    },
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    throw new Error(`Failed to switch workspace: ${response.status} ${response.statusText}`);
                }
                
                // Store selected workspace in localStorage
                localStorage.setItem('selectedWorkspace', JSON.stringify(workspace));
                
                // Trigger custom event for workspace change
                const event = new CustomEvent('workspaceChanged', { 
                    detail: { 
                        workspace: workspace,
                        previousWorkspace: previousWorkspace
                    } 
                });
                document.dispatchEvent(event);
                
                closeWorkspaceDropdown();
                
                // Optionally reload the page or refresh data
                // window.location.reload();
                
            } catch (error) {
                console.error('Error switching workspace:', error);
                
                // Revert UI changes on error
                currentWorkspace = previousWorkspace;
                if (currentWorkspace) {
                    currentWorkspaceSpan.textContent = currentWorkspace.name || currentWorkspace.workspaceName;
                }
                renderWorkspaceList(filteredWorkspaces);
                
                // Show error notification
                alert(`Failed to switch workspace: ${error.message}`);
            }
        }
        
        // Toggle dropdown
        function toggleWorkspaceDropdown() {
            // Don't open if still loading or if there's an error
            if (isLoading) {
                return;
            }
            
            // If no workspaces and not in error state, try to fetch again
            if (workspaces.length === 0 && !workspaceList.querySelector('.workspace-item[style*="color: var(--error)"]')) {
                fetchWorkspaces();
                return;
            }
            
            workspaceSwitcher.classList.toggle('active');
        }
        
        // Close dropdown
        function closeWorkspaceDropdown() {
            workspaceSwitcher.classList.remove('active');
            workspaceSearchInput.value = '';
            filteredWorkspaces = [...workspaces];
            renderWorkspaceList(filteredWorkspaces);
        }
        
        // Filter workspaces based on search
        function filterWorkspaces(searchTerm) {
            const term = searchTerm.toLowerCase().trim();
            if (term === '') {
                filteredWorkspaces = [...workspaces];
            } else {
                filteredWorkspaces = workspaces.filter(workspace => {
                    const workspaceName = (workspace.name || workspace.workspaceName || '').toLowerCase();
                    const workspaceRegion = (workspace.region || workspace.regionName || workspace.awsRegion || '').toLowerCase();
                    return workspaceName.includes(term) || workspaceRegion.includes(term);
                });
            }
            renderWorkspaceList(filteredWorkspaces);
        }
        
        // Event listeners
        workspaceToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWorkspaceDropdown();
        });
        
        workspaceSearchInput.addEventListener('input', (e) => {
            filterWorkspaces(e.target.value);
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!workspaceSwitcher.contains(e.target)) {
                closeWorkspaceDropdown();
            }
        });
        
        // Close dropdown on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && workspaceSwitcher.classList.contains('active')) {
                closeWorkspaceDropdown();
            }
        });
        
        // Prevent dropdown from closing when clicking inside
        workspaceDropdown.addEventListener('click', (e) => {
            e.stopPropagation();
        });
        
        // Show initial loading state
        showLoadingState();
        currentWorkspaceSpan.textContent = 'Loading...';
        
        // Fetch workspaces on initialization
        fetchWorkspaces();
        
        // Refresh workspaces when dropdown is opened (optional - for real-time updates)
        workspaceToggle.addEventListener('click', () => {
            if (!workspaceSwitcher.classList.contains('active') && workspaces.length === 0) {
                fetchWorkspaces();
            }
        });
    }
    
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
