
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Shield, Search, Upload } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Navigation from '@/components/Navigation';
import FileUpload from '@/components/FileUpload';

const ethicsProtocols = [
  {
    id: 1,
    no: 'ETH-001',
    listOfTitle: 'Student Privacy in Digital Learning Environments',
    departmentDataForwarded: 'Computer Science Department',
    status: 'Approved',
    actionTaken: 'Protocol approved with minor revisions'
  },
  {
    id: 2,
    no: 'ETH-002',
    listOfTitle: 'Community Health Data Collection Procedures',
    departmentDataForwarded: 'Health Sciences Department',
    status: 'Under Review',
    actionTaken: 'Awaiting committee feedback on consent procedures'
  },
  {
    id: 3,
    no: 'ETH-003',
    listOfTitle: 'Social Media Behavior Analysis Protocol',
    departmentDataForwarded: 'Psychology Department',
    status: 'Conditional Approval',
    actionTaken: 'Consent form revision required before final approval'
  },
  {
    id: 4,
    no: 'ETH-004',
    listOfTitle: 'Environmental Impact Assessment Ethics',
    departmentDataForwarded: 'Environmental Science Department',
    status: 'Rejected',
    actionTaken: 'Insufficient risk mitigation measures - resubmission required'
  }
];

const EthicsProtocols = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState(ethicsProtocols);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Conditional Approval': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleFileUpload = (uploadedData: any[]) => {
    console.log('File uploaded with data:', uploadedData);
    setIsUploadOpen(false);
  };

  const filteredData = data.filter(protocol =>
    protocol.no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    protocol.listOfTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    protocol.departmentDataForwarded.toLowerCase().includes(searchTerm.toLowerCase()) ||
    protocol.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    protocol.actionTaken.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-4xl font-bold text-rso-dark-green mb-3">Ethics Reviewed Protocols</h1>
            <p className="text-gray-600 text-lg">Track ethical review status and compliance for research projects</p>
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
                  <DialogTitle className="text-rso-dark-green">Upload Ethics Protocol Records</DialogTitle>
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
              <Shield className="h-6 w-6 mr-3" />
              Ethics Protocols Overview
            </CardTitle>
            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70 h-5 w-5" />
              <Input
                placeholder="Search ethics protocols..."
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
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">No.</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">List of Title</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Department/Data Forwarded</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Status</th>
                    <th className="text-left py-4 px-6 font-semibold text-rso-dark-green">Action Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((protocol, index) => (
                    <tr key={protocol.id} className={`border-b border-gray-100 hover:bg-emerald-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="py-5 px-6 text-sm font-medium text-rso-dark-green">{protocol.no}</td>
                      <td className="py-5 px-6 text-sm text-gray-800 max-w-xs">
                        <div className="truncate" title={protocol.listOfTitle}>
                          {protocol.listOfTitle}
                        </div>
                      </td>
                      <td className="py-5 px-6 text-sm text-gray-700">{protocol.departmentDataForwarded}</td>
                      <td className="py-5 px-6">
                        <Badge className={`${getStatusColor(protocol.status)} border font-medium`}>
                          {protocol.status}
                        </Badge>
                      </td>
                      <td className="py-5 px-6 text-sm text-gray-700 max-w-xs">
                        <div className="truncate" title={protocol.actionTaken}>
                          {protocol.actionTaken}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredData.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-500">
                        <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
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

export default EthicsProtocols;
