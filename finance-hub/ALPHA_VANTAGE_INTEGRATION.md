# Alpha Vantage API Integration

This document describes the real-time stock data integration using Alpha Vantage API in the Finance Hub application.

## 🔑 API Configuration

- **API Provider**: Alpha Vantage
- **API Key**: O8OHSGW92BZ159PG
- **Rate Limit**: 25 calls per day (Free tier)
- **Current Usage**: Conservative 5 calls per minute to preserve daily quota

## 📊 Features Implemented

### 1. Real-Time Stock Widget (`RealTimeStockWidget`)
Located in the **Discover Page > Trending** section.

**Features:**
- Search for any stock symbol
- Real-time price data with change indicators
- Watchlist with quick access buttons
- Auto-refresh every 60 seconds
- Rate limit monitoring and warnings
- Detailed stock information (Open, High, Low, Volume, etc.)

**Usage:**
- Type stock symbol or company name in search box
- Select from search results
- View live price updates
- Add to personal watchlist

### 2. Popular Stocks Widget (`PopularStocksWidget`)
Located in the **Discover Page > Popular** section.

**Features:**
- Displays multiple popular stocks (AAPL, MSFT, GOOGL, AMZN, TSLA)
- Batch API calls with rate limiting
- Live price updates for all symbols
- Change indicators and percentage calculations

## 🛠️ Technical Implementation

### Services

#### `AlphaVantageService`
- **File**: `src/services/alphaVantageService.ts`
- **Purpose**: Core API service with rate limiting and caching
- **Methods**:
  - `getGlobalQuote(symbol)`: Get single stock quote
  - `searchSymbols(keywords)`: Search for stock symbols
  - `getMultipleQuotes(symbols[])`: Batch fetch multiple stocks
  - `getRateLimitInfo()`: Monitor API usage

#### Rate Limiting Strategy
```typescript
class RateLimiter {
  private maxCalls: 5 // Per minute
  private resetTime: 60 seconds
}
```

#### Caching Strategy
- **Duration**: 1 minute per cache entry
- **Purpose**: Reduce API calls for repeated requests
- **Storage**: In-memory Map with timestamp validation

### Hooks

#### `useAlphaVantage.ts`
Custom React hooks for Alpha Vantage integration:

- `useStockQuote(symbol)`: Single stock data with loading states
- `useStockSearch()`: Stock symbol search functionality
- `useMultipleStockQuotes(symbols[])`: Multiple stocks data
- `useRateLimitInfo()`: Real-time rate limit monitoring

### Types

#### Core Types
```typescript
interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  lastUpdated: string;
}
```

## 📈 API Usage Optimization

### Daily Quota Management (25 calls/day)

1. **Rate Limiting**: Max 5 API calls per minute
2. **Caching**: 1-minute cache for all responses
3. **Batch Requests**: Multiple stocks in controlled batches
4. **User Warnings**: Visual indicators when quota is low
5. **Smart Refresh**: Only refresh when user actively requests

### Best Practices Implemented

1. **Error Handling**: Comprehensive error states and fallbacks
2. **Loading States**: Proper loading indicators for all API calls
3. **User Experience**: Clear feedback on API limitations
4. **Performance**: Debounced search and optimized re-renders

## 🚀 Usage Examples

### Basic Stock Quote
```typescript
const { data, loading, error } = useStockQuote('AAPL');
```

### Stock Search
```typescript
const { data, searchStocks } = useStockSearch();
searchStocks('Apple'); // Search for Apple stock
```

### Multiple Stocks
```typescript
const { data, loading } = useMultipleStockQuotes(['AAPL', 'MSFT', 'GOOGL']);
```

## ⚠️ Important Considerations

1. **API Limits**: Only 25 calls per day - use sparingly
2. **Free Tier**: Limited functionality compared to paid tiers
3. **Market Hours**: Data updates during market hours only
4. **Rate Limiting**: Enforced to preserve daily quota

## 🔧 Development Guidelines

### Adding New Stock Components

1. Import the hooks:
```typescript
import { useStockQuote, useRateLimitInfo } from '../hooks/useAlphaVantage';
```

2. Check rate limits before API calls:
```typescript
const rateLimitInfo = useRateLimitInfo();
if (rateLimitInfo.remainingCalls > 0) {
  // Make API call
}
```

3. Handle error states:
```typescript
if (error) {
  return <ErrorComponent message={error} />;
}
```

### Testing

To test the API integration:

1. Start the development server: `npm run dev`
2. Navigate to Discover page
3. Try searching for stocks: AAPL, MSFT, GOOGL
4. Monitor the rate limit counter
5. Test error handling by searching invalid symbols

## 📋 Future Improvements

1. **WebSocket Integration**: Real-time streaming data
2. **Enhanced Caching**: Redis or localStorage for persistence
3. **Paid API Tier**: Increased limits and more features
4. **Historical Data**: Charts and historical price analysis
5. **Portfolio Integration**: Connect with user portfolios

## 🐛 Troubleshooting

### Common Issues

1. **API Key Invalid**: Check if the key is correctly configured
2. **Rate Limit Exceeded**: Wait for the next reset period
3. **Network Errors**: Check internet connection and API status
4. **Invalid Symbols**: Ensure stock symbols are correct and exist

### Error Messages

- `"Rate limit exceeded"`: Too many API calls, wait for reset
- `"Invalid symbol"`: Stock symbol doesn't exist
- `"Failed to fetch"`: Network or API issues
- `"No data available"`: Symbol exists but no current data

## 📞 Support

For API-related issues:
- Alpha Vantage Documentation: https://www.alphavantage.co/documentation/
- API Support: https://www.alphavantage.co/support/

For application issues:
- Check browser console for detailed error messages
- Verify network connectivity
- Ensure API key is valid and not expired
