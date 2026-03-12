import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DrawerMenu from "@/components/DrawerMenu";
import BottomNav from "@/components/BottomNav";
import HomePage from "@/pages/HomePage";
import BiblePage from "@/pages/BiblePage";
import BibliaFlixPage from "@/pages/BibliaFlixPage";
import StoriesPage from "@/pages/StoriesPage";
import DevotionalPage from "@/pages/DevotionalPage";
import ShopPage from "@/pages/ShopPage";
import SplashScreen from "@/components/SplashScreen";

const AppShell = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  const showBottomNav = !["home"].includes(currentPage) && !showSplash;

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={setCurrentPage} onOpenDrawer={() => setDrawerOpen(true)} />;
      case "bible":
        return <BiblePage />;
      case "bibliaflix":
        return <BibliaFlixPage />;
      case "stories":
        return <StoriesPage />;
      case "devotional":
        return <DevotionalPage />;
      case "shop":
        return <ShopPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} onOpenDrawer={() => setDrawerOpen(true)} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <DrawerMenu
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onNavigate={(page) => {
          setCurrentPage(page);
          setDrawerOpen(false);
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.3 }}
          className={showBottomNav ? "pb-24" : ""}
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {showBottomNav && (
        <BottomNav currentPage={currentPage} onNavigate={setCurrentPage} />
      )}
    </div>
  );
};

export default AppShell;
