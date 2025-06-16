
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, ArrowRight, X } from 'lucide-react';

interface OnboardingTutorialProps {
  onClose: () => void;
}

const OnboardingTutorial = ({ onClose }: OnboardingTutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    {
      title: "Welcome to AI Agent Marketplace",
      description: "Discover powerful AI assistants created by developers worldwide.",
      content: "Browse through hundreds of AI agents that can help with writing, analytics, content creation, and more. Each agent is tested and verified for quality."
    },
    {
      title: "Find the Perfect Agent",
      description: "Use filters and search to discover agents that match your needs.",
      content: "Filter by category, price range, or search for specific features. Check out trending agents and personalized recommendations based on your interests."
    },
    {
      title: "Test Before You Buy",
      description: "Try any agent with our interactive demo chat.",
      content: "Every agent page includes a demo chat where you can test the agent's capabilities before making a purchase. No commitment required!"
    },
    {
      title: "Choose Your Plan",
      description: "Select from free trials, monthly, or annual subscriptions.",
      content: "Most agents offer a 7-day free trial. Choose between monthly subscriptions for flexibility or annual plans for better value."
    },
    {
      title: "Agent Selection Checklist",
      description: "Key factors to consider when choosing an agent:",
      content: "✓ Check public stats and user reviews\n✓ Test the demo thoroughly\n✓ Review pricing and trial options\n✓ Read documentation for API usage\n✓ Verify the agent matches your use case"
    }
  ];

  const handleNext = () => {
    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2"
          >
            <X className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl">Getting Started</CardTitle>
          <CardDescription>
            Learn how to make the most of AI Agent Marketplace
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Progress Steps */}
          <div className="flex justify-between items-center">
            {steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <button
                  onClick={() => handleStepClick(index)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors ${
                    completedSteps.includes(index)
                      ? 'bg-green-500 border-green-500 text-white'
                      : currentStep === index
                      ? 'border-blue-500 text-blue-500'
                      : 'border-gray-300 text-gray-300'
                  }`}
                >
                  {completedSteps.includes(index) ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    completedSteps.includes(index) ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Current Step Content */}
          <div className="text-center space-y-4">
            <Badge variant="outline" className="mb-2">
              Step {currentStep + 1} of {steps.length}
            </Badge>
            <h3 className="text-xl font-semibold">{steps[currentStep].title}</h3>
            <p className="text-gray-600">{steps[currentStep].description}</p>
            <div className="bg-gray-50 p-4 rounded-lg text-left">
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {steps[currentStep].content}
              </pre>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button onClick={handleNext} className="flex items-center gap-2">
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingTutorial;
