"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Mic, MicOff, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

const initialMessages: Message[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI Health Assistant. I can help you with symptom assessment, medication reminders, and general health questions. How can I assist you today?",
    sender: "bot",
    timestamp: new Date(),
  },
]

const sampleResponses = [
  "Based on your symptoms, I recommend consulting with a healthcare professional. Would you like me to help you book an appointment?",
  "It's important to stay hydrated and get adequate rest. If symptoms persist, please consider visiting a doctor.",
  "I understand your concern. Let me ask you a few more questions to better assess your situation.",
  "For medication reminders, I can help you set up a schedule. What medications do you need reminders for?",
  "Your symptoms could indicate several conditions. I recommend getting a proper medical examination for an accurate diagnosis.",
  "That's a great question about preventive care. Regular check-ups are important for maintaining good health.",
]

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleVoiceInput = () => {
    setIsListening(!isListening)
    // In a real app, this would integrate with speech recognition API
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false)
        setInputMessage("I have been experiencing headaches for the past few days")
      }, 3000)
    }
  }

  const quickQuestions = [
    "I have a headache",
    "What are the symptoms of flu?",
    "How to reduce fever?",
    "Book an appointment",
    "Medication reminder",
    "Emergency contacts",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Health Assistant</h1>
          <p className="text-gray-600">
            Get instant health advice and symptom assessment from our AI-powered assistant
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Chat Interface */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="h-6 w-6 mr-2 text-teal-600" />
                AI Health Assistant
              </CardTitle>
              <CardDescription>Ask me about your symptoms or health questions</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96 pr-4" ref={scrollAreaRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div className={`flex-shrink-0 ${message.sender === "user" ? "ml-2" : "mr-2"}`}>
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              message.sender === "user" ? "bg-teal-600 text-white" : "bg-gray-200 text-gray-600"
                            }`}
                          >
                            {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                          </div>
                        </div>
                        <div
                          className={`rounded-lg px-4 py-2 ${
                            message.sender === "user" ? "bg-teal-600 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-1 ${message.sender === "user" ? "text-teal-100" : "text-gray-500"}`}
                          >
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex mr-2">
                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <Bot className="h-4 w-4 text-gray-600" />
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-lg px-4 py-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <div className="flex w-full space-x-2">
                <Input
                  ref={inputRef}
                  placeholder="Type your message here..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button
                  onClick={toggleVoiceInput}
                  variant="outline"
                  size="icon"
                  className={isListening ? "bg-red-100 text-red-600" : ""}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button onClick={handleSendMessage} className="bg-teal-600 hover:bg-teal-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>

          {/* Quick Actions Sidebar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Questions</CardTitle>
              <CardDescription>Click on common questions to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto py-2 px-3"
                    onClick={() => setInputMessage(question)}
                  >
                    <span className="text-sm">{question}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">How to Use the AI Assistant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Bot className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-medium mb-1">Describe Symptoms</h3>
                <p className="text-sm text-gray-600">Tell me about your symptoms in detail for better assessment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Mic className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-medium mb-1">Voice Input</h3>
                <p className="text-sm text-gray-600">Use voice input for hands-free interaction with the assistant</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Send className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-medium mb-1">Get Advice</h3>
                <p className="text-sm text-gray-600">Receive instant health advice and recommendations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Disclaimer:</strong> This AI assistant provides general health information and should not replace
            professional medical advice. For serious symptoms or emergencies, please contact your healthcare provider or
            emergency services immediately.
          </p>
        </div>
      </div>
    </div>
  )
}
