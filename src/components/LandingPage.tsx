
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Clock, 
  Link as LinkIcon, 
  Shield,
  Users,
  Building,
  Code,
  CheckCircle,
  Star,
  Play,
  Sparkles,
  TrendingUp,
  Globe
} from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Tars.pro inspired */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-24 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-blue-100 text-blue-700 hover:bg-blue-100 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              1000+ AI Agents Ready to Deploy
            </Badge>
            
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Deploy AI Agents
              <span className="text-blue-600 block">in Minutes</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              The fastest way to find, test, and integrate powerful AI agents. 
              From content generation to data analysis - deploy enterprise-ready AI in clicks, not months.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/marketplace">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-10 py-4 h-14">
                  Go to Marketplace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="text-lg px-10 py-4 h-14 text-gray-600 hover:text-gray-900">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full bg-blue-500 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-green-500 border-2 border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-purple-500 border-2 border-white"></div>
                </div>
                <span className="font-medium">5,000+ developers</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">4.8/5 average rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-600" />
                <span className="font-medium">Enterprise security</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-purple-200 rounded-full opacity-20"></div>
      </section>

      {/* Benefits Section - Clean and minimal */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Deploy AI solutions faster with our curated marketplace of production-ready agents
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Deployment</h3>
              <p className="text-gray-600">Deploy AI agents in minutes, not months. No complex setup required.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition-colors">
                <Clock className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Time</h3>
              <p className="text-gray-600">Skip development. Use pre-built, tested AI solutions immediately.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition-colors">
                <LinkIcon className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Easy Integration</h3>
              <p className="text-gray-600">Simple APIs and webhooks. Integrate seamlessly with existing tools.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-200 transition-colors">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Enterprise Security</h3>
              <p className="text-gray-600">99.9% uptime with enterprise-grade security and compliance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Simple 3 steps */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started with AI agents in three simple steps
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Discover & Test</h3>
                <p className="text-gray-600">
                  Browse our marketplace. Try live demos to find the perfect AI solution.
                </p>
                {/* Connection line */}
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gray-300"></div>
              </div>
              
              {/* Step 2 */}
              <div className="text-center relative">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Purchase & Deploy</h3>
                <p className="text-gray-600">
                  Buy with one click. Get instant API access and integration guides.
                </p>
                {/* Connection line */}
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gray-300"></div>
              </div>
              
              {/* Step 3 */}
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Integrate & Scale</h3>
                <p className="text-gray-600">
                  Connect to your systems. Monitor performance and scale effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Section - Clean cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Every Team
            </h2>
            <p className="text-xl text-gray-600">
              From individuals to enterprises - find AI solutions that fit your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 hover:shadow-xl transition-shadow border-0 shadow-lg">
              <CardContent className="space-y-6 p-0">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Users className="h-7 w-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Individuals</h3>
                  <p className="text-gray-600 mb-6">
                    Boost your productivity with AI assistants for writing, research, and personal tasks.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Content creation tools</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Personal productivity agents</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Research assistants</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-blue-200 shadow-lg relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                Most Popular
              </Badge>
              <CardContent className="space-y-6 p-0">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
                  <Building className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Small & Medium Business</h3>
                  <p className="text-gray-600 mb-6">
                    Scale operations with AI for customer service, marketing, and analytics.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Customer support automation</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Marketing optimization</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Business intelligence</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 hover:shadow-xl transition-shadow border-0 shadow-lg">
              <CardContent className="space-y-6 p-0">
                <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Code className="h-7 w-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3">Developers</h3>
                  <p className="text-gray-600 mb-6">
                    Build, sell, and integrate AI agents with our developer platform.
                  </p>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Publish & monetize agents</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      <span>RESTful APIs & SDKs</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0" />
                      <span>Developer documentation</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials - Clean and minimal */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers are saying
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="space-y-6 p-0">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  "Saved us 30 hours per week. Content production increased 300% while maintaining quality."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Sarah Johnson</div>
                    <div className="text-sm text-gray-600">Content Manager, TechCorp</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="space-y-6 p-0">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  "Integration was seamless. Customer service bot running in under 15 minutes. Incredible!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Mike Chen</div>
                    <div className="text-sm text-gray-600">CTO, StartupXYZ</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="p-8 border-0 shadow-lg">
              <CardContent className="space-y-6 p-0">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  "Selling AI agents here has been fantastic. Great revenue share and supportive community."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900">Emma Rodriguez</div>
                    <div className="text-sm text-gray-600">AI Developer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
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
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">99.9%</div>
              <div className="text-gray-300">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of businesses using our AI marketplace to automate tasks and boost productivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/marketplace">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-4 h-14">
                Browse Marketplace
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/developer">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600 text-lg px-10 py-4 h-14">
                Become a Seller
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Clean and comprehensive */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-xl font-bold text-white">Marketplace</span>
              </div>
              <p className="text-gray-400 max-w-md">
                The premier destination for AI agents. Deploy powerful AI solutions in minutes, not months.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Globe className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5" />
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="/api" className="hover:text-white transition-colors">API Reference</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6 text-white">Legal</h4>
              <ul className="space-y-3 text-gray-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/security" className="hover:text-white transition-colors">Security</Link></li>
                <li><Link to="/support" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; 2025 AI Marketplace. All rights reserved.
            </p>
            <div className="text-gray-400 text-sm">
              contact@aimarketplace.com • +1 (555) 123-4567
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
