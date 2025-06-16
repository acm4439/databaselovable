
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Calendar, Plus } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import FileUpload from '@/components/FileUpload';

const mockTrainingData = [
  {
    id: 1,
    dateOfActivity: "2024-03-15",
    nameOfActivity: "Research Ethics and Data Privacy Workshop",
    venue: "Conference Room A, Main Building",
    facilitatorsParticipants: "Dr. Sarah Johnson, Prof. Michael Chen",
    numberOfParticipants: 45,
    activityReport: "Comprehensive workshop on ethical research practices and GDPR compliance"
  },
  {
    id: 2,
    dateOfActivity: "2024-02-28",
    nameOfActivity: "Statistical Analysis Using R Programming",
    venue: "Computer Laboratory 2",
    facilitatorsParticipants: "Dr. Emily Davis, Dr. Robert Wilson",
    numberOfParticipants: 32,
    activityReport: "Hands-on training covering descriptive and inferential statistics in R"
  },
  {
    id: 3,
    dateOfActivity: "2024-02-10",
    nameOfActivity: "Grant Writing Workshop",
    venue: "Auditorium B",
    facilitatorsParticipants: "Prof. Lisa Anderson, Dr. John Thompson",
    numberOfParticipants: 67,
    activityReport: "Strategic workshop on writing successful research grant proposals"
  },
  {
    id: 4,
    dateOfActivity: "2024-01-25",
    nameOfActivity: "Scientific Writing and Publication",
    venue: "Library Meeting Room",
    facilitatorsParticipants: "Dr. Maria Garcia, Dr. David Lee",
    numberOfParticipants: 28,
    activityReport: "Training on academic writing, journal selection, and peer review process"
  },
  {
    id: 5,
    dateOfActivity: "2024-01-18",
    nameOfActivity: "Digital Research Tools and Methodologies",
    venue: "Technology Center",
    facilitatorsParticipants: "Dr. Alex Rodriguez, Prof. Jennifer Kim",
    numberOfParticipants: 54,
    activityReport: "Introduction to digital humanities tools and online research methodologies"
  }
];

const TrainingSeminars = () => {
  const handleFileUpload = (data: any[]) => {
    console.log('Uploaded training data:', data);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Training & Seminars</h1>
          <p className="text-gray-400 text-lg">Organize and manage training sessions and educational seminars</p>
        </div>

        {/* Add New Training Form */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add New Training Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="activityDate" className="text-gray-200">Date of Activity</Label>
                <Input id="activityDate" type="date" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="activityName" className="text-gray-200">Name of Activity</Label>
                <Input id="activityName" placeholder="Workshop/Seminar name" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="venue" className="text-gray-200">Venue</Label>
                <Input id="venue" placeholder="Location/Room" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="facilitators" className="text-gray-200">Facilitators/Participants</Label>
                <Input id="facilitators" placeholder="Names of facilitators" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="participants" className="text-gray-200">Number of Participants</Label>
                <Input id="participants" type="number" placeholder="0" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="report" className="text-gray-200">Activity Report</Label>
                <Input id="report" placeholder="Brief description of the activity" className="bg-gray-700 border-gray-600 text-white" />
              </div>
            </div>
            <Button className="bg-white text-black hover:bg-gray-200 flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Schedule Training</span>
            </Button>
          </CardContent>
        </Card>

        {/* File Upload */}
        <div className="mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {/* Training Activities Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Training Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-200">Date of Activity</TableHead>
                    <TableHead className="text-gray-200">Name of Activity</TableHead>
                    <TableHead className="text-gray-200">Venue</TableHead>
                    <TableHead className="text-gray-200">Facilitators/Participants</TableHead>
                    <TableHead className="text-gray-200">Number of Participants</TableHead>
                    <TableHead className="text-gray-200">Activity Report</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockTrainingData.map((training) => (
                    <TableRow key={training.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-white font-medium">{training.dateOfActivity}</TableCell>
                      <TableCell className="text-gray-300 max-w-xs">
                        <div className="truncate" title={training.nameOfActivity}>
                          {training.nameOfActivity}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{training.venue}</TableCell>
                      <TableCell className="text-gray-300 max-w-xs">
                        <div className="truncate" title={training.facilitatorsParticipants}>
                          {training.facilitatorsParticipants}
                        </div>
                      </TableCell>
                      <TableCell className="text-white text-center">{training.numberOfParticipants}</TableCell>
                      <TableCell className="text-gray-300 max-w-xs">
                        <div className="truncate" title={training.activityReport}>
                          {training.activityReport}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingSeminars;
