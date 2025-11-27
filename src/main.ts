import "./style.css";

const header = document.querySelector<HTMLElement>("header");
const main = document.querySelector<HTMLElement>("main");
const aside = document.querySelector<HTMLElement>("aside");

if (!header || !main || !aside) throw new Error("Missing required elements.");

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

const productThumbnails = [
  "image-product-1-thumbnail.jpg",
  "image-product-2-thumbnail.jpg",
  "image-product-3-thumbnail.jpg",
  "image-product-4-thumbnail.jpg",
];
const productImages = [
  "image-product-1.jpg",
  "image-product-2.jpg",
  "image-product-3.jpg",
  "image-product-4.jpg",
];

const thumbnailClassList = [
  "w-10",
  "grow",
  "aspect-square",
  "bg-cover",
  "bg-center",
  "bg-no-repeat",
  "rounded-lg",
  "cursor-pointer",
  "hover:opacity-50",
  "transition",
  "duration-300",
  "ease-in-out",
  "text-(--orange)",
  "relative",
];

const activeThumbnailClassList = [
  "outline-2",
  "outline-current",
  "before:absolute",
  "before:bg-(--white)/50",
  "before:inset-0",
  "before:rounded-lg",
  "hover:opacity-100",
];

const smBreakpoint = 40;
const lgBreakpoint = window.matchMedia("(min-width: 64rem)");

let isMenuOpen = false;
let index = 0;
let counter = 0;

const openMenu = () => {
  mainMenu.classList.toggle("left-0");
  isMenuOpen = !isMenuOpen;
  if (isMenuOpen)
    return (hamburgerBtn.style.backgroundImage = `url("../images/icon-close.svg")`);
  hamburgerBtn.style.backgroundImage = `url("../images/icon-menu.svg")`;
};

const removeActiveClass = () => {
  const activeThumbnail = thumbnails.querySelector<HTMLDivElement>(".active")!;
  activeThumbnail.classList.remove(...activeThumbnailClassList);
  activeThumbnail.classList.remove("active");
  showImage();
};

const addActiveClass = () => {
  const activeThumbnail = thumbnails.children[index] as HTMLDivElement;
  activeThumbnail?.classList.add(...activeThumbnailClassList);
  activeThumbnail?.classList.add("active");
};

const showImage = () => {
  carouselItem.style.backgroundImage = `url("../images/${productImages[index]}")`;
  addActiveClass();
};

const slideImage = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLButtonElement;
  if (target.id === "prev") {
    if (index === 0) {
      index = productImages.length - 1;
      return removeActiveClass();
    }
    index--;
    return removeActiveClass();
  }
  if (target.id === "next") {
    if (index === productImages.length - 1) {
      index = 0;
      return removeActiveClass();
    }
    index++;
    return removeActiveClass();
  }
};

const openCart = () => {
  aside.classList.toggle("grid");
};

const compute = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLButtonElement;
  if (target.id === "subtraction") counter -= 1;
  if (target.id === "addition") counter += 1;
  renderCounter();
};

const renderCounter = () => {
  counterBtns[0].removeAttribute("disabled");
  if (!counter) counterBtns[0].setAttribute("disabled", "true");
  counterSpan.innerHTML = String(counter);
};

const addToCart = () => {
  if (!counter) return (badgeSpan.style.display = "none");
  badgeSpan.style.display = "inline";
  badgeSpan.innerHTML = String(counter);
};

const showImageFromThumbnail = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLDivElement;
  const imageNumber = Number(target.id.slice(14, 15));
  index = imageNumber - 1;
  removeActiveClass();
};

const checkInnerWidth = () => {
  const windowInnerWidthPX = window.innerWidth;
  const clientFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  const windowInnerWidthREM = windowInnerWidthPX / clientFontSize;
  if (windowInnerWidthREM < smBreakpoint) return;
  openLightbox();
};

const openLightbox = () => {
  console.log("lIGHTBOX OPENED");
};

cartBtn.addEventListener("click", openCart);
hamburgerBtn.addEventListener("click", openMenu);
submitBtn.addEventListener("click", addToCart);
carouselBtns.forEach((button) => button.addEventListener("click", slideImage));
counterBtns.forEach((button) => button.addEventListener("click", compute));

carouselItem.addEventListener("click", checkInnerWidth);

productThumbnails.forEach((item) => {
  const thumbnail = document.createElement("div") as HTMLDivElement;
  thumbnail.classList.add(...thumbnailClassList);
  thumbnails.appendChild(thumbnail);
  thumbnail.style.backgroundImage = `url("../images/${item}")`;
  thumbnail.id = item;
  thumbnail.addEventListener("click", showImageFromThumbnail);
});

renderCounter();

showImage();
