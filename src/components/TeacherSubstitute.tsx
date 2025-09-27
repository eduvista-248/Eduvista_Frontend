import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar, CalendarDays } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Plus, Search, Calendar as CalendarIcon, User, Clock, CheckCircle, XCircle, AlertCircle, FileText } from "lucide-react";
import { useState } from "react";

const leaveRequests = [
  {
    id: 1,
    date: "2025-09-12",
    reason: "Medical Appointment",
    status: "pending",
    substitute: "Dr. Sarah Mitchell",
    classes: ["AP Biology - Period 1", "Chemistry - Period 3"],
    notes: "Need to cover photosynthesis lab. Materials are prepared in Lab 204."
  },
  {
    id: 2,
    date: "2025-09-18",
    reason: "Professional Development",
    status: "approved",
    substitute: "Mr. James Wilson",
    classes: ["Environmental Science - Period 5"],
    notes: "Continue with Chapter 8 reading assignment."
  },
  {
    id: 3,
    date: "2025-09-25",
    reason: "Personal Leave",
    status: "approved",
    substitute: "Ms. Emily Rodriguez",
    classes: ["AP Biology - Period 1", "Chemistry - Period 3", "Environmental Science - Period 5"],
    notes: "Test day for AP Biology. Answer key is in desk drawer."
  },
  {
    id: 4,
    date: "2025-09-08",
    reason: "Sick Leave",
    status: "completed",
    substitute: "Dr. Sarah Mitchell",
    classes: ["Chemistry - Period 3"],
    notes: "Completed successfully. Students were well-behaved."
  }
];

const availableSubstitutes = [
  {
    id: 1,
    name: "Dr. Sarah Mitchell",
    subject: "Biology & Chemistry",
    rating: 4.8,
    available: true,
    lastAssignment: "2025-09-05"
  },
  {
    id: 2,
    name: "Mr. James Wilson",
    subject: "Environmental Science",
    rating: 4.6,
    available: true,
    lastAssignment: "2025-08-28"
  },
  {
    id: 3,
    name: "Ms. Emily Rodriguez",
    subject: "General Science",
    rating: 4.9,
    available: false,
    lastAssignment: "2025-09-06"
  },
  {
    id: 4,
    name: "Dr. Michael Thompson",
    subject: "Chemistry & Physics",
    rating: 4.7,
    available: true,
    lastAssignment: "2025-08-30"
  }
];

function getStatusColor(status: string) {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'approved': return 'bg-green-100 text-green-800';
    case 'denied': return 'bg-red-100 text-red-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'pending': return <AlertCircle className="h-4 w-4" />;
    case 'approved': return <CheckCircle className="h-4 w-4" />;
    case 'denied': return <XCircle className="h-4 w-4" />;
    case 'completed': return <CheckCircle className="h-4 w-4" />;
    default: return <Clock className="h-4 w-4" />;
  }
}

export function TeacherSubstitute() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const pendingRequests = leaveRequests.filter(r => r.status === 'pending').length;
  const approvedRequests = leaveRequests.filter(r => r.status === 'approved').length;
  const availableSubsCount = availableSubstitutes.filter(s => s.available).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Substitute Management</h1>
          <p className="text-muted-foreground">Manage leave requests and substitute teacher assignments</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Request Leave</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Request Leave</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="leave-date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {selectedDate ? selectedDate.toDateString() : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="reason">Reason</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="medical">Medical Appointment</SelectItem>
                    <SelectItem value="professional">Professional Development</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="substitute">Preferred Substitute</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select substitute" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSubstitutes
                      .filter(sub => sub.available)
                      .map(sub => (
                        <SelectItem key={sub.id} value={sub.name}>
                          {sub.name} - {sub.subject}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="notes">Notes for Substitute</Label>
                <Textarea 
                  id="notes"
                  placeholder="Lesson plans, materials needed, special instructions..."
                  className="min-h-20"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)}>
                  Submit Request
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Pending Requests</p>
              <p className="text-2xl">{pendingRequests}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-yellow-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Approved</p>
              <p className="text-2xl">{approvedRequests}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Available Subs</p>
              <p className="text-2xl">{availableSubsCount}</p>
            </div>
            <User className="h-8 w-8 text-blue-600" />
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">This Month</p>
              <p className="text-2xl">3</p>
            </div>
            <CalendarIcon className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Requests */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <h3>Leave Requests</h3>
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search requests..." className="pl-10" />
              </div>
            </div>

            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Requests</TabsTrigger>
                <TabsTrigger value="pending">Pending ({pendingRequests})</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4">
                {leaveRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(request.date).toLocaleDateString()}</span>
                        </div>
                        <p className="font-medium">{request.reason}</p>
                        <p className="text-sm text-muted-foreground">Substitute: {request.substitute}</p>
                      </div>
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusIcon(request.status)}
                        <span className="ml-1">{request.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-medium">Classes Affected:</p>
                        <div className="flex flex-wrap gap-1">
                          {request.classes.map((cls, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cls}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {request.notes && (
                        <div>
                          <p className="text-sm font-medium">Notes:</p>
                          <p className="text-sm text-muted-foreground">{request.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {leaveRequests
                  .filter(request => request.status === 'pending')
                  .map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(request.date).toLocaleDateString()}</span>
                          </div>
                          <p className="font-medium">{request.reason}</p>
                          <p className="text-sm text-muted-foreground">Substitute: {request.substitute}</p>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">{request.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Classes Affected:</p>
                          <div className="flex flex-wrap gap-1">
                            {request.classes.map((cls, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {cls}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {request.notes && (
                          <div>
                            <p className="text-sm font-medium">Notes:</p>
                            <p className="text-sm text-muted-foreground">{request.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </TabsContent>

              <TabsContent value="approved" className="space-y-4">
                {leaveRequests
                  .filter(request => request.status === 'approved')
                  .map((request) => (
                    <div key={request.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{new Date(request.date).toLocaleDateString()}</span>
                          </div>
                          <p className="font-medium">{request.reason}</p>
                          <p className="text-sm text-muted-foreground">Substitute: {request.substitute}</p>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">{request.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium">Classes Affected:</p>
                          <div className="flex flex-wrap gap-1">
                            {request.classes.map((cls, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {cls}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        {request.notes && (
                          <div>
                            <p className="text-sm font-medium">Notes:</p>
                            <p className="text-sm text-muted-foreground">{request.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Available Substitutes */}
        <div>
          <Card className="p-6">
            <h3 className="mb-4">Available Substitutes</h3>
            <div className="space-y-4">
              {availableSubstitutes.map((substitute) => (
                <div key={substitute.id} className={`border rounded-lg p-4 ${!substitute.available ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{substitute.name}</p>
                      <p className="text-sm text-muted-foreground">{substitute.subject}</p>
                    </div>
                    <Badge variant={substitute.available ? "secondary" : "outline"}>
                      {substitute.available ? "Available" : "Busy"}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Rating:</span>
                      <span>⭐ {substitute.rating}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Last Assignment:</span>
                      <span className="text-muted-foreground">
                        {new Date(substitute.lastAssignment).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {substitute.available && (
                    <Button size="sm" className="w-full mt-3">
                      Request Assignment
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}