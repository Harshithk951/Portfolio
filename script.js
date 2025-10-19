window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 1500);
});

const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const roleText = document.querySelector('.role-text');
const sections = document.querySelectorAll('section[id]');
const skillFills = document.querySelectorAll('.skill-fill');
const scrollProgress = document.getElementById('scrollProgress');
const scrollTop = document.getElementById('scrollTop');
const customCursor = document.getElementById('customCursor');
const cursorDot = document.getElementById('cursorDot');

document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
});

const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .cert-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        customCursor.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hover');
    });
});

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    document.getElementById('scrollProgress').style.width = scrollPercentage + '%';
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    updateActiveNav();
    animateSkills();
    animateOnScroll();
});

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 60;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

const roles = [
    'AI Enthusiast',
    'ML Learner',
    'React Developer',
    'Full-Stack Developer',
    'Problem Solver'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        roleText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        roleText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    let typingSpeed = isDeleting ? 50 : 100;
    
    if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeRole, typingSpeed);
}

setTimeout(typeRole, 1000);

function animateSkills() {
    skillFills.forEach(fill => {
        const rect = fill.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom >= 0;
        
        if (isVisible && fill.style.width === '') {
            const width = fill.getAttribute('data-width');
            setTimeout(() => {
                fill.style.width = width + '%';
            }, 200);
        }
    });
}

function updateActiveNav() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
    
    if (scrollY < 100) {
        navLinks.forEach(link => link.classList.remove('active'));
        document.querySelector('.nav-link[href="#home"]').classList.add('active');
    }
}

function animateOnScroll() {
    const sectionsToAnimate = document.querySelectorAll('.section');
    sectionsToAnimate.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible) {
            section.classList.add('visible');
        }
    });

    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !item.classList.contains('animate')) {
            item.classList.add('animate');
        }
    });

    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        const rect = category.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !category.classList.contains('animate')) {
            category.style.animationDelay = `${index * 0.2}s`;
            category.classList.add('animate');
        }
    });

    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !item.classList.contains('animate')) {
            item.classList.add('animate');
        }
    });

    const certCards = document.querySelectorAll('.cert-card');
    certCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !card.classList.contains('animate')) {
            card.style.animationDelay = `${index * 0.15}s`;
            card.classList.add('animate');
        }
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !card.classList.contains('animate')) {
            card.style.animationDelay = `${index * 0.15}s`;
            card.classList.add('animate');
        }
    });

    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !card.classList.contains('animate')) {
            card.classList.add('animate');
        }
    });

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const rect = contactForm.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !contactForm.classList.contains('animate')) {
            contactForm.classList.add('animate');
        }
    }
}

window.addEventListener('load', () => {
    animateSkills();
    updateActiveNav();
    animateOnScroll();
});

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - scrolled / 600;
    }
});

const contactFormElement = document.querySelector('.contact-form');
if (contactFormElement) {
    contactFormElement.addEventListener('submit', function(e) {
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ef4444';
                setTimeout(() => {
                    input.style.borderColor = '';
                }, 2000);
            }
        });
        
        if (!isValid) {
            e.preventDefault();
        }
    });
}

console.log('%c👋 Welcome to my Portfolio!', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cDesigned & Developed by Harshith Kumar Mannepally', 'color: #64748b; font-size: 12px;');
console.log('%cInterested in the code? Check out my GitHub! 🚀', 'color: #0ea5e9; font-size: 12px;');

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        animateOnScroll();
    }, 100);
});