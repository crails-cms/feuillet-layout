// Here goes the JavaScript for your theme's display
import Lightbox from "./lightbox.js";

console.log("feuillet javascript loading");

window.lightbox = new Lightbox;

function toggleMenu(nav) {
  const on = !nav.classList.contains("open");

  document.body.classList.toggle("menu-overlay", on);
  document.body.classList.toggle("u-offcanvas-opened", on);
  nav.classList.toggle("open", on);
}

function findParentMenu(element) {
  while (element && element.tagName !== "NAV")
    element = element.parentElement;
  return element;
}

document.addEventListener("DOMContentLoaded",function(){

  document.querySelectorAll(".menu-collapse, .u-menu-overlay, .u-menu-close").forEach(element => {
    const nav = findParentMenu(element);
    element.addEventListener("click", function() {
      toggleMenu(nav);
    });
  });

  window.lightbox.collectPictures();

});

console.log("feuillet javascript loaded");
