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
const thumbnails = main.querySelector<HTMLElement>(".thumbnails")!;
const lightboxThumbnails = lightbox.querySelector<HTMLElement>(
  ".lightbox-thumbnails",
)!;

const lightboxCloseBtn = lightbox.querySelector<HTMLButtonElement>(
  "#lightbox-close-btn",
)!;
const lightboxItem = lightbox.querySelector<HTMLDivElement>(
  "#lightbox-main-image",
)!;

const lightboxBtns =
  lightbox.querySelectorAll<HTMLButtonElement>(".lightbox-btn")!;
// Events ///////////////////////////////////////////////////////
cartBtn.addEventListener("click", () => openCart(aside));
hamburgerBtn.addEventListener("click", () => openMenu(mainMenu, hamburgerBtn));
carouselBtns.forEach((button) =>
  button.addEventListener("click", (event) =>
    slideImage(
      event,
      thumbnails,
      lightboxThumbnails,
      carouselItem,
      lightboxItem,
    ),
  ),
);
lightboxBtns.forEach((button) =>
  button.addEventListener("click", (event) =>
    slideImage(
      event,
      thumbnails,
      lightboxThumbnails,
      carouselItem,
      lightboxItem,
    ),
  ),
);
carouselItem.addEventListener("click", () =>
  openLightbox(
    thumbnails,
    lightboxThumbnails,
    carouselItem,
    lightboxItem,
    lightbox,
  ),
);
counterBtns.forEach((button) =>
  button.addEventListener("click", (event) =>
    compute(event, counterBtns[0], counterSpan),
  ),
);
store.productThumbnails.forEach((item) => {
  const thumbnail = document.createElement("div") as HTMLDivElement;
  const lightboxThumbnail = document.createElement("div") as HTMLDivElement;
  thumbnails.appendChild(thumbnail);
  lightboxThumbnails.appendChild(lightboxThumbnail);
  thumbnail.style.backgroundImage = `url("../images/${item}")`;
  thumbnail.setAttribute("data-image", item);
  lightboxThumbnail.style.backgroundImage = `url("../images/${item}")`;
  lightboxThumbnail.setAttribute("data-image", item);
  thumbnail.addEventListener("click", (event) =>
    showImageFromThumbnail(
      event,
      thumbnails,
      lightboxThumbnails,
      carouselItem,
      lightboxItem,
    ),
  );
  lightboxThumbnail.addEventListener("click", (event) =>
    showImageFromThumbnail(
      event,
      thumbnails,
      lightboxThumbnails,
      carouselItem,
      lightboxItem,
    ),
  );
});
submitBtn.addEventListener("click", () => addToCart(badgeSpan));

lightboxCloseBtn.addEventListener("click", () => closeLightbox(lightbox));

renderCounter(counterBtns[0], counterSpan);
showImage(thumbnails, lightboxThumbnails, carouselItem, lightboxItem);
