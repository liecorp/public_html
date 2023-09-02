let contentBlockPrimary = document.getElementById("contentBlockPrimary");
let contentBlockSecondary = document.getElementById("contentBlockSecondary");

let navItemBtn = new PageNavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()');

let navItems = [
    new PageNavItem('Home','#Home'),
    new PageNavItem('Blog','#Blog'),
    new PageNavItem('About','#About'),
    new PageNavItem('Contact','#Contact'),
]

let blockPrimary = new PageItem(
    'div',
    `<h1>Welcome to Nginx!</h1>
    <p>
    If you see this page, the nginx web server is successfully installed and working.
        Further configuration is required.
    </p>
    <p>For online documentation and support please refer to
    <a class="navbar-link" class="link-light" href="http://nginx.org/">nginx.org</a>.<br/>
    Commercial support is available at
        <a class="navbar-link" class="link-light" href="http://nginx.com/">nginx.com</a>.</p>

    <p><em>Thank you for using nginx.</em></p>`,
    'block-primary'
    )

let blockSecondary = new PageItem(
    'div',
    `<h1>
        Secondary Block
    </h1>
    <p>
        The content should not matter much.
        What is important is that this section should not be a primary one.
        It should contain extra contents not vital to be not present.
        </p>`,
    'block-secondary'
    )

generateContent(contentBlockPrimary,blockPrimary)
generateContent(contentBlockSecondary,blockSecondary)

// If navItemBtn is defined, use:
generateNavContents(navItems,navItemBtn);
// Otherwise, use:
// generateNavContents(navItems);
