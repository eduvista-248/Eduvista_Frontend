import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Search, Plus, Mail, Phone, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const students = [
  {
    id: 1,
    name: "Emma Thompson",
    email: "emma.thompson@school.edu",
    class: "AP Biology",
    grade: "A",
    attendance: 95,
    lastAssignment: "Lab Report #3",
    status: "active"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.chen@school.edu",
    class: "Chemistry", 
    grade: "B+",
    attendance: 88,
    lastAssignment: "Chapter 5 Quiz",
    status: "active"
  },
  {
    id: 3,
    name: "Sarah Williams",
    email: "sarah.williams@school.edu",
    class: "Environmental Science",
    grade: "A-",
    attendance: 92,
    lastAssignment: "Ecosystem Project",
    status: "active"
  },
  {
    id: 4,
    name: "James Rodriguez",
    email: "james.rodriguez@school.edu",
    class: "AP Biology",
    grade: "B",
    attendance: 85,
    lastAssignment: "Lab Report #3",
    status: "warning"
  },
  {
    id: 5,
    name: "Ashley Davis",
    email: "ashley.davis@school.edu",
    class: "Chemistry",
    grade: "A",
    attendance: 98,
    lastAssignment: "Midterm Exam",
    status: "active"
  },
  {
    id: 6,
    name: "David Kim",
    email: "david.kim@school.edu",
    class: "Environmental Science",
    grade: "C+",
    attendance: 78,
    lastAssignment: "Research Paper",
    status: "needs-attention"
  }
];

function getGradeColor(grade: string) {
  if (grade.startsWith('A')) return 'bg-green-100 text-green-800';
  if (grade.startsWith('B')) return 'bg-blue-100 text-blue-800';
  if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
}

function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'warning': return 'bg-yellow-100 text-yellow-800';
    case 'needs-attention': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function StudentList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Students</h1>
          <p className="text-muted-foreground">Manage your students and track their progress</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Student</span>
        </Button>
      </div>

      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search students..." className="pl-10" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Current Grade</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Last Assignment</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
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
                  <Badge className={getGradeColor(student.grade)}>
                    {student.grade}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${student.attendance >= 90 ? 'bg-green-500' : student.attendance >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${student.attendance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{student.attendance}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-sm">{student.lastAssignment}</p>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(student.status)}>
                    {student.status.replace('-', ' ')}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Phone className="h-4 w-4 mr-2" />
                        Contact Parent
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        View Progress
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}