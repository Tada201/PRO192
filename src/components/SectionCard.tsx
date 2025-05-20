import  { Section } from '../data/sections';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../hooks/useTranslation';

interface SectionCardProps {
  section: Section;
}

const SectionCard = ({ section }: SectionCardProps) => {
  const Icon = section.icon;
  const { t } = useTranslation();
  
  return (
    <div className="bg-[#BEE3F8] dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-md transition-shadow border border-[#3B82F6] dark:border-gray-700">
      <div className="flex items-center mb-4">
        <div className="p-2 rounded-md bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 mr-3">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-lg font-semibold text-[#1E3A8A] dark:text-white">{t(`${section.translationKey}Title`)}</h3>
      </div>
      
      <p className="text-[#1E3A8A] dark:text-gray-300 mb-4 h-20 overflow-hidden">
        {t(`${section.translationKey}Description`)}
      </p>
      
      <Link 
        to={`/section/${section.id}`}
        className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
      >
        View Content
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

export default SectionCard;
