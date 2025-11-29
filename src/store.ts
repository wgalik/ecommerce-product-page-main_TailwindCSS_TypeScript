import image_1 from "./images/image-product-1.jpg";
import image_2 from "./images/image-product-2.jpg";
import image_3 from "./images/image-product-3.jpg";
import image_4 from "./images/image-product-4.jpg";
import thumbnail_1 from "./images/image-product-1-thumbnail.jpg";
import thumbnail_2 from "./images/image-product-2-thumbnail.jpg";
import thumbnail_3 from "./images/image-product-3-thumbnail.jpg";
import thumbnail_4 from "./images/image-product-4-thumbnail.jpg";

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

  productImages: [image_1, image_2, image_3, image_4],

  productThumbnails: [thumbnail_1, thumbnail_2, thumbnail_3, thumbnail_4],
};
