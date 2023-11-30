// Toggles responsiveness of a given element ID
// Takes two arguments:
// - targetID = element ID of target
// - responsiveClass = class name for responsiveness, defaults to 'responsive'
// if responsiveClass is absent, add to element classes.
// Otherwise removes responsiveClass
function toggleResponsive(targetID, responsiveClass = 'responsive') {
    let target = document.getElementById(targetID);
    let targetArr = target.className.split(' ');
    let isResponsive = function (txt) { return txt === responsiveClass } ;

    if (!targetArr.find(isResponsive)) {
        targetArr.push(responsiveClass);
    } else {
        targetArr = targetArr.filter(c => c !== responsiveClass);
    }
    target.className = targetArr.join(' ');
}

// A single source of truth for navbar
/*  Toggle between adding and removing the "responsive" class
to top-navbar when the user clicks on the icon */
function navBarToggle() {
    toggleResponsive('topNavbar');
    toggleResponsive('navContainer');
}

// Contact api endpoint and make navbar
// optionally takes a custom nav button as its second argument
async function makeNav(navApi, navBtn = 'default') {
    fetch(navApi)
        // if endpoint is resolved, convert to json
        .then(item => { if (item.ok) return item.json() })
        // map item into objects of class PageNavItem
        .then(item => {
            return item.map(obj => {
                return new PageNavItem(obj.name,obj.route,obj.navclass)
            });
        })
        // if mapping is successful, generate contents of navbar
        .then(nav => {
            return generateContentNav(nav, navBtn);
        })
        // insert into navbar
        .then(navbar => injectHTML('topNavbar',navbar))
        .catch((e) => { return 'error:' + e.message; });
}

makeNav('https://liecorp.id/api/navbar')
