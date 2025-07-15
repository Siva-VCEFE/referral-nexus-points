import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  ChevronDown, 
  ChevronRight, 
  User,
  Crown,
  Star,
  TrendingUp,
  Calendar
} from "lucide-react";
import { useState } from "react";

interface ReferralUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  totalEarnings: number;
  status: 'active' | 'inactive';
  level: 1 | 2 | 3;
  children?: ReferralUser[];
}

const mockReferralData: ReferralUser[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@example.com',
    joinDate: '2024-01-15',
    totalEarnings: 1250,
    status: 'active',
    level: 1,
    children: [
      {
        id: '2',
        name: 'Priya Sharma',
        email: 'priya@example.com',
        joinDate: '2024-02-10',
        totalEarnings: 850,
        status: 'active',
        level: 2,
        children: [
          {
            id: '3',
            name: 'Kumar Patel',
            email: 'kumar@example.com',
            joinDate: '2024-02-20',
            totalEarnings: 450,
            status: 'active',
            level: 3
          }
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    joinDate: '2024-01-20',
    totalEarnings: 980,
    status: 'active',
    level: 1,
    children: [
      {
        id: '5',
        name: 'Mike Chen',
        email: 'mike@example.com',
        joinDate: '2024-02-15',
        totalEarnings: 320,
        status: 'inactive',
        level: 2
      }
    ]
  }
];

const ReferralUserCard = ({ user, isExpanded, onToggle }: { 
  user: ReferralUser; 
  isExpanded: boolean; 
  onToggle: () => void;
}) => {
  const levelColors = {
    1: 'bg-gradient-gold text-gold-foreground',
    2: 'bg-gradient-primary text-primary-foreground',
    3: 'bg-gradient-success text-accent-foreground'
  };

  const levelIcons = {
    1: Crown,
    2: Star,
    3: TrendingUp
  };

  const LevelIcon = levelIcons[user.level];

  return (
    <div className="space-y-2">
      <Card className={`shadow-card transition-all duration-300 hover:shadow-lg ${
        user.status === 'active' ? 'border-l-4 border-l-accent' : 'opacity-75'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full ${levelColors[user.level]}`}>
                <LevelIcon className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground">{user.name}</h4>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    Level {user.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                  <span className="text-accent font-medium">
                    ${user.totalEarnings} earned
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={user.status === 'active' ? 'text-accent border-accent' : ''}>
                {user.status}
              </Badge>
              {user.children && user.children.length > 0 && (
                <Button variant="ghost" size="sm" onClick={onToggle}>
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Render children */}
      {isExpanded && user.children && (
        <div className="ml-8 space-y-2 border-l-2 border-border pl-4">
          {user.children.map((child) => (
            <ReferralUserCard 
              key={child.id} 
              user={child} 
              isExpanded={false} 
              onToggle={() => {}} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ReferralNetwork = () => {
  const [expandedUsers, setExpandedUsers] = useState<Set<string>>(new Set());

  const toggleExpanded = (userId: string) => {
    const newExpanded = new Set(expandedUsers);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedUsers(newExpanded);
  };

  const totalNetworkSize = mockReferralData.reduce((acc, user) => {
    let count = 1; // Count the user itself
    if (user.children) {
      count += user.children.length;
      user.children.forEach(child => {
        if (child.children) {
          count += child.children.length;
        }
      });
    }
    return acc + count;
  }, 0);

  const activeUsers = mockReferralData.filter(user => user.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Network Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{totalNetworkSize}</p>
            <p className="text-sm text-muted-foreground">Total Network Size</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{activeUsers}</p>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <Crown className="h-8 w-8 text-gold mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">
              {Math.round((activeUsers / totalNetworkSize) * 100)}%
            </p>
            <p className="text-sm text-muted-foreground">Activity Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Network Tree */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Your Referral Network
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage and track your 3-level referral network
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockReferralData.map((user) => (
            <ReferralUserCard
              key={user.id}
              user={user}
              isExpanded={expandedUsers.has(user.id)}
              onToggle={() => toggleExpanded(user.id)}
            />
          ))}
          
          {mockReferralData.length === 0 && (
            <div className="text-center py-12">
              <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No referrals yet</h3>
              <p className="text-muted-foreground mb-4">
                Start sharing your referral link to build your network
              </p>
              <Button variant="premium">
                Share Referral Link
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};