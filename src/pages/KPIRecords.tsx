
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
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #C0C7AB 0%, #989F7E 100%)' }}>
      <Navigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-md">Faculty KPI Tracking</h1>
            <p className="text-white/90 text-lg drop-shadow-sm">Monitor academic performance indicators and faculty achievements</p>
          </div>
          <Button className="rso-dark-green hover:rso-dark-green-hover text-white shadow-lg font-semibold">
            <Plus className="h-4 w-4 mr-2" />
            Add New Entry
          </Button>
        </div>

        <Card className="bg-white shadow-2xl border-0 rounded-2xl overflow-hidden">
          <CardHeader className="rso-medium-green text-white">
            <CardTitle className="text-2xl flex items-center font-bold">
              <TrendingUp className="h-6 w-6 mr-3" />
              KPI Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="rso-light-green border-b-2 border-rso-medium-green">
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Faculty Name</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Period</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Publications</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Trainings</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Presentations</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">KPI Score</th>
                    <th className="text-left py-4 px-6 font-bold text-rso-dark-green">Performance</th>
                  </tr>
                </thead>
                <tbody>
                  {kpiRecords.map((record, index) => (
                    <tr key={record.id} className={`border-b border-gray-100 hover:bg-rso-light-green/30 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <td className="py-5 px-6 text-sm font-semibold text-rso-dark-green">{record.facultyName}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green">{record.period}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green text-center font-medium">{record.publicationsCount}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green text-center font-medium">{record.trainingsAttended}</td>
                      <td className="py-5 px-6 text-sm text-rso-dark-green text-center font-medium">{record.presentationsMade}</td>
                      <td className="py-5 px-6 text-sm text-center">
                        <span className={getScoreColor(record.kpiScore)}>
                          {record.kpiScore}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <Badge className={`${getPerformanceColor(record.performance)} border font-medium`}>
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
