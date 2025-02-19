export default function WeekSelector() {
  return (
    <select className="p-2 border rounded shadow-sm focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none">
      <option>Select a week</option>
      <option>This week</option>
      <option>Next week</option>
      <option>Two weeks from now</option>
    </select>
  )
}

