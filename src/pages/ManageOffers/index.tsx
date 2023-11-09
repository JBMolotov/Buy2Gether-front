import React, { useState } from "react";
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
import { OfferItem } from "../../types/offer";
import Button from "../../components/button";

const ManageOffers: React.FC = () => {
  const initialOffer: OfferItem = {
    id: Math.floor(Math.random() * 1000),
    cnpj: "",
    fieldOfActivity: "",
    companyName: "",
    offer: "",
    discountPercentage: 0,
    minPurchaseQuantity: 0,
    expirationDate: "",
  };

  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [newOffer, setNewOffer] = useState<OfferItem>(initialOffer);
  const [editOffer, setEditOffer] = useState<OfferItem | null>(null);

  const handleAddOffer = () => {
    if (editOffer) {
      const updatedOffers = offers.map((offer) =>
        offer.id === editOffer.id ? newOffer : offer
      );
      setOffers(updatedOffers);
      setEditOffer(null);
    } else {
      setOffers([...offers, newOffer]);
    }
    setNewOffer(initialOffer);
  };

  const handleEditOffer = (offer: OfferItem) => {
    setEditOffer(offer);
    setNewOffer(offer);
  };

  const handleDeleteOffer = (id: number) => {
    const updatedOffers = offers.filter((offer) => offer.id !== id);
    setOffers(updatedOffers);
    if (editOffer && editOffer.id === id) {
      setEditOffer(null);
    }
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
                <OfferTableHeader>Oferta</OfferTableHeader>
                <OfferTableHeader>Desconto (%)</OfferTableHeader>
                <OfferTableHeader>Quantidade Mínima</OfferTableHeader>
                <OfferTableHeader>Data de Validade</OfferTableHeader>
                <OfferTableHeader>Ações</OfferTableHeader>
              </OfferTableRow>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <OfferTableRow key={offer.id}>
                  <OfferTableCell>{offer.offer}</OfferTableCell>
                  <OfferTableCell>{offer.discountPercentage}</OfferTableCell>
                  <OfferTableCell>{offer.minPurchaseQuantity}</OfferTableCell>
                  <OfferTableCell>{offer.expirationDate}</OfferTableCell>
                  <OfferTableCell
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Button
                      text="Editar"
                      onClick={() => handleEditOffer(offer)}
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
            <h2>{editOffer ? "Editar oferta" : "Adicionar Oferta"}</h2>

            <FormLabel>Oferta:</FormLabel>
            <FormInput
              type="text"
              value={newOffer.offer}
              onChange={(e) =>
                setNewOffer({ ...newOffer, offer: e.target.value })
              }
            />

            <FormLabel>Desconto (%):</FormLabel>
            <FormInput
              type="number"
              value={newOffer.discountPercentage}
              onChange={(e) =>
                setNewOffer({
                  ...newOffer,
                  discountPercentage: +e.target.value,
                })
              }
            />

            <FormLabel>Quantidade Mínima:</FormLabel>
            <FormInput
              type="number"
              value={newOffer.minPurchaseQuantity}
              onChange={(e) =>
                setNewOffer({
                  ...newOffer,
                  minPurchaseQuantity: +e.target.value,
                })
              }
            />

            <FormLabel>Data de Validade:</FormLabel>
            <FormInput
              type="text"
              value={newOffer.expirationDate}
              onChange={(e) =>
                setNewOffer({ ...newOffer, expirationDate: e.target.value })
              }
            />

            <Button
              text={editOffer ? "Salvar" : "Adicionar Oferta"}
              onClick={handleAddOffer}
            />
          </OfferForm>
        </OfferContainer>
      </Container>
    </>
  );
};

export default ManageOffers;
