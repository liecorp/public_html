let navItemBtn = new NavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()');

let navItems = [
    new NavItem('Home','#Home'),
    new NavItem('Blog','#Blog'),
    new NavItem('About','#About'),
    new NavItem('Contact','#Contact'),
]
// If navItemBtn is defined, use:
generateNavContents(navItems,navItemBtn);
// Otherwise, use:
// generateNavContents(navItems);
