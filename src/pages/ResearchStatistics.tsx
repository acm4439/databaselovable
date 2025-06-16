
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { TrendingUp, BookOpen, Users, Award } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';

const publicationTrendsData = [
  { year: '2019', publications: 45, citations: 234 },
  { year: '2020', publications: 52, citations: 298 },
  { year: '2021', publications: 67, citations: 456 },
  { year: '2022', publications: 78, citations: 567 },
  { year: '2023', publications: 89, citations: 678 },
  { year: '2024', publications: 94, citations: 723 }
];

const departmentData = [
  { name: 'Computer Science', publications: 234, researchers: 45, color: '#3B82F6' },
  { name: 'Medicine', publications: 189, researchers: 38, color: '#10B981' },
  { name: 'Engineering', publications: 156, researchers: 32, color: '#F59E0B' },
  { name: 'Psychology', publications: 123, researchers: 28, color: '#EF4444' },
  { name: 'Chemistry', publications: 98, researchers: 22, color: '#8B5CF6' },
  { name: 'Physics', publications: 87, researchers: 19, color: '#06B6D4' }
];

const monthlyData = [
  { month: 'Jan', publications: 8, presentations: 12, grants: 3 },
  { month: 'Feb', publications: 12, presentations: 15, grants: 5 },
  { month: 'Mar', publications: 15, presentations: 18, grants: 4 },
  { month: 'Apr', publications: 11, presentations: 14, grants: 6 },
  { month: 'May', publications: 18, presentations: 22, grants: 7 },
  { month: 'Jun', publications: 16, presentations: 19, grants: 5 }
];

const ResearchStatistics = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Research Statistics</h1>
          <p className="text-gray-400 text-lg">Comprehensive analytics and insights into research performance and trends</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Publications</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                  <p className="text-xs text-green-400">+12% vs last year</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Citations</p>
                  <p className="text-2xl font-bold text-white">18,456</p>
                  <p className="text-xs text-green-400">+24% vs last year</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">H-Index Average</p>
                  <p className="text-2xl font-bold text-white">23.4</p>
                  <p className="text-xs text-green-400">+2.1 vs last year</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Active Researchers</p>
                  <p className="text-2xl font-bold text-white">234</p>
                  <p className="text-xs text-green-400">+18 new this year</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Publication Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={publicationTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Area type="monotone" dataKey="publications" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="citations" stackId="2" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Publications by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={departmentData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9CA3AF" />
                  <YAxis dataKey="name" type="category" stroke="#9CA3AF" width={100} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="publications" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Monthly Research Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Line type="monotone" dataKey="publications" stroke="#3B82F6" strokeWidth={2} />
                  <Line type="monotone" dataKey="presentations" stroke="#10B981" strokeWidth={2} />
                  <Line type="monotone" dataKey="grants" stroke="#F59E0B" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Department Research Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="publications"
                    label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResearchStatistics;
