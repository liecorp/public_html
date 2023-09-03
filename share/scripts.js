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

function makeNewsItemClass(classTitle,classStamp,classBody) {
    let itemClass = {
        'title': classTitle,
        'stamp': classStamp,
        'body': classBody,
    }
    return itemClass;
}

function makeNewsItemCollection(newsTitle,newsStamp,newsBody = '',newsLink = '#',newsClass = null,newsElement = 'div') {
    let newsCol = {
        'title': newsTitle,
        'stamp': new Date(newsStamp.toString()),
        'body': newsBody,
        'href': newsLink,
        'class': newsClass,
        'element': newsElement,
    }
    return newsCol;
}

class NewsItem extends PageItem {
    constructor(
        itemTitle,
        itemDate,
        itemBody,
        itemURL = '#',
        itemClass = makeNewsItemClass('content-news-head','content-timestamp','content-news-body'),
        itemElement = 'div'
        )
    {
        super(itemElement,itemBody,itemClass);
        this.itemTitle = itemTitle;
        this.itemDate = itemDate;
        this.itemURL = itemURL;
    }
    getClass(a) {
        let item;
        if (this.itemClass[a]) {
            item = ` class="${this.itemClass[a]}"`;
        } else {
            item = '';
        }
        return item;
    }
    makeHref() {
        let title = this.itemTitle, href = this.itemURL;
        return `<a href="${href}" title="View full article: ${title}">${title}</a>`;
    }
    makeTitle() {
        return `<h4${this.getClass('title')}>${this.makeHref()}</h4>`;
    }
    makeIsoString() {
        let date, isoString;
        if (!date instanceof Date) {
            date = new Date(date.toString());
        } else { date = this.itemDate };
        // format date into ISO string, see:
        // https://stackoverflow.com/a/29774197/12571203
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() - (offset*60*1000));
        isoString = date.toISOString().split('T')[0];
        return isoString;
    }
    makeDate() {
        return `<p${this.getClass('stamp')}>${this.makeIsoString()}</p>`;
    }
    makeBody() {
        let fullDiv, body = this.itemBody, itemClass = this.getClass('body');
        return fullDiv = `<div${itemClass}>${body}</div>`;
    }
    makeItem() {
        let item = [];
        item.push(
            this.makeTitle(),
            this.makeDate(),
            this.makeBody()
            )
        return item.join('');
    }
    makeShortList() {
        return `<dt>${this.makeIsoString()}</dt><dd>${this.makeHref()}</dd>`;
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

function generateContentNav(objArr,btn = 'default') {
    let itemBtn, sourceObj, navArr = [], navItem;

    // define itemBtn
    if (btn === 'default') {
        itemBtn = new PageNavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()');
    } else { itemBtn = btn; }

    // define objArr
    if (typeof(objArr) === 'object' ) {
        sourceObj = objArr;
    }

    // construct nav
    navArr = sourceObj.map(
        (item) => {
            return item.makeItem();
        }
        );
    navArr.push(itemBtn.makeItem());

    return navItem = navArr.join('');
}

function generateContent(obj) {
    let item;
    if (obj instanceof PageItem) {
        item = obj.makeItem();
    }
    return item;
}

function generateNewsItem(obj,type = 'post') {
    let item, itemBasket = [];

    if (obj instanceof NewsItem) {
        switch (type) {
            case 'list': item = obj.makeShortList(); break;
            default: item = obj.makeItem(); }
    } else {
        itemBasket = obj.map((n) => {
            if (n instanceof NewsItem) {
                let item;
                switch (type) {
                    case 'list': item = n.makeShortList(); break;
                    default: item = n.makeItem(); }
                return item;
            }
        });
    }
    item = itemBasket.join('');

    return item;
}

function injectHTML(id,item) {
    let target;
    // define targetId
    if (typeof(id) === 'object') {
        target = id;
    } else if (typeof(id) === 'string') {
        target = document.getElementById(id);
    }
    // inject item to target object
    return target.innerHTML = item;
}

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
