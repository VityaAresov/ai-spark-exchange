
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import PaymentModal from './PaymentModal';

interface EnhancedAgentCardProps {
  agent: {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    views: number;
    purchases: number;
    rating?: number;
    reviewCount?: number;
    thumbnail?: string;
    hasFreeTrial?: boolean;
    integrations?: string[];
    isReadyToLaunch?: boolean;
  };
}

const EnhancedAgentCard = ({ agent }: EnhancedAgentCardProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <Card className="h-full hover:shadow-lg transition-all duration-200 bg-white group overflow-hidden">
        {/* Thumbnail */}
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100 overflow-hidden">
          {agent.thumbnail ? (
            <img
              src={agent.thumbnail}
              alt={agent.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-6xl text-blue-300">🤖</div>
            </div>
          )}
          
          {/* Badges overlay */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {agent.isReadyToLaunch && (
              <Badge className="bg-green-500 text-white text-xs">Ready to Launch</Badge>
            )}
            {agent.hasFreeTrial && (
              <Badge variant="secondary" className="text-xs">7-day trial</Badge>
            )}
          </div>
          
          {/* Integration icons */}
          {agent.integrations && agent.integrations.length > 0 && (
            <div className="absolute top-2 right-2">
              <Badge variant="outline" className="text-xs bg-white/90">
                +{agent.integrations.length} integrations
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl line-clamp-1">{agent.name}</CardTitle>
            <Badge variant="secondary" className="font-semibold shrink-0">
              {agent.price}
            </Badge>
          </div>
          
          {/* Rating and reviews */}
          {agent.rating && (
            <div className="flex items-center gap-2">
              {renderStars(agent.rating)}
              <span className="text-sm text-gray-600">
                ({agent.reviewCount || 0} reviews)
              </span>
            </div>
          )}
          
          <CardDescription className="text-gray-600 line-clamp-2">
            {agent.description}
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Badge variant="outline">{agent.category}</Badge>
            <div className="text-sm text-gray-500">
              {agent.views} views • {agent.purchases} purchases
            </div>
          </div>
          
          {/* Integration badges */}
          {agent.integrations && agent.integrations.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {agent.integrations.slice(0, 3).map((integration) => (
                <Badge key={integration} variant="outline" className="text-xs">
                  {integration}
                </Badge>
              ))}
              {agent.integrations.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{agent.integrations.length - 3} more
                </Badge>
              )}
            </div>
          )}
          
          <div className="flex gap-2">
            <Link to={`/agent/${agent.id}`} className="flex-1">
              <Button variant="outline" className="w-full">
                Try Demo
              </Button>
            </Link>
            <Button 
              onClick={() => setShowPaymentModal(true)}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Buy Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        agentName={agent.name}
        price={agent.price}
      />
    </>
  );
};

export default EnhancedAgentCard;
