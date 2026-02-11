import { MapPin, Phone, Sparkles, Car } from "lucide-react";

const TopUtilityBar = () => {
  return (
    <div className="bg-secondary/50 border-b border-border text-sm">
      <div className="container-main py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>המחשלים 5, עפולה</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>054-4744031</span>
          </div>
          <a href="https://calmark.io/p/ZBfbx" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
            לקביעת תור
          </a>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span className="flex items-center gap-1"><Sparkles className="w-3 h-3" /> 10% הנחה על הזמנה ראשונה של מוצרים באתר!</span>
          <span className="flex items-center gap-1"><Car className="w-3 h-3" /> חניה חינם ללקוחות "המספרה"</span>
        </div>
      </div>
    </div>
  );
};

export default TopUtilityBar;