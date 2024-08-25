import React from 'react';
import '../styles/modestyles.css';

interface BulkPageProps {
  textbox: React.RefObject<HTMLInputElement>;
  onSyncClick: () => void;
}

const BulkPage: React.FC<BulkPageProps> = ({ textbox, onSyncClick }) => {
  return (
    <div className="offset">
      <h2 className="container-title">Airtable Assets</h2>
    <div className="container">     
      <div className="input-container">
        <label htmlFor="url-input" className="input-label">URL</label>
        <input id="url-input" ref={textbox} className="input" />
      </div>
      <button id="create" onClick={onSyncClick}>
        <b>SYNC</b>
      </button>
        </div>
    </div>

  );
};

export default BulkPage;