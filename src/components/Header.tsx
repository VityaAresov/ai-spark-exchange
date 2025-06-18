
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Menu,
  X,
  Home,
  Store,
  Plus,
  LogOut,
  UserCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, userRole, signOut } = useAuth();
  
  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
  };

  const canAddProducts = userRole === 'seller' || userRole === 'admin';

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
            <Link to="/" className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors">
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link to="/catalog" className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors">
              <Store className="h-4 w-4" />
              Marketplace
            </Link>
            {canAddProducts && (
              <Link to="/add-product" className="text-gray-600 hover:text-blue-600 flex items-center gap-2 transition-colors">
                <Plus className="h-4 w-4" />
                Add Product
              </Link>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{user.email}</span>
                  {userRole && (
                    <Badge variant="outline" className="text-xs">
                      {userRole}
                    </Badge>
                  )}
                </div>
                <Link to="/profile">
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="icon" onClick={handleSignOut}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
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
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Home
                </div>
              </Link>
              <Link 
                to="/catalog" 
                className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Store className="h-4 w-4" />
                  Marketplace
                </div>
              </Link>
              {canAddProducts && (
                <Link 
                  to="/add-product" 
                  className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 rounded transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Product
                  </div>
                </Link>
              )}
              
              <div className="px-4 py-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span>{user.email}</span>
                      {userRole && (
                        <Badge variant="outline" className="text-xs">
                          {userRole}
                        </Badge>
                      )}
                    </div>
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full justify-start">
                        <UserCircle className="h-4 w-4 mr-2" />
                        My Profile
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Sign Up
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
