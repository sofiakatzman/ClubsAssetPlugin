import React, { useState, useRef, useEffect } from 'react';
import '../styles/ui.css';
import ModeSelect from './ModeSelect';
import BulkPage from './BulkPage';
import SeriesPage from './SeriesPage';

// Define Asset and related types if not imported
export type BannerType = 
  | 'Full Size Banner - Short'
  | 'Half Size Banner'
  | 'Search Results Banner - Desktop'
  | 'Collection Page Hero - Desktop'
  | 'Collection Page Hero - Mobile'
  | 'Square';

export type BannerVariation = 
  | 'Header Only'
  | 'Header and Subtext'
  | 'Header and Single CTA'
  | 'Header and Double CTA'
  | 'Header, Pretext and Single CTA'
  | 'Header, Pretext and Double CTA'
  | 'Header, Subtext and Single CTA'
  | 'Header, Subtext and Double CTA';

export type CopyProperties = {
  header: string;
  subtext?: string;
  cta1?: string;
  cta2?: string;
  pretext?: string;
};

// interface Asset {
//   type: BannerType;
//   variation: BannerVariation | null;
//   copy: CopyProperties;
// }

function App() {
  const [selectedMode, setSelectedMode] = useState<'Series' | 'Bulk'>('Series'); // Updated state type

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

  useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type } = event.data.pluginMessage;
      if (type === 'bulk-processing') {
        // Handle bulk-processing messages here if needed
      }
    };
  }, []);

  return (
    <div>
      <ModeSelect toggleMode={toggleMode} selectedMode={selectedMode} />

      {/* DISPLAY BULK MODE */}
      {selectedMode === "Bulk" && (
        <div>
          <BulkPage textbox={textbox} onSyncClick={onSyncClick} />
        </div>
      )}

      {/* DISPLAY SERIES MODE */}
      {selectedMode === "Series" && (
        <div>
          <SeriesPage />
        </div>
      )}
    </div>
  );
}

export default App;