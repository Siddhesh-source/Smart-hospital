"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Download, Eye, Lock, Shield, FileText, Syringe } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"

const documents = [
  { id: "aadhaar", name: "Aadhaar Card", type: "PDF", size: "2.1 MB", uploaded: "2024-01-15" },
  { id: "pan", name: "PAN Card", type: "PDF", size: "1.8 MB", uploaded: "2024-01-15" },
  { id: "insurance", name: "Health Insurance", type: "PDF", size: "3.2 MB", uploaded: "2024-01-20" },
]

const medications = [
  { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", prescribed: "2024-01-10" },
  { name: "Metformin", dosage: "500mg", frequency: "Twice daily", prescribed: "2024-01-10" },
  { name: "Cetirizine", dosage: "10mg", frequency: "As needed", prescribed: "2024-02-01" },
]

const vaccinations = [
  { name: "COVID-19 Booster", date: "2024-01-15", nextDue: "2024-07-15" },
  { name: "Influenza", date: "2023-10-20", nextDue: "2024-10-20" },
  { name: "Tetanus", date: "2022-05-10", nextDue: "2032-05-10" },
]

export default function HealthWallet() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [password, setPassword] = useState("")
  const { user } = useAuth()

  const handleUnlock = () => {
    if (password === "health123") {
      setIsUnlocked(true)
    } else {
      alert('Incorrect password. Use "health123" for demo.')
    }
  }

  if (!isUnlocked) {
    return (
      <ProtectedRoute>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                <CardTitle>Digital Health Wallet</CardTitle>
                <CardDescription>Enter your password to access your secure health documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter wallet password"
                  />
                </div>
                <Button onClick={handleUnlock} className="w-full bg-teal-600 hover:bg-teal-700">
                  <Lock className="mr-2 h-4 w-4" />
                  Unlock Wallet
                </Button>
                <p className="text-xs text-gray-500 text-center">Demo password: health123</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </ProtectedRoute>
    )
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Digital Health Wallet</h1>
            <p className="text-gray-600">Secure access to your medical documents and information</p>
          </div>
          <Button onClick={() => setIsUnlocked(false)} variant="outline">
            <Lock className="mr-2 h-4 w-4" />
            Lock Wallet
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic health profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-500">Blood Group</Label>
                  <p className="text-lg font-semibold text-red-600">{user?.bloodGroup}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-500">Age</Label>
                  <p className="text-lg font-semibold">{user?.age} years</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Medical Conditions</Label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {user?.medicalConditions.map((condition, index) => (
                    <Badge key={index} variant="outline" className="bg-yellow-50 text-yellow-800">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-500">Emergency Contact</Label>
                <p className="font-medium">{user?.emergencyContact.name}</p>
                <p className="text-sm text-gray-600">{user?.emergencyContact.phone}</p>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Identity Documents</CardTitle>
              <CardDescription>Secure access to your uploaded documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-500">
                          {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Medications */}
          <Card>
            <CardHeader>
              <CardTitle>Current Medications</CardTitle>
              <CardDescription>Your ongoing medication schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {medications.map((med, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{med.name}</h4>
                      <Badge variant="outline">{med.dosage}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{med.frequency}</p>
                    <p className="text-xs text-gray-500">Prescribed: {med.prescribed}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Vaccination History */}
          <Card>
            <CardHeader>
              <CardTitle>Vaccination History</CardTitle>
              <CardDescription>Your immunization records</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {vaccinations.map((vaccine, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <Syringe className="h-6 w-6 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">{vaccine.name}</p>
                        <p className="text-sm text-gray-600">Given: {vaccine.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Next due:</p>
                      <p className="text-sm font-medium">{vaccine.nextDue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Download className="mr-2 h-4 w-4" />
                Download Complete Profile
              </Button>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Share with Doctor
              </Button>
              <Button variant="outline">Generate QR Code</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
