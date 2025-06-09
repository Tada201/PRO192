const HeroSection = () => {
  const handleDownload = () => {
    window.open('https://drive.usercontent.google.com/uc?id=1F-MrzcO8qpKdOirw5AA0-ZzfHs6Su0XG&export=download', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 bg-gray-800 dark:bg-gray-800 rounded-xl shadow-lg mb-8 border border-gray-700 animate-scale-in hover-lift">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-white mb-4 animate-slide-in-left">
          PRO192: Object Oriented Programming using Java
        </h1>
        <p className="text-xl text-gray-300 mb-8 animate-slide-in-right">
          A comprehensive course exploring object-oriented programming concepts, 
          design principles, and practical implementation in Java.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-scale-in">
          <a 
            href="#course-sections"
            className="button inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover-glow transition-all duration-300 relative overflow-hidden h-12"
            style={{ background: '#2563eb' }}
            onMouseEnter={e => {
              const bg = e.currentTarget.querySelector('.button-bg') as HTMLElement | null;
              if (bg) bg.style.transform = 'scaleX(1)';
            }}
            onMouseLeave={e => {
              const bg = e.currentTarget.querySelector('.button-bg') as HTMLElement | null;
              if (bg) bg.style.transform = 'scaleX(0)';
            }}
          >
            <span className="button-content relative z-10 flex items-center">
              Explore Course Sections
            </span>
            <span className="button-bg absolute top-0 left-0 w-full h-full rounded-md" style={{transition: 'all 0.475s', background: 'linear-gradient(82.3deg, rgba(150, 93, 233, 1) 10.8%, rgba(99, 88, 238, 1) 94.3%)', transform: 'scaleX(0)', transformOrigin: '0 50%', zIndex: 0}}></span>
          </a>
          <button
            type="button"
            className="button inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative overflow-hidden h-12"
            style={{ background: '#2563eb' }}
            data-tooltip="Size: 22.8 Mb"
            onClick={handleDownload}
            tabIndex={0}
            aria-label="Download Syllabus"
            onKeyDown={e => {if(e.key==='Enter'||e.key===' '){handleDownload();}}}
            onMouseEnter={e => {
              const bg = e.currentTarget.querySelector('.button-bg') as HTMLElement | null;
              if (bg) bg.style.transform = 'scaleX(1)';
            }}
            onMouseLeave={e => {
              const bg = e.currentTarget.querySelector('.button-bg') as HTMLElement | null;
              if (bg) bg.style.transform = 'scaleX(0)';
            }}
          >
            <span className="button-content relative z-10 flex items-center">
              Download Syllabus
              <span className="ml-2">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.25em" height="1.25em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 0 0 4.561 21h14.878a2 2 0 0 0 1.94-1.515L22 17" /></svg>
              </span>
            </span>
            <span className="button-bg absolute top-0 left-0 w-full h-full rounded-md" style={{transition: 'all 0.475s', background: 'linear-gradient(82.3deg, rgba(150, 93, 233, 1) 10.8%, rgba(99, 88, 238, 1) 94.3%)', transform: 'scaleX(0)', transformOrigin: '0 50%', zIndex: 0}}></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;