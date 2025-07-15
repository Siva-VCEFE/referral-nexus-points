import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Copy, 
  Share2, 
  Mail, 
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  QrCode,
  Gift,
  Users,
  TrendingUp,
  Star,
  Smartphone
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ReferralLinkProps {
  referralCode: string;
}

const socialPlatforms = [
  {
    name: 'WhatsApp',
    icon: MessageCircle,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    action: (link: string, message: string) => {
      window.open(`https://wa.me/?text=${encodeURIComponent(message + ' ' + link)}`, '_blank');
    }
  },
  {
    name: 'Facebook',
    icon: Facebook,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    action: (link: string) => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`, '_blank');
    }
  },
  {
    name: 'Twitter',
    icon: Twitter,
    color: 'text-sky-500',
    bgColor: 'bg-sky-100',
    action: (link: string, message: string) => {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(link)}`, '_blank');
    }
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    color: 'text-blue-700',
    bgColor: 'bg-blue-100',
    action: (link: string) => {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`, '_blank');
    }
  },
  {
    name: 'Email',
    icon: Mail,
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    action: (link: string, message: string) => {
      window.open(`mailto:?subject=Join me and earn rewards!&body=${encodeURIComponent(message + ' ' + link)}`, '_blank');
    }
  }
];

const referralTips = [
  {
    icon: Users,
    title: 'Share with Friends',
    description: 'Personal recommendations work best. Share with people you know.',
    color: 'text-primary'
  },
  {
    icon: Gift,
    title: 'Highlight Benefits',
    description: 'Explain the rewards and benefits your friends will receive.',
    color: 'text-accent'
  },
  {
    icon: TrendingUp,
    title: 'Follow Up',
    description: 'Check in with referred friends to help them get started.',
    color: 'text-gold'
  },
  {
    icon: Star,
    title: 'Be Authentic',
    description: 'Share your genuine experience and why you love the platform.',
    color: 'text-primary'
  }
];

export const ReferralLink = ({ referralCode }: ReferralLinkProps) => {
  const { toast } = useToast();
  const [showQR, setShowQR] = useState(false);
  
  const referralLink = `https://app.example.com/ref/${referralCode}`;
  const defaultMessage = "Hey! I've been using this amazing platform and thought you'd love it too. Join using my link and we both get rewards! 🎉";

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const shareViaWebShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me and earn rewards!',
          text: defaultMessage,
          url: referralLink,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      copyToClipboard(referralLink, 'Referral link');
    }
  };

  return (
    <div className="space-y-6">
      {/* Referral Link Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Your Referral Link
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Share this link with friends and earn rewards when they join
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value={referralLink} 
              readOnly 
              className="font-mono text-sm"
            />
            <Button 
              variant="outline" 
              onClick={() => copyToClipboard(referralLink, 'Referral link')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="premium" 
              className="flex-1"
              onClick={shareViaWebShare}
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Quick Share
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowQR(!showQR)}
            >
              <QrCode className="h-4 w-4" />
            </Button>
          </div>

          {showQR && (
            <Card className="bg-gradient-subtle">
              <CardContent className="p-6 text-center">
                <div className="w-40 h-40 bg-white border rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <QrCode className="h-16 w-16 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Scan QR code to access referral link
                </p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Referral Code Card */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-5 w-5 text-gold" />
            Your Referral Code
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 bg-gradient-gold rounded-lg">
            <div>
              <p className="text-gold-foreground font-mono text-xl font-bold">
                {referralCode}
              </p>
              <p className="text-gold-foreground/80 text-sm">
                Share this code directly
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/20 border-white/30 text-gold-foreground hover:bg-white/30"
              onClick={() => copyToClipboard(referralCode, 'Referral code')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Social Sharing */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Share2 className="h-5 w-5 text-primary" />
            Share on Social Media
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Reach more people by sharing on your favorite platforms
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <Button
                  key={platform.name}
                  variant="outline"
                  className="h-20 flex-col gap-2 hover:shadow-card transition-all duration-300"
                  onClick={() => platform.action(referralLink, defaultMessage)}
                >
                  <div className={`p-2 rounded-full ${platform.bgColor}`}>
                    <Icon className={`h-5 w-5 ${platform.color}`} />
                  </div>
                  <span className="text-xs">{platform.name}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sharing Tips */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-gold" />
            Sharing Tips for Success
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {referralTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-subtle rounded-lg">
                  <div className={`p-2 rounded-full bg-white shadow-sm ${tip.color}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reward Structure */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Reward Structure
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-gold/20 bg-gradient-to-r from-gold/5 to-transparent">
              <div className="flex items-center gap-3">
                <Badge className="bg-gradient-gold text-gold-foreground">Level 1</Badge>
                <span className="font-medium">Direct Referrals</span>
              </div>
              <span className="text-lg font-bold text-gold">10%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-primary border-primary">Level 2</Badge>
                <span className="font-medium">Indirect Referrals</span>
              </div>
              <span className="text-lg font-bold text-primary">5%</span>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg border border-accent/20 bg-gradient-to-r from-accent/5 to-transparent">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-accent border-accent">Level 3</Badge>
                <span className="font-medium">Sub-indirect Referrals</span>
              </div>
              <span className="text-lg font-bold text-accent">2.5%</span>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-subtle rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              💡 <strong>Pro Tip:</strong> The more people in your network, the more you earn from every purchase!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};