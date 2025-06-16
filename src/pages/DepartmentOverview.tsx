
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Users } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';

const DepartmentOverview = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Department Overview</h1>
          <p className="text-gray-400 text-lg">Comprehensive view of departmental research activities</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Department Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">Department performance analytics and comparisons will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentOverview;
