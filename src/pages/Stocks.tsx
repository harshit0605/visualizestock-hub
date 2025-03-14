
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import StockChart from '@/components/dashboard/StockChart';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ArrowDown, ArrowUp, Check, Eye, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for sector performance
const sectorData = [
  { name: 'Technology', performance: 2.4 },
  { name: 'Healthcare', performance: 1.2 },
  { name: 'Financials', performance: 0.5 },
  { name: 'Energy', performance: -1.3 },
  { name: 'Materials', performance: -0.8 },
  { name: 'Consumer', performance: 0.9 },
  { name: 'Utilities', performance: 0.2 },
  { name: 'Real Estate', performance: -0.6 },
];

// Mock data for stocks table
const stocksTableData = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 184.32, change: 2.13, volume: '34.5M', sector: 'Technology', pe: 28.6, recommendation: 'buy' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', price: 410.59, change: 1.04, volume: '22.1M', sector: 'Technology', pe: 34.2, recommendation: 'buy' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.25, change: -0.64, volume: '41.3M', sector: 'Consumer', pe: 42.8, recommendation: 'hold' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 172.63, change: 0.87, volume: '18.9M', sector: 'Technology', pe: 23.5, recommendation: 'buy' },
  { symbol: 'META', name: 'Meta Platforms', price: 496.14, change: 0.87, volume: '15.7M', sector: 'Technology', pe: 29.8, recommendation: 'buy' },
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 628.95, change: -1.24, volume: '8.3M', sector: 'Consumer', pe: 46.2, recommendation: 'hold' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 177.75, change: -2.31, volume: '92.1M', sector: 'Consumer', pe: 47.5, recommendation: 'hold' },
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 147.89, change: 0.34, volume: '6.8M', sector: 'Healthcare', pe: 18.3, recommendation: 'hold' },
  { symbol: 'JPM', name: 'JPMorgan Chase', price: 198.45, change: 1.12, volume: '10.2M', sector: 'Financials', pe: 12.4, recommendation: 'buy' },
  { symbol: 'V', name: 'Visa Inc.', price: 275.36, change: 0.75, volume: '7.5M', sector: 'Financials', pe: 32.1, recommendation: 'buy' },
];

const Stocks = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="ml-[224px] pt-16 pb-16 p-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search stocks by name or symbol..."
                  className="w-full pl-8 focus-visible:ring-primary"
                />
              </div>
              <Button>Filter</Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <StockChart />
              </div>
              
              <Card className="animate-fade-in stagger-2">
                <CardHeader className="pb-2">
                  <CardTitle>Sector Performance</CardTitle>
                  <CardDescription>Daily change by sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sectorData}
                        layout="vertical"
                        margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <XAxis 
                          type="number" 
                          axisLine={false} 
                          tickLine={false}
                          domain={[-2, 3]}
                          tickFormatter={(value) => `${value}%`}
                        />
                        <YAxis 
                          dataKey="name" 
                          type="category" 
                          axisLine={false} 
                          tickLine={false} 
                          width={90}
                        />
                        <Tooltip 
                          formatter={(value: number) => [`${value}%`, 'Performance']}
                          cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                        />
                        <Bar 
                          dataKey="performance" 
                          fill={(data) => data.performance >= 0 ? '#22c55e' : '#ef4444'}
                          radius={[4, 4, 4, 4]}
                          barSize={16}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="animate-fade-in stagger-3 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle>Stocks Overview</CardTitle>
                <CardDescription>Market data for top stocks</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                      <TableHead className="text-right">Change</TableHead>
                      <TableHead className="text-right">Volume</TableHead>
                      <TableHead>Sector</TableHead>
                      <TableHead className="text-right">P/E</TableHead>
                      <TableHead>Recommendation</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stocksTableData.map((stock) => (
                      <TableRow key={stock.symbol} className="hover:bg-secondary/40">
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
                        <TableCell>{stock.sector}</TableCell>
                        <TableCell className="text-right">{stock.pe}</TableCell>
                        <TableCell>
                          <Badge className={cn(
                            "capitalize",
                            stock.recommendation === 'buy' ? "bg-success/10 text-success hover:bg-success/20" :
                            stock.recommendation === 'sell' ? "bg-danger/10 text-danger hover:bg-danger/20" :
                            "bg-warning/10 text-warning hover:bg-warning/20"
                          )}>
                            {stock.recommendation}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Stocks;
