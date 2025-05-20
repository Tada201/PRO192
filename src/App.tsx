import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SectionPage from './pages/SectionPage';
import { useKeyboardNavigation } from './hooks/useKeyboardNavigation';
import CustomCursor from './components/CustomCursor';

// Component to handle scroll restoration
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const location = useLocation();
  const { settings } = useSettings();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSidebarExpanded = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  // Listen for toggleSidebarExpanded event to toggle sidebar expansion
  useEffect(() => {
    const handleToggle = () => {
      toggleSidebarExpanded();
    };
    window.addEventListener('toggleSidebarExpanded', handleToggle);
    return () => {
      window.removeEventListener('toggleSidebarExpanded', handleToggle);
    };
  }, [toggleSidebarExpanded]);

  // Use keyboard navigation hook
  useKeyboardNavigation();

  return (
    <>
      {settings.customCursorEnabled && <CustomCursor />}
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar onMenuToggle={toggleSidebar} isSidebarExpanded={isSidebarExpanded} toggleSidebarExpanded={toggleSidebarExpanded} />
        
        <div className="flex">
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} isExpanded={isSidebarExpanded} />
          
          <main className={`flex-1 p-4 transition-all duration-300 ease-in-out ${isSidebarExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/section/:sectionId" element={<SectionPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </>
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
