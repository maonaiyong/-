document.addEventListener('DOMContentLoaded', function() {
    // 添加loaded类以触发页面淡入效果
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);

    // 获取所有需要动画的模块
    const modules = document.querySelectorAll('.module');
    
    // 监听滚动事件
    window.addEventListener('scroll', function() {
        checkModulesVisibility();
    });

    // 初始检查模块可见性
    setTimeout(checkModulesVisibility, 300);

    // 添加导航点击事件
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({behavior: 'smooth'});
                    
                    // 添加波纹效果
                    const ripple = document.createElement('span');
                    ripple.classList.add('nav-ripple');
                    this.appendChild(ripple);
                    
                    // 移除波纹
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                }
            }
        });
    });

    // 模块点击事件
    modules.forEach(module => {
        module.addEventListener('click', function(e) {
            if (!e.target.classList.contains('btn')) {
                // 添加波纹效果
                const rect = this.getBoundingClientRect();
                const ripple = document.createElement('span');
                ripple.classList.add('module-ripple');
                ripple.style.width = `${Math.max(rect.width, rect.height) * 2}px`;
                ripple.style.height = `${Math.max(rect.width, rect.height) * 2}px`;
                this.appendChild(ripple);
                
                // 移除波纹
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // 切换active类
                document.querySelectorAll('.module.active').forEach(m => {
                    if (m !== this) m.classList.remove('active');
                });
                this.classList.toggle('active');
            }
        });
    });

    // 下载按钮点击事件
    const downloadButtons = document.querySelectorAll('.btn[data-modal]');
    downloadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // 关闭模态框
    const closeButtons = document.querySelectorAll('.modal-close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.download-modal').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 点击模态框外部关闭
    document.querySelectorAll('.download-modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // 检查模块可见性的函数
    function checkModulesVisibility() {
        modules.forEach((module, index) => {
            const rect = module.getBoundingClientRect();
            const isVisible = (
                rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom >= 0
            );
            
            if (isVisible) {
                setTimeout(() => {
                    module.classList.add('visible');
                }, index * 100); // 按顺序添加延迟
            }
        });
    }
}); 