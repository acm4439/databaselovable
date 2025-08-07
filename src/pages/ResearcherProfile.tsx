import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, BookOpen, Award, Users, ChevronDown, ChevronUp, Filter, Edit, Trash2 } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import FileUpload from '@/components/FileUpload';
import React, { useEffect, useState } from 'react';
import { db, storage } from '@/lib/firebase';
import { ref as dbRef, push, onValue, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

const DEFAULT_IMAGE = null; // We'll use the User icon if no image

interface Researcher {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  specialization: string;
  imageUrl?: string;
}

const ResearcherProfile = () => {
  const [form, setForm] = useState({
    name: '',
    department: '',
    position: '',
    email: '',
    phone: '',
    specialization: '',
    image: null as File | null,
  });
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);
  const [showPosDropdown, setShowPosDropdown] = useState(false);
  const [sort, setSort] = useState<{ field: string; direction: 'asc' | 'desc' }>({ field: '', direction: 'asc' });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editResearcher, setEditResearcher] = useState<Researcher | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    department: '',
    position: '',
    phone: '',
    specialization: '',
    image: null as File | null,
    imageUrl: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const rRef = dbRef(db, 'researchers');
    const unsubscribe = onValue(rRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([id, val]: any) => ({ id, ...val }));
        setResearchers(arr);
      } else {
        setResearchers([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // When opening the modal, prefill the form
  useEffect(() => {
    if (editResearcher) {
      setEditForm({
        name: editResearcher.name,
        department: editResearcher.department,
        position: editResearcher.position,
        phone: editResearcher.phone,
        specialization: editResearcher.specialization,
        image: null,
        imageUrl: editResearcher.imageUrl || '',
      });
    }
  }, [editResearcher]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & HTMLSelectElement;
    if (name === 'image' && files) {
      setForm((f) => ({ ...f, image: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    let imageUrl = '';
    if (form.image) {
      // Upload image to Firebase Storage
      const imgRef = storageRef(storage, `researchers/${Date.now()}_${form.image.name}`);
      await uploadBytes(imgRef, form.image);
      imageUrl = await getDownloadURL(imgRef);
    }
    // Use sanitized email as key
    const emailKey = form.email.replace(/\./g, '_');
    const rRef = dbRef(db, 'researchers/' + emailKey);
    await set(rRef, {
      name: form.name,
      department: form.department,
      position: form.position,
      email: form.email,
      phone: form.phone,
      specialization: form.specialization,
      imageUrl: imageUrl || '',
    });
    setForm({
      name: '',
      department: '',
      position: '',
      email: '',
      phone: '',
      specialization: '',
      image: null,
    });
    setUploading(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this researcher?')) return;
    const rRef = dbRef(db, 'researchers/' + id);
    await set(rRef, null);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & HTMLSelectElement;
    if (name === 'image' && files) {
      setEditForm((f) => ({ ...f, image: files[0] }));
    } else {
      setEditForm((f) => ({ ...f, [name]: value }));
    }
  };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editResearcher) return;
    let imageUrl = editForm.imageUrl;
    if (editForm.image) {
      const imgRef = storageRef(storage, `researchers/${Date.now()}_${editForm.image.name}`);
      await uploadBytes(imgRef, editForm.image);
      imageUrl = await getDownloadURL(imgRef);
    }
    const rRef = dbRef(db, 'researchers/' + editResearcher.id);
    await set(rRef, {
      name: editForm.name,
      department: editForm.department,
      position: editForm.position,
      email: editResearcher.id, // id is the emailKey
      phone: editForm.phone,
      specialization: editForm.specialization,
      imageUrl: imageUrl || '',
    });
    setEditModalOpen(false);
    setEditResearcher(null);
  };

  // Get unique departments
  const departments = Array.from(new Set(researchers.map(r => r.department))).filter(Boolean);
  // Filtered and sorted researchers
  let filtered = researchers.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) &&
    (!departmentFilter || r.department === departmentFilter) &&
    (!positionFilter || r.position === positionFilter)
  );
  if (sort.field === 'name') {
    filtered = [...filtered].sort((a, b) => {
      const valA = a.name.toLowerCase();
      const valB = b.name.toLowerCase();
      if (valA < valB) return sort.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  // Calculate total publications for all researchers
  const totalPublications = researchers.reduce((sum, r) => {
    if (r.publications) {
      return sum + Object.keys(r.publications).length;
    }
    return sum;
  }, 0);

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Researcher Profiles</h1>
          <p className="text-gray-400 text-lg">Manage and view detailed researcher information and profiles</p>
        </div>
        {/* Search Bar */}
        <div className="mb-4 flex justify-end">
          <input
            type="text"
            placeholder="Search researcher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 border border-gray-600 text-white w-full max-w-md"
          />
        </div>
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Researchers</p>
                  <p className="text-2xl font-bold text-white">{researchers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Publications</p>
                  <p className="text-2xl font-bold text-white">{totalPublications}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Researchers Table FIRST */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white">Current Researchers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto w-full max-w-[1600px] mx-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-200 relative">
                      Department
                      <button onClick={() => setShowDeptDropdown(v => !v)} className="ml-2"><Filter size={16} /></button>
                      {showDeptDropdown && (
                        <div className="absolute z-10 bg-gray-900 border border-gray-700 rounded shadow-lg mt-2 p-2 min-w-[140px] flex flex-col gap-1">
                          <div className="cursor-pointer text-gray-200 px-2 py-1 hover:bg-gray-700 rounded" onClick={() => { setDepartmentFilter(''); setShowDeptDropdown(false); }}>All</div>
                          {departments.map(dep => (
                            <div key={dep} className="cursor-pointer text-gray-200 px-2 py-1 hover:bg-gray-700 rounded" onClick={() => { setDepartmentFilter(dep); setShowDeptDropdown(false); }}>{dep}</div>
                          ))}
                        </div>
                      )}
                    </TableHead>
                    <TableHead className="text-gray-200 relative">
                      Position
                      <button onClick={() => setShowPosDropdown(v => !v)} className="ml-2"><Filter size={16} /></button>
                      {showPosDropdown && (
                        <div className="absolute z-10 bg-gray-900 border border-gray-700 rounded shadow-lg mt-2 p-2 min-w-[140px] flex flex-col gap-1">
                          <div className="cursor-pointer text-gray-200 px-2 py-1 hover:bg-gray-700 rounded" onClick={() => { setPositionFilter(''); setShowPosDropdown(false); }}>All</div>
                          {['Student', 'Teacher', 'Staff'].map(pos => (
                            <div key={pos} className="cursor-pointer text-gray-200 px-2 py-1 hover:bg-gray-700 rounded" onClick={() => { setPositionFilter(pos); setShowPosDropdown(false); }}>{pos}</div>
                          ))}
                        </div>
                      )}
                    </TableHead>
                    <TableHead className="text-gray-200">
                      Name
                      <button onClick={() => setSort(s => ({ field: 'name', direction: s.direction === 'asc' ? 'desc' : 'asc' }))} className="ml-2">
                        {sort.field === 'name' && sort.direction === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </TableHead>
                    <TableHead className="text-gray-200">Contact</TableHead>
                    <TableHead className="text-gray-200">Specialization</TableHead>
                    <TableHead className="text-gray-200 whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((researcher) => (
                    <TableRow key={researcher.id} className="border-gray-700 hover:bg-gray-700/50 cursor-pointer" onClick={() => navigate(`/researcher/${researcher.id}`)}>
                      <TableCell className="text-gray-300">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {researcher.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{researcher.position}</TableCell>
                      <TableCell className="text-white font-medium">{researcher.name}</TableCell>
                      <TableCell className="text-gray-300">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <Mail className="h-3 w-3" />
                            <span className="text-xs">{researcher.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span className="text-xs">{researcher.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{researcher.specialization}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Button size="sm" variant="outline" className="mr-0" onClick={e => { e.stopPropagation(); setEditResearcher(researcher); setEditModalOpen(true); }}><Edit size={16} /></Button>
                        <Button size="sm" variant="destructive" className="ml-2" onClick={e => { e.stopPropagation(); handleDelete(researcher.id); }}><Trash2 size={16} /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-400 py-4">No researchers found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        {/* Add New Researcher SECOND */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white">Add New Researcher</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                <Input id="name" name="name" value={form.name} onChange={handleInputChange} placeholder="Dr. John Smith" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="department" className="text-gray-200">Department</Label>
                <select
                  id="department"
                  name="department"
                  value={form.department}
                  onChange={handleInputChange}
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
                <Label htmlFor="position" className="text-gray-200">Position</Label>
                <Input id="position" name="position" value={form.position} onChange={handleInputChange} placeholder="Professor" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-200">Email</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleInputChange} placeholder="j.smith@university.edu" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="phone" className="text-gray-200">Phone</Label>
                <Input id="phone" name="phone" value={form.phone} onChange={handleInputChange} placeholder="+1-555-0100" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="specialization" className="text-gray-200">Specialization</Label>
                <Input id="specialization" name="specialization" value={form.specialization} onChange={handleInputChange} placeholder="Machine Learning" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div className="col-span-full">
                <Label htmlFor="image" className="text-gray-200">Profile Picture (optional)</Label>
                <Input id="image" name="image" type="file" accept="image/*" onChange={handleInputChange} className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div className="col-span-full">
                <Button type="submit" className="bg-white text-black hover:bg-gray-200" disabled={uploading}>{uploading ? 'Adding...' : 'Add Researcher'}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* File Upload (CSV, etc.) - keep for future use */}
        {/* <div className="mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div> */}
      </div>
      {/* Edit Researcher Modal (skeleton) */}
      {editModalOpen && editResearcher && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-8 min-w-[350px] max-w-[90vw]">
            <h2 className="text-xl font-bold mb-4">Edit Researcher</h2>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input id="edit-name" name="name" value={editForm.name} onChange={handleEditInputChange} required className="bg-white text-black border-black border-2" />
              </div>
              <div>
                <Label htmlFor="edit-department">Department</Label>
                <select
                  id="edit-department"
                  name="department"
                  value={editForm.department}
                  onChange={handleEditInputChange}
                  className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full"
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
                <Label htmlFor="edit-position">Position</Label>
                <Input id="edit-position" name="position" value={editForm.position} onChange={handleEditInputChange} required className="bg-white text-black border-black border-2" />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input id="edit-phone" name="phone" value={editForm.phone} onChange={handleEditInputChange} required className="bg-white text-black border-black border-2" />
              </div>
              <div>
                <Label htmlFor="edit-specialization">Specialization</Label>
                <Input id="edit-specialization" name="specialization" value={editForm.specialization} onChange={handleEditInputChange} required className="bg-white text-black border-black border-2" />
              </div>
              <div>
                <Label htmlFor="edit-image">Profile Picture (optional)</Label>
                <Input id="edit-image" name="image" type="file" accept="image/*" onChange={handleEditInputChange} className="bg-white text-black border-black border-2" />
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

export default ResearcherProfile;
