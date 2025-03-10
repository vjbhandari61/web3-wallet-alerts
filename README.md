# On-Chain Email Alert System

## Overview
On-Chain Email Alerts is a real-time notification system that allows users to subscribe to specific wallet addresses on the Ethereum and Solana blockchains. Users receive email alerts whenever funds are sent to or received from their subscribed addresses. This project utilizes Node.js, Express.js, MongoDB, and Ethers.js for Ethereum interaction, as well as Solana Web3.js for Solana interaction.

## Features
- Users can subscribe to any Ethereum or Solana wallet address.
- Real-time monitoring of incoming and outgoing transactions.
- Email notifications sent via Nodemailer or SendGrid.
- Users can set an alert threshold to filter notifications based on transaction amounts.
- Unsubscribe option to stop notifications.
- Prevents duplicate subscriptions for the same user and wallet address.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Blockchain Interaction**: Ethers.js (Ethereum), Solana Web3.js (Solana)
- **Database**: MongoDB
- **Email Notifications**: Nodemailer / SendGrid
- **Environment Variables**: dotenv

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Alchemy or Infura account for Ethereum RPC access

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/on-chain-email-alerts.git
   cd on-chain-email-alerts
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   PORT=5000
   MONGO_DB_URI=your_mongodb_uri
   ALCHEMY_PROVIDER=your_alchemy_or_infura_provider_url
   USER_MAIL=your_email@gmail.com
   APP_PASS=your_email_app_password
   ```

4. Start the application:
   ```bash
   npm start
   ```

## API Endpoints

### Subscribe to Wallet Address
- **Endpoint**: `POST /api/subscribe`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "walletAddress": "0xYourWalletAddress",
    "chain": "eth"
  }
  ```
- **Response**:
  - **201 Created**: Subscription created successfully.
  - **400 Bad Request**: Subscription already exists for this address.
  - **500 Internal Server Error**: Failed to create subscription.

### Unsubscribe from Wallet Address
- **Endpoint**: `POST /api/unsubscribe`
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "walletAddress": "0xYourWalletAddress"
  }
  ```
- **Response**:
  - **200 OK**: Unsubscribed successfully.
  - **500 Internal Server Error**: Failed to unsubscribe.

## How It Works
1. When a user subscribes to a wallet address, the application checks if the address is already being monitored.
2. If not, it starts monitoring the address for incoming and outgoing transactions.
3. When a transaction is detected, the application checks if it meets the user's alert threshold.
4. If the conditions are met, an email notification is sent to the user.
5. Duplicate subscriptions for the same user and wallet address are prevented.
