/* ----- Fetch and inject ----- */

fetch("./component/header.html")
  .then((response) => response.text())
  .then((data) => {
    inject("header", data);
    toggleNavBar();
  });
fetch("./component/footer.html")
  .then((response) => response.text())
  .then((data) => inject("footer", data));

function inject(selector, text) {
  document.querySelector(selector).innerHTML = text;
}

/* ----- Nav bar state ----- */

let showNav = true;
function toggleNavBar() {
  showNav = !showNav;
  document.querySelector("nav").style.display = showNav ? "block" : "none";
  document.querySelector("#nav-open").style.display = !showNav
    ? "block"
    : "none";
}
