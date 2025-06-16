
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserPlus } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';

const UserManagement = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">User Management</h1>
          <p className="text-gray-400 text-lg">Manage system users and access permissions</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>System Users</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="bg-white text-black hover:bg-gray-200 flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Add User</span>
              </Button>
              <p className="text-gray-300">User management interface will be displayed here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;
