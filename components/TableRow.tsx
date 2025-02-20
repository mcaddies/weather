import { useQueries } from "@tanstack/react-query"
import TableCell from "./TableCell"
import { getHistoricalWeather, type City } from "@/lib/api"

interface TableRowProps {
  year: number
  dates: Date[]
  city: City
}

export default function TableRow({ year, dates, city }: TableRowProps) {
  const weatherQueries = useQueries({
    queries: dates.map(date => {
      const dateWithYear = new Date(date)
      dateWithYear.setFullYear(year)
      
      return {
        queryKey: ['weather', city.id, dateWithYear.toISOString()],
        queryFn: () => getHistoricalWeather(city.latitude, city.longitude, dateWithYear),
        staleTime: Infinity,
        cacheTime: 1000 * 60 * 60 // 1 hour
      }
    })
  })

  return (
    <tr>
      <td className="p-2 border bg-gray-100 font-bold">{year}</td>
      {weatherQueries.map((query, index) => {
        const weather = query.data
        return (
          <TableCell
            key={index}
            temperature={weather?.temperature ?? null}
            tempMin={weather?.tempMin ?? null}
            tempMax={weather?.tempMax ?? null}
            weather={weather?.weather ?? null}
            isLoading={query.isLoading}
          />
        )
      })}
    </tr>
  )
}
