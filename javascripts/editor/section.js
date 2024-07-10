import GalleryComponent from "./gallery.js";

class ParagraphComponent extends PageEditor.GridComponentEditor() {
  create() {
    const layout = document.createElement("div");
    const wrapper = document.createElement("div");
    const container = document.createElement("div");

    container.innerHTML = "<h3>Lorem ipsum</h3><p>Lorem ipsum dolor sit ahmet</p>";
    container.dataset.editable = '';
    wrapper.setAttribute("class", "u-align-left-md u-align-left-sm u-align-left-xs u-container-style u-layout-cell u-left-cell u-size-20 u-layout-cell-2");
    wrapper.appendChild(container);
    layout.classList.add("u-layout-col");
    layout.appendChild(wrapper);
    this.root.appendChild(layout);
    super.create();
  }
}

class PictureComponent extends PageEditor.GridComponentEditor(PageEditor.ImageComponentEditor) {
}

export default class extends PageEditor.NestedComponentEditor {
  constructor(parent, element) {
    super(parent, element, {
      paragraph: ParagraphComponent,
      picture: PictureComponent,
      gallery: GalleryComponent
    });
  }

  initializeProperties() {
    this.properties.feuilletSide = { type: "select", target: this, attribute: "feuilletSide", options: [
      { value: 0, text: "Left side" },
      { value: 1, text: "Right side" },
      { value: 2, text: "Full width" }
    ] };
    this.properties.feuilletStyle = { type: "select", target: this, attribute: "feuilletStyle", options: [
      { value: 1, text: "Hidden" },
      { value: 0, text: "Default" },
      { value: 2, text: "StickToTop" },
      { value: 3, text: "StickToBottom" }
    ]};
    this.properties.feuilletColor = { type: "color", optional: true, target: this.feuillet, style: "backgroundColor" };
    this.properties.textColor = { type: "color", optional: true, target: this.root, style: "color" };
    super.initializeProperties();
  }

  set feuilletSide(value) {
    window.bitepoil = this.feuillet;
    console.log("setFeuilletSide", value);
    this.feuillet.classList.toggle("full-width", value == 2);
    this.feuillet.classList.toggle("right-handed", value == 1);
  }

  get feuilletSide() {
    if (this.feuillet.classList.contains("right-handed"))
      return 1;
    else if (this.feuillet.classList.contains("full-width"))
      return 2;
    return 0;
  }

  set feuilletStyle(value) {
    this.feuillet.style.display = value == 1 ? "none" : "";
    this.feuillet.classList.toggle("stick-to-bottom", value == 3);
    this.feuillet.classList.toggle("partial-size", value == 2 || value == 3);
  }

  get feuilletStyle() {
    if (this.feuillet.style.display == "none")
      return 1;
    if (this.feuillet.classList.contains("stick-to-bottom"))
      return 3;
    if (this.feuillet.classList.contains("partial-size"))
      return 2;
    return 0;
  }

  create() {
    const feuillet = document.createElement("div");
    const sheet = document.createElement("div");
    const wrapper = document.createElement("div");
    const layout = document.createElement("div");
    const container = document.createElement("div");

    feuillet.classList.add("feuillet");
    feuillet.style.backgroundColor = "#fcd9c6";
    this.root.classList.add("u-clearfix");
    this.root.appendChild(feuillet);
    this.root.appendChild(sheet);
    sheet.setAttribute("class", "u-clearfix u-sheet u-sheet-1");
    sheet.appendChild(wrapper);
    wrapper.setAttribute("class", "u-clearfix u-layout-wrap u-layout-wrap-1");
    wrapper.appendChild(layout);
    layout.setAttribute("class", "u-layout");
    layout.appendChild(container);
    container.setAttribute("class", "u-layout-row");
    super.create();
  }

  bindElements() {
    this.feuillet = this.root.children[0];
    this.content = this.root.querySelector(".u-layout-row");
    super.bindElements();
  }

  get container() {
    return this.content;
  }
}

