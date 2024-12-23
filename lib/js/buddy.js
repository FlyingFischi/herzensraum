function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Sichtbarkeit des Buttons beim Scrollen kontrollieren
window.addEventListener('scroll', () => {
const backToTop = document.getElementById('backToTop');
if (window.scrollY > 300) { // Sichtbar ab einer Scrolltiefe von 300px
    backToTop.classList.add('show');
} else {
    backToTop.classList.remove('show');
}
});



    

