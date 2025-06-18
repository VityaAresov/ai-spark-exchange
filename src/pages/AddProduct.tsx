
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const AddProduct = () => {
  const navigate = useNavigate();
  const { user, userRole } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'USD',
    category: '',
    vendor: '',
    demo_url: '',
    integration: '',
    type: 'agent'
  });

  useEffect(() => {
    // Check if user has permission to access this page
    if (userRole && !['seller', 'admin'].includes(userRole)) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to add products.",
        variant: "destructive"
      });
      navigate('/');
    }
  }, [userRole, navigate]);

  const categories = [
    'content',
    'analytics',
    'marketing',
    'support',
    'productivity',
    'automation',
    'finance',
    'development'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add a product.",
        variant: "destructive"
      });
      return;
    }

    if (!['seller', 'admin'].includes(userRole || '')) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to add products.",
        variant: "destructive"
      });
      return;
    }

    // Validate required fields
    if (!formData.name || !formData.description || !formData.price || !formData.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const priceInCents = Math.round(parseFloat(formData.price) * 100);
      
      const productData = {
        name: formData.name,
        description: formData.description,
        price: priceInCents,
        currency: formData.currency,
        category: formData.category,
        vendor: formData.vendor || null,
        demo_url: formData.demo_url || null,
        integration: formData.integration || null,
        type: formData.type,
        user_id: user.id,
        status: 'active'
      };

      const { data, error } = await supabase
        .from('"INFO"')
        .insert(productData)
        .select()
        .single();

      if (error) {
        console.error('Error adding product:', error);
        toast({
          title: "Error",
          description: "Failed to add product. Please try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Success",
          description: "Product added successfully!",
        });
        navigate(`/product/${data.id}`);
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Show access denied if user doesn't have permission
  if (userRole && !['seller', 'admin'].includes(userRole)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Access Denied</h3>
          <p className="text-gray-500">You do not have permission to add products.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Link to="/catalog" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Catalog
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Product
          </CardTitle>
          <CardDescription>
            Create a new AI agent listing for the marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Content Writer AI"
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what your AI agent does and how it helps users..."
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price (USD) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="29.99"
                  required
                />
              </div>

              <div>
                <Label htmlFor="vendor">Vendor/Company</Label>
                <Input
                  id="vendor"
                  value={formData.vendor}
                  onChange={(e) => handleInputChange('vendor', e.target.value)}
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="demo_url">Demo URL</Label>
                <Input
                  id="demo_url"
                  type="url"
                  value={formData.demo_url}
                  onChange={(e) => handleInputChange('demo_url', e.target.value)}
                  placeholder="https://demo.example.com"
                />
              </div>

              <div>
                <Label htmlFor="integration">Integration</Label>
                <Input
                  id="integration"
                  value={formData.integration}
                  onChange={(e) => handleInputChange('integration', e.target.value)}
                  placeholder="API, Webhook, etc."
                />
              </div>
            </div>

            <div>
              <Label htmlFor="type">Product Type</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="agent">AI Agent</SelectItem>
                  <SelectItem value="tool">AI Tool</SelectItem>
                  <SelectItem value="service">AI Service</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4">
              <Button 
                type="submit" 
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate('/catalog')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddProduct;
