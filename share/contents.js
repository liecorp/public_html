let navItemBtn = new PageNavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()');

let navItems = [
    new PageNavItem('Home','vanilla.html'),
    new PageNavItem('Blog','vanilla.html#Blog'),
    new PageNavItem('About','vanilla.html#About'),
    new PageNavItem('Contact','vanilla.html#Contact'),
]
// If navItemBtn is defined, use:
generateNavContents(navItems,navItemBtn);
// Otherwise, use:
// generateNavContents(navItems);

function updateNavContent(origNav,originHref) {
    // fullGetString = [this.location.pathname,this.location.hash].join('');
    console.log(origNav);
    let updatedNav = origNav.map((item) => {
        if (`${window.location.origin}/${item.itemURL}` === originHref) {
            if (typeof(item.itemClass) === 'string') {
                item.itemClass += ' active';
            } else { item.itemClass = 'active'; }
            return item;
        }
        return item;
    })
    generateNavContents(updatedNav,navItemBtn)
    console.log(origNav === updatedNav)
}

document.addEventListener(`click`, e => {
    const origin = e.target.closest(`a`);
    
    if (origin) {
        // console.clear();
        console.log(`You clicked ${origin.href}`);
        updateNavContent(navItems,origin.href);
    }
});