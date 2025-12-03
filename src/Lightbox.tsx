const Lightbox = () => {
  return (
    <div id="lightbox">
      <div className="lightbox-container">
        <button type="button" id="lightbox-close-btn">
          <svg width="14" height="15" xmlns="http://www.w3.org/2000/svg">
            <path
              d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
              fill="current-color"
              fill-rule="evenodd"
            />
          </svg>
        </button>
        <div className="lightbox-item main-image" id="lightbox-main-image">
          <button
            className="lightbox-btn lightbox-btn-prev"
            value="prev"
            type="button"
          >
            <svg width="12" height="18" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11 1 3 9l8 8"
                stroke="currentColor"
                stroke-width="3"
                fill="none"
                fill-rule="evenodd"
              />
            </svg>
          </button>
          <button
            className="lightbox-btn lightbox-btn-next"
            value="next"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg">
              <path
                d="m2 1 8 8-8 8"
                stroke="currentColor"
                stroke-width="3"
                fill="none"
                fill-rule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="lightbox-thumbnails thumbnails"></div>
      </div>
    </div>
  );
};

export default Lightbox;
