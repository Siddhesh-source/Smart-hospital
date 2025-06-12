"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Clock, ArrowUpDown } from "lucide-react"

// Mock data for hospitals
const hospitalData = [
  {
    id: "h1",
    name: "City General Hospital",
    distance: 1.2,
    address: "123 Main Street, City Center",
    phone: "+91 9876543210",
    beds: {
      total: 120,
      available: 15,
    },
    emergency: true,
    specialties: ["Cardiology", "Neurology", "Orthopedics"],
    openHours: "24/7",
  },
  {
    id: "h2",
    name: "Metro Medical Center",
    distance: 2.5,
    address: "456 Park Avenue, Downtown",
    phone: "+91 9876543211",
    beds: {
      total: 200,
      available: 32,
    },
    emergency: true,
    specialties: ["Pediatrics", "Obstetrics", "Surgery"],
    openHours: "24/7",
  },
  {
    id: "h3",
    name: "Health First Clinic",
    distance: 0.8,
    address: "789 Garden Road, Suburb",
    phone: "+91 9876543212",
    beds: {
      total: 50,
      available: 8,
    },
    emergency: false,
    specialties: ["General Medicine", "Dermatology"],
    openHours: "8:00 AM - 8:00 PM",
  },
  {
    id: "h4",
    name: "Community Care Hospital",
    distance: 3.7,
    address: "101 River View, East Side",
    phone: "+91 9876543213",
    beds: {
      total: 80,
      available: 0,
    },
    emergency: true,
    specialties: ["Cardiology", "Pulmonology", "Geriatrics"],
    openHours: "24/7",
  },
  {
    id: "h5",
    name: "Wellness Medical Center",
    distance: 4.2,
    address: "202 Hill Top, North District",
    phone: "+91 9876543214",
    beds: {
      total: 150,
      available: 25,
    },
    emergency: true,
    specialties: ["Oncology", "Radiology", "Pathology"],
    openHours: "24/7",
  },
]

export default function NearbyHospitals() {
  const [hospitals, setHospitals] = useState(hospitalData)
  const [sortBy, setSortBy] = useState<"distance" | "availability">("distance")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSort = (criteria: "distance" | "availability") => {
    setSortBy(criteria)
    const sorted = [...hospitals].sort((a, b) => {
      if (criteria === "distance") {
        return a.distance - b.distance
      } else {
        return b.beds.available - a.beds.available
      }
    })
    setHospitals(sorted)
  }

  const filteredHospitals = hospitals.filter(
    (hospital) =>
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.specialties.some((specialty) => specialty.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nearby Hospitals</h1>
        <p className="text-gray-600">Find hospitals near you with real-time bed availability</p>
      </div>

      {/* Search and Filter Controls */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search hospitals or specialties..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Select value={sortBy} onValueChange={(value: "distance" | "availability") => handleSort(value)}>
            <SelectTrigger className="w-48">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="availability">Bed Availability</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Map Placeholder */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive Map Integration</p>
              <p className="text-sm text-gray-400">Map showing hospital locations would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hospital List */}
      <div className="space-y-4">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{hospital.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    {hospital.distance} km away • {hospital.address}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div
                    className={`text-lg font-bold ${
                      hospital.beds.available > 10
                        ? "text-green-600"
                        : hospital.beds.available > 0
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {hospital.beds.available} beds
                  </div>
                  <div className="text-sm text-gray-500">of {hospital.beds.total} total</div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <Phone className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">{hospital.phone}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 mr-2 text-gray-400" />
                    <span className="text-sm">{hospital.openHours}</span>
                  </div>
                  {hospital.emergency && <Badge className="bg-red-100 text-red-800">Emergency Services</Badge>}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-1">
                    {hospital.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  Directions
                </Button>
                <Button variant="outline" size="sm">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
              </div>
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <Link href="/appointments/book">Book Appointment</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No hospitals found matching your search criteria</p>
          <Button onClick={() => setSearchTerm("")} variant="outline">
            Clear Search
          </Button>
        </div>
      )}
    </div>
  )
}
