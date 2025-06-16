
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calendar } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';

const TrainingSeminars = () => {
  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Training & Seminars</h1>
          <p className="text-gray-400 text-lg">Organize and manage training sessions and educational seminars</p>
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Training Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="bg-white text-black hover:bg-gray-200 flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Schedule Training</span>
              </Button>
              <p className="text-gray-300">Training and seminar management system will be displayed here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TrainingSeminars;
