document.addEventListener("DOMContentLoaded", () => {
    // 1. Invocación dinámica de la barra de navegación
    const headerElement = document.getElementById("global-header");
    if (headerElement) {
        fetch("components/navbar.html")
            .then(response => {
                if (!response.ok) throw new Error("No se pudo obtener components/navbar.html");
                return response.text();
            })
            .then(html => {
                headerElement.innerHTML = html;
                inicializarLogicaNavegacion();
            })
            .catch(error => console.error("Error cargando la navegación:", error));
    }

    // 2. Invocación dinámica del Footer
    const footerElement = document.getElementById("global-footer");
    if (footerElement) {
        fetch("components/footer.html")
            .then(response => {
                if (!response.ok) throw new Error("No se pudo obtener components/footer.html");
                return response.text();
            })
            .then(html => {
                footerElement.innerHTML = html;
                marcarPaginaActivaFooter();
            })
            .catch(error => console.error("Error cargando el footer:", error));
    }
});

function inicializarLogicaNavegacion() {
    // --- LÓGICA DEL BOTÓN INTERRUPTOR (CLARO / OSCURO) ---
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleBtn = document.getElementById('theme-toggle');

    if (document.documentElement.classList.contains('dark')) {
        themeToggleLightIcon?.classList.remove('hidden');
    } else {
        themeToggleDarkIcon?.classList.remove('hidden');
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

    // --- LÓGICA DEL MENÚ DE TELÉFONOS (HAMBURGUESA) ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenuLinks = document.getElementById('nav-menu-links');

    if (mobileMenuToggle && navMenuLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenuLinks.classList.toggle('hidden');
            navMenuLinks.classList.toggle('flex');
        });
    }

    // --- DETECTAR Y MARCAR PESTAÑA ACTIVA EN NAVBAR ---
    const paginaActual = window.location.pathname.split("/").pop();
    if (paginaActual === "index.html" || paginaActual === "") {
        marcarActivo("link-inicio");
    } else if (paginaActual === "nosotros.html") {
        marcarActivo("link-nosotros");
    } else if (paginaActual === "productos.html") {
        marcarActivo("link-productos");
    } else if (paginaActual === "contactenos.html") {
        marcarActivo("link-contacto");
    }
}

function marcarActivo(idElemento) {
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
