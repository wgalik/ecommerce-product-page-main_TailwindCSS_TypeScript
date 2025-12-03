import NavigationMenu from "./NavigationMenu";
import Gallery from "./Gallery";
import OfferCard from "./OfferCard";

const App = () => {
  const productName = "Fall Limited Edition Sneakers";
  return (
    <>
      <header className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-center gap-4 bg-white p-4 sm:h-28">
        <NavigationMenu />
      </header>
      <main className="mt-20 flex w-full max-w-5xl flex-col items-center justify-start gap-4 sm:mt-40 sm:flex-row">
        <Gallery />
        <OfferCard productName={productName} />
      </main>
    </>
  );
};

export default App;
