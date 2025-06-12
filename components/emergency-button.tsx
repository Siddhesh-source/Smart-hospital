"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Phone, MapPin, Clock, AlertTriangle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function EmergencyButton() {
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const { user } = useAuth()

  const handleEmergencyClick = () => {
    setShowConfirmation(true)
  }

  const confirmEmergency = () => {
    setShowConfirmation(false)
    setIsEmergencyActive(true)

    // Simulate emergency response
    setTimeout(() => {
      setIsEmergencyActive(false)
    }, 30000) // Auto-close after 30 seconds
  }

  return (
    <>
      <Button
        onClick={handleEmergencyClick}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg animate-pulse"
        size="lg"
      >
        <AlertTriangle className="mr-2 h-6 w-6" />
        EMERGENCY
      </Button>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Emergency Alert</DialogTitle>
            <DialogDescription>
              This will immediately notify the nearest hospital and your emergency contact. Are you sure you want to
              proceed?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEmergency} className="bg-red-600 hover:bg-red-700">
              Confirm Emergency
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emergency Active Dialog */}
      <Dialog open={isEmergencyActive} onOpenChange={setIsEmergencyActive}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600 flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6" />
              Emergency Activated
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">
                Your emergency alert has been sent to City General Hospital and your emergency contact.
              </AlertDescription>
            </Alert>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Nearest Hospital</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  <span>City General Hospital - 1.2 km away</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>+91 9876543210</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Ambulance Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 mr-2 text-gray-500" />
                  <span>ETA: 8-12 minutes</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full w-1/3 animate-pulse"></div>
                </div>
                <p className="text-xs text-gray-600">Ambulance dispatched and en route</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Emergency Contact Notified</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{user?.emergencyContact.name} has been notified via SMS and call.</p>
              </CardContent>
            </Card>

            <Button onClick={() => setIsEmergencyActive(false)} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
