import { store } from "./store";

const addActiveClass = (
  thumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
) => {
  const activeThumbnail = thumbnails.children[store.index] as HTMLDivElement;
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
  thumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
  carouselItem: HTMLDivElement,
  lightboxItem: HTMLDivElement,
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
  showImage(thumbnails, lightboxThumbnails, carouselItem, lightboxItem);
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
  const div = document.createElement("div");
  // div.style.backgroundColor = "rgba(0 0 0 9)";
  div.style.height = "100dvh";
  div.style.width = "100dvw";
  div.classList.add(...["absolute", "inset-0", "z-40", "bg-black/75"]);
  document.body.appendChild(div);

  mainMenu.classList.toggle("left-0");
  store.isMenuOpen = !store.isMenuOpen;
  if (store.isMenuOpen)
    return (hamburgerBtn.style.backgroundImage = `url("../images/icon-close.svg")`);
  hamburgerBtn.style.backgroundImage = `url("../images/icon-menu.svg")`;
};

// const openLightbox = () => {
//   console.log("lIGHTBOX OPENED");
// };

const removeActiveClass = (
  thumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
  carouselItem: HTMLDivElement,
  lightboxItem: HTMLDivElement,
) => {
  const activeThumbnails =
    document.querySelectorAll<HTMLDivElement>(".active")!;
  activeThumbnails.forEach((active) => {
    active.classList.remove(...store.activeThumbnailClassList);
    active.classList.remove("active");
  });

  showImage(thumbnails, lightboxThumbnails, carouselItem, lightboxItem);
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
  thumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
  carouselItem: HTMLDivElement,
  lightboxItem: HTMLDivElement,
) => {
  carouselItem.style.backgroundImage = `url("../images/${store.productImages[store.index]}")`;
  lightboxItem.style.backgroundImage = `url("../images/${store.productImages[store.index]}")`;
  addActiveClass(thumbnails, lightboxThumbnails);
};

export const showImageFromThumbnail = (
  event: MouseEvent,
  thumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
  carouselItem: HTMLDivElement,
  lightboxItem: HTMLDivElement,
) => {
  const target = event.currentTarget as HTMLDivElement;
  if (!target.attributes[0].nodeValue) return;
  const imageNumber = Number(target.attributes[0].nodeValue.slice(14, 15));
  store.index = imageNumber - 1;
  removeActiveClass(thumbnails, lightboxThumbnails, carouselItem, lightboxItem);
};

export const slideImage = (
  event: MouseEvent,
  thumbnails: HTMLElement,
  lightboxThumbnails: HTMLElement,
  carouselItem: HTMLDivElement,
  lightboxItem: HTMLDivElement,
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

  removeActiveClass(thumbnails, lightboxThumbnails, carouselItem, lightboxItem);
};

export const closeLightbox = (lightbox: HTMLElement) => {
  lightbox.classList.remove("sm:flex");
  document.removeEventListener("keyup", () => closeLightbox);
};
