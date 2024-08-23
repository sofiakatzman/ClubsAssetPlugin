import React from 'react';
import '../styles/ui.css';

function App() {
  const textbox = React.useRef<HTMLInputElement>(null);

  const onSync = () => {
    const airtableURL: string = textbox.current?.value || 'https://api.airtable.com/v0/appO7sUJLojVQUUqo/Assets';
    parent.postMessage({ pluginMessage: { type: 'bulk-processing', airtableURL } }, '*');
    
  };

  React.useEffect(() => {
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
      <h2>Bulk Asset Creations</h2>
      <p>
        Airtable URL: <input ref={textbox} />
      </p>
      <button id="create" onClick={onSync}>
        Sync
      </button>
    </div>
  );
}

export default App;