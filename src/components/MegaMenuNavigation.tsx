
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  User, 
  FileText, 
  GraduationCap, 
  TrendingUp,
  Settings,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

const MegaMenuNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      path: '/',
      hasDropdown: false
    },
    {
      id: 'profile',
      label: 'Profile & Research Info',
      icon: User,
      hasDropdown: true,
      items: [
        { label: 'Researcher Profile', path: '/researcher-profile' },
        { label: 'Publications & Presentations', path: '/publications' },
        { label: 'Research Statistics', path: '/research-statistics' }
      ]
    },
    {
      id: 'records',
      label: 'Records Management',
      icon: FileText,
      hasDropdown: true,
      items: [
        { label: 'Data Collection Tools', path: '/data-collection' },
        { label: 'Ethics Reviewed Protocols', path: '/ethics-protocols' }
      ]
    },
    {
      id: 'capacity',
      label: 'Capacity Building',
      icon: GraduationCap,
      hasDropdown: true,
      items: [
        { label: 'Training & Seminars', path: '/training-seminars' }
      ]
    },
    {
      id: 'performance',
      label: 'Performance Tracking',
      icon: TrendingUp,
      hasDropdown: true,
      items: [
        { label: 'Department Overview', path: '/department-overview' }
      ]
    }
  ];

  const handleDropdownToggle = (itemId: string) => {
    setActiveDropdown(activeDropdown === itemId ? null : itemId);
  };

  const isActive = (path: string) => location.pathname === path;

  const isItemActive = (item: any) => {
    if (!item.hasDropdown) {
      return isActive(item.path);
    }
    return item.items?.some((subItem: any) => isActive(subItem.path));
  };

  return (
    <nav className="bg-black shadow-lg border-b border-gray-700">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/RSOLOGO.png" 
                alt="Research Service Office Logo" 
                className="h-10 w-10 object-contain flex-shrink-0"
              />
              <div className="text-xl font-bold text-white whitespace-nowrap">UC RSO</div>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="relative">
                    {item.hasDropdown ? (
                      <Button
                        variant="ghost"
                        className={`flex items-center space-x-1 text-white hover:bg-gray-800 ${
                          activeDropdown === item.id || isItemActive(item) ? 'bg-gray-800' : ''
                        }`}
                        onClick={() => handleDropdownToggle(item.id)}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{item.label}</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    ) : (
                      <Link to={item.path!}>
                        <Button
                          variant="ghost"
                          className={`flex items-center space-x-1 ${
                            isActive(item.path!) 
                              ? 'bg-white text-black' 
                              : 'text-white hover:bg-gray-800'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="text-sm">{item.label}</span>
                        </Button>
                      </Link>
                    )}
                    
                    {/* Dropdown Menu */}
                    {item.hasDropdown && activeDropdown === item.id && (
                      <div className="absolute top-full left-0 mt-1 w-64 bg-gray-900 border border-gray-700 rounded-md shadow-lg z-50">
                        <div className="py-2">
                          {item.items?.map((subItem) => (
                            <Link 
                              key={subItem.path} 
                              to={subItem.path}
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className={`px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                                isActive(subItem.path) ? 'bg-white text-black' : 'text-white'
                              }`}>
                                {subItem.label}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-gray-800"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-700">
            <div className="flex flex-col space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id}>
                    {item.hasDropdown ? (
                      <>
                        <Button
                          variant="ghost"
                          className="w-full justify-start flex items-center space-x-2 text-white hover:bg-gray-800"
                          onClick={() => handleDropdownToggle(item.id)}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                          <ChevronDown className="h-3 w-3 ml-auto" />
                        </Button>
                        {activeDropdown === item.id && (
                          <div className="ml-6 space-y-1">
                            {item.items?.map((subItem) => (
                              <Link 
                                key={subItem.path} 
                                to={subItem.path}
                                onClick={() => {
                                  setIsMobileMenuOpen(false);
                                  setActiveDropdown(null);
                                }}
                              >
                                <div className={`px-4 py-2 text-sm hover:bg-gray-800 rounded transition-colors ${
                                  isActive(subItem.path) ? 'bg-white text-black' : 'text-gray-300'
                                }`}>
                                  {subItem.label}
                                </div>
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link to={item.path!} onClick={() => setIsMobileMenuOpen(false)}>
                        <Button
                          variant="ghost"
                          className={`w-full justify-start flex items-center space-x-2 ${
                            isActive(item.path!) 
                              ? 'bg-white text-black' 
                              : 'text-white hover:bg-gray-800'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Button>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MegaMenuNavigation;
