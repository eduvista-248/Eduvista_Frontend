import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

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

// type Exam = {
//   exam_id: string,
//   academic_year: string,
//   exam_type: string,
//   class_id: number,
//   subject_id: string,
//   exam_date: string
// }

type Exam = {
  exam_id: number, 
  exam_type: string
}

type Subject = {
  subject_id: string,
  subject_name: string
}

type Mark = {
  marks_id: string,
  marks: number,
  max_marks: number,
  exam_id: string,
  student_id: number,
  subject_id: string
}

export default function MarksView({ subjects_list }) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [marksList, setMarksList] = useState<Mark[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<string>("");

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

  // Initial draft of fetchMarks 
  // useEffect(() => {
  //   async function fetchMarks(starting_student_id) {
  //     const data = await fetch(`http://127.0.0.1:8000/api/marks/${selectedSubject}/${starting_student_id}`);
  //     const response = await data.json();
  //     console.log("response: ", response);
  //     return response;
  //   }
  //   console.log(selectedSubject)
  //   const studentIds = students.map(students => students.student_id);
  //   console.log("student ids: ", studentIds)
  //   if (students && selectedExam) {
      
  //     // fetchMarks(studentIds[0]).then((allMarks) => {
  //     // console.log(allMarks);
  //     // let filtered = allMarks.filter(
  //     //   (m) => String(m.subject_id) == String(selectedSubject) 
  //     // );
  //     // console.log("filtered: ", filtered)
  //     // filtered = filtered.filter(
  //     //   (m) => {
  //     //     studentIds.includes(Number(m.student_id));
  //     //     console.log(m.student_id)
  //     //   }
  //     // )
  //     // &&
  //     //   studentIds.includes(m.student_id)
  //     // console.log("filtered: ", filtered)
  //     fetchMarks(studentIds[0]).then(setMarksList);
  //     // setMarksList(filtered);
  //     // });
  //   }
  // }, [selectedExam, students])

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
      fetchMarks().then(setMarksList);
    }
  }, [selectedExam, students])

  //   useEffect(() => {
  //   async function fetchMarks(starting_student_id) {
  //     const data = await fetch(`http://127.0.0.1:8000/api/marks/${selectedSubject}/${selectedClass}`);
  //     const response = await data.json();
  //     console.log("response: ", response);
  //     return response;
  //   }
  //   console.log(selectedSubject)
  //   const studentIds = students.map(students => students.student_id);
  //   console.log("student ids: ", studentIds)
  //   if (students && selectedExam) {
      
  //     // fetchMarks(studentIds[0]).then((allMarks) => {
  //     // console.log(allMarks);
  //     // let filtered = allMarks.filter(
  //     //   (m) => String(m.subject_id) == String(selectedSubject) 
  //     // );
  //     // console.log("filtered: ", filtered)
  //     // filtered = filtered.filter(
  //     //   (m) => {
  //     //     studentIds.includes(Number(m.student_id));
  //     //     console.log(m.student_id)
  //     //   }
  //     // )
  //     // &&
  //     //   studentIds.includes(m.student_id)
  //     // console.log("filtered: ", filtered)
  //     fetchMarks(studentIds[0]).then(setMarksList);
  //     // setMarksList(filtered);
  //     // });
  //   }
  // }, [selectedExam, students])

  return (
    <Card className="p-6 space-y-6">
      <h3 className="mb-4 text-lg font-semibold">View Marks</h3>

      {/* Subject Selection */}
      <div>
        <p className="mb-2 font-medium">Select Subject</p>
        <Select onValueChange={(v) => setSelectedSubject(v)}>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Choose a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects_list && subjects_list.map((subj) => (
              <SelectItem key={subj.subject_id} value={String(subj.subject_id)}>
                {subj.subject_name}
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
          <SelectContent>
            {classes.map((cls) => (
              <SelectItem key={cls.class_id} value={String(cls.class_id)}>
                {cls.class_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      )}
      

      

      {/* Exam Selection */}
      {selectedClass && selectedSubject && (
        <div>
          <p className="mb-2 font-medium">Select Exam</p>
          <Select onValueChange={(v) => setSelectedExam(v)}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Choose an exam" />
            </SelectTrigger>
            <SelectContent>
              {exams.map((exam) => (
                <SelectItem key={exam.exam_id} value={String(exam.exam_type)}>
                  {exam.exam_type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Marks Table */}
      {selectedClass && selectedSubject && selectedExam && (
        <div>
          <h4 className="mb-3 font-medium">Marks List</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Marks</TableHead>
                <TableHead>Max Marks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marksList.map((s) => {
                const student = students.find(stu => stu.student_id === s.student_id);
                {console.log("student: ", student)}
                return (
                <TableRow key={s.student_id}>
                  <TableCell>{student ? `${student.first_name} ${student.last_name}` : "Unknown Student"}</TableCell>
                  <TableCell>{s.marks}</TableCell>
                  <TableCell>{s.max_marks}</TableCell>
                </TableRow>)
              })}
              {/* {marksList.map((s) => {
                return (
                <TableRow key={s.student_id}>
                  <TableCell>{s.first_name} ${s.last_name}</TableCell>
                  <TableCell>{s.marks}</TableCell>
                  <TableCell>{s.max_marks}</TableCell>
                </TableRow>)
              })} */}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
