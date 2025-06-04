export default function ScheduleOfClasses() {
    return (
      <div className="w-3/5 pr-6">
        <h1 className="text-xl font-semibold text-orange-700 border-b pb-2 mb-2">Schedule of Classes</h1>
        <div className="mb-4">
          <label className="font-bold mr-2">Term:</label>
          <select className="border px-2 py-1">
            <option>2025 Fall</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="font-bold mr-2">Criteria:</label>
          <select className="border px-2 py-1">
            <option>IN4MATX - Informatics</option>
          </select>
        </div>
        <table className="table-auto text-sm w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-2">Code</th>
              <th className="border px-2">Type</th>
              <th className="border px-2">Instructor</th>
              <th className="border px-2">Time</th>
              <th className="border px-2">Place</th>
              <th className="border px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2">36350</td>
              <td className="border px-2">LEC</td>
              <td className="border px-2">Krone Martins</td>
              <td className="border px-2">6:30-7:50pm</td>
              <td className="border px-2">PSLH 100</td>
              <td className="border px-2 text-blue-600 cursor-pointer">Add</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
}