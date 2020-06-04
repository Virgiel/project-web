fetch("./component/header.html")
  .then((response) => response.text())
  .then((data) => insertAndExecute("header", data));
fetch("./component/footer.html")
  .then((response) => response.text())
  .then((data) => insertAndExecute("footer", data));
/** Highly unsecured but its OK for this project */
function insertAndExecute(selector, text) {
  const element = document.querySelector(selector);
  element.innerHTML = text;
  //nodeScriptReplace(element);
}
