import React, { useEffect, useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { Ruler, Grid, Palette, Type, Eye, X } from 'lucide-react';

const DesignerOverlay = () => {
  const { settings } = useSettings();
  const [showGrid, setShowGrid] = useState(true);
  const [showSpacing, setShowSpacing] = useState(true);
  const [showTypography, setShowTypography] = useState(false);
  const [showColors, setShowColors] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  if (!settings.designerMode) return null;

  return (
    <>
      {/* Grid Overlay */}
      {showGrid && (
        <div className="designer-grid-overlay fixed inset-0 pointer-events-none z-50">
          <div className="designer-grid h-full w-full opacity-20"></div>
        </div>
      )}

      {/* Spacing Indicators */}
      {showSpacing && (
        <div className="designer-spacing-overlay fixed inset-0 pointer-events-none z-50">
          <style>{`
            .designer-spacing-overlay * {
              outline: 1px solid rgba(255, 0, 255, 0.3) !important;
              outline-offset: -1px !important;
            }
            .designer-spacing-overlay *:hover {
              outline: 2px solid rgba(255, 0, 255, 0.6) !important;
              background-color: rgba(255, 0, 255, 0.1) !important;
            }
          `}</style>
        </div>
      )}

      {/* Designer Toolbar */}
      <div className={`designer-toolbar fixed top-20 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300 ${isMinimized ? 'w-12' : 'w-64'}`}>
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            {!isMinimized && (
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Designer Tools</h3>
            )}
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400"
            >
              {isMinimized ? <Eye size={16} /> : <X size={16} />}
            </button>
          </div>

          {!isMinimized && (
            <div className="space-y-3">
              {/* Grid Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Grid size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Grid</span>
                </div>
                <button
                  onClick={() => setShowGrid(!showGrid)}
                  className={`w-8 h-4 rounded-full transition-colors ${showGrid ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${showGrid ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                </button>
              </div>

              {/* Spacing Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Ruler size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Spacing</span>
                </div>
                <button
                  onClick={() => setShowSpacing(!showSpacing)}
                  className={`w-8 h-4 rounded-full transition-colors ${showSpacing ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${showSpacing ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                </button>
              </div>

              {/* Typography Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Type size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Typography</span>
                </div>
                <button
                  onClick={() => setShowTypography(!showTypography)}
                  className={`w-8 h-4 rounded-full transition-colors ${showTypography ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${showTypography ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                </button>
              </div>

              {/* Color Palette */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Colors</span>
                </div>
                <button
                  onClick={() => setShowColors(!showColors)}
                  className={`w-8 h-4 rounded-full transition-colors ${showColors ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                >
                  <div className={`w-3 h-3 bg-white rounded-full transition-transform ${showColors ? 'translate-x-4' : 'translate-x-0.5'}`}></div>
                </button>
              </div>

              {/* Typography Info Panel */}
              {showTypography && (
                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded text-xs">
                  <div className="space-y-1">
                    <div>Font: {settings.fontStyle.replace('_', ' ')}</div>
                    <div>Size: {settings.textSize}</div>
                    <div>Theme: {settings.theme}</div>
                  </div>
                </div>
              )}

              {/* Color Palette Panel */}
              {showColors && (
                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded">
                  <div className="grid grid-cols-4 gap-2">
                    <div className="w-6 h-6 bg-blue-500 rounded border border-gray-300" title="Primary"></div>
                    <div className="w-6 h-6 bg-gray-500 rounded border border-gray-300" title="Secondary"></div>
                    <div className="w-6 h-6 bg-green-500 rounded border border-gray-300" title="Success"></div>
                    <div className="w-6 h-6 bg-red-500 rounded border border-gray-300" title="Error"></div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Design Guide Panel */}
      <div className="designer-guide fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-sm">
        <div className="p-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Design Guide</h4>
          <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Grid system active</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>8px spacing system</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Consistent typography</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span>Accessible contrast</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DesignerOverlay;