import React, { useState, useRef, useEffect } from 'react';
import '../styles/ui.css';
import ModeSelect from './ModeSelect';
import BulkPage from './BulkPage';
import SeriesPage from './SeriesPage';

function App() {
  const [selectedMode, setSelectedMode] = useState('Series');

  const toggleMode = () => {
    setSelectedMode((prevMode) => {
      const newMode = prevMode === "Bulk" ? "Series" : "Bulk";
      // Send message to the controller to resize the UI
      parent.postMessage(
        {
          pluginMessage: {
            type: 'resize-ui',
            mode: newMode,
            dimensions: newMode === "Bulk" ? { width: 600, height: 280 } : { width: 600, height: 1000 },
          },
        },
        '*'
      );
      return newMode;
    });
  };

  // Airtable URL input box
  const textbox = useRef<HTMLInputElement>(null);

  // Sends Airtable link so script runs -> no link = default AT link being used
  const onSyncClick = () => {
    const airtableURL: string = textbox.current?.value || 'https://api.airtable.com/v0/appO7sUJLojVQUUqo/Assets';
    parent.postMessage({ pluginMessage: { type: 'bulk-processing', airtableURL } }, '*');
  };

  const onCreateClick = () => {
    // const airtableURL: string = textbox.current?.value || 'https://api.airtable.com/v0/appO7sUJLojVQUUqo/Assets';
    // parent.postMessage({ pluginMessage: { type: 'series-processing' } }, '*');
    console.log("You've clicked generate assets!")
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
      <ModeSelect toggleMode={toggleMode} selectedMode={selectedMode}/>

      {/* DISPLAY BULK MODE */}
      {selectedMode === "Bulk" && (
        <div>
        <BulkPage textbox={textbox} onSyncClick={onSyncClick} />
        </div>
      )}

      {/* DISPLAY SERIES MODE */}
      {selectedMode === "Series" && (

        <div>
          <SeriesPage onCreateClick={onCreateClick}/>
        </div>
      )}
    </div>
  );
}

export default App;
