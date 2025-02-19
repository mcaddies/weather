"use client"

import { useState } from "react"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import WeatherTable from "@/components/WeatherTable"

export default function Home() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setDateRange([startDate, endDate])
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <Header />
      <SearchBar onDateRangeChange={handleDateRangeChange} />
      <WeatherTable startDate={dateRange[0]} endDate={dateRange[1]} />
    </main>
  )
}

