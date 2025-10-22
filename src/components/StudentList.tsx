import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Search, Plus, Mail, Phone, MoreVertical } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {useState, useEffect} from "react";

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
  const [students, setStudents] = useState();
  const [selectedClass, setSelectedClass] = useState();
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [check, setCheck] = useState(false);
  const [formData, setFormData] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    DOB: "",
    class_id: "",
    parent_id: "",
    gender: "",
    address: "",
  });

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
    async function fetchStudents () {
      try{
        console.log("Fetching students for class: ", selectedClass);
        const res = await fetch(`${baseURL}/api/students/${selectedClass}`);
        const data = await res.json();
        console.log("Fetched students data:", data);
        setStudents(data);
      }
      catch(error){
        console.log("Error fetching students data:", error);
      }
    }
    fetchStudents();
  }, [page, selectedClass])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    setCheck(!check);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseURL}/api/update_students/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Student added successfully!");
        console.log("Response:", data);
        setFormData({
          student_id: "",
          first_name: "",
          last_name: "",
          DOB: "",
          class_id: "",
          parent_id: "",
          gender: "",
          address: "",
        });
        setCheck(false); // Go back to student list
      } else {
        alert(`Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      console.error("Error submitting student data:", error);
      alert("Failed to add student. Check console for details.");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Students</h1>
          <p className="text-muted-foreground">Manage your students and track their progress</p>
        </div>
        <Button className="flex items-center space-x-2" disabled={check} onClick={handleAddStudent}>
          <Plus className="h-4 w-4" />
          <span>Add Student</span>
        </Button>
      </div>

      {!check && <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          {/* <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search students..." className="pl-10" />
          </div> */}
          <div>
            <p className="mb-2 font-medium">Select Class</p>
            <Select onValueChange={(v) => setSelectedClass(v)}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Choose a class" />
              </SelectTrigger>
              <SelectContent>
                {classes && classes.map((c) => (
                  <SelectItem key={c.class_id} value={String(c.class_id)}>
                    {c.class_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Transport</TableHead>
              <TableHead>Address</TableHead>
              {/* <TableHead className="w-12"></TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {students && students.map((student) => (
              <TableRow key={student.student_id}>
                <TableCell>{student.student_id}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    {student.first_name} {student.last_name}
                  </div>
                </TableCell>
                {/* <TableCell>
                  <Badge variant="secondary">{student.class}</Badge>
                </TableCell> */}
                {/* <TableCell>
                  <Badge className={getGradeColor(student.grade)}>
                    {student.grade}
                  </Badge>
                </TableCell> */}
                <TableCell>
                  {/* <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${student.attendance >= 90 ? 'bg-green-500' : student.attendance >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${student.attendance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm">{student.attendance}%</span>
                  </div> */}
                  {student.DOB}
                </TableCell>
                <TableCell>
                  <p className="text-sm">{student.transport_stop_id ? student.transport_stop_id : "own"}</p>
                </TableCell>
                {/* <TableCell>
                  <Badge className={getStatusColor(student.status)}>
                    {student.status.replace('-', ' ')}
                  </Badge>
                </TableCell> */}
                <TableCell>
                  <p className="text-sm">{student.address}</p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>}
      {check && (
        <Card className="p-6">
          <h2 className="mb-4">Add New Student</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                name="student_id"
                placeholder="Student ID"
                value={formData.student_id}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
              />
              <Select onValueChange={(v) => handleSelectChange("gender", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key="Male" value="M">Male</SelectItem>
                  <SelectItem key="Female" value="F">Female</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="date"
                name="DOB"
                value={formData.DOB}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="class_id"
                placeholder="Class ID"
                value={formData.class_id}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="parent_id"
                placeholder="Parent ID"
                value={formData.parent_id}
                onChange={handleInputChange}
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit">Submit</Button>
              <Button variant="outline" onClick={handleAddStudent}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

    </div>
  );
}