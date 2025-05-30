
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, FileText } from 'lucide-react';
import Navigation from '@/components/Navigation';

const researchActivities = [
  {
    id: 1,
    date: '2025-05-15',
    facultyName: 'Dr. Sarah Johnson',
    researchTitle: 'Machine Learning Applications in Medical Diagnosis',
    department: 'Computer Science',
    subsidyGiven: true,
    status: 'Active',
    scope: 'International'
  },
  {
    id: 2,
    date: '2025-05-10',
    facultyName: 'Prof. Michael Chen',
    researchTitle: 'Sustainable Energy Solutions for Rural Communities',
    department: 'Engineering',
    subsidyGiven: false,
    status: 'Pending Approval',
    scope: 'Local'
  },
  {
    id: 3,
    date: '2025-05-08',
    facultyName: 'Dr. Emily Rodriguez',
    researchTitle: 'Impact of Social Media on Academic Performance',
    department: 'Psychology',
    subsidyGiven: true,
    status: 'Completed',
    scope: 'Local'
  },
  {
    id: 4,
    date: '2025-05-05',
    facultyName: 'Dr. James Wilson',
    researchTitle: 'Climate Change Effects on Agricultural Productivity',
    department: 'Environmental Science',
    subsidyGiven: true,
    status: 'Active',
    scope: 'International'
  }
];

const ResearchActivities = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Pending Approval': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScopeColor = (scope: string) => {
    return scope === 'International' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Research Capacity Building Activities</h1>
            <p className="text-slate-600">Manage and track faculty research projects and initiatives</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
        </div>

        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Research Activities Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Faculty Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Research Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Subsidy</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Scope</th>
                  </tr>
                </thead>
                <tbody>
                  {researchActivities.map((activity) => (
                    <tr key={activity.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-slate-600">{activity.date}</td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-800">{activity.facultyName}</td>
                      <td className="py-4 px-4 text-sm text-slate-700 max-w-xs truncate" title={activity.researchTitle}>
                        {activity.researchTitle}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{activity.department}</td>
                      <td className="py-4 px-4">
                        <Badge variant={activity.subsidyGiven ? "default" : "secondary"}>
                          {activity.subsidyGiven ? 'Yes' : 'No'}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(activity.status)}>
                          {activity.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getScopeColor(activity.scope)}>
                          {activity.scope}
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

export default ResearchActivities;
