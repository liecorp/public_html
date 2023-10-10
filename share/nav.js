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

// Contact api endpoint and make navbar
// optionally takes a custom nav button as its second argument
async function makeNav(navApi, navBtn = 'default') {
    fetch(navApi)
        .then(item => {
            // if endpoint is resolved, convert to json
            if (item.ok) {
                return item.json()
            }
        })
        .then(item => {
            // map item into objects of class PageNavItem
            return item.map(obj => {
                return new PageNavItem(obj.name,obj.route,obj.navclass)
            });
        })
        .then(nav => {
            // if mapping is successful, generate contents of navbar
            return generateContentNav(nav, navBtn);
        })
        // insert into navbar
        .then(navbar => injectHTML('topNavbar',navbar))
        .catch((e) => { return 'error:' + e.message; });
}

let navItemBtn = new PageNavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()');

let navItems = [
    new PageNavItem('Home','/','nav-home'),
    new PageNavItem('Blog','/pages/blog.html','nav-blog'),
    new PageNavItem('Wiki','/pages/wiki.html','nav-wiki'),
    new PageNavItem('About','/pages/about.html','nav-about'),
    // new PageNavItem('Xenowiki','https://xenomancy.id'),
    // new PageNavItem('Sharebook','https://sharebook.liecorp.id/book/'),
]

makeNav('https://liecorp.id/api/navbar')
