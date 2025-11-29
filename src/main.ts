import "./style.css";
import { store } from "./store";
import {
  addActiveClass,
  addToCart,
  closeCart,
  closeMenu,
  closeLightbox,
  compute,
  handleArrow,
  handleButton,
  handleCart,
  handleMenu,
  handleLightbox,
  handleThumbnail,
  renderCounter,
  showImage,
} from "./functions";

//  DOM Elements /////////////////////////////////////////////////
const header = document.querySelector<HTMLElement>("header");
const main = document.querySelector<HTMLElement>("main");
const aside = document.querySelector<HTMLElement>("aside");
const lightbox = document.querySelector<HTMLDivElement>("#lightbox");

if (!header || !main || !aside || !lightbox)
  throw new Error("Missing required elements.");

const badgeSpan = header.querySelector<HTMLSpanElement>("#badge")!;
const bgDark = header.querySelector<HTMLDivElement>("#bg-dark")!;
const cartBtn = header.querySelector<HTMLButtonElement>("#cart-btn")!;
const hamburgerBtn = header.querySelector<HTMLButtonElement>("#hamburger-btn")!;
const mainMenu = header.querySelector<HTMLUListElement>("#main-menu")!;

const carouselBtns = main.querySelectorAll<HTMLButtonElement>(".carousel-btn")!;
const carouselItem = main.querySelector<HTMLDivElement>(
  "#carousel-main-image",
)!;
const counterBtns = main.querySelectorAll<HTMLButtonElement>(".counter-btn")!;
const counterSpan = main.querySelector<HTMLSpanElement>("#counter")!;
const galleryThumbnails = main.querySelector<HTMLElement>(
  ".gallery-thumbnails",
)!;
const submitBtn = main.querySelector<HTMLButtonElement>(
  "button[type='submit']",
)!;

const lightboxBtns =
  lightbox.querySelectorAll<HTMLButtonElement>(".lightbox-btn")!;
const lightboxCloseBtn = lightbox.querySelector<HTMLButtonElement>(
  "#lightbox-close-btn",
)!;
const lightboxThumbnails = lightbox.querySelector<HTMLElement>(
  ".lightbox-thumbnails",
)!;

const thumbnails = [galleryThumbnails, lightboxThumbnails];

// Events ///////////////////////////////////////////////////////

window.addEventListener("resize", () => {
  if (store.isLightboxOpen) return closeLightbox(lightbox);
  if (store.isCartOpen) return closeCart(aside);
  if (store.isMenuOpen) closeMenu(mainMenu, hamburgerBtn, bgDark);
});

document.addEventListener("keyup", (event: KeyboardEvent) => {
  if (event.code === "ArrowLeft" || event.code === "ArrowRight")
    return handleArrow(event, thumbnails);
  if (event.code === "Escape") {
    if (store.isLightboxOpen) return closeLightbox(lightbox);
    if (store.isCartOpen) return closeCart(aside);
  }
});

carouselBtns.forEach((button) =>
  button.addEventListener("click", (event) => handleButton(event, thumbnails)),
);
carouselItem.addEventListener("click", () => handleLightbox(lightbox));
cartBtn.addEventListener("click", () => handleCart(aside, cartBtn));
counterBtns.forEach((button) =>
  button.addEventListener("click", (event) =>
    compute(event, counterBtns[0], counterSpan),
  ),
);
hamburgerBtn.addEventListener("click", () =>
  handleMenu(mainMenu, hamburgerBtn, bgDark),
);
lightboxBtns.forEach((button) =>
  button.addEventListener("click", (event) => handleButton(event, thumbnails)),
);
lightboxCloseBtn.addEventListener("click", () => closeLightbox(lightbox));
submitBtn.addEventListener("click", () => addToCart(badgeSpan));

store.menu.forEach((menuItem) => {
  const li = document.createElement("li") as HTMLLIElement;
  const link = document.createElement("a") as HTMLAnchorElement;
  link.setAttribute("href", "#");
  link.innerHTML = menuItem;
  li.appendChild(link);
  mainMenu.appendChild(li);
  li.addEventListener("click", () =>
    handleMenu(mainMenu, hamburgerBtn, bgDark),
  );
});

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
    handleThumbnail(event, thumbnails),
  );
  lightboxThumbnail.addEventListener("click", (event) =>
    handleThumbnail(event, thumbnails),
  );
});

renderCounter(counterBtns[0], counterSpan);
showImage();
addActiveClass(thumbnails);
