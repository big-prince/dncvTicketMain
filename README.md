# DNCV E-Ticketing System

A complete e-ticketing system for De Noble Choral Voices 5th Edition Concert with mobile-first design, manual bank transfer payment, and admin management.

## 🎵 Project Overview

This is a full-stack e-ticketing application built with:
- **Frontend**: React + TypeScript (Vite), Tailwind CSS, Framer Motion
- **Backend**: Node.js + Express, MongoDB, Nodemailer
- **Payment**: Manual Bank Transfer (Primary), Paystack/OPay (Optional)
- **Features**: Mobile-first UI, Email notifications, Admin dashboard, Cron jobs

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB
- Gmail App Password (for email notifications)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd dncv
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   cp .env.example .env
   # Configure your .env file with database and email settings
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

## 📁 Project Structure

```
dncv/
├── client/          # React frontend application
├── server/          # Node.js backend API
└── README.md        # This file
```

## 🎯 Features

- **Mobile-First Design**: Optimized for mobile devices
- **Bank Transfer Payment**: Primary payment method with manual verification
- **Email Notifications**: Automated emails for all payment stages
- **Admin Dashboard**: Payment approval/rejection system
- **Cron Jobs**: Automated reminders and keep-alive functionality
- **Modern UI**: Dark theme with premium styling
- **Type Safety**: Full TypeScript support in frontend

## 🔧 Configuration

### Backend Environment Variables
Copy `server/.env.example` to `server/.env` and configure:
- Database connection
- Email service (Gmail App Password)
- Bank account details
- Admin credentials

### Frontend Environment Variables
Copy `client/.env.example` to `client/.env` and configure:
- API base URL
- Bank details for display

## 🚀 Deployment

### Backend (Render/Railway/etc.)
- Set environment variables
- Enable cron jobs if needed
- Configure keep-alive URL

### Frontend (Vercel/Netlify/etc.)
- Set API base URL
- Build and deploy

## 📧 Email Setup

1. Enable 2-Step Verification on Gmail
2. Generate App Password for "DNCV Concert Tickets"
3. Add to EMAIL_PASSWORD in server/.env

## 🛠️ Development

- **Backend**: `cd server && npm run dev`
- **Frontend**: `cd client && npm run dev`
- **Database**: Ensure MongoDB is running

## 🎭 User Flow

1. User selects ticket type and quantity
2. Fills in personal information
3. Views bank transfer details
4. Makes bank transfer
5. Clicks "Transfer Done"
6. Receives payment reference
7. Admin verifies payment
8. User receives e-ticket via email

## 📝 License

Private project for De Noble Choral Voices.

## 👥 Team

Developed for De Noble Choral Voices 5th Edition Concert.
