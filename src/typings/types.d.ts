declare module '*.svg' {
  const content: any;
  export default content;
}
interface AirtableResponse {
  records: Asset[];
}

interface Asset {
  id: string;
  createdTime: string;
  fields: {
    [key: string]: string; // This allows for any additional fields with string values
    campaign: string;
    Title: string;
    CTA1: string;
    CTA2: string;
    PreText: string;
    SubText: string;
    DiscountCode: string;
    Bookcover: string;
    Copyright: string;
    Layout: string;
    Type: string;
    backgroundColor: string;
  };
}

interface PluginMessage {
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
}
