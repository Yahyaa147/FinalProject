import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';


interface CalendarEvent {
  id: string;
  date: Date;
  type: 'earnings' | 'dividend' | 'economic' | 'ipo';
  title: string;
  company?: string;
  amount?: number;
  importance: 'high' | 'medium' | 'low';
}

interface FinancialCalendarProps {
  className?: string;
}

const FinancialCalendar: React.FC<FinancialCalendarProps> = ({ className = "" }) => {
  const [currentWeek, setCurrentWeek] = useState(0);

  const events: CalendarEvent[] = [
    {
      id: '1',
      date: new Date(2025, 5, 24),
      type: 'earnings',
      title: 'Q2 Earnings',
      company: 'AAPL',
      importance: 'high'
    },
    {
      id: '2',
      date: new Date(2025, 5, 25),
      type: 'dividend',
      title: 'Ex-Dividend Date',
      company: 'MSFT',
      amount: 2.75,
      importance: 'medium'
    },
    {
      id: '3',
      date: new Date(2025, 5, 26),
      type: 'economic',
      title: 'GDP Report',
      importance: 'high'
    },
    {
      id: '4',
      date: new Date(2025, 5, 27),
      type: 'earnings',
      title: 'Q2 Earnings',
      company: 'GOOGL',
      importance: 'high'
    },
    {
      id: '5',
      date: new Date(2025, 5, 28),
      type: 'ipo',
      title: 'IPO Launch',
      company: 'NewTech Inc.',
      importance: 'medium'
    }
  ];

  const today = new Date();
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay() + (currentWeek * 7));
  
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + i);
    return date;
  });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'earnings':
        return <TrendingUp className="h-3 w-3" />;
      case 'dividend':
        return <DollarSign className="h-3 w-3" />;
      case 'economic':
        return <AlertCircle className="h-3 w-3" />;
      default:
        return <Calendar className="h-3 w-3" />;
    }
  };

  const getEventColor = (type: string, importance: string) => {
    const base = {
      earnings: 'blue',
      dividend: 'green',
      economic: 'red',
      ipo: 'purple'
    }[type] || 'gray';

    const intensity = importance === 'high' ? '600' : 
                     importance === 'medium' ? '500' : '400';

    return `text-${base}-${intensity} bg-${base}-50 border-${base}-200`;
  };

  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200/50 overflow-hidden ${className}`}>
      <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 border-b border-gray-200/50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 text-orange-600 mr-2" />
              Financial Calendar
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Upcoming earnings, dividends, and economic events
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentWeek(currentWeek - 1)}
              className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <Link 
              to="/tools"
              className="px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700 transition-colors"
            >
              Full Calendar
            </Link>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((date, index) => {
            const dayEvents = getEventsForDate(date);
            const isToday = date.toDateString() === today.toDateString();
            
            return (
              <div key={index} className={`min-h-[80px] p-2 border rounded-lg ${
                isToday ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className={`text-sm font-medium mb-2 ${
                  isToday ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {date.getDate()}
                </div>
                
                <div className="space-y-1">
                  {dayEvents.slice(0, 2).map(event => (
                    <div
                      key={event.id}
                      className={`text-xs p-1 rounded border flex items-center space-x-1 ${
                        getEventColor(event.type, event.importance)
                      }`}
                      title={`${event.title}${event.company ? ` - ${event.company}` : ''}${
                        event.amount ? ` ($${event.amount})` : ''
                      }`}
                    >
                      {getEventIcon(event.type)}
                      <span className="truncate">
                        {event.company || event.title}
                      </span>
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayEvents.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* This week's highlights */}
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border border-orange-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <Clock className="h-4 w-4 text-orange-600 mr-2" />
            This Week's Highlights
          </h3>
          <div className="space-y-2">
            {events.filter(event => event.importance === 'high').slice(0, 2).map(event => (
              <div key={event.id} className="flex items-center justify-between text-sm">
                <span className="text-gray-700">
                  {event.title} {event.company && `(${event.company})`}
                </span>
                <span className="text-gray-500">
                  {event.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialCalendar;
