import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, Calendar, Plus, Edit, Trash2 } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import { db } from '@/lib/firebase';
import { ref as dbRef, push, onValue, set } from 'firebase/database';

interface TrainingActivity {
  id: string;
  dateOfActivity: string;
  nameOfActivity: string;
  venue: string;
  facilitatorsParticipants: string;
  numberOfParticipants: number;
  activityReport: string;
  department: string;
}

const TrainingSeminars = () => {
  const [activities, setActivities] = useState<TrainingActivity[]>([]);
  const [form, setForm] = useState({
    dateOfActivity: '',
    nameOfActivity: '',
    venue: '',
    facilitatorsParticipants: '',
    numberOfParticipants: '',
    activityReport: '',
    department: '',
  });
  const [adding, setAdding] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editActivity, setEditActivity] = useState<TrainingActivity | null>(null);
  const [editForm, setEditForm] = useState({
    dateOfActivity: '',
    nameOfActivity: '',
    venue: '',
    facilitatorsParticipants: '',
    numberOfParticipants: '',
    activityReport: '',
    department: '',
  });

  useEffect(() => {
    const tRef = dbRef(db, 'trainingSeminars');
    const unsub = onValue(tRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const arr = Object.entries(data).map(([id, val]: any) => ({ id, ...val }));
        setActivities(arr);
      } else {
        setActivities([]);
      }
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (editActivity) {
      setEditForm({
        dateOfActivity: editActivity.dateOfActivity,
        nameOfActivity: editActivity.nameOfActivity,
        venue: editActivity.venue,
        facilitatorsParticipants: editActivity.facilitatorsParticipants,
        numberOfParticipants: String(editActivity.numberOfParticipants),
        activityReport: editActivity.activityReport,
        department: editActivity.department,
      });
    }
  }, [editActivity]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const tRef = dbRef(db, 'trainingSeminars');
    await push(tRef, {
      ...form,
      numberOfParticipants: Number(form.numberOfParticipants)
    });
    setForm({
      dateOfActivity: '',
      nameOfActivity: '',
      venue: '',
      facilitatorsParticipants: '',
      numberOfParticipants: '',
      activityReport: '',
      department: '',
    });
    setAdding(false);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm(f => ({ ...f, [name]: value }));
  };
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editActivity) return;
    const tRef = dbRef(db, `trainingSeminars/${editActivity.id}`);
    await set(tRef, {
      ...editForm,
      numberOfParticipants: Number(editForm.numberOfParticipants)
    });
    setEditModalOpen(false);
    setEditActivity(null);
  };
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this entry?')) return;
    const tRef = dbRef(db, `trainingSeminars/${id}`);
    await set(tRef, null);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Training & Seminars</h1>
          <p className="text-gray-400 text-lg">Organize and manage training sessions and educational seminars</p>
        </div>
        {/* Add New Training Form */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Add New Training Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label htmlFor="activityDate" className="text-gray-200">Date of Activity</Label>
                <Input id="activityDate" name="dateOfActivity" type="date" value={form.dateOfActivity} onChange={handleInput} className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="activityName" className="text-gray-200">Name of Activity</Label>
                <Input id="activityName" name="nameOfActivity" value={form.nameOfActivity} onChange={handleInput} placeholder="Workshop/Seminar name" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="venue" className="text-gray-200">Venue</Label>
                <Input id="venue" name="venue" value={form.venue} onChange={handleInput} placeholder="Location/Room" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="facilitators" className="text-gray-200">Facilitators/Participants</Label>
                <Input id="facilitators" name="facilitatorsParticipants" value={form.facilitatorsParticipants} onChange={handleInput} placeholder="Names of facilitators" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="participants" className="text-gray-200">Number of Participants</Label>
                <Input id="participants" name="numberOfParticipants" type="number" value={form.numberOfParticipants} onChange={handleInput} placeholder="0" className="bg-gray-700 border-gray-600 text-white" required />
              </div>
              <div>
                <Label htmlFor="report" className="text-gray-200">Activity Report</Label>
                <Input id="report" name="activityReport" value={form.activityReport} onChange={handleInput} placeholder="Brief description of the activity" className="bg-gray-700 border-gray-600 text-white" required />
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
              <div className="col-span-full">
                <Button type="submit" className="bg-white text-black hover:bg-gray-200 flex items-center space-x-2" disabled={adding}>
                  <Calendar className="h-4 w-4" />
                  <span>{adding ? 'Adding...' : 'Schedule Training'}</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {/* Training Activities Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Training Activities</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto w-full">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-200">Date of Activity</TableHead>
                    <TableHead className="text-gray-200">Name of Activity</TableHead>
                    <TableHead className="text-gray-200">Venue</TableHead>
                    <TableHead className="text-gray-200">Facilitators/Participants</TableHead>
                    <TableHead className="text-gray-200">Number of Participants</TableHead>
                    <TableHead className="text-gray-200 max-w-xs truncate">Activity Report</TableHead>
                    <TableHead className="text-gray-200">Department</TableHead>
                    <TableHead className="text-gray-200 whitespace-nowrap">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {activities.map((training) => (
                    <TableRow key={training.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-white font-medium">{training.dateOfActivity}</TableCell>
                      <TableCell className="text-gray-300 max-w-xs">
                        <div className="truncate" title={training.nameOfActivity}>
                          {training.nameOfActivity}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{training.venue}</TableCell>
                      <TableCell className="text-gray-300 max-w-xs">
                        <div className="truncate" title={training.facilitatorsParticipants}>
                          {training.facilitatorsParticipants}
                        </div>
                      </TableCell>
                      <TableCell className="text-white text-center">{training.numberOfParticipants}</TableCell>
                      <TableCell className="text-gray-300 max-w-xs truncate">
                        <div className="truncate" title={training.activityReport}>
                          {training.activityReport}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{training.department}</TableCell>
                      <TableCell className="whitespace-nowrap px-2 py-2">
                        <Button size="sm" variant="outline" className="mr-0" onClick={e => { e.stopPropagation(); setEditActivity(training); setEditModalOpen(true); }}><Edit size={16} /></Button>
                        <Button size="sm" variant="destructive" className="ml-2" onClick={e => { e.stopPropagation(); handleDelete(training.id); }}><Trash2 size={16} /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {activities.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-gray-400 py-4">No training activities found.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
      {editModalOpen && editActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black rounded-lg p-8 min-w-[350px] max-w-[90vw]">
            <h2 className="text-xl font-bold mb-4">Edit Training Activity</h2>
            <form onSubmit={handleEditSubmit} className="grid grid-cols-1 gap-4">
              <div>
                <label className="block mb-1">Date of Activity</label>
                <input type="date" name="dateOfActivity" value={editForm.dateOfActivity} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Name of Activity</label>
                <input name="nameOfActivity" value={editForm.nameOfActivity} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Venue</label>
                <input name="venue" value={editForm.venue} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Facilitators/Participants</label>
                <input name="facilitatorsParticipants" value={editForm.facilitatorsParticipants} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Number of Participants</label>
                <input type="number" name="numberOfParticipants" value={editForm.numberOfParticipants} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
              </div>
              <div>
                <label className="block mb-1">Activity Report</label>
                <input name="activityReport" value={editForm.activityReport} onChange={handleEditInputChange} className="bg-white text-black border-black border-2 rounded px-2 py-2 w-full" required />
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

export default TrainingSeminars;
