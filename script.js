// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const registrationForm = document.querySelector('.registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show success message (placeholder)
            alert('Thank you for your registration! We will contact you soon.');
            
            // Reset form
            this.reset();
        });
    }

    // Add click handlers for register buttons
    document.querySelectorAll('.register-btn').forEach(button => {
        button.addEventListener('click', function() {
            const registrationSection = document.querySelector('.registration-section');
            if (registrationSection) {
                registrationSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Removed custom download button interception so links behave normally

    // Add animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.nav-card, .semester-card, .event-card, .about-card, .contact-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run on page load

    // Firebase Events Loading
    async function loadEvents() {
        try {
            // Check if Firebase is available
            if (!window.db) {
                console.error('Firebase not initialized');
                showNoEvents();
                return;
            }

            const eventsRef = collection(window.db, 'events');
            const q = query(eventsRef, orderBy('date', 'desc'));
            const querySnapshot = await getDocs(q);
            
            const events = [];
            querySnapshot.forEach((doc) => {
                events.push({ id: doc.id, ...doc.data() });
            });

            if (events.length === 0) {
                showNoEvents();
            } else {
                displayEvents(events);
            }
        } catch (error) {
            console.error('Error loading events:', error);
            showNoEvents();
        }
    }

    function showNoEvents() {
        document.getElementById('loading-events').style.display = 'none';
        document.getElementById('no-events').style.display = 'block';
        document.getElementById('events-grid').style.display = 'none';
    }

    function displayEvents(events) {
        const eventsGrid = document.getElementById('events-grid');
        const loadingEvents = document.getElementById('loading-events');
        const noEvents = document.getElementById('no-events');

        loadingEvents.style.display = 'none';
        noEvents.style.display = 'none';
        eventsGrid.style.display = 'grid';

        eventsGrid.innerHTML = events.map(event => `
            <div class="event-card">
                <div class="event-image">
                    <img src="${event.imageUrl || 'https://via.placeholder.com/400x200/1A2333/FFB15E?text=Event+Image'}" alt="${event.title}">
                </div>
                <div class="event-content">
                    <h3>${event.title}</h3>
                    <div class="event-date">
                        <i class="fas fa-calendar-alt"></i> ${formatDate(event.date)}
                        ${event.time ? `<br><i class="fas fa-clock"></i> ${event.time}` : ''}
                        ${event.location ? `<br><i class="fas fa-map-marker-alt"></i> ${event.location}` : ''}
                    </div>
                    <p>${event.description}</p>
                    ${event.registrationUrl ? `<a href="${event.registrationUrl}" class="register-btn" target="_blank" rel="noopener noreferrer">Register Now</a>` : ''}
                </div>
            </div>
        `).join('');

        // Re-run animation for new elements
        setTimeout(animateOnScroll, 100);
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Load events when page loads
    if (window.location.pathname.includes('events.html')) {
        // Wait for Firebase to initialize
        setTimeout(loadEvents, 1000);
    }

    // Add CSS animation class
    const style = document.createElement('style');
    style.textContent = `
        .nav-card, .semester-card, .event-card, .about-card, .contact-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .nav-card.animate, .semester-card.animate, .event-card.animate, .about-card.animate, .contact-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});

// Hamburger menu animation
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
});

// Add hamburger animation styles
const hamburgerStyles = document.createElement('style');
hamburgerStyles.textContent = `
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(hamburgerStyles);