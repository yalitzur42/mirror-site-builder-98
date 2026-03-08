import { Link } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <nav className="container-main py-4">
      <ol className="flex items-center gap-2 text-sm" style={{ color: 'hsl(25, 50%, 20%)' }}>
        <li>
          <Link to="/" className="flex items-center hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {items.map((item, index) =>
        <li key={index} className="flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            {item.href ?
          <Link to={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link> :

          <span className="text-primary-foreground text-lg font-semibold">{item.label}</span>
          }
          </li>
        )}
      </ol>
    </nav>);

};

export default Breadcrumbs;