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

// Optimize image loading
const lazyLoad = () => {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
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

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    lazyLoad();
    textLoad();
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
});