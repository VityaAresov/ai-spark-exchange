
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send } from 'lucide-react';
import { agents } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';

const AgentDetails = () => {
  const { id } = useParams();
  const agent = agents.find(a => a.id === id);
  const [chatMessages, setChatMessages] = useState([
    { type: 'agent', message: `Hi! I'm ${agent?.name}. ${agent?.demoMessage || 'How can I help you today?'}` }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Agent Not Found</h1>
          <Link to="/" className="text-blue-600 hover:text-blue-800">← Back to Marketplace</Link>
        </div>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    setChatMessages(prev => [...prev, { type: 'user', message: currentMessage }]);
    setCurrentMessage('');
    
    // Simulate agent response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        type: 'agent', 
        message: agent.sampleResponse || 'Thank you for your message! This is a demo response.'
      }]);
    }, 1000);
  };

  const handlePurchase = () => {
    toast({
      title: "Purchase Successful!",
      description: `You have successfully purchased ${agent.name} for ${agent.price}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Agent Info */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl">{agent.name}</CardTitle>
                    <CardDescription className="text-lg mt-2">{agent.description}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="text-lg px-3 py-1">
                    {agent.price}
                  </Badge>
                </div>
                <div className="flex gap-2 mt-4">
                  <Badge>{agent.category}</Badge>
                  <Badge variant="outline">{agent.views} views</Badge>
                  <Badge variant="outline">{agent.purchases} purchases</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button onClick={handlePurchase} className="w-full bg-blue-600 hover:bg-blue-700">
                  Purchase Agent
                </Button>
              </CardContent>
            </Card>

            <Tabs defaultValue="description" className="mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="documentation">Documentation</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-gray-700 leading-relaxed">
                      {agent.fullDescription || agent.description}
                    </p>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {agent.features?.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        )) || [
                          'AI-powered responses',
                          'Fast processing',
                          'Easy integration',
                          '24/7 availability'
                        ]}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="documentation" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-3">API Usage</h4>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <code className="text-sm">
                        POST /api/agents/{agent.id}/chat<br/>
                        Content-Type: application/json<br/><br/>
                        {JSON.stringify({ message: "Your input here" }, null, 2)}
                      </code>
                    </div>
                    <h4 className="font-semibold mb-3 mt-6">Response Format</h4>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      <code className="text-sm">
                        {JSON.stringify({ response: "Agent response here", status: "success" }, null, 2)}
                      </code>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Demo Chat */}
          <div>
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Try {agent.name}</CardTitle>
                <CardDescription>Test the agent with your own messages</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4">
                  <div className="space-y-4">
                    {chatMessages.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-4 py-2 rounded-lg ${
                            msg.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white border shadow-sm'
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDetails;
