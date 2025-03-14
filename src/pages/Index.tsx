
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MarketOverview from '@/components/dashboard/MarketOverview';
import StockChart from '@/components/dashboard/StockChart';
import RecommendationsList from '@/components/dashboard/RecommendationsList';
import StockCard from '@/components/dashboard/StockCard';

const stocksData = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 184.32,
    changePercent: 2.13,
    sparklineData: [150, 155, 159, 156, 160, 165, 170, 172, 180, 178, 183, 184],
    recommendation: 'buy' as const,
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corp.',
    price: 410.59,
    changePercent: 1.04,
    sparklineData: [390, 395, 392, 398, 405, 400, 408, 412, 410, 409, 410],
    recommendation: 'buy' as const,
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 172.63,
    changePercent: 0.87,
    sparklineData: [160, 163, 165, 164, 166, 169, 170, 171, 173, 172],
    recommendation: 'hold' as const,
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    price: 178.25,
    changePercent: -0.64,
    sparklineData: [185, 183, 180, 182, 179, 178, 177, 175, 176, 178],
    recommendation: 'hold' as const,
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Sidebar />
      
      <main className="ml-[224px] pt-16 pb-16 p-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StockChart 
                symbol="AAPL" 
                name="Apple Inc." 
                price={184.32} 
                change={2.13} 
              />
              <MarketOverview />
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <RecommendationsList />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stocksData.map((stock, index) => (
                <div key={stock.symbol} className={`animate-fade-in stagger-${index + 1}`}>
                  <StockCard {...stock} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
