
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, TrendingUp } from 'lucide-react';
import Navigation from '@/components/Navigation';

const kpiRecords = [
  {
    id: 1,
    facultyName: 'Dr. Sarah Johnson',
    period: '2025 - Semester 1',
    publicationsCount: 8,
    trainingsAttended: 5,
    presentationsMade: 12,
    kpiScore: 9.2,
    performance: 'Excellent'
  },
  {
    id: 2,
    facultyName: 'Prof. Michael Chen',
    period: '2025 - Semester 1',
    publicationsCount: 6,
    trainingsAttended: 3,
    presentationsMade: 8,
    kpiScore: 8.1,
    performance: 'Very Good'
  },
  {
    id: 3,
    facultyName: 'Dr. Emily Rodriguez',
    period: '2025 - Semester 1',
    publicationsCount: 4,
    trainingsAttended: 7,
    presentationsMade: 6,
    kpiScore: 7.8,
    performance: 'Good'
  },
  {
    id: 4,
    facultyName: 'Dr. James Wilson',
    period: '2025 - Semester 1',
    publicationsCount: 5,
    trainingsAttended: 4,
    presentationsMade: 9,
    kpiScore: 8.5,
    performance: 'Very Good'
  }
];

const KPIRecords = () => {
  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case 'Excellent': return 'bg-green-100 text-green-800';
      case 'Very Good': return 'bg-blue-100 text-blue-800';
      case 'Good': return 'bg-yellow-100 text-yellow-800';
      case 'Needs Improvement': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 9) return 'text-green-600 font-bold';
    if (score >= 8) return 'text-blue-600 font-semibold';
    if (score >= 7) return 'text-yellow-600 font-medium';
    return 'text-red-600 font-medium';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Faculty KPI Tracking</h1>
            <p className="text-slate-600">Monitor academic performance indicators and faculty achievements</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
        </div>

        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              KPI Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Faculty Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Period</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Publications</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Trainings</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Presentations</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">KPI Score</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-700">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {kpiRecords.map((record) => (
                    <tr key={record.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4 text-sm font-medium text-slate-800">{record.facultyName}</td>
                      <td className="py-4 px-4 text-sm text-slate-600">{record.period}</td>
                      <td className="py-4 px-4 text-sm text-slate-700 text-center">{record.publicationsCount}</td>
                      <td className="py-4 px-4 text-sm text-slate-700 text-center">{record.trainingsAttended}</td>
                      <td className="py-4 px-4 text-sm text-slate-700 text-center">{record.presentationsMade}</td>
                      <td className="py-4 px-4 text-sm text-center">
                        <span className={getScoreColor(record.kpiScore)}>
                          {record.kpiScore}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={getPerformanceColor(record.performance)}>
                          {record.performance}
                        </Badge>
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

export default KPIRecords;
