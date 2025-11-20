document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle.querySelector('.material-symbols-rounded');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.className = savedTheme;
        updateIcon(savedTheme === 'dark-theme');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // Auto-detect system preference
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
        updateIcon(true);
    }

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateIcon(true);
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateIcon(false);
        }
    });

    function updateIcon(isDark) {
        icon.textContent = isDark ? 'light_mode' : 'dark_mode';
    }

    // Navigation Active State on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Simple Ripple Effect
    const buttons = document.querySelectorAll('.btn, .nav-item');
    buttons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            // This is a simplified ripple. For full M3 ripple, we'd need more complex CSS/JS.
            // Just adding a visual feedback class or relying on CSS active state for now.
            // Material You usually uses a pseudo-element for state layer.
        });
    });
});
