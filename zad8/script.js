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
        const formData = new FormData(contactForm);

        fetch('https://webhook.site/94fcc1f5-8fbf-4f79-9060-7b4ebb6eba9b', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                successMessage.style.display = 'block';
                contactForm.reset();
            } else {
                alert('Wystąpił problem z wysłaniem wiadomości.');
            }
        })
        .catch(error => {
            console.error('Błąd:', error);
            alert('Wystąpił błąd sieci.');
        });
    }
});

fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const skillsList = document.getElementById('skills-list');
        data.skills.forEach(skill => {
            const li = document.createElement('li');
            li.innerText = skill;
            skillsList.appendChild(li);
        });

        const projectsContainer = document.getElementById('projects-container');
        data.projects.forEach(project => {
            const div = document.createElement('div');
            div.className = 'project';
            div.innerHTML = `<p><strong>${project.title}</strong> — ${project.description}</p>`;
            projectsContainer.appendChild(div);
        });
    })
    .catch(error => console.error(error));

const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note-btn');
const notesList = document.getElementById('notes-list');

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('cv-notes')) || [];
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.className = 'note-item';
        li.innerHTML = `
            <span>${note}</span>
            <button class="delete-btn" data-index="${index}">Usuń</button>
        `;
        notesList.appendChild(li);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            deleteNote(this.getAttribute('data-index'));
        });
    });
}

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText !== '') {
        const notes = JSON.parse(localStorage.getItem('cv-notes')) || [];
        notes.push(noteText);
        localStorage.setItem('cv-notes', JSON.stringify(notes));
        noteInput.value = '';
        loadNotes();
    }
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('cv-notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('cv-notes', JSON.stringify(notes));
    loadNotes();
}

addNoteBtn.addEventListener('click', addNote);
loadNotes();
