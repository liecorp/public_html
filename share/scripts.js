class PageItem {
    constructor(itemElement,itemBody = null,itemClass = null) {
        this.itemElement = itemElement;
        this.itemBody = itemBody;
        this.itemClass = itemClass;
    }
    makeBody() {
        if (this.itemBody) {
            return this.itemBody;
        }
    }
    makeClass() {
        let classContent;
        if (this.itemClass) {
            switch (typeof(this.itemClass)) {
                case 'array':
                    classContent = this.itemClass.join('');
                    break;
                case 'string':
                    classContent = this.itemClass;
                    break;
                default:
                    classContent = String(this.itemClass);
            }
            return 'class="' + classContent + '"';
        }
    }
    makeElement(prop,body = null) {
        let element,item = this.itemElement;
        if (item) {
            switch (typeof(item)) {
                case 'string':
                    element = `<${item} ${prop}>${body}</${item}>`;
                    break;
                default:
                    element = null;
            }
            return element;
        }
        return null;
    }
    makeItem() {
        let item, itemProps = [];
        if (this.itemClass) {
            itemProps.push(this.makeClass());
        }
        item = this.makeElement(itemProps.join(' '),this.itemBody);
        return item;
    }
}

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
        if (this.navClass) {
            itemProps.push('class="' + this.navClass + '"');
        }
        if (this.navOnClick) {
            itemProps.push('onclick="' + this.navOnClick + '"');
        }
        item = '<a ';
        item += itemProps.join(' ');
        item += '>';
        item += this.navBody;
        item += '</a>';
        return item;
    }
}

let topNavbar = document.getElementById("topNavbar");
let navCont = document.getElementById("navContainer");

function generateNavContents (a,b = new NavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()')) {
    let navArr = [];
    let navBtn = b;
    navArr = a.map((item) => {
        return item.makeItem();
    })
    navArr.push(navBtn.makeItem());
    return topNavbar.innerHTML = navArr.join('');
}

/*  Toggle between adding and removing the "responsive" class
    to top-navbar when the user clicks on the icon */
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

// Generate the nav contents with the code below:
// let navItems = [
//     new NavItem('Home','#Home'),
//     new NavItem('About','#About'),
//     new NavItem('Contact','#Contact'),
// ]
// generateNavContents(navItems);
