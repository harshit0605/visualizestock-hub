
import React from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  BarChart4, 
  Eye, 
  TrendingDown, 
  TrendingUp 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// Mock data for recommendations
const recommendations = [
  { 
    id: 1, 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    price: 184.32, 
    change: 2.13, 
    confidence: 96,
    recommendation: 'buy', 
    reason: 'Strong earnings, new product cycle' 
  },
  { 
    id: 2, 
    symbol: 'MSFT', 
    name: 'Microsoft Corp.', 
    price: 410.59, 
    change: 1.04, 
    confidence: 92,
    recommendation: 'buy', 
    reason: 'AI integration, cloud growth' 
  },
  { 
    id: 3, 
    symbol: 'META', 
    name: 'Meta Platforms', 
    price: 496.14, 
    change: 0.87, 
    confidence: 88,
    recommendation: 'buy', 
    reason: 'Ad revenue growth, metaverse potential' 
  },
  { 
    id: 4, 
    symbol: 'NFLX', 
    name: 'Netflix Inc.', 
    price: 628.95, 
    change: -1.24, 
    confidence: 72,
    recommendation: 'hold', 
    reason: 'Subscriber growth, competition concerns' 
  },
  { 
    id: 5, 
    symbol: 'INTC', 
    name: 'Intel Corp.', 
    price: 31.45, 
    change: -2.36, 
    confidence: 64,
    recommendation: 'sell', 
    reason: 'Market share loss, production delays' 
  },
];

const RecommendationsList = () => {
  return (
    <Card className="animate-fade-in stagger-2 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Today's Recommendations</CardTitle>
            <CardDescription>AI-powered stock recommendations</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-secondary/40"
            >
              <div className="flex items-center space-x-4">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full",
                  item.recommendation === 'buy' ? "bg-success/10 text-success" :
                  item.recommendation === 'sell' ? "bg-danger/10 text-danger" :
                  "bg-warning/10 text-warning"
                )}>
                  {item.recommendation === 'buy' ? (
                    <TrendingUp className="h-5 w-5" />
                  ) : item.recommendation === 'sell' ? (
                    <TrendingDown className="h-5 w-5" />
                  ) : (
                    <BarChart4 className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.symbol}</span>
                    <Badge variant="outline" className="capitalize">
                      {item.recommendation}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.name}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-medium">${item.price.toFixed(2)}</p>
                  <div className={`flex items-center justify-end text-sm ${item.change >= 0 ? 'text-success' : 'text-danger'}`}>
                    {item.change >= 0 ? (
                      <ArrowUp className="mr-1 h-3 w-3" />
                    ) : (
                      <ArrowDown className="mr-1 h-3 w-3" />
                    )}
                    {Math.abs(item.change).toFixed(2)}%
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium">Confidence</div>
                  <div className="flex items-center justify-end">
                    <span 
                      className={cn(
                        "text-sm font-medium",
                        item.confidence > 85 ? "text-success" :
                        item.confidence > 70 ? "text-warning" :
                        "text-danger"
                      )}
                    >
                      {item.confidence}%
                    </span>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon" className="ml-2">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsList;
