let contentBlockPrimary = document.getElementById("contentBlockPrimary");
let contentBlockSecondary = document.getElementById("contentBlockSecondary");
let nginxWelcome = document.getElementById('nginxWelcome');
let navItemBtn = new PageNavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()');

let navItems = [
    new PageNavItem('Home','#Home'),
    new PageNavItem('Blog','#Blog'),
    new PageNavItem('About','#About'),
    new PageNavItem('Contact','#Contact'),
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

let blockPrimary = new PageItem(
    'div',
    pageBlocks[2],
    'block-primary'
)

let blockSecondary = new PageItem(
    'div',
    pageBlocks[1],
    'block-secondary'
)

let blockNginxWelcome = new PageItem(
    'div',
    pageBlocks[0],
    'block-nginx'
)

generateContent(contentBlockPrimary,blockPrimary)
generateContent(contentBlockSecondary,blockSecondary)
generateContent(nginxWelcome,blockNginxWelcome)

// If navItemBtn is defined, use:
generateContentNav(topNavbar,navItems,navItemBtn);
// Otherwise, use:
// generateNavContents(navItems);
