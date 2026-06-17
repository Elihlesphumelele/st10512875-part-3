/* ============================================================
   APEX PROTECT — JS_script.js
   Features:
     1. Active nav link auto-detection
     2. Contact form validation with inline error messages
     3. Toast notification on submit success / failure
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------
       1. AUTO-HIGHLIGHT ACTIVE NAV LINK
       Compares each link's href to the current page filename.
    ---------------------------------------------------------- */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });


    /* ----------------------------------------------------------
       2. CONTACT FORM VALIDATION
    ---------------------------------------------------------- */
    const form = document.querySelector('.contact-form');
    if (!form) return;   // only runs on contact.html

    // Helper: show an error message beneath a field
    function setError(field, msg) {
        field.classList.remove('input-success');
        field.classList.add('input-error');

        let errorEl = field.parentElement.querySelector('.error-msg');
        if (!errorEl) {
            errorEl = document.createElement('span');
            errorEl.classList.add('error-msg');
            field.parentElement.appendChild(errorEl);
        }
        errorEl.textContent = msg;
        errorEl.classList.add('visible');
    }

    // Helper: mark a field as valid
    function setSuccess(field) {
        field.classList.remove('input-error');
        field.classList.add('input-success');

        const errorEl = field.parentElement.querySelector('.error-msg');
        if (errorEl) errorEl.classList.remove('visible');
    }

    // Helper: clear a field's state
    function clearState(field) {
        field.classList.remove('input-error', 'input-success');
        const errorEl = field.parentElement.querySelector('.error-msg');
        if (errorEl) errorEl.classList.remove('visible');
    }

    // Validate full name
    function validateName(field) {
        const val = field.value.trim();
        if (val === '') {
            setError(field, 'Full name is required.');
            return false;
        }
        if (val.length < 2) {
            setError(field, 'Name must be at least 2 characters.');
            return false;
        }
        if (!/^[a-zA-Z\s'-]+$/.test(val)) {
            setError(field, 'Name may only contain letters, spaces, hyphens, or apostrophes.');
            return false;
        }
        setSuccess(field);
        return true;
    }

    // Validate email address
    function validateEmail(field) {
        const val = field.value.trim();
        if (val === '') {
            setError(field, 'Email address is required.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
            setError(field, 'Please enter a valid email address.');
            return false;
        }
        setSuccess(field);
        return true;
    }

    // Validate message
    function validateMessage(field) {
        const val = field.value.trim();
        if (val === '') {
            setError(field, 'Please enter a message.');
            return false;
        }
        if (val.length < 10) {
            setError(field, 'Message must be at least 10 characters.');
            return false;
        }
        setSuccess(field);
        return true;
    }

    // Get form fields
    const nameField    = form.querySelector('#name');
    const emailField   = form.querySelector('#email');
    const messageField = form.querySelector('#msg');

    // Live validation on blur (when user leaves a field)
    if (nameField)    nameField.addEventListener('blur',  () => validateName(nameField));
    if (emailField)   emailField.addEventListener('blur', () => validateEmail(emailField));
    if (messageField) messageField.addEventListener('blur', () => validateMessage(messageField));

    // Clear error styling when user starts re-typing
    [nameField, emailField, messageField].forEach(field => {
        if (field) {
            field.addEventListener('input', () => clearState(field));
        }
    });

    // Full validation on submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameOk  = validateName(nameField);
        const emailOk = validateEmail(emailField);
        const msgOk   = validateMessage(messageField);

        if (nameOk && emailOk && msgOk) {
            // All fields valid — simulate a successful send
            showToast('✅ Message sent! We\'ll be in touch soon.', 'success');
            form.reset();
            [nameField, emailField, messageField].forEach(f => clearState(f));
        } else {
            showToast('⚠️ Please fix the errors above before sending.', 'error');
            // Focus the first invalid field
            const firstInvalid = form.querySelector('.input-error');
            if (firstInvalid) firstInvalid.focus();
        }
    });


    /* ----------------------------------------------------------
       3. TOAST NOTIFICATION
    ---------------------------------------------------------- */
    function showToast(message, type = 'success') {
        // Reuse an existing toast if present
        let toast = document.getElementById('apex-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'apex-toast';
            toast.classList.add('toast');
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.className = `toast ${type}`;          // reset classes then re-add
        toast.classList.add('show');

        clearTimeout(toast._hideTimer);
        toast._hideTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

});
