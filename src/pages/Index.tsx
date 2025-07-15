import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Crown, 
  Users, 
  TrendingUp, 
  Gift, 
  ArrowRight,
  Star,
  Target,
  Zap,
  Shield,
  Wallet
} from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Users,
      title: "3-Level Referral System",
      description: "Build your network with direct, indirect, and sub-indirect referrals",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      title: "Dynamic Rewards",
      description: "Earn points on every purchase made by your referral network",
      color: "text-accent"
    },
    {
      icon: Gift,
      title: "Flexible Configuration",
      description: "Customize reward percentages for different levels and campaigns",
      color: "text-gold"
    },
    {
      icon: Shield,
      title: "Fraud Protection",
      description: "Built-in security measures to prevent abuse and ensure fair play",
      color: "text-primary"
    }
  ];

  const stats = [
    { label: "Active Users", value: "10K+", icon: Users },
    { label: "Total Rewards", value: "$2.5M", icon: Wallet },
    { label: "Success Rate", value: "98%", icon: Target },
    { label: "Avg. Earnings", value: "$450", icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary text-primary-foreground">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 text-sm">
              <Crown className="h-4 w-4 text-gold" />
              Premium Member Get Member Module
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Build Your
              <span className="block bg-gradient-gold bg-clip-text text-transparent">
                Referral Empire
              </span>
            </h1>
            
            <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
              A comprehensive 3-level referral system that rewards users for building networks. 
              Earn points automatically when your referrals make purchases or achieve milestones.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mgm-dashboard">
                <Button variant="gold" size="xl" className="shadow-premium">
                  <Zap className="h-5 w-5 mr-2" />
                  Try MGM Dashboard
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/admin-config">
                <Button variant="outline" size="xl" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
                  <Shield className="h-5 w-5 mr-2" />
                  Admin Configuration
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="shadow-card bg-card/95 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4">
            <Star className="h-4 w-4 mr-1" />
            Premium Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Everything You Need for Successful Referrals
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our MGM module provides all the tools and features needed to create, 
            manage, and scale a profitable referral program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="shadow-card hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-subtle ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gradient-subtle py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How the 3-Level System Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Simple, transparent, and rewarding for everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-gold-foreground">L1</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Level 1 - Direct</h3>
                <p className="text-muted-foreground mb-4">
                  Earn 10% when someone you directly refer makes a purchase
                </p>
                <Badge className="bg-gradient-gold text-gold-foreground">
                  10% Commission
                </Badge>
              </CardContent>
            </Card>

            <Card className="shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary-foreground">L2</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Level 2 - Indirect</h3>
                <p className="text-muted-foreground mb-4">
                  Earn 5% when your referrals refer others who make purchases
                </p>
                <Badge variant="outline" className="text-primary border-primary">
                  5% Commission
                </Badge>
              </CardContent>
            </Card>

            <Card className="shadow-card text-center">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-accent-foreground">L3</span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Level 3 - Sub-indirect</h3>
                <p className="text-muted-foreground mb-4">
                  Earn 2.5% from the third level of your referral network
                </p>
                <Badge variant="outline" className="text-accent border-accent">
                  2.5% Commission
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <Card className="shadow-premium bg-gradient-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <Crown className="h-16 w-16 text-gold mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already building their referral networks 
              and earning passive income through our MGM system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mgm-dashboard">
                <Button variant="gold" size="xl">
                  <Users className="h-5 w-5 mr-2" />
                  Start Building Network
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
                <Gift className="h-5 w-5 mr-2" />
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
