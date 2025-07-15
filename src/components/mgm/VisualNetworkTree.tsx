import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Crown, 
  Star, 
  TrendingUp,
  ChevronDown,
  ChevronRight,
  User,
  Plus,
  Calendar,
  DollarSign,
  Activity
} from "lucide-react";

interface NetworkNode {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: string;
  totalEarnings: number;
  status: 'active' | 'inactive';
  level: 1 | 2 | 3;
  children?: NetworkNode[];
  isExpanded?: boolean;
}

const mockNetworkData: NetworkNode[] = [
  {
    id: 'user',
    name: 'You',
    email: 'john.doe@example.com',
    joinDate: '2023-12-01',
    totalEarnings: 2450,
    status: 'active',
    level: 1,
    isExpanded: true,
    children: [
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
            id: '1.1',
            name: 'Priya Sharma',
            email: 'priya@example.com',
            joinDate: '2024-02-10',
            totalEarnings: 850,
            status: 'active',
            level: 2,
            children: [
              {
                id: '1.1.1',
                name: 'Kumar Patel',
                email: 'kumar@example.com',
                joinDate: '2024-02-20',
                totalEarnings: 450,
                status: 'active',
                level: 3
              },
              {
                id: '1.1.2',
                name: 'Lisa Wang',
                email: 'lisa@example.com',
                joinDate: '2024-02-25',
                totalEarnings: 320,
                status: 'active',
                level: 3
              }
            ]
          },
          {
            id: '1.2',
            name: 'Mike Chen',
            email: 'mike@example.com',
            joinDate: '2024-02-15',
            totalEarnings: 320,
            status: 'inactive',
            level: 2
          }
        ]
      },
      {
        id: '2',
        name: 'Sarah Wilson',
        email: 'sarah@example.com',
        joinDate: '2024-01-20',
        totalEarnings: 980,
        status: 'active',
        level: 1,
        children: [
          {
            id: '2.1',
            name: 'David Brown',
            email: 'david@example.com',
            joinDate: '2024-02-05',
            totalEarnings: 650,
            status: 'active',
            level: 2
          }
        ]
      },
      {
        id: '3',
        name: 'Emily Davis',
        email: 'emily@example.com',
        joinDate: '2024-01-25',
        totalEarnings: 750,
        status: 'active',
        level: 1
      }
    ]
  }
];

const NodeCard = ({ 
  node, 
  isRoot = false, 
  depth = 0,
  onToggle,
  isExpanded
}: { 
  node: NetworkNode; 
  isRoot?: boolean;
  depth?: number;
  onToggle: (nodeId: string) => void;
  isExpanded: boolean;
}) => {
  const levelColors = {
    1: 'border-gold bg-gradient-to-r from-gold/10 to-transparent',
    2: 'border-primary bg-gradient-to-r from-primary/10 to-transparent',
    3: 'border-accent bg-gradient-to-r from-accent/10 to-transparent'
  };

  const levelIcons = {
    1: Crown,
    2: Star,
    3: TrendingUp
  };

  const LevelIcon = levelIcons[node.level];
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      {/* Connection Lines */}
      {!isRoot && (
        <>
          <div className="absolute -top-4 left-6 w-px h-4 bg-border" />
          <div className="absolute -top-4 left-6 w-8 h-px bg-border top-0" />
        </>
      )}

      <Card className={`
        shadow-card hover:shadow-lg transition-all duration-300 mb-4
        ${levelColors[node.level]}
        ${node.status === 'active' ? 'border-l-4' : 'opacity-75'}
        ${isRoot ? 'ring-2 ring-primary/20' : ''}
      `}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className={`
                relative w-12 h-12 rounded-full flex items-center justify-center
                ${node.level === 1 ? 'bg-gradient-gold' : 
                  node.level === 2 ? 'bg-gradient-primary' : 'bg-gradient-success'}
              `}>
                {node.avatar ? (
                  <img src={node.avatar} alt={node.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="h-6 w-6 text-white" />
                )}
                
                {/* Level Badge */}
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <LevelIcon className={`h-3 w-3 ${
                    node.level === 1 ? 'text-gold' : 
                    node.level === 2 ? 'text-primary' : 'text-accent'
                  }`} />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">
                    {node.name}
                    {isRoot && <span className="text-gold ml-2">👑</span>}
                  </h4>
                  <Badge 
                    variant={node.status === 'active' ? 'default' : 'secondary'} 
                    className="text-xs"
                  >
                    L{node.level}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{node.email}</p>
                
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(node.joinDate).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    ${node.totalEarnings}
                  </span>
                  <Badge 
                    variant={node.status === 'active' ? 'default' : 'secondary'}
                    className="px-2 py-0 text-xs"
                  >
                    <Activity className="h-2 w-2 mr-1" />
                    {node.status}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Expand/Collapse Button */}
            {hasChildren && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onToggle(node.id)}
                className="shrink-0"
              >
                {isExpanded ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
                <span className="ml-1 text-xs">
                  {node.children?.length}
                </span>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="ml-6 pl-4 border-l-2 border-border relative">
          {node.children?.map((child, index) => (
            <NodeCard
              key={child.id}
              node={child}
              depth={depth + 1}
              onToggle={onToggle}
              isExpanded={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const VisualNetworkTree = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['user', '1', '2']));

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const calculateNetworkStats = (nodes: NetworkNode[]): { total: number; active: number; levels: Record<number, number> } => {
    let total = 0;
    let active = 0;
    const levels = { 1: 0, 2: 0, 3: 0 };

    const traverse = (nodeList: NetworkNode[]) => {
      nodeList.forEach(node => {
        if (node.id !== 'user') {
          total++;
          levels[node.level]++;
          if (node.status === 'active') active++;
        }
        if (node.children) {
          traverse(node.children);
        }
      });
    };

    traverse(nodes);
    return { total, active, levels };
  };

  const stats = calculateNetworkStats(mockNetworkData);

  return (
    <div className="space-y-6">
      {/* Network Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{stats.total}</p>
            <p className="text-xs text-muted-foreground">Total Network</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Crown className="h-6 w-6 text-gold mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{stats.levels[1]}</p>
            <p className="text-xs text-muted-foreground">Level 1</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{stats.levels[2]}</p>
            <p className="text-xs text-muted-foreground">Level 2</p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-6 w-6 text-accent mx-auto mb-2" />
            <p className="text-xl font-bold text-foreground">{stats.levels[3]}</p>
            <p className="text-xs text-muted-foreground">Level 3</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Network Tree */}
      <Card className="shadow-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Network Visualization
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setExpandedNodes(new Set(mockNetworkData.flatMap(node => [node.id, ...(node.children?.map(c => c.id) || [])])))}
              >
                Expand All
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setExpandedNodes(new Set(['user']))}
              >
                Collapse All
              </Button>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Interactive tree view of your referral network. Click to expand/collapse branches.
          </p>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="max-h-[600px] overflow-y-auto">
            {mockNetworkData.map((rootNode) => (
              <NodeCard
                key={rootNode.id}
                node={rootNode}
                isRoot={true}
                onToggle={toggleNode}
                isExpanded={expandedNodes.has(rootNode.id)}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-sm">Legend</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-gold" />
              <span>Level 1 (10% commission)</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span>Level 2 (5% commission)</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-accent" />
              <span>Level 3 (2.5% commission)</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-green-500" />
              <span>Active Member</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};