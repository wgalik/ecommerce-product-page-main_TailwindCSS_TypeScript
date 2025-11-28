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
  if (windowInnerWidthREM < store.smBreakpoint) return;
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

export const openCart = (aside: HTMLElement) => {
  aside.classList.toggle("grid");
};

export const openMenu = (
  mainMenu: HTMLUListElement,
  hamburgerBtn: HTMLButtonElement,
) => {
  const bgDark = document.querySelector<HTMLDivElement>("#bg-dark")!;

  mainMenu.classList.toggle("left-0");
  bgDark.classList.toggle("hidden");
  store.isMenuOpen = !store.isMenuOpen;
  if (store.isMenuOpen)
    return (hamburgerBtn.style.backgroundImage = `url("../images/icon-close.svg")`);

  hamburgerBtn.style.backgroundImage = `url("../images/icon-menu.svg")`;
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
