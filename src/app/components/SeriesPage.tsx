import React from 'react';
import '../styles/modestyles.css';
import '../styles/figma.css'
import BannerForm from './BannerForm';

interface SeriesPageProps {
  onCreateClick: () => void;
}

const SeriesPage: React.FC<SeriesPageProps> = ({ onCreateClick }) => {
  onCreateClick()
  return (
    <div className="offset">
    <BannerForm />
    
    </div>

  );
};

export default SeriesPage;