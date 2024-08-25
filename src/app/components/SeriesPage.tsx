import React from 'react';
import '../styles/modestyles.css';


const SeriesPage: React.FC<SeriesPageProps> = ({ onCreateClick }) => {
  return (
    <div className="offset">
      <h2 className="container-title">Asset Series Generation</h2>
      <div className="container">     
        <div className="input-container">
          <label htmlFor="url-input" className="input-label">URL</label>
          <input id="url-input" className="input" />
        </div>
        <button id="create" onClick={onCreateClick}>
          <b>CREATE</b>
        </button>
      </div>
    </div>
  );
};

export default SeriesPage;