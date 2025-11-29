import image_1 from "./images/image-product-1.jpg";
// console.log(imageProduct_1.slice(12));

const imageProduct_1 = image_1.slice(12);
console.log(imageProduct_1);

export const store = {
  counter: 0,
  index: 0,
  isCartOpen: false,
  isMenuOpen: false,
  isLightboxOpen: false,
  smBreakpointRem: 40,
  lgBreakpointRem: 80,
  windowInnerWidthREM: NaN,

  activeThumbnailClassList: [
    "outline-2",
    "outline-current",
    "before:absolute",
    "before:bg-(--white)/50",
    "before:inset-0",
    "before:rounded-lg",
    "hover:opacity-100",
  ],

  menu: ["Collections", "Men", "Women", "About", "Contact"],
  productImages: [
    imageProduct_1,
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
