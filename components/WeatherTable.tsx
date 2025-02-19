"use client"

import { useState, useEffect } from "react"
import TableHeader from "./TableHeader"
import TableRow from "./TableRow"
import CalendarNavigation from "./CalendarNavigation"

interface WeatherTableProps {
  startDate: Date | null
  endDate: Date | null
}

export default function WeatherTable({ startDate, endDate }: WeatherTableProps) {
  const [displayDates, setDisplayDates] = useState<Date[]>([])
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  useEffect(() => {
    if (startDate && endDate) {
      const dates: Date[] = []
      const currentDate = new Date(startDate)
      while (currentDate <= endDate) {
        dates.push(new Date(currentDate))
        currentDate.setDate(currentDate.getDate() + 1)
      }
      setDisplayDates(dates)
    }
  }, [startDate, endDate])

  const handlePreviousDay = () => {
    setDisplayDates((prev) =>
      prev.map((date) => {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() - 1)
        return newDate
      }),
    )
  }

  const handleNextDay = () => {
    setDisplayDates((prev) =>
      prev.map((date) => {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() + 1)
        return newDate
      }),
    )
  }

  if (displayDates.length === 0) {
    return <div className="text-xl">Please select a date range</div>
  }

  return (
    <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <CalendarNavigation onPrevious={handlePreviousDay} onNext={handleNextDay} />
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <TableHeader dates={displayDates} />
          <tbody>
            {years.map((year) => (
              <TableRow key={year} year={year} dates={displayDates} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

