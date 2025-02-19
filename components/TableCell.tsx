import { Sun, Cloud, CloudRain, Snowflake } from "lucide-react"

interface TableCellProps {
  temperature: number
  weather: "sunny" | "cloudy" | "rainy" | "snowy"
}

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
  snowy: Snowflake,
}

function getTemperatureColor(temperature: number): string {
  if (temperature <= 0) return "bg-blue-200 text-blue-800"
  if (temperature <= 10) return "bg-blue-100 text-blue-800"
  if (temperature <= 20) return "bg-green-100 text-green-800"
  if (temperature <= 30) return "bg-yellow-100 text-yellow-800"
  return "bg-red-100 text-red-800"
}

export default function TableCell({ temperature, weather }: TableCellProps) {
  const WeatherIcon = weatherIcons[weather]
  const colorClass = getTemperatureColor(temperature)

  return (
    <td className={`p-2 border ${colorClass}`}>
      <div className="flex flex-col items-center">
        <WeatherIcon className="w-6 h-6" />
        <span className="font-semibold">{temperature}°C</span>
      </div>
    </td>
  )
}

