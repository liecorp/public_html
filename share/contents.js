let navItemBtn = new PageNavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()');

let navItems = [
    new PageNavItem('Home','#Home'),
    new PageNavItem('Blog','#Blog'),
    new PageNavItem('About','#About'),
    new PageNavItem('Contact','#Contact'),
]
// If navItemBtn is defined, use:
generateNavContents(navItems,navItemBtn);
// Otherwise, use:
// generateNavContents(navItems);
