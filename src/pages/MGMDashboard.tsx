import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  TrendingUp, 
  Gift, 
  Share2, 
  Copy, 
  Crown, 
  Target,
  Wallet,
  ChevronRight,
  Star,
  Trophy,
  Zap,
  BarChart3,
  Sparkles,
  Network
} from "lucide-react";
import { ReferralNetwork } from "@/components/mgm/ReferralNetwork";
import { PointsHistory } from "@/components/mgm/PointsHistory";
import { ReferralLink } from "@/components/mgm/ReferralLink";
import { OnboardingFlow } from "@/components/mgm/OnboardingFlow";
import { RewardsClaimCenter } from "@/components/mgm/RewardsClaimCenter";
import { VisualNetworkTree } from "@/components/mgm/VisualNetworkTree";
import { MGMAnalytics } from "@/components/mgm/MGMAnalytics";
import { useToast } from "@/hooks/use-toast";

const MGMDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasClaimedToday, setHasClaimedToday] = useState(false);

  // Mock data - in real app, this would come from API
  const userData = {
    name: "John Doe",
    totalPoints: 2450,
    referralCode: "JOHN2024",
    totalReferrals: 12,
    level1Count: 5,
    level2Count: 4,
    level3Count: 3,
    monthlyEarnings: 850,
    rank: "Gold Member"
  };

  const recentActivity = [
    {
      id: 1,
      type: "referral",
      description: "Alex joined using your link",
      points: 100,
      timestamp: "2 hours ago",
      level: 1
    },
    {
      id: 2,
      type: "purchase",
      description: "Priya made a purchase",
      points: 50,
      timestamp: "1 day ago",
      level: 2
    },
    {
      id: 3,
      type: "purchase",
      description: "Kumar completed signup",
      points: 25,
      timestamp: "2 days ago",
      level: 3
    }
  ];

  const levelConfig = {
    level1: { percentage: 10, color: "text-gold" },
    level2: { percentage: 5, color: "text-primary" },
    level3: { percentage: 2.5, color: "text-accent" }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(`https://app.example.com/ref/${userData.referralCode}`);
    toast({
      title: "Copied!",
      description: "Referral link copied to clipboard",
    });
  };

  const handleClaimMonthlyBonus = () => {
    setHasClaimedToday(true);
    toast({
      title: "Bonus Claimed!",
      description: "Monthly bonus of 500 points added to your account",
    });
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join my referral network!',
          text: 'Join me and start earning rewards through our referral program!',
          url: `https://app.example.com/ref/${userData.referralCode}`,
        });
      } catch (err) {
        copyReferralLink();
      }
    } else {
      copyReferralLink();
    }
  };

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground flex items-center gap-3">
              <Crown className="h-8 w-8 text-gold" />
              MGM Dashboard
            </h1>
            <p className="text-muted-foreground mt-2 text-sm lg:text-base">
              Welcome back, {userData.name}! Track your referrals and earnings.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <Button 
              variant="outline" 
              onClick={() => setShowOnboarding(true)}
              className="flex-1 lg:flex-none"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Quick Tour
            </Button>
            <Button 
              onClick={shareNative}
              className="flex-1 lg:flex-none bg-gradient-primary"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share & Earn
            </Button>
            <Badge variant="secondary" className="bg-gradient-gold text-gold-foreground px-4 py-2 justify-center">
              <Trophy className="h-4 w-4 mr-1" />
              {userData.rank}
            </Badge>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-primary text-primary-foreground shadow-premium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm">Total Points</p>
                  <p className="text-2xl font-bold">{userData.totalPoints.toLocaleString()}</p>
                </div>
                <Wallet className="h-8 w-8 text-primary-foreground/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-success text-accent-foreground shadow-success">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-foreground/80 text-sm">Total Referrals</p>
                  <p className="text-2xl font-bold">{userData.totalReferrals}</p>
                </div>
                <Users className="h-8 w-8 text-accent-foreground/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-gold text-gold-foreground shadow-premium">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gold-foreground/80 text-sm">Monthly Earnings</p>
                  <p className="text-2xl font-bold">{userData.monthlyEarnings}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-gold-foreground/80" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Referral Rate</p>
                  <p className="text-2xl font-bold text-foreground">8.5%</p>
                </div>
                <Target className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Referral Levels Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-gold" />
              Referral Levels Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-gradient-subtle border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Level 1 (Direct)</span>
                  <Badge className="bg-gold text-gold-foreground">
                    {levelConfig.level1.percentage}%
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-gold">{userData.level1Count}</p>
                <p className="text-sm text-muted-foreground">referrals</p>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-subtle border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Level 2 (Indirect)</span>
                  <Badge variant="outline" className="text-primary border-primary">
                    {levelConfig.level2.percentage}%
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-primary">{userData.level2Count}</p>
                <p className="text-sm text-muted-foreground">referrals</p>
              </div>
              
              <div className="p-4 rounded-lg bg-gradient-subtle border">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Level 3 (Sub-indirect)</span>
                  <Badge variant="outline" className="text-accent border-accent">
                    {levelConfig.level3.percentage}%
                  </Badge>
                </div>
                <p className="text-2xl font-bold text-accent">{userData.level3Count}</p>
                <p className="text-sm text-muted-foreground">referrals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-7 h-auto p-1 min-w-fit">
              <TabsTrigger value="overview" className="text-xs lg:text-sm py-2 px-2 lg:px-3">
                <BarChart3 className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-xs lg:text-sm py-2 px-2 lg:px-3">
                <Sparkles className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="network" className="text-xs lg:text-sm py-2 px-2 lg:px-3">
                <Network className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Network</span>
              </TabsTrigger>
              <TabsTrigger value="visual-tree" className="text-xs lg:text-sm py-2 px-2 lg:px-3">
                <Users className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Tree</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="text-xs lg:text-sm py-2 px-2 lg:px-3">
                <TrendingUp className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="rewards" className="text-xs lg:text-sm py-2 px-2 lg:px-3">
                <Gift className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Rewards</span>
              </TabsTrigger>
              <TabsTrigger value="share" className="text-xs lg:text-sm py-2 px-2 lg:px-3">
                <Share2 className="h-4 w-4 mr-1 lg:mr-2" />
                <span className="hidden sm:inline">Share</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-gradient-subtle">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.level === 1 ? 'bg-gold' : 
                          activity.level === 2 ? 'bg-primary' : 'bg-accent'
                        }`} />
                        <div>
                          <p className="font-medium text-sm">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-accent border-accent">
                        +{activity.points}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Monthly Progress */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Monthly Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Points Goal</span>
                      <span className="text-sm text-muted-foreground">2,450 / 3,000</span>
                    </div>
                    <Progress value={81.7} className="h-3" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Referrals Goal</span>
                      <span className="text-sm text-muted-foreground">12 / 15</span>
                    </div>
                    <Progress value={80} className="h-3" />
                  </div>
                  <Button 
                    variant="premium" 
                    size="sm" 
                    className="w-full"
                    onClick={handleClaimMonthlyBonus}
                    disabled={hasClaimedToday}
                  >
                    <Gift className="h-4 w-4 mr-2" />
                    {hasClaimedToday ? 'Claimed Today' : 'Claim Monthly Bonus'}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <MGMAnalytics />
          </TabsContent>

          <TabsContent value="network">
            <ReferralNetwork />
          </TabsContent>

          <TabsContent value="visual-tree">
            <VisualNetworkTree />
          </TabsContent>

          <TabsContent value="history">
            <PointsHistory />
          </TabsContent>

          <TabsContent value="rewards">
            <RewardsClaimCenter />
          </TabsContent>

          <TabsContent value="share">
            <ReferralLink referralCode={userData.referralCode} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MGMDashboard;