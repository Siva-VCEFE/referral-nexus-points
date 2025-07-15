import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  Shield, 
  Settings, 
  Percent, 
  AlertTriangle,
  Save,
  RotateCcw,
  Eye,
  Users,
  DollarSign,
  Crown,
  Star,
  TrendingUp,
  Gift,
  Calendar,
  Target,
  Ban
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LevelConfig {
  percentage: number;
  fixedAmount: number;
  isPercentage: boolean;
  minPurchaseAmount: number;
  maxRewardPerDay: number;
}

interface AdminSettings {
  level1: LevelConfig;
  level2: LevelConfig;
  level3: LevelConfig;
  globalSettings: {
    maxReferralsPerUser: number;
    cooldownPeriod: number;
    minimumUserAge: number;
    fraudDetection: boolean;
    autoApproval: boolean;
    campaignMode: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
  };
}

const AdminConfig = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("levels");
  const [hasChanges, setHasChanges] = useState(false);

  const [settings, setSettings] = useState<AdminSettings>({
    level1: {
      percentage: 10,
      fixedAmount: 50,
      isPercentage: true,
      minPurchaseAmount: 100,
      maxRewardPerDay: 1000
    },
    level2: {
      percentage: 5,
      fixedAmount: 25,
      isPercentage: true,
      minPurchaseAmount: 100,
      maxRewardPerDay: 500
    },
    level3: {
      percentage: 2.5,
      fixedAmount: 10,
      isPercentage: true,
      minPurchaseAmount: 100,
      maxRewardPerDay: 250
    },
    globalSettings: {
      maxReferralsPerUser: 100,
      cooldownPeriod: 24,
      minimumUserAge: 18,
      fraudDetection: true,
      autoApproval: false,
      campaignMode: false
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true
    }
  });

  const updateLevelConfig = (level: 'level1' | 'level2' | 'level3', field: keyof LevelConfig, value: any) => {
    setSettings(prev => ({
      ...prev,
      [level]: {
        ...prev[level],
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const updateGlobalSettings = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      globalSettings: {
        ...prev.globalSettings,
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const updateNotificationSettings = (field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: value
      }
    }));
    setHasChanges(true);
  };

  const saveSettings = () => {
    // In real app, this would make an API call
    console.log('Saving settings:', settings);
    toast({
      title: "Settings Saved",
      description: "MGM configuration has been updated successfully",
    });
    setHasChanges(false);
  };

  const resetToDefaults = () => {
    // Reset to default values
    setSettings({
      level1: {
        percentage: 10,
        fixedAmount: 50,
        isPercentage: true,
        minPurchaseAmount: 100,
        maxRewardPerDay: 1000
      },
      level2: {
        percentage: 5,
        fixedAmount: 25,
        isPercentage: true,
        minPurchaseAmount: 100,
        maxRewardPerDay: 500
      },
      level3: {
        percentage: 2.5,
        fixedAmount: 10,
        isPercentage: true,
        minPurchaseAmount: 100,
        maxRewardPerDay: 250
      },
      globalSettings: {
        maxReferralsPerUser: 100,
        cooldownPeriod: 24,
        minimumUserAge: 18,
        fraudDetection: true,
        autoApproval: false,
        campaignMode: false
      },
      notifications: {
        emailNotifications: true,
        smsNotifications: false,
        pushNotifications: true
      }
    });
    setHasChanges(true);
  };

  const LevelConfigCard = ({ 
    level, 
    config, 
    title, 
    icon: Icon, 
    color 
  }: { 
    level: 'level1' | 'level2' | 'level3';
    config: LevelConfig;
    title: string;
    icon: any;
    color: string;
  }) => (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${color}`}>
          <Icon className="h-5 w-5" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${level}-type`}>Reward Type</Label>
            <Select 
              value={config.isPercentage ? "percentage" : "fixed"}
              onValueChange={(value) => updateLevelConfig(level, 'isPercentage', value === "percentage")}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Percentage</SelectItem>
                <SelectItem value="fixed">Fixed Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor={`${level}-value`}>
              {config.isPercentage ? 'Percentage (%)' : 'Fixed Amount ($)'}
            </Label>
            <Input
              id={`${level}-value`}
              type="number"
              value={config.isPercentage ? config.percentage : config.fixedAmount}
              onChange={(e) => updateLevelConfig(
                level, 
                config.isPercentage ? 'percentage' : 'fixedAmount', 
                Number(e.target.value)
              )}
              min="0"
              step={config.isPercentage ? "0.1" : "1"}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor={`${level}-min`}>Min Purchase ($)</Label>
            <Input
              id={`${level}-min`}
              type="number"
              value={config.minPurchaseAmount}
              onChange={(e) => updateLevelConfig(level, 'minPurchaseAmount', Number(e.target.value))}
              min="0"
            />
          </div>
          <div>
            <Label htmlFor={`${level}-max`}>Max Daily Reward ($)</Label>
            <Input
              id={`${level}-max`}
              type="number"
              value={config.maxRewardPerDay}
              onChange={(e) => updateLevelConfig(level, 'maxRewardPerDay', Number(e.target.value))}
              min="0"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-subtle p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              MGM Admin Configuration
            </h1>
            <p className="text-muted-foreground mt-1">
              Configure reward levels, security settings, and system parameters
            </p>
          </div>
          <div className="flex gap-2">
            {hasChanges && (
              <Badge variant="outline" className="text-warning border-warning">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Unsaved Changes
              </Badge>
            )}
            <Button variant="outline" onClick={resetToDefaults}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Defaults
            </Button>
            <Button variant="premium" onClick={saveSettings} disabled={!hasChanges}>
              <Save className="h-4 w-4 mr-2" />
              Save Configuration
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">1,245</p>
              <p className="text-sm text-muted-foreground">Active Referrers</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 text-accent mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">$45,230</p>
              <p className="text-sm text-muted-foreground">Total Rewards Paid</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-gold mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">8.5%</p>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card">
            <CardContent className="p-6 text-center">
              <Ban className="h-8 w-8 text-destructive mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">12</p>
              <p className="text-sm text-muted-foreground">Fraud Cases</p>
            </CardContent>
          </Card>
        </div>

        {/* Configuration Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="levels">Reward Levels</TabsTrigger>
            <TabsTrigger value="global">Global Settings</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="levels" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <LevelConfigCard
                level="level1"
                config={settings.level1}
                title="Level 1 - Direct Referrals"
                icon={Crown}
                color="text-gold"
              />
              <LevelConfigCard
                level="level2"
                config={settings.level2}
                title="Level 2 - Indirect Referrals"
                icon={Star}
                color="text-primary"
              />
              <LevelConfigCard
                level="level3"
                config={settings.level3}
                title="Level 3 - Sub-indirect Referrals"
                icon={Target}
                color="text-accent"
              />
            </div>

            {/* Preview Card */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  Configuration Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(settings).slice(0, 3).map(([level, config], index) => {
                    const levelNum = index + 1;
                    return (
                      <div key={level} className="p-4 rounded-lg bg-gradient-subtle border">
                        <h4 className="font-semibold mb-2">Level {levelNum}</h4>
                        <p className="text-sm text-muted-foreground">
                          Reward: {config.isPercentage ? `${config.percentage}%` : `$${config.fixedAmount}`}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Min Purchase: ${config.minPurchaseAmount}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Daily Max: ${config.maxRewardPerDay}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="global" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>System Limits</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="max-referrals">Max Referrals per User</Label>
                    <Input
                      id="max-referrals"
                      type="number"
                      value={settings.globalSettings.maxReferralsPerUser}
                      onChange={(e) => updateGlobalSettings('maxReferralsPerUser', Number(e.target.value))}
                      min="1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cooldown">Cooldown Period (hours)</Label>
                    <Input
                      id="cooldown"
                      type="number"
                      value={settings.globalSettings.cooldownPeriod}
                      onChange={(e) => updateGlobalSettings('cooldownPeriod', Number(e.target.value))}
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="min-age">Minimum User Age</Label>
                    <Input
                      id="min-age"
                      type="number"
                      value={settings.globalSettings.minimumUserAge}
                      onChange={(e) => updateGlobalSettings('minimumUserAge', Number(e.target.value))}
                      min="13"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>System Behavior</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="fraud-detection">Fraud Detection</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable automatic fraud detection and prevention
                      </p>
                    </div>
                    <Switch
                      id="fraud-detection"
                      checked={settings.globalSettings.fraudDetection}
                      onCheckedChange={(checked) => updateGlobalSettings('fraudDetection', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-approval">Auto Approval</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically approve referral rewards
                      </p>
                    </div>
                    <Switch
                      id="auto-approval"
                      checked={settings.globalSettings.autoApproval}
                      onCheckedChange={(checked) => updateGlobalSettings('autoApproval', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="campaign-mode">Campaign Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable special campaign configurations
                      </p>
                    </div>
                    <Switch
                      id="campaign-mode"
                      checked={settings.globalSettings.campaignMode}
                      onCheckedChange={(checked) => updateGlobalSettings('campaignMode', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Configure how users receive notifications about their referral activities
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send email updates for referral activities
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateNotificationSettings('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications">SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send SMS alerts for important activities
                    </p>
                  </div>
                  <Switch
                    id="sms-notifications"
                    checked={settings.notifications.smsNotifications}
                    onCheckedChange={(checked) => updateNotificationSettings('smsNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Send push notifications via the app
                    </p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => updateNotificationSettings('pushNotifications', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Security & Fraud Prevention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="fraud-rules">Fraud Detection Rules</Label>
                  <Textarea
                    id="fraud-rules"
                    placeholder="Enter custom fraud detection rules..."
                    className="mt-2"
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="max-daily-referrals">Max Daily Referrals</Label>
                    <Input
                      id="max-daily-referrals"
                      type="number"
                      placeholder="10"
                      min="1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="max-ip-referrals">Max Referrals per IP</Label>
                    <Input
                      id="max-ip-referrals"
                      type="number"
                      placeholder="3"
                      min="1"
                    />
                  </div>
                </div>

                <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                    <span className="font-semibold text-destructive">Security Alert</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    These settings directly impact system security. Changes should be tested thoroughly before deployment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminConfig;