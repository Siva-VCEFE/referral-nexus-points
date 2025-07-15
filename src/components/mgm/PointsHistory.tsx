import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Download,
  Calendar,
  DollarSign,
  Users,
  Gift,
  Filter
} from "lucide-react";
import { useState } from "react";

interface PointsTransaction {
  id: string;
  type: 'referral_signup' | 'referral_purchase' | 'level_bonus' | 'monthly_bonus' | 'special_promotion';
  description: string;
  points: number;
  amount?: number;
  fromUser?: string;
  level?: 1 | 2 | 3;
  date: string;
  status: 'completed' | 'pending' | 'cancelled';
}

const mockTransactions: PointsTransaction[] = [
  {
    id: '1',
    type: 'referral_signup',
    description: 'Alex Johnson signed up using your referral link',
    points: 100,
    amount: 10,
    fromUser: 'Alex Johnson',
    level: 1,
    date: '2024-01-15T10:30:00Z',
    status: 'completed'
  },
  {
    id: '2',
    type: 'referral_purchase',
    description: 'Priya Sharma made a purchase',
    points: 50,
    amount: 25,
    fromUser: 'Priya Sharma',
    level: 2,
    date: '2024-01-14T14:20:00Z',
    status: 'completed'
  },
  {
    id: '3',
    type: 'level_bonus',
    description: 'Level 2 achievement bonus',
    points: 200,
    amount: 20,
    date: '2024-01-13T09:15:00Z',
    status: 'completed'
  },
  {
    id: '4',
    type: 'referral_purchase',
    description: 'Kumar Patel completed signup process',
    points: 25,
    amount: 12.5,
    fromUser: 'Kumar Patel',
    level: 3,
    date: '2024-01-12T16:45:00Z',
    status: 'completed'
  },
  {
    id: '5',
    type: 'monthly_bonus',
    description: 'December monthly achievement bonus',
    points: 500,
    amount: 50,
    date: '2024-01-01T00:00:00Z',
    status: 'completed'
  },
  {
    id: '6',
    type: 'referral_purchase',
    description: 'Sarah Wilson made a premium purchase',
    points: 75,
    amount: 37.5,
    fromUser: 'Sarah Wilson',
    level: 1,
    date: '2024-01-10T11:30:00Z',
    status: 'pending'
  }
];

const getTransactionIcon = (type: PointsTransaction['type']) => {
  switch (type) {
    case 'referral_signup':
      return Users;
    case 'referral_purchase':
      return DollarSign;
    case 'level_bonus':
    case 'monthly_bonus':
      return Gift;
    case 'special_promotion':
      return TrendingUp;
    default:
      return DollarSign;
  }
};

const getTransactionColor = (type: PointsTransaction['type'], level?: number) => {
  if (level) {
    switch (level) {
      case 1: return 'text-gold';
      case 2: return 'text-primary';
      case 3: return 'text-accent';
    }
  }
  
  switch (type) {
    case 'level_bonus':
    case 'monthly_bonus':
      return 'text-gold';
    case 'special_promotion':
      return 'text-primary';
    default:
      return 'text-accent';
  }
};

const TransactionCard = ({ transaction }: { transaction: PointsTransaction }) => {
  const Icon = getTransactionIcon(transaction.type);
  const colorClass = getTransactionColor(transaction.type, transaction.level);
  
  return (
    <Card className="shadow-card hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full bg-gradient-subtle ${colorClass}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-medium text-foreground">{transaction.description}</p>
                {transaction.level && (
                  <Badge variant="outline" className="text-xs">
                    L{transaction.level}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(transaction.date).toLocaleDateString()}
                </span>
                {transaction.fromUser && (
                  <span>from {transaction.fromUser}</span>
                )}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${colorClass}`}>
                +{transaction.points}
              </span>
              <span className="text-xs text-muted-foreground">pts</span>
            </div>
            {transaction.amount && (
              <p className="text-sm text-muted-foreground">
                ${transaction.amount.toFixed(2)}
              </p>
            )}
            <Badge 
              variant={transaction.status === 'completed' ? 'default' : 
                      transaction.status === 'pending' ? 'secondary' : 'destructive'}
              className="text-xs mt-1"
            >
              {transaction.status}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const PointsHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.fromUser?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalEarned = mockTransactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.points, 0);
  
  const pendingPoints = mockTransactions
    .filter(t => t.status === 'pending')
    .reduce((sum, t) => sum + t.points, 0);

  const thisMonthEarned = mockTransactions
    .filter(t => {
      const transactionDate = new Date(t.date);
      const currentDate = new Date();
      return transactionDate.getMonth() === currentDate.getMonth() &&
             transactionDate.getFullYear() === currentDate.getFullYear() &&
             t.status === 'completed';
    })
    .reduce((sum, t) => sum + t.points, 0);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <TrendingUp className="h-8 w-8 text-accent mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{totalEarned.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Total Points Earned</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{thisMonthEarned.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">This Month</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-6 text-center">
            <TrendingDown className="h-8 w-8 text-warning mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{pendingPoints.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Pending Points</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Points History
            </span>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="referral_signup">Referral Signup</SelectItem>
                <SelectItem value="referral_purchase">Referral Purchase</SelectItem>
                <SelectItem value="level_bonus">Level Bonus</SelectItem>
                <SelectItem value="monthly_bonus">Monthly Bonus</SelectItem>
                <SelectItem value="special_promotion">Special Promotion</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <div className="space-y-3">
        {filteredTransactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
        
        {filteredTransactions.length === 0 && (
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No transactions found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                  ? "Try adjusting your filters or search terms"
                  : "Start referring people to see your earning history here"
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};