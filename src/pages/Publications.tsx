
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BookOpen, ExternalLink, Calendar, Users } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import FileUpload from '@/components/FileUpload';

const mockPublicationsData = [
  { 
    id: 1, 
    title: "Machine Learning Applications in Healthcare Diagnostics", 
    authors: "Dr. Sarah Johnson, Prof. Michael Chen", 
    journal: "Journal of Medical AI", 
    year: 2024, 
    volume: "15(3)", 
    pages: "234-251", 
    citations: 23, 
    doi: "10.1000/jmai.2024.15.3.234",
    type: "Journal Article"
  },
  { 
    id: 2, 
    title: "Cognitive Load Theory in Digital Learning Environments", 
    authors: "Dr. Robert Wilson, Dr. Emily Davis", 
    journal: "Educational Psychology Review", 
    year: 2024, 
    volume: "12(2)", 
    pages: "89-106", 
    citations: 45, 
    doi: "10.1000/epr.2024.12.2.89",
    type: "Journal Article"
  },
  { 
    id: 3, 
    title: "Synthesis of Novel Organic Compounds for Drug Development", 
    authors: "Dr. Lisa Anderson", 
    journal: "Organic Chemistry Letters", 
    year: 2023, 
    volume: "8(12)", 
    pages: "1456-1472", 
    citations: 67, 
    doi: "10.1000/ocl.2023.8.12.1456",
    type: "Journal Article"
  },
  { 
    id: 4, 
    title: "Robotics in Manufacturing: A Comprehensive Review", 
    authors: "Dr. Emily Davis, Prof. John Thompson", 
    journal: "IEEE Robotics Conference", 
    year: 2024, 
    volume: "N/A", 
    pages: "1-8", 
    citations: 12, 
    doi: "10.1109/ICRA.2024.1234567",
    type: "Conference Paper"
  },
  { 
    id: 5, 
    title: "Climate Change Impact on Cardiovascular Health", 
    authors: "Prof. Michael Chen, Dr. Sarah Johnson", 
    journal: "Environmental Health Perspectives", 
    year: 2024, 
    volume: "132(4)", 
    pages: "047001", 
    citations: 34, 
    doi: "10.1289/EHP.2024.132.4.047001",
    type: "Journal Article"
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
                <ExternalLink className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Citations</p>
                  <p className="text-2xl font-bold text-white">12,456</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Avg per Researcher</p>
                  <p className="text-2xl font-bold text-white">5.3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Publication Form */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white">Add New Publication</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-gray-200">Title</Label>
                <Input id="title" placeholder="Publication title" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="authors" className="text-gray-200">Authors</Label>
                <Input id="authors" placeholder="Dr. John Smith, Prof. Jane Doe" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="journal" className="text-gray-200">Journal/Conference</Label>
                <Input id="journal" placeholder="Journal name" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="year" className="text-gray-200">Year</Label>
                <Input id="year" type="number" placeholder="2024" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="doi" className="text-gray-200">DOI</Label>
                <Input id="doi" placeholder="10.1000/journal.year.volume.page" className="bg-gray-700 border-gray-600 text-white" />
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
                    <TableHead className="text-gray-200">Title</TableHead>
                    <TableHead className="text-gray-200">Authors</TableHead>
                    <TableHead className="text-gray-200">Journal/Conference</TableHead>
                    <TableHead className="text-gray-200">Year</TableHead>
                    <TableHead className="text-gray-200">Type</TableHead>
                    <TableHead className="text-gray-200">Citations</TableHead>
                    <TableHead className="text-gray-200">DOI</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPublicationsData.map((publication) => (
                    <TableRow key={publication.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-white font-medium max-w-xs">
                        <div className="truncate" title={publication.title}>
                          {publication.title}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300 max-w-xs">
                        <div className="truncate" title={publication.authors}>
                          {publication.authors}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <div>
                          <div className="font-medium">{publication.journal}</div>
                          <div className="text-xs text-gray-400">{publication.volume}, pp. {publication.pages}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white">{publication.year}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {publication.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white font-medium">{publication.citations}</TableCell>
                      <TableCell className="text-gray-300">
                        <a 
                          href={`https://doi.org/${publication.doi}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 hover:text-white transition-colors"
                        >
                          <span className="text-xs">{publication.doi}</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
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
