
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { BookOpen, Users } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import { db } from '@/lib/firebase';
import { ref as dbRef, onValue } from 'firebase/database';

const COLORS = [
  '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F472B6', '#F87171', '#34D399', '#FBBF24'
];

const ResearchStatistics = () => {
  const [researchers, setResearchers] = useState([]);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rRef = dbRef(db, 'researchers');
    const unsub = onValue(rRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const researcherArr = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        setResearchers(researcherArr);
        // Gather all publications
        let allPubs = [];
        researcherArr.forEach(r => {
          if (r.publications) {
            Object.values(r.publications).forEach(pub => {
              allPubs.push({ ...pub, department: r.department });
            });
          }
        });
        setPublications(allPubs);
      } else {
        setResearchers([]);
        setPublications([]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Group publications by year
  const pubsByYear = publications.reduce((acc, pub) => {
    const year = pub.date ? new Date(pub.date).getFullYear() : 'Unknown';
    if (!acc[year]) acc[year] = 0;
    acc[year]++;
    return acc;
  }, {});
  const years = Object.keys(pubsByYear).sort();
  const publicationTrendsData = years.map(year => ({ year, publications: pubsByYear[year] }));

  // Group publications by department
  const pubsByDept = publications.reduce((acc, pub) => {
    const dept = pub.department || 'Unknown';
    if (!acc[dept]) acc[dept] = 0;
    acc[dept]++;
    return acc;
  }, {});
  const departmentData = Object.keys(pubsByDept).map((dept, idx) => ({
    name: dept,
    publications: pubsByDept[dept],
    color: COLORS[idx % COLORS.length],
  }));

  // Calculate total publications
  const totalPublications = publications.length;

  // Calculate active researchers (with at least 1 publication)
  const activeResearchers = researchers.filter(r => r.publications && Object.keys(r.publications).length > 0).length;

  // Calculate % change vs last year for publications and active researchers
  const currentYear = new Date().getFullYear();
  const lastYear = currentYear - 1;
  const pubsThisYear = pubsByYear[currentYear] || 0;
  const pubsLastYear = pubsByYear[lastYear] || 0;
  const pubsPercentChange = pubsLastYear === 0 ? (pubsThisYear > 0 ? 100 : 0) : ((pubsThisYear - pubsLastYear) / pubsLastYear) * 100;

  // Active researchers this year vs last year
  const activeResearchersThisYear = researchers.filter(r => {
    if (!r.publications) return false;
    return Object.values(r.publications).some(pub => {
      if (!pub.date) return false;
      return new Date(pub.date).getFullYear() === currentYear;
    });
  }).length;
  const activeResearchersLastYear = researchers.filter(r => {
    if (!r.publications) return false;
    return Object.values(r.publications).some(pub => {
      if (!pub.date) return false;
      return new Date(pub.date).getFullYear() === lastYear;
    });
  }).length;
  const activeResearchersPercentChange = activeResearchersLastYear === 0 ? (activeResearchersThisYear > 0 ? 100 : 0) : ((activeResearchersThisYear - activeResearchersLastYear) / activeResearchersLastYear) * 100;

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Research Statistics</h1>
          <p className="text-gray-400 text-lg">Comprehensive analytics and insights into research performance and trends</p>
        </div>
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Publications</p>
                  <p className="text-2xl font-bold text-white">{loading ? '...' : totalPublications}</p>
                  <p className="text-xs text-green-400">{loading ? '' : `${pubsPercentChange >= 0 ? '+' : ''}${pubsPercentChange.toFixed(1)}% vs last year`}</p>
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
                  <p className="text-2xl font-bold text-white">{loading ? '...' : activeResearchers}</p>
                  <p className="text-xs text-green-400">{loading ? '' : `${activeResearchersPercentChange >= 0 ? '+' : ''}${activeResearchersPercentChange.toFixed(1)}% vs last year`}</p>
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
                  <YAxis stroke="#9CA3AF" allowDecimals={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                    formatter={(value, name) => [value, 'Publications']}
                  />
                  <Area type="monotone" dataKey="publications" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                </AreaChart>
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
      </div>
    </div>
  );
};

export default ResearchStatistics;
