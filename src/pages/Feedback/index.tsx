import React, { useState } from "react";
import {
  Container,
  FeedbackForm,
  FeedbackTextarea,
  Dropdown,
  Star,
  StarRating,
  SubmitButton,
} from "./styles";
import Header from "../../components/header/Header";
import axios from "axios";

type Client = {
  id: number;
  cpf: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
};

type Company = {
  id: number;
  cpfCnpj: string;
  name: string;
  email: string;
  address: string;
  fieldOfActivity: string;
};

type Offer = {
  id: number;
  name: string;
  createdOn: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  price: number;
  description: string;
  minimalForFreeDelivery: number | null;
  minimalForConsolidation: number | null;
  totalAmount: number;
  isPublic: boolean;
  version: number;
  clients: Client[]; // This would be an array of Client type objects
  companyId: number;
  isDeleted: boolean;
};

// Get Client data from LocalStorage
const getClientData = async (): Promise<Client> => {
  const clientData = await JSON.parse(localStorage.getItem("user") || "{}");
  return clientData;
};

const getCompanies = async (): Promise<Company[]> => {
  const companies = await axios.get(
    "http://localhost:3000/companies/searchAll"
  );
  if (!companies) {
    return [];
  }
  return companies.data;
};

const getOffers = async (companyId: number): Promise<Offer[]> => {
  const offers = await axios.get(
    `http://localhost:3000/offers/search/company/${companyId}`
  );
  return offers.data;
};

const Feedback: React.FC = () => {
  const [client, setClient] = React.useState<Client>({} as Client);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<number | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string>("");
  const [rating, setRating] = useState<number | null>(null);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(true);

  //Check if all fields are filled
  React.useEffect(() => {
    if (selectedCompany && selectedOffer && feedback && rating) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [selectedCompany, selectedOffer, feedback, rating]);

  React.useEffect(() => {
    getClientData().then((data) => {
      setClient(data);
    });
  }, []);

  React.useEffect(() => {
    getCompanies().then((data) => {
      setCompanies(data);
    });
  }, []);

  React.useEffect(() => {
    console.log(selectedCompany);
    if (selectedCompany) {
      getOffers(selectedCompany).then((data) => {
        setOffers(data);
      });
    }
  }, [selectedCompany]);

  const handleCompanyChange = (companyId: number) => {
    setSelectedCompany(companyId);
    setSelectedOffer(null);
  };

  const handleOfferChange = (offer: string) => {
    setSelectedOffer(offer);
  };

  const handleStarClick = (index: number) => {
    setRating(index);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post(
      `http://localhost:3000/feedbacks/create/${selectedCompany}/${client.id}/${selectedOffer}`,
      {
        description: feedback,
        score: rating,
      }
    );

    alert("Feedback enviado com sucesso!");
    // atualizar a página
    window.location.reload();
  };

  return (
    <>
      <Header />
      <Container>
        <h1>Inserir Feedback</h1>
        <FeedbackForm onSubmit={handleSubmit}>
          <Dropdown
            onChange={(e) => handleCompanyChange(Number(e.target.value))}
            value={selectedCompany || ""}
          >
            <option value="" disabled aria-label="Selecione uma empresa">
              Selecione uma empresa
            </option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </Dropdown>

          {selectedCompany && (
            <Dropdown
              onChange={(e) => handleOfferChange(e.target.value)}
              value={selectedOffer || ""}
            >
              <option value="" disabled aria-label="Selecione uma oferta">
                {offers.length === 0
                  ? "Nenhuma oferta disponível"
                  : "Selecione uma oferta"}
              </option>
              {offers.map((offer) => (
                <option key={offer.id} value={offer.id}>
                  {offer.name}
                </option>
              ))}
            </Dropdown>
          )}

          <FeedbackTextarea
            aria-label="CaixaDeFeedback"
            placeholder="Digite seu feedback aqui..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <StarRating>
            {[1, 2, 3, 4, 5].map((index) => (
              <Star
                key={index}
                filled={index <= (rating || 0)}
                onClick={() => handleStarClick(index)}
              >
                &#9733;
              </Star>
            ))}
          </StarRating>

          <SubmitButton disabled={disableSubmit} type="submit">
            Enviar Feedback
          </SubmitButton>
        </FeedbackForm>
      </Container>
    </>
  );
};

export default Feedback;
