
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Users, Search, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import FileUpload from '@/components/FileUpload';

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
  const [data, setData] = useState(researchActivities);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleFileUpload = (uploadedData: any[]) => {
    console.log('File uploaded with data:', uploadedData);
    setIsUploadOpen(false);
  };

  const filteredData = data.filter(activity =>
    activity.dateOfActivity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.nameOfActivity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.facilitatorsParticipants.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #C0C7AB 0%, #989F7E 100%)' }}>
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-md">Research Capacity Building Activities</h1>
            <p className="text-white/90 text-lg drop-shadow-sm">Track faculty development and research enhancement programs</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="rso-accent hover:rso-accent-hover text-white shadow-lg font-semibold">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Excel File
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-rso-dark-green">Upload Activity Records</DialogTitle>
                </DialogHeader>
                <FileUpload onFileUpload={handleFileUpload} />
              </DialogContent>
            </Dialog>
            <Button className="rso-dark-green hover:rso-dark-green-hover text-white shadow-lg font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Add New Entry
            </Button>
          </div>
        </div>

        <Card className="bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="rso-medium-green text-white">
            <CardTitle className="text-2xl flex items-center font-bold">
              <Users className="h-6 w-6 mr-3" />
              Research Activities Overview
            </CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rso-dark-green h-5 w-5" />
              <Input
                placeholder="Search research activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white border-rso-light-green text-rso-dark-green placeholder:text-gray-500 focus:border-rso-accent"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="rso-light-green border-b-2 border-rso-medium-green">
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Date of Activity</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Name of Activity</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Venue</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Facilitators/Participants</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Number of Participants</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Activity Report</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((activity, index) => (
                    <tr key={activity.id} className={`border-b border-gray-100 hover:bg-rso-light-green/30 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-5 px-6 text-sm text-rso-dark-green font-medium">{activity.dateOfActivity}</td>
                      <td className="py-5 px-6 text-sm font-semibold text-rso-dark-green max-w-xs">
                        <div className="truncate" title={activity.nameOfActivity}>
                          {activity.nameOfActivity}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green">{activity.venue}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green max-w-xs">
                        <div className="truncate" title={activity.facilitatorsParticipants}>
                          {activity.facilitatorsParticipants}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green font-medium">{activity.numberOfParticipants}</td>
                      <td className="py-5 px-6">
                        <Badge className={`${getStatusColor(activity.activityReport)} border font-medium`}>
                          {activity.activityReport}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-rso-medium-green">
                        <Users className="h-12 w-12 mx-auto mb-4 text-rso-medium-green" />
                        <p className="text-lg font-medium">No records found</p>
                        <p className="text-sm">Try adjusting your search criteria</p>
                      </td>
                    </tr>
                  )}
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
