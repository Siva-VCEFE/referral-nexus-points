import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gift, 
  Wallet, 
  Crown, 
  TrendingUp,
  Star,
  Clock,
  CheckCircle,
  Lock,
  Zap,
  Target,
  Calendar,
  Trophy
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Reward {
  id: string;
  type: 'points' | 'cash' | 'bonus' | 'milestone';
  title: string;
  description: string;
  amount: number;
  currency: 'points' | 'usd';
  status: 'available' | 'pending' | 'claimed' | 'locked';
  expiresAt?: string;
  requirement?: string;
  icon: any;
  gradient: string;
}

const availableRewards: Reward[] = [
  {
    id: '1',
    type: 'points',
    title: 'Referral Bonus',
    description: 'Alex Johnson signup bonus',
    amount: 100,
    currency: 'points',
    status: 'available',
    icon: Gift,
    gradient: 'bg-gradient-primary'
  },
  {
    id: '2',
    type: 'cash',
    title: 'Monthly Earnings',
    description: 'December commission payout',
    amount: 125.50,
    currency: 'usd',
    status: 'available',
    icon: Wallet,
    gradient: 'bg-gradient-success'
  },
  {
    id: '3',
    type: 'bonus',
    title: 'Level Up Bonus',
    description: 'Reached Gold tier rewards',
    amount: 500,
    currency: 'points',
    status: 'available',
    icon: Crown,
    gradient: 'bg-gradient-gold'
  }
];

const pendingRewards: Reward[] = [
  {
    id: '4',
    type: 'points',
    title: 'Purchase Commission',
    description: 'Priya Sharma purchase (pending approval)',
    amount: 50,
    currency: 'points',
    status: 'pending',
    expiresAt: '2024-01-20',
    icon: Clock,
    gradient: 'bg-gradient-subtle'
  }
];

const milestoneRewards: Reward[] = [
  {
    id: '5',
    type: 'milestone',
    title: '10 Referrals Achievement',
    description: 'Unlock exclusive tier benefits',
    amount: 1000,
    currency: 'points',
    status: 'locked',
    requirement: '2 more referrals needed',
    icon: Target,
    gradient: 'bg-gradient-primary'
  },
  {
    id: '6',
    type: 'milestone',
    title: 'Network Builder',
    description: 'Build a network of 25 active members',
    amount: 2500,
    currency: 'points',
    status: 'locked',
    requirement: '13 more active members needed',
    icon: Trophy,
    gradient: 'bg-gradient-gold'
  }
];

const RewardCard = ({ reward, onClaim }: { reward: Reward; onClaim: (id: string) => void }) => {
  const Icon = reward.icon;
  const isClaimable = reward.status === 'available';
  const isPending = reward.status === 'pending';
  const isLocked = reward.status === 'locked';

  return (
    <Card className={`shadow-card hover:shadow-lg transition-all duration-300 ${
      isClaimable ? 'border-accent/50' : ''
    }`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-full ${reward.gradient} ${
              isLocked ? 'opacity-50' : ''
            }`}>
              {isLocked ? (
                <Lock className="h-6 w-6 text-white" />
              ) : (
                <Icon className="h-6 w-6 text-white" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{reward.title}</h3>
              <p className="text-sm text-muted-foreground">{reward.description}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {reward.currency === 'usd' ? '$' : ''}
              {reward.amount.toLocaleString()}
              {reward.currency === 'points' ? ' pts' : ''}
            </p>
            {reward.expiresAt && (
              <p className="text-xs text-warning">
                Expires {new Date(reward.expiresAt).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>

        {reward.requirement && (
          <div className="mb-4 p-3 bg-gradient-subtle rounded-lg">
            <p className="text-sm text-muted-foreground">
              <Target className="h-4 w-4 inline mr-1" />
              {reward.requirement}
            </p>
          </div>
        )}

        <div className="flex gap-2">
          {isClaimable && (
            <Button 
              onClick={() => onClaim(reward.id)}
              className="flex-1 bg-gradient-primary"
            >
              <Zap className="h-4 w-4 mr-2" />
              Claim Now
            </Button>
          )}
          
          {isPending && (
            <Button variant="outline" className="flex-1" disabled>
              <Clock className="h-4 w-4 mr-2" />
              Processing
            </Button>
          )}
          
          {isLocked && (
            <Button variant="outline" className="flex-1" disabled>
              <Lock className="h-4 w-4 mr-2" />
              Locked
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export const RewardsClaimCenter = () => {
  const { toast } = useToast();
  const [claimedRewards, setClaimedRewards] = useState<Set<string>>(new Set());

  const handleClaim = (rewardId: string) => {
    setClaimedRewards(prev => new Set([...prev, rewardId]));
    toast({
      title: "Reward Claimed!",
      description: "Your reward has been added to your account",
    });
  };

  const totalAvailable = availableRewards
    .filter(r => !claimedRewards.has(r.id))
    .reduce((sum, r) => sum + (r.currency === 'points' ? r.amount : r.amount * 10), 0);

  const totalPending = pendingRewards
    .reduce((sum, r) => sum + (r.currency === 'points' ? r.amount : r.amount * 10), 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <Gift className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{totalAvailable.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Available to Claim</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{totalPending.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Pending Processing</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{claimedRewards.size}</p>
            <p className="text-sm text-muted-foreground">Claimed Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Tabs */}
      <Tabs defaultValue="available" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Available ({availableRewards.filter(r => !claimedRewards.has(r.id)).length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Pending ({pendingRewards.length})
          </TabsTrigger>
          <TabsTrigger value="milestones" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Milestones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-accent" />
                Ready to Claim
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                These rewards are ready for immediate claiming
              </p>
            </CardHeader>
          </Card>
          
          <div className="grid gap-4">
            {availableRewards
              .filter(reward => !claimedRewards.has(reward.id))
              .map((reward) => (
                <RewardCard
                  key={reward.id}
                  reward={reward}
                  onClaim={handleClaim}
                />
              ))}
          </div>

          {availableRewards.filter(r => !claimedRewards.has(r.id)).length === 0 && (
            <Card className="shadow-card">
              <CardContent className="p-12 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">All caught up!</h3>
                <p className="text-muted-foreground">
                  No rewards available to claim right now. Keep sharing to earn more!
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-warning" />
                Processing Rewards
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                These rewards are being processed and will be available soon
              </p>
            </CardHeader>
          </Card>
          
          <div className="grid gap-4">
            {pendingRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                onClaim={handleClaim}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-gold" />
                Achievement Milestones
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Unlock these rewards by reaching specific goals
              </p>
            </CardHeader>
          </Card>
          
          <div className="grid gap-4">
            {milestoneRewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                onClaim={handleClaim}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};