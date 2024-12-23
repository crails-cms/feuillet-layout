// Here goes the JavaScript for your theme's layout editor
import HomeHeaderComponent from "./editor/home_header.js";
import SectionComponent from "./editor/section.js";
import FooterComponent from "./editor/footer.js";

const nicepageGridSize = 60;

function spanForDisplay(sizes, displaySize) {
  const size = sizes[displaySize];

  if (size === undefined && displaySize > 0) {
    return spanForDisplay(sizes, --displaySize);
  }
  return size;
}

PageEditor.GridComponentEditor.model = new class extends PageEditor.GridComponentEditor.Model {
  get maxColumns() { return 10; }
  get gridClassList() { return ["u-layout-row"]; }
  get componentClassPattern() { return /^u-(hidden|size-[0-9]+)-(xl|lg|md|sm)/; }
  widthFromSize(sizeId) { return [1200, 992, 576, 340][sizeId]; }
  mediaSizeName(value) { return ['xl', 'lg', 'md', 'sm'][value]; }
  sizeFromMediaName(value) {
    return {
      'xl': this.sizes.VeryLarge, 'lg': this.sizes.Large, 'md': this.sizes.Medium, 'sm': this.sizes.Small
    }[value];
  }
  extractSizeAndSpanFromClassMatch(match) {
    return {
      media: match[2],
      span: match[1] == "hidden" ? 0 : parseInt(match[1].slice(5)) / nicepageGridSize
    };
  }
  updateElementSizes(element, sizes) {
    let defaultSize = null;
    this.resetElementSizes(element);
    for (let i = 0 ; i <= this.sizes.Small ; ++i) {
      const size = spanForDisplay(sizes, i);
      const sizeName = this.mediaSizeName(i);

      if (size !== undefined) {
        element.classList.add(this.classNameForSpan(sizeName, size));
        defaultSize = defaultSize === null ? size : defaultSize;
      }
    }
    defaultSize = defaultSize === null ? nicepageGridSize : defaultSize;
    element.classList.add(this.classNameForSpan('', defaultSize));
  }
  classNameForSpan(media, span) {
    const ratio = (span / this.maxColumns) * nicepageGridSize;
    if (ratio === 0)
      return `u-hidden-${media}`;
    if (media === '')
      return `u-size-${ratio}`
    return `u-size-${ratio}-${media}`;
  }
  resetElementSizes(element) {
    const matcher = /^u-(size|hidden)/;
    let i = 0;
    while (i < element.classList.length) {
      const klass = element.classList[i];
      if (matcher.exec(klass))
        element.classList.remove(klass);
      else
        i++;
    }
  }
}

class FeuilletLayoutEditor extends PageEditor.LayoutEditor {
  constructor(element) {
    super(element, {
      home_header: HomeHeaderComponent,
      section: SectionComponent,
      footer: FooterComponent
    });
  }
}

window.FeuilletLayoutEditor = FeuilletLayoutEditor;

PageEditor.fonts = [
  "Belgrano",
  "DM Serif Display",
  "Open Sans"
];
