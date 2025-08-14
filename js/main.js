// Preloader functionality - only on website load/reload
document.addEventListener('DOMContentLoaded', function() {
    // Check if this is a fresh page load (not navigation)
    const hasSeenPreloader = sessionStorage.getItem('preloaderShown');
    
    if (!hasSeenPreloader) {
        // Ensure page is fully loaded before showing preloader
        window.addEventListener('load', function() {
            // Add preloader active class to body
            document.body.classList.add('preloader-active');
            
            // Function to open shutter (remove preloader)
            function openShutter() {
                const preloader = document.querySelector('.preloader');
                const body = document.body;
                
                if (preloader && !preloader.classList.contains('loaded')) {
                    // Add loaded class for animation
                    preloader.classList.add('loaded');
                    body.classList.remove('preloader-active');
                    
                    // Set flag that preloader has been shown in this session
                    sessionStorage.setItem('preloaderShown', 'true');
                    
                    // Remove preloader from DOM after animation completes
                    setTimeout(() => {
                        if (preloader) {
                            preloader.style.display = 'none';
                        }
                    }, 1200); // Match the CSS transition duration
                }
            }
            
            // Add click event listener to the entire preloader
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.addEventListener('click', function(e) {
                    e.preventDefault();
                    openShutter();
                });
            }
            
            // Add keyboard support (Enter or Space key)
            document.addEventListener('keydown', function(e) {
                if ((e.key === 'Enter' || e.key === ' ') && preloader && !preloader.classList.contains('loaded')) {
                    e.preventDefault();
                    openShutter();
                }
            });
            
            // Optional: Auto-open after 5 seconds if user doesn't interact
            setTimeout(() => {
                if (preloader && !preloader.classList.contains('loaded')) {
                    openShutter();
                }
            }, 5000);
        });
    } else {
        // Remove preloader if it has already been shown in this session
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
    
    // Hero Background Slideshow with enhanced transitions
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 6 seconds for better viewing
    if (slides.length > 0) {
        setInterval(nextSlide, 6000);
        
        // Add random slide order
        const slideOrder = [...Array(slides.length).keys()].sort(() => Math.random() - 0.5);
        let orderIndex = 0;
        
        function nextRandomSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = slideOrder[orderIndex];
            orderIndex = (orderIndex + 1) % slideOrder.length;
            slides[currentSlide].classList.add('active');
        }
        
        // Use random slide order after initial cycles
        setTimeout(() => {
            setInterval(nextRandomSlide, 6000);
        }, slides.length * 6000);
    }
    
    // Add parallax effect to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            heroContent.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Add typewriter effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        function typeWriter() {
            if (i < titleText.length) {
                heroTitle.textContent += titleText.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typewriter effect after a delay
        setTimeout(typeWriter, 1000);
    }
    
    // Add floating animation to hero features on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.hero-feature').forEach(feature => {
        observer.observe(feature);
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add active class to current nav item
const currentLocation = location.href;
const menuItems = document.querySelectorAll('.nav-links a');
menuItems.forEach(item => {
    if(item.href === currentLocation) {
        item.classList.add('active');
    }
});

// Show/hide navbar on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.style.top = "0";
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.style.top = "-80px";
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.style.top = "0";
    }
    
    lastScroll = currentScroll;
});
