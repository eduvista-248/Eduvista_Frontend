import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar } from "./ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
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

function getStatusColor(status: string) {
  switch (status) {
    case 'Present': return 'bg-green-100 text-green-800';
    case 'Absent': return 'bg-red-100 text-red-800';
    case 'Leave': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'Present': return <CheckCircle className="h-4 w-4" />;
    case 'Absent': return <XCircle className="h-4 w-4" />;
    case 'Leave': return <Clock className="h-4 w-4" />;
    default: return <AlertTriangle className="h-4 w-4" />;
  }
}

export function AttendanceViewAdmin() {
  const [students, setStudents] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState();
  const [classes, setClasses] = useState([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date("2024-12-31"));

  const baseURL = "http://localhost:8000";

  useEffect(() => {
      async function fetchClasses() {
        try{
          const res = await fetch(`${baseURL}/api/classesAdmin`);
          const data = await res.json();
          console.log("Fetched classes data:", data);
          setClasses(data);
        }
        catch(error){
          console.log("Error fetching classes data:", error);
        }
      }
      fetchClasses();
    }, [])

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
        console.log("formattedDate: ",formattedDate)
        const res = await fetch(`${baseURL}/api/myclass/students/${selectedClass}/?date=${formattedDate}`);
        const data = await res.json();
        console.log(data);
        setStudents(data.students || []);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    }
    fetchAttendance();
  }, [selectedClass, selectedDate]);

  const totalStudents = students.length;
  const presentToday = students.filter((s) => s.attendance[0]?.status === "Present").length;
  const absentToday = students.filter((s) => s.attendance[0]?.status === "Absent").length;
  const lateToday = students.filter((s) => s.attendance[0]?.status === "Leave").length;
  const holidayToday = students.filter((s) => s.attendance[0]?.status === "Holiday").length;

  return (
    <div className="space-y-6">
      {/* Header with Date Picker */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Attendance Tracker</h1>
          <p className="text-muted-foreground">
            Monitor and manage student attendance for {selectedDate.toDateString()}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {selectedDate.toDateString()}
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 flex flex-row-reverse items-center justify-between">
          <div>
            <p className="text-muted-foreground">Total Students</p>
            <p className="text-2xl">{totalStudents}</p>
          </div>
          <Users className="h-8 w-8 text-blue-600" />
        </Card>
        <Card className="p-4 flex flex-row-reverse items-center justify-between">
          <div>
            <p className="text-muted-foreground">Present</p>
            <p className="text-2xl">{presentToday}</p>
          </div>
          <CheckCircle className="h-8 w-8 text-green-600" />
        </Card>
        <Card className="p-4 flex flex-row-reverse items-center justify-between">
          <div>
            <p className="text-muted-foreground">Absent</p>
            <p className="text-2xl">{absentToday}</p>
          </div>
          <XCircle className="h-8 w-8 text-red-600" />
        </Card>
        <Card className="p-4 flex flex-row-reverse items-center justify-between">
          <div>
            <p className="text-muted-foreground">Leave</p>
            <p className="text-2xl">{lateToday}</p>
          </div>
          <Clock className="h-8 w-8 text-yellow-600" />
        </Card>
        <Card className="p-4 flex flex-row-reverse items-center justify-between">
          <div>
            <p className="text-muted-foreground">Holiday</p>
            <p className="text-2xl">{holidayToday}</p>
          </div>
          <Clock className="h-8 w-8 text-yellow-600" />
        </Card>
      </div>

      {/* Student Attendance Table */}
      <Card className="p-6">
        <div>
            <p className="mb-2 font-medium">Select Class</p>
            <Select onValueChange={(v) => {
            setSelectedClass(v);
            }}>
            <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Choose a subject" />
            </SelectTrigger>
            <SelectContent>
                {classes && classes.map((cl) => (
                <SelectItem key={cl.class_id} value={String(cl.class_id)}>
                    {cl.class_name}
                </SelectItem>
                ))}
            </SelectContent>
            </Select>
        </div>
        <Tabs defaultValue="today" className="space-y-4">
          {/* <TabsList>
            <TabsTrigger value="today">Today's Attendance</TabsTrigger>
          </TabsList> */}

          {/* Today */}
          <TabsContent value="today">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((s) => (
                  <TableRow key={s.student_id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center h-full">
                            {/* {s.name?.split(" ").map((n: string) => n[0]).join("")} */}
                            {s.first_name[0]}{s.last_name[0]} 
                          </div>
                        </Avatar>
                        <div>
                          <p>{s.first_name} {s.last_name}</p>
                          <p className="text-sm text-muted-foreground">{s.student_id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(s.attendance[0]?.status)}>
                        {getStatusIcon(s.attendance[0]?.status)}
                        <span className="ml-1 capitalize">
                          {s.attendance[0]?.status || "N/A"}
                        </span>
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          {/* Summary */}
          {/* <TabsContent value="summary">
            <div className="space-y-4">
              {students.map((s) => (
                <div key={s.student_id} className="border rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center h-full">

                        {s.first_name[0]}{s.last_name[0]} 
                      </div>
                    </Avatar>
                    <div>
                      <p className="font-medium">{s.first_name} {s.last_name}</p>
                      <p className="text-sm text-muted-foreground">{s.student_id}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(s.attendance[0]?.status)}>
                    {s.attendance[0]?.status || "N/A"}
                  </Badge>
                </div>
              ))}
            </div>
          </TabsContent> */}
        </Tabs>
      </Card>
    </div>
  );
}
