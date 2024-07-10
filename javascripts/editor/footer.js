class ParagraphComponent extends PageEditor.GridComponentEditor() {
  create() {
    const container = document.createElement("div");

    console.log("building paragraph component");
    window.bite = container;
    this.root.appendChild(container);
    this.root.setAttribute("class", "u-align-left u-container-style");
    container.setAttribute("class", "u-container-layout u-container-layout-1");
    container.dataset.editable = '';
    container.innerHTML = "<h6>Title</h6><p>Content</p>";
    super.create();
  }

  bindElements() {
    this.content = this.root.children[0];
    super.bindElements();
  }
}

class SocialsComponent extends PageEditor.GridComponentEditor() {
}

export default class extends PageEditor.FooterComponentEditor {
  constructor(parent, element) {
    super(parent, element, {
      paragraph: ParagraphComponent,
      socials: SocialsComponent
    });
  }

  create() {
    const sheet = document.createElement("div");
    const wrapper = document.createElement("div");
    const layout = document.createElement("div");
    const container = document.createElement("div");

    this.root.setAttribute("class", "top-margin-for-add-section-widget-small u-clearfix u-footer u-white");
    sheet.setAttribute    ("class", "u-clearfix u-sheet u-sheet-1");
    wrapper.setAttribute  ("class", "u-clearfix u-expanded-width-lg u-expanded-width-md u-expanded-width-xl u-expanded-width-xs u-gutter-30 u-layout-wrap u-layout-wrap-1");
    layout.setAttribute   ("class", "u-gutter-0 u-layout");
    container.setAttribute("class", "u-layout-row");
    this.root.appendChild(sheet);
    sheet.appendChild(wrapper);
    wrapper.appendChild(layout);
    layout.appendChild(container);
    super.create();
  }

  bindElements() {
    this.content = this.root.querySelector(".u-layout-row");
    super.bindElements();
  }

  get container() {
    return this.content;
  }
}

