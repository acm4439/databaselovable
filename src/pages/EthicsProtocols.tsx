
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Shield } from 'lucide-react';
import Navigation from '@/components/Navigation';

const ethicsProtocols = [
  {
    id: 1,
    protocolTitle: 'Student Privacy in Digital Learning Environments',
    dateSubmitted: '2025-05-20',
    status: 'Approved',
    remarks: 'Minor revisions completed',
    facultyName: 'Dr. Sarah Johnson',
    reviewBoard: 'IRB-001'
  },
  {
    id: 2,
    protocolTitle: 'Community Health Data Collection Procedures',
    dateSubmitted: '2025-05-18',
    status: 'Under Review',
    remarks: 'Awaiting committee feedback',
    facultyName: 'Prof. Michael Chen',
    reviewBoard: 'IRB-002'
  },
  {
    id: 3,
    protocolTitle: 'Social Media Behavior Analysis Protocol',
    dateSubmitted: '2025-05-15',
    status: 'Conditional Approval',
    remarks: 'Consent form needs revision',
    facultyName: 'Dr. Emily Rodriguez',
    reviewBoard: 'IRB-001'
  },
  {
    id: 4,
    protocolTitle: 'Environmental Impact Assessment Ethics',
    dateSubmitted: '2025-05-12',
    status: 'Rejected',
    remarks: 'Insufficient risk mitigation measures',
    facultyName: 'Dr. James Wilson',
    reviewBoard: 'IRB-003'
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
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Protocol Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Faculty Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Date Submitted</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Review Board</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {ethicsProtocols.map((protocol) => (
                    <tr key={protocol.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-sm text-slate-700 max-w-xs truncate" title={protocol.protocolTitle}>
                        {protocol.protocolTitle}
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-800">{protocol.facultyName}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{protocol.dateSubmitted}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{protocol.reviewBoard}</td>
                      <td className="py-4 px-4">
                        <Badge className={getStatusColor(protocol.status)}>
                          {protocol.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600 max-w-xs truncate" title={protocol.remarks}>
                        {protocol.remarks}
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
