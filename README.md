# Aplicativo de Ofertas para Empresas e Clientes

## Visão Geral

Este aplicativo é uma plataforma interativa onde empresas podem se cadastrar para criar e gerenciar ofertas, enquanto clientes se inscrevem para participar dessas ofertas disponíveis em grupo. Ele oferece um ambiente fácil de usar onde empresas e clientes podem se conectar e colaborar.

## Funcionalidades

### Para Empresas

- **Cadastro de Empresa:** As empresas podem se registrar no aplicativo através da página `RegisterCompany`.
- **Login de Empresa:** Após o cadastro, as empresas podem fazer login na página `CompanyLogin`.
- **Gerenciamento de Ofertas:** Empresas podem criar e gerenciar ofertas na página `ManageOffers`.
- **Perfil da Empresa:** As empresas podem visualizar seus perfis na página `CompanyProfile`.

### Para Clientes

- **Cadastro de Cliente:** Os clientes podem se registrar no aplicativo através da página `Register`.
- **Login de Cliente:** Após o cadastro, os clientes podem fazer login na página `ClientLogin`.
- **Perfil do Cliente:** Os clientes podem visualizar seus perfis na página `ClientProfile`.
- **Visualização de Ofertas:** Os clientes podem ver as ofertas disponíveis na página `ClientOffers`.
- **Participação em Ofertas:** Os clientes podem participar das ofertas acessando a página `OfferCard`, que é acessível através de um ID de oferta específico quando se clica em uma oferta.

### Para Super Admin

- **Aprovações:** As empresas podem visualizar e aprovar solicitações na página `Approvals`.

### Página Principal

- A página principal `MainPage` serve como ponto de entrada para o aplicativo, oferecendo navegação para as diferentes funcionalidades disponíveis para empresas e clientes.

## Instalação e Configuração

### Requisitos

- Node.js
- NPM ou Yarn

### Instalação

1. Clone o repositório do projeto.
2. Navegue até a pasta do projeto e execute `npm install` ou `yarn install` para instalar as dependências.

### Execução

- Execute `npm run start` ou `yarn run start` para iniciar o aplicativo. Ele estará disponível no navegador em `localhost:3000` (`3001` se o back-end rodar primeiro).

## Tecnologias Utilizadas

- React
