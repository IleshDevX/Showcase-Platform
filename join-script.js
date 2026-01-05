
// Initialize Icons
lucide.createIcons();

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    toggleMenu();
});

function toggleMenu() {
    navLinks.classList.toggle('active');
    const icon = navLinks.classList.contains('active') ? 'x' : 'menu';
    mobileMenuBtn.innerHTML = `<i data-lucide="${icon}"></i>`;
    lucide.createIcons();
}

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if(navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Loader
window.onload = () => {
    setTimeout(() => {
        document.getElementById('loader').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loader').style.display = 'none';
        }, 500);
    }, 800);
};

// Role Selection
const roleCards = document.querySelectorAll('.role-card');
const selectedRoleInput = document.getElementById('selectedRole');

roleCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected from all
        roleCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected to clicked
        card.classList.add('selected');
        
        // Store value
        const role = card.getAttribute('data-role');
        selectedRoleInput.value = role;
        
        lucide.createIcons();
    });
});

// Form Validation and Submission
const joinForm = document.getElementById('joinApplicationForm');

joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate role selection
    if (!selectedRoleInput.value) {
        alert('Please select a role');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }

    // Validate all required fields
    const requiredFields = joinForm.querySelectorAll('[required]');
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            alert('Please fill in all required fields');
            field.focus();
            field.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
    }

    const btn = e.submitter;
    const originalHTML = btn.innerHTML;
    
    btn.innerHTML = '<i data-lucide="loader" style="width: 20px; height: 20px; animation: spin 1s linear infinite;"></i> SUBMITTING...';
    btn.style.opacity = '0.7';
    btn.disabled = true;
    lucide.createIcons();

    // Collect form data
    const formData = new FormData(joinForm);
    const data = Object.fromEntries(formData.entries());
    
    console.log('Application submitted:', data);

    // ✅ GOOGLE ADS CONVERSION TRACKING - Replace with your actual conversion ID
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-XXXXXXXXXX/ZZZZZZZZZZ', // Replace with your join conversion label
            'value': 1.0,
            'currency': 'INR'
        });
        gtag('event', 'sign_up', {
            'event_category': 'Form Submission',
            'event_label': 'Join Application'
        });
    }

    // Simulate API call
    setTimeout(() => {
        alert('Application Submitted Successfully! ✅\n\nThank you for joining our community. We will review your application and contact you within 48 hours.');
        
        btn.innerHTML = originalHTML;
        btn.style.opacity = '1';
        btn.disabled = false;
        lucide.createIcons();
        
        // Reset form
        joinForm.reset();
        selectedRoleInput.value = '';
        roleCards.forEach(c => c.classList.remove('selected'));
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
});

