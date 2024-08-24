import React, { useState, useRef, useEffect } from 'react';
import '../styles/ui.css';
import ModeSelect from './ModeSelect';
import BulkPage from './BulkPage';

function App() {
  const [selectedMode, setSelectedMode] = useState('Bulk');

  // Function to toggle the selected mode
  const toggleMode = () => {
    setSelectedMode((prevMode) => (prevMode === "Bulk" ? "Series" : "Bulk"));
  };

  // Airtable URL input box
  const textbox = useRef<HTMLInputElement>(null);

  // Sends Airtable link so script runs -> no link = default AT link being used
  const onSyncClick = () => {
    const airtableURL: string = textbox.current?.value || 'https://api.airtable.com/v0/appO7sUJLojVQUUqo/Assets';
    parent.postMessage({ pluginMessage: { type: 'bulk-processing', airtableURL } }, '*');
  };

  useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type } = event.data.pluginMessage;
      if (type === 'bulk-processing') {
        // console.log(`Figma Says : ${message}`);
      }
    };
  }, []);

  return (
    <div>
      <ModeSelect toggleMode={toggleMode} />
      {selectedMode === "Bulk" && (
        <div>
        <BulkPage textbox={textbox} onSyncClick={onSyncClick} />
        </div>
      )}
      {selectedMode === "Series" && (
        <div>
          <h2>Series Asset Creation</h2>
          <p>
            Airtable URL: <input ref={textbox} />
          </p>
          <button id="create" onClick={onSyncClick}>
            Sync
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
