import { ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarNavigationProps {
  onPrevious: () => void
  onNext: () => void
}

export default function CalendarNavigation({ onPrevious, onNext }: CalendarNavigationProps) {
  return (
    <div className="flex justify-between items-center mb-4 p-2 bg-gray-100">
      <button
        onClick={onPrevious}
        className="p-2 bg-white border rounded hover:bg-gray-100 transition-colors"
        aria-label="Previous day"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <h2 className="text-xl font-semibold">Weather Forecast</h2>
      <button
        onClick={onNext}
        className="p-2 bg-white border rounded hover:bg-gray-100 transition-colors"
        aria-label="Next day"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}

