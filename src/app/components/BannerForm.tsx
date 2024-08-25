import React, { useState } from 'react';
import '../styles/modestyles.css';
import '../styles/seriesstyles.css';
import '../styles/ui.css'

// Define necessary types and interfaces
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

interface BannerFormProps {}

interface Asset {
  type: BannerType;
  variation: BannerVariation | null;
  copy: CopyProperties;
  backgroundColor: string;
}

const BannerForm: React.FC<BannerFormProps> = () => {
  const [selectedTypes, setSelectedTypes] = useState<Record<BannerType, BannerVariation | null>>({
    'Full Size Banner - Short': null,
    'Half Size Banner': null,
    'Search Results Banner - Desktop': null,
    'Collection Page Hero - Desktop': null,
    'Collection Page Hero - Mobile': null,
    'Square': null,
  });

  const [formData, setFormData] = useState<CopyProperties>({ header: '' });
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const assetTypes: Record<BannerType, BannerVariation[]> = {
    'Full Size Banner - Short': [
      'Header Only',
      'Header and Subtext',
      'Header and Single CTA',
      'Header and Double CTA'
    ],
    'Half Size Banner': [
      'Header Only',
      'Header and Subtext',
      'Header and Single CTA',
      'Header, Pretext and Single CTA',
      'Header, Subtext and Single CTA'
    ],
    'Search Results Banner - Desktop': [
      'Header Only',
      'Header and Subtext',
      'Header and Single CTA',
      'Header and Double CTA',
      'Header, Pretext and Single CTA',
      'Header, Pretext and Double CTA'
    ],
    'Collection Page Hero - Desktop': [
      'Header Only',
      'Header and Subtext',
      'Header and Single CTA',
      'Header and Double CTA',
      'Header, Pretext and Single CTA',
      'Header, Pretext and Double CTA'
    ],
    'Collection Page Hero - Mobile': [
      'Header Only',
      'Header and Subtext',
      'Header and Single CTA',
      'Header and Double CTA',
      'Header, Pretext and Single CTA',
      'Header, Subtext and Single CTA',
      'Header, Subtext and Double CTA'
    ],
    'Square': [
      'Header Only',
      'Header and Subtext',
      'Header and Single CTA',
      'Header, Pretext and Single CTA',
      'Header, Subtext and Single CTA'
    ]
  };

  const backgroundColors = [
    'Pink',
    'Yellow',
    'Green',
    'Blue',
    'Orange',
  ];

  
  const determineRequiredProperties = (): Partial<CopyProperties> => {
    const variations = Object.values(selectedTypes).filter(v => v !== null) as BannerVariation[];
    const requiredProps: Partial<CopyProperties> = {};
  
    variations.forEach(variation => {
      switch (variation) {
        case 'Header Only':
          requiredProps.header = '';
          break;
        case 'Header and Subtext':
          requiredProps.header = '';
          requiredProps.subtext = '';
          break;
        case 'Header and Single CTA':
          requiredProps.header = '';
          requiredProps.cta1 = '';
          break;
        case 'Header and Double CTA':
          requiredProps.header = '';
          requiredProps.cta1 = '';
          requiredProps.cta2 = '';
          break;
        case 'Header, Pretext and Single CTA':
          requiredProps.header = '';
          requiredProps.pretext = '';
          requiredProps.cta1 = '';
          break;
        case 'Header, Pretext and Double CTA':
          requiredProps.header = '';
          requiredProps.pretext = '';
          requiredProps.cta1 = '';
          requiredProps.cta2 = '';
          break;
        case 'Header, Subtext and Single CTA':
          requiredProps.header = '';
          requiredProps.subtext = '';
          requiredProps.cta1 = '';
          break;
        case 'Header, Subtext and Double CTA':
          requiredProps.header = '';
          requiredProps.subtext = '';
          requiredProps.cta1 = '';
          requiredProps.cta2 = '';
          break;
      }
    });
  
    return requiredProps;
  };

  const handleToggle = (type: BannerType) => {
    setSelectedTypes(prevState => ({
      ...prevState,
      [type]: prevState[type] ? null : assetTypes[type][0] // Toggle between variation and null
    }));
  };

  const handleVariationChange = (type: BannerType, variation: BannerVariation) => {
    setSelectedTypes(prevState => ({
      ...prevState,
      [type]: variation
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBackgroundColor(e.target.value);
  };

  const handleCreateClick = () => {
    const assets: Asset[] = Object.keys(selectedTypes)
      .filter(type => selectedTypes[type as BannerType] !== null)
      .map(type => ({
        type: type as BannerType,
        variation: selectedTypes[type as BannerType] || null,
        copy: {
          header: formData.header,
          subtext: formData.subtext || '',
          cta1: formData.cta1 || '',
          cta2: formData.cta2 || '',
          pretext: formData.pretext || '',
        },
        backgroundColor: backgroundColor, 
      }));

    console.log(assets)

    window.parent.postMessage({
      pluginMessage: {
        type: 'make-series',
        assets
      }
    }, '*');
  };

  const requiredProperties = determineRequiredProperties();
  const hasSelectedAssets = Object.values(selectedTypes).some(v => v !== null);

  return (
    <div className="offset-small">
      {/* REQUESTED ASSETS SECTION */}
      <h2 className="container-title">Requested Assets</h2>
      <div className="container reduced">
        {Object.keys(assetTypes).map((type) => (
          <div key={type} className="input-container">
            <div className="asset-row">
              <label className="input-label">
                <input
                  type="checkbox"
                  checked={!!selectedTypes[type as BannerType]}
                  onChange={() => handleToggle(type as BannerType)}
                />
                {type}
              </label>
            </div>
            {selectedTypes[type as BannerType] !== null && (
              <div className="dropdown-container">
                <select
                  value={selectedTypes[type as BannerType] || ''}
                  onChange={(e) => handleVariationChange(type as BannerType, e.target.value as BannerVariation)}
                  className="select"
                >
                  <option value="" disabled>Select an option</option>
                  {assetTypes[type as BannerType].map(variation => (
                    <option key={variation} value={variation}>
                      {variation}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        ))}
      </div>

{/* REQUIRED DETAILS SECTION */}
{hasSelectedAssets && (
  <div className='divider'>
    <h2 className="container-title">Required Details</h2>
    <div className="container">
      <div className="mb">
      {requiredProperties.header !== undefined && (
        <label className="input-label">
          Header:
          <input
            type="text"
            name="header"
            value={formData.header}
            onChange={handleInputChange}
            className="input"
          />
        </label>
      )}
      {requiredProperties.subtext !== undefined && (
        <label className="input-label">
          Subtext:
          <input
            type="text"
            name="subtext"
            value={formData.subtext || ''}
            onChange={handleInputChange}
            className="input"
          />
        </label>
      )}
      {requiredProperties.cta1 !== undefined && (
        <label className="input-label">
          CTA 1:
          <input
            type="text"
            name="cta1"
            value={formData.cta1 || ''}
            onChange={handleInputChange}
            className="input"
          />
        </label>
      )}
      {requiredProperties.cta2 !== undefined && (
        <label className="input-label">
          CTA 2:
          <input
            type="text"
            name="cta2"
            value={formData.cta2 || ''}
            onChange={handleInputChange}
            className="input"
          />
        </label>
      )}
      {requiredProperties.pretext !== undefined && (
        <label className="input-label">
          Pretext:
          <input
            type="text"
            name="pretext"
            value={formData.pretext || ''}
            onChange={handleInputChange}
            className="input"
          />
        </label>
      )}
      
      {/* BACKGROUND COLOR SECTION */}
        <label className="input-label">
          Background Color:
          <select
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
            className="select bg" 
          >
            <option value="" disabled>Select a color</option>
            {backgroundColors.map(color => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </label>    </div>
      {/* CREATE BUTTON */}
          <button id="create" className=""onClick={handleCreateClick}>
            <b>Create</b>
          </button>
        </div>
      </div>

  
)}
    </div>
  );
};

export default BannerForm;
