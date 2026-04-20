const themeBtn = document.getElementById('theme-toggle-btn');
const themeStyle = document.getElementById('theme-style');

themeBtn.addEventListener('click', function() {
    if (themeStyle.getAttribute('href') === 'red.css') {
        themeStyle.setAttribute('href', 'green.css');
        themeBtn.innerText = 'Zmień motyw na czerwony';
    } else {
        themeStyle.setAttribute('href', 'red.css');
        themeBtn.innerText = 'Zmień motyw na zielony';
    }
});

const sectionBtn = document.getElementById('section-toggle-btn');
const projectsSection = document.getElementById('projects-section');

sectionBtn.addEventListener('click', function() {
    if (projectsSection.style.display === 'none') {
        projectsSection.style.display = 'block';
        sectionBtn.innerText = 'Ukryj projekty';
    } else {
        projectsSection.style.display = 'none';
        sectionBtn.innerText = 'Pokaż projekty';
    }
});

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(event) {
    event.preventDefault();

    let isValid = true;

    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const fnameError = document.getElementById('fname-error');
    const lnameError = document.getElementById('lname-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const successMessage = document.getElementById('success-message');

    fnameError.innerText = '';
    lnameError.innerText = '';
    emailError.innerText = '';
    messageError.innerText = '';
    successMessage.style.display = 'none';

    const nameRegex = /\d/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (fname === '') {
        fnameError.innerText = 'Imię jest wymagane.';
        isValid = false;
    } else if (nameRegex.test(fname)) {
        fnameError.innerText = 'Imię nie może zawierać cyfr.';
        isValid = false;
    }

    if (lname === '') {
        lnameError.innerText = 'Nazwisko jest wymagane.';
        isValid = false;
    } else if (nameRegex.test(lname)) {
        lnameError.innerText = 'Nazwisko nie może zawierać cyfr.';
        isValid = false;
    }

    if (email === '') {
        emailError.innerText = 'E-mail jest wymagany.';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        emailError.innerText = 'Podaj poprawny adres e-mail.';
        isValid = false;
    }

    if (message === '') {
        messageError.innerText = 'Wiadomość jest wymagana.';
        isValid = false;
    }

    if (isValid) {
        successMessage.style.display = 'block';
        contactForm.reset();
    }
});
