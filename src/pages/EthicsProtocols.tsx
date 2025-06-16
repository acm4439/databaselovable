
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, CheckCircle, Plus } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import FileUpload from '@/components/FileUpload';

const mockEthicsData = [
  {
    id: 1,
    no: "EP-2024-001",
    listOfTitle: "Impact of Social Media on Adolescent Mental Health: A Longitudinal Study",
    departmentDateForwarded: "Psychology Dept. / 2024-06-01",
    status: "Approved",
    actionTaken: "Full approval granted with minor modifications to consent forms"
  },
  {
    id: 2,
    no: "EP-2024-002", 
    listOfTitle: "Clinical Trial for Novel Diabetes Treatment Protocol",
    departmentDateForwarded: "Medicine Dept. / 2024-05-28",
    status: "Under Review",
    actionTaken: "Pending additional safety documentation"
  },
  {
    id: 3,
    no: "EP-2024-003",
    listOfTitle: "Educational Technology Implementation in Remote Learning Environments", 
    departmentDateForwarded: "Education Dept. / 2024-05-25",
    status: "Approved",
    actionTaken: "Conditional approval pending data anonymization protocol"
  },
  {
    id: 4,
    no: "EP-2024-004",
    listOfTitle: "Workplace Stress and Productivity Analysis in Corporate Settings",
    departmentDateForwarded: "Business Admin Dept. / 2024-05-20",
    status: "Rejected",
    actionTaken: "Insufficient participant protection measures - resubmission required"
  },
  {
    id: 5,
    no: "EP-2024-005",
    listOfTitle: "Environmental Impact Assessment of Industrial Waste on Local Communities",
    departmentDateForwarded: "Environmental Science Dept. / 2024-05-18",
    status: "Under Review",
    actionTaken: "Awaiting community consultation documentation"
  },
  {
    id: 6,
    no: "EP-2024-006",
    listOfTitle: "Genetic Markers in Hereditary Disease Predisposition Study",
    departmentDateForwarded: "Biology Dept. / 2024-05-15",
    status: "Approved",
    actionTaken: "Full approval with mandatory quarterly progress reports"
  }
];

const EthicsProtocols = () => {
  const handleFileUpload = (data: any[]) => {
    console.log('Uploaded ethics protocols data:', data);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Ethics Reviewed Protocols</h1>
          <p className="text-gray-400 text-lg">Manage research ethics protocols and review processes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Protocols</p>
                  <p className="text-2xl font-bold text-white">156</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Under Review</p>
                  <p className="text-2xl font-bold text-white">23</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Approved</p>
                  <p className="text-2xl font-bold text-white">133</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Protocol Form */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Submit New Protocol</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="protocolNo" className="text-gray-200">Protocol No.</Label>
                <Input id="protocolNo" placeholder="EP-2024-XXX" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="department" className="text-gray-200">Department</Label>
                <Input id="department" placeholder="Department name" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="title" className="text-gray-200">Research Title</Label>
                <Input id="title" placeholder="Research study title" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="dateForwarded" className="text-gray-200">Date Forwarded</Label>
                <Input id="dateForwarded" type="date" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="status" className="text-gray-200">Status</Label>
                <Input id="status" placeholder="Under Review/Approved/Rejected" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="actionTaken" className="text-gray-200">Action Taken</Label>
                <Input id="actionTaken" placeholder="Description of action taken" className="bg-gray-700 border-gray-600 text-white" />
              </div>
            </div>
            <Button className="bg-white text-black hover:bg-gray-200">Submit Protocol</Button>
          </CardContent>
        </Card>

        {/* File Upload */}
        <div className="mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {/* Ethics Protocols Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Ethics Protocol Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-200">No.</TableHead>
                    <TableHead className="text-gray-200">List of Title</TableHead>
                    <TableHead className="text-gray-200">Department/Date Forwarded</TableHead>
                    <TableHead className="text-gray-200">Status</TableHead>
                    <TableHead className="text-gray-200">Action Taken</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockEthicsData.map((protocol) => (
                    <TableRow key={protocol.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-white font-medium">{protocol.no}</TableCell>
                      <TableCell className="text-gray-300 max-w-xs">
                        <div className="truncate" title={protocol.listOfTitle}>
                          {protocol.listOfTitle}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{protocol.departmentDateForwarded}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-gray-600 ${
                          protocol.status === 'Approved' ? 'text-green-400 border-green-600' :
                          protocol.status === 'Rejected' ? 'text-red-400 border-red-600' :
                          'text-yellow-400 border-yellow-600'
                        }`}>
                          {protocol.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300 max-w-xs">
                        <div className="truncate" title={protocol.actionTaken}>
                          {protocol.actionTaken}
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

export default EthicsProtocols;
