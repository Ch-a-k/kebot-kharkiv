document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Header scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Chatbot functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chat-input input');
    const sendMessage = document.querySelector('.send-message');
    const chatMessages = document.querySelector('.chat-messages');

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.add('active');
    });

    closeChat.addEventListener('click', () => {
        chatbotContainer.classList.remove('active');
    });

    const appendMessage = (message, isUser = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isUser ? 'user-message' : 'bot-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const handleUserMessage = (message) => {
        appendMessage(message, true);
        
        // Simple bot responses based on keywords
        const responses = {
            'привіт': 'Вітаю! Як я можу вам допомогти?',
            'запис': 'Щоб записатися на прийом, будь ласка, зателефонуйте за номером +380 XX XXX XXXX або натисніть кнопку "Записатися" вгорі сторінки.',
            'ціни': 'Ціни на наші послуги варіюються залежно від процедури. Рекомендуємо проконсультуватися з лікарем для отримання точної інформації.',
            'час': 'Ми працюємо з понеділка по п\'ятницю з 9:00 до 20:00, у суботу з 10:00 до 18:00.',
            'адреса': 'Ми знаходимося за адресою: 123 Стоматологічна вулиця, Харків'
        };

        setTimeout(() => {
            let botResponse = 'Вибачте, я не зрозумів ваше питання. Спробуйте запитати про запис на прийом, ціни, графік роботи або нашу адресу.';
            
            for (let keyword in responses) {
                if (message.toLowerCase().includes(keyword)) {
                    botResponse = responses[keyword];
                    break;
                }
            }
            
            appendMessage(botResponse);
        }, 500);
    };

    sendMessage.addEventListener('click', () => {
        const message = chatInput.value.trim();
        if (message) {
            handleUserMessage(message);
            chatInput.value = '';
        }
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = chatInput.value.trim();
            if (message) {
                handleUserMessage(message);
                chatInput.value = '';
            }
        }
    });

    // Mobile Menu
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuClose = document.querySelector('.menu-close');

    if (!menuToggle || !mobileMenu || !menuClose) {
        console.error('Menu elements not found');
        return;
    }

    // Toggle menu function
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    // Open menu
    menuToggle.addEventListener('click', () => {
        toggleMenu();
    });

    // Close menu
    menuClose.addEventListener('click', () => {
        toggleMenu();
    });

    // Close menu when clicking links
    const menuLinks = mobileMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Testimonials Slider
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonials = document.querySelectorAll('.testimonial');

    // Clone testimonials for infinite scroll
    testimonials.forEach(testimonial => {
        const clone = testimonial.cloneNode(true);
        testimonialsTrack.appendChild(clone);
    });

    // Pause animation on hover
    testimonialsTrack.addEventListener('mouseenter', () => {
        testimonialsTrack.style.animationPlayState = 'paused';
    });

    testimonialsTrack.addEventListener('mouseleave', () => {
        testimonialsTrack.style.animationPlayState = 'running';
    });

    // Reset position when animation ends
    testimonialsTrack.addEventListener('animationend', () => {
        testimonialsTrack.style.animation = 'none';
        testimonialsTrack.offsetHeight; // Trigger reflow
        testimonialsTrack.style.animation = 'slide 30s linear infinite';
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.service-card, .tech-item, .team-card').forEach(el => {
        observer.observe(el);
    });
});
