import React from 'react';

interface ModeSelectProps {
  toggleMode: () => void;
}

const ModeSelect: React.FC<ModeSelectProps> = ({ toggleMode }) => {
  return (
    <div>
      <div onClick={toggleMode} style={{ cursor: 'pointer', padding: '8px', border: '1px solid #ddd', marginBottom: '4px' }}>
        Series
      </div>
      <div onClick={toggleMode} style={{ cursor: 'pointer', padding: '8px', border: '1px solid #ddd' }}>
        Bulk
      </div>
    </div>
  );
}

export default ModeSelect;