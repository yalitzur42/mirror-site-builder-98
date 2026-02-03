import { MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const TopUtilityBar = () => {
  return (
    <div className="bg-secondary/50 border-b border-border text-sm">
      <div className="container-main py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>תל חי 37, כפר סבא</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>054-4744031</span>
          </div>
          <Link to="/contact" className="text-accent hover:underline">
            לקביעת תור
          </Link>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>🎉 10% הנחה על הזמנה ראשונה של מוצרים באתר!</span>
          <span>🚗 חניה חינם ללקוחות "המספרה"</span>
        </div>
      </div>
    </div>
  );
};

export default TopUtilityBar;
