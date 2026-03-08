import { Skeleton } from "@/components/ui/skeleton";

const PageSkeleton = () => {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Hero skeleton */}
      <div className="grid lg:grid-cols-2 gap-8 p-8 lg:p-16">
        <div className="space-y-4 flex flex-col justify-center order-2 lg:order-1">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-12 w-40 mt-4" />
        </div>
        <Skeleton className="h-64 lg:h-96 w-full rounded-lg order-1 lg:order-2" />
      </div>

      {/* Content sections skeleton */}
      <div className="px-8 lg:px-16 py-12 space-y-16">
        {/* Section 1 - cards */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-48 mx-auto" />
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-3 p-6 rounded-lg bg-muted/30">
                <Skeleton className="h-40 w-full rounded-lg" />
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 - text block */}
        <div className="space-y-4 max-w-2xl mx-auto">
          <Skeleton className="h-8 w-56 mx-auto" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default PageSkeleton;
