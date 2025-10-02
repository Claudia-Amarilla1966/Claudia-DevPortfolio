document.addEventListener("DOMContentLoaded", () => {
    // ===== NAVEGACIÓN RESPONSIVE =====
    const menuHamburguesa = document.querySelector('.menu-hamburguesa');
    const navMenu = document.querySelector('.nav-menu');
    const headerNav = document.querySelector('.header-principal-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Menú hamburguesa
    if (menuHamburguesa) {
        menuHamburguesa.addEventListener('click', function () {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navMenu.classList.remove('active');
            if (menuHamburguesa) {
                menuHamburguesa.classList.remove('active');
            }
        });
    });

    // Efecto scroll en header
    if (headerNav) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                headerNav.classList.add('scrolled');
            } else {
                headerNav.classList.remove('scrolled');
            }
        });
    }

    const textos = [
        "Creo espacios digitales donde la tecnología encuentra la calidez humana.",
        "Cada proyecto es una conversación entre funcionalidad y emociones.",
        "Transformo visiones en realidades digitales con propósito y personalidad."
    ];

    const destino = document.getElementById("texto-destacado");
    const contenedorDestacado = document.querySelector('.destacado');

    // Solo ejecutar si los elementos existen
    if (destino && contenedorDestacado) {
        let textoIndex = 0;
        let i = 0;
        let typingSpeed = 80;
        let typewriterTimeout;
        let isActive = false;

        function resetTypewriter() {
            clearTimeout(typewriterTimeout);
            textoIndex = 0;
            i = 0;
            destino.innerHTML = ''; // Cambiado a innerHTML
        }

        function typeWriter() {
            if (!isActive) return;

            if (textoIndex < textos.length) {
                const currentText = textos[textoIndex];

                if (i < currentText.length) {
                    if (i === 0 && textoIndex > 0) {
                        destino.innerHTML += '<br>'; // Un salto de línea es suficiente
                    }

                    destino.innerHTML += currentText.charAt(i); // Cambiado a innerHTML
                    i++;
                    contenedorDestacado.scrollTop = contenedorDestacado.scrollHeight;
                    typewriterTimeout = setTimeout(typeWriter, typingSpeed);
                } else {
                    textoIndex++;
                    i = 0;
                    typewriterTimeout = setTimeout(typeWriter, 1500);
                }
            } else {
                typewriterTimeout = setTimeout(() => {
                    resetTypewriter();
                    isActive && typeWriter();
                }, 2500);
            }
        }

        contenedorDestacado.addEventListener('mouseenter', () => {
            isActive = true;
            if (!destino.textContent.trim()) {
                typeWriter();
            }
        });

        contenedorDestacado.addEventListener('mouseleave', () => {
            isActive = false;
            resetTypewriter();
        });
    }
});