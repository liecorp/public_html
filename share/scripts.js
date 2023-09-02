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
        let item = this.itemElement;
        if (typeof(item) === 'string') {
            return `<${item} ${prop}>${body}</${item}>`;
        }
        return null;
    }
    makeProps() {
        let props = [];
        props.push(this.makeClass());
        return props.join(' ');
    }
    makeItem() {
        let item;
        item = this.makeElement(this.makeProps(),this.itemBody);
        return item;
    }
}

class PageNavItem extends PageItem {
    constructor(itemBody,itemURL = '#', itemClass = null, itemOnClick = null, itemElement = 'a') {
        super(itemElement, itemBody, itemClass);
        this.itemURL = itemURL;
        this.itemOnClick = itemOnClick;
    }
    makeHref() {
        if (typeof(this.itemURL) === 'string') {
            return `href="${this.itemURL}"`;
        }
    }
    makeOnClick() {
        if (typeof(this.itemOnClick) === 'string') {
            return `onclick="${this.itemOnClick}"`;
        }
    }
    makeProps() {
        let props = [];
        props.push(this.makeHref(),this.makeClass(),this.makeOnClick());
        return props.join(' ');
    }
}

let topNavbar = document.getElementById("topNavbar");
let navCont = document.getElementById("navContainer");

function generateNavContents (a,b = new PageNavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()')) {
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
