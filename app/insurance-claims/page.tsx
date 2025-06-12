"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Download, Plus, Clock, CheckCircle, XCircle } from "lucide-react"
import ProtectedRoute from "@/components/protected-route"

interface InsuranceClaim {
  id: string
  claimNumber: string
  date: string
  hospital: string
  treatment: string
  amount: number
  status: "Pending" | "Approved" | "Rejected" | "Under Review"
  documents: string[]
  estimatedProcessingDays: number
  approvedAmount?: number
  rejectionReason?: string
}

const mockClaims: InsuranceClaim[] = [
  {
    id: "cl1",
    claimNumber: "CLM-2024-001",
    date: "2024-05-15",
    hospital: "City General Hospital",
    treatment: "Cardiology Consultation",
    amount: 2500,
    status: "Approved",
    documents: ["Medical Report", "Bills", "Prescription"],
    estimatedProcessingDays: 7,
    approvedAmount: 2200,
  },
  {
    id: "cl2",
    claimNumber: "CLM-2024-002",
    date: "2024-04-22",
    hospital: "Metro Medical Center",
    treatment: "Dermatology Treatment",
    amount: 1800,
    status: "Under Review",
    documents: ["Medical Report", "Bills"],
    estimatedProcessingDays: 10,
  },
  {
    id: "cl3",
    claimNumber: "CLM-2024-003",
    date: "2024-03-10",
    hospital: "Health First Clinic",
    treatment: "Annual Health Checkup",
    amount: 1200,
    status: "Rejected",
    documents: ["Medical Report", "Bills"],
    estimatedProcessingDays: 5,
    rejectionReason: "Pre-existing condition not covered",
  },
]

export default function InsuranceClaims() {
  const [claims, setClaims] = useState(mockClaims)
  const [showNewClaim, setShowNewClaim] = useState(false)
  const [newClaim, setNewClaim] = useState({
    hospital: "",
    treatment: "",
    amount: "",
    documents: [] as File[],
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      case "Under Review":
        return "bg-blue-100 text-blue-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "Rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Under Review":
        return <Clock className="h-4 w-4 text-blue-600" />
      case "Pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewClaim({
        ...newClaim,
        documents: [...newClaim.documents, ...Array.from(e.target.files)],
      })
    }
  }

  const handleSubmitClaim = () => {
    const claim: InsuranceClaim = {
      id: Date.now().toString(),
      claimNumber: `CLM-2024-${String(claims.length + 1).padStart(3, "0")}`,
      date: new Date().toISOString().split("T")[0],
      hospital: newClaim.hospital,
      treatment: newClaim.treatment,
      amount: Number.parseFloat(newClaim.amount),
      status: "Pending",
      documents: newClaim.documents.map((file) => file.name),
      estimatedProcessingDays: 7,
    }

    setClaims([claim, ...claims])
    setNewClaim({ hospital: "", treatment: "", amount: "", documents: [] })
    setShowNewClaim(false)
  }

  const totalClaimed = claims.reduce((sum, claim) => sum + claim.amount, 0)
  const totalApproved = claims
    .filter((claim) => claim.status === "Approved")
    .reduce((sum, claim) => sum + (claim.approvedAmount || 0), 0)

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Insurance Claims</h1>
            <p className="text-gray-600">Track and manage your insurance claim status</p>
          </div>
          <Dialog open={showNewClaim} onOpenChange={setShowNewClaim}>
            <DialogTrigger asChild>
              <Button className="bg-teal-600 hover:bg-teal-700">
                <Plus className="mr-2 h-4 w-4" />
                New Claim
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Submit New Claim</DialogTitle>
                <DialogDescription>Upload your medical documents and claim details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="hospital">Hospital/Clinic</Label>
                  <Input
                    id="hospital"
                    value={newClaim.hospital}
                    onChange={(e) => setNewClaim({ ...newClaim, hospital: e.target.value })}
                    placeholder="Enter hospital name"
                  />
                </div>
                <div>
                  <Label htmlFor="treatment">Treatment/Service</Label>
                  <Input
                    id="treatment"
                    value={newClaim.treatment}
                    onChange={(e) => setNewClaim({ ...newClaim, treatment: e.target.value })}
                    placeholder="Enter treatment details"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Claim Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={newClaim.amount}
                    onChange={(e) => setNewClaim({ ...newClaim, amount: e.target.value })}
                    placeholder="Enter claim amount"
                  />
                </div>
                <div>
                  <Label htmlFor="documents">Upload Documents</Label>
                  <Input
                    id="documents"
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileUpload}
                  />
                  {newClaim.documents.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">{newClaim.documents.length} file(s) selected</p>
                    </div>
                  )}
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowNewClaim(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmitClaim}
                    disabled={!newClaim.hospital || !newClaim.treatment || !newClaim.amount}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Submit Claim
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{claims.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Claimed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{totalClaimed.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">₹{totalApproved.toLocaleString()}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {claims.length > 0
                  ? Math.round((claims.filter((c) => c.status === "Approved").length / claims.length) * 100)
                  : 0}
                %
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Claims List */}
        <div className="space-y-4">
          {claims.map((claim) => (
            <Card key={claim.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{claim.treatment}</CardTitle>
                    <CardDescription>
                      Claim #{claim.claimNumber} • {claim.hospital} • {new Date(claim.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(claim.status)}
                    <Badge className={getStatusColor(claim.status)}>{claim.status}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Claim Amount:</span>
                        <span className="font-medium">₹{claim.amount.toLocaleString()}</span>
                      </div>
                      {claim.approvedAmount && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Approved Amount:</span>
                          <span className="font-medium text-green-600">₹{claim.approvedAmount.toLocaleString()}</span>
                        </div>
                      )}
                      {claim.rejectionReason && (
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Rejection Reason:</span>
                          <span className="text-sm text-red-600">{claim.rejectionReason}</span>
                        </div>
                      )}
                    </div>

                    {claim.status === "Under Review" && (
                      <div className="mt-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Processing Progress</span>
                          <span>Day 3 of {claim.estimatedProcessingDays}</span>
                        </div>
                        <Progress value={(3 / claim.estimatedProcessingDays) * 100} className="h-2" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Documents Submitted</h4>
                    <div className="space-y-1">
                      {claim.documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-gray-400" />
                            {doc}
                          </span>
                          <Button size="sm" variant="ghost">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Upload className="h-4 w-4 mr-1" />
                        Add Documents
                      </Button>
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {claims.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No insurance claims found</p>
            <Button onClick={() => setShowNewClaim(true)} className="bg-teal-600 hover:bg-teal-700">
              Submit Your First Claim
            </Button>
          </div>
        )}

        {/* AI Assistance Card */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">AI Claim Assistant</CardTitle>
            <CardDescription className="text-blue-700">
              Get help with your insurance claims using our AI assistant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-blue-800 mb-2">
                  Our AI can help you understand claim requirements, estimate approval chances, and guide you through
                  the process.
                </p>
              </div>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                Chat with AI Assistant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}
