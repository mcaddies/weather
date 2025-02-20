import { useState } from "react"
import CitySearch from "./CitySearch"
import DateRangePicker from "./DateRangePicker"
import type { City } from "@/lib/api"

interface SearchBarProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void
  onCityChange: (city: City) => void
}

export default function SearchBar({ onDateRangeChange, onCityChange }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <CitySearch onCitySelect={onCityChange} />
      <DateRangePicker onDateRangeChange={onDateRangeChange} />
    </div>
  )
}
