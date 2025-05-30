
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Users } from 'lucide-react';
import Navigation from '@/components/Navigation';

const researchActivities = [
  {
    id: 1,
    dateOfActivity: '2025-05-15',
    nameOfActivity: 'Advanced Research Methodology Workshop',
    venue: 'University Conference Hall',
    facilitators: 'Dr. Sarah Johnson, Prof. Michael Chen',
    numberOfParticipants: 45,
    activityReport: 'Completed'
  },
  {
    id: 2,
    dateOfActivity: '2025-05-10',
    nameOfActivity: 'Grant Writing Seminar',
    venue: 'Faculty Development Center',
    facilitators: 'Dr. Emily Rodriguez',
    numberOfParticipants: 32,
    activityReport: 'Completed'
  },
  {
    id: 3,
    dateOfActivity: '2025-05-08',
    nameOfActivity: 'Research Ethics Training',
    venue: 'Online Platform',
    facilitators: 'IRB Committee Members',
    numberOfParticipants: 78,
    activityReport: 'Completed'
  },
  {
    id: 4,
    dateOfActivity: '2025-05-05',
    nameOfActivity: 'Data Analysis Workshop',
    venue: 'Computer Lab A',
    facilitators: 'Dr. James Wilson, Teaching Assistants',
    numberOfParticipants: 28,
    activityReport: 'In Progress'
  }
];

const ResearchActivities = () => {
  const getReportColor = (report: string) => {
    switch (report) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Planned': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Research Capacity Building Activities</h1>
            <p className="text-slate-600">Track faculty development and training activities</p>
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
              Activities Overview
            </CardTitle>
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
                  {researchActivities.map((activity) => (
                    <tr key={activity.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-slate-600">{activity.dateOfActivity}</td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-800 max-w-xs truncate" title={activity.nameOfActivity}>
                        {activity.nameOfActivity}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{activity.venue}</td>
                      <td className="py-4 px-4 text-sm text-slate-700 max-w-xs truncate" title={activity.facilitators}>
                        {activity.facilitators}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{activity.numberOfParticipants}</td>
                      <td className="py-4 px-4">
                        <Badge className={getReportColor(activity.activityReport)}>
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
