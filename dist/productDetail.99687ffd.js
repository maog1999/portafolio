function t(t,e,a,n){Object.defineProperty(t,e,{get:a,set:n,enumerable:!0,configurable:!0})}var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},a={},n={},r=e.parcelRequireb12e;null==r&&((r=function(t){if(t in a)return a[t].exports;if(t in n){var e=n[t];delete n[t];var r={id:t,exports:{}};return a[t]=r,e.call(r.exports,r,r.exports),r.exports}var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(t,e){n[t]=e},e.parcelRequireb12e=r),r.register("jOLmm",(function(e,a){t(e.exports,"addProductToCart",(()=>f)),t(e.exports,"getMyCart",(()=>m));var n=r("ijjug"),o=r("etBjH"),i=r("1tHc5"),c=r("jVR3t"),s=r("lBmPO");const d=document.getElementById("detail__info"),l=document.getElementById("detail__photo");let u,g=[];async function p(){const t=function(t){const e=window.location.search;return new URLSearchParams(e).get(t)}("id"),e=o.doc(n.db,"products",t);!function(t){l.style.backgroundImage=`url("${t.images[1]}")`,d.innerHTML=`\n            <div class="detail__header">\n                <img src="https://firebasestorage.googleapis.com/v0/b/maog-shop.appspot.com/o/images%2Flogo-black.png?alt=media&token=0baf1284-d5f6-4f98-9d0e-0e89dde59004" width="45px" alt="logo">\n                <li class="menu__list__black"><a href="./myCart.html">Cart</a> <div id="cartCounter"> ${g.length}</div></li>\n            </div>\n\n            <div class="detail__text visbyMedium">\n                <h1 class="detail__text__01">${t.category.toUpperCase()}</h1>\n                <h1 class="detail__text__02">${t.category.toUpperCase()}</h1>\n                <h1 class="detail__text__03">${t.category.toUpperCase()}</h1>\n            </div>\n\n            <div class= "detail__info">\n                <h3>${c.currencyFormat(t.price)}</h3>\n                <p>${t.description}</p>\n            </div>\n\n            <div class="detail__btn">\n            <img src="https://firebasestorage.googleapis.com/v0/b/maog-shop.appspot.com/o/images%2Fcounter.png?alt=media&token=0f9a670c-fa0e-4d11-a8e3-658dda8642fd" width="" alt="contador">\n            <button class="btn__cart">Add to cart</button>\n            </div>\n    `;const e=d.querySelector(".btn__cart"),a=d.querySelector("#cartCounter");e.addEventListener("click",(async e=>{e.preventDefault(),g.push(t),f(g),u&&await s.createFirebaseCart(n.db,u.uid,g),a.innerText=g.length,console.log(g.length)}))}({...(await o.getDoc(e)).data(),id:t})}async function f(t){localStorage.setItem("cat",JSON.stringify(t))}function m(){const t=localStorage.getItem("cart");return t?JSON.parse(t):[]}i.onAuthStateChanged(n.auth,(async t=>{t?(u=t,g=await s.getFirebaseCart(n.db,u.uid)):g=m(),p()}))})),r.register("jVR3t",(function(e,a){function n(t){return new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(t)}t(e.exports,"currencyFormat",(()=>n))})),r.register("lBmPO",(function(e,a){t(e.exports,"createFirebaseCart",(()=>o)),t(e.exports,"getFirebaseCart",(()=>i));var n=r("etBjH");async function o(t,e,a){try{await n.setDoc(n.doc(t,"cart",e),{cart:a})}catch(t){console.log(t)}}async function i(t,e){const a=n.doc(t,"cart",e),r=(await n.getDoc(a)).data();return r?r.cart:[]}})),r("jOLmm");
//# sourceMappingURL=productDetail.99687ffd.js.map
