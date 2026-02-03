import { ReactNode } from "react";
import TopUtilityBar from "./TopUtilityBar";
import MainHeader from "./MainHeader";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <TopUtilityBar />
      <MainHeader />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
