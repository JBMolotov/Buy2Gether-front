export interface Offer {
  id: number;
  name: string;
  price: number;
  description: string;
  minimalForConsolidation: number;
  totalAmount: number;
  isPublic: boolean;
}
