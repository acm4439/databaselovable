
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Shield } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';

const RoleSettings = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Role Settings</h1>
          <p className="text-gray-400 text-lg">Configure user roles and permissions</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Permission Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="bg-white text-black hover:bg-gray-200 flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Configure Roles</span>
              </Button>
              <p className="text-gray-300">Role and permission configuration interface will be displayed here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RoleSettings;
