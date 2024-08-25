import React, { useState } from 'react';

// Define necessary types and interfaces
export type BannerType = 
  | 'Full Size Banner'
  | 'Half Size Banner'
  | 'Search Results Banner - Desktop'
  | 'Collection Page Hero - Desktop'
  | 'Collection Page Hero - Mobile'
  | 'Square Banner';

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
}

const BannerForm: React.FC<BannerFormProps> = () => {
  const [selectedTypes, setSelectedTypes] = useState<Record<BannerType, BannerVariation | null>>({
    'Full Size Banner': null,
    'Half Size Banner': null,
    'Search Results Banner - Desktop': null,
    'Collection Page Hero - Desktop': null,
    'Collection Page Hero - Mobile': null,
    'Square Banner': null,
  });

  const [formData, setFormData] = useState<CopyProperties>({ header: '' });

  const assetTypes: Record<BannerType, BannerVariation[]> = {
    'Full Size Banner': [
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
      'Header, Subtext and Single CTA'
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
      'Header, Pretext and Double CTA',
      'Header, Subtext and Single CTA',
      'Header, Subtext and Double CTA'
    ],
    'Square Banner': [
      'Header Only',
      'Header and Subtext',
      'Header and Single CTA',
      'Header, Pretext and Single CTA',
      'Header, Subtext and Single CTA'
    ]
  };

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
        }
      }));

      console.log(assets)

    // window.parent.postMessage({
    //   pluginMessage: {
    //     type: 'series-processing',
    //     assets
    //   }
    // }, '*');
  };

  const requiredProperties = determineRequiredProperties();

  return (
    <div className="banner-form">
      <h1>Banner Form</h1>
      {Object.keys(assetTypes).map((type) => (
        <div key={type}>
          <label>
            <input
              type="checkbox"
              checked={!!selectedTypes[type as BannerType]}
              onChange={() => handleToggle(type as BannerType)}
            />
            {type}
          </label>
          {selectedTypes[type as BannerType] && (
            <div>
              <label>
                Select Variation:
                <select
                  value={selectedTypes[type as BannerType] || ''}
                  onChange={(e) => handleVariationChange(type as BannerType, e.target.value as BannerVariation)}
                >
                  {assetTypes[type as BannerType].map(variation => (
                    <option key={variation} value={variation}>
                      {variation}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </div>
      ))}
      <div>
        <h2>Form Details</h2>
        {requiredProperties.header !== undefined && (
          <label>
            Header:
            <input
              type="text"
              name="header"
              value={formData.header}
              onChange={handleInputChange}
            />
          </label>
        )}
        {requiredProperties.subtext !== undefined && (
          <label>
            Subtext:
            <input
              type="text"
              name="subtext"
              value={formData.subtext || ''}
              onChange={handleInputChange}
            />
          </label>
        )}
        {requiredProperties.cta1 !== undefined && (
          <label>
            CTA 1:
            <input
              type="text"
              name="cta1"
              value={formData.cta1 || ''}
              onChange={handleInputChange}
            />
          </label>
        )}
        {requiredProperties.cta2 !== undefined && (
          <label>
            CTA 2:
            <input
              type="text"
              name="cta2"
              value={formData.cta2 || ''}
              onChange={handleInputChange}
            />
          </label>
        )}
        {requiredProperties.pretext !== undefined && (
          <label>
            Pretext:
            <input
              type="text"
              name="pretext"
              value={formData.pretext || ''}
              onChange={handleInputChange}
            />
          </label>
        )}
      </div>
      <button onClick={handleCreateClick}>Create</button>
    </div>
  );
};

export default BannerForm;