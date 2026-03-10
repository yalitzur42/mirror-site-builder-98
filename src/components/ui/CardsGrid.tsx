import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface CardItem {
  title: string;
  image?: string;
  href?: string;
  description?: string;
}

interface CardsGridProps {
  items: CardItem[];
  columns?: 2 | 3 | 4;
}

const CardsGrid = ({ items, columns = 4 }: CardsGridProps) => {
  const gridCols = {
    2: "grid-cols-2 md:grid-cols-2",
    3: "grid-cols-3 md:grid-cols-3",
    4: "grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-3 md:gap-6`}>
      {items.map((item, index) => (
        <Link key={index} to={item.href || "#"} className="group">
          <Card className="overflow-hidden bg-primary text-card-foreground hover:opacity-90 transition-opacity h-full border-border">
            {item.image ? (
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="aspect-square bg-secondary flex items-center justify-center">
                <span className="text-secondary-foreground opacity-60">תמונה</span>
              </div>
            )}
            <CardContent className="p-4 text-center bg-primary text-primary-foreground">
              <h3 className="font-bold text-lg">{item.title}</h3>
              {item.description && (
                <p className="text-sm mt-2 opacity-80">{item.description}</p>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CardsGrid;
