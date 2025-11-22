document.addEventListener('DOMContentLoaded', () => {
    // Constants
    const CONSTANTS = {
        THEME: {
            DARK: 'dark-theme',
            LIGHT: 'light-theme',
            STORAGE_KEY: 'theme'
        },
        ICON: {
            DARK: 'light_mode',
            LIGHT: 'dark_mode'
        },
        SELECTORS: {
            THEME_TOGGLE: '#theme-toggle',
            BUTTONS: '.btn, .nav-item',
            ACTIVE_CLASS: 'active'
        },
        SCROLL: {
            THRESHOLD_RATIO: 3, // sectionHeight / 3
            DEBOUNCE_DELAY: 100 // milliseconds
        }
    };

    // Elements
    const themeToggle = document.querySelector(CONSTANTS.SELECTORS.THEME_TOGGLE);
    const body = document.body;
    const icon = themeToggle.querySelector('.material-symbols-rounded');

    // Theme Management
    function initializeTheme() {
        const savedTheme = localStorage.getItem(CONSTANTS.THEME.STORAGE_KEY);

        if (savedTheme) {
            setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme(CONSTANTS.THEME.DARK);
        } else {
            setTheme(CONSTANTS.THEME.LIGHT);
        }
    }

    function setTheme(theme) {
        // Use consistent classList.toggle() method
        body.classList.toggle(CONSTANTS.THEME.DARK, theme === CONSTANTS.THEME.DARK);
        body.classList.toggle(CONSTANTS.THEME.LIGHT, theme === CONSTANTS.THEME.LIGHT);

        localStorage.setItem(CONSTANTS.THEME.STORAGE_KEY, theme);
        updateIcon(theme === CONSTANTS.THEME.DARK);
    }

    function updateIcon(isDark) {
        icon.textContent = isDark ? CONSTANTS.ICON.DARK : CONSTANTS.ICON.LIGHT;
    }

    function toggleTheme() {
        const currentTheme = body.classList.contains(CONSTANTS.THEME.DARK)
            ? CONSTANTS.THEME.DARK
            : CONSTANTS.THEME.LIGHT;

        const newTheme = currentTheme === CONSTANTS.THEME.DARK
            ? CONSTANTS.THEME.LIGHT
            : CONSTANTS.THEME.DARK;

        setTheme(newTheme);
    }

    // Scroll Handler with Debouncing
    let scrollTimer = null;

    function handleScroll() {
        const current = getCurrentSection();
        updateActiveNavItem(current);
    }

    function getCurrentSection() {
        const sections = document.querySelectorAll('section');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const threshold = sectionHeight / CONSTANTS.SCROLL.THRESHOLD_RATIO;

            if (scrollY >= (sectionTop - threshold)) {
                current = section.getAttribute('id');
            }
        });

        return current;
    }

    function updateActiveNavItem(current) {
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            item.classList.remove(CONSTANTS.SELECTORS.ACTIVE_CLASS);
            if (item.getAttribute('href').includes(current)) {
                item.classList.add(CONSTANTS.SELECTORS.ACTIVE_CLASS);
            }
        });
    }

    function debouncedScrollHandler() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(handleScroll, CONSTANTS.SCROLL.DEBOUNCE_DELAY);
    }

    // Event Listeners
    themeToggle.addEventListener('click', toggleTheme);
    window.addEventListener('scroll', debouncedScrollHandler);

    // Initialize theme on load
    initializeTheme();
});
