"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Search, Calendar, User, FileText } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"

interface TreatmentRecord {
  id: string
  date: string
  hospital: string
  doctor: string
  specialty: string
  diagnosis: string
  prescription: string[]
  notes: string
  status: "Completed" | "Follow-up Required" | "Ongoing"
}

const treatmentHistory: TreatmentRecord[] = [
  {
    id: "tr1",
    date: "2024-05-15",
    hospital: "City General Hospital",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    diagnosis: "Hypertension Management",
    prescription: ["Lisinopril 10mg", "Lifestyle modifications"],
    notes: "Blood pressure well controlled. Continue current medication.",
    status: "Completed",
  },
  {
    id: "tr2",
    date: "2024-04-22",
    hospital: "Metro Medical Center",
    doctor: "Dr. Robert Smith",
    specialty: "Dermatology",
    diagnosis: "Allergic Dermatitis",
    prescription: ["Cetirizine 10mg", "Topical corticosteroid"],
    notes: "Skin condition improved. Avoid known allergens.",
    status: "Follow-up Required",
  },
  {
    id: "tr3",
    date: "2024-03-10",
    hospital: "Health First Clinic",
    doctor: "Dr. Michael Chen",
    specialty: "General Medicine",
    diagnosis: "Annual Health Checkup",
    prescription: ["Multivitamin", "Regular exercise"],
    notes: "Overall health good. Recommended annual follow-up.",
    status: "Completed",
  },
  {
    id: "tr4",
    date: "2024-02-05",
    hospital: "City General Hospital",
    doctor: "Dr. Emily Wilson",
    specialty: "Orthopedics",
    diagnosis: "Lower Back Pain",
    prescription: ["Ibuprofen 400mg", "Physical therapy"],
    notes: "Muscle strain. Physical therapy sessions ongoing.",
    status: "Ongoing",
  },
]

export default function TreatmentHistory() {
  const [records, setRecords] = useState(treatmentHistory)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [filterSpecialty, setFilterSpecialty] = useState<string>("all")

  const specialties = [...new Set(treatmentHistory.map((record) => record.specialty))]

  const filteredRecords = records.filter((record) => {
    const matchesSearch =
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.hospital.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || record.status === filterStatus
    const matchesSpecialty = filterSpecialty === "all" || record.specialty === filterSpecialty

    return matchesSearch && matchesStatus && matchesSpecialty
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800"
      case "Follow-up Required":
        return "bg-yellow-100 text-yellow-800"
      case "Ongoing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Treatment & Prescription History</h1>
            <p className="text-gray-600">Complete timeline of your medical treatments and prescriptions</p>
          </div>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Filter Records</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search diagnosis, doctor, or hospital..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Follow-up Required">Follow-up Required</SelectItem>
                  <SelectItem value="Ongoing">Ongoing</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterSpecialty} onValueChange={setFilterSpecialty}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Treatment Timeline */}
        <div className="space-y-4">
          {filteredRecords.map((record, index) => (
            <Card key={record.id} className="relative">
              {/* Timeline connector */}
              {index < filteredRecords.length - 1 && (
                <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200 z-0"></div>
              )}

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    {/* Timeline dot */}
                    <div className="w-3 h-3 bg-teal-600 rounded-full mt-2 z-10 relative"></div>

                    <div>
                      <CardTitle className="text-lg">{record.diagnosis}</CardTitle>
                      <CardDescription className="flex items-center space-x-4 mt-1">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(record.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                        <span className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {record.doctor} - {record.specialty}
                        </span>
                      </CardDescription>
                    </div>
                  </div>

                  <Badge className={getStatusColor(record.status)}>{record.status}</Badge>
                </div>
              </CardHeader>

              <CardContent className="ml-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Hospital</h4>
                    <p className="text-sm text-gray-600 mb-4">{record.hospital}</p>

                    <h4 className="font-medium text-sm text-gray-700 mb-2">Prescription</h4>
                    <ul className="space-y-1">
                      {record.prescription.map((med, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center">
                          <span className="w-2 h-2 bg-teal-600 rounded-full mr-2"></span>
                          {med}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Doctor's Notes</h4>
                    <p className="text-sm text-gray-600 mb-4">{record.notes}</p>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        View Report
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No treatment records found matching your criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setFilterStatus("all")
                setFilterSpecialty("all")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Summary Statistics */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Treatment Summary</CardTitle>
            <CardDescription>Overview of your medical history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">{treatmentHistory.length}</div>
                <p className="text-sm text-gray-600">Total Visits</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {treatmentHistory.filter((r) => r.status === "Completed").length}
                </div>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {treatmentHistory.filter((r) => r.status === "Ongoing").length}
                </div>
                <p className="text-sm text-gray-600">Ongoing</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {treatmentHistory.filter((r) => r.status === "Follow-up Required").length}
                </div>
                <p className="text-sm text-gray-600">Follow-up Required</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
