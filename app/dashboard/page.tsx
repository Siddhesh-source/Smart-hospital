"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import EmergencyButton from "@/components/emergency-button"
import ProtectedRoute from "@/components/protected-route"
import { useAuth } from "@/contexts/auth-context"

// Mock data for the dashboard
const patientInfo = {
  name: "John Doe",
  age: 35,
  gender: "Male",
  bloodGroup: "O+",
  medicalConditions: ["Hypertension", "Allergies"],
  emergencyContact: {
    name: "Jane Doe",
    phone: "+91 9876543210",
    relation: "Spouse",
  },
}

const upcomingAppointments = [
  {
    id: "apt1",
    hospital: "City General Hospital",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    date: "2025-06-15",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    id: "apt2",
    hospital: "Metro Medical Center",
    doctor: "Dr. Robert Smith",
    specialty: "Dermatology",
    date: "2025-06-22",
    time: "2:15 PM",
    status: "Pending",
  },
]

const pastAppointments = [
  {
    id: "apt3",
    hospital: "City General Hospital",
    doctor: "Dr. Michael Chen",
    specialty: "General Medicine",
    date: "2025-05-10",
    time: "11:00 AM",
    status: "Completed",
  },
  {
    id: "apt4",
    hospital: "Health First Clinic",
    doctor: "Dr. Emily Wilson",
    specialty: "Orthopedics",
    date: "2025-04-22",
    time: "9:45 AM",
    status: "Completed",
  },
  {
    id: "apt5",
    hospital: "Metro Medical Center",
    doctor: "Dr. James Brown",
    specialty: "ENT",
    date: "2025-03-15",
    time: "3:30 PM",
    status: "Cancelled",
  },
]

export default function Dashboard() {
  const { user } = useAuth()

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-gray-600">Manage your appointments and health information</p>
          </div>
          <div className="flex gap-4">
            <EmergencyButton />
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="/appointments/book">Book Appointment</Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Information Card - keep existing */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Your personal and medical details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-teal-600">
                        {patientInfo.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="text-gray-900">{patientInfo.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Age</h3>
                    <p className="text-gray-900">{patientInfo.age} years</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Gender</h3>
                    <p className="text-gray-900">{patientInfo.gender}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Blood Group</h3>
                  <p className="text-gray-900">{patientInfo.bloodGroup}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Medical Conditions</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {patientInfo.medicalConditions.map((condition, index) => (
                      <Badge key={index} variant="outline">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Emergency Contact</h3>
                  <p className="text-gray-900">{patientInfo.emergencyContact.name}</p>
                  <p className="text-gray-900">{patientInfo.emergencyContact.phone}</p>
                  <p className="text-gray-600 text-sm">{patientInfo.emergencyContact.relation}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Edit Information
              </Button>
            </CardFooter>
          </Card>

          {/* New Features Grid */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Access Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Health Wallet</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-blue-100 mb-3">Secure access to documents</p>
                  <Button asChild variant="secondary" size="sm" className="w-full">
                    <Link href="/health-wallet">Open Wallet</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500 to-green-700 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">QR Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-green-100 mb-3">Emergency medical access</p>
                  <Button asChild variant="secondary" size="sm" className="w-full">
                    <Link href="/qr-profile">Generate QR</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-sm">Health Journal</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-purple-100 mb-3">Track symptoms & vitals</p>
                  <Button asChild variant="secondary" size="sm" className="w-full">
                    <Link href="/health-journal">Open Journal</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Existing appointments section - keep as is */}
            <Card>
              <CardHeader>
                <CardTitle>Your Appointments</CardTitle>
                <CardDescription>View and manage your hospital appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming">
                  <TabsList className="mb-4">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="past">Past</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upcoming">
                    {upcomingAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {upcomingAppointments.map((appointment) => (
                          <div key={appointment.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{appointment.hospital}</h3>
                                <p className="text-sm text-gray-600">
                                  {appointment.doctor} - {appointment.specialty}
                                </p>
                              </div>
                              <Badge
                                className={
                                  appointment.status === "Confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span>
                                {new Date(appointment.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}{" "}
                                at {appointment.time}
                              </span>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <Button variant="outline" size="sm">
                                Reschedule
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-4">You have no upcoming appointments</p>
                        <Button asChild className="bg-teal-600 hover:bg-teal-700">
                          <Link href="/appointments/book">Book an Appointment</Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="past">
                    {pastAppointments.length > 0 ? (
                      <div className="space-y-4">
                        {pastAppointments.map((appointment) => (
                          <div key={appointment.id} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{appointment.hospital}</h3>
                                <p className="text-sm text-gray-600">
                                  {appointment.doctor} - {appointment.specialty}
                                </p>
                              </div>
                              <Badge
                                className={
                                  appointment.status === "Completed"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                                }
                              >
                                {appointment.status}
                              </Badge>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span>
                                {new Date(appointment.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}{" "}
                                at {appointment.time}
                              </span>
                            </div>
                            {appointment.status === "Completed" && (
                              <div className="mt-4">
                                <Button variant="outline" size="sm">
                                  View Report
                                </Button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No past appointments found</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Additional Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Treatment History</CardTitle>
                  <CardDescription>View your medical timeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/treatment-history">View History</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Insurance Claims</CardTitle>
                  <CardDescription>Track claim status</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href="/insurance-claims">View Claims</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
