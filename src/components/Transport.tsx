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


export function Transport() {
  const [student_id, setStudent_id] = useState("");
  const [transportDetails, setTransportDetails] = useState();

//   const baseURL = 'https://eduvista-backend-render.onrender.com';
  const baseURL = "http://127.0.0.1:8000/";

//   useEffect(() => {
    
//     fetchPayments();
//   }, []);
  async function fetchDetails() {
    try{
        const res = await fetch(`${baseURL}/api/student/${student_id}/transport/`);
        const data = await res.json();
        if(data.error){
            setTransportDetails(data.error);
            console.error("Error:", data.error);
            return;
        }
        console.log("Transport Details:", data);
        setTransportDetails(data);
    }
    catch(error){
        console.error("Error fetching transport details:", error);
    }
}

  const handleSubmit = (e) => {
    e.preventDefault();
    if(student_id){
        fetchDetails();
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
          <h3>Transport Details</h3>
        </div>
        <div className="space-y-3">
            <div className="flex space-x-2 mb-4">
                <input type="text" className="bg-switch-background rounded-md p-1 px-2" placeholder="Student ID" onChange={(e) => setStudent_id(e.target.value)} />
                <Button variant="outline" onClick={handleSubmit}><Search /></Button>
            </div>
            {!transportDetails.stop_name && <p>Student didn't opt for school transport.</p>}
            {transportDetails.stop_name && 
            <div className="flex flex-wrap items-center justify-evenly gap-2 p-3 bg-blue-50 rounded-lg">
                <div className="px-1">
                    <p>Stop Name</p>
                    <p className="text-sm text-muted-foreground">{transportDetails.stop_name}</p>
                </div>
                <div className="px-1">
                    <p>Route Name</p>
                    <p className="text-sm text-muted-foreground">{transportDetails.route_name}</p>
                </div>
                <div className="px-1">
                    <p>Bus Number</p>
                    <p className="text-sm text-muted-foreground">{transportDetails.bus_number}</p>
                </div>
                <div className="px-1">
                    <p>Driver Name</p>
                    <p className="text-sm text-muted-foreground">{transportDetails.driver_name}</p>
                </div>
                <div className="px-1">
                    <p>Driver Ph. No.</p>
                    <p className="text-sm text-muted-foreground">{transportDetails.driver_contact}</p>
                </div>
            </div>}
        </div>
      </Card>
    </div>
  );
}