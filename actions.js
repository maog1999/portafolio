gsap.registerPlugin(ScrollTrigger);
const menu = document.querySelector('.menu');
const closeMenu = document.querySelector('.closeMenu');
const openMenu = document.querySelector('.openMenu');
const mybutton = document.getElementById("myBtn");

ScrollReveal().reveal('.intro');
ScrollReveal().reveal('.aboutme', { delay: 300 });

//--------Lastest projects animation---------
gsap.to(".projects", {
    scrollTrigger: {
        trigger: ".projects",
        endTrigger: ".projects",
        start: "top top",
        end: "+=1800",
        pin: true,
        /*markers: {
            startColor: "red",
            endColor: "white",
            fontSize: "2em",
        },*/
    }
});

gsap.to(".transition__lastest", {
    x:561,
    duration: 2000,
    scrollTrigger: {
        trigger: ".transition__lastest",
        start: "-230",
        end: "+=1500",
        scrub: 0.1,
        toggleActions: "restart none none none",
        markers: {
            startColor: "yellow",
            endColor: "red",
            fontSize: "2em",
        },
    }
});

gsap.to(".transition__projects", {
    x:-555,
    duration: 2000,
    scrollTrigger: {
        trigger: ".transition__projects",
        start: "-400",
        end: "+=1500",
        scrub: 0.1,
        toggleActions: "restart none none none",
        /*markers: {
            startColor: "yellow",
            endColor: "red",
            fontSize: "2em",
        },*/
    }
});

gsap.to(".line", {
    rotate: 0,
    duration: 2000,
    scrollTrigger: {
        trigger: ".line",
        start: "-400",
        end: "+=1500",
        scrub: 0.1,
        toggleActions: "restart none none none",
        /*markers: {
            startColor: "red",
            endColor: "red",
            fontSize: "2em",
        },*/
    }
});

//---------Scrolling animations---------
gsap.to(".project__video", {
    scale:2.65,
    duration: 20000,
    scrollTrigger: {
        trigger: ".project__video",
        start: "-230",
        end: "+=4000",
        scrub: 0.1,
        toggleActions: "restart none none none",
        /*markers: {
            startColor: "red",
            endColor: "red",
            fontSize: "2em",
        },*/
    }
});

gsap.to(".project--sinergia", {
    scrollTrigger: {
        trigger: ".project--sinergia",
        start: "top top",
        end: "+=6000",
        pin: true,
        markers: {
            startColor: "yellow",
            endColor: "yellow",
            fontSize: "2em",
        },
    }
});

//---------Menu responsive animation---------
openMenu.addEventListener('click',show);
closeMenu.addEventListener('click',close);

function show(){
    menu.style.display = 'flex';
    menu.style.top = '0';
}
function close(){
    menu.style.top = '-100%';
}

function topFunction() {
    document.documentElement.scrollTop = 0; //For chrome n others  
}