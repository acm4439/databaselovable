import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import { db } from '@/lib/firebase';
import { ref as dbRef, push, onValue, set } from 'firebase/database';
import { Edit, Trash2 } from 'lucide-react';

interface DataTool {
  id: string;
  faculty: string;
  degree: string;
  sex: string;
  researchTitle: string;
  ownership: string;
  dateVenuePresented: string;
  datePublished: string;
  journalTitle: string;
  journalLink: string;
  department: string;
}

const DataCollection = () => {
  const [tools, setTools] = useState<DataTool[]>([]);
  const [form, setForm] = useState({
    faculty: '',
    degree: '',
    sex: '',
    researchTitle: '',
    ownership: 'Author',
    dateVenuePresented: '',
    datePublished: '',
    journalTitle: '',
    journalLink: '',
    department: '',
  });
  const [adding, setAdding] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTool, setEditTool] = useState<DataTool | null>(null);
  const [editForm, setEditForm] = useState({
    faculty: '',
    degree: '',
    sex: '',
    researchTitle: '',
    ownership: 'Author',
    dateVenuePresented: '',
    datePublished: '',
    journalTitle: '',
    journalLink: '',
    department: '',
  });

  useEffect(() => {
    const tRef = dbRef(db, 'dataCollectionTools');
    const unsub = onValue(tRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([id, val]: any) => ({ id, ...val }));
        setTools(arr);
      } else {
        setTools([]);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (editTool) {
      setEditForm({
        faculty: editTool.faculty,
        degree: editTool.degree,
        sex: editTool.sex,
        researchTitle: editTool.researchTitle,
        ownership: editTool.ownership,
        dateVenuePresented: editTool.dateVenuePresented,
        datePublished: editTool.datePublished,
        journalTitle: editTool.journalTitle,
        journalLink: editTool.journalLink,
        department: editTool.department,
      });
    }
  }, [editTool]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const tRef = dbRef(db, 'dataCollectionTools');
    await push(tRef, form);
    setForm({ faculty: '', degree: '', sex: '', researchTitle: '', ownership: 'Author', dateVenuePresented: '', datePublished: '', journalTitle: '', journalLink: '', department: '' });
    setAdding(false);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editTool) return;
    const tRef = dbRef(db, `dataCollectionTools/${editTool.id}`);
    await set(tRef, editForm);
    setEditModalOpen(false);
    setEditTool(null);
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    const tRef = dbRef(db, `dataCollectionTools/${id}`);
    await set(tRef, null);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Data Collection Tools</h1>
          <p className="text-gray-400 text-lg">Manage and configure data collection instruments and methodologies</p>
        </div>
        {/* Add New Data Tool Form */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white">Add Data Collection Tool</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-gray-200 mb-1">Name of Faculty</label>
                <input name="faculty" value={form.faculty} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Degree</label>
                <input name="degree" value={form.degree} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Sex</label>
                <input name="sex" value={form.sex} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Research Title</label>
                <input name="researchTitle" value={form.researchTitle} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Ownership</label>
                <select name="ownership" value={form.ownership} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full">
                  <option value="Author">Author</option>
                  <option value="Co-author">Co-author</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Date and Venue Presented</label>
                <input name="dateVenuePresented" value={form.dateVenuePresented} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full" placeholder="MM,DD,YY - Venue" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Date Published</label>
                <input name="datePublished" type="date" value={form.datePublished} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Journal Published (Title)</label>
                <input name="journalTitle" value={form.journalTitle} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Journal Published (Link)</label>
                <input name="journalLink" value={form.journalLink} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block text-gray-200 mb-1">Department</label>
                <select
                  name="department"
                  value={form.department}
                  onChange={handleInput}
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
              <div className="col-span-full">
                <Button type="submit" className="bg-white text-black hover:bg-gray-200" disabled={adding}>{adding ? 'Adding...' : 'Add Tool'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* Data Collection Tools Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Data Collection Tools List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto w-full">
              <table className="min-w-full text-left border border-gray-700 rounded">
                <thead>
                  <tr className="bg-gray-700 text-gray-200">
                    <th className="px-4 py-2">Name of Faculty</th>
                    <th className="px-4 py-2">Degree</th>
                    <th className="px-4 py-2">Sex</th>
                    <th className="px-4 py-2">Research Title</th>
                    <th className="px-4 py-2">Ownership</th>
                    <th className="px-4 py-2">Date & Venue Presented</th>
                    <th className="px-4 py-2">Date Published</th>
                    <th className="px-4 py-2">Journal Title</th>
                    <th className="px-4 py-2">Journal Link</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-2 py-2 whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tools.map(tool => (
                    <tr key={tool.id} className="border-t border-gray-700 hover:bg-gray-700/50">
                      <td className="px-4 py-2 text-gray-100">{tool.faculty}</td>
                      <td className="px-4 py-2 text-gray-200">{tool.degree}</td>
                      <td className="px-4 py-2 text-gray-200">{tool.sex}</td>
                      <td className="px-4 py-2 text-white font-medium">{tool.researchTitle}</td>
                      <td className="px-4 py-2 text-gray-200">{tool.ownership}</td>
                      <td className="px-4 py-2 text-gray-200">{tool.dateVenuePresented}</td>
                      <td className="px-4 py-2 text-gray-200">{tool.datePublished}</td>
                      <td className="px-4 py-2 text-gray-200">{tool.journalTitle}</td>
                      <td className="px-4 py-2">
                        {tool.journalLink ? (
                          <a href={tool.journalLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">Link</a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-4 py-2 text-gray-200">{tool.department}</td>
                      <td className="px-2 py-2 whitespace-nowrap">
                        <Button size="sm" variant="outline" className="mr-0" onClick={e => { e.stopPropagation(); setEditTool(tool); setEditModalOpen(true); }}><Edit size={16} /></Button>
                        <Button size="sm" variant="destructive" className="ml-2" onClick={e => { e.stopPropagation(); handleDelete(tool.id); }}><Trash2 size={16} /></Button>
                      </td>
                    </tr>
                  ))}
                  {tools.length === 0 && (
                    <tr>
                      <td colSpan={10} className="text-center text-gray-400 py-4">No data collection tools found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      {editModalOpen && editTool && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-8 min-w-[350px] max-w-[90vw]">
            <h2 className="text-xl font-bold mb-4">Edit Data Collection Tool</h2>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1">Name of Faculty</label>
                <input name="faculty" value={editForm.faculty} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Degree</label>
                <input name="degree" value={editForm.degree} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Sex</label>
                <input name="sex" value={editForm.sex} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Research Title</label>
                <input name="researchTitle" value={editForm.researchTitle} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Ownership</label>
                <select name="ownership" value={editForm.ownership} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required>
                  <option value="Author">Author</option>
                  <option value="Co-author">Co-author</option>
                </select>
              </div>
              <div>
                <label className="block mb-1">Date and Venue Presented</label>
                <input name="dateVenuePresented" value={editForm.dateVenuePresented} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Date Published</label>
                <input name="datePublished" type="date" value={editForm.datePublished} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Journal Published (Title)</label>
                <input name="journalTitle" value={editForm.journalTitle} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Journal Published (Link)</label>
                <input name="journalLink" value={editForm.journalLink} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
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

export default DataCollection;
