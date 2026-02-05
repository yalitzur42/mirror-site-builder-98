import { LucideIcon } from "lucide-react";

interface FeatureItem {
  icon: LucideIcon;
  title: string;
  description?: string;
}

interface FeatureGridProps {
  items: FeatureItem[];
  columns?: 2 | 3 | 4;
}

const FeatureGrid = ({ items, columns = 4 }: FeatureGridProps) => {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  return (
    <div className={`grid grid-cols-1 ${gridCols[columns]} gap-8`}>
      {items.map((item, index) => (
        <div key={index} className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <item.icon className="w-8 h-8 text-secondary-foreground" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-inherit">{item.title}</h3>
          {item.description && (
            <p className="text-sm opacity-70">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
