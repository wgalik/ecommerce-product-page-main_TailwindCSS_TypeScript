import { useState } from "react";

import NavigationMenu from "./NavigationMenu";
import Gallery from "./Gallery";
import OfferCard from "./OfferCard";
import Lightbox from "./Lightbox";
// import Cart from "./Cart";

const App = () => {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const productName = "Fall Limited Edition Sneakers";

  const handleLightbox = () => {
    const windowInnerWidthPX = window.innerWidth;
    const clientFontSize = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const windowInnerWidthREM = windowInnerWidthPX / clientFontSize;
    if (windowInnerWidthREM < 40) return;
    return setLightboxOpen((prevState) => !prevState);
  };

  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-center gap-4 bg-white p-4 sm:h-28">
        <NavigationMenu />
      </header>
      <main className="mt-20 flex w-full max-w-5xl flex-col items-center justify-start gap-4 sm:mt-40 sm:flex-row">
        <Gallery handleLightbox={handleLightbox} />
        <OfferCard productName={productName} />
      </main>
      {/* <Cart /> */}
      {lightboxOpen && <Lightbox />}
    </>
  );
};

export default App;
