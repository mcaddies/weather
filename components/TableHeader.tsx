interface TableHeaderProps {
  dates: Date[]
}

export default function TableHeader({ dates }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        <th className="p-2 border bg-gray-200 font-bold">Year</th>
        {dates.map((date, index) => (
          <th key={index} className="p-2 border bg-gray-200 font-bold">
            {date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
          </th>
        ))}
      </tr>
    </thead>
  )
}

