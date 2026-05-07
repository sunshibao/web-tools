/* ============== 公共 JS：注入头/尾 & 激活导航 ============== */
(function () {
    // 统一维护导航项，新增页面仅需在此追加一行
    const SITE_NAV = [
        { href: 'JsonToMysql.html',      text: 'JSON To MySQL' },
        { href: 'JsonToGoStruct.html',   text: 'JSON To GoStruct' },
        { href: 'MysqlToGoStruct.html',  text: 'MySQL To GoStruct' },
        { href: 'JsonToProtobuf.html',   text: 'JSON To Protobuf' },
        { href: 'XMLToJson.html',        text: 'XML / JSON' },
        { href: 'http://blog.skill86.com/editor', text: 'Editor Tool' },
        { href: 'ImageToBase64.html',    text: 'Base64 / 图片互转' },
        { href: 'StringEscape.html',     text: '字符串转义' },
        { href: '#',                     text: '其他工具' }
    ];

    const SITE_TITLE = 'Tools 工具箱';
    const SITE_FOOTER = '&copy; 2025 Tools 工具箱';

    function currentFile() {
        // 页面可通过 window.SITE_ACTIVE_HREF 显式指定要高亮的导航项
        if (typeof window !== 'undefined' && window.SITE_ACTIVE_HREF) {
            return window.SITE_ACTIVE_HREF;
        }
        let p = location.pathname.split('/').pop();
        if (!p || p.length === 0) p = 'index.html';
        // 默认首页：index.html 视为 JSON To MySQL
        if (p === 'index.html') return 'JsonToMysql.html';
        return p;
    }

    function buildHeader() {
        const cur = currentFile();
        const items = SITE_NAV.map(item => {
            const isActive = item.href === cur;
            const cls = isActive ? ' class="active"' : '';
            return `<li><a href="${item.href}"${cls}>${item.text}</a></li>`;
        }).join('\n                ');

        return `
<header>
    <div class="logo-bar">
        <div class="logo">${SITE_TITLE}</div>
    </div>
    <div class="menu-bar">
        <nav>
            <ul>
                ${items}
            </ul>
        </nav>
    </div>
</header>`;
    }

    function buildFooter() {
        return `
<footer>
    <p>${SITE_FOOTER}</p>
</footer>`;
    }

    function bindNavActive() {
        const links = document.querySelectorAll('nav a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                links.forEach(o => o.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    function init() {
        document.body.insertAdjacentHTML('afterbegin', buildHeader());
        document.body.insertAdjacentHTML('beforeend', buildFooter());
        bindNavActive();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
