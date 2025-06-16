
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Database, FileSpreadsheet, Upload, Settings } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import FileUpload from '@/components/FileUpload';

const DataCollection = () => {
  const handleFileUpload = (data: any[]) => {
    console.log('Uploaded data collection tools:', data);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Data Collection Tools</h1>
          <p className="text-gray-400 text-lg">Manage and configure data collection instruments and methodologies</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Survey Tools</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Create and manage research surveys and questionnaires</p>
              <Button className="bg-white text-black hover:bg-gray-200">Create Survey</Button>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center space-x-2">
                <FileSpreadsheet className="h-5 w-5" />
                <span>Data Templates</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">Standardized templates for data collection</p>
              <Button className="bg-white text-black hover:bg-gray-200">Download Templates</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Data Collection Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-300">
              <p>Guidelines and best practices for research data collection will be displayed here.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataCollection;
