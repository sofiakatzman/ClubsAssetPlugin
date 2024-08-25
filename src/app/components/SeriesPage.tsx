import React from 'react';
import '../styles/modestyles.css';
import '../styles/figma.css'

interface SeriesPageProps {
  onCreateClick: () => void;
}

const SeriesPage: React.FC<SeriesPageProps> = ({ onCreateClick }) => {
  onCreateClick()
  return (
    <div className="offset">

      {/* ASSET COPY SECTION */}
      <h2 className="container-title">Asset Copy</h2>
      <div className="container">     
        <div className="input-container">
          <label htmlFor="header" className="input-label">Header</label>
          <input id="header" className="input" />

          <label htmlFor="cta1" className="input-label">CTA 1</label>
          <input id="cta1" className="input" />

          <label htmlFor="cta2" className="input-label">CTA 2</label>
          <input id="cta2" className="input" />

          <label htmlFor="pretext" className="input-label">PreText</label>
          <input id="pretext" className="input" />

          <label htmlFor="subtext" className="input-label">SubText</label>
          <input id="subtext" className="input" />

          <label htmlFor="copyright" className="input-label">Copyright</label>
          <input id="copyright" className="input" />
        </div>
        </div>

        {/* ASSET SELECTION SECTION */}
        <div className="divider">
        <h2 className="container-title">Requested Assets</h2>
        <div className="container">     
            {/* Full size banner - short */}
            <div className="switch">
              <input className="switch__toggle" type="checkbox" id="full-size-selected" />
              <label className="switch__label" htmlFor="full-size-selected">Full Size Banner - Short</label>
              <div className="variant-dropdown" id="full-size-variants">
                <label htmlFor="full-size-variant" className="dropdown_label">Variant:</label>
                <select id="full-size-variant">
                  <option value="fs-header-only">Header Only</option>
                  <option value="fs-header-subtext">Header and Subtext</option>
                  <option value="fs-header-cta1">Header and Single CTA</option>
                  <option value="fs-header-cta2">Header and Double CTA</option>
                </select>
              </div>
            </div>

            {/* Half size */}
            <div className="switch">
              <input className="switch__toggle" type="checkbox" id="half-size-selected" />
              <label className="switch__label" htmlFor="half-size-selected">Half Size Banner</label>
              <div className="variant-dropdown" id="half-size-variants">
                <label htmlFor="half-size-variant" className="dropdown_label">Variant:</label>
                <select id="half-size-variant">
                  <option value="hs-header-only">Header Only</option>
                  <option value="hs-header-subtext">Header and Subtext</option>
                  <option value="hs-header-cta1">Header and Single CTA</option>
                  <option value="hs-header-subtext-cta1">Header, Subtext and Single CTA</option>
                  <option value="hs-header-pretext-cta1">Header, Pretext and CTA</option>
                </select>
              </div>
            </div>

            {/* Search results */}
            <div className="switch">
              <input className="switch__toggle" type="checkbox" id="search-results-selected" />
              <label className="switch__label" htmlFor="search-results-selected">Search Results Banner - Desktop</label>
              <div className="variant-dropdown" id="search-results-variants">
                <label htmlFor="search-results-variant" className="dropdown_label">Variant:</label>
                <select id="search-results-variant">
                  <option value="sr-header-only">Header Only</option>
                  <option value="sr-header-subtext">Header and Subtext</option>
                  <option value="sr-header-cta1">Header and Single CTA</option>
                  <option value="sr-header-cta2">Header and Double CTA</option>
                  <option value="sr-header-pretext-cta1">Header, Pretext and Single CTA</option>
                  <option value="sr-header-pretext-cta2">Header, Pretext and Double CTA</option>
                </select>
              </div>
            </div>

            {/* Collection page hero - desktop */}
            <div className="switch">
              <input className="switch__toggle" type="checkbox" id="curated-page-selected" />
              <label className="switch__label" htmlFor="curated-page-selected">Collection Page Hero - Desktop</label>
              <div className="variant-dropdown" id="curated-page-variants">
                <label htmlFor="curated-page-variant" className="dropdown_label">Variant:</label>
                <select id="curated-page-variant">
                  <option value="cp-header-only">Header Only</option>
                  <option value="cp-header-subtext">Header and Subtext</option>
                  <option value="cp-header-cta1">Header and Single CTA</option>
                  <option value="cp-header-cta2">Header and Double CTA</option>
                  <option value="cp-header-pretext-cta1">Header, Pretext and Single CTA</option>
                  <option value="cp-header-pretext-cta2">Header, Pretext and Double CTA</option>
                </select>
              </div>
            </div>

            {/* Collection page hero - mobile */}
            <div className="switch">
              <input className="switch__toggle" type="checkbox" id="curated-page-mobile-selected" />
              <label className="switch__label" htmlFor="curated-page-mobile-selected">Collection Page Hero - Mobile</label>
              <div className="variant-dropdown" id="curated-page-mobile-variants">
                <label htmlFor="curated-page-mobile-variant" className="dropdown_label">Variant:</label>
                <select id="curated-page-mobile-variant">
                  <option value="cpm-header-only">Header Only</option>
                  <option value="cpm-header-subtext">Header and Subtext</option>
                  <option value="cpm-header-cta1">Header and Single CTA</option>
                  <option value="cpm-header-cta2">Header and Double CTA</option>
                  <option value="cpm-header-pretext-cta1">Header, Pretext and Single CTA</option>
                  <option value="cpm-header-pretext-cta2">Header, Pretext and Double CTA</option>
                  <option value="cpm-header-subtext-cta1">Header, Subtext and Single CTA</option>
                  <option value="cpm-header-subtext-cta2">Header, Subtext and Double CTA</option>
                </select>
              </div>
            </div>

            {/* Square */}
            <div className="switch">
              <input className="switch__toggle" type="checkbox" id="square-selected" />
              <label className="switch__label" htmlFor="square-selected">Square Banner</label>
              <div className="variant-dropdown" id="square-variants">
                <label htmlFor="square-variant" className="dropdown_label">Variant:</label>
                <select id="square-variant">
                  <option value="sq-header-only">Header Only</option>
                  <option value="sq-header-subtext">Header and Subtext</option>
                  <option value="sq-header-cta1">Header and Single CTA</option>
                  <option value="sq-header-pretext-cta1">Header, Pretext and Single CTA</option>
                  <option value="sq-header-subtext-cta1">Header, Subtext and Single CTA</option>
                </select>
              </div>
            </div>

            {/* Background color */}
            <div>
              <label htmlFor="background-color" className="dropdown_label">Background Color:</label>
              <select id="background-color">
                <option value="pink">Pink</option>
                <option value="purple">Purple</option>
                <option value="blue">Blue</option>
              </select>
            </div>
          </div>
      </div>
      </div>

  );
};

export default SeriesPage;