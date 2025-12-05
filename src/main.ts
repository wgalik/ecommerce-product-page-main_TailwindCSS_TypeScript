import "./style.css";
import { store } from "./store";
import {
  addActiveClass,
  addToCart,
  clearCart,
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

const { menuItems, productName, productPrice, productThumbnails } = store.data;
const { state } = store;

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
const productTitle = main.querySelector<HTMLHeadingElement>("#product-title")!;
const priceTag = main.querySelector<HTMLSpanElement>("#product-price")!;
const submitBtn = main.querySelector<HTMLButtonElement>(
  "button[type='submit']",
)!;

const cartContainer = aside.querySelector<HTMLDivElement>(".cart-container")!;
const checkoutBtn = aside.querySelector<HTMLButtonElement>("#checkout")!;
const emptyCartMsg = aside.querySelector<HTMLHeadingElement>("#emptyCart")!;
const resetCartBtn = aside.querySelector<HTMLButtonElement>(
  "button[type='reset']",
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
  if (state.isLightboxOpen) return closeLightbox(lightbox);
  if (state.isCartOpen) return closeCart(aside);
  if (state.isMenuOpen) closeMenu(mainMenu, hamburgerBtn, bgDark);
});

document.addEventListener("keyup", (event: KeyboardEvent) => {
  if (event.code === "ArrowLeft" || event.code === "ArrowRight")
    return handleArrow(event, thumbnails);
  if (event.code === "Escape") {
    if (state.isLightboxOpen) return closeLightbox(lightbox);
    if (state.isCartOpen) return closeCart(aside);
  }
});

carouselBtns.forEach((button) =>
  button.addEventListener("click", (event) => handleButton(event, thumbnails)),
);
carouselItem.addEventListener("click", () => handleLightbox(lightbox));
cartBtn.addEventListener("click", () =>
  handleCart(aside, cartBtn, emptyCartMsg, cartContainer),
);
checkoutBtn.addEventListener("click", () => closeCart(aside));
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
resetCartBtn.addEventListener("click", () =>
  clearCart(aside, emptyCartMsg, cartContainer),
);
submitBtn.addEventListener("click", () =>
  addToCart(
    badgeSpan,
    counterSpan,
    counterBtns[0],
    cartContainer,
    aside,
    emptyCartMsg,
  ),
);

menuItems.forEach((menuItem) => {
  const li = document.createElement("li") as HTMLLIElement;
  const link = document.createElement("a") as HTMLAnchorElement;
  li.setAttribute("role", "none");
  link.setAttribute("href", "#");
  link.setAttribute("role", "menuitem");
  link.innerHTML = menuItem;
  li.appendChild(link);
  mainMenu.appendChild(li);
  li.addEventListener("click", () =>
    handleMenu(mainMenu, hamburgerBtn, bgDark),
  );
});

thumbnails.forEach((array) => {
  productThumbnails.forEach((item, index) => {
    const thumbnail = document.createElement("div") as HTMLDivElement;
    array.appendChild(thumbnail);
    thumbnail.style.backgroundImage = `url("${item}")`;
    thumbnail.classList.add("thumbnail")
    thumbnail.dataset.key = String(index);
    thumbnail.addEventListener("click", (event) =>
      handleThumbnail(event, thumbnails),
    );
  });
});

productTitle.innerHTML = productName;
priceTag.innerHTML = String(productPrice.toFixed(2));

renderCounter(counterBtns[0], counterSpan);
showImage();
addActiveClass(thumbnails);
