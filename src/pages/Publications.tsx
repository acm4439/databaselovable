
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, BookOpen, Search, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import FileUpload from '@/components/FileUpload';

const publicationsData = [
  {
    id: 1,
    dateOfApplication: '2025-05-15',
    facultyName: 'Dr. Sarah Johnson',
    titleOfPaper: 'AI-Driven Healthcare Solutions for Rural Communities',
    department: 'Computer Science',
    researchSubsidy: 75000,
    status: 'Approved',
    localInternational: 'International'
  },
  {
    id: 2,
    dateOfApplication: '2025-05-10',
    facultyName: 'Prof. Michael Chen',
    titleOfPaper: 'Sustainable Urban Development Strategies',
    department: 'Environmental Engineering',
    researchSubsidy: 50000,
    status: 'Under Review',
    localInternational: 'Local'
  },
  {
    id: 3,
    dateOfApplication: '2025-05-08',
    facultyName: 'Dr. Emily Rodriguez',
    titleOfPaper: 'Digital Learning Platforms in Higher Education',
    department: 'Education',
    researchSubsidy: 35000,
    status: 'Approved',
    localInternational: 'International'
  }
];

const Publications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(publicationsData);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLocalInternationalColor = (type: string) => {
    return type === 'International' 
      ? 'bg-blue-100 text-blue-800 border-blue-200' 
      : 'bg-purple-100 text-purple-800 border-purple-200';
  };

  const handleFileUpload = (uploadedData: any[]) => {
    console.log('File uploaded with data:', uploadedData);
    setIsUploadOpen(false);
  };

  const filteredData = data.filter(publication =>
    publication.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publication.titleOfPaper.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publication.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    publication.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #C0C7AB 0%, #989F7E 100%)' }}>
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-md">Publications and Presentations</h1>
            <p className="text-white/90 text-lg drop-shadow-sm">Track research funding applications and publication subsidies</p>
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
                  <DialogTitle className="text-rso-dark-green">Upload Publication Records</DialogTitle>
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
              <BookOpen className="h-6 w-6 mr-3" />
              Publications & Presentations Overview
            </CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rso-dark-green h-5 w-5" />
              <Input
                placeholder="Search publications and presentations..."
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
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Date of Application</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Name of Faculty/Research Worker</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Title of Paper</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Department</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Research Subsidy</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Status</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Local/International</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((publication, index) => (
                    <tr key={publication.id} className={`border-b border-gray-100 hover:bg-rso-light-green/30 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-5 px-6 text-sm text-rso-dark-green font-medium">{publication.dateOfApplication}</td>
                      <td className="py-5 px-6 text-sm font-semibold text-rso-dark-green">{publication.facultyName}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green max-w-xs">
                        <div className="truncate" title={publication.titleOfPaper}>
                          {publication.titleOfPaper}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green">{publication.department}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green font-bold">
                        ₱{publication.researchSubsidy.toLocaleString()}
                      </td>
                      <td className="py-5 px-6">
                        <Badge className={`${getStatusColor(publication.status)} border font-medium`}>
                          {publication.status}
                        </Badge>
                      </td>
                      <td className="py-5 px-6">
                        <Badge className={`${getLocalInternationalColor(publication.localInternational)} border font-medium`}>
                          {publication.localInternational}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-rso-medium-green">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-rso-medium-green" />
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

export default Publications;
