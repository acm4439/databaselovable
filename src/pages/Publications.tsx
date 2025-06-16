
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Users, Plus } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import FileUpload from '@/components/FileUpload';

const mockPublicationsData = [
  { 
    id: 1, 
    dateOfApplication: "2024-06-10",
    facultyName: "Dr. Sarah Johnson", 
    titleOfPaper: "Machine Learning Applications in Healthcare Diagnostics", 
    department: "Computer Science", 
    status: "Published",
    type: "International"
  },
  { 
    id: 2, 
    dateOfApplication: "2024-05-25",
    facultyName: "Dr. Robert Wilson", 
    titleOfPaper: "Cognitive Load Theory in Digital Learning Environments", 
    department: "Education", 
    status: "Under Review",
    type: "Local"
  },
  { 
    id: 3, 
    dateOfApplication: "2024-05-15",
    facultyName: "Dr. Lisa Anderson", 
    titleOfPaper: "Synthesis of Novel Organic Compounds for Drug Development", 
    department: "Chemistry", 
    status: "Published",
    type: "International"
  },
  { 
    id: 4, 
    dateOfApplication: "2024-04-30",
    facultyName: "Dr. Emily Davis", 
    titleOfPaper: "Robotics in Manufacturing: A Comprehensive Review", 
    department: "Engineering", 
    status: "Accepted",
    type: "International"
  },
  { 
    id: 5, 
    dateOfApplication: "2024-04-20",
    facultyName: "Prof. Michael Chen", 
    titleOfPaper: "Climate Change Impact on Cardiovascular Health", 
    department: "Medicine", 
    status: "Published",
    type: "International"
  },
  { 
    id: 6, 
    dateOfApplication: "2024-04-10",
    facultyName: "Dr. Maria Garcia", 
    titleOfPaper: "Social Media Influence on Youth Behavior Patterns", 
    department: "Psychology", 
    status: "Under Review",
    type: "Local"
  }
];

const Publications = () => {
  const handleFileUpload = (data: any[]) => {
    console.log('Uploaded publications data:', data);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Publications & Presentations</h1>
          <p className="text-gray-400 text-lg">Manage and track research publications, presentations, and academic outputs</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Publications</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">This Year</p>
                  <p className="text-2xl font-bold text-white">89</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">International</p>
                  <p className="text-2xl font-bold text-white">456</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Local</p>
                  <p className="text-2xl font-bold text-white">791</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Publication Form */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add New Publication</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="applicationDate" className="text-gray-200">Date of Application</Label>
                <Input id="applicationDate" type="date" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="facultyName" className="text-gray-200">Name of Faculty/Research Worker</Label>
                <Input id="facultyName" placeholder="Dr. John Smith" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-gray-200">Title of Paper</Label>
                <Input id="title" placeholder="Research paper title" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="department" className="text-gray-200">Department</Label>
                <Input id="department" placeholder="Department name" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="status" className="text-gray-200">Status</Label>
                <Input id="status" placeholder="Published/Under Review/Accepted" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="type" className="text-gray-200">Local/International</Label>
                <Input id="type" placeholder="Local or International" className="bg-gray-700 border-gray-600 text-white" />
              </div>
            </div>
            <Button className="bg-white text-black hover:bg-gray-200">Add Publication</Button>
          </CardContent>
        </Card>

        {/* File Upload */}
        <div className="mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {/* Publications Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Recent Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-200">Date of Application</TableHead>
                    <TableHead className="text-gray-200">Name of Faculty/Research Worker</TableHead>
                    <TableHead className="text-gray-200">Title of Paper</TableHead>
                    <TableHead className="text-gray-200">Department</TableHead>
                    <TableHead className="text-gray-200">Status</TableHead>
                    <TableHead className="text-gray-200">Local/International</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPublicationsData.map((publication) => (
                    <TableRow key={publication.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-white font-medium">{publication.dateOfApplication}</TableCell>
                      <TableCell className="text-gray-300">{publication.facultyName}</TableCell>
                      <TableCell className="text-white max-w-xs">
                        <div className="truncate" title={publication.titleOfPaper}>
                          {publication.titleOfPaper}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{publication.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-gray-600 ${
                          publication.status === 'Published' ? 'text-green-400 border-green-600' :
                          publication.status === 'Accepted' ? 'text-blue-400 border-blue-600' :
                          'text-yellow-400 border-yellow-600'
                        }`}>
                          {publication.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-gray-600 ${
                          publication.type === 'International' ? 'text-purple-400 border-purple-600' : 'text-orange-400 border-orange-600'
                        }`}>
                          {publication.type}
                        </Badge>
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

export default Publications;
