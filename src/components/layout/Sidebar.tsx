
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  ChevronLeft, 
  ChevronRight, 
  CircleDollarSign, 
  Home, 
  LineChart, 
  ListChecks,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: BarChart3, label: 'Stocks', href: '/stocks' },
    { icon: ListChecks, label: 'Recommendations', href: '/recommendations' },
    { icon: Star, label: 'Watchlist', href: '/watchlist' },
  ];

  return (
    <aside 
      className={cn(
        "bg-sidebar fixed left-0 top-0 bottom-0 z-20 flex flex-col border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-56"
      )}
    >
      <div className={cn(
        "flex h-16 items-center border-b border-sidebar-border px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2">
            <CircleDollarSign className="h-6 w-6 text-primary" />
            <span className="font-semibold text-sidebar-foreground">VisualStock</span>
          </Link>
        )}
        
        {collapsed && (
          <CircleDollarSign className="h-6 w-6 text-primary" />
        )}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed ? "absolute -right-4 top-5 h-8 w-8 rounded-full border border-sidebar-border bg-sidebar text-sidebar-foreground" : ""
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <nav className="grid gap-1 px-2">
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => (
              <Tooltip key={item.href} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.href}
                    className={cn(
                      "group flex h-10 items-center rounded-md px-3 text-sidebar-foreground transition-colors hover:bg-sidebar-accent",
                      location.pathname === item.href && "bg-sidebar-accent font-medium",
                      collapsed ? "justify-center" : ""
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", 
                      location.pathname === item.href ? "text-primary" : "text-sidebar-foreground"
                    )} />
                    {!collapsed && (
                      <span className="ml-3">{item.label}</span>
                    )}
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </div>

      <div className="mt-auto border-t border-sidebar-border p-4">
        <div 
          className={cn(
            "flex items-center rounded-md bg-sidebar-accent p-2",
            collapsed ? "justify-center" : "space-x-3"
          )}
        >
          <LineChart className="h-5 w-5 text-blue-400" />
          {!collapsed && (
            <div className="space-y-1">
              <p className="text-xs text-sidebar-foreground">NASDAQ</p>
              <div className="flex items-center">
                <p className="text-sm font-medium text-sidebar-foreground">16,750.22</p>
                <span className="ml-2 text-xs font-medium text-green-400">+1.78%</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
