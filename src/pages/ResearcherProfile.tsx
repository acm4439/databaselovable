
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, MapPin, BookOpen, Award, Users } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import FileUpload from '@/components/FileUpload';

const mockResearcherData = [
  { id: 1, name: "Dr. Sarah Johnson", department: "Computer Science", position: "Professor", email: "s.johnson@university.edu", phone: "+1-555-0123", specialization: "Artificial Intelligence", publications: 45, hIndex: 18, citations: 1250 },
  { id: 2, name: "Prof. Michael Chen", department: "Medicine", position: "Associate Professor", email: "m.chen@university.edu", phone: "+1-555-0124", specialization: "Cardiology Research", publications: 67, hIndex: 22, citations: 1890 },
  { id: 3, name: "Dr. Emily Davis", department: "Engineering", position: "Assistant Professor", email: "e.davis@university.edu", phone: "+1-555-0125", specialization: "Robotics", publications: 23, hIndex: 12, citations: 567 },
  { id: 4, name: "Dr. Robert Wilson", department: "Psychology", position: "Professor", email: "r.wilson@university.edu", phone: "+1-555-0126", specialization: "Cognitive Psychology", publications: 89, hIndex: 31, citations: 2340 },
  { id: 5, name: "Dr. Lisa Anderson", department: "Chemistry", position: "Associate Professor", email: "l.anderson@university.edu", phone: "+1-555-0127", specialization: "Organic Chemistry", publications: 56, hIndex: 19, citations: 1123 }
];

const ResearcherProfile = () => {
  const handleFileUpload = (data: any[]) => {
    console.log('Uploaded researcher data:', data);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Researcher Profiles</h1>
          <p className="text-gray-400 text-lg">Manage and view detailed researcher information and profiles</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Researchers</p>
                  <p className="text-2xl font-bold text-white">234</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-green-400" />
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
                <Award className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Avg H-Index</p>
                  <p className="text-2xl font-bold text-white">20.4</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">New This Month</p>
                  <p className="text-2xl font-bold text-white">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Researcher Form */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white">Add New Researcher</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                <Input id="name" placeholder="Dr. John Smith" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="department" className="text-gray-200">Department</Label>
                <Input id="department" placeholder="Computer Science" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="position" className="text-gray-200">Position</Label>
                <Input id="position" placeholder="Professor" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input id="email" type="email" placeholder="j.smith@university.edu" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-200">Phone</Label>
                <Input id="phone" placeholder="+1-555-0100" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="specialization" className="text-gray-200">Specialization</Label>
                <Input id="specialization" placeholder="Machine Learning" className="bg-gray-700 border-gray-600 text-white" />
              </div>
            </div>
            <Button className="bg-white text-black hover:bg-gray-200">Add Researcher</Button>
          </CardContent>
        </Card>

        {/* File Upload */}
        <div className="mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {/* Researchers Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Current Researchers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-200">Name</TableHead>
                    <TableHead className="text-gray-200">Department</TableHead>
                    <TableHead className="text-gray-200">Position</TableHead>
                    <TableHead className="text-gray-200">Contact</TableHead>
                    <TableHead className="text-gray-200">Specialization</TableHead>
                    <TableHead className="text-gray-200">Publications</TableHead>
                    <TableHead className="text-gray-200">H-Index</TableHead>
                    <TableHead className="text-gray-200">Citations</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockResearcherData.map((researcher) => (
                    <TableRow key={researcher.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-white font-medium">{researcher.name}</TableCell>
                      <TableCell className="text-gray-300">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {researcher.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{researcher.position}</TableCell>
                      <TableCell className="text-gray-300">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span className="text-xs">{researcher.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span className="text-xs">{researcher.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{researcher.specialization}</TableCell>
                      <TableCell className="text-white font-medium">{researcher.publications}</TableCell>
                      <TableCell className="text-white font-medium">{researcher.hIndex}</TableCell>
                      <TableCell className="text-white font-medium">{researcher.citations.toLocaleString()}</TableCell>
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

export default ResearcherProfile;
