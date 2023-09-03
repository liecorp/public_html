// A single source of truth for navbar
/*  Toggle between adding and removing the "responsive" class
to top-navbar when the user clicks on the icon */
function navBarToggle() {
    let navCont = document.getElementById("navContainer");
    let topNavbar = document.getElementById("topNavbar");
    if (topNavbar.className === "top-navbar") {
        topNavbar.className += " responsive";
    } else {
        topNavbar.className = "top-navbar";
    }
    if (navCont.className === "nav-container") {
        navCont.className += " responsive";
    } else {
        navCont.className = "nav-container";
    }
}

let navItemBtn = new PageNavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()');

let navItems = [
    new PageNavItem('Home','https://liecorp.id'),
    new PageNavItem('Blog','https://blog.liecorp.id/pages/index.html'),
    new PageNavItem('Wiki','https://wiki.liecorp.id'),
    new PageNavItem('Xenowiki','https://xenomancy.id'),
    new PageNavItem('Sharebook','https://sharebook.liecorp.id/book/'),
]

injectHTML('topNavbar',generateContentNav(navItems,navItemBtn));
