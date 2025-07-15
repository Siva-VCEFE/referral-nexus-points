import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Gift, 
  Crown, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Wallet,
  Share2
} from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

const steps = [
  {
    id: 1,
    title: "Welcome to MGM Program",
    description: "Learn how our Member Get Member program works",
    icon: Crown,
    content: {
      heading: "Start Your Journey to Earning",
      points: [
        "Earn up to 10% from direct referrals",
        "Get 5% from indirect referrals",
        "Receive 2.5% from sub-indirect referrals",
        "Access exclusive bonuses and rewards"
      ]
    }
  },
  {
    id: 2,
    title: "Share Your Link",
    description: "Get your unique referral link and start sharing",
    icon: Share2,
    content: {
      heading: "Your Sharing Toolkit",
      points: [
        "Personal referral link and code",
        "Social media integration",
        "QR code for offline sharing",
        "Performance tracking dashboard"
      ]
    }
  },
  {
    id: 3,
    title: "Track & Earn",
    description: "Monitor your network and claim rewards",
    icon: Target,
    content: {
      heading: "Growth & Analytics",
      points: [
        "Real-time network visualization",
        "Detailed earnings history",
        "Performance analytics",
        "Instant reward claims"
      ]
    }
  }
];

export const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleNext = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const currentStepData = steps.find(step => step.id === currentStep);
  const progress = ((currentStep - 1) / steps.length) * 100;

  if (!currentStepData) return null;

  const Icon = currentStepData.icon;

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-6">
        {/* Progress Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Crown className="h-8 w-8 text-gold" />
            <h1 className="text-3xl font-bold text-foreground">MGM Program</h1>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Step {currentStep} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-premium">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mb-4">
              <Icon className="h-8 w-8 text-primary-foreground" />
            </div>
            <CardTitle className="text-2xl">{currentStepData.content.heading}</CardTitle>
            <p className="text-muted-foreground">{currentStepData.description}</p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="grid gap-4">
              {currentStepData.content.points.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-subtle rounded-lg">
                  <div className="mt-0.5">
                    <CheckCircle className="h-5 w-5 text-accent" />
                  </div>
                  <p className="text-foreground">{point}</p>
                </div>
              ))}
            </div>

            {/* Step-specific content */}
            {currentStep === 1 && (
              <div className="bg-gradient-gold p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold text-gold-foreground mb-2">
                  Ready to Start Earning?
                </h3>
                <p className="text-gold-foreground/80">
                  Join thousands of members already earning through referrals
                </p>
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex gap-4 justify-center">
                <Badge className="bg-gradient-gold text-gold-foreground px-4 py-2">
                  <Users className="h-4 w-4 mr-1" />
                  Level 1: 10%
                </Badge>
                <Badge variant="outline" className="text-primary border-primary px-4 py-2">
                  <Star className="h-4 w-4 mr-1" />
                  Level 2: 5%
                </Badge>
                <Badge variant="outline" className="text-accent border-accent px-4 py-2">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Level 3: 2.5%
                </Badge>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center p-6 bg-gradient-subtle rounded-lg">
                <Wallet className="h-12 w-12 text-primary mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Start Building Your Network Today
                </h3>
                <p className="text-muted-foreground">
                  Every referral is a step towards financial freedom
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={handleSkip} className="flex-1">
                Skip Tutorial
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-gradient-primary">
                {currentStep === steps.length ? 'Get Started' : 'Continue'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                step.id === currentStep
                  ? 'bg-primary scale-125'
                  : completedSteps.has(step.id)
                  ? 'bg-accent'
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};