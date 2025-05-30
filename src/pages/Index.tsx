
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FileText, Users, Shield, BookOpen, TrendingUp } from 'lucide-react';
import Navigation from '@/components/Navigation';

const chartData = [
  { month: 'Jan', activities: 12, publications: 8, protocols: 5 },
  { month: 'Feb', activities: 15, publications: 12, protocols: 7 },
  { month: 'Mar', activities: 18, publications: 10, protocols: 9 },
  { month: 'Apr', activities: 14, publications: 15, protocols: 6 },
  { month: 'May', activities: 20, publications: 18, protocols: 8 },
  { month: 'Jun', activities: 16, publications: 14, protocols: 4 }
];

const recentUpdates = [
  { type: 'Research Activity', title: 'AI in Education Research Project', faculty: 'Dr. Smith', date: '2025-05-28' },
  { type: 'Publication', title: 'Machine Learning Applications in Healthcare', faculty: 'Prof. Johnson', date: '2025-05-27' },
  { type: 'Ethics Protocol', title: 'Student Learning Behavior Study', faculty: 'Dr. Williams', date: '2025-05-26' },
  { type: 'KPI Update', title: 'Q2 Performance Review', faculty: 'Dr. Brown', date: '2025-05-25' }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Faculty Research Management System</h1>
          <p className="text-slate-600 text-lg">Comprehensive overview of research activities and performance metrics</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Research Activities</CardTitle>
              <Users className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">124</div>
              <p className="text-xs text-slate-500 mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Ethics Protocols</CardTitle>
              <Shield className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">38</div>
              <p className="text-xs text-slate-500 mt-1">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Publications</CardTitle>
              <BookOpen className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">267</div>
              <p className="text-xs text-slate-500 mt-1">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Average KPI Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-800">8.4</div>
              <p className="text-xs text-slate-500 mt-1">+0.3 from last quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Recent Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Research Activity Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="activities" fill="#3b82f6" name="Research Activities" />
                  <Bar dataKey="publications" fill="#8b5cf6" name="Publications" />
                  <Bar dataKey="protocols" fill="#10b981" name="Ethics Protocols" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{update.title}</p>
                      <p className="text-xs text-slate-500">{update.type} • {update.faculty}</p>
                      <p className="text-xs text-slate-400 mt-1">{update.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
