// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
        
        // Close mobile menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            });
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Contact Form Submission with EmailJS
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show sending message
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'form-status';
            formStatus.style.display = 'block';
            
            // Define your EmailJS Service ID and Template ID
            const serviceID = 'service_c2z4dn5';
            const templateID = 'template_nqrl8ag';
            
            // Send the form data using EmailJS
            emailjs.sendForm(serviceID, templateID, this)
                .then(function() {
                    // Success message
                    formStatus.textContent = 'Thank you! Your message has been sent.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                    
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }, function(error) {
                    // Error message
                    formStatus.textContent = 'Oops! Something went wrong. Please try again.';
                    formStatus.className = 'form-status error';
                });
        });
    }
    
    // Window Size Selector Functionality
    const sizeSelector = document.getElementById('window-size');
    const dynamicPrice = document.getElementById('dynamic-price');
    
    if (sizeSelector && dynamicPrice) {
        // Update price when size changes
        sizeSelector.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const price = selectedOption.getAttribute('data-price');
            
            if (price === 'quote') {
                dynamicPrice.textContent = 'Get Quote';
                dynamicPrice.style.color = '#d32f2f';
            } else {
                dynamicPrice.textContent = 'R' + price;
                dynamicPrice.style.color = '';
            }
        });
    }
    
    // Smooth scrolling for "Get a Quote" link
    document.querySelectorAll('.quote-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            
            // Auto-select "Windows" in the contact form
            const productSelect = document.getElementById('product_interest');
            if (productSelect) {
                productSelect.value = 'Windows';
            }
        });
    });
    
    // Video Play Functionality
    const videoContainers = document.querySelectorAll('.video-thumbnail-container');
    videoContainers.forEach(container => {
        container.style.cursor = 'pointer';
        container.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video-id');
            const iframe = document.createElement('iframe');
            iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
            iframe.setAttribute('frameborder', '0');
            iframe.setAttribute('allowfullscreen', 'true');
            iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.position = 'absolute';
            iframe.style.top = '0';
            iframe.style.left = '0';
            this.innerHTML = '';
            this.appendChild(iframe);
        });
    });
});