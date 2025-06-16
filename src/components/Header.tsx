
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { User, LogOut, Settings, Code } from 'lucide-react';

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          AI Agent Marketplace
        </Link>

        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors">
            Marketplace
          </Link>
          {user && (
            <>
              <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition-colors">
                My Dashboard
              </Link>
              {user.role === 'developer' && (
                <Link to="/developer" className="text-gray-700 hover:text-blue-600 transition-colors">
                  Developer
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white">
                <DropdownMenuItem className="flex items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>{user.email}</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                {user.role === 'developer' && (
                  <DropdownMenuItem 
                    onClick={() => navigate('/developer')}
                    className="flex items-center cursor-pointer"
                  >
                    <Code className="mr-2 h-4 w-4" />
                    <span>Developer Dashboard</span>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={handleLogout}
                  className="flex items-center cursor-pointer text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => navigate('/auth')} className="bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
