import { useState, useEffect } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton, } from "./components/ui/sidebar";
import { DashboardOverview } from "./components/DashboardOverview";
import { StudentList } from "./components/StudentList";
import { AssignmentTracker } from "./components/AssignmentTracker";
import { RecentActivity } from "./components/RecentActivity";
import { TeacherSubstitute } from "./components/TeacherSubstitute";
import { ReportGeneration } from "./components/ReportGeneration";
import { AttendanceTracker } from "./components/AttendanceTracker";
import { Avatar } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
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

const navigationItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    id: "dashboard"
  },
  {
    title: "Students",
    icon: Users,
    id: "students",
    children: [
      { title: "Marks", id: "students-marks" },
      { title: "Attendance", id: "students-attendance" },
      { title: "Class-wise TT", id: "students-TT" }
    ]
  },
  {
    title: "Assignments",
    icon: BookOpen,
    id: "assignments"
  },
  {
    title: "Attendance",
    icon: UserCheck,
    id: "attendance"
  },
  {
    title: "Reports",
    icon: FileText,
    id: "reports"
  },
  {
    title: "Substitute",
    icon: UserCog,
    id: "substitute"
  },
  {
    title: "Recent Activity",
    icon: Activity,
    id: "activity"
  },
  {
    title: "Calendar",
    icon: Calendar,
    id: "calendar"
  },
  {
    title: "Messages",
    icon: MessageSquare,
    id: "messages"
  }
];

type Teacher = {
  message: string,
  user_id: string,
  email: string,
  teacher: {
    teacher_id: string,
    first_name: string,
    last_name: string,
    designation: string,
    education: string,
    ph: string,
    salary: number,
    address: string,
    gender: string,
    user_id: string,
    my_class: number
  },
  class_info: [
    {
      tsc_id: string,
      teacher_id: string,
      subject_id: string,
      class_id: number
    }
  ]
}

type Class = {
  class_id: number,
  class_name: string,
  strength: number,
  room_no: string
}

type Subject = {
  subject_id: string,
  subject_name: string
}

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [teacherDetails, setTeacherDetails] = useState<Teacher>(null);
  const [subjects, setSubjects] = useState<Subject[]>(null);
  const [classes, setClasses] = useState<Class[]>();

  useEffect(() => {
  async function loginAndFetch(email, password) {
    const res = await fetch("http://127.0.0.1:8000/api/api/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Login failed");

    // Save tokens & teacher info
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
    localStorage.setItem("expires_in", data.expires_in);
    localStorage.setItem("teacher", JSON.stringify(data.teacher));

    setTeacherDetails(data.teacher);

    // Fetch related data
    await fetchSubjects(data.teacher.teacher_id, data.access_token);

    return data;
  }

  async function fetchSubjects(teacher_id, token) {
    // Fetch subjects
    const subjectRes = await fetch(`http://127.0.0.1:8000/api/subjects/${teacher_id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const subjectsData = await subjectRes.json();
    setSubjects(subjectsData);

    // Fetch classes
    const classRes = await fetch(`http://127.0.0.1:8000/api/classes/${teacher_id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const classesData = await classRes.json();
    setClasses(classesData);
  }

  async function init() {
    const token = localStorage.getItem("access_token");
    const teacher = localStorage.getItem("teacher");

    if (token && teacher) {
      const teacherObj = JSON.parse(teacher);
      setTeacherDetails(teacherObj);
      console.log(teacherObj.teacher_id);
      await fetchSubjects(teacherObj.teacher_id, token);
    } else {
      // If no tokens → login
      await loginAndFetch("priyachopra@gmail.com", "password");
    }
  }

  init();
}, []);

  // useEffect(() => {
  //   async function fetchTeacherDetails(email, password) {
  //     const res = await fetch("http://127.0.0.1:8000/api/api/login/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     const data = await res.json();
  //     console.log("data: ",data);
  //     if (!res.ok) throw new Error(data.error || "Login failed");
      
  //     localStorage.setItem("access_token", data.access_token);
  //     localStorage.setItem("refresh_token", data.refresh_token);
  //     localStorage.setItem("expires_in", data.expires_in); 
  //     localStorage.setItem("teacher", JSON.stringify(data.teacher));


  //     // classes come from login response
  //     // setTeacherDetails(data);
  //     console.log("data: ", data);
  //     return data;
  //   }

  //   if (!localStorage.getItem("access_token")) {
  //     // fetchTeacherDetails("kritichopra@gmail.com", "password");
  //     fetchTeacherDetails("priyachopra@gmail.com", "password");
  //   }
  // }, []);

  // useEffect(() => {
  //   // setTeacherDetails(teacherObj);
  //   const token = localStorage.getItem("access_token");

  //   fetch(`http://127.0.0.1:8000/api/classes/${teacherDetails.teacher_id}/`, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setClasses(data);  // now full details come from backend
  //       console.log("Classes after reload:", data);
  //     });
    
  // }, [teacherDetails]);

// useEffect(() => {
//     async function getClasses(teacher_id){
//       const res = await fetch(`http://127.0.0.1:8000/api/classes/${teacher_id}/`);
//       const data = await res.json();
//       // console.log(data);
//       setClasses(data)
//       return await data;
//     }
//     const token = localStorage.getItem("access_token");
//     const teacher = localStorage.getItem("teacher");
//     // console.log("inside the initial useEffect hook");
//     if (teacher) {
//       const teacherObj = JSON.parse(teacher);
//       // console.log("teacherObj:",teacherObj.teacher_id);
//       setTeacherDetails(teacherObj);
//       // console.log(getClasses(teacherObj.teacher_id))
//     }
//   }, []);


  // useEffect(() => {
  //   async function fetchClasses() {
  //     const data = await fetch(`http://127.0.0.1:8000/api/classes/${teacherDetails.teacher.teacher_id}`);
  //     const response = await data.json();
  //     console.log("from the fetchClasses fxn: ", response);
  //     return response;
  //   }
  //   fetchClasses().then(setClasses);

  // }, [teacherDetails])

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "students-marks":
        return (<>
          <>
            <MarksView subjects_list={subjects} />
            <MarksSection subjects_list={subjects} />
          </>
        </>);
      case "students-attendance":
        return <AttendanceTracker />;
      case "students-TT":
        return (<>Student Time-Table</>);
      case "assignments":
        return <AssignmentTracker />;
      // case "attendance":
        
      case "reports":
        return <ReportGeneration />;
      case "substitute":
        return <TeacherSubstitute />;
      case "activity":
        return <RecentActivity />;
      case "calendar":
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3>Calendar View</h3>
              <p className="text-muted-foreground">Calendar functionality coming soon</p>
            </div>
          </div>
        );
      case "messages":
        return (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3>Messages</h3>
              <p className="text-muted-foreground">Messaging functionality coming soon</p>
            </div>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };
  console.log("teacherDetails: ", teacherDetails)
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarHeader className="border-b p-4">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h2>EduDash</h2>
                <p className="text-xs text-muted-foreground">Teacher Portal</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      if (item.children) {
                        setExpanded(expanded === item.id ? null : item.id);
                      } else {
                        setActiveTab(item.id);
                      }
                    }}
                    isActive={activeTab === item.id}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>

                  {item.children && expanded === item.id && (
                    <SidebarMenuSub>
                      {item.children.map((child) => (
                        <SidebarMenuSubItem key={child.id}>
                          <SidebarMenuSubButton
                            onClick={() => setActiveTab(child.id)}
                            isActive={activeTab === child.id}
                          >
                            {child.title}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarFooter className="border-t p-4">
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="h-8 w-8">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center h-full">
                  MJ
                </div>
              </Avatar>
              {teacherDetails ?
              (<div className="flex-1">
                <p className="text-sm"><>{teacherDetails.first_name}</> <>{teacherDetails.last_name}</></p>
                <p className="text-xs text-muted-foreground">{teacherDetails.designation}</p>
              </div>
              ) : (
                  <p>Loading...</p>
              )}
            </div>
            
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col">
          <header className="border-b bg-background px-6 py-3">
            <div className="flex items-center space-x-4">
              <SidebarTrigger />
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">Spring 2025</Badge>
                <Badge variant="outline">3 Classes</Badge>
              </div>
            </div>
          </header>
          
          <main className="flex-1 p-6 bg-background">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}