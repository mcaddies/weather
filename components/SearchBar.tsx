import CitySearch from "./CitySearch"
import DateRangePicker from "./DateRangePicker"

interface SearchBarProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void
}

export default function SearchBar({ onDateRangeChange }: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <CitySearch />
      <DateRangePicker onDateRangeChange={onDateRangeChange} />
    </div>
  )
}

