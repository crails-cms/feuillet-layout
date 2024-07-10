export default class {
  constructor() {
    this.root = document.createElement("div");
    this.closeButton = document.createElement("button");
    this.previousButton = document.createElement("button");
    this.nextButton = document.createElement("button");
    this.container = document.createElement("div");

    this.closeButton.classList.add("close");
    this.previousButton.classList.add("previous");
    this.nextButton.classList.add("next");
    this.root.classList.add("lightbox");
    this.root.appendChild(this.closeButton);
    this.root.appendChild(this.previousButton);
    this.root.appendChild(this.nextButton);
    this.root.appendChild(this.container);

    this.root.addEventListener("click", event => {
      const source = event.target || event.srcElement;
      if (source == this.root)
        this.close();
    });
    this.nextButton.addEventListener("click", this.moveToNext.bind(this));
    this.previousButton.addEventListener("click", this.moveToPrevious.bind(this));
    this.closeButton.addEventListener("click", this.close.bind(this));
  }

  open() {
    document.body.appendChild(this.root);
  }

  close() {
    document.body.removeChild(this.root);
  }

  collectPictures() {
    this.pictures = [];
    document.querySelectorAll("figure.image img, figure.wp-block-image img").forEach(element => {
      element.style.cursor = "pointer";
      element.classList.add("with-lightbox");
      element.addEventListener("click", this.setCurrentPicture.bind(this, element));
      this.pictures.push(element);
    });
    this.nextButton.style.display
      = this.previousButton.style.display
      = this.pictures.length > 1 ? "block" : "none";
  }

  moveToPrevious() {
    const index = this.pictures.indexOf(this.currentElement);
    if (this.pictures[index - 1])
      this.setCurrentPicture(this.pictures[index - 1]);
    else
      this.setCurrentPicture(this.pictures[this.pictures.length - 1]);
  }

  moveToNext() {
    const index = this.pictures.indexOf(this.currentElement);
    if (this.pictures[index + 1])
      this.setCurrentPicture(this.pictures[index + 1]);
    else
      this.setCurrentPicture(this.pictures[0]);
  }

  setCurrentPicture(element) {
    this.currentElement = element;
    this.container.innerHTML = `<img src="${element.src}" />`;
    this.open();
  }
}

