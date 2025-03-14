
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { 
  ArrowDown, 
  ArrowUp, 
  AlertCircle, 
  BarChart4, 
  Bell, 
  Eye, 
  Filter, 
  Plus, 
  Search, 
  Trash2
} from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import StockChart from '@/components/dashboard/StockChart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

// Mock data for watchlist
const watchlistStocks = [
  { 
    id: 1, 
    symbol: 'AAPL', 
    name: 'Apple Inc.', 
    price: 184.32, 
    change: 2.13, 
    volume: '34.5M', 
    added: '2023-04-15', 
    alertPrice: 180.00,
    note: 'Watching for product announcements',
    priorityLevel: 'high'
  },
  { 
    id: 2, 
    symbol: 'MSFT', 
    name: 'Microsoft Corp.', 
    price: 410.59, 
    change: 1.04, 
    volume: '22.1M', 
    added: '2023-05-10', 
    alertPrice: 420.00,
    note: 'Earnings in two weeks',
    priorityLevel: 'medium'
  },
  { 
    id: 3, 
    symbol: 'AMZN', 
    name: 'Amazon.com Inc.', 
    price: 178.25, 
    change: -0.64, 
    volume: '41.3M', 
    added: '2023-03-22', 
    alertPrice: 170.00,
    note: 'AWS growth slowing?',
    priorityLevel: 'high'
  },
  { 
    id: 4, 
    symbol: 'GOOGL', 
    name: 'Alphabet Inc.', 
    price: 172.63, 
    change: 0.87, 
    volume: '18.9M', 
    added: '2023-06-05', 
    alertPrice: 165.00,
    note: 'AI integration progress',
    priorityLevel: 'medium'
  },
  { 
    id: 5, 
    symbol: 'TSLA', 
    name: 'Tesla Inc.', 
    price: 177.75, 
    change: -2.31, 
    volume: '92.1M', 
    added: '2023-05-18', 
    alertPrice: 185.00,
    note: 'Production numbers and margins',
    priorityLevel: 'low'
  },
];

const Watchlist = () => {
  const removeFromWatchlist = (id: number) => {
    toast({
      title: "Removed from watchlist",
      description: "Stock has been removed from your watchlist.",
    });
  };
  
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
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search watchlist..."
                  className="w-full pl-8 focus-visible:ring-primary"
                />
              </div>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
            
            <Button className="ml-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Stock
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <StockChart symbol="AAPL" name="Apple Inc." price={184.32} change={2.13} />
            </div>
            
            <Card className="animate-fade-in stagger-2 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Watchlist Summary</CardTitle>
                <CardDescription>Performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <div className="text-sm text-muted-foreground">Total Stocks</div>
                      <div className="text-2xl font-semibold mt-1">{watchlistStocks.length}</div>
                    </div>
                    
                    <div className="rounded-lg bg-secondary/50 p-4">
                      <div className="text-sm text-muted-foreground">Gainers/Losers</div>
                      <div className="text-2xl font-semibold mt-1">
                        {watchlistStocks.filter(s => s.change > 0).length}/
                        {watchlistStocks.filter(s => s.change < 0).length}
                      </div>
                    </div>
                  </div>
                  
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="text-sm text-muted-foreground mb-2">Priority Distribution</div>
                    <div className="flex gap-2 items-center">
                      <div className="h-4 bg-success rounded-full" style={{width: `${watchlistStocks.filter(s => s.priorityLevel === 'high').length / watchlistStocks.length * 100}%`}}></div>
                      <div className="h-4 bg-warning rounded-full" style={{width: `${watchlistStocks.filter(s => s.priorityLevel === 'medium').length / watchlistStocks.length * 100}%`}}></div>
                      <div className="h-4 bg-muted-foreground rounded-full" style={{width: `${watchlistStocks.filter(s => s.priorityLevel === 'low').length / watchlistStocks.length * 100}%`}}></div>
                    </div>
                    <div className="flex text-xs mt-2 text-muted-foreground justify-between">
                      <span>High: {watchlistStocks.filter(s => s.priorityLevel === 'high').length}</span>
                      <span>Medium: {watchlistStocks.filter(s => s.priorityLevel === 'medium').length}</span>
                      <span>Low: {watchlistStocks.filter(s => s.priorityLevel === 'low').length}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Active Price Alerts</h4>
                    {watchlistStocks.slice(0, 3).map((stock) => (
                      <div key={stock.id} className="flex items-center justify-between border-b pb-2">
                        <div className="flex items-center gap-2">
                          <Bell className="h-4 w-4 text-primary" />
                          <span className="font-medium">{stock.symbol}</span>
                        </div>
                        <div className="text-sm">
                          Alert at <span className="font-medium">${stock.alertPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="animate-fade-in stagger-3 shadow-sm">
            <CardHeader className="pb-2">
              <Tabs defaultValue="list" className="w-full">
                <div className="flex items-center justify-between">
                  <CardTitle>My Watchlist</CardTitle>
                  <TabsList>
                    <TabsTrigger value="list">
                      <BarChart4 className="h-4 w-4 mr-2" />
                      List
                    </TabsTrigger>
                    <TabsTrigger value="details">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Details
                    </TabsTrigger>
                  </TabsList>
                </div>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="w-full">
                <TabsContent value="list" className="m-0 pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Symbol</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Change</TableHead>
                        <TableHead className="text-right">Volume</TableHead>
                        <TableHead>Date Added</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {watchlistStocks.map((stock) => (
                        <TableRow key={stock.id} className="hover:bg-secondary/40">
                          <TableCell className="font-medium">{stock.symbol}</TableCell>
                          <TableCell>{stock.name}</TableCell>
                          <TableCell className="text-right">${stock.price.toFixed(2)}</TableCell>
                          <TableCell className="text-right">
                            <div className={`flex items-center justify-end ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                              {stock.change >= 0 ? (
                                <ArrowUp className="mr-1 h-3 w-3" />
                              ) : (
                                <ArrowDown className="mr-1 h-3 w-3" />
                              )}
                              {Math.abs(stock.change).toFixed(2)}%
                            </div>
                          </TableCell>
                          <TableCell className="text-right">{stock.volume}</TableCell>
                          <TableCell>{formatDate(stock.added)}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-danger hover:text-danger" onClick={() => removeFromWatchlist(stock.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                
                <TabsContent value="details" className="m-0 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {watchlistStocks.map((stock) => (
                      <Card key={stock.id} className="overflow-hidden border shadow-sm">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-xl font-semibold">{stock.symbol}</h3>
                                <Badge className={cn(
                                  "capitalize",
                                  stock.priorityLevel === 'high' ? "bg-success/10 text-success" :
                                  stock.priorityLevel === 'medium' ? "bg-warning/10 text-warning" :
                                  "bg-muted"
                                )}>
                                  {stock.priorityLevel}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{stock.name}</p>
                            </div>
                            
                            <div className="text-right">
                              <p className="text-xl font-semibold">${stock.price.toFixed(2)}</p>
                              <div className={`flex items-center justify-end text-sm ${stock.change >= 0 ? 'text-success' : 'text-danger'}`}>
                                {stock.change >= 0 ? (
                                  <ArrowUp className="mr-1 h-3 w-3" />
                                ) : (
                                  <ArrowDown className="mr-1 h-3 w-3" />
                                )}
                                {Math.abs(stock.change).toFixed(2)}%
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Date Added</p>
                              <p className="font-medium">{formatDate(stock.added)}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm text-muted-foreground">Alert Price</p>
                              <p className="font-medium">${stock.alertPrice.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <p className="text-sm text-muted-foreground">Notes</p>
                            <p className="bg-secondary/30 p-2 rounded text-sm mt-1">{stock.note}</p>
                          </div>
                          
                          <div className="flex gap-2 mt-4">
                            <Button size="sm" className="w-full">View Details</Button>
                            <Button size="sm" variant="outline" className="w-full">Edit Note</Button>
                            <Button 
                              size="sm" 
                              variant="destructive" 
                              className="w-full"
                              onClick={() => removeFromWatchlist(stock.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Watchlist;
