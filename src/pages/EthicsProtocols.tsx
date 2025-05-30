
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';

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
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Conditional Approval': return 'bg-orange-100 text-orange-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Ethics Reviewed Protocols</h1>
            <p className="text-slate-600">Track ethical review status and compliance for research projects</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
        </div>

        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Ethics Protocols Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">No.</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">List of Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Department/Data Forwarded</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Action Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {ethicsProtocols.map((protocol) => (
                    <tr key={protocol.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-slate-800">{protocol.no}</td>
                      <td className="py-4 px-4 text-sm text-slate-700 max-w-xs truncate" title={protocol.listOfTitle}>
                        {protocol.listOfTitle}
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{protocol.departmentDataForwarded}</td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(protocol.status)}>
                          {protocol.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600 max-w-xs truncate" title={protocol.actionTaken}>
                        {protocol.actionTaken}
                      </td>
                    </tr>
                  ))}
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
