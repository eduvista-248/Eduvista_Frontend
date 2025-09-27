import { useState, useEffect } from "react";

import { AttendanceTracker } from "./components/AttendanceTracker";
import { Avatar } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Activity, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  GraduationCap,
  UserCheck,
  FileText,
  UserCog
} from "lucide-react";
import MarksSection from "./components/MarksSection";
import MarksView from "./components/MarksView";
import { AttendanceView } from "./components/AttendanceView";

import "./styles/App.css"



export default function App() {
  const [teacherDetails, setTeacherDetails] = useState<Teacher | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (teacher: Teacher, accessToken: string) => {
    setTeacherDetails(teacher);
    setToken(accessToken);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    const storedTeacher = localStorage.getItem("teacher");

    if (storedToken && storedTeacher) {
      setToken(storedToken);
      setTeacherDetails(JSON.parse(storedTeacher));
    }
  }, []);

  // Logout clears state + localStorage
  const handleLogout = () => {
    localStorage.clear();
    setTeacherDetails(null);
    setToken(null);
  };

  // Conditional render
  if (!teacherDetails || !token) {
    return <LoginPage />;
  }

  return <HomePage teacher={teacherDetails} />;
  //  onLogout={handleLogout}
}