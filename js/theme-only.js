// 仅包含主题切换功能的测试脚本
console.log('theme-only.js 已加载');

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded 事件触发 - theme-only.js');
    
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const STORAGE_KEY = 'theme-preference';
    const THEME_DARK = 'dark';
    const THEME_LIGHT = 'light';

    console.log('主题切换功能初始化 - theme-only.js');
    console.log('themeToggle 元素:', themeToggle);
    console.log('htmlElement 元素:', htmlElement);

    function getStoredTheme() {
        return localStorage.getItem(STORAGE_KEY);
    }

    function setStoredTheme(theme) {
        localStorage.setItem(STORAGE_KEY, theme);
        console.log('主题已保存 - theme-only.js:', theme);
    }

    function getSystemTheme() {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log('系统主题偏好 - theme-only.js:', isDark ? 'dark' : 'light');
        return isDark ? THEME_DARK : THEME_LIGHT;
    }

    function applyTheme(theme) {
        console.log('应用主题 - theme-only.js:', theme);
        console.log('HTML 标签当前属性:', htmlElement.outerHTML.split('>')[0]);
        
        if (theme === THEME_DARK) {
            htmlElement.setAttribute('data-theme', THEME_DARK);
        } else if (theme === THEME_LIGHT) {
            htmlElement.setAttribute('data-theme', THEME_LIGHT);
        } else {
            htmlElement.removeAttribute('data-theme');
        }
        
        console.log('HTML 标签设置后属性:', htmlElement.outerHTML.split('>')[0]);
        setStoredTheme(theme);
    }

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const systemTheme = getSystemTheme();
        console.log('切换主题 - theme-only.js，当前主题:', currentTheme, '系统主题:', systemTheme);
        
        if (currentTheme === THEME_DARK) {
            applyTheme(THEME_LIGHT);
        } else if (currentTheme === THEME_LIGHT) {
            applyTheme(THEME_DARK);
        } else {
            applyTheme(systemTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK);
        }
    }

    function initTheme() {
        const storedTheme = getStoredTheme();
        console.log('存储的主题 - theme-only.js:', storedTheme);
        if (storedTheme) {
            applyTheme(storedTheme);
        } else {
            applyTheme('auto');
        }
    }

    function watchSystemTheme() {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', (e) => {
                const storedTheme = getStoredTheme();
                if (!storedTheme || storedTheme === 'auto') {
                    applyTheme('auto');
                }
            });
        } else if (mediaQuery.addListener) {
            mediaQuery.addListener((e) => {
                const storedTheme = getStoredTheme();
                if (!storedTheme || storedTheme === 'auto') {
                    applyTheme('auto');
                }
            });
        }
    }

    if (themeToggle) {
        console.log('主题切换按钮找到 - theme-only.js，开始初始化');
        initTheme();
        watchSystemTheme();
        themeToggle.addEventListener('click', toggleTheme);
    } else {
        console.error('主题切换按钮未找到 - theme-only.js');
    }
});