
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, BookOpen } from 'lucide-react';
import Navigation from '@/components/Navigation';

const publicationsData = [
  {
    id: 1,
    facultyName: 'Dr. Sarah Johnson',
    degree: 'Ph.D.',
    sex: 'Female',
    researchTitle: 'Machine Learning Applications in Educational Assessment',
    ownership: 'Author',
    datePublished: '2025-05-15',
    journalPublished: 'International Journal of Educational Technology',
    subsidy: 20000
  },
  {
    id: 2,
    facultyName: 'Prof. Michael Chen',
    degree: 'Ph.D.',
    sex: 'Male',
    researchTitle: 'Sustainable Energy Solutions for Rural Communities',
    ownership: 'Co-Author',
    datePublished: '2025-05-10',
    journalPublished: 'Global Energy Conference 2025',
    subsidy: 15500
  },
  {
    id: 3,
    facultyName: 'Dr. Emily Rodriguez',
    degree: 'Ph.D.',
    sex: 'Female',
    researchTitle: 'Impact of Social Media on Student Mental Health',
    ownership: 'Author',
    datePublished: '2025-05-08',
    journalPublished: 'National Psychology Review',
    subsidy: 9300
  },
  {
    id: 4,
    facultyName: 'Dr. James Wilson',
    degree: 'Ph.D.',
    sex: 'Male',
    researchTitle: 'Climate Change Effects on Agricultural Productivity',
    ownership: 'Co-Author',
    datePublished: '2025-05-05',
    journalPublished: 'Environmental Science Handbook',
    subsidy: 12750
  }
];

const DataCollection = () => {
  const getOwnershipColor = (ownership: string) => {
    switch (ownership) {
      case 'Author': return 'bg-blue-100 text-blue-800';
      case 'Co-Author': return 'bg-green-100 text-green-800';
      case 'Editor': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Publications and Presentations</h1>
            <p className="text-slate-600">Track faculty scholarly outputs and research dissemination</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
        </div>

        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Publications Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Faculty Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Degree</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Sex</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Research Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Ownership</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Date Published</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Journal Published</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Subsidy</th>
                  </tr>
                </thead>
                <tbody>
                  {publicationsData.map((publication) => (
                    <tr key={publication.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-slate-800">{publication.facultyName}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{publication.degree}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{publication.sex}</td>
                      <td className="py-4 px-4 text-sm text-slate-700 max-w-xs truncate" title={publication.researchTitle}>
                        {publication.researchTitle}
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getOwnershipColor(publication.ownership)}>
                          {publication.ownership}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm text-slate-600">{publication.datePublished}</td>
                      <td className="py-4 px-4 text-sm text-slate-600 max-w-xs truncate" title={publication.journalPublished}>
                        {publication.journalPublished}
                      </td>
                      <td className="py-4 px-4 text-sm font-medium text-slate-800">
                        ₱{publication.subsidy.toLocaleString()}
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

export default DataCollection;
