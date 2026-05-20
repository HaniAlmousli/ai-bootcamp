// ============================================
// AI BOOT CAMP — Form Submission to Google Sheets
// ============================================

// SETUP INSTRUCTIONS:
// 1. Go to Google Sheets and create a new spreadsheet
// 2. Add these headers in Row 1:
//    Timestamp | Student First Name | Student Last Name | Student Birthday |
//    Guardian First Name | Guardian Last Name | Guardian Email | Guardian Phone | e-Transfer Sent
// 3. Go to Extensions > Apps Script
// 4. Replace the code with the contents of google-apps-script.js (included in this project)
// 5. Click Deploy > New Deployment > Web App
//    - Execute as: Me
//    - Who has access: Anyone
// 6. Copy the Web App URL and paste it below:

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwEvM9Ev48Dhoj35pvX38MlhkMbnMB3vu55-kOKKqa1gxnCYPHfCozL9pX785XHxn5Z/exec';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const successMessage = document.getElementById('success-message');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        btnText.textContent = 'Submitting...';
        btnLoader.style.display = 'inline-flex';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        const formData = {
            timestamp: new Date().toISOString(),
            studentFirstName: form.studentFirstName.value.trim(),
            studentLastName: form.studentLastName.value.trim(),
            studentBirthday: form.studentBirthday.value,
            guardianFirstName: form.guardianFirstName.value.trim(),
            guardianLastName: form.guardianLastName.value.trim(),
            guardianEmail: form.guardianEmail.value.trim(),
            guardianPhone: form.guardianPhone.value.trim(),
            eTransferSent: form.eTransferSent.value
        };

        // Use a hidden iframe to avoid CORS/redirect issues with Google Apps Script
        const iframe = document.createElement('iframe');
        iframe.name = 'bootcamp-submit-frame';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);

        const hiddenForm = document.createElement('form');
        hiddenForm.method = 'POST';
        hiddenForm.action = GOOGLE_SCRIPT_URL;
        hiddenForm.target = 'bootcamp-submit-frame';
        hiddenForm.style.display = 'none';

        Object.entries(formData).forEach(([key, value]) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            hiddenForm.appendChild(input);
        });

        document.body.appendChild(hiddenForm);
        hiddenForm.submit();

        setTimeout(() => {
            document.body.removeChild(hiddenForm);
            document.body.removeChild(iframe);
            form.style.display = 'none';
            successMessage.style.display = 'block';
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 1500);
    });

    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glance-card, .why-card, .learn-card, .showcase-callout, .form-wrapper').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
