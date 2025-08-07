
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Sector } from 'recharts';
import { Building } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import { db } from '@/lib/firebase';
import { ref as dbRef, onValue } from 'firebase/database';

const DEPARTMENTS = [
  { value: 'CCJE', label: 'College of Criminal Justice Education (CCJE)' },
  { value: 'CITCS', label: 'College of Information and Computer Science (CITCS)' },
  { value: 'CTE', label: 'College of Teacher Education (CTE)' },
  { value: 'COA', label: 'College of Accountancy (COA)' },
  { value: 'CAS', label: 'College of Arts and Sciences (CAS)' },
  { value: 'CBA', label: 'College of Business Administration (CBA)' },
  { value: 'CEA', label: 'College of Engineering and Architecture (CEA)' },
  { value: 'CHTM', label: 'College of Hospitality and Tourism Management (CHTM)' },
  { value: 'CON', label: 'College of Nursing (CON)' },
  { value: 'COL', label: 'College of Law (COL)' },
];
const PIE_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

// Custom label renderer for pie chart
const renderPieLabel = ({ cx, cy, midAngle, outerRadius, percent, name }) => {
  const RADIAN = Math.PI / 180;
  // Further increase offset for label radius
  const radius = outerRadius + 70;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  // If label is on the left, anchor to end; if right, anchor to start
  const anchor = x > cx ? 'start' : 'end';
  return (
    <text
      x={x}
      y={y}
      fill="#FFF"
      textAnchor={anchor}
      dominantBaseline="central"
      fontSize={15}
      fontWeight={700}
      style={{ pointerEvents: 'none', textShadow: '0 1px 4px #000' }}
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DepartmentOverview = () => {
  const [selectedDept, setSelectedDept] = useState('');
  const [researchers, setResearchers] = useState([]);
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const rRef = dbRef(db, 'researchers');
    const unsub = onValue(rRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const researcherArr = Object.entries(data).map(([id, val]) => ({ id, ...val }));
        setResearchers(researcherArr);
        // Gather all publications
        let allPubs = [];
        researcherArr.forEach(r => {
          if (r.publications) {
            Object.values(r.publications).forEach(pub => {
              allPubs.push({ ...pub, researcher: r });
            });
          }
        });
        setPublications(allPubs);
      } else {
        setResearchers([]);
        setPublications([]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Filtered data for selected department
  const deptLabel = DEPARTMENTS.find(d => d.value === selectedDept)?.label || 'N/A';
  const deptResearchers = researchers.filter(r => r.department === selectedDept);
  const deptPublications = publications.filter(pub => pub.researcher?.department === selectedDept);

  // Count by role
  const roleCounts = deptResearchers.reduce((acc, r) => {
    const role = r.position || 'N/A';
    acc[role] = (acc[role] || 0) + 1;
    return acc;
  }, {});
  const roleSummary = Object.entries(roleCounts).map(([role, count]) => `${count} ${role}${count > 1 ? 's' : ''}`).join(', ') || 'N/A';

  // Published/Ongoing
  const publishedCount = deptPublications.filter(pub => pub.status === 'Published').length;
  const ongoingCount = deptPublications.filter(pub => pub.status !== 'Published').length;

  // Type breakdown
  const localCount = deptPublications.filter(pub => pub.type === 'Local').length;
  const intlCount = deptPublications.filter(pub => pub.type === 'International').length;

  // Pie chart data
  const typePieData = [
    { name: 'Local', value: localCount },
    { name: 'International', value: intlCount },
  ];

  // Top contributors
  const pubCountByResearcher = {};
  deptPublications.forEach(pub => {
    const name = pub.researcher?.name || 'Unknown';
    if (!pubCountByResearcher[name]) pubCountByResearcher[name] = { count: 0, role: pub.researcher?.position || 'N/A' };
    pubCountByResearcher[name].count++;
  });
  const topContributors = Object.entries(pubCountByResearcher)
    .map(([name, { count, role }]) => ({ name, role, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Department Overview</h1>
          <p className="text-gray-400 text-lg">Comprehensive view of departmental research activities</p>
        </div>
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>Department Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <label htmlFor="dept-select" className="block text-gray-300 mb-2">Select Department</label>
              <select
                id="dept-select"
                value={selectedDept}
                onChange={e => setSelectedDept(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full max-w-md"
              >
                <option value="">-- Choose Department --</option>
                {DEPARTMENTS.map(dep => (
                  <option key={dep.value} value={dep.value}>{dep.label}</option>
                ))}
              </select>
            </div>
            {selectedDept ? (
              <div className="space-y-8">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                  {/* Left: Department Summary */}
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold mb-2">{deptLabel}</h2>
                    <div className="mb-2"><span className="font-semibold text-gray-300">Total Researchers: </span>{roleSummary}</div>
                    <div className="mb-2"><span className="font-semibold text-gray-300">Total Publications: </span>{deptPublications.length || 'N/A'}</div>
                    <div className="mb-2"><span className="font-semibold text-gray-300">Published Works: </span>{publishedCount || 'N/A'} Published, {ongoingCount || 'N/A'} Ongoing</div>
                    <div className="mb-2"><span className="font-semibold text-gray-300">Type Breakdown: </span>{localCount || 'N/A'} Local, {intlCount || 'N/A'} International</div>
                  </div>
                  {/* Right: Pie Chart with Heading */}
                  <div className="flex flex-col items-center flex-1 min-w-0 justify-center">
                    <h3 className="text-lg font-semibold mb-4 text-center">Local vs International Papers</h3>
                    <div className="w-full flex justify-center">
                      <ResponsiveContainer width={500} height={260}>
                        <PieChart margin={{ top: 32, right: 64, bottom: 32, left: 64 }}>
                          <Pie
                            data={typePieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={90}
                            fill="#8884d8"
                            dataKey="value"
                            labelLine={false}
                            label={renderPieLabel}
                          >
                            {typePieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: '#1F2937', 
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#FFF',
                            }} 
                            itemStyle={{ color: '#FFF' }}
                            formatter={(value, name) => [value, name]}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Top Contributors</h3>
                  {topContributors.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left border border-gray-700 rounded">
                        <thead>
                          <tr className="bg-gray-700 text-gray-200">
                            <th className="px-4 py-2">Researcher</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Total Publications</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topContributors.map((contrib, idx) => (
                            <tr key={contrib.name} className="border-t border-gray-700">
                              <td className="px-4 py-2 text-white font-medium">{contrib.name}</td>
                              <td className="px-4 py-2 text-gray-200">{contrib.role}</td>
                              <td className="px-4 py-2 text-gray-200">{contrib.count}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-gray-400">N/A</div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-gray-400">Select a department to view analytics.</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DepartmentOverview;
