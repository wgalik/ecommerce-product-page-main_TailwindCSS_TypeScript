interface MainCarouselProps {
  image: { backgroundImage: string };
  handleButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleLightbox: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const MainCarousel: React.FC<MainCarouselProps> = ({ image, handleButton, handleLightbox }) => {
  return (
    <div className="carousel">
      <div
        className="carousel-item main-image"
        id="carousel-main-image"
        style={image}
        onClick={handleLightbox}
      ></div>
      <button
        onClick={(event) => handleButton(event)}
        className="carousel-btn carousel-btn-prev"
        value="prev"
        type="button"
      >
        <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 1 3 9l8 8"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
      <button
        onClick={(event) => handleButton(event)}
        className="carousel-btn carousel-btn-next"
        value="next"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg">
          <path
            d="m2 1 8 8-8 8"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default MainCarousel;
