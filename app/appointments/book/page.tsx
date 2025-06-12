"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"

// Mock data for hospitals
const hospitals = [
  { id: "h1", name: "City General Hospital" },
  { id: "h2", name: "Metro Medical Center" },
  { id: "h3", name: "Health First Clinic" },
  { id: "h4", name: "Community Care Hospital" },
  { id: "h5", name: "Wellness Medical Center" },
]

// Mock data for time slots
const timeSlots = [
  { id: "t1", time: "09:00 AM" },
  { id: "t2", time: "09:30 AM" },
  { id: "t3", time: "10:00 AM" },
  { id: "t4", time: "10:30 AM" },
  { id: "t5", time: "11:00 AM" },
  { id: "t6", time: "11:30 AM" },
  { id: "t7", time: "12:00 PM" },
  { id: "t8", time: "02:00 PM" },
  { id: "t9", time: "02:30 PM" },
  { id: "t10", time: "03:00 PM" },
  { id: "t11", time: "03:30 PM" },
  { id: "t12", time: "04:00 PM" },
  { id: "t13", time: "04:30 PM" },
  { id: "t14", time: "05:00 PM" },
]

// Mock data for departments
const departments = [
  { id: "d1", name: "General Medicine" },
  { id: "d2", name: "Cardiology" },
  { id: "d3", name: "Orthopedics" },
  { id: "d4", name: "Pediatrics" },
  { id: "d5", name: "Dermatology" },
  { id: "d6", name: "ENT" },
  { id: "d7", name: "Ophthalmology" },
  { id: "d8", name: "Neurology" },
]

export default function BookAppointment() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [hospital, setHospital] = useState<string>("")
  const [department, setDepartment] = useState<string>("")
  const [timeSlot, setTimeSlot] = useState<string>("")
  const [step, setStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Confirmed</CardTitle>
              <CardDescription>Your appointment has been successfully booked</CardDescription>
            </CardHeader>
            <CardContent className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Appointment Details</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Hospital:</span> {hospitals.find((h) => h.id === hospital)?.name}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Department:</span> {departments.find((d) => d.id === department)?.name}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Date:</span> {date ? format(date, "PPP") : ""}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Time:</span> {timeSlots.find((t) => t.id === timeSlot)?.time}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild variant="outline">
                <Link href="/dashboard">Back to Dashboard</Link>
              </Button>
              <Button asChild className="bg-teal-600 hover:bg-teal-700">
                <Link href="/appointments/book">Book Another</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book an Appointment</h1>
          <p className="text-gray-600">Schedule your visit with our healthcare professionals</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Appointment Details</CardTitle>
            <CardDescription>Please select your preferred hospital, date, and time</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Hospital</label>
                    <Select value={hospital} onValueChange={setHospital}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a hospital" />
                      </SelectTrigger>
                      <SelectContent>
                        {hospitals.map((hospital) => (
                          <SelectItem key={hospital.id} value={hospital.id}>
                            {hospital.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Department</label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="button"
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    onClick={() => setStep(2)}
                    disabled={!hospital || !department}
                  >
                    Continue
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => {
                            // Disable past dates and weekends
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            const day = date.getDay()
                            return date < today || day === 0 || day === 6
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Select Time Slot</label>
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a time slot" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot.id} value={slot.id}>
                            <div className="flex items-center">
                              <Clock className="mr-2 h-4 w-4" />
                              {slot.time}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-teal-600 hover:bg-teal-700"
                      disabled={!date || !timeSlot}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
