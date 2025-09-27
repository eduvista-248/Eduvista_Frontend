import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { Input } from "./ui/input";
import { Plus, Search, Calendar, Users, Clock, CheckCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const assignments = [
  {
    id: 1,
    title: "Chapter 5: Photosynthesis Lab Report",
    class: "AP Biology",
    dueDate: "2025-09-08",
    submissions: 28,
    totalStudents: 32,
    status: "active",
    type: "lab-report"
  },
  {
    id: 2,
    title: "Periodic Table Quiz",
    class: "Chemistry",
    dueDate: "2025-09-06",
    submissions: 24,
    totalStudents: 28,
    status: "active",
    type: "quiz"
  },
  {
    id: 3,
    title: "Ecosystem Research Project", 
    class: "Environmental Science",
    dueDate: "2025-09-15",
    submissions: 8,
    totalStudents: 25,
    status: "active",
    type: "project"
  },
  {
    id: 4,
    title: "Chemical Reactions Worksheet",
    class: "Chemistry",
    dueDate: "2025-09-04",
    submissions: 28,
    totalStudents: 28,
    status: "completed",
    type: "worksheet"
  },
  {
    id: 5,
    title: "Cell Division Unit Test",
    class: "AP Biology", 
    dueDate: "2025-09-10",
    submissions: 15,
    totalStudents: 32,
    status: "grading",
    type: "test"
  }
];

const upcomingDeadlines = [
  { title: "Periodic Table Quiz", class: "Chemistry", dueDate: "Sept 6", submissions: "24/28" },
  { title: "Photosynthesis Lab Report", class: "AP Biology", dueDate: "Sept 8", submissions: "28/32" },
  { title: "Cell Division Unit Test", class: "AP Biology", dueDate: "Sept 10", submissions: "15/32" },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'active': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'grading': return 'bg-yellow-100 text-yellow-800';
    case 'overdue': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'quiz': return '📝';
    case 'test': return '📋';
    case 'project': return '📊';
    case 'lab-report': return '🔬';
    case 'worksheet': return '📄';
    default: return '📚';
  }
}

export function AssignmentTracker() {
  const activeAssignments = assignments.filter(a => a.status === 'active');
  const gradingAssignments = assignments.filter(a => a.status === 'grading');
  const completedAssignments = assignments.filter(a => a.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Assignments</h1>
          <p className="text-muted-foreground">Create and manage assignments across all your classes</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Assignment</span>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Active</p>
              <p className="text-2xl">{activeAssignments.length}</p>
            </div>
            <Clock className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Needs Grading</p>
              <p className="text-2xl">{gradingAssignments.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Completed</p>
              <p className="text-2xl">{completedAssignments.length}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Avg Completion</p>
              <p className="text-2xl">84%</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Assignment List */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search assignments..." className="pl-10" />
              </div>
            </div>

            <Tabs defaultValue="active" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active ({activeAssignments.length})</TabsTrigger>
                <TabsTrigger value="grading">Grading ({gradingAssignments.length})</TabsTrigger>
                <TabsTrigger value="completed">Completed ({completedAssignments.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="active" className="space-y-4">
                {activeAssignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(assignment.type)}</span>
                        <div>
                          <h4>{assignment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assignment.class}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Submissions: {assignment.submissions}/{assignment.totalStudents}</span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                        </span>
                      </div>
                      <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="grading" className="space-y-4">
                {gradingAssignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(assignment.type)}</span>
                        <div>
                          <h4>{assignment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assignment.class}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Submissions: {assignment.submissions}/{assignment.totalStudents}</span>
                        <Button size="sm" variant="outline">Grade Now</Button>
                      </div>
                      <Progress value={(assignment.submissions / assignment.totalStudents) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="completed" className="space-y-4">
                {completedAssignments.map((assignment) => (
                  <div key={assignment.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{getTypeIcon(assignment.type)}</span>
                        <div>
                          <h4>{assignment.title}</h4>
                          <p className="text-sm text-muted-foreground">{assignment.class}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(assignment.status)}>
                        {assignment.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span>All submissions graded</span>
                      <Button size="sm" variant="outline">View Results</Button>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <Card className="p-6">
            <h3 className="mb-4">Upcoming Deadlines</h3>
            <div className="space-y-4">
              {upcomingDeadlines.map((item, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">{item.class}</p>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span>{item.dueDate}</span>
                    <span className="text-muted-foreground">{item.submissions}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}