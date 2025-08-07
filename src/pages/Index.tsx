import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FileText, Users, BookOpen, TrendingUp, Shield, GraduationCap } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import React, { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { ref as dbRef, onValue } from 'firebase/database';

interface Researcher {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  specialization: string;
  imageUrl?: string;
  publications?: { [key: string]: any };
}

interface Publication {
  date: string;
  title: string;
  department: string;
  status: string;
  type: string;
  link: string;
  researcherName?: string;
  researcherId?: string;
}

interface Protocol {
  id: string;
  listOfTitle: string;
  department: string;
  dateForwarded: string;
  status: string;
  actionTaken: string;
}

interface TrainingActivity {
  id: string;
  dateOfActivity: string;
  nameOfActivity: string;
  venue: string;
  facilitatorsParticipants: string;
  numberOfParticipants: number;
  activityReport: string;
}

interface DashboardStats {
  totalResearchers: number;
  totalPublications: number;
  totalProtocols: number;
  totalTrainingSessions: number;
  publicationsThisYear: number;
  internationalPublications: number;
  localPublications: number;
  pendingProtocols: number;
  approvedProtocols: number;
  totalTrainingParticipants: number;
}

const Index = () => {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [allPublications, setAllPublications] = useState<Publication[]>([]);
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [trainingActivities, setTrainingActivities] = useState<TrainingActivity[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalResearchers: 0,
    totalPublications: 0,
    totalProtocols: 0,
    totalTrainingSessions: 0,
    publicationsThisYear: 0,
    internationalPublications: 0,
    localPublications: 0,
    pendingProtocols: 0,
    approvedProtocols: 0,
    totalTrainingParticipants: 0,
  });

  // Fetch all data from Firebase
  useEffect(() => {
    // Fetch researchers
    const researchersRef = dbRef(db, 'researchers');
    const unsubResearchers = onValue(researchersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const researchersArray = Object.entries(data).map(([id, val]: any) => ({ id, ...val }));
        setResearchers(researchersArray);
        
        // Extract all publications from researchers
        const publications: Publication[] = [];
        researchersArray.forEach((researcher: Researcher) => {
          if (researcher.publications) {
            Object.values(researcher.publications).forEach((pub: any) => {
              publications.push({
                ...pub,
                researcherName: researcher.name,
                researcherId: researcher.id,
              });
            });
          }
        });
        setAllPublications(publications);
      } else {
        setResearchers([]);
        setAllPublications([]);
      }
    });

    // Fetch protocols
    const protocolsRef = dbRef(db, 'ethicsProtocols');
    const unsubProtocols = onValue(protocolsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const protocolsArray = Object.entries(data).map(([id, val]: any) => ({ id, ...val }));
        setProtocols(protocolsArray);
      } else {
        setProtocols([]);
      }
    });

    // Fetch training activities
    const trainingRef = dbRef(db, 'trainingSeminars');
    const unsubTraining = onValue(trainingRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const trainingArray = Object.entries(data).map(([id, val]: any) => ({ id, ...val }));
        setTrainingActivities(trainingArray);
      } else {
        setTrainingActivities([]);
      }
    });

    return () => {
      unsubResearchers();
      unsubProtocols();
      unsubTraining();
    };
  }, []);

  // Compute statistics whenever data changes
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    
    const newStats: DashboardStats = {
      totalResearchers: researchers.length,
      totalPublications: allPublications.length,
      totalProtocols: protocols.length,
      totalTrainingSessions: trainingActivities.length,
      publicationsThisYear: allPublications.filter(pub => 
        pub.date && new Date(pub.date).getFullYear() === currentYear
      ).length,
      internationalPublications: allPublications.filter(pub => pub.type === 'International').length,
      localPublications: allPublications.filter(pub => pub.type === 'Local').length,
      pendingProtocols: protocols.filter(protocol => protocol.status === 'Under Review').length,
      approvedProtocols: protocols.filter(protocol => protocol.status === 'Approved').length,
      totalTrainingParticipants: trainingActivities.reduce((sum, activity) => sum + (activity.numberOfParticipants || 0), 0),
    };
    
    setStats(newStats);
  }, [researchers, allPublications, protocols, trainingActivities]);

  // Generate publication trends data (last 6 months)
  const generatePublicationTrends = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trends = [];
    const currentDate = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthName = months[monthDate.getMonth()];
      const monthYear = monthDate.getFullYear();
      
      const monthPublications = allPublications.filter(pub => {
        if (!pub.date) return false;
        const pubDate = new Date(pub.date);
        return pubDate.getMonth() === monthDate.getMonth() && pubDate.getFullYear() === monthYear;
      });
      
      trends.push({
        month: monthName,
        publications: monthPublications.length,
        citations: Math.floor(monthPublications.length * 3.5), // Mock citations based on publications
      });
    }
    
    return trends;
  };

  // Generate research distribution by department
  const generateResearchDistribution = () => {
    const departmentCounts: { [key: string]: number } = {};
    
    allPublications.forEach(pub => {
      if (pub.department) {
        departmentCounts[pub.department] = (departmentCounts[pub.department] || 0) + 1;
      }
    });
    
    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00', '#ff0000', '#0000ff'];
    return Object.entries(departmentCounts).map(([name, value], index) => ({
      name,
      value,
      color: colors[index % colors.length],
    }));
  };

  // Generate recent activities
  const generateRecentActivities = () => {
    const activities = [];
    
    // Add recent publications
    const recentPublications = allPublications
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 2);
    
    recentPublications.forEach(pub => {
      activities.push({
        type: 'Publication',
        title: pub.title,
        researcher: pub.researcherName || 'Unknown',
        date: pub.date,
        status: pub.status || 'Published',
      });
    });
    
    // Add recent protocols
    const recentProtocols = protocols
      .sort((a, b) => new Date(b.dateForwarded).getTime() - new Date(a.dateForwarded).getTime())
      .slice(0, 1);
    
    recentProtocols.forEach(protocol => {
      activities.push({
        type: 'Protocol',
        title: protocol.listOfTitle,
        researcher: 'Research Team',
        date: protocol.dateForwarded,
        status: protocol.status,
      });
    });
    
    // Add recent training
    const recentTraining = trainingActivities
      .sort((a, b) => new Date(b.dateOfActivity).getTime() - new Date(a.dateOfActivity).getTime())
      .slice(0, 1);
    
    recentTraining.forEach(training => {
      activities.push({
        type: 'Training',
        title: training.nameOfActivity,
        attendees: training.numberOfParticipants,
        date: training.dateOfActivity,
        status: 'Completed',
      });
    });
    
    return activities.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);
  };

  const publicationTrendsData = generatePublicationTrends();
  const researchDistributionData = generateResearchDistribution();
  const recentActivities = generateRecentActivities();

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Research Dashboard</h1>
          <p className="text-gray-400 text-lg">Comprehensive overview of university research activities and performance metrics</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Active Researchers</CardTitle>
              <Users className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalResearchers}</div>
              <p className="text-xs text-gray-400">Currently registered</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Publications</CardTitle>
              <BookOpen className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalPublications}</div>
              <p className="text-xs text-gray-400">{stats.publicationsThisYear} this year</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Ethics Protocols</CardTitle>
              <Shield className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalProtocols}</div>
              <p className="text-xs text-gray-400">{stats.pendingProtocols} pending review</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Training Sessions</CardTitle>
              <GraduationCap className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stats.totalTrainingSessions}</div>
              <p className="text-xs text-gray-400">{stats.totalTrainingParticipants} total attendees</p>
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
                      color: '#FFF',
                    }} 
                    itemStyle={{ color: '#FFF' }}
                    formatter={(value, name) => [value, name]}
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
                      {activity.type === 'Training' ? 
                        `${activity.attendees} attendees • ${activity.date}` :
                        `${activity.researcher} • ${activity.date}`
                      }
                    </p>
                  </div>
                </div>
              ))}
              {recentActivities.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  No recent activities found.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
