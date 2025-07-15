import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  DollarSign,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  Activity,
  Crown,
  Star,
  Zap,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Equal
} from "lucide-react";

interface AnalyticsData {
  period: string;
  totalEarnings: number;
  referrals: number;
  conversionRate: number;
  growth: number;
}

const performanceData: AnalyticsData[] = [
  { period: 'This Week', totalEarnings: 450, referrals: 3, conversionRate: 12.5, growth: 15.3 },
  { period: 'This Month', totalEarnings: 1250, referrals: 8, conversionRate: 10.2, growth: 8.7 },
  { period: 'Last Month', totalEarnings: 980, referrals: 6, conversionRate: 8.9, growth: -5.2 },
  { period: 'All Time', totalEarnings: 4250, referrals: 25, conversionRate: 9.1, growth: 0 }
];

const monthlyData = [
  { month: 'Jan', earnings: 1200, referrals: 8, level1: 5, level2: 2, level3: 1 },
  { month: 'Feb', earnings: 980, referrals: 6, level1: 4, level2: 1, level3: 1 },
  { month: 'Mar', earnings: 1450, referrals: 9, level1: 6, level2: 2, level3: 1 },
  { month: 'Apr', earnings: 1100, referrals: 7, level1: 4, level2: 2, level3: 1 },
  { month: 'May', earnings: 1650, referrals: 11, level1: 7, level2: 3, level3: 1 },
  { month: 'Jun', earnings: 2100, referrals: 14, level1: 8, level2: 4, level3: 2 }
];

const topPerformers = [
  { name: 'Alex Johnson', earnings: 1250, referrals: 8, level: 1, growth: 25.5 },
  { name: 'Sarah Wilson', earnings: 980, referrals: 6, level: 1, growth: 18.2 },
  { name: 'Emily Davis', earnings: 750, referrals: 5, level: 1, growth: 12.8 },
  { name: 'Priya Sharma', earnings: 650, referrals: 4, level: 2, growth: 8.9 },
  { name: 'David Brown', earnings: 520, referrals: 3, level: 2, growth: 5.3 }
];

const TrendIndicator = ({ value, className = "" }: { value: number; className?: string }) => {
  if (value > 0) {
    return (
      <div className={`flex items-center gap-1 text-accent ${className}`}>
        <ArrowUpRight className="h-3 w-3" />
        <span className="text-xs font-medium">+{value.toFixed(1)}%</span>
      </div>
    );
  } else if (value < 0) {
    return (
      <div className={`flex items-center gap-1 text-destructive ${className}`}>
        <ArrowDownRight className="h-3 w-3" />
        <span className="text-xs font-medium">{value.toFixed(1)}%</span>
      </div>
    );
  } else {
    return (
      <div className={`flex items-center gap-1 text-muted-foreground ${className}`}>
        <Equal className="h-3 w-3" />
        <span className="text-xs font-medium">0%</span>
      </div>
    );
  }
};

const MetricCard = ({ 
  title, 
  value, 
  growth, 
  icon: Icon, 
  gradient,
  suffix = ""
}: { 
  title: string; 
  value: string | number; 
  growth: number; 
  icon: any; 
  gradient: string;
  suffix?: string;
}) => (
  <Card className="shadow-card hover:shadow-lg transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${gradient}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <TrendIndicator value={growth} />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">
          {typeof value === 'number' ? value.toLocaleString() : value}{suffix}
        </p>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </CardContent>
  </Card>
);

export const MGMAnalytics = () => {
  const currentData = performanceData[0]; // This Week
  const previousData = performanceData[1]; // This Month

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Overview Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Earnings"
          value={currentData.totalEarnings}
          growth={currentData.growth}
          icon={DollarSign}
          gradient="bg-gradient-primary"
          suffix=" pts"
        />
        <MetricCard
          title="New Referrals"
          value={currentData.referrals}
          growth={((currentData.referrals - previousData.referrals) / previousData.referrals) * 100}
          icon={Users}
          gradient="bg-gradient-success"
        />
        <MetricCard
          title="Conversion Rate"
          value={currentData.conversionRate}
          growth={currentData.conversionRate - previousData.conversionRate}
          icon={Target}
          gradient="bg-gradient-gold"
          suffix="%"
        />
        <MetricCard
          title="Growth Rate"
          value={Math.abs(currentData.growth)}
          growth={currentData.growth}
          icon={TrendingUp}
          gradient="bg-gradient-primary"
          suffix="%"
        />
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Trends
          </TabsTrigger>
          <TabsTrigger value="network" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Network
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          {/* Performance Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceData.map((period, index) => (
                  <div key={period.period} className="flex items-center justify-between p-4 rounded-lg bg-gradient-subtle">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${
                        index === 0 ? 'bg-primary' : 
                        index === 1 ? 'bg-accent' : 
                        index === 2 ? 'bg-warning' : 'bg-muted-foreground'
                      }`} />
                      <div>
                        <p className="font-medium text-foreground">{period.period}</p>
                        <p className="text-sm text-muted-foreground">
                          {period.referrals} referrals • {period.conversionRate}% conversion
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">{period.totalEarnings} pts</p>
                      <TrendIndicator value={period.growth} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-accent" />
                  Referral Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Crown className="h-4 w-4 text-gold" />
                      <span className="text-sm font-medium">Level 1 Direct</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={70} className="w-20 h-2" />
                      <span className="text-sm font-bold text-gold">70%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">Level 2 Indirect</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={20} className="w-20 h-2" />
                      <span className="text-sm font-bold text-primary">20%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-accent" />
                      <span className="text-sm font-medium">Level 3 Sub-indirect</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={10} className="w-20 h-2" />
                      <span className="text-sm font-bold text-accent">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Monthly Trends
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Track your referral performance over the last 6 months
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((month, index) => (
                  <div key={month.month} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-subtle">
                    <div className="min-w-12 text-center">
                      <p className="font-semibold text-foreground">{month.month}</p>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Earnings</span>
                        <span className="font-semibold text-foreground">{month.earnings} pts</span>
                      </div>
                      <Progress 
                        value={(month.earnings / Math.max(...monthlyData.map(m => m.earnings))) * 100} 
                        className="h-2" 
                      />
                    </div>
                    
                    <div className="min-w-16 text-right">
                      <p className="text-sm font-semibold text-foreground">{month.referrals}</p>
                      <p className="text-xs text-muted-foreground">referrals</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Top Performers
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Your highest earning referrals this month
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPerformers.map((performer, index) => (
                  <div key={performer.name} className="flex items-center gap-4 p-4 rounded-lg bg-gradient-subtle hover:shadow-card transition-all duration-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{performer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Level {performer.level} • {performer.referrals} referrals
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex-1" />
                    
                    <div className="text-right">
                      <p className="font-semibold text-foreground">{performer.earnings} pts</p>
                      <TrendIndicator value={performer.growth} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Items */}
      <Card className="shadow-card bg-gradient-glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-gold" />
            Action Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gradient-subtle">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-primary" />
                <h4 className="font-semibold text-foreground">Boost Conversion</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Your conversion rate is 2.3% below average. Consider sharing more engaging content.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                View Tips
              </Button>
            </div>
            
            <div className="p-4 rounded-lg bg-gradient-subtle">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-accent" />
                <h4 className="font-semibold text-foreground">Expand Network</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Focus on Level 2 referrals to maximize your earning potential.
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Learn More
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};