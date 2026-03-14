import { useState } from "react";
import splashBg from "@/assets/splash-bg.png";
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
import SignupPage from "@/pages/SignupPage";
import GenderSelectionPage from "@/pages/GenderSelectionPage";
import AgeSelectionPage from "@/pages/AgeSelectionPage";

const AppShell = () => {
  const [currentPage, setCurrentPage] = useState("splash");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [gender, setGender] = useState<"menina" | "menino">("menina");
  const [age, setAge] = useState<string>("");

  const showBottomNav = !["home", "splash", "signup", "gender", "age"].includes(currentPage) && !showSplash;

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case "signup":
        return <SignupPage onNavigate={handleNavigate} />;
      case "gender":
        return (
          <GenderSelectionPage
            onNavigate={handleNavigate}
            onSelectGender={setGender}
          />
        );
      case "age":
        return (
          <AgeSelectionPage
            gender={gender}
            onNavigate={handleNavigate}
            onSelectAge={setAge}
          />
        );
      case "home":
        return <HomePage onNavigate={handleNavigate} onOpenDrawer={() => setDrawerOpen(true)} />;
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
        return <HomePage onNavigate={handleNavigate} onOpenDrawer={() => setDrawerOpen(true)} />;
    }
  };

  if (showSplash) {
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${splashBg})` }}
      >
        <SplashScreen onComplete={() => { setShowSplash(false); setCurrentPage("signup"); }} />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${splashBg})` }}
    >
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
