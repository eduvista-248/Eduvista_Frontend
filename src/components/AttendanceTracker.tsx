import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar } from "./ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { 
  Search, 
  Calendar as CalendarIcon, 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  TrendingDown,
  TrendingUp,
  Download,
  Filter
} from "lucide-react";
import { useState, useEffect } from "react";

const students = [
  {
    id: 1,
    name: "Emma Thompson",
    email: "emma.thompson@school.edu",
    class: "AP Biology",
    attendance: {
      present: 18,
      absent: 1,
      late: 1,
      percentage: 95
    },
    status: "present",
    lastAbsent: "2025-08-25",
    trend: "stable"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@school.edu", 
    class: "Chemistry",
    attendance: {
      present: 16,
      absent: 2,
      late: 2,
      percentage: 88
    },
    status: "present",
    lastAbsent: "2025-09-02",
    trend: "improving"
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah.williams@school.edu",
    class: "Environmental Science",
    attendance: {
      present: 17,
      absent: 1,
      late: 2,
      percentage: 92
    },
    status: "present",
    lastAbsent: "2025-08-30",
    trend: "stable"
  },
  {
    id: 4,
    name: "James Rodriguez",
    email: "james.rodriguez@school.edu",
    class: "AP Biology",
    attendance: {
      present: 15,
      absent: 3,
      late: 2,
      percentage: 85
    },
    status: "absent",
    lastAbsent: "2025-09-08",
    trend: "concerning"
  },
  {
    id: 5,
    name: "Ashley Davis",
    email: "ashley.davis@school.edu",
    class: "Chemistry",
    attendance: {
      present: 19,
      absent: 0,
      late: 1,
      percentage: 98
    },
    status: "present",
    lastAbsent: "Never",
    trend: "excellent"
  },
  {
    id: 6,
    name: "David Kim",
    email: "david.kim@school.edu",
    class: "Environmental Science",
    attendance: {
      present: 13,
      absent: 5,
      late: 2,
      percentage: 78
    },
    status: "late",
    lastAbsent: "2025-09-06",
    trend: "declining"
  }
];

const attendanceHistory = [
  { date: 'Sep 2', present: 38, absent: 4, late: 2 },
  { date: 'Sep 3', present: 40, absent: 2, late: 2 },
  { date: 'Sep 4', present: 39, absent: 3, late: 2 },
  { date: 'Sep 5', present: 41, absent: 1, late: 2 },
  { date: 'Sep 6', present: 37, absent: 5, late: 2 },
  { date: 'Sep 8', present: 39, absent: 3, late: 2 }
];

const classAttendance = [
  { class: 'AP Biology', percentage: 89 },
  { class: 'Chemistry', percentage: 93 },
  { class: 'Environmental Science', percentage: 85 }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'present': return 'bg-green-100 text-green-800';
    case 'absent': return 'bg-red-100 text-red-800';
    case 'late': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'present': return <CheckCircle className="h-4 w-4" />;
    case 'absent': return <XCircle className="h-4 w-4" />;
    case 'late': return <Clock className="h-4 w-4" />;
    default: return <AlertTriangle className="h-4 w-4" />;
  }
}

function getTrendIcon(trend: string) {
  switch (trend) {
    case 'improving':
    case 'excellent':
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    case 'declining':
    case 'concerning':
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    default:
      return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
  }
}

function getTrendColor(trend: string) {
  switch (trend) {
    case 'excellent': return 'bg-green-100 text-green-800';
    case 'improving': return 'bg-blue-100 text-blue-800';
    case 'stable': return 'bg-gray-100 text-gray-800';
    case 'concerning': return 'bg-yellow-100 text-yellow-800';
    case 'declining': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function AttendanceTracker({subjects_list}) {
  const [classes, setClasses] = useState();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedClass, setSelectedClass] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSubject, setSelectedSubject] = useState();

  const totalStudents = students.length;
  const presentToday = students.filter(s => s.status === 'present').length;
  const absentToday = students.filter(s => s.status === 'absent').length;
  const lateToday = students.filter(s => s.status === 'late').length;
  const averageAttendance = Math.round(students.reduce((sum, student) => sum + student.attendance.percentage, 0) / totalStudents);

  const filteredStudents = students.filter(student => {
    if (selectedClass !== "all" && !student.class.toLowerCase().includes(selectedClass)) return false;
    if (selectedStatus !== "all" && student.status !== selectedStatus) return false;
    return true;
  });

  useEffect(() => {
    async function fetchClassess() {
      const teacher = localStorage.getItem("teacher");
      const teacherData = JSON.parse(teacher);
      
      const data = await fetch(`http://127.0.0.1:8000/api/classes/${teacherData.teacher_id}/${selectedSubject}`);
      const response = await data.json();
      console.log("classes the teacher ",teacherData.teacher_id, " is handling: ", response," for the subject: ",selectedSubject);
      setClasses(response);

      return response;
    }
    fetchClassess();
  }, [selectedSubject])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Attendance Tracker</h1>
          <p className="text-muted-foreground">Monitor and manage student attendance across all classes</p>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {selectedDate?.toDateString() || "Select Date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Today's Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Total Students</p>
              <p className="text-2xl">{totalStudents}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Present</p>
              <p className="text-2xl">{presentToday}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Absent</p>
              <p className="text-2xl">{absentToday}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Late</p>
              <p className="text-2xl">{lateToday}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Avg Attendance</p>
              <p className="text-2xl">{averageAttendance}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Attendance List */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              {/* <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search students..." className="pl-10" />
              </div> */}
                
                {/* Subject Selection */}
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects_list.map((subj) => (
                    <SelectItem key={subj.subject_id} value={String(subj.subject_id)}>
                      {subj.subject_name}
                    </SelectItem>
                  ))}
                  {/* <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="ap-biology">AP Biology</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="environmental">Environmental Science</SelectItem> */}
                </SelectContent>
              </Select>

                {/* Class Selection */}
                {classes && <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filter by Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.class_id} value={String(cls.class_id)}>
                      {cls.class_name}
                    </SelectItem>
                  ))}
                  {/* <SelectItem value="all">All Classes</SelectItem>
                  <SelectItem value="ap-biology">AP Biology</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="environmental">Environmental Science</SelectItem> */}
                </SelectContent>
              </Select>}
              
              
              
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="today" className="space-y-4">
              <TabsList>
                <TabsTrigger value="today">Today's Attendance</TabsTrigger>
                <TabsTrigger value="summary">Summary View</TabsTrigger>
              </TabsList>

              <TabsContent value="today">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Class</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Attendance %</TableHead>
                      <TableHead>Trend</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center h-full">
                                {student.name.split(' ').map(n => n[0]).join('')}
                              </div>
                            </Avatar>
                            <div>
                              <p>{student.name}</p>
                              <p className="text-sm text-muted-foreground">{student.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{student.class}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(student.status)}>
                            {getStatusIcon(student.status)}
                            <span className="ml-1 capitalize">{student.status}</span>
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${student.attendance.percentage >= 90 ? 'bg-green-500' : student.attendance.percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                style={{ width: `${student.attendance.percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{student.attendance.percentage}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getTrendIcon(student.trend)}
                            <Badge className={getTrendColor(student.trend)} variant="secondary">
                              {student.trend}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                              <CheckCircle className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                              <XCircle className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="outline" className="h-7 w-7 p-0">
                              <Clock className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="summary">
                <div className="space-y-4">
                  {students.map((student) => (
                    <div key={student.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center h-full">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          </Avatar>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">{student.class}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-muted-foreground">Present</p>
                          <p className="font-medium text-green-600">{student.attendance.present}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Absent</p>
                          <p className="font-medium text-red-600">{student.attendance.absent}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Late</p>
                          <p className="font-medium text-yellow-600">{student.attendance.late}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-muted-foreground">Percentage</p>
                          <p className="font-medium">{student.attendance.percentage}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Analytics & Quick Actions */}
        <div className="space-y-6">
          {/* Attendance Trends */}
          <Card className="p-6">
            <h3 className="mb-4">Attendance Trends</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={attendanceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Line type="monotone" dataKey="present" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="absent" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="late" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Class Performance */}
          <Card className="p-6">
            <h3 className="mb-4">Class Attendance</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={classAttendance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="class" />
                <YAxis />
                <Bar dataKey="percentage" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark All Present
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Send Absence Alerts
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Download className="h-4 w-4 mr-2" />
                Export Attendance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Filter className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </Card>

          {/* Attention Needed */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              Needs Attention
            </h3>
            <div className="space-y-3">
              {students
                .filter(s => s.attendance.percentage < 85 || s.trend === 'declining' || s.trend === 'concerning')
                .map((student) => (
                  <div key={student.id} className="p-3 bg-red-50 rounded-lg">
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.attendance.percentage}% attendance</p>
                    <p className="text-xs text-muted-foreground">Last absent: {student.lastAbsent}</p>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}