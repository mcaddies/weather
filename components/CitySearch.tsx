"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { searchCities, type City } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

interface CitySearchProps {
  onCitySelect: (city: City) => void
}

export default function CitySearch({ onCitySelect }: CitySearchProps) {
  const [input, setInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { data: cities = [], isLoading } = useQuery({
    queryKey: ["cities", input],
    queryFn: () => searchCities(input),
    enabled: input.length >= 2,
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
    setIsFocused(true)
  }

  const handleCitySelect = (city: City) => {
    setInput(`${city.name}, ${city.country}`)
    onCitySelect(city)
    setIsFocused(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search for a city"
        className="p-2 border rounded w-full"
        onFocus={() => setIsFocused(true)}
      />
      {isFocused && input.length >= 2 && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-auto">
          {isLoading ? (
            <li className="p-2">Loading...</li>
          ) : cities.length > 0 ? (
            cities.map((city) => (
              <li
                key={city.id}
                onClick={() => handleCitySelect(city)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {city.name}, {city.country}
              </li>
            ))
          ) : (
            <li className="p-2">No cities found</li>
          )}
        </ul>
      )}
    </div>
  )
}
