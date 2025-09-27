import { useState } from "react";
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

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [expanded, setExpanded] = useState<string | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      // case "students":
      //   return <StudentList />;
      case "students-marks":
        return (<MarksSection />);
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
              <div className="flex-1">
                <p className="text-sm">Ms. Johnson</p>
                <p className="text-xs text-muted-foreground">Science Teacher</p>
              </div>
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