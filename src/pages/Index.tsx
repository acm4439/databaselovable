
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #C0C7AB 0%, #989F7E 100%)' }}>
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-md">Faculty Research Management System</h1>
          <p className="text-white/90 text-lg drop-shadow-sm">Comprehensive overview of research activities and performance metrics</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-2xl border-0 hover:shadow-3xl transition-shadow rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-rso-dark-green">Research Activities</CardTitle>
              <Users className="h-5 w-5 text-rso-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rso-dark-green">124</div>
              <p className="text-xs text-rso-medium-green mt-1">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-2xl border-0 hover:shadow-3xl transition-shadow rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-rso-dark-green">Ethics Protocols</CardTitle>
              <Shield className="h-5 w-5 text-rso-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rso-dark-green">38</div>
              <p className="text-xs text-rso-medium-green mt-1">+5% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-2xl border-0 hover:shadow-3xl transition-shadow rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-rso-dark-green">Publications</CardTitle>
              <BookOpen className="h-5 w-5 text-rso-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rso-dark-green">267</div>
              <p className="text-xs text-rso-medium-green mt-1">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-2xl border-0 hover:shadow-3xl transition-shadow rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-semibold text-rso-dark-green">Average KPI Score</CardTitle>
              <TrendingUp className="h-5 w-5 text-rso-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-rso-dark-green">8.4</div>
              <p className="text-xs text-rso-medium-green mt-1">+0.3 from last quarter</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Recent Updates */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white shadow-2xl border-0 rounded-xl">
            <CardHeader className="rso-light-green">
              <CardTitle className="text-xl text-rso-dark-green font-bold">Research Activity Trends</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="activities" fill="#AC855E" name="Research Activities" />
                  <Bar dataKey="publications" fill="#989F7E" name="Publications" />
                  <Bar dataKey="protocols" fill="#6D7361" name="Ethics Protocols" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-2xl border-0 rounded-xl">
            <CardHeader className="rso-light-green">
              <CardTitle className="text-xl text-rso-dark-green font-bold">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-rso-light-green/20 hover:bg-rso-light-green/30 transition-colors">
                    <FileText className="h-5 w-5 text-rso-accent mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-rso-dark-green truncate">{update.title}</p>
                      <p className="text-xs text-rso-medium-green">{update.type} • {update.faculty}</p>
                      <p className="text-xs text-rso-medium-green/80 mt-1">{update.date}</p>
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
