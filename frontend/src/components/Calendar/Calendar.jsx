export default function Calendar() {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const times = Array.from({ length: 14 }, (_, i) => `${8 + i}am`);
  
    return (
      <div className="w-2/5">
        <h2 className="text-xl font-semibold text-orange-700 border-b pb-2 mb-2">Calendar</h2>
        <div className="border">
          <div className="grid grid-cols-6 border-b text-center font-bold">
            <div className="bg-gray-100">Time</div>
            {days.map(day => (
              <div key={day} className="bg-gray-100">{day}</div>
            ))}
          </div>
          {times.map(time => (
            <div key={time} className="grid grid-cols-6 text-center text-sm border-b">
              <div className="border-r bg-gray-50">{time}</div>
              {days.map((_, i) => (
                <div key={i} className="border-r h-8"></div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          <button className="bg-yellow-300 px-4 py-1 text-sm rounded">Send Registration Request</button>
          <button className="bg-yellow-300 px-4 py-1 text-sm rounded">Need Help?</button>
        </div>
      </div>
    );
}