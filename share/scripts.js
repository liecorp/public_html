// A base class PageItem, that can consume basic arguments such as target element,
// target body, and target classes, then produce a string to be inserted with innerHTML
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
        item = this.makeElement(this.makeProps(),this.makeBody());
        return item;
    }
}

// Generate an object that can be consumed by class NewsItem
// Use this if you want the object to interact properly with
// NewsItem constructor
function makeNewsItemClass(classTitle,classStamp,classBody) {
    let itemClass = {
        'title': classTitle,
        'stamp': classStamp,
        'body': classBody,
    }
    return itemClass;
}

// A function to produce an object that can easily be parsed into a NewsItem class
// Note that the newsClass argument expects to receive an object created by makeNewsItemClass()
function makeNewsItemCollection( newsTitle, newsStamp, newsBody = '', newsLink = '#',
            newsClass = makeNewsItemClass('content-news-head','content-timestamp','content-news-body'),
            newsElement = 'div')
{
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

// A special case of PageItem where title is separated from body

class PostItem extends PageItem {
    constructor(itemElement,itemTitle = null, itemBody = null,itemClass = null) {
        super(itemElement,itemBody,itemClass);
        this.itemTitle = itemTitle;
    }

    makeTitle() {
        return `<h2>${this.itemTitle}</h2>`;
    }

    makeBody() {
        if (this.itemBody) {
            return this.itemBody;
        }
    }

    makeItem() {
        let item;
        item = this.makeElement(this.makeProps(),this.makeTitle()+this.makeBody());
        return item;
    }
}

// A special case of PageItem where the html block being produced will be used in a post format
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

// Special class that extends from PageItem, specifically made to handle
// the creation of a navbar.
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

// Generate nav html block from an array, where each array item
// is a member of class PageNavItem. Optionally include a responsive
// button object.
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

// expects object that is a part of class PageItem
// produces a fully formed div
function generateContent(obj) {
    let item;
    if (obj instanceof PageItem || obj instanceof PostItem) {
        item = obj.makeItem();
    }
    return item;
}

// expects object that is a part of class NewsItem
// Produces a string of news content. Has two formats:
// - 'post' format is the default, fully formed div
// - 'list' format is for definition list style, meant to be
//          contained in a <dl> tag
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

// Expect to be fed objects created by makeNewsItemCollection()
// Essentially transform objects created by makeNewsItemCollection()
// into NewsItem objects and split them into an array of strings:
// [0]: in post form
// [1]: in definition list form
function generateNewsArray(arr,limit = 3) {
    let newsLatest = [], newsOlder = [], latest,older;
    for ( let i = 0 ; i < arr.length ; i++ ) {
        if (i < limit) {
            newsLatest.push(new NewsItem(arr[i].title,arr[i].stamp,arr[i].body,arr[i].href,arr[i].class,arr[i].element));
        } else {
            newsOlder.push(new NewsItem(arr[i].title,arr[i].stamp,arr[i].body,arr[i].href,arr[i].class,arr[i].element));
        }
    }

    latest = generateNewsItem(newsLatest);
    older = generateNewsItem(newsOlder,'list');

    return [ latest, older ];
}

// A specialized tool to inject html blocks into a specified class
// Item must be a string
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
