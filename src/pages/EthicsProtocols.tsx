import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, FileText, CheckCircle, Plus, Edit, Trash2 } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import { db } from '@/lib/firebase';
import { ref as dbRef, push, onValue, set } from 'firebase/database';

interface Protocol {
  id: string;
  listOfTitle: string;
  department: string;
  dateForwarded: string;
  status: string;
  actionTaken: string;
}

const statusOptions = ['Approved', 'Under Review', 'Rejected'];

const EthicsProtocols = () => {
  const [protocols, setProtocols] = useState<Protocol[]>([]);
  const [form, setForm] = useState({
    listOfTitle: '',
    department: '',
    dateForwarded: '',
    status: statusOptions[0],
    actionTaken: '',
  });
  const [adding, setAdding] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editProtocol, setEditProtocol] = useState<Protocol | null>(null);
  const [editForm, setEditForm] = useState({
    listOfTitle: '',
    department: '',
    dateForwarded: '',
    status: statusOptions[0],
    actionTaken: '',
  });

  useEffect(() => {
    const pRef = dbRef(db, 'ethicsProtocols');
    const unsub = onValue(pRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([id, val]: any) => ({ id, ...val }));
        setProtocols(arr);
      } else {
        setProtocols([]);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (editProtocol) {
      setEditForm({
        listOfTitle: editProtocol.listOfTitle,
        department: editProtocol.department,
        dateForwarded: editProtocol.dateForwarded,
        status: editProtocol.status,
        actionTaken: editProtocol.actionTaken,
      });
    }
  }, [editProtocol]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const pRef = dbRef(db, 'ethicsProtocols');
    await push(pRef, form);
    setForm({ listOfTitle: '', department: '', dateForwarded: '', status: statusOptions[0], actionTaken: '' });
    setAdding(false);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editProtocol) return;
    const pRef = dbRef(db, `ethicsProtocols/${editProtocol.id}`);
    await set(pRef, editForm);
    setEditModalOpen(false);
    setEditProtocol(null);
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    const pRef = dbRef(db, `ethicsProtocols/${id}`);
    await set(pRef, null);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Ethics Reviewed Protocols</h1>
          <p className="text-gray-400 text-lg">Manage research ethics protocols and review processes</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Protocols</p>
                  <p className="text-2xl font-bold text-white">{protocols.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Under Review</p>
                  <p className="text-2xl font-bold text-white">{protocols.filter(p => p.status === 'Under Review').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Approved</p>
                  <p className="text-2xl font-bold text-white">{protocols.filter(p => p.status === 'Approved').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Add New Protocol Form */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Submit New Protocol</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="md:col-span-2">
                <Label htmlFor="listOfTitle" className="text-gray-200">List of Title</Label>
                <Input id="listOfTitle" name="listOfTitle" value={form.listOfTitle} onChange={handleInput} placeholder="Research study title" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="department" className="text-gray-200">Department</Label>
                <select
                  id="department"
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
              <div>
                <Label htmlFor="dateForwarded" className="text-gray-200">Date Forwarded</Label>
                <Input id="dateForwarded" name="dateForwarded" type="date" value={form.dateForwarded} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="status" className="text-gray-200">Status</Label>
                <select id="status" name="status" value={form.status} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white rounded px-2 py-2 w-full">
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="actionTaken" className="text-gray-200">Action Taken</Label>
                <Input id="actionTaken" name="actionTaken" value={form.actionTaken} onChange={handleInput} placeholder="Description of action taken" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div className="col-span-full">
                <Button type="submit" className="bg-white text-black hover:bg-gray-200" disabled={adding}>{adding ? 'Submitting...' : 'Submit Protocol'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* Ethics Protocols Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Ethics Protocol Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-200">List of Title</TableHead>
                    <TableHead className="text-gray-200">Department</TableHead>
                    <TableHead className="text-gray-200">Date Forwarded</TableHead>
                    <TableHead className="text-gray-200">Status</TableHead>
                    <TableHead className="text-gray-200">Action Taken</TableHead>
                    <TableHead className="text-gray-200">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {protocols.map((protocol) => (
                    <TableRow key={protocol.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-gray-300 max-w-xs">
                        <div className="truncate" title={protocol.listOfTitle}>{protocol.listOfTitle}</div>
                      </TableCell>
                      <TableCell className="text-gray-300">{protocol.department}</TableCell>
                      <TableCell className="text-gray-300">{protocol.dateForwarded}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`border-gray-600 ${
                          protocol.status === 'Approved' ? 'text-green-400 border-green-600' :
                          protocol.status === 'Rejected' ? 'text-red-400 border-red-600' :
                          'text-yellow-400 border-yellow-600'
                        }`}>
                          {protocol.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300 max-w-xs">
                        <div className="truncate" title={protocol.actionTaken}>{protocol.actionTaken}</div>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="mr-0" onClick={e => { e.stopPropagation(); setEditProtocol(protocol); setEditModalOpen(true); }}><Edit size={16} /></Button>
                        <Button size="sm" variant="destructive" className="ml-2" onClick={e => { e.stopPropagation(); handleDelete(protocol.id); }}><Trash2 size={16} /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {protocols.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-400 py-4">No protocols found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      {editModalOpen && editProtocol && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-8 min-w-[350px] max-w-[90vw]">
            <h2 className="text-xl font-bold mb-4">Edit Protocol</h2>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1">List of Title</label>
                <input name="listOfTitle" value={editForm.listOfTitle} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
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
                <label className="block mb-1">Date Forwarded</label>
                <input type="date" name="dateForwarded" value={editForm.dateForwarded} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Status</label>
                <select name="status" value={editForm.status} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required>
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1">Action Taken</label>
                <input name="actionTaken" value={editForm.actionTaken} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
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

export default EthicsProtocols;
