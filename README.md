# **Buy 2 Gether - Documentação do Projeto**
Bem-vindo à documentação do projeto Buy 2 Gether. Este projeto é uma aplicação web desenvolvida para facilitar a interação entre empresas e clientes, permitindo a criação e gerenciamento de ofertas, perfis de empresas, aprovações, e perfis de clientes.

Estrutura do Projeto
O projeto está organizado em várias páginas, cada uma desempenhando um papel específico. Aqui estão algumas das principais páginas do projeto:

Página Register e RegisterCompany
A página de registro permite que empresas e clientes se cadastrem na plataforma. Ela inclui formulários para inserir informações básicas e realiza validações de entrada para garantir dados corretos.

Página ManageOffers
Esta página é destinada ao gerenciamento de ofertas, permitindo que as empresas adicionem, editem e removam ofertas. As ofertas são exibidas em uma tabela, e os usuários podem interagir com cada oferta.

Página CompanyProfile e ClientProfile
Estas páginas exibem os perfis de empresas e clientes, respectivamente. Elas recuperam dados da API com base no ID do usuário logado e exibem informações relevantes.

Página ClientOffers
Esta página exibe ofertas disponíveis para um cliente específico. As ofertas são recuperadas da API e exibidas em um slider.

Página Approvals
A página de aprovações é destinada a superadministradores. Ela exibe uma tabela de empresas aguardando aprovação e permite que o superadministrador aprove ou rejeite cada empresa.


# **Fluxo de Dados**

**API Calls**

  axios: Utilizado para realizar chamadas à API, que fornece dados relacionados a clientes, empresas, ofertas e feedback.
  
  
**Gerenciamento de Estado**

  useState e useEffect: Utilizados para gerenciar o estado local na maioria das páginas e componentes, incluindo a obtenção e atualização de dados da API.


Context API: Pode ser usado para gerenciar o estado global da aplicação, compartilhando informações entre diferentes componentes.



**Testes Automatizados**

Os testes automatizados são escritos usando a biblioteca jest e @testing-library/react.

São realizados testes para verificar se os componentes estão sendo renderizados corretamente, se as interações do usuário estão sendo tratadas adequadamente e se as chamadas da API estão sendo feitas corretamente.


# Instalação de Dependências:
**Para executar o projeto localmente, siga estas etapas:**

Abra o terminal na pasta

npm install
ou
yarn install

Executando o Projeto:

npm start
ou
yarn start

Acesso à Aplicação:
Abra o navegador e acesse http://localhost:3000

(Lembrando que é necessário o backend rodando para que o frontend rode normalmente)
