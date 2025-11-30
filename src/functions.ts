import { store } from "./store";

import closeMenuBtn from "./images/icon-close.svg";
import openMenuBtn from "./images/icon-menu.svg";

const { activeThumbnailClassList, breakpoints, productImages } = store.data;

const { state } = store;

export const addActiveClass = (thumbnails: Array<HTMLElement>) => {
  thumbnails.forEach((array) => {
    const activeThumbnail = array.children[state.index] as HTMLDivElement;
    activeThumbnail?.classList.add(...activeThumbnailClassList);
    activeThumbnail?.classList.add("active");
  });
};

export const addToCart = (
  badgeSpan: HTMLSpanElement,
  counterSpan: HTMLSpanElement,
  counterBtn: HTMLButtonElement,
) => {
  state.cart += state.counter;
  if (!state.cart) return (badgeSpan.style.display = "none");
  badgeSpan.style.display = "inline";
  badgeSpan.innerHTML = String(state.cart);
  state.counter = 0;
  renderCounter(counterBtn, counterSpan);
};

export const closeCart = (aside: HTMLElement) => {
  aside.classList.remove("grid");
  state.isCartOpen = false;
};

export const closeMenu = (
  mainMenu: HTMLUListElement,
  hamburgerBtn: HTMLButtonElement,
  bgDark: HTMLDivElement,
) => {
  mainMenu.classList.remove("left-0");
  bgDark.classList.add("hidden");
  hamburgerBtn.style.backgroundImage = `url("${openMenuBtn}")`;
  state.isMenuOpen = false;
};

export const closeLightbox = (lightbox: HTMLElement) => {
  lightbox.classList.remove("sm:flex");

  state.isLightboxOpen = false;
};

export const compute = (
  event: MouseEvent,
  counterBtn: HTMLButtonElement,
  counterSpan: HTMLSpanElement,
) => {
  const target = event.currentTarget as HTMLButtonElement;
  if (target.id === "subtraction") state.counter--;
  if (target.id === "addition") state.counter++;
  renderCounter(counterBtn, counterSpan);
};

export const handleArrow = (
  event: KeyboardEvent,
  thumbnails: Array<HTMLElement>,
) => {
  const value = event.code === "ArrowLeft" ? "prev" : "next";
  slideImage(value, thumbnails);
};

export const handleButton = (
  event: MouseEvent,
  thumbnails: Array<HTMLElement>,
) => {
  const target = event.currentTarget as HTMLButtonElement;
  const value = target.value;
  slideImage(value, thumbnails);
};

export const handleCart = (aside: HTMLElement, cartBtn: HTMLButtonElement) => {
  if (state.isCartOpen) return closeCart(aside);

  checkWindowWidth();
  if (state.windowInnerWidthREM <= breakpoints.sm) {
    aside.style.left = "50%";
  }
  const rect = cartBtn.getBoundingClientRect();
  if (state.windowInnerWidthREM > breakpoints.sm) {
    aside.style.left = `${rect.right - 360}px`;
  }
  if (state.windowInnerWidthREM > breakpoints.lg) {
    aside.style.left = `${rect.right - 180}px`;
  }
  openCart(aside);
};

export const handleMenu = (
  mainMenu: HTMLUListElement,
  hamburgerBtn: HTMLButtonElement,
  bgDark: HTMLDivElement,
) => {
  if (state.isMenuOpen) return closeMenu(mainMenu, hamburgerBtn, bgDark);
  openMenu(mainMenu, hamburgerBtn, bgDark);
};

export const handleLightbox = (lightbox: HTMLElement) => {
  checkWindowWidth();
  if (state.windowInnerWidthREM < breakpoints.sm) return;
  openLightbox(lightbox);
};

export const handleThumbnail = (
  event: MouseEvent,
  thumbnails: Array<HTMLElement>,
) => {
  const target = event.currentTarget as HTMLDivElement;
  if (!target.dataset.key) return;
  state.index = Number(target.dataset.key);
  removeActiveClass();
  addActiveClass(thumbnails);
  showImage();
};

export const renderCounter = (
  counterBtn: HTMLButtonElement,
  counterSpan: HTMLSpanElement,
) => {
  counterBtn.removeAttribute("disabled");
  if (!state.counter) counterBtn.setAttribute("disabled", "true");
  counterSpan.innerHTML = String(state.counter);
};

export const showImage = () => {
  const image = productImages[state.index];
  const mainImage = document.querySelectorAll<HTMLDivElement>(".main-image");
  if (!mainImage) return;
  mainImage.forEach((div) => (div.style.backgroundImage = `url("${image}")`));
};

const subtraction = () =>
  !state.index ? (state.index = productImages.length - 1) : state.index--;

const checkWindowWidth = () => {
  const windowInnerWidthPX = window.innerWidth;
  const clientFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  state.windowInnerWidthREM = windowInnerWidthPX / clientFontSize;
};

const openCart = (aside: HTMLElement) => {
  aside.classList.add("grid");
  state.isCartOpen = !state.isCartOpen;
};

const openMenu = (
  mainMenu: HTMLUListElement,
  hamburgerBtn: HTMLButtonElement,
  bgDark: HTMLDivElement,
) => {
  mainMenu.classList.add("left-0");
  bgDark.classList.remove("hidden");
  hamburgerBtn.style.backgroundImage = `url("${closeMenuBtn}")`;
  state.isMenuOpen = !state.isMenuOpen;
};

const openLightbox = (lightbox: HTMLElement) => {
  lightbox.classList.add("sm:flex");
  state.isLightboxOpen = !state.isLightboxOpen;
};

const removeActiveClass = () => {
  const activeThumbnails =
    document.querySelectorAll<HTMLDivElement>(".active")!;
  activeThumbnails.forEach((active) => {
    active.classList.remove(...activeThumbnailClassList);
    active.classList.remove("active");
  });
};

const slideImage = (value: string, thumbnails: Array<HTMLElement>) => {
  switch (value) {
    case "prev":
      subtraction();
      break;
    case "next":
      addition();
      break;
  }
  removeActiveClass();
  addActiveClass(thumbnails);
  showImage();
};

const addition = () =>
  state.index === productImages.length - 1 ? (state.index = 0) : state.index++;
