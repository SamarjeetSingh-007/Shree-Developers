// Revolutionary Hero & Header JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Preloader functionality - only on website load/reload
    const hasSeenPreloader = sessionStorage.getItem('preloaderShown');
    
    if (!hasSeenPreloader) {
        window.addEventListener('load', function() {
            document.body.classList.add('preloader-active');
            
            function openShutter() {
                const preloader = document.querySelector('.preloader');
                const body = document.body;
                
                if (preloader && !preloader.classList.contains('loaded')) {
                    preloader.classList.add('loaded');
                    body.classList.remove('preloader-active');
                    sessionStorage.setItem('preloaderShown', 'true');
                    
                    setTimeout(() => {
                        if (preloader) {
                            preloader.style.display = 'none';
                        }
                    }, 1200);
                }
            }
            
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.addEventListener('click', openShutter);
                
                document.addEventListener('keydown', function(e) {
                    if ((e.key === 'Enter' || e.key === ' ') && preloader && !preloader.classList.contains('loaded')) {
                        e.preventDefault();
                        openShutter();
                    }
                });
                
                setTimeout(() => {
                    if (preloader && !preloader.classList.contains('loaded')) {
                        openShutter();
                    }
                }, 5000);
            }
        });
    } else {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.display = 'none';
        }
    }
    
    // Revolutionary Hero Background System
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    // Initialize background images
    slides.forEach((slide, index) => {
        const bgUrl = slide.getAttribute('data-bg');
        if (bgUrl) {
            slide.style.backgroundImage = `url('${bgUrl}')`;
        }
    });
    
    function nextSlide() {
        if (slides.length > 0) {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
    }
    
    // Enhanced slideshow with smooth transitions
    if (slides.length > 0) {
        setInterval(nextSlide, 7000);
    }
    
    // Modern Header Scroll Effect
    const header = document.querySelector('.modern-header');
    if (header) {
        let lastScrollY = 0;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }
    
    // Interactive Hero Cards
    const heroCards = document.querySelectorAll('.hero-card');
    heroCards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
        
        card.addEventListener('click', (event) => {
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = card.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = event.clientX - rect.left - size / 2 + 'px';
            ripple.style.top = event.clientY - rect.top - size / 2 + 'px';
            
            card.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Smooth Scroll for Internal Links
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
    
    // Parallax Effect for Hero Elements
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements, .light-rays');
        
        parallaxElements.forEach(element => {
            const speed = element.classList.contains('light-rays') ? 0.1 : 0.3;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
        
        ticking = false;
    }
    
    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestParallaxUpdate);
    
    // Intersection Observer for Animation Triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.hero-card, .stat-item, .hero-badge').forEach(el => {
        observer.observe(el);
    });
    
    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
        
        // Close mobile menu when clicking on nav items
        navMenu.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
    
    // Dynamic Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateCountUp = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }, 20);
    };
    
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                if (!isNaN(target)) {
                    animateCountUp(entry.target, target);
                    statsObserver.unobserve(entry.target);
                }
            }
        });
    });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Initialize contact form functionality
    initializeContactForm();
    
    // Initialize project animations
    initializeProjectAnimations();
});

// Add CSS for interactive effects
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .hero-card {
        position: relative;
        overflow: hidden;
    }
    
    .mobile-menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .mobile-menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .mobile-menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    @media (max-width: 900px) {
        .nav-menu.active {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(20px);
            padding: 2rem;
            gap: 1rem;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            animation: slideDown 0.3s ease-out;
        }
        
        @keyframes slideDown {
            0% {
                opacity: 0;
                transform: translateY(-20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }
`;
document.head.appendChild(style);

// Video Modal Functionality
let video, videoModal, playBtn, progressBar, progressContainer, currentTimeEl, durationEl, volumeBtn, volumeSlider, fullscreenBtn, videoLoading;

function initializeVideoModal() {
    video = document.getElementById('storyVideo');
    videoModal = document.getElementById('videoModal');
    playBtn = document.getElementById('playBtn');
    progressBar = document.getElementById('progressBar');
    progressContainer = document.getElementById('progressContainer');
    currentTimeEl = document.getElementById('currentTime');
    durationEl = document.getElementById('duration');
    volumeBtn = document.getElementById('volumeBtn');
    volumeSlider = document.getElementById('volumeSlider');
    fullscreenBtn = document.getElementById('fullscreenBtn');
    videoLoading = document.getElementById('videoLoading');

    if (!video || !videoModal) {
        console.log('Video modal elements not found');
        return;
    }

    // Video event listeners
    video.addEventListener('loadstart', showLoading);
    video.addEventListener('canplay', hideLoading);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', onVideoEnded);
    video.addEventListener('play', updatePlayButton);
    video.addEventListener('pause', updatePlayButton);

    // Control event listeners
    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (progressContainer) progressContainer.addEventListener('click', setProgress);
    if (volumeBtn) volumeBtn.addEventListener('click', toggleMute);
    if (volumeSlider) volumeSlider.addEventListener('input', setVolume);
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Keyboard controls
    document.addEventListener('keydown', handleKeyPress);
    
    console.log('Video modal initialized successfully');
}

// Make functions available globally for onclick handlers
window.openVideoModal = function() {
    console.log('openVideoModal called');
    
    if (!videoModal) {
        console.log('Video modal not found, initializing...');
        initializeVideoModal();
    }
    
    if (videoModal) {
        console.log('Opening video modal');
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Set video source to your local video
        if (video) {
            console.log('Setting video source');
            // Use your local video with fallback sources
            const sources = [
                'videos/My Video.mp4',
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4'
            ];
            
            // Clear any existing source
            video.src = '';
            
            // Try first source (your local video)
            video.src = sources[0];
            video.load();
            
            // Auto-play when ready
            video.addEventListener('canplay', function() {
                console.log('Video can play, attempting to start');
                video.play().catch(err => {
                    console.log('Auto-play prevented:', err);
                });
            }, { once: true });
            
            // If first source fails, try others
            video.addEventListener('error', function() {
                const currentIndex = sources.indexOf(video.src);
                console.log('Video error, trying next source. Current index:', currentIndex);
                if (currentIndex < sources.length - 1) {
                    video.src = sources[currentIndex + 1];
                    video.load();
                } else {
                    // If all sources fail, show fallback content
                    console.log('All video sources failed to load');
                    hideLoading();
                }
            });
        } else {
            console.log('Video element not found');
        }
    } else {
        console.log('Video modal element not found');
    }
};

window.closeVideoModal = function() {
    console.log('closeVideoModal called');
    
    if (!videoModal) return;
    
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    
    if (video) {
        video.pause();
        video.currentTime = 0;
        updatePlayButton();
    }
};

function closeVideoModal() {
    console.log('closeVideoModal called');
    
    if (!videoModal) return;
    
    videoModal.classList.remove('active');
    document.body.style.overflow = '';
    
    if (video) {
        video.pause();
        video.currentTime = 0;
        updatePlayButton();
    }
}

function showLoading() {
    if (videoLoading) videoLoading.style.display = 'block';
}

function hideLoading() {
    if (videoLoading) videoLoading.style.display = 'none';
}

function togglePlay() {
    if (!video) return;
    
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
    updatePlayButton();
}

function updatePlayButton() {
    if (!playBtn || !video) return;
    
    const icon = playBtn.querySelector('i');
    if (video.paused) {
        icon.className = 'fas fa-play';
    } else {
        icon.className = 'fas fa-pause';
    }
}

function updateDuration() {
    if (!video || !durationEl) return;
    durationEl.textContent = formatTime(video.duration);
}

function updateProgress() {
    if (!video || !progressBar || !currentTimeEl) return;
    
    const progressPercent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = progressPercent + '%';
    currentTimeEl.textContent = formatTime(video.currentTime);
}

function setProgress(e) {
    if (!video || !progressContainer) return;
    
    const rect = progressContainer.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
}

function toggleMute() {
    if (!video || !volumeBtn) return;
    
    video.muted = !video.muted;
    updateVolumeButton();
    
    if (volumeSlider) {
        volumeSlider.value = video.muted ? 0 : video.volume;
    }
}

function updateVolumeButton() {
    if (!volumeBtn || !video) return;
    
    const icon = volumeBtn.querySelector('i');
    if (video.muted || video.volume === 0) {
        icon.className = 'fas fa-volume-mute';
    } else if (video.volume < 0.5) {
        icon.className = 'fas fa-volume-down';
    } else {
        icon.className = 'fas fa-volume-up';
    }
}

function setVolume() {
    if (!video || !volumeSlider) return;
    
    video.volume = volumeSlider.value;
    video.muted = false;
    updateVolumeButton();
}

function toggleFullscreen() {
    if (!video) return;
    
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        video.requestFullscreen().catch(err => {
            console.log('Fullscreen not supported:', err);
        });
    }
}

function onVideoEnded() {
    updatePlayButton();
    if (progressBar) progressBar.style.width = '0%';
    if (currentTimeEl) currentTimeEl.textContent = '0:00';
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function handleKeyPress(e) {
    if (!videoModal || !videoModal.classList.contains('active')) return;
    
    switch(e.key) {
        case ' ':
        case 'k':
            e.preventDefault();
            togglePlay();
            break;
        case 'Escape':
            closeVideoModal();
            break;
        case 'f':
            toggleFullscreen();
            break;
        case 'm':
            toggleMute();
            break;
        case 'ArrowLeft':
            if (video) video.currentTime -= 10;
            break;
        case 'ArrowRight':
            if (video) video.currentTime += 10;
            break;
    }
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (videoModal && e.target === videoModal) {
        closeVideoModal();
    }
});

// Initialize video modal when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit to ensure all elements are loaded
    setTimeout(function() {
        initializeVideoModal();
        initializeProjectTabs();
        initializeProjectAnimations();
        initializeProjectsHero();
    }, 1000);
});

// Projects Hero Background Slideshow
function initializeProjectsHero() {
    const projectsSlides = document.querySelectorAll('.projects-hero-bg .hero-slide');
    let currentProjectSlide = 0;
    
    // Initialize background images for projects hero
    projectsSlides.forEach((slide, index) => {
        const bgUrl = slide.getAttribute('data-bg');
        if (bgUrl) {
            slide.style.backgroundImage = `url('${bgUrl}')`;
        }
    });
    
    function nextProjectSlide() {
        if (projectsSlides.length > 1) {
            projectsSlides[currentProjectSlide].classList.remove('active');
            currentProjectSlide = (currentProjectSlide + 1) % projectsSlides.length;
            projectsSlides[currentProjectSlide].classList.add('active');
        }
    }
    
    // Start slideshow for projects hero
    if (projectsSlides.length > 1) {
        setInterval(nextProjectSlide, 6000);
    }
    
    // Scroll indicator click handler
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const navigationSection = document.querySelector('.project-navigation-enhanced');
            if (navigationSection) {
                navigationSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
    // Animate stats on scroll
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target.querySelector('.stat-number');
                    if (statNumber && !entry.target.classList.contains('animated')) {
                        entry.target.classList.add('animated');
                        animateStatNumber(statNumber);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        statCards.forEach(card => {
            statsObserver.observe(card);
        });
    }
}

// Animate stat numbers
function animateStatNumber(element) {
    const text = element.textContent;
    const hasPlus = text.includes('+');
    const hasPercent = text.includes('%');
    const number = parseInt(text.replace(/[^0-9]/g, ''));
    
    if (!isNaN(number)) {
        let current = 0;
        const increment = number / 30;
        const timer = setInterval(() => {
            current += increment;
            if (current >= number) {
                current = number;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (hasPlus ? '+' : '') + (hasPercent ? '%' : '');
        }, 50);
    }
}

// Project Tabs Functionality
function initializeProjectTabs() {
    // Enhanced tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn-enhanced');
    const projectSections = document.querySelectorAll('.project-section');
    
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Remove active class from all buttons and sections
                tabButtons.forEach(btn => btn.classList.remove('active'));
                projectSections.forEach(section => section.classList.remove('active'));
                
                // Add active class to clicked button and corresponding section
                this.classList.add('active');
                const targetSection = document.getElementById(targetTab);
                if (targetSection) {
                    targetSection.classList.add('active');
                    // Add entrance animation
                    targetSection.style.animation = 'fadeInUp 0.6s ease-out';
                }
            });
        });
    }
    
    // Legacy tab buttons (fallback)
    const legacyTabButtons = document.querySelectorAll('.tab-btn');
    if (legacyTabButtons.length > 0) {
        legacyTabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                legacyTabButtons.forEach(btn => btn.classList.remove('active'));
                projectSections.forEach(section => section.classList.remove('active'));
                
                this.classList.add('active');
                const targetSection = document.getElementById(targetTab);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            });
        });
    }
    
    // Initialize the first active tab on page load
    const activeTab = document.querySelector('.tab-btn-enhanced.active');
    if (activeTab) {
        const targetTab = activeTab.getAttribute('data-tab');
        const targetSection = document.getElementById(targetTab);
        if (targetSection) {
            // Hide all sections first
            projectSections.forEach(section => section.classList.remove('active'));
            // Show the active section
            targetSection.classList.add('active');
        }
    }
}

// Project Cards Animation
function initializeProjectAnimations() {
    const projectCards = document.querySelectorAll('.project-card-premium');
    
    if (projectCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.2
        });
        
        projectCards.forEach(card => {
            observer.observe(card);
        });
    }
}

// Sitemap Modal Functions
function openSitemapModal(imageSrc, title) {
    const modal = document.getElementById('sitemapModal');
    const modalImage = document.getElementById('sitemapImage');
    const modalTitle = document.getElementById('sitemapTitle');
    
    if (modal && modalImage && modalTitle) {
        modalImage.src = imageSrc;
        modalTitle.textContent = title;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeSitemapModal() {
    const modal = document.getElementById('sitemapModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Make sitemap functions globally available
window.openSitemapModal = openSitemapModal;
window.closeSitemapModal = closeSitemapModal;

// Close sitemap modal when clicking outside
document.addEventListener('click', function(e) {
    const sitemapModal = document.getElementById('sitemapModal');
    if (sitemapModal && e.target === sitemapModal) {
        closeSitemapModal();
    }
});

// Enhanced Contact Form Functionality
function initializeContactForm() {
    const contactForm = document.querySelector('.modern-contact-form');
    if (!contactForm) return;

    // Initialize custom dropdowns
    initializeCustomDropdowns();

    // Form validation and submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            phoneNumber: document.getElementById('phoneNumber').value.trim(),
            emailAddress: document.getElementById('emailAddress').value.trim(),
            projectInterest: document.getElementById('projectInterest').value,
            serviceType: document.getElementById('serviceType').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value.trim()
        };

        // Validate required fields
        const requiredFields = ['fullName', 'phoneNumber', 'emailAddress'];
        let isValid = true;
        
        requiredFields.forEach(field => {
            const input = document.getElementById(field);
            const formGroup = input.closest('.form-group');
            
            if (!formData[field]) {
                formGroup.classList.add('error');
                isValid = false;
                
                // Add shake animation
                input.style.animation = 'none';
                setTimeout(() => {
                    input.style.animation = 'errorShake 0.5s ease-in-out';
                }, 10);
            } else {
                formGroup.classList.remove('error');
            }
        });

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailInput = document.getElementById('emailAddress');
        const emailGroup = emailInput.closest('.form-group');
        
        if (formData.emailAddress && !emailRegex.test(formData.emailAddress)) {
            emailGroup.classList.add('error');
            isValid = false;
            showNotification('Please enter a valid email address.', 'error');
        } else if (formData.emailAddress) {
            emailGroup.classList.remove('error');
        }

        // Phone validation
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
        const phoneInput = document.getElementById('phoneNumber');
        const phoneGroup = phoneInput.closest('.form-group');
        
        if (formData.phoneNumber && !phoneRegex.test(formData.phoneNumber)) {
            phoneGroup.classList.add('error');
            isValid = false;
            showNotification('Please enter a valid phone number.', 'error');
        } else if (formData.phoneNumber) {
            phoneGroup.classList.remove('error');
        }

        if (!isValid) {
            showNotification('Please fill in all required fields correctly.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Sending...</span>';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual endpoint)
        setTimeout(() => {
            // Create WhatsApp message
            const whatsappMessage = createWhatsAppMessage(formData);
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`;
            
            // Open WhatsApp
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            showNotification('Message sent successfully! Redirecting to WhatsApp...', 'success');
            
        }, 2000);
    });

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            if (formGroup.classList.contains('error')) {
                validateField(this);
            }
        });

        // Enhanced focus effects for selects
        if (input.tagName === 'SELECT') {
            input.addEventListener('focus', function() {
                const wrapper = this.closest('.custom-select-wrapper');
                if (wrapper) {
                    wrapper.classList.add('focused');
                }
            });

            input.addEventListener('blur', function() {
                const wrapper = this.closest('.custom-select-wrapper');
                if (wrapper) {
                    wrapper.classList.remove('focused');
                }
            });
        }
    });
}

// Initialize custom dropdown enhancements
function initializeCustomDropdowns() {
    const customSelects = document.querySelectorAll('.custom-select');
    
    customSelects.forEach(select => {
        // Add enhanced animations on change
        select.addEventListener('change', function() {
            const arrow = this.parentElement.querySelector('.select-arrow');
            if (arrow) {
                arrow.style.animation = 'none';
                setTimeout(() => {
                    arrow.style.animation = 'iconBounce 0.6s ease';
                }, 10);
            }
            
            // Add success feedback
            if (this.value) {
                const formGroup = this.closest('.form-group');
                formGroup.classList.remove('error');
                formGroup.classList.add('success');
                
                setTimeout(() => {
                    formGroup.classList.remove('success');
                }, 1000);
            }
        });

        // Enhanced keyboard navigation
        select.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                this.click();
            }
        });
    });
}

// Validate individual field
function validateField(field) {
    const formGroup = field.closest('.form-group');
    const value = field.value.trim();
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        formGroup.classList.add('error');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,15}$/;
        if (!phoneRegex.test(value)) {
            formGroup.classList.add('error');
            return false;
        }
    }
    
    formGroup.classList.remove('error');
    return true;
}

// Create WhatsApp message from form data
function createWhatsAppMessage(data) {
    let message = `🏠 *New Inquiry - Shree Developers* 🏠\n\n`;
    message += `👤 *Name:* ${data.fullName}\n`;
    message += `📱 *Phone:* ${data.phoneNumber}\n`;
    message += `📧 *Email:* ${data.emailAddress}\n`;
    
    if (data.projectInterest) {
        const projectNames = {
            'shree-niketan': 'Shree Niketan (Near Dobo Bridge)',
            'shree-kunj': 'Shree Kunj (Marine Drive Road)',
            'shree-marinos': 'Shree Marinos (Ongoing)',
            'upcoming-ds1': 'DS I, Parsidih (Upcoming)',
            'custom': 'Custom Construction'
        };
        message += `🏢 *Project Interest:* ${projectNames[data.projectInterest] || data.projectInterest}\n`;
    }
    
    if (data.serviceType) {
        const serviceNames = {
            'property-purchase': 'Property Purchase',
            'site-visit': 'Site Visit Booking',
            'investment': 'Investment Consultation',
            'construction': 'Construction Services',
            'other': 'Other Inquiry'
        };
        message += `🔧 *Service Required:* ${serviceNames[data.serviceType] || data.serviceType}\n`;
    }
    
    if (data.budget) {
        const budgetRanges = {
            'under-50': 'Under ₹50 Lakh',
            '50-100': '₹50 Lakh - ₹1 Crore',
            '100-150': '₹1 Crore - ₹1.5 Crore',
            'above-150': 'Above ₹1.5 Crore',
            'discuss': 'Discuss with Team'
        };
        message += `💰 *Budget Range:* ${budgetRanges[data.budget] || data.budget}\n`;
    }
    
    if (data.message) {
        message += `💬 *Message:* ${data.message}\n`;
    }
    
    message += `\n⏰ *Sent on:* ${new Date().toLocaleString()}\n`;
    message += `\nThank you for your interest in Shree Developers! 🙏`;
    
    return message;
}

// Show notification
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.form-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}
