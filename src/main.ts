import "./style.css";
import { store } from "./store";
import {
  addToCart,
  handleLightbox,
  // openLightbox,
  closeLightbox,
  closeCart,
  compute,
  closeMenu,
  handleCart,
  // openCart,
  handleMenu,
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

const bgDark = header.querySelector<HTMLDivElement>("#bg-dark")!;
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
cartBtn.addEventListener("click", () => handleCart(aside, cartBtn));
hamburgerBtn.addEventListener("click", () =>
  handleMenu(mainMenu, hamburgerBtn, bgDark),
);
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
  handleLightbox(galleryThumbnails, lightboxThumbnails, lightbox),
);
counterBtns.forEach((button) =>
  button.addEventListener("click", (event) =>
    compute(event, counterBtns[0], counterSpan),
  ),
);

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
    showImageFromThumbnail(event, galleryThumbnails, lightboxThumbnails),
  );
  lightboxThumbnail.addEventListener("click", (event) =>
    showImageFromThumbnail(event, galleryThumbnails, lightboxThumbnails),
  );
});
submitBtn.addEventListener("click", () => addToCart(badgeSpan));

lightboxCloseBtn.addEventListener("click", () => closeLightbox(lightbox));

document.addEventListener("keyup", (event: KeyboardEvent) => {
  if (event.code === "Escape") {
    if (store.isLightboxOpen) return closeLightbox(lightbox);
    if (store.isCartOpen) return closeCart(aside, cartBtn);
  }
});

window.addEventListener("resize", () => {
  if (store.isLightboxOpen) return closeLightbox(lightbox);
  if (store.isCartOpen) return closeCart(aside, cartBtn);
  if (store.isMenuOpen) closeMenu(mainMenu, hamburgerBtn, bgDark);
});

renderCounter(counterBtns[0], counterSpan);
showImage(galleryThumbnails, lightboxThumbnails);
