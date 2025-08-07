import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Calendar, Users, ChevronDown, ChevronUp, Filter, Edit, Trash2 } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import { useNavigate } from 'react-router-dom';
import { db } from '@/lib/firebase';
import { ref as dbRef, onValue, set } from 'firebase/database';
import { Button } from '@/components/ui/button';

interface PublicationRow {
  researcherId: string;
  researcherName: string;
  date: string;
  title: string;
  department: string;
  status: string;
  type: string;
  link: string;
}

const Publications = () => {
  const [publications, setPublications] = useState<PublicationRow[]>([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' }>({ field: 'date', direction: 'desc' });
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPub, setEditPub] = useState<PublicationRow | null>(null);
  const [editForm, setEditForm] = useState({
    date: '',
    title: '',
    department: '',
    status: '',
    type: '',
    link: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const rRef = dbRef(db, 'researchers');
    const unsub = onValue(rRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const allPubs: PublicationRow[] = [];
        Object.entries(data).forEach(([rid, researcher]: any) => {
          if (researcher.publications) {
            Object.values(researcher.publications).forEach((pub: any) => {
              allPubs.push({
                researcherId: rid,
                researcherName: researcher.name,
                date: pub.date,
                title: pub.title,
                department: pub.department,
                status: pub.status,
                type: pub.type,
                link: pub.link,
              });
            });
          }
        });
        setPublications(allPubs);
      } else {
        setPublications([]);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (editPub) {
      setEditForm({
        date: editPub.date,
        title: editPub.title,
        department: editPub.department,
        status: editPub.status,
        type: editPub.type,
        link: editPub.link,
      });
    }
  }, [editPub]);

  // Get unique departments, statuses, types
  const departments = Array.from(new Set(publications.map(p => p.department))).filter(Boolean);
  const statuses = Array.from(new Set(publications.map(p => p.status))).filter(Boolean);
  const types = Array.from(new Set(publications.map(p => p.type))).filter(Boolean);

  // Filter and sort publications
  let filtered = publications.filter(pub =>
    (pub.researcherName.toLowerCase().includes(search.toLowerCase()) || pub.title.toLowerCase().includes(search.toLowerCase())) &&
    (!departmentFilter || pub.department === departmentFilter) &&
    (!statusFilter || pub.status === statusFilter) &&
    (!typeFilter || pub.type === typeFilter)
  );
  if (sort.field) {
    filtered = [...filtered].sort((a, b) => {
      if (sort.field === 'date') {
        return sort.direction === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        const valA = (a as any)[sort.field]?.toLowerCase() || '';
        const valB = (b as any)[sort.field]?.toLowerCase() || '';
        if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
        return 0;
      }
    });
  }

  const handleDelete = async (row: PublicationRow) => {
    if (!window.confirm('Are you sure you want to delete this publication?')) return;
    // Try to find the publication by title+date (since no id)
    const pubRef = dbRef(db, `researchers/${row.researcherId}/publications`);
    // Fetch publications and find the key
    const snapshot = await import('firebase/database').then(({ get }) => get(pubRef));
    if (snapshot.exists()) {
      const pubs = snapshot.val();
      const pubKey = Object.keys(pubs).find(key => pubs[key].title === row.title && pubs[key].date === row.date);
      if (pubKey) {
        await set(dbRef(db, `researchers/${row.researcherId}/publications/${pubKey}`), null);
      }
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPub) return;
    // Find the publication key by title+date
    const pubRef = dbRef(db, `researchers/${editPub.researcherId}/publications`);
    const snapshot = await import('firebase/database').then(({ get }) => get(pubRef));
    if (snapshot.exists()) {
      const pubs = snapshot.val();
      const pubKey = Object.keys(pubs).find(key => pubs[key].title === editPub.title && pubs[key].date === editPub.date);
      if (pubKey) {
        await set(dbRef(db, `researchers/${editPub.researcherId}/publications/${pubKey}`), {
          date: editForm.date,
          title: editForm.title,
          department: editForm.department,
          status: editForm.status,
          type: editForm.type,
          link: editForm.link,
        });
      }
    }
    setEditModalOpen(false);
    setEditPub(null);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Publications & Presentations</h1>
          <p className="text-gray-400 text-lg">Manage and track research publications, presentations, and academic outputs</p>
        </div>
        {/* Search Bar */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search researcher or title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white w-full max-w-md"
          />
        </div>
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Publications</p>
                  <p className="text-2xl font-bold text-white">{publications.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">This Year</p>
                  <p className="text-2xl font-bold text-white">{publications.filter(p => p.date && new Date(p.date).getFullYear() === new Date().getFullYear()).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">International</p>
                  <p className="text-2xl font-bold text-white">{publications.filter(p => p.type === 'International').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Local</p>
                  <p className="text-2xl font-bold text-white">{publications.filter(p => p.type === 'Local').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Publications Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Recent Publications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-200">
                      Date
                      <button onClick={() => setSort(s => ({ field: 'date', direction: s.direction === 'asc' ? 'desc' : 'asc' }))} className="ml-2">
                        {sort.field === 'date' && sort.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </TableHead>
                    <TableHead className="text-gray-200">
                      Researcher
                      <button onClick={() => setSort(s => ({ field: 'researcherName', direction: s.direction === 'asc' ? 'desc' : 'asc' }))} className="ml-2">
                        {sort.field === 'researcherName' && sort.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </TableHead>
                    <TableHead className="text-gray-200">
                      Title
                      <button onClick={() => setSort(s => ({ field: 'title', direction: s.direction === 'asc' ? 'desc' : 'asc' }))} className="ml-2">
                        {sort.field === 'title' && sort.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </TableHead>
                    <TableHead className="text-gray-200 relative">
                      Department
                      <button onClick={() => setShowDeptDropdown(v => !v)} className="ml-2"><Filter size={16} /></button>
                      {showDeptDropdown && (
                        <div className="absolute z-10 bg-gray-900 border border-gray-700 rounded mt-2 p-2">
                          <div className="cursor-pointer text-gray-200" onClick={() => setDepartmentFilter('')}>All</div>
                          {departments.map(dep => (
                            <div key={dep} className="cursor-pointer text-gray-200 hover:bg-gray-700 px-2" onClick={() => { setDepartmentFilter(dep); setShowDeptDropdown(false); }}>{dep}</div>
                          ))}
                        </div>
                      )}
                    </TableHead>
                    <TableHead className="text-gray-200 relative">
                      Status
                      <button onClick={() => setShowStatusDropdown(v => !v)} className="ml-2"><Filter size={16} /></button>
                      {showStatusDropdown && (
                        <div className="absolute z-10 bg-gray-900 border border-gray-700 rounded mt-2 p-2">
                          <div className="cursor-pointer text-gray-200" onClick={() => setStatusFilter('')}>All</div>
                          {statuses.map(st => (
                            <div key={st} className="cursor-pointer text-gray-200 hover:bg-gray-700 px-2" onClick={() => { setStatusFilter(st); setShowStatusDropdown(false); }}>{st}</div>
                          ))}
                        </div>
                      )}
                    </TableHead>
                    <TableHead className="text-gray-200 relative">
                      Type
                      <button onClick={() => setShowTypeDropdown(v => !v)} className="ml-2"><Filter size={16} /></button>
                      {showTypeDropdown && (
                        <div className="absolute z-10 bg-gray-900 border border-gray-700 rounded mt-2 p-2">
                          <div className="cursor-pointer text-gray-200" onClick={() => setTypeFilter('')}>All</div>
                          {types.map(tp => (
                            <div key={tp} className="cursor-pointer text-gray-200 hover:bg-gray-700 px-2" onClick={() => { setTypeFilter(tp); setShowTypeDropdown(false); }}>{tp}</div>
                          ))}
                        </div>
                      )}
                    </TableHead>
                    <TableHead className="text-gray-200">Link</TableHead>
                    <TableHead className="text-gray-200">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((pub, idx) => (
                    <TableRow key={idx} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-white font-medium">{pub.date}</TableCell>
                      <TableCell className="text-blue-400 underline cursor-pointer" onClick={() => navigate(`/researcher/${pub.researcherId}`)}>{pub.researcherName}</TableCell>
                      <TableCell className="text-white max-w-xs">
                        <div className="truncate" title={pub.title}>{pub.title}</div>
                      </TableCell>
                      <TableCell className="text-gray-300">{pub.department}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-gray-600 ${
                          pub.status === 'Published' ? 'text-green-400 border-green-600' :
                          pub.status === 'Accepted' ? 'text-blue-400 border-blue-600' :
                          'text-yellow-400 border-yellow-600'
                        }`}>
                          {pub.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-gray-600 ${
                          pub.type === 'International' ? 'text-purple-400 border-purple-600' : 'text-orange-400 border-orange-600'
                        }`}>
                          {pub.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {pub.link ? (
                          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Link</a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="mr-0" onClick={e => { e.stopPropagation(); setEditPub(pub); setEditModalOpen(true); }}><Edit size={16} /></Button>
                        <Button size="sm" variant="destructive" className="ml-2" onClick={e => { e.stopPropagation(); handleDelete(pub); }}><Trash2 size={16} /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-gray-400 py-4">No publications found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Edit Publication Modal (skeleton) */}
      {editModalOpen && editPub && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-8 min-w-[350px] max-w-[90vw]">
            <h2 className="text-xl font-bold mb-4">Edit Publication</h2>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1">Date</label>
                <input type="date" name="date" value={editForm.date} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Title</label>
                <input name="title" value={editForm.title} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Department</label>
                <select name="department" value={editForm.department} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required>
                  <option value="">Select Department</option>
                  <option value="CCJE">College of Criminal Justice Education (CCJE)</option>
                  <option value="CITCS">College of Information and Computer Science (CITCS)</option>
                  <option value="CTE">College of Teacher Education (CTE)</option>
                  <option value="COA">College of Accountancy (COA)</option>
                  <option value="CAS">College of Arts and Sciences (CAS)</option>
                  <option value="CBA">College of Business Administration (CBA)</option>
                  <option value="CEA">College of Engineering and Architecture (CEA)</option>
                  <option value="CHTM">College of Hospitality and Tourism Management (CHTM)</option>
                  <option value="CON">College of Nursing (CON)</option>
                  <option value="COL">College of Law (COL)</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Status</label>
                <select name="status" value={editForm.status} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required>
                  <option value="Published">Published</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Accepted">Accepted</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Type</label>
                <select name="type" value={editForm.type} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required>
                  <option value="Local">Local</option>
                  <option value="International">International</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Link</label>
                <input name="link" value={editForm.link} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" type="button" onClick={() => setEditModalOpen(false)} className="bg-gray-200 text-black border border-gray-400 hover:bg-gray-300">Cancel</Button>
                <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">Save Changes</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Publications;
