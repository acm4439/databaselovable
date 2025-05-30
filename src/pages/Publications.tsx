
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
    titleOfPaper: 'Machine Learning Applications in Educational Assessment',
    department: 'Computer Science',
    researchSubsidy: 20000,
    status: 'Approved',
    scope: 'International'
  },
  {
    id: 2,
    dateOfApplication: '2025-05-10',
    facultyName: 'Prof. Michael Chen',
    titleOfPaper: 'Sustainable Energy Solutions for Rural Communities',
    department: 'Engineering',
    researchSubsidy: 15500,
    status: 'Under Review',
    scope: 'Local'
  },
  {
    id: 3,
    dateOfApplication: '2025-05-08',
    facultyName: 'Dr. Emily Rodriguez',
    titleOfPaper: 'Impact of Social Media on Student Mental Health',
    department: 'Psychology',
    researchSubsidy: 9300,
    status: 'Approved',
    scope: 'International'
  },
  {
    id: 4,
    dateOfApplication: '2025-05-05',
    facultyName: 'Dr. James Wilson',
    titleOfPaper: 'Climate Change Effects on Agricultural Productivity',
    department: 'Environmental Science',
    researchSubsidy: 12750,
    status: 'Rejected',
    scope: 'Local'
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

  const getScopeColor = (scope: string) => {
    switch (scope) {
      case 'International': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Local': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleFileUpload = (uploadedData: any[]) => {
    console.log('File uploaded with data:', uploadedData);
    setIsUploadOpen(false);
  };

  const filteredData = data.filter(item =>
    item.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.titleOfPaper.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-rso-dark-green mb-3">Publications and Presentations</h1>
            <p className="text-gray-600 text-lg">Track faculty scholarly outputs and research dissemination</p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="rso-light-green hover:rso-dark-green text-white shadow-lg">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Excel File
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-rso-dark-green">Upload Publications Records</DialogTitle>
                </DialogHeader>
                <FileUpload onFileUpload={handleFileUpload} />
              </DialogContent>
            </Dialog>
            <Button className="bg-rso-dark-green hover:bg-rso-dark-green/90 text-white shadow-lg">
              <Plus className="h-4 w-4 mr-2" />
              Add New Entry
            </Button>
          </div>
        </div>

        <Card className="bg-white shadow-xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-rso-light-green to-emerald-500 text-white">
            <CardTitle className="text-2xl flex items-center">
              <BookOpen className="h-6 w-6 mr-3" />
              Publications Overview
            </CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <Input
                placeholder="Search publications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-white/90 border-white/20 text-gray-800 placeholder:text-gray-500"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Date of Application</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Name of Faculty/Research Worker</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Title of Paper</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Department</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Research Subsidy</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Local/International</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((publication, index) => (
                    <tr key={publication.id} className={`border-b border-gray-100 hover:bg-emerald-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="py-5 px-6 text-sm text-gray-700">{publication.dateOfApplication}</td>
                      <td className="py-5 px-6 text-sm font-medium text-rso-dark-green">{publication.facultyName}</td>
                      <td className="py-5 px-6 text-sm text-gray-800 max-w-xs">
                        <div className="truncate" title={publication.titleOfPaper}>
                          {publication.titleOfPaper}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm text-gray-700">{publication.department}</td>
                      <td className="py-5 px-6 text-sm font-medium text-rso-dark-green">
                        ₱{publication.researchSubsidy.toLocaleString()}
                      </td>
                      <td className="py-5 px-6">
                        <Badge className={`${getStatusColor(publication.status)} border font-medium`}>
                          {publication.status}
                        </Badge>
                      </td>
                      <td className="py-5 px-6">
                        <Badge className={`${getScopeColor(publication.scope)} border font-medium`}>
                          {publication.scope}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-4 text-gray-300" />
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
