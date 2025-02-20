"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Header from "@/components/Header"
import SearchBar from "@/components/SearchBar"
import WeatherTable from "@/components/WeatherTable"
import type { City } from "@/lib/api"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
})

export default function Home() {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [selectedCity, setSelectedCity] = useState<City | null>(null)

  const handleDateRangeChange = (startDate: Date | null, endDate: Date | null) => {
    setDateRange([startDate, endDate])
  }

  const handleCityChange = (city: City) => {
    setSelectedCity(city)
  }

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
        <Header />
        <SearchBar 
          onDateRangeChange={handleDateRangeChange}
          onCityChange={handleCityChange}
        />
        <WeatherTable 
          startDate={dateRange[0]} 
          endDate={dateRange[1]}
          selectedCity={selectedCity}
        />
      </main>
    </QueryClientProvider>
  )
}
