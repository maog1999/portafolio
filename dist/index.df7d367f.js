gsap.registerPlugin(ScrollTrigger);
const menu = document.querySelector('.menu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const mybutton = document.getElementById("myBtn");
//------Scroll Reveal-------
ScrollReveal().reveal('.container', {
    delay: 100,
    duration: 1500,
    origin: 'bottom',
    distance: '-50px'
});
ScrollReveal().reveal('.aboutme__text', {
    duration: 2200,
    origin: 'bottom',
    distance: '-100px'
});
ScrollReveal().reveal('.project__transition', {
    duration: 2000,
    origin: 'bottom',
    distance: '-100px'
});
ScrollReveal().reveal('.project__photos', {
    duration: 2000,
    origin: 'bottom',
    distance: '-150px'
});
ScrollReveal().reveal('.photo__nomad', {
    duration: 2000,
    origin: 'bottom',
    distance: '-150px'
});
ScrollReveal().reveal('.love__animation', {
    duration: 2500,
    origin: 'top',
    distance: '-150px'
});
ScrollReveal().reveal('.contact__text', {
    delay: 500,
    duration: 2000,
    origin: 'top',
    distance: '-150px'
});
ScrollReveal().reveal('.contact__btn', {
    delay: 550,
    duration: 2000,
    origin: 'top',
    distance: '-150px'
});
//--------
ScrollTrigger.matchMedia({
    "(min-width: 1460px)": function() {
        gsap.to(".line", {
            rotate: 0,
            duration: 2000,
            scrollTrigger: {
                trigger: ".line",
                start: "-400",
                end: "+=1500",
                scrub: 0.1,
                toggleActions: "restart none none none"
            }
        });
        gsap.to(".projects", {
            scrollTrigger: {
                trigger: ".projects",
                endTrigger: ".projects",
                start: "top top",
                end: "+=1800",
                pin: true
            }
        });
        gsap.to(".transition__lastest", {
            x: 592,
            duration: 2000,
            scrollTrigger: {
                trigger: ".transition__lastest",
                start: "-230",
                end: "+=1500",
                scrub: 0.1,
                toggleActions: "restart none none none"
            }
        });
        gsap.to(".transition__projects", {
            x: -548,
            duration: 2000,
            scrollTrigger: {
                trigger: ".transition__projects",
                start: "-400",
                end: "+=1500",
                scrub: 0.1,
                toggleActions: "restart none none none"
            }
        });
        gsap.to(".project__video", {
            scale: 2.65,
            duration: 20000,
            scrollTrigger: {
                trigger: ".project__video",
                start: "-230",
                end: "+=4000",
                scrub: 0.1,
                toggleActions: "restart none none none"
            }
        });
        gsap.to(".project--sinergia", {
            scrollTrigger: {
                trigger: ".project--sinergia",
                start: "top top",
                end: "+=6000",
                pin: true
            }
        });
    }
});
//--------Lastest projects animation---------
//---------Scrolling animations---------
//---------Menu responsive animation---------
openMenu.addEventListener('click', show);
closeMenu.addEventListener('click', close);
function show() {
    menu.style.display = 'flex';
    menu.style.top = '0';
}
function close() {
    menu.style.top = '-100%';
}
function topFunction() {
    document.documentElement.scrollTop = 0; //For chrome n others  
}

//# sourceMappingURL=index.df7d367f.js.map
