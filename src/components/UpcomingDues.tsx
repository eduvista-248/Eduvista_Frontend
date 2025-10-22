import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Users, BookOpen, CheckCircle, TrendingUp, Calendar, Clock, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";

const weeklyProgress = [
  { day: 'Mon', assignments: 35, submissions: 25 },
  { day: 'Tue', assignments: 27, submissions: 15 },
  { day: 'Wed', assignments: 32, submissions: 21 },
  { day: 'Thu', assignments: 19, submissions: 12 },
  { day: 'Fri', assignments: 32, submissions: 20 }
];

let gradeDistribution = []
let average = 0;


export function UpcomingDues() {
  const [payments, setPayments] = useState([]);
  const [student_id, setStudent_id] = useState("");

//   const baseURL = 'https://eduvista-backend-render.onrender.com';
  const baseURL = "http://127.0.0.1:8000/";

//   useEffect(() => {
    
//     fetchPayments();
//   }, []);
  async function fetchPayments() {
    try{
        const res = await fetch(`${baseURL}/api/student/${student_id}/upcoming-dues`);
        const data = await res.json();
        console.log("Upcoming Dues Data:", data);
        setPayments(data);
    }
    catch(error){
        console.error("Error fetching upcoming dues:", error);
    }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if(student_id){
        fetchPayments();
    }else{
        alert("Please enter a valid Student ID");
    }
  }

  return (
    <div className="space-y-6">
      {/* Today's Schedule */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="h-5 w-5" />
          <h3>Payments Due</h3>
        </div>
        <div className="space-y-3">
            <div className="flex space-x-2 mb-4">
                <input type="text" className="bg-switch-background rounded-md p-1 px-2" placeholder="Student ID" onChange={(e) => setStudent_id(e.target.value)} />
                <Button variant="outline" onClick={handleSubmit}><Search /></Button>
            </div>
            {payments && payments.map((payment) => (
                <div className="flex items-center justify-evenly gap-2 p-3 bg-blue-50 rounded-lg">
                    <div className="px-1">
                        <p>{payment.description}</p>
                        <p className="text-sm text-muted-foreground">{payment.status}</p>
                    </div>
                    <div className="px-1">
                        <p>Total Amount</p>
                        <p className="text-sm text-muted-foreground">{payment.total_amount}</p>
                    </div>
                     <div className="px-1">
                        <p>Balance Due</p>
                        <p className="text-sm text-muted-foreground">{payment.balance_due}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{payment.due_date}</span>
                    </div>
                </div>
            ))}
        </div>
      </Card>
    </div>
  );
}