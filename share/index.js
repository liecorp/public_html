let primaryBanner = document.getElementById("primaryBanner");
let infoPanel = document.getElementById("infoPanel");
let nginxWelcome = document.getElementById('nginxWelcome');
let newsItems = document.getElementById('newsItems');
let oldNewsItems = document.getElementById('oldNewsItems');

let navItemBtn = new PageNavItem('<i class="fa fa-bars"></i>','javascript:void(0)','nav-icon','navBarToggle()');

let navItems = [
    new PageNavItem('Home','https://liecorp.id','nav-home'),
    new PageNavItem('Blog','https://blog.liecorp.id/pages/index.html','nav-blog'),
    new PageNavItem('Wiki','https://wiki.liecorp.id','nav-wiki'),
    new PageNavItem('Xenowiki','https://xenomancy.id'),
    new PageNavItem('Sharebook','https://sharebook.liecorp.id/book/','nav-sharebook'),
]

let pageBlocks = {
    'nginx': `<h2>Welcome to Nginx!</h2>
<p>
If you see this page, the nginx web server is successfully installed and working.
    Further configuration is required.
</p>
<p>For online documentation and support please refer to
<a class="navbar-link" class="link-light" href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
    <a class="navbar-link" class="link-light" href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>`,
    'info': `<h2>Secondary Block</h2>
<p>
    The content should not matter much.
    What is important is that this section should not be a primary one.
    It should contain extra contents not vital to be not present.
</p>`,
    'primary': `<h2 class="heading">A simple, lightweight webpage</h2>

<p>You've reached the website for <strong>liecorp.id</strong>, hosted in a
lightweight and flexible Linux server that tries to Keep It
Simple.</p>

<p>Currently we have several pages live and available to access from our simple
navigation bar. Feel free to check for them. Though note that they are mostly
work in progress.</p>

<p>This page is served with an nginx web server. Some of the other sites here are
served with nginx inside docker containers, especially the ones with php as their
backend. Those sites served from within docker containers are then configured to
their respective subdomains with native nginx web server and simple reverse proxy
configurations.</p>`
}

let contentObjects = [
    new PageItem('div',pageBlocks.nginx,'nginx-welcome'),
    new PageItem('div',pageBlocks.info,'info-panel'),
    new PageItem('div',pageBlocks.primary,'primary-banner'),
]

let newsBodies  = [
    `<p>As of <code>ansible-core 2.15.3</code>, upstream moved documentation and examples to a separate <a href="https://github.com/ansible/ansible-documentation">dedicated repository</a> (see the <a href="https://github.com/ansible/ansible/blob/v2.15.3/changelogs/CHANGELOG-v2.15.rst#minor-changes">related changelogs</a>).<br />
    This means that, starting from version <code>2.15.3</code> the <code>ansible-core</code> package will stop shipping documentation and a default configuration example under <code>/etc/ansible/ansible.cfg</code>.</p>
    <p>Regarding the documentation, it is available online: <a href="https://docs.ansible.com/">https://docs.ansible.com/</a><br />
    As for the configuration file, as explained in the <a href="https://wiki.archlinux.org/title/Ansible#Configuration">wiki</a>, a base config can be generated with the following command:</p>
    <p><code>ansible-config init --disabled &gt; ansible.cfg</code></p>
    <p>After updating from <code>ansible-core</code> &lt;= <code>2.15.2-1</code> to &gt;= <code>2.15.3-1</code>, everyone using a <strong>custom</strong> global Ansible configuration file stored under <code>/etc/ansible/ansible.cfg</code> will have their configuration saved as a <code>pacsave</code> file.<br />
    To restore it, run the following command:</p>
    <p><code>mv /etc/ansible/ansible.cfg.pacsave /etc/ansible/ansible.cfg</code></p>`,
    `<p>When upgrading from budgie-desktop 10.7.2-5 to 10.7.2-6, the package mutter43 must be replaced with magpie-wm, which currently depends on mutter. As mutter43 conflicts with mutter, manual intervention is required to complete the upgrade.</p>
    <p>First remove mutter43, then immediately perform the upgrade. Do not relog or
    reboot between these steps.</p>
    <p><code>pacman -Rdd mutter43</code></p>
    <p><code>pacman -Syu</code></p>`,
    `<p>Starting from version 2023.66594-9, TeX Live packages have been reorganized to mirror upstream collections. Even though the new <code>texlive-basic</code> replaces the old <code>texlive-core</code>, many of the texlive-core contents (including language specific files) are now split between different packages. To find out which Arch package contains a specific CTAN package, you can use the <code>tlmgr</code> utility, eg.</p>
<pre><code>$ tlmgr info euler | grep collection
collection:  collection-latexrecommended</code></pre>
    <p>which means the euler CTAN package is contained in <code>texlive-latexrecommended</code>. You may also use <code>pacman -F</code> to query for specific files.</p>
    <p>A new metapackage texlive-meta is available to install all subpackages (except for …</p>`,
]

let news = [
    makeNewsItemCollection('ansible-core &gt;= 2.15.3-1 update may require manual intervention','2023-08-19 03:25:22 UTC+8',newsBodies[0],"/news/ansible-core-2153-1-update-may-require-manual-intervention/"),
    makeNewsItemCollection('budgie-desktop &gt;= 10.7.2-6 update requires manual intervention','2023-08-11 03:53:45 UTC+7',newsBodies[1],"/news/budgie-desktop-1072-6-update-requires-manual-intervention/"),
    makeNewsItemCollection('TeX Live package reorganization','2023-06-18 1:36:27 UTC+3',newsBodies[2],"/news/tex-live-package-reorganization/"),
    makeNewsItemCollection('Git migration announcement','2023-05-15 13:42:11 UTC+7',pageBlocks.nginx,"/news/switch-to-the-base-devel-meta-package-requires-manual-intervention/"),
    makeNewsItemCollection('PHP 8.2 update and introduction of legacy branch','2023-01-13 13:42:11 UTC+7',pageBlocks.info,"/news/php-82-update-and-introduction-of-legacy-branch/"),
    makeNewsItemCollection('In memory of Jonathon Fernyhough','2023-01-12 13:42:11 UTC+7',pageBlocks.primary,"/news/in-memory-of-jonathon-fernyhough/"),
]

newsArray = generateNewsArray(news,3);
injectHTML(newsItems,       newsArray[0]);
injectHTML(oldNewsItems,    newsArray[1]);

injectHTML(nginxWelcome,    generateContent(contentObjects[0]));
injectHTML(infoPanel,       generateContent(contentObjects[1]));
injectHTML(primaryBanner,   generateContent(contentObjects[2]));
injectHTML(topNavbar,       generateContentNav(navItems,navItemBtn));
