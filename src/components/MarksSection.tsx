import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Save } from "lucide-react";


type Student = {
  student_id: number,
  first_name: string,
  last_name: string,
  DOB: Date,
  class_id: number,
  parent_id: number,
  gender: string,
  address: string,
  created_at: Date
}

type Class = {
  class_id: number,
  class_name: string,
  strength: number,
  room_no: string
}

type Exam = {
  exam_id: number;
  exam_type: string;
};

type Subject = {
  subject_id: string,
  subject_name: string
}

export default function MarksSection({ subjects_list }) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [students, setStudents] = useState<any>([]);
  const [marksList, setMarksList] = useState<any>([]);
  const [bufferMarks, setBufferMarks] = useState<any>(0);

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [marks, setMarks] = useState<Record<number, string>>({});

  // Mock API calls (replace with real backend fetches)
  console.log(subjects_list);

  const teacher = localStorage.getItem("teacher");
  const teacherData = JSON.parse(teacher);
  console.log(teacherData);


  // useEffect(() => {
  //   async function fetchClassess() {
  //     const data = await fetch(`http://127.0.0.1:8000/api/classes/${teacherData.teacher_id}/${selectedSubject}`);
  //     const response = await data.json();
  //     console.log("classes the teacher ",teacherData.teacher_id, " is handling: ", response," for the subject: ",selectedSubject);
  //     setClasses(response);
  //     return response;
  //   }
  //   setExams([
  //     { exam_id: 1, exam_type: "Midterm" },
  //     { exam_id: 2, exam_type: "Final" },
  //   ]);
  //   fetchClassess();
  // }, [selectedSubject]);

  // useEffect(() => {
  //   async function fetchStudents() {
  //     const data = await fetch("http://127.0.0.1:8000/api/students/");
  //     const response = await data.json();
  //     console.log("response: ", response);
  //     return response;
  //   }
  //   if (selectedClass && selectedExam) {
  //     fetchStudents().then((allStudents) => {
  //     const filtered = allStudents.filter(
  //       (s) => s.class_id == selectedClass
  //     );

  //     // if exam filtering logic exists (e.g. based on exam_id)
  //     // you can chain another filter here
  //     console.log("filtered: ", filtered)
  //     setStudents(filtered);
  //   });
  //   }
  // }, [selectedClass, selectedExam]);

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
    setExams([
      { exam_id: 1, exam_type: "Midterm" },
      { exam_id: 2, exam_type: "Final" },
    ]);
    fetchClassess();
  }, [selectedSubject]);
  
  useEffect(() => {
    async function fetchStudents() {
      const data = await fetch("http://127.0.0.1:8000/api/students/");
      const response = await data.json();
      console.log("response: ", response);
      return response;
    }
    if (selectedClass && selectedExam) {
      fetchStudents().then((allStudents) => {
      const filtered = allStudents.filter(
        (s) => s.class_id == selectedClass
      );
      console.log("filtered: ", filtered)
      setStudents(filtered);
      });
    }
  }, [selectedClass, selectedExam]);

    useEffect(() => {
      async function fetchMarks() {
        const data = await fetch(`http://127.0.0.1:8000/api/marks/${selectedSubject}/${selectedClass}/${selectedExam}`);
        const response = await data.json();
        console.log("response: ", response);
        return response;
      }
      console.log(selectedSubject)
      const studentIds = students.map(students => students.student_id);
      console.log("student ids: ", studentIds)
      if (students && selectedExam) {
        console.log("inside the conditinal for updating marks")
        fetchMarks().then(setMarksList);
      }
    }, [selectedExam, students])

  const handleMarksChange = async (id: number, subject: string, exam:string,value: string) => {
    setMarks((prev) => ({ ...prev, [id]: value }));
    setBufferMarks(value);
    
  };

  const handleSave = async (id: number, subject: string, exam:string,value: string) => {
    console.log(students);
    
    const student_id = id; // or map id to the student_id
    const subject_id = subject;
    const exam_id = exam;

    // Prepare payload
    const payload = {
      student_id,
      subject_id,
      exam_id,
      marks: value,
    };
    console.log(payload);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/marks_update/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Data updated successfully", data);
        console.log("Saving Marks:", payload);
      } else {
        console.error("Error updating marks:", data);
      }
    } catch (err) {
      console.error("Network or server error:", err);
    }
    // TODO: call backend API to save marks

  };

  return (
    <Card className="p-6 space-y-6">
      <h3 className="mb-4 text-lg font-semibold">Marks Management</h3>

      {/* Subject Selection */}
      
      <div>
        <p className="mb-2 font-medium">Select Subject</p>
        <Select onValueChange={(v) => setSelectedSubject(v)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Choose a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects_list.map((sub) => (
              <SelectItem key={sub.subject_id} value={String(sub.subject_id)}>
                {sub.subject_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Class Selection */}
      {selectedSubject && (
        <div>
        <p className="mb-2 font-medium">Select Class</p>
        <Select onValueChange={(v) => setSelectedClass(v)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Choose a class" />
          </SelectTrigger>
          {console.log(classes)}
          <SelectContent>
            {classes.map((cls) => (
              <SelectItem key={cls.class_id} value={String(cls.class_id)}>
                 {cls.class_name}
                 {/* {cls.class_id} */}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      )}

      

      {/* Exam Selection */}
      {selectedClass && (
        <div>
          <p className="mb-2 font-medium">Select Exam</p>
          {/* <Select onValueChange={(v) => setSelectedExam(v)}> */}
          <Select onValueChange={(v) => {
            const [exam_type, exam_id] = v.split('|');
            setSelectedExam(exam_type);
            setSelectedExamId(exam_id);
          }}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Choose an exam" />
            </SelectTrigger>
            <SelectContent>
              {exams.map((exam) => (
                <SelectItem key={exam.exam_id} value={`${exam.exam_type}|${exam.exam_id}`}>
                  {exam.exam_type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Students List + Marks Entry */}
      {selectedClass && selectedExam && (
        <div>
          <h4 className="mb-3 font-medium">Enter Marks</h4>
          <div className="space-y-3">
            {/* {students.map((s) => (
              <div
                key={s.student_id}
                className="flex items-center justify-between border p-3 rounded-lg"
              >
                <p className="font-medium">
                  {s.first_name} {s.last_name}
                </p>
                <p className="font-medium">{s.marks}</p>
                <Input
                  type="number"
                  className="w-24"
                  placeholder="Marks"
                  value={marks[s.student_id] || ""}
                  onChange={(e) => handleMarksChange(s.student_id, e.target.value)}
                />
              </div>
            ))} */}
            {console.log(marksList)};
            {marksList.map((s) => {
              const student = students.find(stu => stu.student_id === s.student_id);
              return (
              <div
                key={s.student_id}
                className="flex items-center justify-between border p-3 rounded-lg"
              >
                <p className="font-medium">
                  {student.first_name} {student.last_name}
                </p>
                <p className="font-medium">{s.marks}</p>
                <Input
                  type="number"
                  className="w-24"
                  placeholder="Marks"
                  value={marks[s.student_id] || ""}
                  onChange={(e) => handleMarksChange(s.student_id, selectedSubject, selectedExamId, e.target.value)}
                />
                <Button onClick={() => handleSave(s.student_id, selectedSubject, "EX000001", bufferMarks )} className="mt-4">
                  <Save className="h-4 w-4 mr-2" /> Save Marks
                </Button>
              </div>)
            })}
            {/* {marksList.map((s) => {
              const student = students.find(stu => stu.student_id === s.student_id);
              {console.log("student: ", student)}
              return (
              <TableRow key={s.student_id}>
                <TableCell>{student ? `${student.first_name} ${student.last_name}` : "Unknown Student"}</TableCell>
                <TableCell>{s.marks}</TableCell>
                <TableCell>{s.max_marks}</TableCell>
              </TableRow>)
            })} */}
            {/* {Array.isArray(students) &&
              students.map((s) => (
                <div key={s.student_id}>
                  {s.first_name} {s.last_name}
                </div>
            ))} */}
          </div>
          
        </div>
      )}
    </Card>
  );
}
