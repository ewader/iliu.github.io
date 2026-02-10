// 移动端菜单切换
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    const body = document.body;
    
    if (mobileToggle && siteNav) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            siteNav.classList.toggle('active');
            
            // 防止背景滚动
            if (siteNav.classList.contains('active')) {
                body.style.overflow = 'hidden';
                body.style.position = 'fixed';
                body.style.width = '100%';
            } else {
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
            }
        });

        // 点击遮罩层关闭菜单
        siteNav.addEventListener('click', function(e) {
            if (e.target === siteNav) {
                mobileToggle.classList.remove('active');
                siteNav.classList.remove('active');
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
            }
        });

        // ESC 键关闭菜单
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && siteNav.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                siteNav.classList.remove('active');
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
            }
        });

        // 窗口大小改变时重置状态
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileToggle.classList.remove('active');
                siteNav.classList.remove('active');
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
            }
        });
    }

    // 点击导航链接后关闭菜单
    const navLinks = document.querySelectorAll('.site-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && mobileToggle && siteNav) {
                mobileToggle.classList.remove('active');
                siteNav.classList.remove('active');
                body.style.overflow = '';
                body.style.position = '';
                body.style.width = '';
            }
        });
    });

    // 搜索功能（使用 FlexSearch）
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    let searchData = null;
    let searchIndex = null;

    console.log('搜索元素检查:', { searchInput, searchBtn, searchResults });

    // 初始化搜索
    async function initSearch() {
        try {
            console.log('开始加载搜索索引...');
            const response = await fetch('/index.json');
            if (!response.ok) {
                throw new Error('无法加载搜索索引');
            }
            searchData = await response.json();
            
            // 创建 FlexSearch 索引
                    searchIndex = new FlexSearch.Index({
                        tokenize: 'full',
                        cache: true
                    });
                    
                    // 同时创建一个映射来存储文档数据
                    window.searchDocs = {};
                    
                    // 添加文档到索引
                    searchData.pages.forEach(page => {
                        const indexContent = `${page.title} ${page.summary} ${page.content}`;
                        searchIndex.add(page.url, indexContent);
                        window.searchDocs[page.url] = page;
                    });            
            console.log('搜索索引已加载，共 ' + searchData.pages.length + ' 篇文章');
        } catch (error) {
            console.error('加载搜索索引失败:', error);
        }
    }

    if (searchInput && searchBtn && searchResults) {
        // 初始化搜索索引
        initSearch();
        
        // 点击搜索按钮
        searchBtn.addEventListener('click', performSearch);
        
        // 输入时实时搜索
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query) {
                performSearch();
            } else {
                searchResults.classList.remove('active');
            }
        });
        
        // 回车搜索
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // 点击外部关闭搜索结果
        document.addEventListener('click', function(e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });

        function performSearch() {
            const query = searchInput.value.trim();
            console.log('执行搜索:', query);
            
            if (!query) {
                searchResults.classList.remove('active');
                return;
            }

            if (!searchIndex) {
                console.log('搜索索引未加载');
                searchResults.innerHTML = `
                    <div style="padding: 1rem; text-align: center; color: #6c757d;">
                        <p>正在加载搜索索引...</p>
                    </div>
                `;
                searchResults.classList.add('active');
                return;
            }

            // 执行搜索
            const urls = searchIndex.search(query, {
                limit: 10
            });
            
            console.log('搜索结果数量:', urls.length);
            console.log('搜索结果:', urls);

            if (!urls || urls.length === 0) {
                searchResults.innerHTML = `
                    <div style="padding: 1rem; text-align: center; color: #6c757d;">
                        <p>未找到相关结果</p>
                    </div>
                `;
            } else {
                let html = '<div style="max-height: 400px; overflow-y: auto;">';
                
                urls.forEach(url => {
                    const page = window.searchDocs[url];
                    console.log('URL:', url, '文档:', page);
                    
                    if (page) {
                        html += `
                            <a href="${page.url}" style="display: block; padding: 0.75rem 1rem; border-bottom: 1px solid #e9ecef; text-decoration: none; color: inherit; transition: background-color 0.2s;">
                                <div style="font-weight: 600; color: #007bff; margin-bottom: 0.25rem;">${page.title || '无标题'}</div>
                                <div style="font-size: 0.875rem; color: #6c757d; margin-bottom: 0.25rem;">${page.date || '无日期'}</div>
                                <div style="font-size: 0.875rem; color: #495057; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${page.summary || '无摘要'}</div>
                            </a>
                        `;
                    }
                });
                
                html += '</div>';
                searchResults.innerHTML = html;
            }
            searchResults.classList.add('active');
        }
    } else {
        console.error('搜索元素未找到:', { searchInput, searchBtn, searchResults });
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 添加滚动效果
let lastScrollTop = 0;
const header = document.querySelector('.site-header');
const topLink = document.querySelector('.top-link');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    
    // Header 阴影效果
    if (scrollTop > 100) {
        header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
    
    // TOP 按钮显示/隐藏
    if (topLink) {
        if (scrollTop > windowHeight) {
            topLink.classList.add('visible');
        } else {
            topLink.classList.remove('visible');
        }
    }
    
    lastScrollTop = scrollTop;

    // ===== 主题切换功能 =====
    (function() {
        const themeToggle = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;
        const STORAGE_KEY = 'theme-preference';
        const THEME_DARK = 'dark';
        const THEME_LIGHT = 'light';

        console.log('主题切换功能初始化');

        // 获取存储的主题偏好
        function getStoredTheme() {
            return localStorage.getItem(STORAGE_KEY);
        }

        // 保存主题偏好
        function setStoredTheme(theme) {
            localStorage.setItem(STORAGE_KEY, theme);
            console.log('主题已保存:', theme);
        }

        // 获取系统主题偏好
        function getSystemTheme() {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            console.log('系统主题偏好:', isDark ? 'dark' : 'light');
            return isDark ? THEME_DARK : THEME_LIGHT;
        }

        // 应用主题
        function applyTheme(theme) {
            console.log('应用主题:', theme);
            if (theme === THEME_DARK) {
                htmlElement.setAttribute('data-theme', THEME_DARK);
            } else if (theme === THEME_LIGHT) {
                htmlElement.setAttribute('data-theme', THEME_LIGHT);
            } else {
                htmlElement.removeAttribute('data-theme');
            }
            setStoredTheme(theme);
        }

        // 切换主题
        function toggleTheme() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const systemTheme = getSystemTheme();
            console.log('切换主题，当前主题:', currentTheme, '系统主题:', systemTheme);
            
            if (currentTheme === THEME_DARK) {
                applyTheme(THEME_LIGHT);
            } else if (currentTheme === THEME_LIGHT) {
                applyTheme(THEME_DARK);
            } else {
                // 当前没有设置主题，根据系统偏好切换
                applyTheme(systemTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK);
            }
        }

        // 初始化主题
        function initTheme() {
            const storedTheme = getStoredTheme();
            console.log('存储的主题:', storedTheme);
            if (storedTheme) {
                applyTheme(storedTheme);
            } else {
                // 没有存储的主题，使用系统偏好
                applyTheme('auto');
            }
        }

        // 监听系统主题变化
        function watchSystemTheme() {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            // 使用新的事件监听方法
            if (mediaQuery.addEventListener) {
                mediaQuery.addEventListener('change', (e) => {
                    const storedTheme = getStoredTheme();
                    // 只有在用户没有手动设置主题时才跟随系统
                    if (!storedTheme || storedTheme === 'auto') {
                        applyTheme('auto');
                    }
                });
            } else if (mediaQuery.addListener) {
                // 兼容旧版浏览器
                mediaQuery.addListener((e) => {
                    const storedTheme = getStoredTheme();
                    if (!storedTheme || storedTheme === 'auto') {
                        applyTheme('auto');
                    }
                });
            }
        }

        // 初始化
        if (themeToggle) {
            console.log('主题切换按钮找到，开始初始化');
            initTheme();
            watchSystemTheme();
            themeToggle.addEventListener('click', toggleTheme);
        } else {
            console.error('主题切换按钮未找到');
        }
    })();
});