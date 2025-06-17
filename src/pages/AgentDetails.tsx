import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Send, Flag, Users, DollarSign, TrendingUp, Star } from 'lucide-react';
import { agents } from '@/data/mockData';
import { toast } from '@/hooks/use-toast';
import PaymentModal from '@/components/PaymentModal';
import ReviewsSection from '@/components/ReviewsSection';

const AgentDetails = () => {
  const { id } = useParams();
  const agent = agents.find(a => a.id === id);
  const [chatMessages, setChatMessages] = useState([
    { type: 'agent', message: `Hi! I'm ${agent?.name}. ${agent?.demoMessage || 'How can I help you today?'}` }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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

  const handleFlag = () => {
    toast({
      title: "Report Submitted",
      description: "Thank you for reporting this agent. Our moderation team will review it within 24 hours.",
    });
  };

  // Mock public stats
  const weeklyUsers = Math.floor(Math.random() * 2000) + 500;
  const monthlyEarnings = Math.floor(Math.random() * 5000) + 1000;
  const satisfactionRate = (Math.random() * 20 + 80).toFixed(1);

  return (
    <>
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
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant="secondary" className="text-lg px-3 py-1">
                        {agent.price}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={handleFlag}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Flag className="w-4 h-4 mr-1" />
                        Flag
                      </Button>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Badge>{agent.category}</Badge>
                    <Badge variant="outline">{agent.views} views</Badge>
                    <Badge variant="outline">{agent.purchases} purchases</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={() => setShowPaymentModal(true)} 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Purchase Agent
                  </Button>
                </CardContent>
              </Card>

              <Tabs defaultValue="description" className="mt-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="stats">Public Stats</TabsTrigger>
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

                <TabsContent value="reviews" className="mt-4">
                  <ReviewsSection
                    reviews={agent.reviews || []}
                    averageRating={agent.rating || 0}
                    reviewCount={agent.reviewCount || 0}
                  />
                </TabsContent>

                <TabsContent value="stats" className="mt-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center justify-center mb-2">
                            <Users className="h-5 w-5 text-blue-600 mr-2" />
                            <span className="text-sm font-medium text-blue-600">Weekly Users</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{weeklyUsers.toLocaleString()}+</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center justify-center mb-2">
                            <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                            <span className="text-sm font-medium text-green-600">Developer Earnings</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">${monthlyEarnings.toLocaleString()}/month</div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="flex items-center justify-center mb-2">
                            <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                            <span className="text-sm font-medium text-purple-600">Growth Rate</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">+25%</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                          <div className="flex items-center justify-center mb-2">
                            <Star className="h-5 w-5 text-yellow-600 mr-2" />
                            <span className="text-sm font-medium text-yellow-600">Satisfaction</span>
                          </div>
                          <div className="text-2xl font-bold text-gray-900">{satisfactionRate}%</div>
                        </div>
                      </div>
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Usage Insights</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Peak usage hours: 9 AM - 5 PM EST</li>
                          <li>• Most popular features: Text analysis, Grammar correction</li>
                          <li>• Average session length: 12 minutes</li>
                          <li>• Customer retention rate: 89%</li>
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

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        agentName={agent.name}
        price={agent.price}
      />
    </>
  );
};

export default AgentDetails;
