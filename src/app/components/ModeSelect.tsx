import React from 'react';
import '../styles/modeselectstyles.css';

interface ModeSelectProps {
  toggleMode: (mode: string) => void;
  selectedMode: string;
}

const ModeSelect: React.FC<ModeSelectProps> = ({ toggleMode, selectedMode }) => {
  return (
    <div className="mode-select-bg-container">
      <div className="mode-select-container">
        <div
          className={`mode-button ${selectedMode === 'Series' ? 'selected' : ''} ${selectedMode === 'Series' ? 'left-active' : ''}`}
          onClick={() => toggleMode('Series')}
        >
          Series Generator
        </div>
        <div
          className={`mode-button ${selectedMode === 'Bulk' ? 'selected' : ''} ${selectedMode === 'Bulk' ? 'right-active' : ''}`}
          onClick={() => toggleMode('Bulk')}
        >
          Bulk Import
        </div>
      </div>
    </div>
  );
};

export default ModeSelect;
