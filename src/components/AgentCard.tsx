
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    views: number;
    purchases: number;
  };
}

const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200 bg-white">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{agent.name}</CardTitle>
          <Badge variant="secondary" className="font-semibold">
            {agent.price}
          </Badge>
        </div>
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
        <Link to={`/agent/${agent.id}`}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Test Agent
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
