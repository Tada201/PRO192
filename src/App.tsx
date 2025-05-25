import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { SettingsProvider, useSettings, GlobalMouseAudio } from './contexts/SettingsContext';
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

function AppContent()  {
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
      <GlobalMouseAudio />
      {settings.customCursorEnabled && <CustomCursor />}
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Navbar onMenuToggle={toggleSidebar} isSidebarExpanded={isSidebarExpanded} />
        
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

// Toggle this flag to enable/disable disable-devtool integration
const DISABLE_DEVTOOL_ENABLED = false;

function App() {
  useEffect(() => {
    let devtoolsOpen = false;
    let audio: HTMLAudioElement | null = null;
    let disableDevtoolCleanup: (() => void) | null = null;

    function playAlarm() {
      if (!audio) {
        audio = document.createElement('audio');
        audio.preload = 'auto';
        audio.src = '';
        if (audio.canPlayType('audio/webm')) {
          audio.src = '/audio/alarm.webm';
        } else {
          audio.src = '/audio/alarm.wav';
        }
      }
      audio.pause();
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }

    if (DISABLE_DEVTOOL_ENABLED) {
      // Dynamically load disable-devtool and set up the callback
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/disable-devtool@latest/disable-devtool.min.js';
      script.async = true;
      document.body.appendChild(script);
      script.onload = () => {
        (window as any).ondevtoolopen = playAlarm;
      };
      disableDevtoolCleanup = () => {
        (window as any).ondevtoolopen = null;
        document.body.removeChild(script);
      };
    } else {
      // Manual detection fallback
      const interval = setInterval(() => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        if (
          widthThreshold ||
          heightThreshold ||
          /./.toString().length !== 7
        ) {
          if (!devtoolsOpen) {
            devtoolsOpen = true;
            playAlarm();
          }
        } else {
          devtoolsOpen = false;
        }
      }, 500);
      disableDevtoolCleanup = () => clearInterval(interval);
    }
    return () => {
      if (disableDevtoolCleanup) disableDevtoolCleanup();
    };
  }, []);

  return (
    <BrowserRouter>
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </BrowserRouter>
  );
}

export default App;
