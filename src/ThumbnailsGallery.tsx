interface ThumbnailsGalleryProps {
  dataKey: number;
  image: string;
  imageIndex: number;
  handleThumbnail: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const ThumbnailsGallery: React.FC<ThumbnailsGalleryProps> = ({
  dataKey,
  handleThumbnail,
  image,
  imageIndex,
}) => {
  const activeThumbnailClassList = [
    "outline-2",
    "outline-current",
    "before:absolute",
    "before:bg-(--white)/50",
    "before:inset-0",
    "before:rounded-lg",
    "hover:opacity-100",
  ];

  return (
    <div
      style={{ backgroundImage: `url(${image})` }}
      onClick={(event) => handleThumbnail(event)}
      data-key={dataKey}
      className={
        imageIndex === dataKey ? activeThumbnailClassList.join(" ") : " "
      }
    ></div>
  );
};

export default ThumbnailsGallery;
