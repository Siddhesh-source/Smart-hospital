"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Plus, TrendingUp, Heart, Thermometer } from "lucide-react"
import { format } from "date-fns"
import ProtectedRoute from "@/components/protected-route"

interface JournalEntry {
  id: string
  date: Date
  symptoms: string[]
  mood: string
  bloodPressure: { systolic: number; diastolic: number } | null
  bloodSugar: number | null
  temperature: number | null
  notes: string
}

const mockEntries: JournalEntry[] = [
  {
    id: "1",
    date: new Date("2024-06-10"),
    symptoms: ["Headache", "Fatigue"],
    mood: "Fair",
    bloodPressure: { systolic: 130, diastolic: 85 },
    bloodSugar: 95,
    temperature: 98.6,
    notes: "Feeling tired after long work day",
  },
  {
    id: "2",
    date: new Date("2024-06-09"),
    symptoms: ["Mild cough"],
    mood: "Good",
    bloodPressure: { systolic: 125, diastolic: 80 },
    bloodSugar: 88,
    temperature: 98.4,
    notes: "Overall feeling better today",
  },
]

export default function HealthJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>(mockEntries)
  const [showAddEntry, setShowAddEntry] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [newEntry, setNewEntry] = useState({
    symptoms: "",
    mood: "",
    bloodPressure: { systolic: "", diastolic: "" },
    bloodSugar: "",
    temperature: "",
    notes: "",
  })

  const handleAddEntry = () => {
    if (!selectedDate) return

    const entry: JournalEntry = {
      id: Date.now().toString(),
      date: selectedDate,
      symptoms: newEntry.symptoms
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
      mood: newEntry.mood,
      bloodPressure:
        newEntry.bloodPressure.systolic && newEntry.bloodPressure.diastolic
          ? {
              systolic: Number.parseInt(newEntry.bloodPressure.systolic),
              diastolic: Number.parseInt(newEntry.bloodPressure.diastolic),
            }
          : null,
      bloodSugar: newEntry.bloodSugar ? Number.parseFloat(newEntry.bloodSugar) : null,
      temperature: newEntry.temperature ? Number.parseFloat(newEntry.temperature) : null,
      notes: newEntry.notes,
    }

    setEntries([entry, ...entries])
    setNewEntry({
      symptoms: "",
      mood: "",
      bloodPressure: { systolic: "", diastolic: "" },
      bloodSugar: "",
      temperature: "",
      notes: "",
    })
    setShowAddEntry(false)
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Health Journal</h1>
            <p className="text-gray-600">Track your daily symptoms, vitals, and overall health</p>
          </div>
          <Button onClick={() => setShowAddEntry(!showAddEntry)} className="bg-teal-600 hover:bg-teal-700">
            <Plus className="mr-2 h-4 w-4" />
            Add Entry
          </Button>
        </div>

        {/* Add New Entry Form */}
        {showAddEntry && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>New Health Entry</CardTitle>
              <CardDescription>Record your daily health information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <Label htmlFor="mood">Mood</Label>
                  <Select value={newEntry.mood} onValueChange={(value) => setNewEntry({ ...newEntry, mood: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select mood" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Excellent">Excellent</SelectItem>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="symptoms">Symptoms (comma-separated)</Label>
                <Input
                  id="symptoms"
                  value={newEntry.symptoms}
                  onChange={(e) => setNewEntry({ ...newEntry, symptoms: e.target.value })}
                  placeholder="e.g., Headache, Fatigue, Nausea"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Blood Pressure</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Systolic"
                      value={newEntry.bloodPressure.systolic}
                      onChange={(e) =>
                        setNewEntry({
                          ...newEntry,
                          bloodPressure: { ...newEntry.bloodPressure, systolic: e.target.value },
                        })
                      }
                    />
                    <Input
                      placeholder="Diastolic"
                      value={newEntry.bloodPressure.diastolic}
                      onChange={(e) =>
                        setNewEntry({
                          ...newEntry,
                          bloodPressure: { ...newEntry.bloodPressure, diastolic: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bloodSugar">Blood Sugar (mg/dL)</Label>
                  <Input
                    id="bloodSugar"
                    type="number"
                    value={newEntry.bloodSugar}
                    onChange={(e) => setNewEntry({ ...newEntry, bloodSugar: e.target.value })}
                    placeholder="95"
                  />
                </div>

                <div>
                  <Label htmlFor="temperature">Temperature (°F)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    step="0.1"
                    value={newEntry.temperature}
                    onChange={(e) => setNewEntry({ ...newEntry, temperature: e.target.value })}
                    placeholder="98.6"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  placeholder="Additional notes about your health today..."
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddEntry(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEntry} className="bg-teal-600 hover:bg-teal-700">
                  Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Health Trends */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Blood Pressure</CardTitle>
              <Heart className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">128/82</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                +2% from last week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Blood Sugar</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91 mg/dL</div>
              <p className="text-xs text-muted-foreground">Normal range</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.5°F</div>
              <p className="text-xs text-muted-foreground">Normal</p>
            </CardContent>
          </Card>
        </div>

        {/* Journal Entries */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recent Entries</h2>
          {entries.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{format(entry.date, "EEEE, MMMM d, yyyy")}</CardTitle>
                    <CardDescription>Mood: {entry.mood}</CardDescription>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {entry.symptoms.map((symptom, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {symptom}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  {entry.bloodPressure && (
                    <div>
                      <Label className="text-xs text-gray-500">Blood Pressure</Label>
                      <p className="font-medium">
                        {entry.bloodPressure.systolic}/{entry.bloodPressure.diastolic}
                      </p>
                    </div>
                  )}
                  {entry.bloodSugar && (
                    <div>
                      <Label className="text-xs text-gray-500">Blood Sugar</Label>
                      <p className="font-medium">{entry.bloodSugar} mg/dL</p>
                    </div>
                  )}
                  {entry.temperature && (
                    <div>
                      <Label className="text-xs text-gray-500">Temperature</Label>
                      <p className="font-medium">{entry.temperature}°F</p>
                    </div>
                  )}
                </div>
                {entry.notes && (
                  <div>
                    <Label className="text-xs text-gray-500">Notes</Label>
                    <p className="text-sm mt-1">{entry.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}
