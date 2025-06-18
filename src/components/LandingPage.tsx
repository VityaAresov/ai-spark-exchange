
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Bot, Zap, Shield, Users, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

type FeaturedProduct = {
  id: number;
  name: string | null;
  description: string | null;
  price: number | null;
  category: string | null;
};

const LandingPage = () => {
  const { user } = useAuth();
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchFeaturedProducts();
    fetchProductCount();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await supabase
        .from('INFO')
        .select('id, name, description, price, category')
        .limit(3);
      
      if (data) {
        setFeaturedProducts(data);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
    }
  };

  const fetchProductCount = async () => {
    try {
      const { count } = await supabase
        .from('INFO')
        .select('*', { count: 'exact', head: true });
      
      if (count !== null) {
        setTotalProducts(count);
      }
    } catch (error) {
      console.error('Error fetching product count:', error);
    }
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'Free';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <Bot className="w-4 h-4 mr-2" />
              AI-Powered Marketplace
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Discover Powerful
              <span className="text-blue-600 block">AI Agents</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Browse, test, and deploy cutting-edge AI agents that automate your workflows, 
              boost productivity, and transform your business operations.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/catalog">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                Browse Marketplace
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {!user && (
              <Link to="/auth">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  Get Started Free
                </Button>
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{totalProducts}+</div>
              <div className="text-gray-600">AI Agents Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Why Choose Our AI Marketplace?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built for developers, designed for businesses, trusted by thousands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Deploy AI agents in seconds with our optimized infrastructure.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle>Enterprise Security</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Bank-grade security with SOC 2 compliance and end-to-end encryption.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Community Driven</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join thousands of developers building the future of AI automation.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle>Proven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Our agents have processed millions of tasks with 99.9% accuracy.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Featured AI Agents
              </h2>
              <p className="text-xl text-gray-600">
                Discover some of our most popular and powerful AI agents
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {featuredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer group">
                    <div className="h-48 bg-gradient-to-br from-blue-50 to-blue-100 rounded-t-lg flex items-center justify-center">
                      <div className="text-4xl text-blue-300 group-hover:scale-110 transition-transform duration-200">
                        🤖
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                          {product.name || 'Untitled Agent'}
                        </CardTitle>
                        <Badge variant="secondary" className="font-semibold">
                          {formatPrice(product.price)}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {product.description || 'No description available'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge variant="outline" className="text-xs">
                        {product.category || 'General'}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="text-center">
              <Link to="/catalog">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  View All Agents
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Automate Your Workflow?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using AI agents to streamline operations and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/catalog">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                Explore Marketplace
              </Button>
            </Link>
            {!user && (
              <Link to="/auth">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600">
                  Sign Up Free
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
