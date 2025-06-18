
import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, SortAsc } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

// Simple type definition to avoid TypeScript issues
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('INFO')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive"
        });
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: "Error",
        description: "Failed to load products. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category).filter(Boolean))];
    return uniqueCategories;
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = 
        (product.name?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (product.description?.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      
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
        filtered.sort((a, b) => new Date(a.created_at || '').getTime() - new Date(b.created_at || '').getTime());
        break;
      default: // newest
        filtered.sort((a, b) => new Date(b.created_at || '').getTime() - new Date(a.created_at || '').getTime());
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
              placeholder="Search AI agents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12"
            />
          </div>

          {/* Category Filter */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 h-12">
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
            <SelectTrigger className="w-48 h-12">
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

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {filteredAndSortedProducts.length} agent{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Products Grid */}
      {filteredAndSortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {searchTerm || selectedCategory !== 'all' ? 'No agents found' : 'No agents available'}
          </h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Check back later for new AI agents'
            }
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                {/* Product Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg flex items-center justify-center">
                  <div className="text-4xl text-blue-300 group-hover:scale-110 transition-transform duration-200">
                    🤖
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                      {product.name || 'Untitled Agent'}
                    </CardTitle>
                    <Badge variant="secondary" className="font-semibold shrink-0 ml-2">
                      {formatPrice(product.price)}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600 line-clamp-2 min-h-[2.5rem]">
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
