import type { Asset, Transaction, Article, ForumCategory, ForumThread, ForumPost, MarketData } from '../types';

// Mock Assets Data
export const mockAssets: Asset[] = [
  {
    id: '1',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    type: 'stock',
    quantity: 10,
    averageCost: 150.00,
    currentPrice: 175.50,
    lastUpdated: new Date('2025-06-22')
  },
  {
    id: '2',
    symbol: 'BTC',
    name: 'Bitcoin',
    type: 'crypto',
    quantity: 0.5,
    averageCost: 45000.00,
    currentPrice: 52000.00,
    lastUpdated: new Date('2025-06-22')
  },
  {
    id: '3',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    type: 'stock',
    quantity: 8,
    averageCost: 280.00,
    currentPrice: 320.75,
    lastUpdated: new Date('2025-06-22')
  },
  {
    id: '4',
    symbol: 'ETH',
    name: 'Ethereum',
    type: 'crypto',
    quantity: 2,
    averageCost: 2800.00,
    currentPrice: 3200.00,
    lastUpdated: new Date('2025-06-22')
  },
  {
    id: '5',
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    type: 'stock',
    quantity: 5,
    averageCost: 2650.00,
    currentPrice: 2800.25,
    lastUpdated: new Date('2025-06-22')
  }
];

// Mock Transactions Data
export const mockTransactions: Transaction[] = [
  {
    id: '1',
    assetId: '1',
    type: 'buy',
    quantity: 10,
    price: 150.00,
    date: new Date('2025-01-15'),
    fees: 5.00
  },
  {
    id: '2',
    assetId: '2',
    type: 'buy',
    quantity: 0.5,
    price: 45000.00,
    date: new Date('2025-02-10'),
    fees: 25.00
  },
  {
    id: '3',
    assetId: '3',
    type: 'buy',
    quantity: 8,
    price: 280.00,
    date: new Date('2025-03-05'),
    fees: 8.00
  },
  {
    id: '4',
    assetId: '4',
    type: 'buy',
    quantity: 2,
    price: 2800.00,
    date: new Date('2025-04-12'),
    fees: 15.00
  },
  {
    id: '5',
    assetId: '5',
    type: 'buy',
    quantity: 5,
    price: 2650.00,
    date: new Date('2025-05-20'),
    fees: 12.50
  }
];

// Mock News Articles
export const mockArticles: Article[] = [
  {
    id: '1',
    title: 'Tech Giants Rally as AI Adoption Accelerates',
    summary: 'Major technology companies see significant gains as artificial intelligence integration drives market optimism.',
    source: 'Financial Times',
    author: 'Sarah Johnson',
    date: new Date('2025-06-22'),
    imageUrl: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800',
    category: 'stocks',
    url: 'https://example.com/tech-rally',
    tags: ['AI', 'Technology', 'Stocks', 'Growth']
  },
  {
    id: '2',
    title: 'Bitcoin Reaches New All-Time High Above $52,000',
    summary: 'Cryptocurrency markets surge as institutional adoption continues and regulatory clarity improves.',
    source: 'CoinDesk',
    author: 'Michael Chen',
    date: new Date('2025-06-21'),
    imageUrl: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800',
    category: 'crypto',
    url: 'https://example.com/bitcoin-ath',
    tags: ['Bitcoin', 'Cryptocurrency', 'ATH', 'Institutional']
  },
  {
    id: '3',
    title: 'Federal Reserve Maintains Interest Rates',
    summary: 'The Fed holds rates steady as inflation shows signs of cooling and employment remains strong.',
    source: 'Reuters',
    author: 'David Martinez',
    date: new Date('2025-06-20'),
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    category: 'macro',
    url: 'https://example.com/fed-rates',
    tags: ['Federal Reserve', 'Interest Rates', 'Monetary Policy']
  },
  {
    id: '4',
    title: 'Ethereum 2.0 Staking Reaches Record Levels',
    summary: 'The Ethereum network sees unprecedented staking activity as yields remain attractive to investors.',
    source: 'Decrypt',
    author: 'Lisa Wang',
    date: new Date('2025-06-19'),
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    category: 'crypto',
    url: 'https://example.com/eth-staking',
    tags: ['Ethereum', 'Staking', 'DeFi', 'Yield']
  },
  {
    id: '5',
    title: 'Green Energy Stocks Surge on Climate Policy',
    summary: 'Renewable energy companies rally following new government initiatives supporting clean technology.',
    source: 'Bloomberg',
    author: 'Robert Green',
    date: new Date('2025-06-18'),
    imageUrl: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800',
    category: 'stocks',
    url: 'https://example.com/green-energy',
    tags: ['Green Energy', 'Climate', 'Policy', 'Renewable']
  }
];

// Mock Market Data
export const mockMarketData: MarketData[] = [
  {
    symbol: 'SPY',
    price: 425.80,
    change: 5.20,
    changePercent: 1.24,
    volume: 45000000,
    lastUpdated: new Date('2025-06-22')
  },
  {
    symbol: 'QQQ',
    price: 350.45,
    change: 8.75,
    changePercent: 2.56,
    volume: 38000000,
    lastUpdated: new Date('2025-06-22')
  },
  {
    symbol: 'BTC-USD',
    price: 52000.00,
    change: 1200.00,
    changePercent: 2.36,
    volume: 25000000000,
    lastUpdated: new Date('2025-06-22')
  },
  {
    symbol: 'ETH-USD',
    price: 3200.00,
    change: 150.00,
    changePercent: 4.92,
    volume: 15000000000,
    lastUpdated: new Date('2025-06-22')
  }
];

// Mock Forum Categories
export const mockForumCategories: ForumCategory[] = [
  {
    id: '1',
    name: 'General Discussion',
    description: 'General investment and finance discussions',
    threadCount: 1250,
    postCount: 18500,
    color: 'bg-blue-600',
    lastActivity: new Date('2025-06-22')
  },
  {
    id: '2',
    name: 'Stock Analysis',
    description: 'In-depth analysis of individual stocks and market trends',
    threadCount: 890,
    postCount: 12400,
    color: 'bg-green-600',
    lastActivity: new Date('2025-06-22')
  },
  {
    id: '3',
    name: 'Cryptocurrency',
    description: 'All things crypto - trading, technology, and market analysis',
    threadCount: 2100,
    postCount: 35600,
    color: 'bg-yellow-600',
    lastActivity: new Date('2025-06-22')
  },
  {
    id: '4',
    name: 'Portfolio Reviews',
    description: 'Share your portfolio and get feedback from the community',
    threadCount: 567,
    postCount: 8900,
    color: 'bg-purple-600',
    lastActivity: new Date('2025-06-21')
  },
  {
    id: '5',
    name: 'Beginner Questions',
    description: 'New to investing? Ask your questions here',
    threadCount: 1800,
    postCount: 24500,
    color: 'bg-indigo-600',
    lastActivity: new Date('2025-06-22')
  }
];

// Mock Forum Threads
export const mockForumThreads: ForumThread[] = [
  {
    id: '1',
    categoryId: '2',
    title: 'Apple Q1 2025 Earnings Analysis - Bullish or Bearish?',
    content: 'What do you think about Apple\'s latest earnings report? Revenue beat expectations but iPhone sales were slightly down.',
    author: 'TechInvestor92',
    createdAt: new Date('2025-06-20'),
    replies: 24,
    views: 890,
    lastActivity: new Date('2025-06-22'),
    isPinned: false,
    isLocked: false
  },
  {
    id: '2',
    categoryId: '3',
    title: 'Bitcoin ETF Impact on Market Dynamics',
    content: 'How do you think the new Bitcoin ETFs are affecting the overall crypto market? Seeing increased institutional flow.',
    author: 'CryptoAnalyst',
    createdAt: new Date('2025-06-19'),
    replies: 45,
    views: 1200,
    lastActivity: new Date('2025-06-22'),
    isPinned: true,
    isLocked: false
  },
  {
    id: '3',
    categoryId: '4',
    title: 'Rate My 25-Year-Old\'s Portfolio',
    content: 'Looking for feedback on my investment allocation. Currently 70% stocks, 20% bonds, 10% crypto.',
    author: 'YoungInvestor',
    createdAt: new Date('2025-06-18'),
    replies: 18,
    views: 567,
    lastActivity: new Date('2025-06-21'),
    isPinned: false,
    isLocked: false
  },
  {
    id: '4',
    categoryId: '1',
    title: 'Market Outlook for 2025 - Your Predictions?',
    content: 'With all the economic changes happening, what are your predictions for the markets in 2025?',
    author: 'MarketWatcher',
    createdAt: new Date('2025-06-17'),
    replies: 67,
    views: 2100,
    lastActivity: new Date('2025-06-22'),
    isPinned: false,
    isLocked: false
  },
  {
    id: '5',
    categoryId: '5',
    title: 'How much should I invest as a beginner?',
    content: 'I\'m 22 and just started working. How much of my salary should I invest?',
    author: 'NewGrad2025',
    createdAt: new Date('2025-06-16'),
    replies: 32,
    views: 1450,
    lastActivity: new Date('2025-06-21'),
    isPinned: false,
    isLocked: false
  }
];

// Mock Forum Posts
export const mockForumPosts: ForumPost[] = [
  {
    id: '1',
    threadId: '1',
    content: 'I think Apple is still undervalued despite the recent run-up. Their services revenue continues to grow steadily.',
    author: 'ValueHunter',
    date: new Date('2025-06-21'),
    likes: 8
  },
  {
    id: '2',
    threadId: '1',
    content: 'Disagree - with increased competition in smartphones and regulatory pressure, I see headwinds ahead.',
    author: 'BearishBob',
    date: new Date('2025-06-21'),
    likes: 3
  },
  {
    id: '3',
    threadId: '2',
    content: 'The institutional adoption through ETFs is definitely a game changer. We\'re seeing more stable price action.',
    author: 'InstitutionalTrader',
    date: new Date('2025-06-20'),
    likes: 15
  },
  {
    id: '4',
    threadId: '3',
    content: 'That\'s a solid allocation for your age! You might want to consider increasing your crypto allocation slightly, maybe to 15%.',
    author: 'PortfolioGuru',
    date: new Date('2025-06-19'),
    likes: 12
  },
  {
    id: '5',
    threadId: '4',
    content: 'I\'m cautiously optimistic about 2025. Tech sector should continue to do well with AI developments.',
    author: 'TechBull',
    date: new Date('2025-06-18'),
    likes: 9
  }
];
