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
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6`}>
      {items.map((item, index) => (
        <Link key={index} to={item.href || "#"} className="group">
          <Card className="overflow-hidden bg-card hover:bg-card/80 transition-colors h-full">
            {item.image ? (
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <div className="aspect-square bg-muted flex items-center justify-center">
                <span className="text-muted-foreground">תמונה</span>
              </div>
            )}
            <CardContent className="p-4 text-center">
              <h3 className="font-bold text-lg">{item.title}</h3>
              {item.description && (
                <p className="text-muted-foreground text-sm mt-2">{item.description}</p>
              )}
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default CardsGrid;
