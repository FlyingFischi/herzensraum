console.log('Setting up cart');  // Debug-Ausgabe --> Vor Veröffentlichung entfernen
console.log("Script loaded");

document.addEventListener('DOMContentLoaded', function () {
    const cartLink = document.getElementById('cart-link');
    if (cartLink) {
        cartLink.addEventListener('click', function (event) {
            event.preventDefault();
            alert('Warenkorb wurde geklickt!');
        });
    }

    function updateCart(productName) {
        alert(productName + ' wurde zum Warenkorb hinzugefügt!');
        const cartItemCount = document.getElementById('cart-item-count');
        const currentCount = parseInt(cartItemCount.innerText);
        cartItemCount.innerText = currentCount + 1;
    }

    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

// Sichtbarkeit des Buttons beim Scrollen kontrollieren
window.addEventListener('scroll', () => {
    const backToTop = document.getElementById('backToTop');  // ID angepasst
    if (window.scrollY > 300) { // Sichtbar ab einer Scrolltiefe von 300px
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});
    
    // JavaScript-Funktion für die Sprachumschaltung
    function translatePage() {
        // Hole das ausgewählte Sprachkürzel aus dem Dropdown-Menü
        var selectedLanguage = document.getElementById('language-select').value;

        // Setze den Sprach-Cookie (optional)
        document.cookie = 'language=' + selectedLanguage;

        // Hole den aktuellen Pfad
        var currentPath = window.location.pathname;
        var newPath;

        // Überprüfe, ob der Pfad bereits die gewählte Sprache enthält
        if (currentPath.startsWith('/' + selectedLanguage + '/')) {
            // Wenn ja, kein weiterer Änderungsbedarf
            newPath = currentPath;
        } else {
            // Andernfalls, ändere den Pfad zur gewählten Sprache
            newPath = '/' + selectedLanguage + currentPath.substring(3);
        }

        // Lade die Seite mit dem neuen Pfad
        window.location.href = newPath;
    }

    // Event-Handler für das Sprachauswahl-Änderungsereignis
    var languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', translatePage);
    }

    $(document).ready(function () {
        console.log('Document ready');  // Debug-Ausgabe --> Vor Veröffentlichung entfernen

        const hamburgerIcon = document.getElementById('hamburger-icon');
        const closeIcon = document.querySelector('.close-icon');
        const overlay = document.getElementById('overlay');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileNav = document.querySelector('#mobile-menu ul');

        function toggleMenu() {
            overlay.classList.toggle('show');
            mobileMenu.classList.toggle('show');
            mobileNav.classList.toggle('show');
        }

        hamburgerIcon.addEventListener('click', toggleMenu);
        closeIcon.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);

        function closeMenu() {
            const overlay = document.getElementById('overlay');
            const mobileMenu = document.getElementById('mobile-menu');

            overlay.classList.remove('show');
            mobileMenu.classList.remove('show');
        }

        var mainImageContainer = document.getElementById('main-image-container');
        var mainImage = document.getElementById('main-image');

        function handleMouseOver() {
            if (window.innerWidth > 600 && window.innerHeight > 600) {
                mainImageContainer.style.cursor = 'zoom-in';
            }
        }
        
        function handleImageClick() {
            if (window.innerWidth > 600 && window.innerHeight > 600) {
                var currentTransform = mainImage.style.transform;
        
                if (currentTransform === 'scale(2)') {
                    mainImage.style.transition = 'transform 1s ease';
                    mainImage.style.transform = 'scale(1)';
                    mainImage.style.position = 'static';
                    mainImage.style.zIndex = '1';
                    mainImage.style.maxWidth = 'none';
                    mainImage.style.maxHeight = 'none';
                    mainImage.style.overflow = 'hidden'; // Deaktiviere das Scrollen bei Zoom-Out
                } else {
                    mainImage.style.transition = 'transform 1s ease';
                    mainImage.style.transform = 'scale(2)';
                    mainImage.style.position = 'absolute';
                    mainImage.style.top = '30%';
                    mainImage.style.left = '5%';
                    mainImage.style.transformOrigin = 'center center';
                    mainImage.style.zIndex = '2';
                    mainImage.style.maxWidth = '300px';
                    mainImage.style.maxHeight = '500px';
                    mainImage.style.overflow = 'auto'; // Erlaube das Scrollen bei Zoom-In
                }
            }
        }
        

        if (mainImageContainer && window.innerWidth > 600 && window.innerHeight > 600) {
            mainImageContainer.addEventListener('mouseover', handleMouseOver);
            mainImageContainer.addEventListener('click', handleImageClick);
        } else if (mainImageContainer) {
            mainImageContainer.style.cursor = 'auto'; // Kein Zoom-In in der mobilen Ansicht
        }

        $.get('gallery.html', function (data) {
            var references = [];
            $(data).find('.shop-item-name').each(function () {
                references.push($(this).text());
            });
            references.sort();
            var dropdown = $('#reference');
            $.each(references, function (index, value) {
                dropdown.append($('<option>').text(value));
            });
        });

        var currentPagePath = window.location.pathname;
        console.log('Actual path:', currentPagePath);

        var imageNameMatch = "/images_bodi/bild1.jpeg".match(/\/images_bodi\/bild(\d+)\.jpeg/);
        if (!imageNameMatch) {
            console.error('Image name not found in path. Actual path:', currentPagePath);
            return;
        }

        var imageName = imageNameMatch[1];
        console.log('Image name:', imageName);

        $(".navigation-link").on("click", function () {
            var matchResult = window.location.pathname.match(/\/bild(\d+)\.html/i);

            if (matchResult) {
                var currentPageIndex = parseInt(matchResult[1]);
                var direction = $(this).data("direction");
                var newPageIndex = direction === "next" ? currentPageIndex + 1 : currentPageIndex - 1;

                if (newPageIndex >= 1 && newPageIndex <= 38) {
                    var newPageUrl = "bild" + newPageIndex + ".html";
                    window.location.href = newPageUrl;
                }
            } else {
                console.error('Unable to extract page index from URL:', window.location.pathname);
            }
        });
    });
});
