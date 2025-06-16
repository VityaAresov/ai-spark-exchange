
import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import AgentCard from '@/components/AgentCard';
import Header from '@/components/Header';
import { agents } from '@/data/mockData';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');

  const categories = ['all', 'writing', 'analytics', 'content', 'productivity', 'customer-service'];

  const filteredAgents = useMemo(() => {
    return agents.filter(agent => {
      const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           agent.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
      
      let matchesPrice = true;
      if (priceFilter === 'free') {
        matchesPrice = agent.price.toLowerCase().includes('free');
      } else if (priceFilter === 'under-10') {
        const price = parseInt(agent.price.replace(/[^0-9]/g, ''));
        matchesPrice = price < 10;
      } else if (priceFilter === 'over-10') {
        const price = parseInt(agent.price.replace(/[^0-9]/g, ''));
        matchesPrice = price >= 10;
      }
      
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, selectedCategory, priceFilter]);

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

      {/* Filters Section */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Price</label>
                <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="free">Free</SelectItem>
                    <SelectItem value="under-10">Under $10</SelectItem>
                    <SelectItem value="over-10">$10 and above</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {filteredAgents.length} agents found
              </span>
              {(searchTerm || selectedCategory !== 'all' || priceFilter !== 'all') && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setPriceFilter('all');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Agent Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredAgents.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No agents found</h3>
              <p className="text-gray-500">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Browse by Category</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.slice(1).map(category => {
              const count = agents.filter(agent => agent.category === category).length;
              return (
                <Badge 
                  key={category}
                  variant="outline" 
                  className="text-lg px-4 py-2 cursor-pointer hover:bg-blue-50 hover:border-blue-300"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)} ({count})
                </Badge>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
