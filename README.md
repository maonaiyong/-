# 软件与插件展示网站

这是一个用于展示和介绍软件及插件的静态网站模板。网站采用现代化的设计风格，具有响应式布局，可以在各种设备上良好显示。

## 功能特点

- 现代化的UI设计，灵感来源于Apple官网
- 响应式布局，适配各种屏幕尺寸
- 平滑滚动和动画效果
- 产品卡片展示
- 联系表单（带验证功能）
- 纯前端实现，无需后端支持

## 文件结构

- `index.html` - 主HTML文件
- `styles.css` - CSS样式文件
- `script.js` - JavaScript交互脚本
- 图片资源 (1.png, 2.png, 3.png)

## 使用方法

1. 克隆或下载本项目
2. 使用您喜欢的代码编辑器打开项目
3. 根据需要修改HTML、CSS和JavaScript文件
4. 替换图片资源为您自己的产品图片
5. 部署到您的网站服务器

## 自定义

### 添加新产品

在HTML文件中找到产品卡片部分，复制现有的产品卡片结构并修改内容：

```html
<div class="product-card">
    <div class="product-image">
        <img src="your-image.png" alt="产品名称">
    </div>
    <div class="product-info">
        <h3>产品名称</h3>
        <p>产品描述</p>
        <div class="product-actions">
            <a href="#" class="btn primary">进一步了解</a>
            <a href="#" class="btn secondary">购买</a>
        </div>
    </div>
</div>
```

### 修改颜色主题

在CSS文件中修改颜色变量：

```css
/* 主要颜色 */
.btn.primary {
    background-color: #0071e3; /* 修改为您喜欢的颜色 */
    color: white;
}
```

## 浏览器兼容性

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可

MIT许可证 