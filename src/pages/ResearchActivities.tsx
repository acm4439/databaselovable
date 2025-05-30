import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Users, Search } from 'lucide-react';
import Navigation from '@/components/Navigation';

const researchActivities = [
  {
    id: 1,
    dateOfActivity: '2025-05-15',
    nameOfActivity: 'Grant Writing Workshop',
    venue: 'Conference Hall A',
    facilitatorsParticipants: 'Dr. Jane Smith, Faculty Members',
    numberOfParticipants: 30,
    activityReport: 'Completed'
  },
  {
    id: 2,
    dateOfActivity: '2025-05-10',
    nameOfActivity: 'Research Ethics Seminar',
    venue: 'Lecture Room 201',
    facilitatorsParticipants: 'Prof. John Doe, Graduate Students',
    numberOfParticipants: 45,
    activityReport: 'Pending'
  },
  {
    id: 3,
    dateOfActivity: '2025-05-08',
    nameOfActivity: 'Data Analysis Training',
    venue: 'Computer Lab B',
    facilitatorsParticipants: 'Dr. Alice Johnson, Research Assistants',
    numberOfParticipants: 20,
    activityReport: 'Completed'
  },
  {
    id: 4,
    dateOfActivity: '2025-05-05',
    nameOfActivity: 'Qualitative Research Methods',
    venue: 'Seminar Room 1',
    facilitatorsParticipants: 'Prof. Robert Brown, Undergraduate Students',
    numberOfParticipants: 35,
    activityReport: 'Pending'
  }
];

const ResearchActivities = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredData = researchActivities.filter(activity =>
    activity.dateOfActivity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.nameOfActivity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.facilitatorsParticipants.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Research Capacity Building Activities</h1>
            <p className="text-slate-600">Track faculty development and research enhancement programs</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
        </div>

        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Research Activities Overview
            </CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search research activities..."
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
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Date of Activity</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Name of Activity</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Venue</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Facilitators/Participants</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Number of Participants</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Activity Report</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((activity) => (
                    <tr key={activity.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-slate-600">{activity.dateOfActivity}</td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-800 max-w-xs truncate" title={activity.nameOfActivity}>
                        {activity.nameOfActivity}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{activity.venue}</td>
                      <td className="py-4 px-4 text-sm text-slate-600 max-w-xs truncate" title={activity.facilitatorsParticipants}>
                        {activity.facilitatorsParticipants}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{activity.numberOfParticipants}</td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(activity.activityReport)}>
                          {activity.activityReport}
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
