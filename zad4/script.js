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
