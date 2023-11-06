export type OfferItem = {
  id: number;
  cnpj: string;
  fieldOfActivity: string;
  companyName: string;
  offer: string;
  discountPercentage: number;
  minPurchaseQuantity: number;
  expirationDate: string;
};

export const offerItems: OfferItem[] = [
  {
    id: 1,
    cnpj: "123456789",
    fieldOfActivity: "Eletrônicos",
    companyName: "ElectroTech",
    offer: "Lotes de Smartphones",
    discountPercentage: 15,
    minPurchaseQuantity: 10,
    expirationDate: "2023-12-31",
  },
  {
    id: 2,
    cnpj: "987654321",
    fieldOfActivity: "Alimentos",
    companyName: "FoodCo",
    offer: "Caixas de Café Gourmet",
    discountPercentage: 10,
    minPurchaseQuantity: 20,
    expirationDate: "2023-11-30",
  },
  {
    id: 3,
    cnpj: "456789123",
    fieldOfActivity: "Roupas",
    companyName: "FashionHub",
    offer: "Pacotes de Camisetas",
    discountPercentage: 20,
    minPurchaseQuantity: 30,
    expirationDate: "2024-01-31",
  },
  {
    id: 4,
    cnpj: "789123456",
    fieldOfActivity: "Móveis",
    companyName: "FurnitureWorld",
    offer: "Conjuntos de Sofás",
    discountPercentage: 12,
    minPurchaseQuantity: 5,
    expirationDate: "2023-12-15",
  },
  {
    id: 5,
    cnpj: "321654987",
    fieldOfActivity: "Brinquedos",
    companyName: "ToyLand",
    offer: "Kits de Brinquedos Infantis",
    discountPercentage: 18,
    minPurchaseQuantity: 15,
    expirationDate: "2024-02-28",
  },
];
