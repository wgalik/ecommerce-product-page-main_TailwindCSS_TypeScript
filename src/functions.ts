import { store } from "./store";

export const addActiveClass = (thumbnails: Array<HTMLElement>) => {
  const activeThumbnail = thumbnails[0].children[store.index] as HTMLDivElement;
  activeThumbnail?.classList.add(...store.activeThumbnailClassList);
  activeThumbnail?.classList.add("active");
  const activeLightboxThumbnail = thumbnails[1].children[
    store.index
  ] as HTMLDivElement;
  activeLightboxThumbnail?.classList.add(...store.activeThumbnailClassList);
  activeLightboxThumbnail?.classList.add("active");
};
export const addToCart = (badgeSpan: HTMLSpanElement) => {
  if (!store.counter) return (badgeSpan.style.display = "none");
  badgeSpan.style.display = "inline";
  badgeSpan.innerHTML = String(store.counter);
};
export const handleLightbox = (lightbox: HTMLElement) => {
  checkWindowWidth();
  if (store.windowInnerWidthREM < store.smBreakpointRem) return;
  openLightbox(lightbox);
};

const openLightbox = (lightbox: HTMLElement) => {
  lightbox.classList.add("sm:flex");
  store.isLightboxOpen = !store.isLightboxOpen;
};

export const compute = (
  event: MouseEvent,
  counterBtn: HTMLButtonElement,
  counterSpan: HTMLSpanElement,
) => {
  const target = event.currentTarget as HTMLButtonElement;
  if (target.id === "subtraction") store.counter -= 1;
  if (target.id === "addition") store.counter += 1;
  renderCounter(counterBtn, counterSpan);
};

const checkWindowWidth = () => {
  const windowInnerWidthPX = window.innerWidth;
  const clientFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  store.windowInnerWidthREM = windowInnerWidthPX / clientFontSize;
};

export const handleCart = (aside: HTMLElement, cartBtn: HTMLButtonElement) => {
  if (store.isCartOpen) return closeCart(aside);

  checkWindowWidth();
  if (store.windowInnerWidthREM <= store.smBreakpointRem) {
    aside.style.left = "50%";
  }
  const rect = cartBtn.getBoundingClientRect();
  if (store.windowInnerWidthREM > store.smBreakpointRem) {
    aside.style.left = `${rect.right - 360}px`;
  }
  if (store.windowInnerWidthREM > store.lgBreakpointRem) {
    aside.style.left = `${rect.right - 180}px`;
  }
  openCart(aside);
};

const openCart = (aside: HTMLElement) => {
  aside.classList.add("grid");
  store.isCartOpen = !store.isCartOpen;
};

export const closeCart = (aside: HTMLElement) => {
  aside.classList.remove("grid");
  store.isCartOpen = false;
};

export const handleMenu = (
  mainMenu: HTMLUListElement,
  hamburgerBtn: HTMLButtonElement,
  bgDark: HTMLDivElement,
) => {
  if (store.isMenuOpen) return closeMenu(mainMenu, hamburgerBtn, bgDark);
  openMenu(mainMenu, hamburgerBtn, bgDark);
};

const openMenu = (
  mainMenu: HTMLUListElement,
  hamburgerBtn: HTMLButtonElement,
  bgDark: HTMLDivElement,
) => {
  mainMenu.classList.add("left-0");
  bgDark.classList.remove("hidden");
  hamburgerBtn.style.backgroundImage = `url("../images/icon-close.svg")`;
  store.isMenuOpen = !store.isMenuOpen;
};

export const closeMenu = (
  mainMenu: HTMLUListElement,
  hamburgerBtn: HTMLButtonElement,
  bgDark: HTMLDivElement,
) => {
  mainMenu.classList.remove("left-0");
  bgDark.classList.add("hidden");
  hamburgerBtn.style.backgroundImage = `url("../images/icon-menu.svg")`;
  store.isMenuOpen = false;
};

const removeActiveClass = () => {
  const activeThumbnails =
    document.querySelectorAll<HTMLDivElement>(".active")!;
  activeThumbnails.forEach((active) => {
    active.classList.remove(...store.activeThumbnailClassList);
    active.classList.remove("active");
  });
};

export const renderCounter = (
  counterBtn: HTMLButtonElement,
  counterSpan: HTMLSpanElement,
) => {
  counterBtn.removeAttribute("disabled");
  if (!store.counter) counterBtn.setAttribute("disabled", "true");
  counterSpan.innerHTML = String(store.counter);
};

export const showImage = () => {
  const image = store.productImages[store.index];
  const mainImage = document.querySelectorAll<HTMLDivElement>(".main-image");
  if (!mainImage) return;
  mainImage.forEach(
    (div) => (div.style.backgroundImage = `url("./images/${image}")`),
  );
};

export const handleThumbnail = (
  event: MouseEvent,
  thumbnails: Array<HTMLElement>,
) => {
  console.log(thumbnails);
  const target = event.currentTarget as HTMLDivElement;
  if (!target.attributes[0].nodeValue) return;
  const imageNumber = Number(target.attributes[0].nodeValue.slice(14, 15));
  store.index = imageNumber - 1;
  removeActiveClass();
  addActiveClass(thumbnails);
  showImage();
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

const slideImage = (value: string, thumbnails: Array<HTMLElement>) => {
  switch (value) {
    case "prev":
      addition();
      break;
    case "next":
      subtraction();
      break;
  }
  removeActiveClass();
  addActiveClass(thumbnails);
  showImage();
};

const addition = () =>
  !store.index ? (store.index = store.productImages.length - 1) : store.index--;
const subtraction = () =>
  store.index === store.productImages.length - 1
    ? (store.index = 0)
    : store.index++;

export const closeLightbox = (lightbox: HTMLElement) => {
  lightbox.classList.remove("sm:flex");

  store.isLightboxOpen = false;
};
