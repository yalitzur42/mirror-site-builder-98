interface GalleryGridProps {
  images: string[];
}

const GalleryGrid = ({ images }: GalleryGridProps) => {
  // Use placeholder if no images provided
  const displayImages = images.length > 0 ? images : Array(8).fill(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {displayImages.map((image, index) => (
        <div
          key={index}
          className="aspect-square overflow-hidden rounded-lg bg-background"
        >
          {image ? (
            <img
              src={image}
              alt=""
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-foreground opacity-50">
              תמונה {index + 1}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
