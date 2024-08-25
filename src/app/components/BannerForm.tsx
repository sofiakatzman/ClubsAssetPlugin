import React, { useState } from 'react';

// Define the necessary types and interfaces locally
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

export interface Asset {
  id: string;
  type: BannerType;
  variations: BannerVariation[];
  createdTime: string;
  fields: {
    [key: string]: string;
    campaign: string;
    Title: string;
    CTA1: string;
    CTA2: string;
    PreText: string;
    SubText: string;
    DiscountCode: string;
    Copyright: string;
    backgroundColor: string;
  };
}

export interface PluginMessage {
  header: string;
  cta1: string;
  cta2: string;
  subtext: string;
  pretext: string;
  copyright: string;
  backgroundColor: string;
  fullSelected?: boolean;
  fullVariant?: string;
  halfSelected?: boolean;
  halfVariant?: string;
  searchSelected?: boolean;
  searchVariant?: string;
  curatedSelected?: boolean;
  curatedVariant?: string;
  curatedMobileSelected?: boolean;
  curatedMobileVariant?: string;
  squareSelected?: boolean;
  squareVariant?: string;
  bookCover: string;
}

export interface ModeSelectProps {
  toggleMode: () => void;
}

export interface SeriesPageProps {
  onCreateClick: () => void;
}

const BannerForm: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<Record<BannerType, BannerVariation | null>>({
    'Full Size Banner': null,
    'Half Size Banner': null,
    'Search Results Banner - Desktop': null,
    'Collection Page Hero - Desktop': null,
    'Collection Page Hero - Mobile': null,
    'Square Banner': null,
  });

  const [formData, setFormData] = useState<CopyProperties>({ header: '' });

  // Asset types and their variations
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

  // Determine required copy properties based on selected variations
  const determineRequiredProperties = () => {
    const requiredProperties: Partial<CopyProperties> = {};

    Object.keys(selectedTypes).forEach((type) => {
      const variation = selectedTypes[type as BannerType];
      if (variation) {
        switch (variation) {
          case 'Header Only':
            requiredProperties.header = '';
            break;
          case 'Header and Subtext':
            requiredProperties.header = '';
            requiredProperties.subtext = '';
            break;
          case 'Header and Single CTA':
            requiredProperties.header = '';
            requiredProperties.cta1 = '';
            break;
          case 'Header and Double CTA':
            requiredProperties.header = '';
            requiredProperties.cta1 = '';
            requiredProperties.cta2 = '';
            break;
          case 'Header, Pretext and Single CTA':
            requiredProperties.header = '';
            requiredProperties.pretext = '';
            requiredProperties.cta1 = '';
            break;
          case 'Header, Pretext and Double CTA':
            requiredProperties.header = '';
            requiredProperties.pretext = '';
            requiredProperties.cta1 = '';
            requiredProperties.cta2 = '';
            break;
          case 'Header, Subtext and Single CTA':
            requiredProperties.header = '';
            requiredProperties.subtext = '';
            requiredProperties.cta1 = '';
            break;
          case 'Header, Subtext and Double CTA':
            requiredProperties.header = '';
            requiredProperties.subtext = '';
            requiredProperties.cta1 = '';
            requiredProperties.cta2 = '';
            break;
        }
      }
    });

    return requiredProperties;
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

  const requiredProperties = determineRequiredProperties();

  return (
    <div>
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
    </div>
  );
};

export default BannerForm;