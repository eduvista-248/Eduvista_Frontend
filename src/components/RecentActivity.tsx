import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { Button } from "./ui/button";
import { Bell, MessageSquare, FileText, UserCheck, Award, AlertTriangle } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "submission",
    icon: FileText,
    student: "Emma Thompson",
    action: "submitted Lab Report #3",
    class: "AP Biology",
    time: "5 minutes ago",
    priority: "normal"
  },
  {
    id: 2,
    type: "grade",
    icon: Award,
    student: "Michael Chen",
    action: "received grade A on Chapter 5 Quiz",
    class: "Chemistry",
    time: "15 minutes ago",
    priority: "normal"
  },
  {
    id: 3,
    type: "attendance",
    icon: UserCheck,
    student: "Sarah Williams",
    action: "marked present",
    class: "Environmental Science",
    time: "1 hour ago",
    priority: "low"
  },
  {
    id: 4,
    type: "message",
    icon: MessageSquare,
    student: "Parent of James Rodriguez",
    action: "sent a message about homework",
    class: "AP Biology",
    time: "2 hours ago",
    priority: "high"
  },
  {
    id: 5,
    type: "late",
    icon: AlertTriangle,
    student: "Ashley Davis",
    action: "late submission for Midterm Exam",
    class: "Chemistry",
    time: "3 hours ago",
    priority: "high"
  },
  {
    id: 6,
    type: "submission",
    icon: FileText,
    student: "David Kim",
    action: "submitted Research Paper",
    class: "Environmental Science",
    time: "4 hours ago",
    priority: "normal"
  },
  {
    id: 7,
    type: "grade",
    icon: Award,
    student: "Lisa Park",
    action: "received grade B+ on Lab Practical",
    class: "AP Biology",
    time: "5 hours ago",
    priority: "normal"
  },
  {
    id: 8,
    type: "attendance",
    icon: UserCheck,
    student: "Carlos Martinez",
    action: "marked absent",
    class: "Chemistry",
    time: "1 day ago",
    priority: "medium"
  }
];

function getActivityColor(type: string) {
  switch (type) {
    case 'submission': return 'text-blue-600';
    case 'grade': return 'text-green-600';
    case 'attendance': return 'text-purple-600';
    case 'message': return 'text-orange-600';
    case 'late': return 'text-red-600';
    default: return 'text-gray-600';
  }
}

function getPriorityColor(priority: string) {
  switch (priority) {
    case 'high': return 'border-l-red-500';
    case 'medium': return 'border-l-yellow-500';
    case 'low': return 'border-l-green-500';
    default: return 'border-l-blue-500';
  }
}

export function RecentActivity() {
  const highPriorityCount = activities.filter(a => a.priority === 'high').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Recent Activity</h1>
          <p className="text-muted-foreground">Stay updated with the latest happenings in your classes</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
            {highPriorityCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {highPriorityCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Activity Feed */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h3 className="mb-4">Activity Feed</h3>
            <div className="space-y-4">
              {activities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className={`border-l-4 pl-4 pb-4 ${getPriorityColor(activity.priority)}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-full bg-gray-100 ${getActivityColor(activity.type)}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-medium">{activity.student}</p>
                          <Badge variant="secondary" className="text-xs">
                            {activity.class}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {activity.action}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <Button variant="outline">Load More Activities</Button>
            </div>
          </Card>
        </div>

        {/* Quick Actions & Notifications */}
        <div className="space-y-6">
          {/* High Priority Items */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              Needs Attention
            </h3>
            <div className="space-y-3">
              {activities
                .filter(a => a.priority === 'high')
                .map((activity) => (
                  <div key={activity.id} className="p-3 bg-red-50 rounded-lg">
                    <p className="font-medium text-sm">{activity.student}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
            </div>
          </Card>

          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="mb-4">Today's Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">New Submissions</span>
                </div>
                <Badge>12</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageSquare className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">Messages</span>
                </div>
                <Badge variant="secondary">3</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Grades Posted</span>
                </div>
                <Badge variant="secondary">8</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <UserCheck className="h-4 w-4 text-purple-600" />
                  <span className="text-sm">Attendance Taken</span>
                </div>
                <Badge variant="secondary">3/3</Badge>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <UserCheck className="h-4 w-4 mr-2" />
                Take Attendance
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Award className="h-4 w-4 mr-2" />
                Enter Grades
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}