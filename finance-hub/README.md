# Finance Hub & Personal Portfolio Manager

A comprehensive, interactive, data-driven web application for managing personal investment portfolios, tracking financial news, using financial tools, and engaging with a finance community.

## 🚀 Features

### 📈 Portfolio Management
- **My Assets**: View and track your investment portfolio with real-time calculations
- **Add Transaction**: Record buy/sell transactions with form validation
- **Transaction History**: Complete history of all portfolio transactions
- **Portfolio Analytics**: Total value, cost basis, and gain/loss calculations

### 📰 Financial News
- **Latest News**: Browse curated financial news with filtering and search
- **Category Pages**: News organized by Market, Tech, Crypto, and Economy categories
- **Search Functionality**: Find specific articles and topics

### 🛠️ Financial Tools
- **Compound Interest Calculator**: Calculate investment growth over time
- **More Tools**: Extensible framework for additional financial calculators

### 👥 Community
- **Forum Categories**: Discuss stocks, crypto, real estate, and general finance
- **Discussion Threads**: Browse and participate in financial discussions
- **User Posts**: Community-driven content and insights

### 🎨 User Experience
- **Responsive Design**: Fully responsive across all device sizes
- **Modern UI**: Clean, professional interface built with Tailwind CSS
- **Fast Navigation**: React Router with nested routing and breadcrumbs
- **Type Safety**: Full TypeScript integration throughout the application

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: React Router v6 with nested routes
- **State Management**: Zustand for global state management
- **Forms**: React Hook Form with validation
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React for modern iconography
- **HTTP Client**: Axios for API calls
- **Development**: ESLint, TypeScript strict mode

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd finance-hub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main app layout wrapper
│   └── Navigation.tsx  # Navigation component
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Home dashboard
│   ├── PortfolioPage.tsx # Portfolio management
│   ├── NewsPage.tsx    # Financial news
│   ├── ToolsPage.tsx   # Financial calculators
│   └── CommunityPage.tsx # Community forum
├── store/              # Zustand state management
│   └── portfolioStore.ts # Portfolio state and actions
├── services/           # API and external services
│   └── apiService.ts   # HTTP client and API calls
├── types/              # TypeScript type definitions
│   └── index.ts        # All application types
├── data/               # Mock data and constants
│   └── mockData.ts     # Sample data for development
├── utils/              # Utility functions
│   └── helpers.ts      # Formatting and calculation helpers
└── hooks/              # Custom React hooks (extensible)
```

## 🎯 Key Features Implementation

### State Management
- Zustand store with TypeScript for portfolio data
- Actions for adding/removing assets and transactions
- Computed values for portfolio analytics

### Form Handling
- React Hook Form integration with validation
- Type-safe form submissions
- Error handling and user feedback

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Responsive navigation and layouts
- Optimized for all screen sizes

### Type Safety
- Comprehensive TypeScript types for all data models
- Strict type checking throughout the application
- IntelliSense support for improved developer experience

## 🚦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔮 Future Enhancements

- Real-time stock price integration
- User authentication and persistence
- Advanced portfolio analytics and charts
- Social features for community engagement
- Mobile app development
- Integration with real financial APIs

## 📄 License

This project is part of a software engineering course and is for educational purposes.

## 👨‍💻 Development

Built with modern web development best practices:
- Component-based architecture
- Separation of concerns
- Reusable utilities and hooks
- Comprehensive type safety
- Clean code principles
    ...reactDom.configs.recommended.rules,
  },
})
```
