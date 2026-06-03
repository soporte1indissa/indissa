document.addEventListener("DOMContentLoaded", () => {
    // 1. Invocamos la barra de navegación de forma dinámica
    const headerElement = document.getElementById("global-header");
    if (headerElement) {
        fetch("components/navbar.html")
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo obtener el archivo de navegación");
                }
                return response.text();
            })
            .then(html => {
                headerElement.innerHTML = html;
                inicializarLogicaNavegacion();
            })
            .catch(error => console.error("Error cargando la navegación:", error));
    }
});

function inicializarLogicaNavegacion() {
    // --- LÓGICA DEL BOTÓN INTERRUPTOR (CLARO / OSCURO) ---
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
    const themeToggleBtn = document.getElementById('theme-toggle');

    // Sincroniza los iconos del botón según el estado del documento
    if (document.documentElement.classList.contains('dark')) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }

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

    // --- LÓGICA DEL MENÚ DE TELÉFONOS (HAMBURGUESA) ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenuLinks = document.getElementById('nav-menu-links');

    if (mobileMenuToggle && navMenuLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenuLinks.classList.toggle('hidden');
            // Asegura un despliegue limpio en bloque vertical cuando esté en móvil
            navMenuLinks.classList.toggle('flex');
        });
    }

    // --- DETECTAR Y MARCAR PESTAÑA ACTIVA AUTOMÁTICAMENTE ---
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
        // Aplica el color verde característico e indicador de línea inferior de INDISSA
        link.className = "text-brandGreen border-b-2 border-brandGreen pb-1";
    }
}
