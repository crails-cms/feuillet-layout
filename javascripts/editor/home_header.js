export default class extends PageEditor.BackgroundComponentEditor() {
  initializeProperties() {
    this.overlaySelector = ">.component-overlay";
    this.properties.logo = { type: "image", target: this.logoElement, attribute: "src" };
    super.initializeProperties();
  }

  create() {
    const tintOverlay = document.createElement("div");
    const sheet = document.createElement("div");
    const wrapper = document.createElement("div");
    const layout = document.createElement("div");
    const container = document.createElement("div");
    const logoCell = document.createElement("div");
    const logoContainer = document.createElement("div");
    const logo = document.createElement("img");
    const contentCell = document.createElement("div");
    const contentContainer = document.createElement("div");

    this.root.style.backgroundImage = "url(https://images01.nicepage.io/c461c07a441a5d220e8feb1a/c2e6db225ea759cca0f4f5b5/g.png)";
    this.root.appendChild(tintOverlay);
    this.root.appendChild(sheet);
    sheet.appendChild(wrapper);
    wrapper.appendChild(layout);
    layout.appendChild(container);
    container.appendChild(logoCell);
    container.appendChild(contentCell);
    logoCell.appendChild(logoContainer);
    contentCell.appendChild(contentContainer);
    logoContainer.appendChild(logo);
    this.root.setAttribute("class", "u-clearfix u-expand-resize u-image u-section-2");
    tintOverlay.setAttribute("class", "component-overlay");
    sheet.setAttribute("class", "u-clearfix u-sheet u-sheet-1");
    wrapper.setAttribute("class", "u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1");
    layout.setAttribute("class", "u-layout");
    container.setAttribute("class", "u-layout-row");
    logoCell.setAttribute("class", "u-align-center-lg u-align-center-md u-align-center-xl u-container-style u-layout-cell u-left-cell u-size-15 u-layout-cell-1");
    logoContainer.setAttribute("class", "u-container-layout u-valign-top u-container-layout-1");
    logo.setAttribute("class", "u-image u-image-contain u-image-default u-image-1");
    contentCell.setAttribute("class", "u-align-center-sm u-align-center-xs u-container-style u-layout-cell u-right-cell u-size-45 u-layout-cell-2");
    contentContainer.setAttribute("class", "u-container-layout u-valign-top u-container-layout-2");
    contentContainer.dataset.editable = '';
    contentContainer.innerHTML = "<h3>Secondary header</h3><h1>Primary header</h1>";
    super.create();
  }

  get logoElement() {
    return this.logoCell.querySelector("img");
  }

  get logoCell() {
    return this.root.querySelector(".u-layout-cell-1");
  }

  get contentCell() {
    return this.root.querySelector(".u-layout-cell-2");
  }
}
