
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, Star } from 'lucide-react';
import EnhancedAgentCard from '@/components/EnhancedAgentCard';
import FilterSidebar from '@/components/FilterSidebar';
import Header from '@/components/Header';
import { agents } from '@/data/mockData';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    categories: [] as string[],
    priceRange: [0, 500] as number[],
    minRating: 0,
    integrations: { api: false, webhooks: false, zapier: false },
    readyToLaunch: false
  });

  // Mock trending agents (sorted by recent sales growth)
  const trendingAgents = useMemo(() => {
    return [...agents]
      .sort((a, b) => b.purchases - a.purchases)
      .slice(0, 6);
  }, []);

  // Mock personalized recommendations
  const recommendedAgents = useMemo(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.email) return agents.slice(0, 3);
    
    return agents.filter(agent => agent.category === 'content' || agent.category === 'writing').slice(0, 3);
  }, []);

  const filteredAgents = useMemo(() => {
    let filtered = agents.filter(agent => {
      // Search filter
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Category filter
      const matchesCategory = filters.categories.length === 0 || 
                             filters.categories.some(cat => agent.category.includes(cat.toLowerCase().replace(' ', '-')));
      
      // Price filter
      const agentPrice = parseInt(agent.price.replace(/[^0-9]/g, '')) || 0;
      const matchesPrice = agentPrice >= filters.priceRange[0] && agentPrice <= filters.priceRange[1];
      
      // Rating filter
      const matchesRating = !filters.minRating || (agent.rating && agent.rating >= filters.minRating);
      
      // Integration filter
      const hasRequiredIntegrations = !Object.values(filters.integrations).some(Boolean) ||
        (filters.integrations.api && agent.integrations?.includes('API')) ||
        (filters.integrations.webhooks && agent.integrations?.includes('Webhooks')) ||
        (filters.integrations.zapier && agent.integrations?.includes('Zapier'));
      
      // Ready to launch filter
      const matchesReadyToLaunch = !filters.readyToLaunch || agent.isReadyToLaunch;
      
      return matchesSearch && matchesCategory && matchesPrice && matchesRating && 
             hasRequiredIntegrations && matchesReadyToLaunch;
    });

    // Sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
          const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.price.replace(/[^0-9]/g, '')) || 0;
          const priceB = parseInt(b.price.replace(/[^0-9]/g, '')) || 0;
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        // Mock newest first (reverse order)
        filtered.reverse();
        break;
      default: // popularity
        filtered.sort((a, b) => b.purchases - a.purchases);
    }

    return filtered;
  }, [searchTerm, sortBy, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover AI Agents for Every Need
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Connect with powerful AI assistants built by developers worldwide
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for AI agents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trending Agents Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="h-6 w-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Top 10 Agents This Month</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingAgents.map((agent, index) => (
              <div key={agent.id} className="relative">
                {index < 3 && (
                  <Badge className="absolute -top-2 -right-2 z-10 bg-yellow-500 text-yellow-900">
                    #{index + 1}
                  </Badge>
                )}
                <EnhancedAgentCard agent={agent} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Personalized Recommendations */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 mb-8">
            <Star className="h-6 w-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Recommended for You</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedAgents.map((agent) => (
              <EnhancedAgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Catalog with Filters */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">All AI Agents</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                {filteredAgents.length} agents found
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex gap-8">
            {/* Filter Sidebar */}
            <div className="hidden lg:block shrink-0">
              <FilterSidebar onFiltersChange={setFilters} />
            </div>
            
            {/* Agent Grid */}
            <div className="flex-1">
              {filteredAgents.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No agents found</h3>
                  <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAgents.map((agent) => (
                    <EnhancedAgentCard key={agent.id} agent={agent} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">5,000+</div>
              <div className="text-gray-300">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">1,200+</div>
              <div className="text-gray-300">AI Agents</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">$2.5M+</div>
              <div className="text-gray-300">Developer Earnings</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
