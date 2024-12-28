# 📖 Plataforma de Gerenciamento de Palavras em inglês

## 📝 Descrição

Este projeto é uma interface desenvolvida para gerenciar informações sobre palavras em inglês (pronúncia, significado, sinônimos, etc). Ele permite funcionalidades como registro e autenticação de usuários, busca por palavras, adição de favoritos e consulta ao histórico.
Esse projeto possui uma aplicação back-end respectiva que pode ser consultada [nesse link](https://github.com/leticiaflbiazioli/english-words-api) e é necessária para as chamadas aos endpoints contidas neste projeto.

---

## 🛠️ Stack

- **Linguagem**: TypeScript
- **Framework**: NextJS
- **Estilização**: Tailwind CSS

---

## 📂 Estrutura de Pastas

```
src/
├── api/          # Serviços e middlewares relacionadas a chamadas de API
├── app/          # Contém a aplicação principal
│ ├── pages/      # Rotas
├── components/   # Componentes reutilizáveis
├── utils/        # Funções utilitárias
```

---

## ⚙️ Funcionalidades

### **1. Criação de conta**

- **Descrição**: Permite que o usuário se cadastre na aplicação.

### **2. Login**

- **Descrição**: Permite que o usuário faça login na aplicação usando email e senha.

### **3. Dashboard**

- **Descrição**:

  - Campo de Pesquisa: Permite ao usuário buscar uma nova palavra.

  - Histórico de Pesquisas: Lista as palavras recentemente pesquisadas. Ao clicar em uma palavra do histórico, abre uma página com detalhes da palavra.

### **4. Lista de palavras em inglês**

- **Descrição**: Mostra uma lista de todas as palavras disponíveis no dicionário. Ao clicar em uma palavra, há o redirecionamento para uma página com os detalhes da mesma.

### **5. Histórico de palavras consultadas**

- **Descrição**: Exibe uma lista com todas as palavras consultadas e as respectivas datas de visualização.

### **6. Listagem de palavras favoritas**

- **Descrição**: Exibe todas as palavras marcadas como favoritas. Permite desfavoritar uma palavra diretamente na lista. Ao clicar em uma palavra favorita, abre a página de detalhes.

### **7. Detalhes sobre uma palavra específica**

- **Descrição**: Exibe as informações detalhadas da palavra pesquisada, além das opções de favoritar ou desfavoritar a palavra.

### **8. Logout**

- **Descrição**: Opção para que o usuário saia da aplicação.

---

## 🚀 Como subir a aplicação

### **1. Pré-requisitos**

- Node.js (versão 16 ou superior)
- Gerenciador de pacotes: NPM

### **2. Instalação**

Clone o repositório e instale as dependências:

`npm install`

### **3. Configuração**

Crie um arquivo _.env_ com as variáveis de ambiente necessárias.

### **4. Inicialização**

Inicie a aplicação:

`npm run dev`

A aplicação estará disponível em: http://localhost:5000. Lembre-se de rodar a o projeto da API em simultâneo.
