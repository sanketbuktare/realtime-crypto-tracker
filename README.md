# Realtime crypto tracker

# Backend Setup

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [MongoDB](https://www.mongodb.com/) (Local or remote instance)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
Copy code
npm install
# or
yarn install
```

### 3. Configure Environment Variables

Create a .env file in the root directory of the project with the following content:

```bash
PORT=8000
MONGODB_CONNECTION_STRING=
COIN_GECKO_API_KEY=
API_URL=https://api.coingecko.com
```

Replace your_coin_gecko_api_key with your actual CoinGecko API key.

To generate your CoinGecko API key follow [this](https://docs.coingecko.com/v3.0.1/reference/setting-up-your-api-key)

### 4. Start the Server

Run the server using nodemon for development:

```bash
npm start
# or
yarn start
```

---

# Frontend Setup

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) for package management

## Getting Started

### 1. Clone the Repository

Clone the repository to your local machine:

```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies

Install the required dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

### 3. Run the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

## Additional Steps

- Seed the Database
  Before starting the app, execute the API to seed the database with initial data. Run the following command in your terminal:

```bash
curl -X POST http://localhost:8000/api/coins/seed-data
```
Or use postman to run this API once.

Ensure your backend server is running before executing this command. This step will add the initial coin data to the database.
