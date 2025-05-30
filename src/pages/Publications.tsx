
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Database } from 'lucide-react';
import Navigation from '@/components/Navigation';

const dataCollectionTools = [
  {
    id: 1,
    facultyName: 'Dr. Sarah Johnson',
    toolUsed: 'Survey Monkey',
    projectTitle: 'Student Learning Analytics Platform',
    department: 'Computer Science',
    dataType: 'Quantitative',
    status: 'Active'
  },
  {
    id: 2,
    facultyName: 'Prof. Michael Chen',
    toolUsed: 'Google Forms',
    projectTitle: 'Community Energy Usage Assessment',
    department: 'Engineering',
    dataType: 'Mixed Methods',
    status: 'Completed'
  },
  {
    id: 3,
    facultyName: 'Dr. Emily Rodriguez',
    toolUsed: 'Qualtrics',
    projectTitle: 'Social Media Impact Survey',
    department: 'Psychology',
    dataType: 'Qualitative',
    status: 'In Progress'
  },
  {
    id: 4,
    facultyName: 'Dr. James Wilson',
    toolUsed: 'REDCap',
    projectTitle: 'Agricultural Data Collection System',
    department: 'Environmental Science',
    dataType: 'Quantitative',
    status: 'Planning'
  }
];

const Publications = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Planning': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDataTypeColor = (type: string) => {
    switch (type) {
      case 'Quantitative': return 'bg-blue-100 text-blue-800';
      case 'Qualitative': return 'bg-purple-100 text-purple-800';
      case 'Mixed Methods': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Faculty Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Tool Used</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Project Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Data Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dataCollectionTools.map((tool) => (
                    <tr key={tool.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-slate-800">{tool.facultyName}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{tool.toolUsed}</td>
                      <td className="py-4 px-4 text-sm text-slate-700 max-w-xs truncate" title={tool.projectTitle}>
                        {tool.projectTitle}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{tool.department}</td>
                      <td className="py-4 px-4">
                        <Badge className={getDataTypeColor(tool.dataType)}>
                          {tool.dataType}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(tool.status)}>
                          {tool.status}
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

export default Publications;
