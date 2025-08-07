import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '@/lib/firebase';
import { ref as dbRef, get, push, onValue, set } from 'firebase/database';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, ArrowLeft, Edit, Trash2 } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface Publication {
  id: string;
  date: string;
  faculty: string;
  title: string;
  department: string;
  subsidy: string;
  status: string;
  type: string;
  link?: string;
}

interface Researcher {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  specialization: string;
  imageUrl?: string;
  publications?: Record<string, Publication>;
}

const statusOptions = ["Published", "Under Review", "Accepted"];
const typeOptions = ["Local", "International"];

const ResearcherDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [researcher, setResearcher] = useState<Researcher | null>(null);
  const [publications, setPublications] = useState<Publication[]>([]);
  const [pubForm, setPubForm] = useState({
    date: '',
    faculty: '',
    title: '',
    department: '',
    subsidy: '',
    status: statusOptions[0],
    type: typeOptions[0],
    link: '',
  });
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editPub, setEditPub] = useState<Publication | null>(null);
  const [editForm, setEditForm] = useState({
    date: '',
    faculty: '',
    title: '',
    department: '',
    subsidy: '',
    status: statusOptions[0],
    type: typeOptions[0],
    link: '',
  });

  useEffect(() => {
    if (!id) return;
    const rRef = dbRef(db, 'researchers/' + id);
    get(rRef).then((snapshot) => {
      if (snapshot.exists()) {
        setResearcher({ id, ...snapshot.val() });
      } else {
        setResearcher(null);
      }
    });
    // Listen for publications
    const pubRef = dbRef(db, `researchers/${id}/publications`);
    const unsub = onValue(pubRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([pid, val]: any) => ({ id: pid, ...val }));
        setPublications(arr);
      } else {
        setPublications([]);
      }
    });
    return () => unsub();
  }, [id]);

  useEffect(() => {
    if (editPub) {
      setEditForm({
        date: editPub.date,
        faculty: editPub.faculty,
        title: editPub.title,
        department: editPub.department,
        subsidy: editPub.subsidy,
        status: editPub.status,
        type: editPub.type,
        link: editPub.link,
      });
    }
  }, [editPub]);

  const handlePubInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPubForm((f) => ({ ...f, [name]: value }));
  };

  const handleAddPublication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setAdding(true);
    const pubRef = dbRef(db, `researchers/${id}/publications`);
    await push(pubRef, pubForm);
    setPubForm({
      date: '',
      faculty: '',
      title: '',
      department: '',
      subsidy: '',
      status: statusOptions[0],
      type: typeOptions[0],
      link: '',
    });
    setAdding(false);
  };

  const handleDelete = async (pubId: string) => {
    if (!window.confirm('Are you sure you want to delete this publication?')) return;
    if (!id) return;
    const pubRef = dbRef(db, `researchers/${id}/publications/${pubId}`);
    await set(pubRef, null);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editPub || !id) return;
    const pubRef = dbRef(db, `researchers/${id}/publications/${editPub.id}`);
    await set(pubRef, {
      date: editForm.date,
      faculty: editForm.faculty,
      title: editForm.title,
      department: editForm.department,
      subsidy: editForm.subsidy,
      status: editForm.status,
      type: editForm.type,
      link: editForm.link,
    });
    setEditModalOpen(false);
    setEditPub(null);
  };

  // Filter publications by title
  const filteredPublications = publications.filter(pub => pub.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      <div className="container mx-auto px-6 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-300 hover:text-white mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" /> Back to Researchers
        </button>
        {/* Researcher Details Card */}
        <Card className="bg-gray-800 border-gray-700 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start p-6 md:p-10 gap-6 md:gap-12 mb-10">
          {/* Left: Photo */}
          <div className="flex flex-col items-center min-w-[140px] md:min-w-[200px] w-full md:w-auto">
            {researcher?.imageUrl ? (
              <img src={researcher.imageUrl} alt={researcher.name} className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-gray-700" />
            ) : (
              <User className="w-32 h-32 md:w-44 md:h-44 text-gray-400 border-4 border-gray-700 rounded-full p-8" />
            )}
            <div className="mt-4">
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-base px-3 py-1">
                {researcher?.department}
              </Badge>
            </div>
          </div>
          {/* Right: Details */}
          <div className="flex-1 w-full flex flex-col justify-center">
            {researcher ? (
              <>
                <div className="mb-2 flex flex-col md:flex-row md:items-center md:gap-8">
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-1 break-words whitespace-pre-wrap">{researcher.name}</h2>
                  <span className="text-gray-400 text-base md:text-lg break-words whitespace-pre-wrap">{researcher.position}</span>
                </div>
                <div className="mb-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-white text-base md:text-lg break-words whitespace-pre-wrap">{researcher.email}</span>
                </div>
                <div className="mb-2 flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-white text-base md:text-lg break-words whitespace-pre-wrap">{researcher.phone}</span>
                </div>
                <div className="mb-2">
                  <span className="font-semibold text-gray-300">Specialization: </span>
                  <span className="text-white text-base md:text-lg break-words whitespace-pre-wrap">{researcher.specialization}</span>
                </div>
                <div className="mt-4">
                  <span className="font-semibold text-gray-300">Total Publications: </span>
                  <span className="text-white text-base md:text-lg">{publications.length}</span>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400">Researcher not found.</div>
            )}
          </div>
        </Card>
        {/* Publications Section */}
        <Card className="bg-gray-800 border-gray-700 w-full max-w-7xl mx-auto mb-10 p-4 md:p-8">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-white">Publications</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Search Bar for Publications */}
            <div className="mb-4 flex flex-col sm:flex-row justify-end gap-2">
              <input
                type="text"
                placeholder="Search by title..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white w-full max-w-md"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left border border-gray-700 rounded text-xs md:text-sm">
                <thead>
                  <tr className="bg-gray-700 text-gray-200">
                    <th className="px-2 md:px-4 py-2">Date of Application</th>
                    <th className="px-2 md:px-4 py-2">Name of Faculty/Research Worker</th>
                    <th className="px-2 md:px-4 py-2">Title of Paper</th>
                    <th className="px-2 md:px-4 py-2">Department</th>
                    <th className="px-2 md:px-4 py-2">Research Subsidy</th>
                    <th className="px-2 md:px-4 py-2">Status</th>
                    <th className="px-2 md:px-4 py-2">Local/International</th>
                    <th className="px-2 md:px-4 py-2">Link</th>
                    <th className="px-2 md:px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPublications.map((pub) => (
                    <tr key={pub.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                      <td className="px-2 md:px-4 py-2 text-gray-100 whitespace-pre-wrap break-words max-w-xs">{pub.date}</td>
                      <td className="px-2 md:px-4 py-2 text-gray-200 whitespace-pre-wrap break-words max-w-xs">{pub.faculty}</td>
                      <td className="px-2 md:px-4 py-2 text-white font-medium whitespace-pre-wrap break-words max-w-lg">{pub.title}</td>
                      <td className="px-2 md:px-4 py-2 text-gray-200 whitespace-pre-wrap break-words max-w-xs">{pub.department}</td>
                      <td className="px-2 md:px-4 py-2 text-gray-200 whitespace-pre-wrap break-words max-w-xs">{pub.subsidy}</td>
                      <td className="px-2 md:px-4 py-2 text-gray-200 whitespace-pre-wrap break-words max-w-xs">{pub.status}</td>
                      <td className="px-2 md:px-4 py-2 text-gray-200 whitespace-pre-wrap break-words max-w-xs">{pub.type}</td>
                      <td className="px-2 md:px-4 py-2">
                        {pub.link ? (
                          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline break-all">Link</a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-2 md:px-4 py-2">
                        <div className="flex flex-row gap-2 flex-wrap justify-center md:justify-start">
                          <Button size="sm" variant="outline" onClick={e => { e.stopPropagation(); setEditPub(pub); setEditModalOpen(true); }}><Edit size={16} /></Button>
                          <Button size="sm" variant="destructive" onClick={e => { e.stopPropagation(); handleDelete(pub.id); }}><Trash2 size={16} /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredPublications.length === 0 && (
                    <tr><td colSpan={9} className="text-center text-gray-400 py-4">No publications found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        {/* Add Publication Section Below */}
        <Card className="bg-gray-800 border-gray-700 w-full max-w-7xl mx-auto mt-8 p-4 md:p-8">
          <CardHeader>
            <CardTitle className="text-xl md:text-2xl text-white">Add Publication</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddPublication} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="block text-gray-200 mb-1">Date of Application</label>
                <Input type="date" name="date" value={pubForm.date} onChange={handlePubInput} className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Name of Faculty/Research Worker</label>
                <Input name="faculty" value={pubForm.faculty} onChange={handlePubInput} placeholder="Faculty/Research Worker" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Title of Paper</label>
                <Input name="title" value={pubForm.title} onChange={handlePubInput} placeholder="Paper Title" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Department</label>
                <select
                  name="department"
                  value={pubForm.department}
                  onChange={handlePubInput}
                  className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full"
                  required
                >
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
                <label className="block text-gray-200 mb-1">Research Subsidy</label>
                <Input name="subsidy" value={pubForm.subsidy} onChange={handlePubInput} placeholder="Research Subsidy" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Status</label>
                <select name="status" value={pubForm.status} onChange={handlePubInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full">
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Local/International</label>
                <select name="type" value={pubForm.type} onChange={handlePubInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full">
                  {typeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Publication Link</label>
                <Input name="link" value={pubForm.link} onChange={handlePubInput} placeholder="https://..." className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div className="col-span-full">
                <Button type="submit" className="bg-white text-black hover:bg-gray-200 w-full md:w-auto" disabled={adding}>{adding ? 'Adding...' : 'Add Publication'}</Button>
              </div>
            </form>
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
                <label className="block mb-1">Name of Faculty/Research Worker</label>
                <input name="faculty" value={editForm.faculty} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
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
                <label className="block mb-1">Research Subsidy</label>
                <input name="subsidy" value={editForm.subsidy} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Status</label>
                <select name="status" value={editForm.status} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required>
                  {statusOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Type</label>
                <select name="type" value={editForm.type} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required>
                  {typeOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
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

export default ResearcherDetails; 