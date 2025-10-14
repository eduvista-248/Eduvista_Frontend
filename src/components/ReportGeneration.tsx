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

const reportTypes = [
  {
    id: "progress-report",
    title: "Progress Report",
    description: "Overall student progress and improvement",
    icon: BarChart3,
    color: "text-indigo-600",
    type: "false"
  },
  {
    id: "grade-report",
    title: "Grade Report",
    description: "Student grades and performance analytics",
    icon: TrendingUp,
    color: "text-green-600",
    type: "false"
  },
  {
    id: "attendance-report",
    title: "Attendance Report", 
    description: "Student attendance patterns and statistics",
    icon: Users,
    color: "text-blue-600",
    type: "false"
  },
  {
    id: "assignment-report",
    title: "Assignment Report",
    description: "Assignment completion and submission rates",
    icon: BookOpen,
    color: "text-purple-600",
    type: "disable"
  },
  {
    id: "behavior-report",
    title: "Behavior Report",
    description: "Student behavior patterns and incidents",
    icon: CheckCircle,
    color: "text-orange-600",
    type: "disable"
  },
  {
    id: "parent-communication",
    title: "Parent Communication",
    description: "Summary of parent interactions and updates",
    icon: Mail,
    color: "text-pink-600",
    type: "disable"
  }
];

const recentReports = [
  {
    id: 1,
    title: "Q1 Grade Report - AP Biology",
    type: "Grade Report",
    generatedAt: "2025-09-07T10:30:00",
    status: "completed",
    downloadUrl: "#"
  },
  {
    id: 2,
    title: "Weekly Attendance - All Classes",
    type: "Attendance Report",
    generatedAt: "2025-09-06T14:15:00",
    status: "completed", 
    downloadUrl: "#"
  },
  {
    id: 3,
    title: "Assignment Completion - Chemistry",
    type: "Assignment Report",
    generatedAt: "2025-09-05T09:45:00",
    status: "processing",
    downloadUrl: null
  },
  {
    id: 4,
    title: "Monthly Progress Report",
    type: "Progress Report",
    generatedAt: "2025-09-01T16:20:00",
    status: "completed",
    downloadUrl: "#"
  }
];

const gradeData = [
  { class: 'AP Biology', A: 12, B: 18, C: 8, D: 3, F: 1 },
  { class: 'Chemistry', A: 8, B: 15, C: 12, D: 2, F: 1 },
  { class: 'Env Science', A: 10, B: 12, C: 6, D: 1, F: 0 }
];

const attendanceData = [
  { name: 'Present', value: 89, color: '#22c55e' },
  { name: 'Absent', value: 8, color: '#ef4444' },
  { name: 'Late', value: 3, color: '#f59e0b' }
];

const assignmentTrends = [
  { week: 'Week 1', submitted: 95, onTime: 92 },
  { week: 'Week 2', submitted: 88, onTime: 85 },
  { week: 'Week 3', submitted: 91, onTime: 89 },
  { week: 'Week 4', submitted: 94, onTime: 91 }
];

export function ReportGeneration({ my_class_id }) {
  const [selectedType, setSelectedType] = useState("");
  const [students, setStudents] = useState([]);
  const [student_ids, setStudent_ids] = useState([]);
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedAll, setSelectedAll] = useState(true);
  const [reportLinks, setReportLinks] = useState([]);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    // Simulate report generation
    // setTimeout(() => {
    //   setIsGenerating(false);
    // }, 3000);
    try {
      // Run all fetch requests in parallel
      const responses = await Promise.all(
        selectedStudents.map(async (student) => {
          const res = await fetch(`http://127.0.0.1:8000/api/report_card/${student}`);
          if (!res.ok) {
            throw new Error(`Failed to fetch report for ${student}`);
          }
          console.log("student_id: ", student)
          const data = await res.json(); // backend should return { reportLink: "..." }
          return {
            studentName: data.student_name,
            link: data.preview_url,
          };
        })
      );

      setReportLinks(responses);
    } catch (error) {
      console.error("Error generating reports:", error);
      alert("Some reports could not be generated.");
    } finally {
      setIsGenerating(false);
    }
    // const response = await fetch(`http://127.0.0.1:8000/api/report_card/${}`);
  };

  const date = new Date("2024-12-31");
  useEffect(() => {
    async function fetchStudents() {
      try {
        const formattedDate = date.toISOString().split("T")[0]; // YYYY-MM-DD
        console.log("formattedDate: ",formattedDate)
        const res = await fetch(`http://127.0.0.1:8000/api/myclass/students/${my_class_id}/?date=${formattedDate}`);
        const data = await res.json();
        console.log(data);
        setStudents(data.students || []);
        setStudent_ids(data.students.map((student) => student.student_id) || []);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    }
    fetchStudents();
  }, [my_class_id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Report Generation</h1>
          <p className="text-muted-foreground">Generate comprehensive reports for students, classes, and performance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Generation Form */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="mb-6">Generate New Report</h3>
            
            <div className="space-y-6">
              {/* Report Type Selection */}
              <div>
                <Label className="mb-4 block">Select Report Type</Label>
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

              {/* Class Selection */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="class">Class</Label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Classes</SelectItem>
                      <SelectItem value="ap-biology">AP Biology</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="environmental-science">Environmental Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="format">Report Format</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div> */}

              {/* Date Range */}
              {/* <div>
                <Label className="mb-2 block">Date Range</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date" className="text-sm">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {dateRange.from?.toDateString() || "Select start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.from}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, from: date || new Date() }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label htmlFor="end-date" className="text-sm">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start">
                          <CalendarIcon className="h-4 w-4 mr-2" />
                          {dateRange.to?.toDateString() || "Select end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={dateRange.to}
                          onSelect={(date) => setDateRange(prev => ({ ...prev, to: date || new Date() }))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div> */}

              {/* Student Selection */}
              <div>
                <Label className="mb-2 block">Include Students</Label>
                <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-3">
                  {students && students.map((student) => (
                    <div key={student.student_id} className="flex items-center space-x-2">
                      <Checkbox
                        id={student.student_id}
                        checked={selectedStudents.includes(student.student_id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedStudents([...selectedStudents, student.student_id]);
                          } else {
                            setSelectedStudents(selectedStudents.filter(s => s !== student.student_id));
                          }
                        }}
                      />
                      <Label htmlFor={student} className="text-sm">{student.first_name} {student.last_name}</Label>
                    </div>
                  ))}
                </div>
               {selectedAll && <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => {
                    setSelectedAll(false);
                    setSelectedStudents(student_ids)}
                  }
                >
                  Select All
                </Button>}
                {!selectedAll && <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => {
                    setSelectedAll(true);
                    setSelectedStudents([])
                  }}
                >
                  Deselect All
                </Button>}
              </div>

              {/* Generate Button */}
              <div className="flex space-x-2">
                <Button 
                  onClick={handleGenerateReport}
                  disabled={!selectedType || isGenerating}
                  className="flex-1"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Report
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  Preview
                </Button>
              </div>


              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Generating report...</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
              )}
            </div>
          </Card>

          {reportLinks && 
        //   <ul>
        //   {reportLinks.map((report, idx) => (
        //     <li key={idx}>
        //       <strong>{report.student_name}</strong>:{" "}
        //       <a href={report.link} target="_blank" rel="noopener noreferrer">
        //         View Report
        //       </a>
        //     </li>
        //   ))}
        // </ul>
         <div className="space-y-3">
          {reportLinks.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition p-3 rounded-lg"
            >
              <span className="font-medium text-gray-700">{r.studentName}</span>
              <a
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                View Report →
              </a>
            </div>
          ))}
        </div>
        }
            
          {/* Data Preview */}
          <Card className="p-6 mt-6">
            <h3 className="mb-4">Data Preview</h3>
            <Tabs defaultValue="grades" className="space-y-4">
              <TabsList>
                <TabsTrigger value="grades">Grades</TabsTrigger>
                <TabsTrigger value="attendance">Attendance</TabsTrigger>
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
              </TabsList>

              <TabsContent value="grades">
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={gradeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="class" />
                    <YAxis />
                    <Bar dataKey="A" fill="#22c55e" />
                    <Bar dataKey="B" fill="#3b82f6" />
                    <Bar dataKey="C" fill="#f59e0b" />
                    <Bar dataKey="D" fill="#ef4444" />
                    <Bar dataKey="F" fill="#6b7280" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="attendance">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={attendanceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, value}) => `${name}: ${value}%`}
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="assignments">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={assignmentTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Line type="monotone" dataKey="submitted" stroke="#3b82f6" strokeWidth={2} />
                    <Line type="monotone" dataKey="onTime" stroke="#22c55e" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Recent Reports & Quick Actions */}
        <div className="space-y-6">
          {/* Quick Report Templates */}
          <Card className="p-6">
            <h3 className="mb-4">Quick Templates</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Weekly Grade Summary
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <PieChartIcon className="h-4 w-4 mr-2" />
                Monthly Attendance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="h-4 w-4 mr-2" />
                Assignment Analytics
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                Progress Tracking
              </Button>
            </div>
          </Card>

          {/* Recent Reports */}
          <Card className="p-6">
            <h3 className="mb-4">Recent Reports</h3>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="border rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{report.title}</p>
                      <p className="text-xs text-muted-foreground">{report.type}</p>
                    </div>
                    <Badge 
                      variant={report.status === 'completed' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {report.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {new Date(report.generatedAt).toLocaleDateString()}
                    </p>
                    {report.status === 'completed' && (
                      <Button size="sm" variant="outline">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Export Options */}
          <Card className="p-6">
            <h3 className="mb-4">Export Options</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Email Reports</span>
                <Checkbox />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-Schedule</span>
                <Checkbox />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Include Charts</span>
                <Checkbox defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Detailed Analytics</span>
                <Checkbox defaultChecked />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}