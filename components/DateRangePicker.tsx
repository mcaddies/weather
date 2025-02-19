import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface DateRangePickerProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void
}

export default function DateRangePicker({ onDateRangeChange }: DateRangePickerProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange

  const handleDateChange = (update: [Date | null, Date | null]) => {
    setDateRange(update)
    onDateRangeChange(update[0], update[1])
  }

  return (
    <DatePicker
      selectsRange={true}
      startDate={startDate}
      endDate={endDate}
      onChange={handleDateChange}
      className="p-2 border rounded"
      placeholderText="Select date range"
    />
  )
}

