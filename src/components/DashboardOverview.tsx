import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, CheckCircle, TrendingUp, Calendar, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const weeklyProgress = [
  { day: 'Mon', assignments: 15, submissions: 12 },
  { day: 'Tue', assignments: 12, submissions: 10 },
  { day: 'Wed', assignments: 18, submissions: 16 },
  { day: 'Thu', assignments: 8, submissions: 8 },
  { day: 'Fri', assignments: 22, submissions: 20 }
];

let gradeDistribution = []
let average = 0;


export function DashboardOverview({ my_class_id, teacher_id }) {
  const [students, setStudents] = useState();
  const [marksList, setMarksList] = useState();
  const [gradesList, setGradesList] = useState();
  const [avgMark, setAvgMark] = useState(0);
  const [subjectId, setSubjectId] = useState();
  const [passedStudents, setPassedStudents] = useState(0);
  const [gradeCounts, setGradeCounts] = useState({});

  const baseURL = 'https://eduvista-backend-render.onrender.com';

  console.log("from dashboard: ", my_class_id, teacher_id)
  // FOR STUDENTS LIST THAT COME UNDER THE TEACHER'S CLASS
  useEffect(() => {
    const selectedDate = new Date("2024-12-31");
    async function fetchAttendance() {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
        console.log("formattedDate: ",formattedDate)
        // const res = await fetch(`http://127.0.0.1:8000/api/api/myclass/students/${my_class_id}/?date=${formattedDate}`);
        const res = await fetch(`${baseURL}api/myclass/students/${my_class_id}/?date=${formattedDate}`);
        const data = await res.json();
        console.log(data);
        setStudents(data.students || []);
      } catch (err) {
        console.error("Error fetching attendance:", err);
      }
    }
    fetchAttendance();
  }, [my_class_id]);

  // FOR THE SUBJECT_ID COMMON FOR TEACHER AND CLASS
  useEffect(()=>{
    async function getSubjectId() {
      // console.log("inside getSubjectId")
      try {
        // const data = await fetch(`http://127.0.0.1:8000/api/subject/${teacher_id}/${my_class_id}`);
        const data = await fetch(`${baseURL}/subject/${teacher_id}/${my_class_id}`);
        const response = await data.json();
        console.log("response from subjectId useEffect: ", response);
        console.log("From getSubject fxn: ", response);
        return response[0].subject_id;
      }catch (err){
        console.log("failed to fetch subjects. ", err);
      }
    }
    console.log("Inside the useEffect for getting subjects")
    getSubjectId().then(setSubjectId);
  }, [teacher_id, my_class_id])

  // FOR GETTING THE MARKS OF THE STUDENTS  
  useEffect(() => {
      async function fetchMarks() {
        if(subjectId != undefined){
          // const data = await fetch(`http://127.0.0.1:8000/api/marks/${subjectId}/${my_class_id}/${"Final"}`);
          const data = await fetch(`${baseURL}/marks/${subjectId}/${my_class_id}/${"Final"}`);
          const response = await data.json();
          console.log("response: ", response);
          return response;
        }
      }
      const studentIds = students ? students.map(students => students.student_id) : [];
      // console.log("student ids: ", studentIds)
      if (students) {
        fetchMarks().then(setMarksList);
      }
    }, [my_class_id, students, subjectId])

    // FOR GETTING THE AVG MARKS & STUDENTS OVER 70  OF THE STUDENTS
  // useEffect(() => {
  //   marksList && marksList.map(gradeItem => {
  //     sum += gradeItem.marks;
  //     if(gradeItem.marks>70)  count++;
  //   });
  //   console.log("sum:", sum);
  //   setAvgMark(marksList ? (sum/marksList.length) : 0)
  //   setPassedStudents(marksList ? count : 0)
  // }, [marksList])
  useEffect(() => {
  if (Array.isArray(marksList)) {
    let sum = 0;
    let count = 0;

    marksList.forEach(gradeItem => {
      sum += gradeItem.marks;
      if (gradeItem.marks > 70) count++;
    });

    console.log("sum:", sum);
    setAvgMark(sum / marksList.length);
    average = sum / marksList.length;
    setPassedStudents(count);
  } else {
    setAvgMark(0);
    setPassedStudents(0);
  }
}, [marksList]);
  
  // FOR GETTING THE GRADES OF THE STUDENTS
  useEffect(() => {
    async function getGrades() {
      try{
        // const data = await fetch(`http://127.0.0.1:8000/api/grades/${teacher_id}/${subjectId}/${my_class_id}/Final`);
        const data = await fetch(`${baseURL}/grades/${teacher_id}/${subjectId}/${my_class_id}/Final`);
        const res = await data.json();
        console.log("res: ", res);
        return res;
      }
      catch (err){
        console.log("Unable to get grades", err);
      }
    }
    subjectId && getGrades().then(setGradesList);
  }, [teacher_id, subjectId, my_class_id])
  

  
  // console.log("gradeCounts: ",gradeCounts);

  useEffect(()=>{
    let buffer = gradesList ? Object.values(gradesList).reduce((acc, mark) => {
      const grade = mark.grade || "N/A";
      acc[grade] = (acc[grade] || 0) + 1;
      return acc;
    }, {}) : {};
    setGradeCounts(buffer)
  }, [gradesList])

  useEffect(() => {
    gradeDistribution = Object.entries(gradeCounts).map(([grade, count]) => ({
    grade,
    count
  }));
  console.log("gradeDistribution: ", gradeDistribution)
  }, [gradeCounts])

  let grades = []
  const totalStudents = students ? students.length : 0;
  // const gradeDistribution = gradesList ? (gradesList.map((gradeItem)=>{
  //   grades.push({grade: gradeItem.grade, })
  // }[
  // { grade: 'A', count: 12 },
  // { grade: 'B', count: 18 },
  // { grade: 'C', count: 8 },
  // { grade: 'D', count: 3 },
  // { grade: 'F', count: 1 }
  // ]) : [];

  

  // // Convert to array of objects if needed
  // const gradeAggregate = gradesList ? Object.entries(gradeCounts).map(([grade, count]) => ({
  //   grade,
  //   count
  // })) : [];

  // console.log(gradeAggregate);

  return (
    <div className="space-y-6">
      <div>
        <h1>Welcome back, Ms. Johnson</h1>
        <p className="text-muted-foreground">Here's what's happening in your classes today</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <Users className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-muted-foreground">Total Students</p>
              <p className="text-2xl">{totalStudents}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-muted-foreground">Active Assignments</p>
              <p className="text-2xl">8</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-muted-foreground">Students Over 70</p>
              <p className="text-2xl">{(passedStudents/4).toFixed(0)}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-muted-foreground">Class Average</p>
              <p className="text-2xl">{avgMark.toFixed(2)}%</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution Chart */}
        <Card className="p-6">
          <h3 className="mb-4">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={gradeDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Weekly Submission Trends */}
        <Card className="p-6">
          <h3 className="mb-4">Weekly Submission Trends</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Line type="monotone" dataKey="assignments" stroke="#8884d8" strokeWidth={2} />
              <Line type="monotone" dataKey="submissions" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5" />
          <h3>Today's Schedule</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p>Period 1: AP Biology</p>
              <p className="text-sm text-muted-foreground">Room 204</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>8:00 - 9:00 AM</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p>Period 3: Chemistry</p>
              <p className="text-sm text-muted-foreground">Lab 105</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>10:15 - 11:15 AM</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
            <div>
              <p>Period 5: Environmental Science</p>
              <p className="text-sm text-muted-foreground">Room 208</p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>1:00 - 2:00 PM</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}