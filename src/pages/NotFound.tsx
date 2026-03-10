import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
          <p className="mb-6 text-xl text-muted-foreground">העמוד שחיפשת לא נמצא</p>
          <Link
            to="/"
            className="inline-block rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            חזרה לדף הבית
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
