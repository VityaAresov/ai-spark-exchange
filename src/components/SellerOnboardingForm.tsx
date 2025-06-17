
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Upload, Sparkles, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const SellerOnboardingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    thumbnail: null as File | null,
    integrations: [] as string[],
    hasFreeTrial: false,
    isReadyToLaunch: false
  });
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    'Content Generation',
    'Analytics',
    'Marketing',
    'DevOps',
    'Customer Service',
    'Productivity',
    'Writing',
    'Social Media'
  ];

  const integrationOptions = [
    'API',
    'Webhooks',
    'Zapier',
    'Slack',
    'Discord',
    'Email',
    'SMS'
  ];

  const handleIntegrationToggle = (integration: string) => {
    setFormData(prev => ({
      ...prev,
      integrations: prev.integrations.includes(integration)
        ? prev.integrations.filter(i => i !== integration)
        : [...prev.integrations, integration]
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file size (2MB max)
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 2MB",
          variant: "destructive"
        });
        return;
      }
      // Validate file type
      if (!['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: "Only PNG, JPG, and SVG files are allowed",
          variant: "destructive"
        });
        return;
      }
      setFormData(prev => ({ ...prev, thumbnail: file }));
    }
  };

  const generateDescription = async () => {
    if (!formData.name || !formData.category) {
      toast({
        title: "Missing Information",
        description: "Please enter agent name and category first",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingDescription(true);
    
    // Mock AI description generation (in production, this would call GPT-4 API)
    setTimeout(() => {
      const mockDescriptions = [
        `${formData.name} is a powerful AI agent designed for ${formData.category.toLowerCase()}. It streamlines workflows, automates complex tasks, and delivers professional results with minimal setup required. Perfect for businesses looking to enhance productivity and efficiency.`,
        `Transform your ${formData.category.toLowerCase()} process with ${formData.name}. This intelligent agent combines advanced AI capabilities with user-friendly interfaces to provide actionable insights, automate repetitive tasks, and boost overall performance.`,
        `${formData.name} revolutionizes ${formData.category.toLowerCase()} by leveraging cutting-edge AI technology. It offers seamless integration, intelligent automation, and professional-grade results that help teams work smarter and achieve better outcomes faster.`
      ];
      
      const randomDescription = mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)];
      setFormData(prev => ({ ...prev, description: randomDescription }));
      setIsGeneratingDescription(false);
      
      toast({
        title: "Description Generated!",
        description: "AI has created a description for your agent. Feel free to edit it as needed."
      });
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Mock submission
    console.log('Submitting agent:', formData);
    setSubmitted(true);
    
    toast({
      title: "Agent Submitted Successfully!",
      description: "Your agent will be reviewed and published within 24 hours."
    });
    
    // Reset form after delay
    setTimeout(() => {
      setFormData({
        name: '',
        category: '',
        price: '',
        description: '',
        thumbnail: null,
        integrations: [],
        hasFreeTrial: false,
        isReadyToLaunch: false
      });
      setSubmitted(false);
    }, 3000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-green-700">Agent Submitted!</h2>
              <p className="text-gray-600">
                Thank you for submitting your AI agent. Our team will review it within 24 hours.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">What happens next?</h3>
                <ul className="text-sm text-gray-600 space-y-1 text-left">
                  <li>• Quality review and testing (12-24 hours)</li>
                  <li>• Email notification once approved</li>
                  <li>• Agent goes live on the marketplace</li>
                  <li>• You'll receive your unique license key</li>
                </ul>
              </div>
              <p className="text-sm text-gray-500">
                Contact support@example.com if you have any questions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Submit Your AI Agent</CardTitle>
          <p className="text-gray-600">Fill out the details below to list your agent on the marketplace</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Agent Name */}
            <div>
              <Label htmlFor="name" className="text-sm font-medium">
                Agent Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., GrammarBot Pro"
                className="mt-1"
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-sm font-medium">
                Category <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price" className="text-sm font-medium">
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="15"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Price in USD per month</p>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="description" className="text-sm font-medium">
                  Description <span className="text-red-500">*</span>
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={generateDescription}
                  disabled={isGeneratingDescription || !formData.name || !formData.category}
                  className="flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4" />
                  {isGeneratingDescription ? 'Generating...' : 'Generate with AI'}
                </Button>
              </div>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe what your agent does and how it helps users..."
                rows={4}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                AI generation requires agent name and category to be filled first
              </p>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <Label className="text-sm font-medium">Thumbnail Image</Label>
              <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <Label htmlFor="thumbnail" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-500">Upload a file</span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </Label>
                  <Input
                    id="thumbnail"
                    type="file"
                    accept=".png,.jpg,.jpeg,.svg"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, SVG up to 2MB</p>
                {formData.thumbnail && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected: {formData.thumbnail.name}
                  </p>
                )}
              </div>
            </div>

            {/* Integrations */}
            <div>
              <Label className="text-sm font-medium">Supported Integrations</Label>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {integrationOptions.map(integration => (
                  <div key={integration} className="flex items-center space-x-2">
                    <Checkbox
                      id={integration}
                      checked={formData.integrations.includes(integration)}
                      onCheckedChange={() => handleIntegrationToggle(integration)}
                    />
                    <Label htmlFor={integration} className="text-sm cursor-pointer">
                      {integration}
                    </Label>
                  </div>
                ))}
              </div>
              {formData.integrations.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {formData.integrations.map(integration => (
                    <Badge key={integration} variant="secondary" className="text-xs">
                      {integration}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Additional Options */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="freeTrial"
                  checked={formData.hasFreeTrial}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, hasFreeTrial: !!checked }))}
                />
                <Label htmlFor="freeTrial" className="text-sm">
                  Offer 7-day free trial
                </Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="readyToLaunch"
                  checked={formData.isReadyToLaunch}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isReadyToLaunch: !!checked }))}
                />
                <Label htmlFor="readyToLaunch" className="text-sm">
                  Mark as "Ready-to-Launch" (pre-verified)
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
              Submit Agent for Review
            </Button>
            
            <p className="text-xs text-gray-500 text-center">
              Your agent will be reviewed within 24 hours and published if approved.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerOnboardingForm;
