function injectNavbar() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const currentPath = window.location.pathname;
    let navHTML = '';

    // ==========================================
    // 1. DOCS NAVIGATION (Premium MkDocs/Firebase Style)
    // ==========================================
    if (currentPath.includes('/docs/')) {
        navHTML = `
            <div class="docs-header-container">
                <div class="docs-header-left">
                    <button id="mobile-menu-toggle" class="icon-btn mobile-only docs-menu-btn" title="Toggle Sidebar">☰</button>
                    <a href="/" class="logo docs-logo">
                        <div class="logo-icon">⚡</div>
                        DevDocs <span class="badge-version">v1.0</span>
                    </a>
                </div>
                
                <div class="docs-header-center hidden-mobile">
                    <div class="docs-search-bar">
                        <span class="search-icon">🔍</span>
                        <input type="text" placeholder="Search documentation... (Press Ctrl+K)" readonly />
                    </div>
                </div>

                <div class="docs-header-right">
                    <nav class="docs-top-nav hidden-mobile">
                        <a href="/blog/">Blog</a>
                    </nav>
                    <div class="header-actions">
                        <button id="theme-toggle" class="icon-btn" title="Toggle Theme">🌓</button>
                        <a href="https://github.com/bayeziddev/devdocs" target="_blank" class="icon-btn github-btn" title="GitHub">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        </a>
                    </div>
                </div>
            </div>
        `;
    } 
    // ==========================================
    // 2. BLOG NAVIGATION (Clean, Reading-Focused)
    // ==========================================
    else if (currentPath.includes('/blog/')) {
        navHTML = `
            <div class="blog-header-container">
                <a href="/" class="logo blog-logo">
                    <div class="logo-icon">⚡</div>
                    DevBlog
                </a>
                
                <nav class="blog-centered-nav hidden-mobile">
                    <a href="/blog/articles/">Articles</a>
                    <a href="/blog/tutorials/">Tutorials</a>
                    <a href="/blog/tags/">Tags</a>
                </nav>

                <div class="blog-header-right">
                    <button id="theme-toggle" class="icon-btn" title="Toggle Theme">🌓</button>
                    <a href="/docs/" class="nav-cta-btn">Read Docs →</a>
                    <button id="mobile-menu-toggle" class="icon-btn mobile-only" title="Toggle Menu">☰</button>
                </div>
            </div>
        `;
    } 
    // ==========================================
    // 3. DEFAULT NAVIGATION (Home / About / etc.)
    // ==========================================
    else {
        navHTML = `
            <div class="container">
                <div class="header-content">
                    <a href="/" class="logo">
                        <div class="logo-icon">⚡</div>
                        DevDocs
                    </a>
                    <nav id="nav-links" class="hidden-mobile">
                        <a href="/">Home</a>
                        <a href="/docs/">Documentation</a>
                        <a href="/blog/">Blog</a>
                        <a href="/about/">About</a>
                    </nav>
                    <div class="header-actions">
                        <a href="https://github.com/bayeziddev/devdocs" target="_blank" class="github-link hidden-mobile">GitHub</a>
                        <button id="theme-toggle" class="icon-btn" title="Toggle Theme">🌓</button>
                        <button id="mobile-menu-toggle" class="icon-btn mobile-only" title="Toggle Menu">☰</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Common Mobile Sidebar Structure (can be adapted per page if needed)
    const mobileSidebarHTML = `
        <aside id="mobile-sidebar" class="mobile-sidebar">
            <div class="sidebar-header">
                <a href="/" class="sidebar-logo">⚡ DevDocs</a>
                <button id="sidebar-close" class="sidebar-close-btn" title="Close Menu">✕</button>
            </div>
            <div class="sidebar-nav-links">
                <a href="/" class="nav-item">🏠 Home</a>
                <a href="/docs/" class="nav-item">📚 Documentation</a>
                <a href="/blog/" class="nav-item">📝 Blog</a>
                <hr>
                <a href="https://github.com/bayeziddev/devdocs" target="_blank" class="nav-item github-mobile-link">⭐ Star on GitHub</a>
            </div>
        </aside>
        <div id="sidebar-overlay" class="sidebar-overlay"></div>
    `;

    // Inject everything into the header
    header.innerHTML = navHTML + mobileSidebarHTML;

    // ==========================================
    // Attach Event Listeners dynamically
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    if(themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('mobile-sidebar');
    const sidebarClose = document.getElementById('sidebar-close');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    
    if(menuToggle && sidebar && sidebarOverlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    const closeSidebar = () => {
        if(sidebar) sidebar.classList.remove('active');
        if(sidebarOverlay) sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if(sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
    if(sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    if(sidebar) {
        sidebar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                closeSidebar();
            });
        });
    }
}