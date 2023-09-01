class NavItem {
    constructor(navBody,navURL = '#',navClass = null,navOnClick = null) {
        this.navBody = navBody;
        this.navURL = navURL;
        this.navClass = navClass;
        this.navOnClick = navOnClick;
    }
    makeItem() {
        let item, itemProps = [];
        itemProps.push('href="' + this.navURL + '"');
        if (this.navClass !== null ) {
            itemProps.push('class="' + this.navClass + '"');
        }
        if (this.navOnClick !== null ) {
            itemProps.push('onclick="' + this.navOnClick + '"');
        }
        item = '<a ';
        item += itemProps.join(' ');
        item += '>';
        item += this.navBody;
        item += '</a>';
        // `href="${this.navURL}" class="${this.navClass}" onclick="${this.OnCLick}">${this.navBody}</i></a>`
        return item;
    }
}

let topNavbar = document.getElementById("topNavbar");
let navCont = document.getElementById("navContainer");

function generateNavContents (a,b = new NavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()')) {
    let navArr = [];
    let navBtn = b;
    // let navItemBtn = new NavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()');
    navArr = a.map((item) => {
        return item.makeItem();
    })
    navArr.push(navBtn.makeItem());
    return topNavbar.innerHTML = navArr.join('');
}

/*  Toggle between adding and removing the "responsive" class
    to topnav when the user clicks on the icon */
function navBarToggle() {
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

// let navItems = [
//     new NavItem('Home','#Home'),
//     new NavItem('About','#About'),
//     new NavItem('Contact','#Contact'),
// ]
// generateNavContents(navItems);
