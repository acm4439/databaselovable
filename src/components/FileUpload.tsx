
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, FileSpreadsheet, X, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (data: any[]) => void;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
}

const FileUpload = ({ 
  onFileUpload, 
  acceptedTypes = ['.xlsx', '.xls', '.csv'],
  maxSize = 10 
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError(null);
    
    // Validate file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!acceptedTypes.includes(fileExtension)) {
      setError(`File type not supported. Please upload: ${acceptedTypes.join(', ')}`);
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size too large. Maximum size: ${maxSize}MB`);
      return;
    }

    setUploadedFile(file);
    
    // Simulate file processing (in real app, you'd parse Excel/CSV here)
    setTimeout(() => {
      // Mock data for demonstration
      const mockData = [
        { id: Date.now(), status: 'Imported from file', source: file.name }
      ];
      onFileUpload(mockData);
    }, 1000);
  };

  const removeFile = () => {
    setUploadedFile(null);
    setError(null);
  };

  return (
    <Card className="border-2 border-dashed border-rso-light-green hover:border-rso-accent transition-colors rounded-xl">
      <CardContent className="p-6">
        <div
          className={`flex flex-col items-center justify-center space-y-4 ${
            isDragOver ? 'bg-rso-light-green/20' : ''
          } rounded-lg transition-colors`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {uploadedFile ? (
            <div className="flex items-center space-x-4 w-full">
              <FileSpreadsheet className="h-8 w-8 text-rso-accent" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-rso-dark-green">{uploadedFile.name}</p>
                <p className="text-xs text-rso-medium-green">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-rso-medium-green hover:text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Upload className="h-12 w-12 text-rso-medium-green" />
              <div className="text-center">
                <p className="text-lg font-semibold text-rso-dark-green">
                  Drop your Excel file here
                </p>
                <p className="text-sm text-rso-medium-green">
                  or click to browse files
                </p>
                <p className="text-xs text-rso-medium-green/80 mt-1">
                  Supports: {acceptedTypes.join(', ')} (max {maxSize}MB)
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept={acceptedTypes.join(',')}
                onChange={handleFileSelect}
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button className="rso-accent hover:rso-accent-hover text-white cursor-pointer font-semibold shadow-md">
                  Browse Files
                </Button>
              </label>
            </>
          )}
          
          {error && (
            <div className="flex items-center space-x-2 text-red-700 bg-red-50 p-3 rounded-md w-full border border-red-200">
              <AlertCircle className="h-4 w-4" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
