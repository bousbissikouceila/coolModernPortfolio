// select DOM Items
let menuBtn = document.querySelector('.menu-btn'),
    menu = document.querySelector('.menu'),
    menuNav = document.querySelector('.menu-nav'),
    menuBranding = document.querySelector('.menu-branding'),
    navItems = document.querySelectorAll('.nav-item'),
    main = document.querySelector('main');

// set initial state of menu

let showMenu = false;
menuBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    if (!showMenu) {
        menuBtn.classList.add('close');
        menu.classList.add('show');
        menuNav.classList.add('show');
        menuBranding.classList.add('show');
        navItems.forEach(item => item.classList.add('show'));
        main.classList.add('back');
        //set menu state
        showMenu = true;
    } else {
        menuBtn.classList.remove('close');
        menu.classList.remove('show');
        menuNav.classList.remove('show');
        menuBranding.classList.remove('show');
        navItems.forEach(item => item.classList.remove('show'));
        main.classList.remove('back');

        //set menu state
        showMenu = false;
    }
}