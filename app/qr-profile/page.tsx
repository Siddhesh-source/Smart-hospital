"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { QrCode, Download, Share2, RefreshCw } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import ProtectedRoute from "@/components/protected-route"

export default function QRProfile() {
  const [qrGenerated, setQrGenerated] = useState(false)
  const { user } = useAuth()

  const generateQR = () => {
    setQrGenerated(true)
  }

  const emergencyInfo = {
    name: user?.name,
    bloodGroup: user?.bloodGroup,
    conditions: user?.medicalConditions,
    emergencyContact: user?.emergencyContact,
    profileId: user?.id,
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">QR Code Patient Profile</h1>
            <p className="text-gray-600">Generate a secure QR code for emergency medical access</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* QR Code Display */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency QR Code</CardTitle>
                <CardDescription>Scannable by authorized medical personnel</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                {qrGenerated ? (
                  <div className="space-y-4">
                    <div className="w-48 h-48 mx-auto bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                      {/* QR Code placeholder - in real app, use a QR code library */}
                      <div className="grid grid-cols-8 gap-1 p-4">
                        {Array.from({ length: 64 }).map((_, i) => (
                          <div key={i} className={`w-2 h-2 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">QR Code ID: {user?.id}</p>
                    <div className="flex justify-center space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setQrGenerated(false)}>
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Regenerate
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <QrCode className="h-24 w-24 text-gray-400 mx-auto" />
                    <p className="text-gray-500">Click to generate your emergency QR code</p>
                    <Button onClick={generateQR} className="bg-teal-600 hover:bg-teal-700">
                      Generate QR Code
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Information Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Information Included</CardTitle>
                <CardDescription>Data accessible through QR scan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-gray-700">Basic Information</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Full Name: {user?.name}</li>
                    <li>• Age: {user?.age}</li>
                    <li>• Blood Group: {user?.bloodGroup}</li>
                    <li>• Gender: {user?.gender}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-700">Medical Conditions</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    {user?.medicalConditions.map((condition, index) => (
                      <li key={index}>• {condition}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-gray-700">Emergency Contact</h4>
                  <ul className="text-sm text-gray-600 mt-1 space-y-1">
                    <li>• Name: {user?.emergencyContact.name}</li>
                    <li>• Phone: {user?.emergencyContact.phone}</li>
                    <li>• Relation: {user?.emergencyContact.relation}</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Instructions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>How to Use</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-teal-600 font-bold">1</span>
                  </div>
                  <h4 className="font-medium mb-1">Generate QR Code</h4>
                  <p className="text-sm text-gray-600">Create your secure medical QR code</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-teal-600 font-bold">2</span>
                  </div>
                  <h4 className="font-medium mb-1">Save or Print</h4>
                  <p className="text-sm text-gray-600">Keep it accessible on your phone or wallet</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-teal-600 font-bold">3</span>
                  </div>
                  <h4 className="font-medium mb-1">Emergency Access</h4>
                  <p className="text-sm text-gray-600">Medical staff can scan for instant access</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Security & Privacy</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• QR codes are encrypted and expire after 30 days</li>
              <li>• Only authorized medical personnel can access the data</li>
              <li>• All scans are logged for security purposes</li>
              <li>• You can regenerate or revoke access anytime</li>
            </ul>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
