export function updateStickyHeader(event) {
  const header = document.querySelector("body > header");
  const method = window.scrollY > 40 ? "add" : "remove";

  header.classList[method]("stick");
}
