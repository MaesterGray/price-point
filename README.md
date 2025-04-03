# PriceWise - Amazon Price Tracker

A full-stack web application built with SvelteKit that helps users track Amazon product prices and get notified when prices drop. Perfect for beginners learning SvelteKit, TypeScript, and MongoDB!

## 🚀 Features

- **User Authentication**: Sign up and sign in with email
- **Product Tracking**: Add Amazon product URLs to track their prices
- **Price History**: View price trends over time
- **Email Notifications**: Get notified when:
  - Product price drops below a threshold
  - Product reaches its lowest price
  - Product comes back in stock
- **Dashboard**: View all your tracked products in one place

## 🛠️ Tech Stack

- **Frontend**: SvelteKit, TypeScript, Tailwind CSS
- **Backend**: SvelteKit API routes
- **Database**: MongoDB with Mongoose
- **Authentication**: Custom email-based auth
- **Email Service**: MailerSend
- **Web Scraping**: Cheerio

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js (v16 or later)
- MongoDB Atlas account (or local MongoDB)
- MailerSend account (for email notifications)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pricewise.git
   cd pricewise
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   MAILER_SEND_API_KEY=your_mailersend_api_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 📚 Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable UI components
│   ├── models/         # MongoDB models
│   ├── server/         # Server-side utilities
│   ├── types/          # TypeScript type definitions
│   └── utils/          # Helper functions
├── routes/
│   ├── dashboard/      # Dashboard page
│   ├── signin/         # Sign in page
│   ├── signup/         # Sign up page
│   └── +page.svelte    # Home page
└── app.d.ts            # Type declarations
```

## 🎯 Key Concepts Covered

1. **SvelteKit Basics**
   - File-based routing
   - Server-side rendering
   - Form actions
   - Page load functions

2. **TypeScript Integration**
   - Type definitions
   - Type safety
   - Interface usage

3. **Database Integration**
   - MongoDB setup
   - Mongoose schemas
   - CRUD operations

4. **Authentication**
   - Session management
   - Protected routes
   - User validation

5. **Web Scraping**
   - Amazon product data extraction
   - Price tracking
   - Error handling

## 📝 Tutorial Series

This project is part of a tutorial series covering:

1. Project Setup & Basic Structure
2. User Authentication
3. Database Integration
4. Product Tracking
5. Email Notifications
6. Dashboard Implementation
7. Deployment


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- SvelteKit team for the amazing framework
- MongoDB for the database
- MailerSend for email services
- Cheerio for web scraping capabilities

## 📞 Support

If you have any questions or need help, feel free to:
- Open an issue
- Check out the tutorial videos

Happy coding! 🚀
