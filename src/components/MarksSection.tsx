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

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [marks, setMarks] = useState<Record<number, string>>({});

  // Mock API calls (replace with real backend fetches)
  console.log(subjects_list);

  const teacher = localStorage.getItem("teacher");
  const teacherData = JSON.parse(teacher);
  console.log(teacherData);


  useEffect(() => {
    async function fetchClassess() {
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

      // if exam filtering logic exists (e.g. based on exam_id)
      // you can chain another filter here
      console.log("filtered: ", filtered)
      setStudents(filtered);
    });
    }
  }, [selectedClass, selectedExam]);

  const handleMarksChange = (id: number, value: string) => {
    setMarks((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    console.log(students);
    const payload = students.map((s) => ({
      student_id: s.student_id,
      exam_id: selectedExam,
      marks: marks[s.student_id] || "",
    }));
    console.log("Saving Marks:", payload);
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
          <Select onValueChange={(v) => setSelectedExam(v)}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Choose an exam" />
            </SelectTrigger>
            <SelectContent>
              {exams.map((exam) => (
                <SelectItem key={exam.exam_id} value={String(exam.exam_id)}>
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
            {students.map((s) => (
              <div
                key={s.student_id}
                className="flex items-center justify-between border p-3 rounded-lg"
              >
                <p className="font-medium">
                  {s.first_name} {s.last_name}
                </p>
                <Input
                  type="number"
                  className="w-24"
                  placeholder="Marks"
                  value={marks[s.student_id] || ""}
                  onChange={(e) => handleMarksChange(s.student_id, e.target.value)}
                />
              </div>
            ))}
            {/* {Array.isArray(students) &&
              students.map((s) => (
                <div key={s.student_id}>
                  {s.first_name} {s.last_name}
                </div>
            ))} */}
          </div>
          <Button onClick={handleSave} className="mt-4">
            <Save className="h-4 w-4 mr-2" /> Save Marks
          </Button>
        </div>
      )}
    </Card>
  );
}
