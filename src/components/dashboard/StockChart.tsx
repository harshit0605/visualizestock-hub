
import React from 'react';
import { 
  AreaChart, 
  Area, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

// Mock data for the stock
const priceData = [
  { date: 'Jan 01', price: 150.25, volume: 32500000 },
  { date: 'Jan 02', price: 152.50, volume: 28700000 },
  { date: 'Jan 03', price: 151.75, volume: 30100000 },
  { date: 'Jan 04', price: 154.30, volume: 35600000 },
  { date: 'Jan 05', price: 153.80, volume: 29200000 },
  { date: 'Jan 06', price: 156.20, volume: 40500000 },
  { date: 'Jan 07', price: 158.45, volume: 38900000 },
  { date: 'Jan 08', price: 160.75, volume: 42300000 },
  { date: 'Jan 09', price: 159.90, volume: 33600000 },
  { date: 'Jan 10', price: 162.30, volume: 36700000 },
  { date: 'Jan 11', price: 163.45, volume: 39100000 },
  { date: 'Jan 12', price: 165.20, volume: 45200000 },
  { date: 'Jan 13', price: 167.80, volume: 41800000 },
  { date: 'Jan 14', price: 166.95, volume: 34500000 },
];

interface StockChartProps {
  symbol?: string;
  name?: string;
  price?: number;
  change?: number;
}

const StockChart = ({
  symbol = 'AAPL',
  name = 'Apple Inc.',
  price = 184.32,
  change = 2.13
}: StockChartProps) => {
  return (
    <Card className="animate-fade-in stagger-1 shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <CardTitle>{symbol}</CardTitle>
              <span className="text-muted-foreground">{name}</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="text-2xl font-semibold mr-2">${price.toFixed(2)}</span>
              <span className={`text-sm font-medium ${change >= 0 ? 'text-success' : 'text-danger'}`}>
                {change >= 0 ? '+' : ''}{change.toFixed(2)}%
              </span>
            </div>
          </div>
          
          <Button variant="outline" className="flex items-center gap-1">
            Time Period <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="price" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="price">Price</TabsTrigger>
            <TabsTrigger value="volume">Volume</TabsTrigger>
          </TabsList>
          
          <TabsContent value="price" className="m-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={priceData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12 }}
                    domain={['dataMin - 5', 'dataMax + 5']}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      padding: '8px 12px',
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="price"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorPrice)"
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="volume" className="m-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={priceData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value / 1000000}M`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      padding: '8px 12px',
                    }}
                    formatter={(value: number) => [`${(value / 1000000).toFixed(2)}M`, 'Volume']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Bar 
                    dataKey="volume" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]} 
                    barSize={16}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default StockChart;
