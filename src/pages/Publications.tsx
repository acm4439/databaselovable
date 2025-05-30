
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Database, Search } from 'lucide-react';
import Navigation from '@/components/Navigation';

const dataCollectionTools = [
  {
    id: 1,
    facultyName: 'Dr. Sarah Johnson',
    degree: 'Ph.D.',
    sex: 'Female',
    researchTitle: 'Student Learning Analytics Platform',
    ownership: 'Author',
    dateVenuePresented: '05/15/25',
    datePublished: '2025-05-20',
    journalPublished: 'International Journal of Educational Technology'
  },
  {
    id: 2,
    facultyName: 'Prof. Michael Chen',
    degree: 'Ph.D.',
    sex: 'Male',
    researchTitle: 'Community Energy Usage Assessment',
    ownership: 'Co-Author',
    dateVenuePresented: '05/10/25',
    datePublished: '2025-05-18',
    journalPublished: 'Global Energy Conference 2025'
  },
  {
    id: 3,
    facultyName: 'Dr. Emily Rodriguez',
    degree: 'Ph.D.',
    sex: 'Female',
    researchTitle: 'Social Media Impact Survey',
    ownership: 'Author',
    dateVenuePresented: '05/08/25',
    datePublished: '2025-05-15',
    journalPublished: 'National Psychology Review'
  },
  {
    id: 4,
    facultyName: 'Dr. James Wilson',
    degree: 'Ph.D.',
    sex: 'Male',
    researchTitle: 'Agricultural Data Collection System',
    ownership: 'Co-Author',
    dateVenuePresented: '05/05/25',
    datePublished: '2025-05-12',
    journalPublished: 'Environmental Science Handbook'
  }
];

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getOwnershipColor = (ownership: string) => {
    switch (ownership) {
      case 'Author': return 'bg-blue-100 text-blue-800';
      case 'Co-Author': return 'bg-green-100 text-green-800';
      case 'Editor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = dataCollectionTools.filter(item =>
    item.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.researchTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.journalPublished.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ownership.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Data Collection Tools for Research</h1>
            <p className="text-slate-600">Track data gathering methods and tools used in faculty research</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
        </div>

        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Data Collection Overview
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search data collection tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Name of Faculty</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Degree</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Sex</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Research Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Ownership</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Date & Venue Presented</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Date Published</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Journal Published</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((tool) => (
                    <tr key={tool.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-slate-800">{tool.facultyName}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{tool.degree}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{tool.sex}</td>
                      <td className="py-4 px-4 text-sm text-slate-700 max-w-xs truncate" title={tool.researchTitle}>
                        {tool.researchTitle}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getOwnershipColor(tool.ownership)}>
                          {tool.ownership}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{tool.dateVenuePresented}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{tool.datePublished}</td>
                      <td className="py-4 px-4 text-sm text-slate-600 max-w-xs truncate" title={tool.journalPublished}>
                        {tool.journalPublished}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Publications;
