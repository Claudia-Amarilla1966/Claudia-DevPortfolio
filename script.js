document.addEventListener("DOMContentLoaded", () => {
    // ===== CONSTANTES Y VARIABLES GLOBALES =====
    const DOM_ELEMENTS = {
        menuHamburguesa: document.querySelector('.menu-hamburguesa'),
        navMenu: document.querySelector('.nav-menu'),
        headerNav: document.querySelector('.header-principal-nav'),
        navLinks: document.querySelectorAll('.nav-link'),
        textoDestacado: document.getElementById("texto-destacado"),
        contenedorDestacado: document.querySelector('.destacado'),
        selectAsunto: document.getElementById('asunto-futurista')
    };

    // ===== CONFIGURACIONES =====
    const CONFIG = {
        textos: [
            "Creo espacios digitales donde la tecnología encuentra la calidez humana.",
            "Cada proyecto es una conversación entre funcionalidad y emociones.",
            "Transformo visiones en realidades digitales con propósito y personalidad."
        ],
        typingSpeed: 80,
        pauseBetweenTexts: 1500,
        finalPause: 2500,
        scrollThreshold: 50
    };

    // ===== ESTADO DE LA APLICACIÓN =====
    const APP_STATE = {
        typewriter: {
            textoIndex: 0,
            charIndex: 0,
            timeoutId: null,
            isActive: false
        },
        scroll: {
            ticking: false
        }
    };

    // ===== NAVEGACIÓN RESPONSIVE =====
    function initNavigation() {
        const { menuHamburguesa, navMenu, navLinks, headerNav } = DOM_ELEMENTS;

        // Menú hamburguesa
        if (menuHamburguesa) {
            menuHamburguesa.addEventListener('click', toggleMobileMenu);
        }

        // Cerrar menú al hacer clic en enlaces
        navLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Efecto scroll en header con throttling
        if (headerNav) {
            window.addEventListener('scroll', handleScroll);
        }
    }

    function toggleMobileMenu() {
        const { navMenu } = DOM_ELEMENTS;
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    function closeMobileMenu() {
        const { menuHamburguesa, navMenu } = DOM_ELEMENTS;
        navMenu.classList.remove('active');
        if (menuHamburguesa) {
            menuHamburguesa.classList.remove('active');
        }
    }

    function handleScroll() {
        const { headerNav } = DOM_ELEMENTS;

        if (!APP_STATE.scroll.ticking) {
            requestAnimationFrame(() => {
                const shouldAddClass = window.scrollY > CONFIG.scrollThreshold;
                headerNav.classList.toggle('scrolled', shouldAddClass);
                APP_STATE.scroll.ticking = false;
            });
            APP_STATE.scroll.ticking = true;
        }
    }

    // ===== TYPEWRITER EFFECT =====
    function initTypewriter() {
        const { textoDestacado, contenedorDestacado } = DOM_ELEMENTS;

        if (!textoDestacado || !contenedorDestacado) return;

        contenedorDestacado.addEventListener('mouseenter', startTypewriter);
        contenedorDestacado.addEventListener('mouseleave', stopTypewriter);
    }

    function startTypewriter() {
        const { textoDestacado } = DOM_ELEMENTS;
        APP_STATE.typewriter.isActive = true;

        if (!textoDestacado.textContent.trim()) {
            typeWriter();
        }
    }

    function stopTypewriter() {
        APP_STATE.typewriter.isActive = false;
        resetTypewriter();
    }

    function resetTypewriter() {
        const { textoDestacado } = DOM_ELEMENTS;
        clearTimeout(APP_STATE.typewriter.timeoutId);
        APP_STATE.typewriter.textoIndex = 0;
        APP_STATE.typewriter.charIndex = 0;
        textoDestacado.textContent = '';
    }

    function typeWriter() {
        const { textoDestacado, contenedorDestacado } = DOM_ELEMENTS;
        const { textos, typingSpeed, pauseBetweenTexts, finalPause } = CONFIG;
        const state = APP_STATE.typewriter;

        if (!state.isActive) return;

        if (state.textoIndex < textos.length) {
            const currentText = textos[state.textoIndex];

            if (state.charIndex < currentText.length) {
                // Agregar salto de línea si no es el primer texto
                if (state.charIndex === 0 && state.textoIndex > 0) {
                    textoDestacado.innerHTML += '<br>';
                }

                textoDestacado.innerHTML += currentText.charAt(state.charIndex);
                state.charIndex++;

                // Auto-scroll suave
                contenedorDestacado.scrollTo({
                    top: contenedorDestacado.scrollHeight,
                    behavior: 'smooth'
                });

                state.timeoutId = setTimeout(typeWriter, typingSpeed);
            } else {
                // Pasar al siguiente texto
                state.textoIndex++;
                state.charIndex = 0;
                state.timeoutId = setTimeout(typeWriter, pauseBetweenTexts);
            }
        } else {
            // Reiniciar después de una pausa final
            state.timeoutId = setTimeout(() => {
                resetTypewriter();
                if (state.isActive) typeWriter();
            }, finalPause);
        }
    }

    // ===== DROPDOWN MEJORADO =====
    function initDropdown() {
        const { selectAsunto } = DOM_ELEMENTS;

        if (!selectAsunto) return;

        const container = selectAsunto.parentElement;

        selectAsunto.addEventListener('focus', () => container.classList.add('focused'));
        selectAsunto.addEventListener('blur', () => container.classList.remove('focused'));
        selectAsunto.addEventListener('change', handleSelectChange);
        selectAsunto.addEventListener('mousedown', handleSelectClick);
    }

    function handleSelectChange() {
        const hasValue = this.value !== '';
        this.style.color = hasValue ? '#ffffff' : '';
        this.style.textShadow = hasValue ? '0 0 10px rgba(255, 0, 51, 0.5)' : '';
    }

    function handleSelectClick() {
        const container = this.parentElement;
        container.style.animation = 'dropdownPulse 0.6s ease';
        setTimeout(() => {
            container.style.animation = '';
        }, 600);
    }

    // ===== INICIALIZACIÓN =====
    function init() {
        initNavigation();
        initTypewriter();
        initDropdown();

        console.log('🚀 JavaScript optimizado cargado correctamente');
    }

    // Iniciar la aplicación
    init();
});

// ===== POLYFILLS Y UTILIDADES =====
// RequestAnimationFrame polyfill para mejor compatibilidad
(function () {
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];

    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||
            window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function (callback) {
            const currTime = new Date().getTime();
            const timeToCall = Math.max(0, 16 - (currTime - lastTime));
            const id = window.setTimeout(() => {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
}());