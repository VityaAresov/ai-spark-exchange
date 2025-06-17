
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Upload, Sparkles } from 'lucide-react';

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
        alert('File size must be less than 2MB');
        return;
      }
      // Validate file type
      if (!['image/png', 'image/jpeg', 'image/svg+xml'].includes(file.type)) {
        alert('Only PNG, JPG, and SVG files are allowed');
        return;
      }
      setFormData(prev => ({ ...prev, thumbnail: file }));
    }
  };

  const generateDescription = async () => {
    if (!formData.name || !formData.category) {
      alert('Please enter agent name and category first');
      return;
    }

    setIsGeneratingDescription(true);
    
    // Mock AI description generation (in production, this would call GPT-4 API)
    setTimeout(() => {
      const mockDescriptions = [
        `${formData.name} is a powerful AI agent designed for ${formData.category.toLowerCase()}. It streamlines workflows and delivers professional results with minimal setup required.`,
        `Transform your ${formData.category.toLowerCase()} process with ${formData.name}. This intelligent agent automates complex tasks and provides actionable insights.`,
        `${formData.name} revolutionizes ${formData.category.toLowerCase()} by combining advanced AI capabilities with user-friendly interfaces for maximum productivity.`
      ];
      
      const randomDescription = mockDescriptions[Math.floor(Math.random() * mockDescriptions.length)];
      setFormData(prev => ({ ...prev, description: randomDescription }));
      setIsGeneratingDescription(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Mock submission
    console.log('Submitting agent:', formData);
    alert('Agent submitted successfully! It will be reviewed and published within 24 hours.');
    
    // Reset form
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
  };

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
                  disabled={isGeneratingDescription}
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
