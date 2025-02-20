interface TableCellProps {
  temperature: number | null
  weather: string | null
  isLoading?: boolean
}

export default function TableCell({
  temperature,
  weather,
  isLoading = false
}: TableCellProps) {
  if (isLoading) {
    return (
      <td className="p-2 border text-center">
        <div className="animate-pulse bg-gray-200 h-12 rounded"></div>
      </td>
    )
  }

  const getWeatherIcon = (weather: string) => {
    switch (weather.toLowerCase()) {
      case "clear":
      case "sunny":
        return "☀️"
      case "clouds":
      case "cloudy":
        return "☁️"
      case "rain":
      case "rainy":
        return "🌧️"
      case "snow":
      case "snowy":
        return "🌨️"
      case "thunderstorm":
        return "⛈️"
      case "drizzle":
        return "🌦️"
      case "mist":
      case "fog":
        return "🌫️"
      default:
        return "❓"
    }
  }

  if (!temperature || !weather) {
    return (
      <td className="p-2 border text-center">
        <div className="text-gray-400">
          <div className="text-2xl mb-1">❓</div>
          <div className="text-sm">N/A</div>
        </div>
      </td>
    )
  }

  return (
    <td className="p-2 border text-center">
      <div className="text-2xl mb-1">{getWeatherIcon(weather)}</div>
      <div className="text-sm">{temperature.toFixed(1)}°C</div>
    </td>
  )
}
