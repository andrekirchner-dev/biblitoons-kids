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
import WelcomePage from "@/pages/WelcomePage";
import SignupPage from "@/pages/SignupPage";
import GenderSelectionPage from "@/pages/GenderSelectionPage";
import AgeSelectionPage from "@/pages/AgeSelectionPage";
import MiniGamesPage from "@/pages/MiniGamesPage";
import ParentalAreaPage from "@/pages/ParentalAreaPage";
import BiblooCoinsPage from "@/pages/BiblooCoinsPage";
import SearchPage from "@/pages/SearchPage";
import ReflectPage from "@/pages/ReflectPage";
import BibliaIlustradaPage from "@/pages/BibliaIlustradaPage";

interface ChildProfile {
  id: string;
  name: string;
  gender: "menino" | "menina";
  age: string;
}

const AppShell = () => {
  const [currentPage, setCurrentPage] = useState("splash");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [gender, setGender] = useState<"menina" | "menino">("menina");
  const [age, setAge] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  // Multi-profile state
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [activeProfileId, setActiveProfileId] = useState<string>("1");

  const showNavPages = ["home", "bible", "bibliaflix", "miniGames", "search"];
  const showBottomNav = showNavPages.includes(currentPage) && !showSplash;

  const pageVariants = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -18 },
  };

  const handleNavigate = (page: string, userData?: { name?: string; email?: string }) => {
    if (userData?.name) setUserName(userData.name);
    setCurrentPage(page);
  };

  const handleAddProfile = () => {
    // Profile will be added from DrawerMenu — here we just refresh if needed
    const newId = String(Date.now());
    const newProfile: ChildProfile = {
      id: newId,
      name: "Novo Perfil",
      gender: "menino",
      age: "6",
    };
    setProfiles((prev) => [...prev, newProfile]);
  };

  const handleGenderSelect = (g: "menina" | "menino") => {
    setGender(g);
    // Update or create first profile
    const existingProfile: ChildProfile = {
      id: "1",
      name: userName || (g === "menina" ? "Maria" : "João"),
      gender: g,
      age: age || "7",
    };
    setProfiles([existingProfile]);
    setActiveProfileId("1");
  };

  const handleAgeSelect = (a: string) => {
    setAge(a);
    setProfiles((prev) =>
      prev.map((p) => (p.id === activeProfileId ? { ...p, age: a } : p))
    );
  };

  const activeProfile = profiles.find((p) => p.id === activeProfileId) ?? profiles[0];

  const renderPage = () => {
    switch (currentPage) {
      case "welcome":
        return <WelcomePage onNavigate={handleNavigate} />;
      case "login":
      case "signup":
        return <SignupPage onNavigate={handleNavigate} />;
      case "gender":
        return (
          <GenderSelectionPage
            onNavigate={handleNavigate}
            onSelectGender={(g) => {
              handleGenderSelect(g);
              setGender(g);
            }}
          />
        );
      case "age":
        return (
          <AgeSelectionPage
            gender={gender}
            onNavigate={handleNavigate}
            onSelectAge={(a) => {
              handleAgeSelect(a);
              setAge(a);
            }}
          />
        );
      case "home":
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenDrawer={() => setDrawerOpen(true)}
            age={activeProfile?.age ?? age}
            gender={activeProfile?.gender ?? gender}
            name={activeProfile?.name ?? userName}
          />
        );
      case "bible":
        return <BiblePage onNavigate={handleNavigate} />;
      case "bibliaflix":
        return <BibliaFlixPage onNavigate={handleNavigate} />;
      case "stories":
        return <StoriesPage />;
      case "devotional":
        return <DevotionalPage onNavigate={handleNavigate} />;
      case "reflect":
        return <ReflectPage onNavigate={handleNavigate} />;
      case "shop":
        return <ShopPage onNavigate={handleNavigate} />;
      case "miniGames":
        return <MiniGamesPage onNavigate={handleNavigate} />;
      case "parentalArea":
        return <ParentalAreaPage onNavigate={handleNavigate} />;
      case "biblooCoins":
        return <BiblooCoinsPage onNavigate={handleNavigate} />;
      case "search":
        return <SearchPage onNavigate={handleNavigate} />;
      case "ilustrada":
        return <BibliaIlustradaPage onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenDrawer={() => setDrawerOpen(true)}
            age={activeProfile?.age ?? age}
            gender={activeProfile?.gender ?? gender}
            name={activeProfile?.name ?? userName}
          />
        );
    }
  };

  if (showSplash) {
    return (
      <div
        className="min-h-screen bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url(${splashBg})` }}
      >
        <SplashScreen
          onComplete={() => {
            setShowSplash(false);
            setCurrentPage("welcome");
          }}
        />
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
        profiles={profiles.length > 0 ? profiles : [{ id: "1", name: userName || (gender === "menina" ? "Maria" : "João"), gender, age: age || "7" }]}
        activeProfileId={activeProfileId}
        onSwitchProfile={(id) => {
          setActiveProfileId(id);
          const p = profiles.find((pr) => pr.id === id);
          if (p) {
            setGender(p.gender);
            setAge(p.age);
          }
        }}
        onAddProfile={handleAddProfile}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.25 }}
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
