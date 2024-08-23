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
    Subtext: string;
    DiscountCode: string;
    Bookcover: string;
    Copyright: string;
    Variation: string;
    backgroundColor: string;
  };
}
