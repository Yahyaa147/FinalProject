// Data for Key Insights by category
export const insightsData = {
  stocks: [
    {
      title: 'Strong Earnings Performance',
      description: '68% of S&P 500 companies beating estimates this quarter, driven by tech and healthcare sectors.',
      color: 'green' as const
    },
    {
      title: 'AI Infrastructure Boom',
      description: 'Technology sector leading gains with $45B in AI infrastructure investments announced this month.',
      color: 'blue' as const
    },
    {
      title: 'Consumer Spending Shifts',
      description: 'Discretionary spending down 3.2% as consumers prioritize essentials amid inflation concerns.',
      color: 'orange' as const
    },
    {
      title: 'Energy Transition Accelerates',
      description: 'Renewable energy stocks up 15% YTD as government subsidies and corporate commitments drive growth.',
      color: 'purple' as const
    },
    {
      title: 'Healthcare Innovation',
      description: 'Biotech and pharmaceutical companies showing strong pipeline progress with 12 new drug approvals this quarter.',
      color: 'cyan' as const
    }
  ],
  crypto: [
    {
      title: 'Institutional Adoption Surge',
      description: 'Bitcoin ETF inflows reaching record $2.4B monthly as major institutions increase crypto allocations.',
      color: 'orange' as const
    },
    {
      title: 'Ethereum Scaling Solutions',
      description: 'Layer 2 networks processing 80% more transactions while reducing costs by 90% compared to mainnet.',
      color: 'blue' as const
    },
    {
      title: 'DeFi Growth Continues',
      description: 'Total Value Locked in DeFi protocols reaches $95B, driven by yield farming and liquid staking innovations.',
      color: 'green' as const
    },
    {
      title: 'Regulatory Clarity Emerges',
      description: 'New crypto regulations providing clearer frameworks, boosting institutional confidence and market stability.',
      color: 'purple' as const
    },
    {
      title: 'NFT Market Evolution',
      description: 'Focus shifting from collectibles to utility-driven NFTs in gaming, real estate, and identity verification.',
      color: 'indigo' as const
    }
  ],
  macro: [
    {
      title: 'Fed Policy Pivot Expected',
      description: 'Markets pricing in 75bp rate cuts by year-end as inflation cools to 2.8% year-over-year.',
      color: 'red' as const
    },
    {
      title: 'Labor Market Rebalancing',
      description: 'Job openings down 18% from peak while unemployment remains stable at 3.8%, signaling soft landing.',
      color: 'blue' as const
    },
    {
      title: 'Global Supply Chain Recovery',
      description: 'Manufacturing PMIs improving worldwide as supply bottlenecks ease and inventory levels normalize.',
      color: 'green' as const
    },
    {
      title: 'Dollar Weakness Emerging',
      description: 'DXY down 4.2% this quarter as global central banks slow tightening cycles and diversify reserves.',
      color: 'orange' as const
    },
    {
      title: 'Housing Market Stabilization',
      description: 'Mortgage rates declining from peaks while inventory slowly increases, providing market equilibrium.',
      color: 'purple' as const
    }
  ],
  general: [
    {
      title: 'Market Sentiment Improving',
      description: 'VIX volatility index down 25% from recent highs as investor confidence returns across asset classes.',
      color: 'green' as const
    },
    {
      title: 'Technology Sector Leadership',
      description: 'Software and semiconductor companies driving market gains with 22% outperformance this quarter.',
      color: 'blue' as const
    },
    {
      title: 'ESG Investment Growth',
      description: 'Sustainable investing flows reach $8.9B monthly as corporate ESG commitments drive allocation shifts.',
      color: 'cyan' as const
    },
    {
      title: 'Emerging Markets Resilience',
      description: 'EM equities showing strength despite headwinds, supported by commodity prices and currency stability.',
      color: 'purple' as const
    },
    {
      title: 'Fixed Income Positioning',
      description: 'Bond yields stabilizing as investors position for potential rate cuts and duration risk management.',
      color: 'orange' as const
    }
  ]
};

// Data for Quick Actions by category
export const quickActionsData = {
  stocks: [
    {
      title: 'Stock Screener',
      description: 'Filter & analyze stocks by criteria',
      icon: '📊',
      color: 'blue' as const
    },
    {
      title: 'Price Alerts',
      description: 'Set alerts for stock movements',
      icon: '🔔',
      color: 'green' as const
    },
    {
      title: 'Portfolio Tracker',
      description: 'Track your stock investments',
      icon: '📈',
      color: 'purple' as const
    }
  ],
  crypto: [
    {
      title: 'Crypto Calculator',
      description: 'Calculate returns & conversion rates',
      icon: '🪙',
      color: 'orange' as const
    },
    {
      title: 'DeFi Tracker',
      description: 'Monitor DeFi positions & yields',
      icon: '🔗',
      color: 'blue' as const
    },
    {
      title: 'Risk Assessment',
      description: 'Analyze crypto portfolio risk',
      icon: '⚠️',
      color: 'purple' as const
    }
  ],  macro: [
    {
      title: 'Economic Calendar',
      description: 'Track important economic events',
      icon: '📅',
      color: 'red' as const
    },
    {
      title: 'Bond Calculator',
      description: 'Calculate bond yields & prices',
      icon: '💰',
      color: 'blue' as const
    },
    {
      title: 'Inflation Tracker',
      description: 'Monitor inflation trends & impact',
      icon: '📊',
      color: 'orange' as const
    }
  ],
  general: [
    {
      title: 'Market Overview',
      description: 'View comprehensive market data',
      icon: '🌍',
      color: 'blue' as const
    },
    {
      title: 'News Alerts',
      description: 'Set custom news notifications',
      icon: '📰',
      color: 'green' as const
    },
    {
      title: 'Research Tools',
      description: 'Access analysis & research reports',
      icon: '🔍',
      color: 'purple' as const
    }
  ]
};

// Data for Category Analytics
export const getAnalyticsData = (articles: any[]) => {
  const baseMetrics = [
    {
      value: articles.length,
      label: 'Total Articles',
      sublabel: 'This month',
      color: 'blue' as const
    },
    {
      value: `${Math.floor(articles.length * 1.2 + Math.random() * 10)}K`,
      label: 'Total Views',
      sublabel: '+15% this week',
      color: 'green' as const
    },
    {
      value: Math.floor(articles.length * 0.8 + Math.random() * 5),
      label: 'Breaking News',
      sublabel: 'Last 24h',
      color: 'purple' as const
    },
    {
      value: `${Math.floor(85 + Math.random() * 10)}%`,
      label: 'Accuracy Rate',
      sublabel: 'AI verified',
      color: 'orange' as const
    }
  ];

  return baseMetrics;
};
