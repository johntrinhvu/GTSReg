import { useState, useEffect } from "react";
import { departments, classes } from "../../data/classes";

export default function ScheduleOfClasses({ calendarRef }) {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAdded, setIsAdded] = useState({});

  const handleAddToCalendar = (course, section) => {
    const key = `${course.courseNumber}-${section.code}`;
    if (isAdded[key]) {
      calendarRef.current.removeClass(course, section);
      setIsAdded(prev => ({ ...prev, [key]: false }));
    } else {
      calendarRef.current.addClass(course, section);
      setIsAdded(prev => ({ ...prev, [key]: true }));
    }
  };

  const checkIfClassIsAdded = (course, section) => {
    if (!calendarRef.current) return false;
    return calendarRef.current.isClassAdded(course, section);
  };

  // update isAdded state when calendar changes
  useEffect(() => {
    if (!calendarRef.current || !selectedDepartment) return;
    
    const newIsAdded = {};
    const departmentClasses = classes[selectedDepartment] || [];
    departmentClasses.forEach(course => {
      course.sections.forEach(section => {
        const key = `${course.courseNumber}-${section.code}`;
        newIsAdded[key] = checkIfClassIsAdded(course, section);
      });
    });
    setIsAdded(newIsAdded);
  }, [calendarRef, selectedDepartment]);

  return (
    <div className="w-3/5 pr-6">
      <h1 className="text-xl font-semibold text-orange-700 border-b pb-2 mb-2">Schedule of Classes</h1>
      <div className="mb-4">
        <label className="font-bold mr-2">Term:</label>
        <select className="border px-2 py-1">
          <option>2025 Fall</option>
          <option>2026 Winter</option>
          <option>2026 Spring</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="font-bold mr-2">Department:</label>
        <select
          className="border px-2 py-1"
          value={selectedDepartment}
          onChange={(e) => {
            setSelectedDepartment(e.target.value);
            setSelectedCourse(null);
          }}
        >
          <option value="">Select a Department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {selectedDepartment && (
        <div className="space-y-4">
          {classes[selectedDepartment]?.map((course) => (
            <div key={course.courseNumber} className="border rounded-lg overflow-hidden">
              <div
                className="bg-gray-50 p-3 cursor-pointer hover:bg-gray-100"
                onClick={() =>
                  setSelectedCourse(
                    selectedCourse === course.courseNumber
                      ? null
                      : course.courseNumber
                  )
                }
              >
                <div className="flex justify-between items-center">
                  <div>
                    <span className="font-bold">{course.courseNumber}</span>
                    <span className="ml-2">{course.title}</span>
                    {course.prerequisites && (
                      <span className="text-sm text-gray-600 ml-2">(Prerequisites)</span>
                    )}
                  </div>
                  <div className="text-gray-500">
                    {selectedCourse === course.courseNumber ? '▼' : '▶'}
                  </div>
                </div>
              </div>

              {selectedCourse === course.courseNumber && (
                <div className="p-3">
                  <table className="table-auto text-sm w-full border">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border px-2">Code</th>
                        <th className="border px-2">Type</th>
                        <th className="border px-2">Sec</th>
                        <th className="border px-2">Units</th>
                        <th className="border px-2">Instructor</th>
                        <th className="border px-2">Time</th>
                        <th className="border px-2">Place</th>
                        <th className="border px-2">Final</th>
                        <th className="border px-2">Status</th>
                        <th className="border px-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {course.sections.map((section) => {
                        const key = `${course.courseNumber}-${section.code}`;
                        return (
                          <tr key={section.code}>
                            <td className="border px-2">{section.code}</td>
                            <td className="border px-2">{section.type}</td>
                            <td className="border px-2">{section.section}</td>
                            <td className="border px-2">{section.units}</td>
                            <td className="border px-2">{section.instructor}</td>
                            <td className="border px-2">{section.time}</td>
                            <td className="border px-2">{section.place}</td>
                            <td className="border px-2">{section.final}</td>
                            <td className="border px-2">
                              <span className={`px-2 py-1 rounded text-xs ${
                                section.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                                section.status === 'FULL' ? 'bg-red-100 text-red-800' :
                                section.status === 'Waitl' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {section.status}
                              </span>
                            </td>
                            <td className="border px-2">
                              <button
                                onClick={() => handleAddToCalendar(course, section)}
                                className={`px-3 py-1 rounded ${
                                  isAdded[key]
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-green-500 hover:bg-green-600"
                                } text-white`}
                              >
                                {isAdded[key] ? "Remove" : "Add"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {course.sections[0]?.notes && (
                    <div className="mt-2 text-sm text-gray-600 italic">
                      {course.sections[0].notes}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
