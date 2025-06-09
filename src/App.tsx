import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SettingsProvider, useSettings, GlobalMouseAudio } from './contexts/SettingsContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SectionPage from './pages/SectionPage';
import SearchResults from './pages/SearchResults';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import CustomCursor from './components/CustomCursor';
import CanvasBackground from './components/CanvasBackground';
import { SearchProvider } from './contexts/SearchContext';
import SearchModal from './components/SearchModal';
import SettingsMenu from './components/SettingsMenu';
import SyllabusPage from './pages/syllabus-pro192-spring2021';

// Component to handle scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Custom hook to detect if device is mobile
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

function AppContent()  {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isPortrait, setIsPortrait] = useState(false);
  const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();
  const isMobile = useIsMobile();

  // Hamburger controls both open (mobile) and expanded (desktop)
  const handleSidebarToggle = () => {
    if (isMobile || isPortrait) {
      setIsSidebarOpen((prev) => {
        // When opening on mobile, also expand
        if (!prev) setIsSidebarExpanded(true);
        return !prev;
      });
    } else {
      setIsSidebarExpanded((prev) => {
        // When collapsing on desktop, also close if needed
        if (prev) setIsSidebarOpen(false);
        return !prev;
      });
    }
  };

  // Responsive aspect ratio detection
  useEffect(() => {
    function handleResize() {
      const aspect = window.innerWidth / window.innerHeight;
      setIsPortrait(aspect < 0.7); // 9:16 is 0.5625, so <0.7 is portrait
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  useKeyboardNavigation();

  // Hamburger checked state: open on mobile/portrait, expanded on desktop
  const hamburgerChecked = isMobile || isPortrait ? isSidebarOpen : isSidebarExpanded;

  let sidebarProps = {
    isOpen: isMobile || isPortrait ? isSidebarOpen : true,
    onClose: () => setIsSidebarOpen(false),
    isExpanded: isSidebarExpanded,
    className: '',
    showCloseButton: isMobile || isPortrait, // <-- add this prop
  };
  if (isPortrait) {
    sidebarProps.isOpen = isSidebarOpen;
    sidebarProps.isExpanded = false;
    sidebarProps.className = 'hidden md:block';
  } else if (!isSidebarExpanded) {
    sidebarProps.className = 'sidebar-mini';
  }

  return (
    <SearchProvider>
      <GlobalMouseAudio />
      {settings.customCursorEnabled && <CustomCursor />}
      <ScrollToTop />
      <div key={`theme-${settings.theme}-${settings.darkTheme}-${settings.lightTheme}`} className={`min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative`}>
        <CanvasBackground />
        <Navbar onMenuToggle={handleSidebarToggle} isSidebarExpanded={isSidebarExpanded} isSidebarOpen={hamburgerChecked} onSettingsMenuToggle={() => setIsSettingsMenuOpen(true)} />
        <div className="flex">
          <Sidebar {...sidebarProps} />
          <main className={`flex-1 p-4 transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'} relative z-10`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/section/:sectionId" element={<SectionPage />} />
                <Route path="/search" element={<SearchResults />} />
                <Route path="/syllabus-pro192-spring2021" element={<SyllabusPage />} />
              </Routes>
            </div>
          </main>
        </div>
        {isSettingsMenuOpen && <SettingsMenu onClose={() => setIsSettingsMenuOpen(false)} />}
        <SearchModal />
      </div>
    </SearchProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </BrowserRouter>
  );
}

export default App;
