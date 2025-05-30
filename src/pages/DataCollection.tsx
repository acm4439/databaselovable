
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Database, Search, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import FileUpload from '@/components/FileUpload';

const publicationsData = [
  {
    id: 1,
    facultyName: 'Dr. Sarah Johnson',
    degree: 'Ph.D.',
    sex: 'Female',
    researchTitle: 'Student Learning Analytics Platform',
    ownership: 'Author',
    dateVenuePresented: '05/15/25',
    datePublished: '2025-05-20',
    journalPublished: 'International Journal of Educational Technology'
  },
  {
    id: 2,
    facultyName: 'Prof. Michael Chen',
    degree: 'Ph.D.',
    sex: 'Male',
    researchTitle: 'Community Energy Usage Assessment',
    ownership: 'Co-Author',
    dateVenuePresented: '05/10/25',
    datePublished: '2025-05-18',
    journalPublished: 'Global Energy Conference 2025'
  },
  {
    id: 3,
    facultyName: 'Dr. Emily Rodriguez',
    degree: 'Ph.D.',
    sex: 'Female',
    researchTitle: 'Social Media Impact Survey',
    ownership: 'Author',
    dateVenuePresented: '05/08/25',
    datePublished: '2025-05-15',
    journalPublished: 'National Psychology Review'
  },
  {
    id: 4,
    facultyName: 'Dr. James Wilson',
    degree: 'Ph.D.',
    sex: 'Male',
    researchTitle: 'Agricultural Data Collection System',
    ownership: 'Co-Author',
    dateVenuePresented: '05/05/25',
    datePublished: '2025-05-12',
    journalPublished: 'Environmental Science Handbook'
  }
];

const DataCollection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(publicationsData);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const getOwnershipColor = (ownership: string) => {
    switch (ownership) {
      case 'Author': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Co-Author': return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'Editor': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleFileUpload = (uploadedData: any[]) => {
    console.log('File uploaded with data:', uploadedData);
    setIsUploadOpen(false);
    // In real implementation, you'd process the Excel data here
  };

  const filteredData = data.filter(item =>
    item.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.researchTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.journalPublished.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ownership.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-rso-dark-green mb-3">Data Collection Tools</h1>
            <p className="text-gray-600 text-lg">Manage research data collection methods and faculty publications</p>
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
                  <DialogTitle className="text-rso-dark-green">Upload Data Collection Records</DialogTitle>
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
              <Database className="h-6 w-6 mr-3" />
              Data Collection Overview
            </CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <Input
                placeholder="Search data collection tools..."
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
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Name of Faculty</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Degree</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Sex</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Research Title</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Ownership</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Date & Venue Presented</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Date Published</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Journal Published</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((tool, index) => (
                    <tr key={tool.id} className={`border-b border-gray-100 hover:bg-emerald-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="py-5 px-6 text-sm font-medium text-rso-dark-green">{tool.facultyName}</td>
                      <td className="py-5 px-6 text-sm text-gray-700">{tool.degree}</td>
                      <td className="py-5 px-6 text-sm text-gray-700">{tool.sex}</td>
                      <td className="py-5 px-6 text-sm text-gray-800 max-w-xs">
                        <div className="truncate" title={tool.researchTitle}>
                          {tool.researchTitle}
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <Badge className={`${getOwnershipColor(tool.ownership)} border font-medium`}>
                          {tool.ownership}
                        </Badge>
                      </td>
                      <td className="py-5 px-6 text-sm text-gray-700">{tool.dateVenuePresented}</td>
                      <td className="py-5 px-6 text-sm text-gray-700">{tool.datePublished}</td>
                      <td className="py-5 px-6 text-sm text-gray-700 max-w-xs">
                        <div className="truncate" title={tool.journalPublished}>
                          {tool.journalPublished}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-gray-500">
                        <Database className="h-12 w-12 mx-auto mb-4 text-gray-300" />
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

export default DataCollection;
