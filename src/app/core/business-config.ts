export interface BusinessConfig {
  readonly brandName: string;
  readonly productName: string;
  readonly bottleVolumeLitres: number;
  readonly unitPricePkr: number | null;
  readonly whatsappNumber: string | null;
  readonly phoneNumber: string | null;
  readonly serviceAreas: readonly string[];
  readonly qualityReports: readonly QualityReport[];
}

export interface QualityReport {
  readonly title: string;
  readonly url: string;
}

export const BUSINESS_CONFIG: BusinessConfig = {
  brandName: 'AAB E SINDH',
  productName: '19-litre drinking water bottle',
  bottleVolumeLitres: 19,
  unitPricePkr: 70,
  whatsappNumber: null,
  phoneNumber: null,
  serviceAreas: ['L-14 Market', 'L-8 Market', 'Double Road', 'Extension'],
  qualityReports: [],
};
