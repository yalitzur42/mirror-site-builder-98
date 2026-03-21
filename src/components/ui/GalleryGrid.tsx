interface GalleryGridProps {
  images: string[];
  altPrefix?: string;
  variant?: "dark" | "light";
}

const GalleryGrid = ({ images, altPrefix = "תמונת גלריה", variant = "dark" }: GalleryGridProps) => {
  const displayImages = images.length > 0 ? images : Array(8).fill(null);
  const borderClass = variant === "dark" ? "border-2 border-foreground" : "border-2 border-primary-foreground";

  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {displayImages.map((image, index) => (
        <div
          key={index}
          className={`aspect-square overflow-hidden rounded-lg bg-background ${borderClass}`}
        >
          {image ? (
            <img
              src={image}
              alt={`${altPrefix} ${index + 1}`}
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
