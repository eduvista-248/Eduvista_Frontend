import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Checkbox } from "./ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  Download, 
  FileText, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  Users, 
  BookOpen, 
  CheckCircle,
  BarChart3,
  PieChart as PieChartIcon,
  FileSpreadsheet,
  Mail
} from "lucide-react";
import { useState, useEffect } from "react";
import LoginPage from "./LoginPage";

const reportTypes = [
  {
    id: "teacher-login",
    title: "Teacher Login",
    description: "Click to access teacher portal",
    icon: BarChart3,
    color: "text-indigo-600",
    type: "enable"
  },
  {
    id: "parent-login",
    title: "Parent Login",
    description: "Click to access parent portal",
    icon: TrendingUp,
    color: "text-green-600",
    type: "disable"
  },
  {
    id: "admin-login",
    title: "Adminn Login", 
    description: "Click to access admin portal",
    icon: Users,
    color: "text-blue-600",
    type: "disable"
  },
  {
    id: "student-login",
    title: "Student Login",
    description: "Click to access student portal",
    icon: BookOpen,
    color: "text-purple-600",
    type: "disable"
  },
];


export function HomeLogin() {
  const [selectedType, setSelectedType] = useState("");
  const [students, setStudents] = useState([]);
  const [student_ids, setStudent_ids] = useState([]);
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedAll, setSelectedAll] = useState(true);
  const [reportLinks, setReportLinks] = useState([]);

  if (selectedType == "teacher-login") {
    return <LoginPage />;
  }

  return (
    <div className="space-y-6" style={{paddingTop: "10vh"}}>
      <div className="flex items-center justify-center">
        <div className="px-6">
          <h1 style={{fontWeight: "600", fontSize: "2rem"}}>Portal Hub</h1>
          {/* <p className="text-muted-foreground"></p> */}
        </div>
      </div>

      <div className="mx-6">
        {/* Report Generation Form */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            {/* <h1 className="mb-6">Portal Hub</h1> */}
            
            <div className="space-y-6">
              {/* Report Type Selection */}
              <div>
                {/* <Label className="mb-4 block">Select Report Type</Label> */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {reportTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedType === type.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                        onClick={() => {
                          if (type.type !== "disable")  setSelectedType(type.id)
                          else alert("This report type is currently disabled.")
                        }}
                        // disabled={type.type == "disable"}
                      >
                        <div className="flex items-start space-x-3">
                          <IconComponent className={`h-5 w-5 mt-0.5 ${type.color}`} />
                          <div>
                            <h4 className="font-medium">{type.title}</h4>
                            <p className="text-sm text-muted-foreground">{type.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}