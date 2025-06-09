import  { sections } from '../data/sections';
import HeroSection from '../components/HeroSection';
import SectionCard from '../components/SectionCard';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <HeroSection />

      <section id="course-sections" className="py-8">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">Course Sections</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(section => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
