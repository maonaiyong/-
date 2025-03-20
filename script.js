document.addEventListener('DOMContentLoaded', function() {
    // 缓存DOM选择器
    const body = document.body;
    const modules = document.querySelectorAll('.module');
    const navLinks = document.querySelectorAll('nav a');
    const downloadModals = document.querySelectorAll('.download-modal');
    
    // 使用requestAnimationFrame优化页面加载动画
    requestAnimationFrame(() => {
        body.classList.add('loaded');
        // 初始化所有模块的可见性
        modules.forEach((module, index) => {
            setTimeout(() => {
                module.classList.add('visible');
            }, index * 50);
        });

        // 设置初始激活导航项
        setTimeout(() => {
            // 确保加载时至少有一个导航项被激活
            if (!document.querySelector('nav a.active') && navLinks.length > 0) {
                const firstNavLink = navLinks[0];
                firstNavLink.classList.add('active');
                addNavHighlight(firstNavLink);
            }
        }, 300);
    });

    // 优化滚动事件监听，使用节流
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                checkModulesVisibility();
                updateActiveNavLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    // 事件委托处理导航点击
    document.querySelector('nav').addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link) return;
        
        if (link.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // 移除所有活动导航的高亮效果
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    const oldHighlight = navLink.querySelector('.nav-highlight');
                    if (oldHighlight) oldHighlight.remove();
                });
                
                // 添加当前点击导航的高亮效果
                link.classList.add('active');
                addNavHighlight(link);
                
                // 平滑滚动到目标元素
                targetElement.scrollIntoView({behavior: 'smooth'});
                addRippleEffect(link, 'nav-ripple');
            }
        }
    });

    // 更新当前活动的导航链接
    function updateActiveNavLink() {
        // 获取当前滚动位置
        const scrollPosition = window.scrollY;
        
        // 找到当前在视口中的模块
        let activeModule = null;
        
        modules.forEach(module => {
            const rect = module.getBoundingClientRect();
            if (rect.top <= 140 && rect.bottom >= 140) {
                activeModule = module;
            }
        });
        
        // 更新导航高亮
        if (activeModule) {
            const moduleId = activeModule.id;
            const activeLink = document.querySelector(`nav a[href="#${moduleId}"]`);
            
            // 如果找到对应的导航链接且不是当前激活的，则更新
            if (activeLink && !activeLink.classList.contains('active')) {
                // 移除所有导航项的高亮
                navLinks.forEach(navLink => {
                    navLink.classList.remove('active');
                    const oldHighlight = navLink.querySelector('.nav-highlight');
                    if (oldHighlight) oldHighlight.remove();
                });
                
                // 添加新导航项的高亮
                activeLink.classList.add('active');
                addNavHighlight(activeLink);
            }
        }
    }
    
    // 添加导航高亮动画
    function addNavHighlight(element) {
        const highlight = document.createElement('span');
        highlight.classList.add('nav-highlight');
        element.appendChild(highlight);
    }

    // 事件委托处理模块点击
    document.querySelector('.module-grid').addEventListener('click', function(e) {
        const module = e.target.closest('.module');
        if (!module || e.target.classList.contains('btn')) return;
        
        addRippleEffect(module, 'module-ripple');
        
        document.querySelectorAll('.module.active').forEach(m => {
            if (m !== module) m.classList.remove('active');
        });
        module.classList.toggle('active');
    });

    // 事件委托处理下载按钮点击
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.btn[data-modal]');
        if (!button) return;
        
        e.stopPropagation();
        e.preventDefault();
        
        const modal = document.getElementById(button.getAttribute('data-modal'));
        if (modal) {
            modal.classList.add('active');
            body.style.overflow = 'hidden';
        }
    });

    // 事件委托处理模态框关闭
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-close') || 
            e.target.classList.contains('download-modal')) {
            const modal = e.target.closest('.download-modal');
            if (modal) {
                modal.classList.remove('active');
                body.style.overflow = '';
            }
        }
    });

    // 优化添加波纹效果函数
    function addRippleEffect(element, className) {
        const ripple = document.createElement('span');
        ripple.classList.add(className);
        
        if (className === 'module-ripple') {
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 2;
            ripple.style.width = ripple.style.height = `${size}px`;
        }
        
        element.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    }

    // 优化检查模块可见性函数
    function checkModulesVisibility() {
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        
        modules.forEach((module, index) => {
            const rect = module.getBoundingClientRect();
            if (rect.top <= viewportHeight && rect.bottom >= 0 && !module.classList.contains('visible')) {
                requestAnimationFrame(() => {
                    module.classList.add('visible');
                });
            }
        });
    }
}); 