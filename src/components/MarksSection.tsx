import React, { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Save } from "lucide-react";

type Student = {
  student_id: number;
  first_name: string;
  last_name: string;
};

type Class = {
  class_id: number;
  class_name: string;
};

type Exam = {
  exam_id: number;
  exam_type: string;
};

export default function MarksSection() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [marks, setMarks] = useState<Record<number, string>>({});

  // Mock API calls (replace with real backend fetches)
  useEffect(() => {
    setClasses([
      { class_id: 1, class_name: "Class 10A" },
      { class_id: 2, class_name: "Class 10B" },
    ]);
  }, []);

  useEffect(() => {
    if (selectedClass) {
      setExams([
        { exam_id: 1, exam_type: "Midterm" },
        { exam_id: 2, exam_type: "Final" },
      ]);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass && selectedExam) {
      setStudents([
        { student_id: 1, first_name: "John", last_name: "Doe" },
        { student_id: 2, first_name: "Jane", last_name: "Smith" },
      ]);
    }
  }, [selectedClass, selectedExam]);

  const handleMarksChange = (id: number, value: string) => {
    setMarks((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
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

      {/* Class Selection */}
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
          </div>
          <Button onClick={handleSave} className="mt-4">
            <Save className="h-4 w-4 mr-2" /> Save Marks
          </Button>
        </div>
      )}
    </Card>
  );
}
