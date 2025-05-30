
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, BookOpen, Search } from 'lucide-react';
import Navigation from '@/components/Navigation';

const publicationsData = [
  {
    id: 1,
    dateOfApplication: '2025-05-15',
    facultyName: 'Dr. Sarah Johnson',
    titleOfPaper: 'Machine Learning Applications in Educational Assessment',
    department: 'Computer Science',
    researchSubsidy: 20000,
    status: 'Approved',
    scope: 'International'
  },
  {
    id: 2,
    dateOfApplication: '2025-05-10',
    facultyName: 'Prof. Michael Chen',
    titleOfPaper: 'Sustainable Energy Solutions for Rural Communities',
    department: 'Engineering',
    researchSubsidy: 15500,
    status: 'Under Review',
    scope: 'Local'
  },
  {
    id: 3,
    dateOfApplication: '2025-05-08',
    facultyName: 'Dr. Emily Rodriguez',
    titleOfPaper: 'Impact of Social Media on Student Mental Health',
    department: 'Psychology',
    researchSubsidy: 9300,
    status: 'Approved',
    scope: 'International'
  },
  {
    id: 4,
    dateOfApplication: '2025-05-05',
    facultyName: 'Dr. James Wilson',
    titleOfPaper: 'Climate Change Effects on Agricultural Productivity',
    department: 'Environmental Science',
    researchSubsidy: 12750,
    status: 'Rejected',
    scope: 'Local'
  }
];

const DataCollection = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'International': return 'bg-blue-100 text-blue-800';
      case 'Local': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = publicationsData.filter(item =>
    item.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.titleOfPaper.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Publications and Presentations</h1>
            <p className="text-slate-600">Track faculty scholarly outputs and research dissemination</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
        </div>

        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Publications Overview
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search publications..."
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
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Date of Application</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Name of Faculty/Research Worker</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Title of Paper</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Research Subsidy</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Local/International</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((publication) => (
                    <tr key={publication.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-slate-600">{publication.dateOfApplication}</td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-800">{publication.facultyName}</td>
                      <td className="py-4 px-4 text-sm text-slate-700 max-w-xs truncate" title={publication.titleOfPaper}>
                        {publication.titleOfPaper}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{publication.department}</td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-800">
                        ₱{publication.researchSubsidy.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(publication.status)}>
                          {publication.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getScopeColor(publication.scope)}>
                          {publication.scope}
                        </Badge>
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

export default DataCollection;
