
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  User, 
  ShoppingCart, 
  Bell, 
  Menu,
  X,
  Home,
  Store,
  Code,
  BarChart3
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Marketplace</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link to="/marketplace" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
              <Store className="h-4 w-4" />
              Marketplace
            </Link>
            <Link to="/developer" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
              <Code className="h-4 w-4" />
              For Developers
            </Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Link to="/auth">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <nav className="py-4 space-y-2">
              <Link 
                to="/" 
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </div>
              </Link>
              <Link 
                to="/marketplace" 
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  Marketplace
                </div>
              </Link>
              <Link 
                to="/developer" 
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  For Developers
                </div>
              </Link>
              <Link 
                to="/dashboard" 
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Dashboard
                </div>
              </Link>
              <div className="px-4 py-2">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Sign In
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
