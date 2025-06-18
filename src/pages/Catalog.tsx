
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Search, Filter, SortAsc, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

type Product = {
  id: number;
  name: string | null;
  description: string | null;
  price: number | null;
  category: string | null;
  type: string;
  user_id: string | null;
  created_at: string | null;
};

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [retryCount, setRetryCount] = useState(0);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products from Supabase...');
      setLoading(true);
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('"INFO"')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        console.error('Supabase fetch error:', fetchError);
        throw new Error(fetchError.message || 'Failed to fetch products');
      }

      console.log('Products fetched successfully:', data?.length || 0, 'items');
      setProducts(data || []);
      
      if (retryCount > 0) {
        toast({
          title: "Products Loaded",
          description: "Successfully loaded the marketplace products.",
        });
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load products';
      setError(errorMessage);
      toast({
        title: "Error Loading Products",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    fetchProducts();
  };

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(
      products
        .map(p => p.category)
        .filter(Boolean)
        .filter(cat => cat.trim() !== '')
    )];
    return uniqueCategories.sort();
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search filter
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = !searchLower || 
        (product.name?.toLowerCase().includes(searchLower)) ||
        (product.description?.toLowerCase().includes(searchLower)) ||
        (product.category?.toLowerCase().includes(searchLower));
      
      // Category filter
      const matchesCategory = selectedCategory === 'all' || 
        product.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort products
    switch (sortBy) {
      case 'name':
        filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        break;
      case 'price-low':
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'oldest':
        filtered.sort((a, b) => 
          new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime()
        );
        break;
      default: // newest
        filtered.sort((a, b) => 
          new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime()
        );
    }

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const formatPrice = (price: number | null) => {
    if (!price) return 'Free';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section Skeleton */}
        <div className="mb-8">
          <Skeleton className="h-12 w-96 mb-4" />
          <Skeleton className="h-6 w-128 mb-8" />
          
          {/* Search and Filters Skeleton */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 w-48" />
            <Skeleton className="h-12 w-48" />
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive" className="max-w-2xl mx-auto">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <div className="mb-4">
              <strong>Failed to load marketplace:</strong> {error}
            </div>
            <Button onClick={handleRetry} variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AI Agent Marketplace</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover and deploy powerful AI agents for your business needs
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search AI agents by name, description, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48 h-12">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 h-12">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results Count and Active Filters */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
          <p className="text-gray-600">
            {filteredAndSortedProducts.length} agent{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
            {products.length > 0 && filteredAndSortedProducts.length !== products.length && 
              ` (filtered from ${products.length} total)`
            }
          </p>
          
          {/* Active Filters Display */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-gray-500">Active filters:</span>
              {searchTerm && (
                <Badge variant="secondary" className="text-xs">
                  Search: "{searchTerm}"
                </Badge>
              )}
              {selectedCategory !== 'all' && (
                <Badge variant="secondary" className="text-xs">
                  Category: {selectedCategory}
                </Badge>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-xs h-6 px-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🤖</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {searchTerm || selectedCategory !== 'all' ? 'No agents found' : 'No agents available'}
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filters to find what you\'re looking for' 
              : 'Check back later for new AI agents or be the first to add one!'
            }
          </p>
          {(searchTerm || selectedCategory !== 'all') && (
            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Show all agents
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer group border-gray-200 hover:border-blue-300">
                {/* Product Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg flex items-center justify-center relative overflow-hidden">
                  <div className="text-4xl text-blue-300 group-hover:scale-110 transition-transform duration-200">
                    🤖
                  </div>
                  {product.price === 0 && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white">FREE</Badge>
                    </div>
                  )}
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-lg line-clamp-1 group-hover:text-blue-600 transition-colors flex-1">
                      {product.name || 'Untitled Agent'}
                    </CardTitle>
                    <Badge variant="secondary" className="font-semibold shrink-0 text-xs">
                      {formatPrice(product.price)}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 line-clamp-2 min-h-[2.5rem] text-sm">
                    {product.description || 'No description available'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs">
                      {product.category || 'General'}
                    </Badge>
                    <div className="text-xs text-gray-500">
                      {product.created_at ? new Date(product.created_at).toLocaleDateString() : ''}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Catalog;
