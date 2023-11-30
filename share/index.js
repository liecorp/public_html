let primaryBanner = document.getElementById("primaryBanner");
let infoPanel = document.getElementById("infoPanel");
let nginxWelcome = document.getElementById('nginxWelcome');
let newsItems = document.getElementById('newsItems');
let oldNewsItems = document.getElementById('oldNewsItems');

function homeProcessor(data) {
    // Get metadata
    let meta = {
        'pageTitle': data.pageTitle,
        'pageClass': data.pageClass,
        'pageLayout': data.layout,
        'latestCount': data.feed.latestcount,
    };

    let feed = data.feed;
    // Make banners array
    let banners = {
        'primary': new PostItem('div',feed.primary.title,feed.primary.body,'primary-banner'),
        'secondary': new PostItem('div',feed.secondary.title,feed.secondary.body,'info-panel'),
        'tertiary': new PostItem('div',feed.tertiary.title,feed.tertiary.body,'nginx-welcome'),
    }

    // Make news array
    let newsArray = [];

    for (let i = 0 ; i < data.feed.news.length ; i++) {
        let item = data.feed.news[i];
        newsArray.push(makeNewsItemCollection(item.title,item.created,item.body,item.link));
    }

    let news = generateNewsArray(newsArray,meta.latestCount);

    return {
        'meta': meta,
        'banners': banners,
        'news': news,
    };
}

function homeInjector(data) {
    injectHTML(newsItems,       data.news[0]);
    injectHTML(oldNewsItems,    data.news[1]);

    injectHTML(primaryBanner,   generateContent(data.banners.primary));
    injectHTML(infoPanel,       generateContent(data.banners.secondary));
    injectHTML(nginxWelcome,    generateContent(data.banners.tertiary));
}

// Contact api endpoint and make contents of home
async function makeHome(api) {
    fetch(api)
        // if endpoint is resolved, convert to json
        .then(item => { if (item.ok) return item.json() })
        // process feeds into a single object
        .then(item => { return homeProcessor(item.data) })
        // inject items to home page
        .then(item => homeInjector(item))
        .catch((e) => { return 'error:' + e.message; });
}

makeHome('https://liecorp.id/api/home')
