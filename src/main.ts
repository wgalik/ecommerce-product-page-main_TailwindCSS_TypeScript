import "./style.css";
import { store } from "./store";
import {
  addToCart,
  openLightbox,
  closeLightbox,
  compute,
  openCart,
  openMenu,
  renderCounter,
  showImage,
  showImageFromThumbnail,
  slideImage,
} from "./functions";

//  DOM Elements /////////////////////////////////////////////////
const header = document.querySelector<HTMLElement>("header");
const main = document.querySelector<HTMLElement>("main");
const aside = document.querySelector<HTMLElement>("aside");
const lightbox = document.querySelector<HTMLDivElement>("#lightbox");

if (!header || !main || !aside || !lightbox)
  throw new Error("Missing required elements.");

const hamburgerBtn = header.querySelector<HTMLButtonElement>("#hamburger-btn")!;
const badgeSpan = header.querySelector<HTMLSpanElement>("#badge")!;
const cartBtn = header.querySelector<HTMLButtonElement>("#cart-btn")!;
const mainMenu = header.querySelector<HTMLUListElement>("#main-menu")!;

const carouselBtns = main.querySelectorAll<HTMLButtonElement>(".carousel-btn")!;
const carouselItem = main.querySelector<HTMLDivElement>(
  "#carousel-main-image",
)!;
const counterBtns = main.querySelectorAll<HTMLButtonElement>(".counter-btn")!;
const counterSpan = main.querySelector<HTMLSpanElement>("#counter")!;
const submitBtn = main.querySelector<HTMLButtonElement>(
  "button[type='submit']",
)!;
const galleryThumbnails = main.querySelector<HTMLElement>(
  ".gallery-thumbnails",
)!;
const lightboxThumbnails = lightbox.querySelector<HTMLElement>(
  ".lightbox-thumbnails",
)!;

const lightboxCloseBtn = lightbox.querySelector<HTMLButtonElement>(
  "#lightbox-close-btn",
)!;

const lightboxBtns =
  lightbox.querySelectorAll<HTMLButtonElement>(".lightbox-btn")!;
// Events ///////////////////////////////////////////////////////
cartBtn.addEventListener("click", () => openCart(aside));
hamburgerBtn.addEventListener("click", () => openMenu(mainMenu, hamburgerBtn));
carouselBtns.forEach((button) =>
  button.addEventListener("click", (event) =>
    slideImage(event, galleryThumbnails, lightboxThumbnails),
  ),
);
lightboxBtns.forEach((button) =>
  button.addEventListener("click", (event) =>
    slideImage(event, galleryThumbnails, lightboxThumbnails),
  ),
);
carouselItem.addEventListener("click", () =>
  openLightbox(galleryThumbnails, lightboxThumbnails, lightbox),
);
counterBtns.forEach((button) =>
  button.addEventListener("click", (event) =>
    compute(event, counterBtns[0], counterSpan),
  ),
);
store.productThumbnails.forEach((item) => {
  const galleryThumbnail = document.createElement("div") as HTMLDivElement;
  const lightboxThumbnail = document.createElement("div") as HTMLDivElement;
  galleryThumbnails.appendChild(galleryThumbnail);
  lightboxThumbnails.appendChild(lightboxThumbnail);
  galleryThumbnail.style.backgroundImage = `url("../images/${item}")`;
  galleryThumbnail.setAttribute("data-image", item);
  lightboxThumbnail.style.backgroundImage = `url("../images/${item}")`;
  lightboxThumbnail.setAttribute("data-image", item);
  galleryThumbnail.addEventListener("click", (event) =>
    showImageFromThumbnail(event, galleryThumbnails, lightboxThumbnails),
  );
  lightboxThumbnail.addEventListener("click", (event) =>
    showImageFromThumbnail(event, galleryThumbnails, lightboxThumbnails),
  );
});
submitBtn.addEventListener("click", () => addToCart(badgeSpan));

lightboxCloseBtn.addEventListener("click", () => closeLightbox(lightbox));

renderCounter(counterBtns[0], counterSpan);
showImage(galleryThumbnails, lightboxThumbnails);
