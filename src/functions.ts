import { store } from "./store";

const addActiveClass = (
  galleryThumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
) => {
  const activeThumbnail = galleryThumbnails.children[
    store.index
  ] as HTMLDivElement;
  activeThumbnail?.classList.add(...store.activeThumbnailClassList);
  activeThumbnail?.classList.add("active");
  const activeLightboxThumbnail = lightboxThumbnails.children[
    store.index
  ] as HTMLDivElement;
  console.log(activeLightboxThumbnail);

  activeLightboxThumbnail?.classList.add(...store.activeThumbnailClassList);
  activeLightboxThumbnail?.classList.add("active");
};
export const addToCart = (badgeSpan: HTMLSpanElement) => {
  if (!store.counter) return (badgeSpan.style.display = "none");
  badgeSpan.style.display = "inline";
  badgeSpan.innerHTML = String(store.counter);
};
export const openLightbox = (
  galleryThumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
  lightbox: HTMLElement,
) => {
  const windowInnerWidthPX = window.innerWidth;
  const clientFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  const windowInnerWidthREM = windowInnerWidthPX / clientFontSize;
  if (windowInnerWidthREM < store.smBreakpointRem) return;
  lightbox.classList.add("sm:flex");

  document.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.code === "Escape") closeLightbox(lightbox);
  });
  showImage(galleryThumbnails, lightboxThumbnails);
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

export const openCart = (aside: HTMLElement, cartBtn: HTMLButtonElement) => {
  window.addEventListener("mousemove", () => checkWindowWidth(aside, cartBtn));
  aside.classList.toggle("grid");
  window.addEventListener("resize", () => checkWindowWidth(aside, cartBtn));
  store.isCartOpen = !store.isCartOpen;
  if (!store.isCartOpen) return;
  document.addEventListener("keyup", (event: KeyboardEvent) => {
    if (event.code === "Escape" && aside.classList.contains("grid")) {
      aside.classList.remove("grid");
      store.isCartOpen = false;
      return;
    }
  });
};

const checkWindowWidth = (aside: HTMLElement, cartBtn: HTMLButtonElement) => {
  console.log(1125);

  const windowInnerWidthPX = window.innerWidth;
  const clientFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  const windowInnerWidthREM = windowInnerWidthPX / clientFontSize;
  const rect = cartBtn.getBoundingClientRect();
  if (windowInnerWidthREM > store.lgBreakpointRem) {
    console.log(rect);

    return (aside.style.left = `${rect.left - 360}px`);
  }
  if (windowInnerWidthREM > store.smBreakpointRem) {
    console.log(rect);

    return (aside.style.left = `${rect.left - 500}px`);
  }
  aside.style.left = "";
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

const removeActiveClass = (
  galleryThumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
) => {
  const activeThumbnails =
    document.querySelectorAll<HTMLDivElement>(".active")!;
  activeThumbnails.forEach((active) => {
    active.classList.remove(...store.activeThumbnailClassList);
    active.classList.remove("active");
  });

  showImage(galleryThumbnails, lightboxThumbnails);
};

export const renderCounter = (
  counterBtn: HTMLButtonElement,
  counterSpan: HTMLSpanElement,
) => {
  counterBtn.removeAttribute("disabled");
  if (!store.counter) counterBtn.setAttribute("disabled", "true");
  counterSpan.innerHTML = String(store.counter);
};

export const showImage = (
  galleryThumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
) => {
  const image = store.productImages[store.index];
  const mainImage = document.querySelectorAll<HTMLDivElement>(".main-image");
  if (!mainImage) return;
  mainImage.forEach(
    (div) => (div.style.backgroundImage = `url("./images/${image}")`),
  );
  addActiveClass(galleryThumbnails, lightboxThumbnails);
};

export const showImageFromThumbnail = (
  event: MouseEvent,
  galleryThumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
) => {
  const target = event.currentTarget as HTMLDivElement;
  if (!target.attributes[0].nodeValue) return;
  const imageNumber = Number(target.attributes[0].nodeValue.slice(14, 15));
  store.index = imageNumber - 1;
  removeActiveClass(galleryThumbnails, lightboxThumbnails);
};

export const slideImage = (
  event: MouseEvent,
  galleryThumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
) => {
  const target = event.currentTarget as HTMLButtonElement;
  console.log(target.value);

  switch (target.value) {
    case "prev":
      if (store.index === 0) {
        store.index = store.productImages.length - 1;
        break;
      }
      store.index--;
      break;
    case "next":
      if (store.index === store.productImages.length - 1) {
        store.index = 0;
        break;
      }
      store.index++;
      break;
  }
  removeActiveClass(galleryThumbnails, lightboxThumbnails);
};

export const closeLightbox = (lightbox: HTMLElement) => {
  lightbox.classList.remove("sm:flex");
  document.removeEventListener("keyup", () => closeLightbox);
};
