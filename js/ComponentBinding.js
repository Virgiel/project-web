fetch("./component/header.html")
  .then((response) => response.text())
  .then((data) => {
    insertAndExecute("header", data);
    const script = document.createElement("script");
  });
fetch("./component/footer.html")
  .then((response) => response.text())
  .then((data) => insertAndExecute("footer", data));
/** Highly unsecured but its OK for this project */
function insertAndExecute(selector, text) {
  const element = document.querySelector(selector);
  element.innerHTML = text;
}
let showNav = true;
function toggleNavBar() {
  console.log(showNav);
  showNav = !showNav;
  document.querySelector("nav").style.display = showNav ? "block" : "none";
}