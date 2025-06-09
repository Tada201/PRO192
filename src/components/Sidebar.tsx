import { X, Home } from 'lucide-react';
import { sections } from '../data/sections';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isExpanded: boolean;
  showCloseButton?: boolean; // <-- add this prop
}

const Sidebar = ({ isOpen, onClose, isExpanded, showCloseButton }: SidebarProps) => {
  const location = useLocation();
  const { t } = useTranslation();
  
  // Sidebar toggle button (fixed, always visible)
  React.useEffect(() => {
    // Optionally, close sidebar on route change for mobile
  }, [location.pathname]);

  return (
    <>
      {/* Fixed Toggle Button: Only visible when sidebar is closed */}
      {/* Removed: This button will be moved to Navbar.tsx */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-blue-900 dark:bg-gray-800 shadow-lg transform transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isExpanded ? 'w-64' : 'w-20'} md:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          <div className="px-4 py-6 border-b border-gray-200 dark:border-gray-700 flex items-center relative">
            {/* Only show the close button inside the sidebar when sidebar is open (mobile/portrait) */}
            {showCloseButton && isOpen && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="Collapse sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            {/* Removed: Desktop expand/collapse button, now controlled by hamburger globally */}
            <div className={`flex justify-center w-full mb-4 ${isExpanded ? '' : 'justify-center'}`}></div>
          </div>
          
          <nav className="flex-1 px-2 py-4 overflow-y-auto mt-0">
            <Link
              to="/"
              className={`flex items-center px-4 py-2 mb-2 rounded-md ${
                location.pathname === '/' 
                  ? 'bg-blue-700 text-gray-900 dark:bg-blue-900 dark:text-blue-200' 
                  : 'text-gray-800 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700'
              }`}
              onClick={() => {
                if (window.innerWidth < 768) onClose();
              }}
            >
            <Home className="h-4 w-4 mr-3" />
            {isExpanded ? t('homeTitle') : <span className="sr-only">{t('homeTitle')}</span>}
          </Link>
          
          <div className="mt-4 mb-2 px-4">
            <h5 className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-semibold">
              {isExpanded ? t('courseSectionsTitle') : null}
            </h5>
          </div>
          
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = location.pathname === `/section/${section.id}`;
              
              return (
                <Link
                  key={section.id}
                  to={`/section/${section.id}`}
                  className={`flex items-center px-4 py-2 text-sm rounded-md mb-1 ${
                    isActive 
                      ? 'bg-blue-700 text-gray-900 dark:bg-blue-900 dark:text-blue-200' 
                      : 'text-gray-800 dark:text-gray-200 hover:bg-blue-800 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => {
                    if (window.innerWidth < 768) onClose();
                  }}
                >
                  <Icon className={`h-4 w-4 mr-3 ${
                    isActive ? 'text-blue-400 dark:text-blue-400' : 'text-gray-400 dark:text-gray-400'
                  }`} />
                  {isExpanded ? (section.id === 'introductionCourse' ? 'Introduction Course' : t(`${section.translationKey}Title`)) : <span className="sr-only">{t(`${section.translationKey}Title`)}</span>}
                </Link>
              );
            })}
        </nav>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;