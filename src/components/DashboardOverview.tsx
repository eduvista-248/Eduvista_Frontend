import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, CheckCircle, TrendingUp, Calendar, Clock } from "lucide-react";

const gradeDistribution = [
  { grade: 'A', count: 12 },
  { grade: 'B', count: 18 },
  { grade: 'C', count: 8 },
  { grade: 'D', count: 3 },
  { grade: 'F', count: 1 }
];

const weeklyProgress = [
  { day: 'Mon', assignments: 15, submissions: 12 },
  { day: 'Tue', assignments: 12, submissions: 10 },
  { day: 'Wed', assignments: 18, submissions: 16 },
  { day: 'Thu', assignments: 8, submissions: 8 },
  { day: 'Fri', assignments: 22, submissions: 20 }
];

export function DashboardOverview() {
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
              <p className="text-2xl">42</p>
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
              <p className="text-muted-foreground">Pending Reviews</p>
              <p className="text-2xl">15</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-orange-600" />
            <div>
              <p className="text-muted-foreground">Class Average</p>
              <p className="text-2xl">87%</p>
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