
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import MegaMenuNavigation from '@/components/MegaMenuNavigation';
import FileUpload from '@/components/FileUpload';

const mockAttendanceData = [
  { 
    id: 1, 
    eventName: "Research Ethics Workshop", 
    date: "2024-06-15", 
    time: "09:00 AM", 
    attendeeName: "Dr. Sarah Johnson", 
    department: "Computer Science", 
    checkInTime: "08:55 AM", 
    checkOutTime: "12:00 PM", 
    status: "Present",
    duration: "3h 5m"
  },
  { 
    id: 2, 
    eventName: "Research Ethics Workshop", 
    date: "2024-06-15", 
    time: "09:00 AM", 
    attendeeName: "Prof. Michael Chen", 
    department: "Medicine", 
    checkInTime: "09:10 AM", 
    checkOutTime: "11:45 AM", 
    status: "Late",
    duration: "2h 35m"
  },
  { 
    id: 3, 
    eventName: "Grant Writing Seminar", 
    date: "2024-06-10", 
    time: "02:00 PM", 
    attendeeName: "Dr. Emily Davis", 
    department: "Engineering", 
    checkInTime: "01:58 PM", 
    checkOutTime: "05:30 PM", 
    status: "Present",
    duration: "3h 32m"
  },
  { 
    id: 4, 
    eventName: "Data Analysis Training", 
    date: "2024-06-08", 
    time: "10:00 AM", 
    attendeeName: "Dr. Robert Wilson", 
    department: "Psychology", 
    checkInTime: "-", 
    checkOutTime: "-", 
    status: "Absent",
    duration: "-"
  },
  { 
    id: 5, 
    eventName: "Publication Workshop", 
    date: "2024-06-05", 
    time: "01:00 PM", 
    attendeeName: "Dr. Lisa Anderson", 
    department: "Chemistry", 
    checkInTime: "01:00 PM", 
    checkOutTime: "04:15 PM", 
    status: "Present",
    duration: "3h 15m"
  }
];

const AttendanceRecords = () => {
  const handleFileUpload = (data: any[]) => {
    console.log('Uploaded attendance data:', data);
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <MegaMenuNavigation />
      
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-3">Attendance Records</h1>
          <p className="text-gray-400 text-lg">Track and manage attendance for training sessions, seminars, and workshops</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-sm text-gray-400">Events This Month</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-sm text-gray-400">Total Attendees</p>
                  <p className="text-2xl font-bold text-white">687</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                <div>
                  <p className="text-sm text-gray-400">Attendance Rate</p>
                  <p className="text-2xl font-bold text-white">92%</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-purple-400" />
                <div>
                  <p className="text-sm text-gray-400">Avg Duration</p>
                  <p className="text-2xl font-bold text-white">3.2h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Manual Attendance Entry */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-white">Record Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Label htmlFor="eventName" className="text-gray-200">Event Name</Label>
                <Input id="eventName" placeholder="Workshop/Seminar name" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="attendeeName" className="text-gray-200">Attendee Name</Label>
                <Input id="attendeeName" placeholder="Dr. John Smith" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="department" className="text-gray-200">Department</Label>
                <Input id="department" placeholder="Computer Science" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="date" className="text-gray-200">Date</Label>
                <Input id="date" type="date" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="checkIn" className="text-gray-200">Check-in Time</Label>
                <Input id="checkIn" type="time" className="bg-gray-700 border-gray-600 text-white" />
              </div>
              <div>
                <Label htmlFor="checkOut" className="text-gray-200">Check-out Time</Label>
                <Input id="checkOut" type="time" className="bg-gray-700 border-gray-600 text-white" />
              </div>
            </div>
            <Button className="bg-white text-black hover:bg-gray-200">Record Attendance</Button>
          </CardContent>
        </Card>

        {/* File Upload */}
        <div className="mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {/* Attendance Table */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-xl text-white">Recent Attendance Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-200">Event</TableHead>
                    <TableHead className="text-gray-200">Date & Time</TableHead>
                    <TableHead className="text-gray-200">Attendee</TableHead>
                    <TableHead className="text-gray-200">Department</TableHead>
                    <TableHead className="text-gray-200">Check-in</TableHead>
                    <TableHead className="text-gray-200">Check-out</TableHead>
                    <TableHead className="text-gray-200">Duration</TableHead>
                    <TableHead className="text-gray-200">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAttendanceData.map((record) => (
                    <TableRow key={record.id} className="border-gray-700 hover:bg-gray-700/50">
                      <TableCell className="text-white font-medium">{record.eventName}</TableCell>
                      <TableCell className="text-gray-300">
                        <div>
                          <div>{record.date}</div>
                          <div className="text-xs text-gray-400">{record.time}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-white">{record.attendeeName}</TableCell>
                      <TableCell className="text-gray-300">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {record.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-300">{record.checkInTime}</TableCell>
                      <TableCell className="text-gray-300">{record.checkOutTime}</TableCell>
                      <TableCell className="text-gray-300">{record.duration}</TableCell>
                      <TableCell>
                        <Badge className={
                          record.status === 'Present' ? 'bg-green-600 text-green-100' :
                          record.status === 'Late' ? 'bg-yellow-600 text-yellow-100' :
                          'bg-red-600 text-red-100'
                        }>
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AttendanceRecords;
