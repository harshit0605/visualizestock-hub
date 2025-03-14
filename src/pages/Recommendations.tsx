
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { 
  CheckCircle2, 
  CircleDollarSign, 
  Clock, 
  Filter, 
  Search, 
  Star, 
  TrendingDown, 
  TrendingUp,
  XCircle
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

// Mock data for recommendations
const allRecommendations = [
  { 
    id: 1, 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    price: 184.32, 
    target: 210.00,
    potential: 14.2,
    confidence: 96,
    recommendation: 'buy', 
    reason: 'Strong earnings growth, new product cycle, services expansion, and AI integration potential. The company maintains a strong balance sheet and continues to return value to shareholders.', 
    date: '2023-05-15',
    performance: 12.5,
    status: 'active'
  },
  { 
    id: 2, 
    symbol: 'MSFT', 
    name: 'Microsoft Corp.', 
    price: 410.59, 
    target: 450.00,
    potential: 9.6,
    confidence: 92,
    recommendation: 'buy', 
    reason: 'AI integration across product suite, strong cloud growth with Azure, and enterprise software dominance. The company is well-positioned for the digital transformation trend.', 
    date: '2023-04-22',
    performance: 15.3,
    status: 'active'
  },
  { 
    id: 3, 
    symbol: 'META', 
    name: 'Meta Platforms', 
    price: 496.14, 
    target: 525.00,
    potential: 5.8,
    confidence: 88,
    recommendation: 'buy', 
    reason: 'Ad revenue growth recovery, effective cost control measures, and potential for metaverse monetization. The company has successfully navigated regulatory challenges.', 
    date: '2023-06-03',
    performance: 8.2,
    status: 'active'
  },
  { 
    id: 4, 
    symbol: 'NFLX', 
    name: 'Netflix Inc.', 
    price: 628.95, 
    target: 650.00,
    potential: 3.3,
    confidence: 72,
    recommendation: 'hold', 
    reason: 'Subscriber growth has improved, but increasing competition in the streaming space remains a concern. The ad-supported tier shows promise but needs time to scale.', 
    date: '2023-05-18',
    performance: 2.5,
    status: 'active'
  },
  { 
    id: 5, 
    symbol: 'INTC', 
    name: 'Intel Corp.', 
    price: 31.45, 
    target: 28.00,
    potential: -11.0,
    confidence: 64,
    recommendation: 'sell', 
    reason: 'Continued market share loss to AMD, production delays for next-gen chips, and capex pressure. The turnaround strategy will take time to show meaningful results.', 
    date: '2023-04-30',
    performance: -8.4,
    status: 'active'
  },
  { 
    id: 6, 
    symbol: 'NVDA', 
    name: 'NVIDIA Corp.', 
    price: 850.32, 
    target: 900.00,
    potential: 5.8,
    confidence: 90,
    recommendation: 'buy', 
    reason: 'AI chip dominance, data center growth, and expanding TAM. The company is the clear leader in GPU technology for AI applications with limited competition.', 
    date: '2023-03-15',
    performance: 75.3,
    status: 'completed'
  },
  { 
    id: 7, 
    symbol: 'AMD', 
    name: 'Advanced Micro Devices', 
    price: 156.90, 
    target: 180.00,
    potential: 14.7,
    confidence: 85,
    recommendation: 'buy', 
    reason: 'Continued market share gains in CPU and data center, strong execution, and product roadmap. The MI300 AI accelerator shows promising adoption.', 
    date: '2023-05-20',
    performance: 18.6,
    status: 'active'
  },
  { 
    id: 8, 
    symbol: 'TSLA', 
    name: 'Tesla Inc.', 
    price: 177.75, 
    target: 160.00,
    potential: -10.0,
    confidence: 60,
    recommendation: 'sell', 
    reason: 'Margin pressure due to price cuts, increasing EV competition, and slower growth. Autonomy and AI remain promising but face regulatory and technical hurdles.', 
    date: '2023-06-10',
    performance: -15.2,
    status: 'active'
  },
];

const Recommendations = () => {
  const activeRecs = allRecommendations.filter(rec => rec.status === 'active');
  const completedRecs = allRecommendations.filter(rec => rec.status === 'completed');
  
  const renderRecommendationCard = (rec: typeof allRecommendations[0]) => (
    <Card 
      key={rec.id} 
      className={cn(
        "animate-scale-in overflow-hidden transition-all duration-200 hover:shadow-md",
        rec.recommendation === 'buy' ? "border-l-success" :
        rec.recommendation === 'sell' ? "border-l-danger" :
        "border-l-warning",
        "border-l-4"
      )}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-semibold">{rec.symbol}</h3>
              <Badge className={cn(
                "capitalize",
                rec.recommendation === 'buy' ? "bg-success/10 text-success hover:bg-success/20" :
                rec.recommendation === 'sell' ? "bg-danger/10 text-danger hover:bg-danger/20" :
                "bg-warning/10 text-warning hover:bg-warning/20"
              )}>
                {rec.recommendation}
              </Badge>
            </div>
            <p className="text-muted-foreground">{rec.name}</p>
          </div>
          
          <div className="text-right">
            <div className="flex items-center justify-end gap-2 mb-1">
              <span className="text-sm text-muted-foreground">Confidence</span>
              <Badge variant="outline" className={cn(
                rec.confidence > 85 ? "text-success" :
                rec.confidence > 70 ? "text-warning" :
                "text-danger"
              )}>
                {rec.confidence}%
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{formatDate(rec.date)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-1">Current Price</p>
            <p className="text-xl font-semibold">${rec.price.toFixed(2)}</p>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-1">Target Price</p>
            <p className="text-xl font-semibold">${rec.target.toFixed(2)}</p>
          </div>
          
          <div className="bg-secondary/50 rounded-lg p-3">
            <p className="text-sm text-muted-foreground mb-1">Upside Potential</p>
            <p className={cn(
              "text-xl font-semibold",
              rec.potential > 0 ? "text-success" : "text-danger"
            )}>
              {rec.potential > 0 ? "+" : ""}{rec.potential.toFixed(1)}%
            </p>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-medium mb-2">Analysis Summary</h4>
          <p className="text-sm text-muted-foreground">{rec.reason}</p>
        </div>
        
        {rec.status === 'completed' && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Performance</h4>
            <div className="flex items-center gap-2">
              <Progress 
                value={Math.min(Math.max(rec.performance + 20, 0), 100)} 
                className={cn(
                  "h-2",
                  rec.performance > 0 ? "bg-success/20" : "bg-danger/20"
                )} 
              />
              <span className={cn(
                "font-medium",
                rec.performance > 0 ? "text-success" : "text-danger"
              )}>
                {rec.performance > 0 ? "+" : ""}{rec.performance.toFixed(1)}%
              </span>
            </div>
          </div>
        )}
        
        <div className="flex gap-2 mt-6">
          <Button size="sm" className="w-full">View Details</Button>
          <Button size="sm" variant="outline" className="w-full">
            {rec.status === 'active' ? (
              <>
                <Star className="mr-1 h-4 w-4" />
                Add to Watchlist
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-1 h-4 w-4" />
                Completed
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="ml-[224px] pt-16 pb-16 p-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search recommendations..."
                  className="w-full pl-8 focus-visible:ring-primary"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-success/10 shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-success/20 text-success rounded-full p-3">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-success-foreground">Buy Recommendations</p>
                    <p className="text-2xl font-semibold">{activeRecs.filter(r => r.recommendation === 'buy').length}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-warning/10 shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-warning/20 text-warning rounded-full p-3">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-warning-foreground">Hold Recommendations</p>
                    <p className="text-2xl font-semibold">{activeRecs.filter(r => r.recommendation === 'hold').length}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-danger/10 shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-danger/20 text-danger rounded-full p-3">
                    <TrendingDown className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-danger-foreground">Sell Recommendations</p>
                    <p className="text-2xl font-semibold">{activeRecs.filter(r => r.recommendation === 'sell').length}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-accent shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="bg-primary/20 text-primary rounded-full p-3">
                    <CircleDollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Potential Return</p>
                    <p className="text-2xl font-semibold">
                      {(activeRecs.reduce((sum, rec) => sum + rec.potential, 0) / activeRecs.length).toFixed(1)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="active" className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" /> Active
              </TabsTrigger>
              <TabsTrigger value="completed" className="flex items-center gap-2">
                <XCircle className="h-4 w-4" /> Completed
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeRecs.map(renderRecommendationCard)}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {completedRecs.map(renderRecommendationCard)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Recommendations;
