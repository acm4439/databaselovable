
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Database, 
  Shield, 
  BookOpen, 
  TrendingUp,
  Menu,
  X
} from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/research-activities', label: 'Research Capacity Building', icon: Users },
    { path: '/data-collection', label: 'Data Collection Tools', icon: Database },
    { path: '/ethics-protocols', label: 'Ethics Reviewed Protocols', icon: Shield },
    { path: '/publications', label: 'Publications and Presentations', icon: BookOpen },
    { path: '/kpi-records', label: 'KPI Records', icon: TrendingUp },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-xl border-b-2 border-rso-light-green">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/8165a96b-bd3e-4e12-af41-750d2fc8fefc.png" 
                alt="Research Service Office Logo" 
                className="h-12 w-12 object-contain"
              />
              <div className="text-2xl font-bold text-rso-dark-green">RSO</div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path}>
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className={`flex items-center space-x-2 font-medium ${
                        isActive(item.path) 
                          ? 'rso-dark-green text-white hover:rso-dark-green-hover shadow-md' 
                          : 'text-rso-dark-green hover:text-white hover:bg-rso-medium-green'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm">{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-rso-dark-green hover:bg-rso-light-green"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-rso-light-green">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant={isActive(item.path) ? "default" : "ghost"}
                      className={`w-full justify-start flex items-center space-x-2 font-medium ${
                        isActive(item.path) 
                          ? 'rso-dark-green text-white hover:rso-dark-green-hover' 
                          : 'text-rso-dark-green hover:text-white hover:bg-rso-medium-green'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
