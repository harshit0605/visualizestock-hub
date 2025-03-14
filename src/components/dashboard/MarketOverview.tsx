import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const data = [
  { name: 'Jan', value: 14000 },
  { name: 'Feb', value: 14500 },
  { name: 'Mar', value: 15200 },
  { name: 'Apr', value: 14800 },
  { name: 'May', value: 15500 },
  { name: 'Jun', value: 16200 },
  { name: 'Jul', value: 16800 },
  { name: 'Aug', value: 17300 },
  { name: 'Sep', value: 16700 },
  { name: 'Oct', value: 17100 },
  { name: 'Nov', value: 16400 },
  { name: 'Dec', value: 16750 },
];

const marketIndices = [
  { name: 'NASDAQ', value: 16750.22, change: 1.78 },
  { name: 'S&P 500', value: 5200.45, change: 0.65 },
  { name: 'DOW', value: 39450.78, change: 0.32 },
  { name: 'Russell', value: 2150.33, change: -0.45 },
];

const MarketOverview = () => {
  return (
    <Card className="animate-fade-in shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle>Market Overview</CardTitle>
        <CardDescription>Market performance and key indices</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="1D" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="1D">1D</TabsTrigger>
              <TabsTrigger value="1W">1W</TabsTrigger>
              <TabsTrigger value="1M">1M</TabsTrigger>
              <TabsTrigger value="1Y">1Y</TabsTrigger>
              <TabsTrigger value="ALL">ALL</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-6">
              {marketIndices.map((index) => (
                <div key={index.name} className="text-sm">
                  <span className="text-muted-foreground mr-2">{index.name}</span>
                  <span className="font-medium">{index.value.toLocaleString()}</span>
                  <span className={`ml-1 text-xs ${index.change >= 0 ? 'text-success' : 'text-danger'}`}>
                    {index.change >= 0 ? '+' : ''}{index.change}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <TabsContent value="1D" className="m-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12 }}
                    domain={['dataMin - 500', 'dataMax + 500']}
                    tickFormatter={(value) => `${value}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '8px', 
                      border: 'none', 
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      padding: '8px 12px',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          {/* Other tab contents would be similar but with different data */}
          <TabsContent value="1W" className="m-0">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              1 Week data visualization
            </div>
          </TabsContent>
          <TabsContent value="1M" className="m-0">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              1 Month data visualization
            </div>
          </TabsContent>
          <TabsContent value="1Y" className="m-0">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              1 Year data visualization
            </div>
          </TabsContent>
          <TabsContent value="ALL" className="m-0">
            <div className="h-[300px] flex items-center justify-center text-muted-foreground">
              All Time data visualization
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MarketOverview;
