import TableCell from "./TableCell"

interface TableRowProps {
  year: number
  dates: Date[]
}

export default function TableRow({ year, dates }: TableRowProps) {
  const generateWeatherData = (date: Date) => {
    const weathers = ["sunny", "cloudy", "rainy", "snowy"] as const
    let seed = date.getTime() + year
    const random = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      return seed / 0x7fffffff
    }
    return {
      temperature: Math.floor(random() * 40) - 10, // -10 to 30 degrees
      weather: weathers[Math.floor(random() * weathers.length)],
    }
  }

  return (
    <tr>
      <td className="p-2 border bg-gray-100 font-bold">{year}</td>
      {dates.map((date, index) => {
        const cellDate = new Date(date)
        cellDate.setFullYear(year)
        const { temperature, weather } = generateWeatherData(cellDate)
        return <TableCell key={index} temperature={temperature} weather={weather} />
      })}
    </tr>
  )
}

