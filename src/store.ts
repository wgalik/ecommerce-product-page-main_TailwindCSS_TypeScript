export const store = {
  // const lgBreakpoint = window.matchMedia("(min-width: 64rem)");
  counter: 0,
  index: 0,
  isMenuOpen: false,
  smBreakpoint: 40,

  activeThumbnailClassList: [
    "outline-2",
    "outline-current",
    "before:absolute",
    "before:bg-(--white)/50",
    "before:inset-0",
    "before:rounded-lg",
    "hover:opacity-100",
  ],
  productImages: [
    "image-product-1.jpg",
    "image-product-2.jpg",
    "image-product-3.jpg",
    "image-product-4.jpg",
  ],

  productThumbnails: [
    "image-product-1-thumbnail.jpg",
    "image-product-2-thumbnail.jpg",
    "image-product-3-thumbnail.jpg",
    "image-product-4-thumbnail.jpg",
  ],
};
