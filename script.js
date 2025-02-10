// Optimize performance with debouncing
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

// Optimize scroll behavior
const scrollToElement = (elementSelector, instance = 0) => {
    const element = document.querySelectorAll(elementSelector)[instance];
    if (!element) return;
    
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
};

// Add performance monitoring
const perfData = window.performance.timing;
const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
console.log(`Page load time: ${pageLoadTime}ms`);

// Optimize image loading
const lazyLoadImages = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
};

// Optimize typing animation
const textLoad = () => {
    const secText = document.querySelector(".sec-text");
    const words = ["Software Engineer", "CG Artist"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typing = () => {
        const currentWord = words[wordIndex];

        // Set color based on current word; use theme's neon magenta for Software Engineer
        if (currentWord === "Software Engineer") {
            secText.style.color = "#ff00ff";
        } else if (currentWord === "CG Artist") {
            secText.style.color = "yellow";
        }

        if (isDeleting) {
            secText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            secText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(typing, 2000); // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typing, 500); // Pause before starting new word
        } else {
            setTimeout(typing, isDeleting ? 50 : 100); // Typing speed
        }
    };

    typing();
};

// Scroll Progress Bar
const progressBar = document.createElement('div');
progressBar.classList.add('progress-bar');
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrolled / maxHeight) * 100;
    progressBar.style.width = progress + '%';
});

// Loading Animation
const loader = document.createElement('div');
loader.classList.add('loader');
loader.innerHTML = '<div class="loader-content"></div>';
document.body.appendChild(loader);

window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1000);
});

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .gallery-item, .section').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// Smooth Scrolling for anchor links
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

// Page Transition Effect
const createPageTransition = () => {
    const transition = document.createElement('div');
    transition.classList.add('page-transition');
    document.body.appendChild(transition);

    document.querySelectorAll('a').forEach(link => {
        if (link.href !== window.location.href && !link.href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                transition.style.transform = 'translateY(0)';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500);
            });
        }
    });
};

createPageTransition();

// Optimize animation frame rate
const optimizeAnimations = () => {
    document.querySelectorAll('.image-strip').forEach(strip => {
        strip.style.willChange = 'transform';
    });
};

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    lazyLoadImages();
    textLoad();
    optimizeAnimations();
    // Add event listeners
    document.querySelector('.nav-links').addEventListener('click', debounce((e) => {
        const link = e.target.closest('.link');
        if (!link) return;
        
        const id = link.id;
        switch(id) {
            case 'link1': scrollToElement('.features'); break;
            case 'link2': scrollToElement('.pricing'); break;
            case 'link3': scrollToElement('footer'); break;
        }
    }, 250));
    
    // Remove loader after content is ready
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
});