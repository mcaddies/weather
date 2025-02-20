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

  const { data: cities = [], isLoading, error } = useQuery({
    queryKey: ["cities", input],
    queryFn: () => searchCities(input),
    enabled: input.length >= 2,
    staleTime: 1000 * 60, // Cache results for 1 minute
    retry: false // Don't retry on failure
  })

  // Log any query errors
  useEffect(() => {
    if (error) {
      console.error('City search query error:', error);
    }
  }, [error]);

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

  const popularCities: City[] = [
    { id: 1001, name: "Niseko", country: "Japan", latitude: 42.8048, longitude: 140.6874 },
    { id: 1002, name: "Miami", country: "United States", latitude: 25.7617, longitude: -80.1918 },
    { id: 1003, name: "Paris", country: "France", latitude: 48.8566, longitude: 2.3522 }
  ];

  return (
    <div ref={wrapperRef} className="relative space-y-2">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Search for a city"
        className="p-2 border rounded w-full"
        onFocus={() => setIsFocused(true)}
      />
      <div className="flex gap-2">
        {popularCities.map((city) => (
          <button
            key={city.id}
            onClick={() => handleCitySelect(city)}
            className="px-4 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
          >
            {city.name}
          </button>
        ))}
      </div>
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
