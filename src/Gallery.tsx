import { useState } from "react";

import MainCarousel from "./MainCarousel";
import ThumbnailsGallery from "./ThumbnailsGallery";

import image_1 from "./assets/images/image-product-1.jpg";
import image_2 from "./assets/images/image-product-2.jpg";
import image_3 from "./assets/images/image-product-3.jpg";
import image_4 from "./assets/images/image-product-4.jpg";
import thumbnail_1 from "./assets/images/image-product-1-thumbnail.jpg";
import thumbnail_2 from "./assets/images/image-product-2-thumbnail.jpg";
import thumbnail_3 from "./assets/images/image-product-3-thumbnail.jpg";
import thumbnail_4 from "./assets/images/image-product-4-thumbnail.jpg";

interface GalleryProps {
  handleLightbox: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Gallery: React.FC<GalleryProps> = ({ handleLightbox }) => {
  const [imageIndex, setImageIndex] = useState<number>(0);

  const productImages = [image_1, image_2, image_3, image_4];
  const productThumbnails = [
    thumbnail_1,
    thumbnail_2,
    thumbnail_3,
    thumbnail_4,
  ];

  const image = {
    backgroundImage: `url(${productImages[imageIndex]})`,
  };

  const handleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!e) return;
    const value: string = e.currentTarget.value;
    switch (value) {
      case "prev":
        if (imageIndex === 0) {
          setImageIndex(3);
          break;
        }
        setImageIndex((prevState) => prevState - 1);
        break;
      case "next":
        if (imageIndex === productImages.length - 1) {
          setImageIndex(0);
          break;
        }
        setImageIndex((prevState) => prevState + 1);
        break;
    }
  };

  const handleThumbnail = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!e) return;
    const value = Number(e.currentTarget.dataset.key);
    setImageIndex(value);
  };

  const thumbnails = productThumbnails.map((thumbnail, index) => (
    <ThumbnailsGallery
      image={thumbnail}
      key={thumbnail}
      dataKey={index}
      handleThumbnail={handleThumbnail}
      imageIndex={imageIndex}
    />
  ));
  return (
    <section id="gallery">
      <MainCarousel
        handleButton={handleButton}
        handleLightbox={handleLightbox}
        image={image}
      />
      <div className="gallery-thumbnails thumbnails">{thumbnails}</div>
    </section>
  );
};

export default Gallery;
