import React, { useState, useEffect } from "react";
import {
  Container,
  FormInput,
  FormLabel,
  OfferContainer,
  OfferForm,
  OfferTable,
  OfferTableCell,
  OfferTableHeader,
  OfferTableRow,
} from "./styles";
import Header from "../../components/header/Header";
import Button from "../../components/button";

export type OfferItem = {
  id: number;
  name: string;
  createdOn: string;
  updatedAt: string | null;
  deletedAt: string | null;
  price: number;
  description: string;
  minimalForFreeDelivery: number;
  minimalForConsolidation: number;
  totalAmount: number;
  isPublic: boolean;
  version: number;
  companyId: number;
  isDeleted: boolean;
};

const ManageOffers: React.FC = () => {
  const emptyOffer: OfferItem = {
    id: 0,
    name: "",
    createdOn: "",
    updatedAt: null,
    deletedAt: null,
    price: 0,
    description: "",
    minimalForFreeDelivery: 0,
    minimalForConsolidation: 0,
    totalAmount: 0,
    isPublic: false,
    version: 0,
    companyId: 0,
    isDeleted: false,
  };

  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [currentOffer, setCurrentOffer] = useState<OfferItem>(emptyOffer);
  const companyId = localStorage.getItem("userToken");

  const fetchOffers = async () => {
    try {
      if (!companyId) {
        console.error("Company ID not found");
        return;
      }
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/offers/search/company/${companyId}`
      );
      const data = await response.json();
      setOffers(data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleEditButtonClick = (offer: OfferItem) => {
    setCurrentOffer(offer);
  };

  const handleAddOrUpdateOffer = async () => {
    const endpoint = currentOffer.id
      ? `${process.env.REACT_APP_BASE_URL}/offers/update/${currentOffer.id}`
      : `${process.env.REACT_APP_BASE_URL}/offers/create/${companyId}`;
    const method = currentOffer.id ? "PUT" : "POST";
    const offerData = {
      ...currentOffer,
      companyId: companyId,
      isPublic: false, // or true, depending on your logic
      isDeleted: false,
      createdOn: currentOffer.id
        ? currentOffer.createdOn
        : new Date().toISOString(),
      updatedAt: currentOffer.id ? new Date().toISOString() : null,
      deletedAt: null, // or the appropriate value
    };
    try {
      await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(offerData),
      });
      fetchOffers();
    } catch (error) {
      console.error("Error submitting offer:", error);
    }

    setCurrentOffer(emptyOffer);
  };

  const handleDeleteOffer = async (id: number) => {
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/offers/delete/${id}`, {
        method: "DELETE",
      });
      fetchOffers();
    } catch (error) {
      console.error("Error deleting offer:", error);
    }
  };
  const handleResetForm = () => {
    setCurrentOffer(emptyOffer);
  };
  return (
    <>
      <Header />
      <h1>Gerenciamento de Ofertas</h1>
      <Container>
        <OfferContainer>
          <h2>Lista de Ofertas</h2>
          <OfferTable>
            <thead>
              <OfferTableRow>
                <OfferTableHeader>Nome</OfferTableHeader>
                <OfferTableHeader>Preço</OfferTableHeader>
                <OfferTableHeader>Descrição</OfferTableHeader>
                <OfferTableHeader>
                  Quantidade Mínima para Entrega Gratuita
                </OfferTableHeader>
                <OfferTableHeader>Ações</OfferTableHeader>
              </OfferTableRow>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <OfferTableRow key={offer.id}>
                  <OfferTableCell>{offer.name}</OfferTableCell>
                  <OfferTableCell>{offer.price}</OfferTableCell>
                  <OfferTableCell>{offer.description}</OfferTableCell>
                  <OfferTableCell>
                    {offer.minimalForFreeDelivery}
                  </OfferTableCell>
                  <OfferTableCell
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Button
                      text="Editar"
                      onClick={() => handleEditButtonClick(offer)}
                    />
                    <Button
                      text="Excluir"
                      onClick={() => handleDeleteOffer(offer.id)}
                    />
                  </OfferTableCell>
                </OfferTableRow>
              ))}
            </tbody>
          </OfferTable>
        </OfferContainer>

        <OfferContainer>
          <OfferForm>
            <h2>{currentOffer.id ? "Editar oferta" : "Adicionar Oferta"}</h2>

            <FormLabel>Nome:</FormLabel>
            <FormInput
              type="text"
              value={currentOffer.name}
              onChange={(e) =>
                setCurrentOffer({ ...currentOffer, name: e.target.value })
              }
            />

            <FormLabel>Preço:</FormLabel>
            <FormInput
              type="number"
              value={currentOffer.price}
              onChange={(e) =>
                setCurrentOffer({ ...currentOffer, price: +e.target.value })
              }
            />

            <FormLabel>Descrição:</FormLabel>
            <FormInput
              type="text"
              value={currentOffer.description}
              onChange={(e) =>
                setCurrentOffer({
                  ...currentOffer,
                  description: e.target.value,
                })
              }
            />

            <FormLabel>Quantidade Mínima para Entrega Gratuita:</FormLabel>
            <FormInput
              type="number"
              value={currentOffer.minimalForFreeDelivery}
              onChange={(e) =>
                setCurrentOffer({
                  ...currentOffer,
                  minimalForFreeDelivery: +e.target.value,
                })
              }
            />

            <FormLabel>Quantidade Mínima para Consolidação:</FormLabel>
            <FormInput
              type="number"
              value={currentOffer.minimalForConsolidation}
              onChange={(e) =>
                setCurrentOffer({
                  ...currentOffer,
                  minimalForConsolidation: +e.target.value,
                })
              }
            />

            <FormLabel>Total de Quantidade:</FormLabel>
            <FormInput
              type="number"
              value={currentOffer.totalAmount}
              onChange={(e) =>
                setCurrentOffer({
                  ...currentOffer,
                  totalAmount: +e.target.value,
                })
              }
            />
            <Button
              text={currentOffer.id ? "Salvar" : "Adicionar Oferta"}
              onClick={handleAddOrUpdateOffer}
            />
          </OfferForm>
        </OfferContainer>
      </Container>
    </>
  );
};

export default ManageOffers;
