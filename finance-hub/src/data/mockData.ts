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
    title: 'NVIDIA Reaches $3 Trillion Market Cap as AI Revolution Accelerates',
    summary: 'NVIDIA surpasses Apple to become the world\'s second-most valuable company, driven by unprecedented demand for AI chips and data center infrastructure.',
    content: 'NVIDIA Corporation has achieved a historic milestone by reaching a $3 trillion market capitalization, surpassing Apple Inc. to become the world\'s second-most valuable public company. The semiconductor giant\'s remarkable ascent reflects the explosive growth in artificial intelligence applications and the critical role of its graphics processing units (GPUs) in powering AI workloads. CEO Jensen Huang attributed the success to the company\'s strategic focus on AI infrastructure, noting that demand for their H100 and upcoming Blackwell chips continues to outstrip supply. Major cloud providers including Microsoft, Amazon, and Google have significantly increased their capital expenditures to secure NVIDIA\'s cutting-edge processors. The company\'s data center revenue alone grew 427% year-over-year in the latest quarter, reaching $22.6 billion. Industry analysts predict this trend will continue as enterprises across all sectors accelerate their AI adoption, from autonomous vehicles to drug discovery.',
    source: 'MarketWatch',
    author: 'Sarah Chen',    date: new Date('2025-06-23'),
    imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
    category: 'stocks',
    url: 'https://example.com/nvidia-3trillion',
    tags: ['NVIDIA', 'AI', 'Semiconductors', 'Market Cap', 'Technology']
  },
  {
    id: '2',
    title: 'Bitcoin ETF Inflows Hit Record $2.4 Billion in Single Week',
    summary: 'Institutional investors pour unprecedented amounts into Bitcoin ETFs as corporate treasuries and pension funds embrace digital assets.',
    content: 'Bitcoin exchange-traded funds experienced their largest weekly inflow on record, with $2.4 billion in new investments as institutional adoption reaches new heights. BlackRock\'s iShares Bitcoin Trust (IBIT) led the surge with $1.1 billion in inflows, followed by Fidelity\'s Wise Origin Bitcoin Fund with $680 million. The massive influx comes as major corporations including MicroStrategy, Tesla, and Block continue to add Bitcoin to their treasury reserves. Pension funds in several states have also begun allocating to Bitcoin ETFs as part of their alternative investment strategies. Bitcoin\'s price rallied to $68,500 following the news, approaching its all-time high of $73,750 set in March 2024. Crypto analysts point to improving regulatory clarity under the new administration and growing acceptance of Bitcoin as a hedge against currency debasement as key drivers. The total assets under management for all Bitcoin ETFs now exceed $85 billion, with institutional investors representing over 70% of the holdings.',
    source: 'CoinDesk',
    author: 'Michael Rodriguez',
    date: new Date('2025-06-22'),
    imageUrl: 'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=800',
    category: 'crypto',
    url: 'https://example.com/bitcoin-etf-record',
    tags: ['Bitcoin', 'ETF', 'Institutional', 'Inflows', 'Cryptocurrency']
  },
  {
    id: '3',
    title: 'Federal Reserve Signals Three Rate Cuts for 2025',
    summary: 'Fed Chair Powell indicates monetary policy will become more accommodative as inflation approaches target and labor market shows signs of cooling.',
    content: 'Federal Reserve Chairman Jerome Powell signaled that the central bank is prepared to implement three quarter-point rate cuts in 2025, marking a significant shift from the restrictive monetary policy stance maintained throughout 2023 and early 2024. Speaking at the Jackson Hole Economic Symposium, Powell cited encouraging progress on inflation, which has declined to 2.4% year-over-year, approaching the Fed\'s 2% target. The unemployment rate has risen to 4.1%, still low by historical standards but showing signs of labor market normalization. Powell emphasized that the Fed will remain data-dependent but expressed confidence that inflation is on a sustainable path to target. Financial markets rallied on the news, with the S&P 500 gaining 1.8% and bond yields falling across the curve. The 10-year Treasury yield dropped to 3.85% as investors priced in a more dovish Fed stance. Economists at Goldman Sachs and JPMorgan have revised their forecasts to align with the Fed\'s new guidance, expecting the first rate cut as early as September.',
    source: 'Reuters',
    author: 'Janet Martinez',
    date: new Date('2025-06-21'),
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    category: 'macro',
    url: 'https://example.com/fed-rate-cuts',
    tags: ['Federal Reserve', 'Interest Rates', 'Monetary Policy', 'Inflation', 'Powell']
  },
  {
    id: '4',
    title: 'Apple Unveils Revolutionary AR Glasses at WWDC 2025',
    summary: 'Apple\'s long-awaited augmented reality glasses promise to transform computing with advanced displays and seamless iOS integration.',
    content: 'Apple Inc. finally unveiled its highly anticipated augmented reality glasses, Apple Vision Pro 2, at the Worldwide Developers Conference 2025, marking the company\'s most significant product launch since the iPhone. The lightweight glasses feature micro-OLED displays with 4K resolution per eye and advanced sensors that enable seamless interaction with digital content overlaid on the real world. CEO Tim Cook demonstrated the device\'s capabilities, showing how users can manipulate 3D objects, conduct video calls with lifelike avatars, and access information without looking at a screen. The glasses integrate deeply with the iOS ecosystem, allowing users to receive notifications, respond to messages, and control smart home devices through eye tracking and hand gestures. Priced at $2,499, the device will be available for pre-order starting July 1st, with general availability in September. Apple\'s stock surged 6% in after-hours trading as investors recognized the potential for a new revenue stream. Industry analysts estimate the AR market could reach $340 billion by 2030, with Apple positioned to capture a significant share.',    source: 'TechCrunch',
    author: 'Lisa Wang',
    date: new Date('2025-06-20'),
    imageUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800',
    category: 'stocks',
    url: 'https://example.com/apple-ar-glasses',
    tags: ['Apple', 'AR', 'WWDC', 'Innovation', 'Technology']
  },
  {
    id: '5',
    title: 'Ethereum Completes Shanghai Upgrade, Enabling Staking Withdrawals',
    summary: 'The successful Ethereum upgrade allows validators to withdraw staked ETH for the first time, marking a major milestone for the network.',
    content: 'Ethereum\'s highly anticipated Shanghai upgrade went live successfully, enabling validators to withdraw their staked ETH for the first time since the Beacon Chain launched in December 2020. The upgrade, also known as EIP-4895, allows the withdrawal of both staking rewards and principal from validators who wish to exit the network. Over 18 million ETH, worth approximately $57 billion, was staked prior to the upgrade. Initial withdrawal data shows a measured response from validators, with only 2.3% requesting exits in the first week, alleviating concerns about a mass exodus that could destabilize the network. Ethereum\'s price has remained stable around $3,150, reflecting market confidence in the upgrade\'s success. The upgrade also includes several other improvements, including reduced gas fees for certain transaction types and enhanced network security. Staking yields have stabilized around 5.2% annually, making Ethereum an attractive option for institutional investors seeking yield in a low-rate environment. The successful implementation positions Ethereum strongly against competitors and reinforces its role as the backbone of decentralized finance.',    source: 'Ethereum Foundation',
    author: 'Vitalik Buterin',
    date: new Date('2025-06-19'),
    imageUrl: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=800',
    category: 'crypto',
    url: 'https://example.com/ethereum-shanghai',
    tags: ['Ethereum', 'Shanghai', 'Staking', 'Upgrade', 'DeFi']
  },
  {
    id: '6',
    title: 'Tesla Reports Record Q2 Deliveries Despite EV Market Headwinds',
    summary: 'Tesla delivers 466,140 vehicles in Q2 2025, beating analyst expectations as Model Y refresh drives strong demand in key markets.',
    content: 'Tesla Inc. reported record quarterly deliveries of 466,140 vehicles in the second quarter of 2025, surpassing analyst expectations of 445,000 units despite broader electric vehicle market challenges. The strong performance was driven by robust demand for the refreshed Model Y and continued growth in the Chinese market, where Tesla maintained its leadership position. CEO Elon Musk credited the company\'s aggressive pricing strategy and improved manufacturing efficiency at the Gigafactory Shanghai for the better-than-expected results. Tesla\'s Full Self-Driving (FSD) software also reached a significant milestone, with over 2 million vehicles now equipped with the latest version. The company reiterated its guidance for 2025 vehicle deliveries of 2.3 million units, representing 47% growth year-over-year. Tesla\'s stock jumped 8% in pre-market trading following the announcement. The strong delivery numbers come as traditional automakers struggle with EV profitability and supply chain constraints. Tesla\'s energy business also showed promising growth, with solar and storage deployments increasing 112% compared to the same period last year.',    source: 'Bloomberg',
    author: 'David Kim',
    date: new Date('2025-06-18'),
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    category: 'stocks',
    url: 'https://example.com/tesla-q2-deliveries',
    tags: ['Tesla', 'EV', 'Deliveries', 'Earnings', 'Elon Musk']
  },
  {
    id: '7',
    title: 'China\'s Economic Growth Accelerates to 5.8% in Q2',
    summary: 'Chinese economy shows resilience with stronger-than-expected growth driven by domestic consumption and manufacturing recovery.',
    content: 'China\'s economy expanded 5.8% year-over-year in the second quarter of 2025, surpassing expectations of 5.2% growth and marking the fastest pace of expansion in eight quarters. The acceleration was primarily driven by a rebound in domestic consumption and continued strength in manufacturing exports. Retail sales grew 8.2% year-over-year in June, the strongest reading since 2021, as consumer confidence improved following the government\'s stimulus measures. The manufacturing purchasing managers\' index remained above the 50 expansion threshold for the sixth consecutive month, indicating sustained factory activity. Property investment showed signs of stabilization after two years of decline, with new home prices in major cities posting modest gains. The People\'s Bank of China has maintained accommodative monetary policy, keeping the loan prime rate at historic lows to support economic recovery. Global investors have responded positively to the data, with Chinese stocks listed in Hong Kong gaining 3.2% and the yuan strengthening against the dollar. However, economists warn that external headwinds, including trade tensions and slowing global demand, could pose challenges in the second half of the year.',
    source: 'Financial Times',
    author: 'Zhang Wei',
    date: new Date('2025-06-17'),
    imageUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
    category: 'macro',
    url: 'https://example.com/china-gdp-growth',
    tags: ['China', 'GDP', 'Economic Growth', 'Manufacturing', 'Consumption']
  },
  {
    id: '8',
    title: 'Microsoft Acquires Leading AI Startup for $16 Billion',
    summary: 'Microsoft\'s largest acquisition since LinkedIn targets advanced language models and reinforces its position in the enterprise AI market.',
    content: 'Microsoft Corporation announced its acquisition of Anthropic, a leading artificial intelligence research company, for $16 billion in cash and stock, marking the tech giant\'s largest deal since purchasing LinkedIn in 2016. The acquisition brings Anthropic\'s advanced large language model technology and constitutional AI research under Microsoft\'s umbrella, significantly strengthening its position in the rapidly growing enterprise AI market. Anthropic\'s Claude models, known for their safety and reliability, will be integrated into Microsoft\'s Azure cloud platform and Office 365 suite. CEO Satya Nadella emphasized that the deal will accelerate Microsoft\'s AI capabilities while maintaining Anthropic\'s commitment to AI safety research. The acquisition is expected to close in Q4 2025, subject to regulatory approval. Microsoft\'s stock gained 4.2% following the announcement, with investors viewing the deal as strategic in competing with Google\'s Bard and OpenAI\'s ChatGPT. The combined entity will have over 3,000 AI researchers and engineers, making it one of the largest AI development teams in the industry. Regulatory scrutiny is expected given the deal\'s size and Microsoft\'s dominant position in enterprise software.',    source: 'Wall Street Journal',
    author: 'Robert Thompson',
    date: new Date('2025-06-16'),
    imageUrl: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=800',
    category: 'stocks',
    url: 'https://example.com/microsoft-anthropic',
    tags: ['Microsoft', 'Acquisition', 'AI', 'Anthropic', 'Enterprise']
  },
  {
    id: '9',
    title: 'Solana Blockchain Achieves 65,000 TPS in Stress Test',
    summary: 'Solana demonstrates unprecedented transaction throughput in latest network upgrade, challenging Ethereum\'s dominance in DeFi.',
    content: 'The Solana blockchain achieved a new milestone by processing 65,000 transactions per second during a comprehensive stress test of its latest Firedancer validator client upgrade. This performance significantly exceeds Ethereum\'s current capacity of 15 TPS and approaches Visa\'s peak processing capabilities. The breakthrough comes as Solana continues to gain market share in decentralized finance (DeFi) applications, with total value locked (TVL) reaching $4.2 billion. Major DeFi protocols including Jupiter, Marinade, and Orca have seen substantial growth in user activity and trading volumes. Solana\'s native token SOL rallied 12% to $165 following the announcement, bringing its market capitalization to $73 billion. The network\'s success has attracted attention from traditional financial institutions, with JPMorgan and Goldman Sachs exploring blockchain applications on Solana. The Firedancer upgrade also introduces enhanced security features and improved network stability, addressing previous concerns about outages. Analysts project that Solana\'s combination of speed, low costs, and growing ecosystem could position it as a serious competitor to Ethereum in the layer-1 blockchain space.',    source: 'Solana Labs',
    author: 'Anatoly Yakovenko',
    date: new Date('2025-06-15'),
    imageUrl: 'https://images.unsplash.com/photo-1644088379091-d574269d422f?w=800',
    category: 'crypto',
    url: 'https://example.com/solana-tps-record',
    tags: ['Solana', 'TPS', 'Blockchain', 'DeFi', 'Performance']
  },
  {
    id: '10',
    title: 'JPMorgan Launches Digital Asset Custody for Institutional Clients',
    summary: 'America\'s largest bank enters the crypto custody market, offering secure storage solutions for Bitcoin, Ethereum, and select altcoins.',
    content: 'JPMorgan Chase & Co. officially launched its digital asset custody service for institutional clients, marking a significant milestone in traditional banking\'s embrace of cryptocurrency. The service, available to wealth management clients with over $100 million in assets, provides secure storage for Bitcoin, Ethereum, and a select group of altcoins including Solana and Polygon. CEO Jamie Dimon, previously a vocal critic of cryptocurrencies, acknowledged the growing institutional demand for digital assets. The custody solution leverages JPMorgan\'s existing security infrastructure and includes insurance coverage up to $250 million per client. The bank partnered with Fireblocks to provide multi-signature wallet technology and 24/7 monitoring. Initial clients include hedge funds, family offices, and pension funds seeking exposure to digital assets. The launch follows similar moves by other major banks, including Bank of New York Mellon and State Street, highlighting the mainstream adoption of cryptocurrency services. JPMorgan\'s entry is expected to bring additional legitimacy to the crypto custody market and could accelerate institutional adoption. The bank plans to expand the service to include staking rewards and DeFi integration by 2026.',
    source: 'Bloomberg',
    author: 'Jennifer Liu',
    date: new Date('2025-06-14'),
    imageUrl: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800',
    category: 'crypto',
    url: 'https://example.com/jpmorgan-crypto-custody',
    tags: ['JPMorgan', 'Crypto Custody', 'Institutional', 'Banking', 'Digital Assets']
  },
  {
    id: '11',
    title: 'European Central Bank Raises Rates to Combat Persistent Inflation',
    summary: 'ECB implements 25 basis point hike as eurozone inflation remains above target despite economic slowdown concerns.',
    content: 'The European Central Bank raised its key interest rate by 25 basis points to 4.75%, the highest level since 2008, as policymakers prioritize combating persistent inflation over economic growth concerns. ECB President Christine Lagarde emphasized that underlying inflation pressures remain too high, with core inflation at 3.8% well above the bank\'s 2% target. The decision was not unanimous, with some governing council members advocating for a pause given signs of economic weakness in Germany and France. Eurozone GDP growth slowed to 0.1% in the first quarter, raising concerns about the impact of higher borrowing costs on economic activity. However, strong wage growth of 4.7% year-over-year has kept inflation expectations elevated. The euro strengthened to $1.12 against the dollar following the rate announcement, while European government bond yields rose across the curve. German 10-year bund yields reached 2.85%, the highest since 2011. Lagarde indicated that further rate increases remain possible if inflation fails to show sustained decline, but the ECB will remain data-dependent in its approach.',    source: 'European Central Bank',
    author: 'Christine Lagarde',
    date: new Date('2025-06-13'),
    imageUrl: 'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=800',
    category: 'macro',
    url: 'https://example.com/ecb-rate-hike',
    tags: ['ECB', 'Interest Rates', 'Inflation', 'Eurozone', 'Monetary Policy']
  },  {
    id: '12',
    title: 'Amazon Web Services Launches Quantum Computing Platform',
    summary: 'AWS introduces commercial quantum computing service targeting enterprise customers in finance, logistics, and pharmaceutical industries.',
    content: 'Amazon Web Services unveiled its long-awaited commercial quantum computing platform, Amazon Braket Quantum, offering enterprise customers access to quantum processors from leading manufacturers including IBM, IonQ, and Rigetti. The cloud-based service targets industries with complex optimization problems, including financial modeling, drug discovery, and supply chain optimization. AWS CEO Adam Selipsky demonstrated the platform\'s capabilities at the company\'s annual re:Invent conference, showing how quantum algorithms can solve certain problems exponentially faster than classical computers. Early customers include Goldman Sachs for portfolio optimization, Roche for molecular simulation, and BMW for route optimization. The service starts at $0.30 per task for basic quantum circuits, with pricing scaled based on complexity and quantum processor type. Industry experts estimate the quantum computing market could reach $65 billion by 2030, with cloud-based access models expected to dominate early adoption. Amazon\'s entry into quantum computing intensifies competition with IBM\'s Quantum Network and Google\'s quantum cloud services. The announcement drove Amazon stock up 2.8% as investors recognized the potential for a new high-margin revenue stream in the emerging quantum economy.',    source: 'Amazon Web Services',
    author: 'Adam Selipsky',
    date: new Date('2025-06-12'),
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800',
    category: 'stocks',
    url: 'https://example.com/aws-quantum-computing',
    tags: ['Amazon', 'AWS', 'Quantum Computing', 'Cloud', 'Enterprise']
  },
  {
    id: '13',
    title: 'Global Supply Chain Disruptions Ease as Inflation Moderates',
    summary: 'International shipping costs normalize and inventory levels stabilize as global supply chains recover from pandemic-era disruptions.',
    content: 'Global supply chain disruptions that plagued businesses since 2020 are finally showing signs of meaningful improvement, with shipping costs falling 60% from peak levels and port congestion clearing worldwide. The Baltic Dry Index, a key measure of shipping costs, has declined to pre-pandemic levels as container availability improves and logistics networks adapt. Major retailers including Walmart, Target, and Costco report normalized inventory levels and reduced lead times for international shipments. The improvement comes as inflation in developed economies shows signs of moderating, with supply-side factors that drove price increases beginning to normalize. Federal Reserve economists estimate that supply chain improvements could reduce core inflation by 0.3-0.5 percentage points over the next year. Manufacturing companies are also benefiting from improved component availability, with automotive and electronics sectors seeing particular relief. However, experts warn that geopolitical tensions and climate-related disruptions remain risks to supply chain stability. Companies are increasingly adopting "near-shoring" strategies to reduce dependence on distant suppliers and improve resilience.',    source: 'Reuters',
    author: 'Maria Gonzalez',
    date: new Date('2025-06-11'),
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
    category: 'general',
    url: 'https://example.com/supply-chain-recovery',
    tags: ['Supply Chain', 'Inflation', 'Global Trade', 'Manufacturing', 'Economics']
  },
  {
    id: '14',
    title: 'Climate Risk Assessment Becomes Mandatory for Major Banks',
    summary: 'New regulatory requirements force financial institutions to conduct comprehensive climate stress tests and disclose environmental risks.',
    content: 'Financial regulators across major economies are implementing comprehensive climate risk assessment requirements for banks with over $100 billion in assets, marking a significant shift in how financial institutions evaluate and manage environmental risks. The new rules, coordinated by the Basel Committee on Banking Supervision, require banks to conduct annual climate stress tests examining how extreme weather events, transition risks, and stranded assets could impact their portfolios. Banks must now disclose their exposure to carbon-intensive industries and demonstrate how climate change could affect loan defaults and asset values. JPMorgan Chase, Bank of America, and Citigroup are among the first institutions to publish detailed climate risk reports showing potential losses from flooding, hurricanes, and transition to renewable energy. The regulations also require banks to maintain additional capital buffers for climate-related risks and integrate environmental factors into their lending decisions. Environmental groups have praised the move as crucial for financial stability, while some banking executives express concerns about implementation costs and methodological challenges. The new framework is expected to accelerate the flow of capital toward green investments and away from fossil fuel projects.',    source: 'Financial Times',
    author: 'Emma Thompson',
    date: new Date('2025-06-10'),
    imageUrl: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800',
    category: 'general',
    url: 'https://example.com/climate-bank-regulation',
    tags: ['Climate Risk', 'Banking', 'Regulation', 'ESG', 'Financial Stability']
  },
  {
    id: '15',
    title: 'Corporate Earnings Season Shows Mixed Results Amid Economic Uncertainty',
    summary: 'Q2 2025 earnings reports reveal divergent performance across sectors as companies navigate inflation, labor costs, and changing consumer behavior.',
    content: 'The second quarter earnings season of 2025 has delivered mixed results, with 68% of S&P 500 companies beating analyst expectations but guidance remaining cautious due to economic uncertainty. Technology giants including Microsoft, Apple, and Google parent Alphabet exceeded revenue forecasts driven by AI-related investments and cloud services growth. However, consumer discretionary companies faced headwinds from changing spending patterns and persistent inflation in services. Walmart and Target reported strong results as consumers sought value, while luxury retailers like LVMH and Tiffany saw declining sales. Energy companies benefited from stable oil prices and increased refining margins, with ExxonMobil and Chevron posting robust quarterly profits. The healthcare sector showed resilience with pharmaceutical companies reporting steady growth, though medical device manufacturers faced supply chain challenges. Financial services firms reported mixed results, with investment banks suffering from reduced M&A activity while regional banks benefited from higher net interest margins. Overall S&P 500 earnings grew 4.2% year-over-year, below the historical average of 7%, reflecting the challenging economic environment companies are navigating.',    source: 'Wall Street Journal',
    author: 'James Mitchell',
    date: new Date('2025-06-09'),
    imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800',
    category: 'general',
    url: 'https://example.com/earnings-season-mixed',
    tags: ['Earnings', 'Corporate Results', 'S&P 500', 'Economic Uncertainty', 'Financial Performance']
  },
  {
    id: '16',
    title: 'Artificial Intelligence Startups Attract Record $45 Billion in Funding',
    summary: 'Venture capital investment in AI companies reaches new heights as enterprises accelerate adoption of machine learning and automation technologies.',
    content: 'Artificial intelligence startups raised a record $45 billion in venture capital funding during the first half of 2025, surpassing the full-year total for 2024 as enterprise demand for AI solutions accelerates. Leading the funding surge is OpenAI\'s $15 billion Series D round led by Microsoft and Thrive Capital, valuing the ChatGPT creator at $150 billion. Anthropic secured $8 billion from Google and other investors, while autonomous vehicle company Waymo raised $5.2 billion. The surge reflects growing enterprise adoption of AI across industries, from healthcare diagnostics to financial risk management. Notable deals include $2.1 billion raised by robotics company Figure AI and $1.8 billion for enterprise AI platform Scale AI. Venture capitalists are particularly focused on companies developing specialized AI chips, with three semiconductor startups raising over $500 million each. However, some investors warn of potential overvaluation in the sector, drawing comparisons to previous technology bubbles. Despite concerns, corporate AI adoption continues accelerating, with 73% of Fortune 500 companies now using AI in some capacity, up from 45% in 2024.',    source: 'TechCrunch',
    author: 'Sarah Kim',
    date: new Date('2025-06-08'),
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
    category: 'general',
    url: 'https://example.com/ai-funding-record',
    tags: ['AI', 'Venture Capital', 'Startups', 'Enterprise Technology', 'Investment']
  },
  {
    id: '17',
    title: 'Real Estate Market Shows Signs of Stabilization After Rate Cuts',
    summary: 'Housing market activity increases following Federal Reserve rate reductions, though affordability remains a challenge in major metropolitan areas.',
    content: 'The U.S. real estate market is showing early signs of stabilization following the Federal Reserve\'s recent interest rate cuts, with home sales increasing 8% month-over-month in May and mortgage applications rising 15%. The 30-year fixed mortgage rate has declined to 6.2% from a peak of 7.8% in late 2024, providing some relief to prospective homebuyers. However, housing affordability remains a significant challenge, with the median home price nationwide reaching $425,000, requiring a household income of over $120,000 to qualify for a median-priced home. Regional variations are stark, with markets like Austin and Phoenix seeing price declines of 5-8% while coastal cities including San Francisco and Boston continue experiencing price appreciation. First-time homebuyer activity has increased modestly but remains 25% below historical averages due to limited inventory and high prices. Commercial real estate faces different challenges, with office vacancy rates in major cities reaching 18% as remote work policies reduce demand for traditional office space. However, industrial and logistics properties continue showing strength driven by e-commerce growth. Real estate investment trusts (REITs) have rallied 12% since the Fed began cutting rates, reflecting improved sentiment in the sector.',
    source: 'National Association of Realtors',
    author: 'Patricia Williams',
    date: new Date('2025-06-07'),
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800',
    category: 'general',
    url: 'https://example.com/real-estate-stabilization',
    tags: ['Real Estate', 'Housing Market', 'Interest Rates', 'Affordability', 'Commercial Property']
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
