
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

interface FilterSidebarProps {
  onFiltersChange: (filters: any) => void;
}

const FilterSidebar = ({ onFiltersChange }: FilterSidebarProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [minRating, setMinRating] = useState<number>(0);
  const [integrations, setIntegrations] = useState({
    api: false,
    webhooks: false,
    zapier: false
  });
  const [readyToLaunch, setReadyToLaunch] = useState(false);

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

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    setSelectedCategories(newCategories);
    updateFilters({ categories: newCategories });
  };

  const handleIntegrationChange = (type: string, checked: boolean) => {
    const newIntegrations = { ...integrations, [type]: checked };
    setIntegrations(newIntegrations);
    updateFilters({ integrations: newIntegrations });
  };

  const updateFilters = (newFilters: any) => {
    onFiltersChange({
      categories: selectedCategories,
      priceRange,
      minRating,
      integrations,
      readyToLaunch,
      ...newFilters
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 500]);
    setMinRating(0);
    setIntegrations({ api: false, webhooks: false, zapier: false });
    setReadyToLaunch(false);
    onFiltersChange({
      categories: [],
      priceRange: [0, 500],
      minRating: 0,
      integrations: { api: false, webhooks: false, zapier: false },
      readyToLaunch: false
    });
  };

  return (
    <Card className="w-80 h-fit">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Filters</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            Clear All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Categories</Label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => handleCategoryChange(category, !!checked)}
                />
                <Label htmlFor={category} className="text-sm cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <Label className="text-sm font-medium mb-3 block">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </Label>
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value);
              updateFilters({ priceRange: value });
            }}
            max={500}
            step={5}
            className="w-full"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Minimum Rating</Label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <Button
                key={rating}
                variant={minRating >= rating ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setMinRating(rating);
                  updateFilters({ minRating: rating });
                }}
                className="px-2"
              >
                {rating}★
              </Button>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div>
          <Label className="text-sm font-medium mb-3 block">Integrations</Label>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="api" className="text-sm">API Support</Label>
              <Switch
                id="api"
                checked={integrations.api}
                onCheckedChange={(checked) => handleIntegrationChange('api', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="webhooks" className="text-sm">Webhooks</Label>
              <Switch
                id="webhooks"
                checked={integrations.webhooks}
                onCheckedChange={(checked) => handleIntegrationChange('webhooks', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="zapier" className="text-sm">Zapier</Label>
              <Switch
                id="zapier"
                checked={integrations.zapier}
                onCheckedChange={(checked) => handleIntegrationChange('zapier', checked)}
              />
            </div>
          </div>
        </div>

        {/* Ready to Launch */}
        <div className="flex items-center justify-between">
          <Label htmlFor="ready-to-launch" className="text-sm font-medium">
            Ready-to-Launch Only
          </Label>
          <Switch
            id="ready-to-launch"
            checked={readyToLaunch}
            onCheckedChange={(checked) => {
              setReadyToLaunch(checked);
              updateFilters({ readyToLaunch: checked });
            }}
          />
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 500 || minRating > 0) && (
          <div>
            <Label className="text-sm font-medium mb-2 block">Active Filters</Label>
            <div className="flex flex-wrap gap-1">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="secondary" className="text-xs">
                  {category}
                </Badge>
              ))}
              {(priceRange[0] > 0 || priceRange[1] < 500) && (
                <Badge variant="secondary" className="text-xs">
                  ${priceRange[0]}-${priceRange[1]}
                </Badge>
              )}
              {minRating > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {minRating}+ stars
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FilterSidebar;
