
import React from 'react';
import { ArrowDown, ArrowUp, MoreHorizontal } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  sparklineData?: number[];
  recommendation?: 'buy' | 'sell' | 'hold';
}

const StockCard = ({
  symbol,
  name,
  price,
  changePercent,
  sparklineData = [],
  recommendation
}: StockCardProps) => {
  const isPositive = changePercent > 0;
  
  // Function to get recommendation styles and text
  const getRecommendation = () => {
    if (!recommendation) return null;
    
    const getColor = () => {
      switch (recommendation) {
        case 'buy': return 'bg-success/10 text-success';
        case 'sell': return 'bg-danger/10 text-danger';
        case 'hold': return 'bg-warning/10 text-warning';
        default: return '';
      }
    };
    
    return (
      <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getColor())}>
        {recommendation.toUpperCase()}
      </span>
    );
  };
  
  // Create a mini sparkline from the data
  const renderSparkline = () => {
    if (!sparklineData.length) return null;
    
    const min = Math.min(...sparklineData);
    const max = Math.max(...sparklineData);
    const range = max - min;
    
    const points = sparklineData.map((value, index) => {
      const x = (index / (sparklineData.length - 1)) * 100;
      const y = 100 - ((value - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <div className="h-12 w-24">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points={points}
            fill="none"
            stroke={isPositive ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'}
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-md animate-scale-in">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{symbol}</span>
              {getRecommendation()}
            </div>
            <p className="text-sm text-muted-foreground">{name}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-8 w-8 rounded-full p-0 hover:bg-muted">
                <MoreHorizontal className="h-4 w-4 mx-auto" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Add to Watchlist</DropdownMenuItem>
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Set Alert</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-2xl font-semibold">${price.toFixed(2)}</p>
            <div className={cn(
              "flex items-center text-sm",
              isPositive ? "text-success" : "text-danger"
            )}>
              {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              <span>{Math.abs(changePercent).toFixed(2)}%</span>
            </div>
          </div>
          {renderSparkline()}
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCard;
