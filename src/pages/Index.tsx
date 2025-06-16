
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FileText, Users, BookOpen, TrendingUp, Shield, GraduationCap } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';

const publicationTrendsData = [
  { month: 'Jan', publications: 12, citations: 45 },
  { month: 'Feb', publications: 15, citations: 52 },
  { month: 'Mar', publications: 18, citations: 63 },
  { month: 'Apr', publications: 14, citations: 48 },
  { month: 'May', publications: 20, citations: 71 },
  { month: 'Jun', publications: 16, citations: 55 }
];

const researchDistributionData = [
  { name: 'Computer Science', value: 35, color: '#8884d8' },
  { name: 'Medicine', value: 25, color: '#82ca9d' },
  { name: 'Engineering', value: 20, color: '#ffc658' },
  { name: 'Social Sciences', value: 12, color: '#ff7300' },
  { name: 'Others', value: 8, color: '#00ff00' }
];

const recentActivities = [
  { type: 'Publication', title: 'AI Applications in Healthcare Research', researcher: 'Dr. Sarah Johnson', date: '2025-06-10', status: 'Published' },
  { type: 'Protocol', title: 'Student Learning Behavior Study', researcher: 'Dr. Michael Chen', date: '2025-06-08', status: 'Approved' },
  { type: 'Training', title: 'Research Ethics Workshop', attendees: 45, date: '2025-06-05', status: 'Completed' },
  { type: 'Project', title: 'Machine Learning in Education', researcher: 'Prof. Emily Davis', date: '2025-06-03', status: 'In Progress' }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Research Dashboard</h1>
          <p className="text-gray-400 text-lg">Comprehensive overview of university research activities and performance metrics</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Active Researchers</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">234</div>
              <p className="text-xs text-gray-400">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Publications</CardTitle>
              <BookOpen className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">1,247</div>
              <p className="text-xs text-gray-400">+8% from last quarter</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Active Projects</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">89</div>
              <p className="text-xs text-gray-400">+5 new this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Ethics Protocols</CardTitle>
              <Shield className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">156</div>
              <p className="text-xs text-gray-400">23 pending review</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Training Sessions</CardTitle>
              <GraduationCap className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">42</div>
              <p className="text-xs text-gray-400">687 total attendees</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Avg KPI Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8.6</div>
              <p className="text-xs text-gray-400">+0.4 from last quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Publication Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={publicationTrendsData}>
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
                  <Line type="monotone" dataKey="citations" stroke="#10B981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white">Research Distribution by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={researchDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {researchDistributionData.map((entry, index) => (
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

        {/* Recent Activities */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors">
                  <div className="flex-shrink-0">
                    {activity.type === 'Publication' && <BookOpen className="h-5 w-5 text-blue-400" />}
                    {activity.type === 'Protocol' && <Shield className="h-5 w-5 text-green-400" />}
                    {activity.type === 'Training' && <GraduationCap className="h-5 w-5 text-yellow-400" />}
                    {activity.type === 'Project' && <FileText className="h-5 w-5 text-purple-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white truncate">{activity.title}</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        activity.status === 'Published' ? 'bg-green-600 text-green-100' :
                        activity.status === 'Approved' ? 'bg-blue-600 text-blue-100' :
                        activity.status === 'Completed' ? 'bg-purple-600 text-purple-100' :
                        'bg-yellow-600 text-yellow-100'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.type} • {activity.researcher || `${activity.attendees} attendees`} • {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
