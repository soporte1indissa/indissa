document.addEventListener("DOMContentLoaded", () => {
    // 1. Cargar Navbar dinámica
    const headerElement = document.getElementById("global-header");
    if (headerElement) {
        fetch("components/navbar.html")
            .then(response => {
                if (!response.ok) throw new Error("Error cargando navbar");
                return response.text();
            })
            .then(html => {
                headerElement.innerHTML = html;
                inicializarLogicaNavegacion();
            })
            .catch(error => console.error("Error al cargar la barra de navegación:", error));
    }

    // 2. Cargar Footer dinámico
    const footerElement = document.getElementById("global-footer");
    if (footerElement) {
        fetch("components/footer.html")
            .then(response => {
                if (!response.ok) throw new Error("Error cargando footer");
                return response.text();
            })
            .then(html => {
                footerElement.innerHTML = html;
                marcarPaginaActivaFooter();
            })
            .catch(error => console.error("Error al cargar el footer:", error));
    }
});

function inicializarLogicaNavegacion() {
    // --- LÓGICA MODO CLARO / OSCURO ---
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (document.documentElement.classList.contains('dark')) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');

            if (localStorage.getItem('theme') === 'light') {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // --- MENÚ MÓVIL HAMBURGUESA ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenuLinks = document.getElementById('nav-menu-links');

    if (mobileMenuToggle && navMenuLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenuLinks.classList.toggle('hidden');
            navMenuLinks.classList.toggle('flex');
        });
    }

    // --- MARCAR PESTAÑA ACTIVA EN NAVBAR ---
    const paginaActual = window.location.pathname.split("/").pop();
    if (paginaActual === "index.html" || paginaActual === "") {
        marcarActivoNavbar("link-inicio");
    } else if (paginaActual === "nosotros.html") {
        marcarActivoNavbar("link-nosotros");
    } else if (paginaActual === "productos.html") {
        marcarActivoNavbar("link-productos");
    } else if (paginaActual === "contactenos.html") {
        marcarActivoNavbar("link-contacto");
    }
}

function marcarActivoNavbar(idElemento) {
    const link = document.getElementById(idElemento);
    if (link) {
        link.className = "text-brandGreen border-b-2 border-brandGreen pb-1";
    }
}

function marcarPaginaActivaFooter() {
    const paginaActual = window.location.pathname.split("/").pop();
    if (paginaActual === "privacidad.html" || paginaActual === "privacidad") {
        const link = document.getElementById("footer-link-privacidad");
        if (link) link.className = "text-brandGreen font-medium transition";
    } else if (paginaActual === "eliminar-datos.html" || paginaActual === "eliminar-datos") {
        const link = document.getElementById("footer-link-eliminar");
        if (link) link.className = "text-brandGreen font-medium transition";
    }
}
