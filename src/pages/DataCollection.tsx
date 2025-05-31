
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Plus, Database, Search, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import FileUpload from '@/components/FileUpload';

const dataCollectionData = [
  {
    id: 1,
    facultyName: 'Dr. Sarah Johnson',
    degree: 'Ph.D.',
    sex: 'Female',
    researchTitle: 'Machine Learning Applications in Healthcare Data Analysis',
    ownership: 'Author',
    datePresentedVenue: '05,15,25 - International AI Conference',
    datePublished: '2025-04-20',
    journalPublished: 'Journal of Medical Informatics'
  },
  {
    id: 2,
    facultyName: 'Prof. Michael Chen',
    degree: 'Ph.D.',
    sex: 'Male',
    researchTitle: 'Sustainable Energy Systems in Urban Planning',
    ownership: 'Co-Author',
    datePresentedVenue: '04,22,25 - Green Cities Summit',
    datePublished: '2025-03-15',
    journalPublished: 'Environmental Engineering Review'
  },
  {
    id: 3,
    facultyName: 'Dr. Emily Rodriguez',
    degree: 'Ph.D.',
    sex: 'Female',
    researchTitle: 'Educational Technology Impact on Student Learning Outcomes',
    ownership: 'Author',
    datePresentedVenue: '03,10,25 - EdTech Innovation Forum',
    datePublished: '2025-02-28',
    journalPublished: 'Educational Technology Research'
  }
];

const DataCollection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(dataCollectionData);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleFileUpload = (uploadedData: any[]) => {
    console.log('File uploaded with data:', uploadedData);
    setIsUploadOpen(false);
  };

  const filteredData = data.filter(item =>
    item.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.researchTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.journalPublished.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.ownership.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #C0C7AB 0%, #989F7E 100%)' }}>
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-md">Data Collection Tools</h1>
            <p className="text-white/90 text-lg drop-shadow-sm">Manage faculty research publications and presentation records</p>
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
                  <DialogTitle className="text-rso-dark-green">Upload Data Collection Records</DialogTitle>
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
              <Database className="h-6 w-6 mr-3" />
              Data Collection Overview
            </CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rso-dark-green h-5 w-5" />
              <Input
                placeholder="Search data collection records..."
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
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Name of Faculty</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Degree</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Sex</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Research Title</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Ownership</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Date & Venue Presented</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Date Published</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Journal Published</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={item.id} className={`border-b border-gray-100 hover:bg-rso-light-green/30 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-5 px-6 text-sm font-semibold text-rso-dark-green">{item.facultyName}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green font-medium">{item.degree}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green">{item.sex}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green max-w-xs">
                        <div className="truncate" title={item.researchTitle}>
                          {item.researchTitle}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green font-medium">{item.ownership}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green">{item.datePresentedVenue}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green">{item.datePublished}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green max-w-xs">
                        <div className="truncate" title={item.journalPublished}>
                          {item.journalPublished}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-12 text-center text-rso-medium-green">
                        <Database className="h-12 w-12 mx-auto mb-4 text-rso-medium-green" />
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
