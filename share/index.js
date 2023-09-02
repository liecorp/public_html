let primaryBanner = document.getElementById("primaryBanner");
let infoPanel = document.getElementById("infoPanel");
let nginxWelcome = document.getElementById('nginxWelcome');
let navItemBtn = new PageNavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()');

let navItems = [
    new PageNavItem('Home','https://liecorp.id'),
    new PageNavItem('Blog','https://blog.liecorp.id/pages/index.html'),
    new PageNavItem('Wiki','https://wiki.liecorp.id'),
    new PageNavItem('Xenowiki','https://xenomancy.id'),
    new PageNavItem('Sharebook','https://sharebook.liecorp.id/book/'),
]

let pageBlocks = [
    `<h2>Welcome to Nginx!</h2>
    <p>
    If you see this page, the nginx web server is successfully installed and working.
        Further configuration is required.
    </p>
    <p>For online documentation and support please refer to
    <a class="navbar-link" class="link-light" href="http://nginx.org/">nginx.org</a>.<br/>
    Commercial support is available at
        <a class="navbar-link" class="link-light" href="http://nginx.com/">nginx.com</a>.</p>

    <p><em>Thank you for using nginx.</em></p>`,
    `<h2>
        Secondary Block
    </h2>
    <p>
        The content should not matter much.
        What is important is that this section should not be a primary one.
        It should contain extra contents not vital to be not present.
    </p>`,
    `<h2 class="heading">A simple, lightweight webpage</h2>

    <p>You've reached the website for <strong>liecorp.id</strong>, hosted in a
    lightweight and flexible Linux server that tries to Keep It
    Simple.</p>

    <p>Currently we have several pages live and available to access from our simple
    navigation bar. Feel free to check for them. Though note that they are mostly
    work in progress.</p>

    <p>This page is served with an nginx web server. Some of the other sites here are
    served with nginx inside docker containers, especially the ones with php as their
    backend. Those sites served from within docker containers are then configured to
    their respective subdomains with native nginx web server and simple reverse proxy
    configurations.</p>`
]

let contentObjects = [
    new PageItem('div',pageBlocks[0],'nginx-welcome'),
    new PageItem('div',pageBlocks[1],'info-panel'),
    new PageItem('div',pageBlocks[2],'primary-banner'),
]

generateContent(nginxWelcome,contentObjects[0])
generateContent(infoPanel,contentObjects[1])
generateContent(primaryBanner,contentObjects[2])

generateContentNav(topNavbar,navItems,navItemBtn);
