
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

// Project Type Selection
const projectTypeCards = document.querySelectorAll('.project-type-card');
const selectedProjectTypeInput = document.getElementById('selectedProjectType');

projectTypeCards.forEach(card => {
    card.addEventListener('click', () => {
        // Remove selected from all
        projectTypeCards.forEach(c => c.classList.remove('selected'));
        
        // Add selected to clicked
        card.classList.add('selected');
        
        // Store value
        const type = card.getAttribute('data-type');
        selectedProjectTypeInput.value = type;
        
        lucide.createIcons();
    });
});

// Bulk Order Logic
function checkBulk() {
    const quantityInput = document.getElementById('orderQuantity');
    const financeDiv = document.getElementById('financeOption');
    const quantity = parseInt(quantityInput.value) || 0;
    
    if(quantity >= 5) {
        financeDiv.style.display = 'block';
    } else {
        financeDiv.style.display = 'none';
    }
}

// Payment Method Logic
const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
const emiDetailsDiv = document.getElementById('emiDetails');
const emiDurationSelect = document.getElementById('emiDuration');

paymentMethodRadios.forEach(radio => {
    radio.addEventListener('change', function() {
        if(this.value === 'emi' || this.value === 'finance') {
            emiDetailsDiv.style.display = 'block';
            emiDurationSelect.required = true;
        } else {
            emiDetailsDiv.style.display = 'none';
            emiDurationSelect.required = false;
            emiDurationSelect.value = '';
        }
    });
});

// File Upload Logic
const fileUploadArea = document.getElementById('fileUploadArea');
const fileInput = document.getElementById('fileInput');
const fileList = document.getElementById('fileList');
let uploadedFiles = [];

fileUploadArea.addEventListener('click', () => {
    fileInput.click();
});

// Drag and Drop
fileUploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileUploadArea.style.borderColor = 'var(--accent-blue)';
    fileUploadArea.style.background = 'rgba(49, 130, 206, 0.05)';
});

fileUploadArea.addEventListener('dragleave', () => {
    fileUploadArea.style.borderColor = 'var(--border-color)';
    fileUploadArea.style.background = 'transparent';
});

fileUploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    fileUploadArea.style.borderColor = 'var(--border-color)';
    fileUploadArea.style.background = 'transparent';
    
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    handleFiles(files);
});

function handleFiles(files) {
    for (let file of files) {
        // Check file size (10MB limit)
        if (file.size > 10 * 1024 * 1024) {
            alert(`File "${file.name}" is too large. Maximum size is 10MB.`);
            continue;
        }
        
        // Check file type
        const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
        if (!validTypes.includes(file.type)) {
            alert(`File "${file.name}" is not a valid format. Please upload PNG, JPG, or PDF files.`);
            continue;
        }
        
        uploadedFiles.push(file);
    }
    
    displayFiles();
}

function displayFiles() {
    if (uploadedFiles.length === 0) {
        fileList.classList.remove('active');
        return;
    }
    
    fileList.classList.add('active');
    fileList.innerHTML = '';
    
    uploadedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
            <span>${file.name} (${formatFileSize(file.size)})</span>
            <i data-lucide="x" onclick="removeFile(${index})"></i>
        `;
        fileList.appendChild(fileItem);
    });
    
    lucide.createIcons();
}

function removeFile(index) {
    uploadedFiles.splice(index, 1);
    displayFiles();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Make removeFile function global
window.removeFile = removeFile;

// Form Submission
const enquiryForm = document.getElementById('projectEnquiryForm');

enquiryForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate project type
    if (!selectedProjectTypeInput.value) {
        alert('Please select a project type');
        return;
    }
    
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = 'TRANSMITTING... <i data-lucide="loader" style="width: 18px; height: 18px; animation: spin 1s linear infinite;"></i>';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    // Collect form data
    const formData = new FormData(enquiryForm);
    const data = Object.fromEntries(formData.entries());
    data.files = uploadedFiles.map(f => f.name);
    
    console.log('Enquiry submitted:', data);
    console.log('Uploaded files:', uploadedFiles);

    // ✅ GOOGLE ADS CONVERSION TRACKING - Replace with your actual conversion ID
    if (typeof gtag !== 'undefined') {
        gtag('event', 'conversion', {
            'send_to': 'AW-XXXXXXXXXX/YYYYYYYYYY', // Replace with your conversion label
            'value': 1.0,
            'currency': 'INR',
            'transaction_id': ''
        });
        gtag('event', 'generate_lead', {
            'event_category': 'Form Submission',
            'event_label': 'Enquiry Form'
        });
    }

    // Simulate API call
    setTimeout(() => {
        alert('Enquiry Received Successfully! ✅\n\nThank you for your enquiry. Our team will review your project details and get back to you within 24 hours with suitable craftsmen matches.');
        
        btn.innerHTML = originalText;
        btn.style.opacity = '1';
        btn.disabled = false;
        
        // Reset form
        enquiryForm.reset();
        selectedProjectTypeInput.value = '';
        projectTypeCards.forEach(c => c.classList.remove('selected'));
        uploadedFiles = [];
        displayFiles();
        checkBulk();
        
        lucide.createIcons();
    }, 2000);
});
