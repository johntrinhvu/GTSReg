import { useState, forwardRef, useImperativeHandle } from "react";

const Calendar = forwardRef((props, ref) => {
  const [addedClasses, setAddedClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [showRegistrationConfirm, setShowRegistrationConfirm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [conflictingClasses, setConflictingClasses] = useState([]);
  
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = [
    "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM",
    "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"
  ];

  // Function to parse time string (e.g., "MW 9:30-10:50" or "TuTh 2:00-3:20p")
  const parseTimeString = (timeStr) => {
    if (!timeStr || timeStr === "TBA") return null;
    
    const [days, timeRange] = timeStr.split(" ");
    const [startTime, endTime] = timeRange.split("-");
    
    // Convert days to array of indices (0-4)
    const dayIndices = [];
    if (days.includes("M")) dayIndices.push(0);
    if (days.includes("Tu")) dayIndices.push(1);
    if (days.includes("W")) dayIndices.push(2);
    if (days.includes("Th")) dayIndices.push(3);
    if (days.includes("F")) dayIndices.push(4);

    // Direct mapping of time strings to slot indices
    const timeMap = {
      "8:00": 0, "8:30": 0,
      "9:00": 1, "9:30": 1,
      "10:00": 2, "10:30": 2,
      "11:00": 3, "11:30": 3,
      "12:00": 4, "12:30": 4,
      "1:00": 5, "1:30": 5,
      "2:00": 6, "2:30": 6,
      "3:00": 7, "3:30": 7,
      "4:00": 8, "4:30": 8,
      "5:00": 9, "5:30": 9,
      "6:00": 10, "6:30": 10,
      "7:00": 11, "7:30": 11,
      "8:00": 12, "8:30": 12,
      "9:00": 13, "9:30": 13
    };

    // Clean the time string
    const cleanTime = startTime.replace(/[pPaAmM]/, "").trim();
    const timeIndex = timeMap[cleanTime] || 0;

    console.log('Time parsing:', {
      originalTime: startTime,
      cleanTime,
      timeIndex,
      matchedSlot: times[timeIndex]
    });
    
    return {
      days: dayIndices,
      timeIndex,
      duration: 1 // Default duration of 1 hour
    };
  };

  // Function to check if a class is already added
  const isClassAdded = (course, section) => {
    return addedClasses.some(c => 
      c.course.courseNumber === course.courseNumber && 
      c.section.code === section.code
    );
  };

  // Function to add a class to the calendar
  const addClass = (course, section) => {
    const timeInfo = parseTimeString(section.time);
    if (!timeInfo) return;
    
    setAddedClasses(prev => [...prev, {
      course,
      section,
      timeInfo
    }]);
  };

  // Function to remove a class from the calendar
  const removeClass = (course, section) => {
    setAddedClasses(prev => 
      prev.filter(c => 
        !(c.course.courseNumber === course.courseNumber && 
          c.section.code === section.code)
      )
    );
    setSelectedClass(null);
  };

  // Expose methods through the ref
  useImperativeHandle(ref, () => ({
    addClass,
    removeClass,
    isClassAdded
  }));

  // Function to check if a cell should display a class
  const getClassForCell = (dayIndex, timeIndex) => {
    return addedClasses.find(c => 
      c.timeInfo.days.includes(dayIndex) && 
      c.timeInfo.timeIndex === timeIndex
    );
  };

  // Function to get days string from indices
  const getDaysString = (dayIndices) => {
    return dayIndices.map(index => days[index]).join(", ");
  };

  // Function to check for time conflicts
  const checkTimeConflicts = () => {
    const conflicts = [];
    
    // Compare each class with every other class
    for (let i = 0; i < addedClasses.length; i++) {
      for (let j = i + 1; j < addedClasses.length; j++) {
        const class1 = addedClasses[i];
        const class2 = addedClasses[j];
        
        // Check if classes share any days
        const sharedDays = class1.timeInfo.days.filter(day => 
          class2.timeInfo.days.includes(day)
        );
        
        // If they share days and have the same time slot, there's a conflict
        if (sharedDays.length > 0 && class1.timeInfo.timeIndex === class2.timeInfo.timeIndex) {
          conflicts.push({
            class1: class1,
            class2: class2
          });
        }
      }
    }
    
    return conflicts;
  };

  // Function to handle registration submission
  const handleRegistrationSubmit = () => {
    const conflicts = checkTimeConflicts();
    
    if (conflicts.length > 0) {
      setConflictingClasses(conflicts);
      setShowFailure(true);
    } else {
      setShowSuccess(true);
    }
    
    setShowRegistrationConfirm(false);
  };

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
        {times.map((time, timeIndex) => (
          <div key={time} className="grid grid-cols-6 text-center text-sm border-b">
            <div className="border-r bg-gray-50 pt-4">{time}</div>
            {days.map((_, dayIndex) => {
              const classInfo = getClassForCell(dayIndex, timeIndex);
              return (
                <div key={dayIndex} className="border-r h-12 relative">
                  {classInfo && (
                    <div 
                      className="absolute inset-0 bg-blue-100 p-1 text-xs overflow-hidden cursor-pointer hover:bg-blue-200"
                      onClick={() => setSelectedClass(classInfo)}
                    >
                      <div className="font-bold">{classInfo.course.courseNumber}</div>
                      <div>{classInfo.section.type} {classInfo.section.section}</div>
                      <div>{classInfo.section.place}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-2">
        <button 
          className="bg-yellow-300 px-4 py-1 text-sm rounded"
          onClick={() => setShowRegistrationConfirm(true)}
        >
          Send Registration Request
        </button>
        <button className="bg-yellow-300 px-4 py-1 text-sm rounded">Need Help?</button>
      </div>

      {/* Class Details Modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">{selectedClass.course.courseNumber} - {selectedClass.course.title}</h3>
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Section:</span> {selectedClass.section.type} {selectedClass.section.section}
              </div>
              <div>
                <span className="font-semibold">Days:</span> {getDaysString(selectedClass.timeInfo.days)}
              </div>
              <div>
                <span className="font-semibold">Time:</span> {selectedClass.section.time}
              </div>
              <div>
                <span className="font-semibold">Location:</span> {selectedClass.section.place}
              </div>
              <div>
                <span className="font-semibold">Instructor:</span> {selectedClass.section.instructor}
              </div>
              <div>
                <span className="font-semibold">Status:</span>{" "}
                <span className={`px-2 py-1 rounded text-xs ${
                  selectedClass.section.status === 'OPEN' ? 'bg-green-100 text-green-800' :
                  selectedClass.section.status === 'FULL' ? 'bg-red-100 text-red-800' :
                  selectedClass.section.status === 'Waitl' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedClass.section.status}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setSelectedClass(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Back
              </button>
              <button
                onClick={() => removeClass(selectedClass.course, selectedClass.section)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Remove Class
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Registration Confirmation Modal */}
      {showRegistrationConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">Confirm Registration</h3>
            <p className="mb-4">
              You're about to submit your registration request for the selected courses.
            </p>
            <p className="mb-6 text-gray-600">
              Please make sure your schedule is complete and free of time conflicts.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowRegistrationConfirm(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleRegistrationSubmit}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="text-center">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold mb-2">Success!</h3>
              <p className="mb-6">Your registration request has been submitted successfully.</p>
              <button
                onClick={() => setShowSuccess(false)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Failure Modal */}
      {showFailure && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="text-center">
              <div className="text-4xl mb-4">❌</div>
              <h3 className="text-xl font-bold mb-2">Registration Failed</h3>
              <p className="mb-4">The following classes have time conflicts:</p>
              <div className="mb-6 text-left">
                {conflictingClasses.map((conflict, index) => (
                  <div key={index} className="mb-2 p-2 bg-red-50 rounded">
                    <p className="font-semibold">{conflict.class1.course.courseNumber} ({conflict.class1.section.time})</p>
                    <p className="font-semibold">{conflict.class2.course.courseNumber} ({conflict.class2.section.time})</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowFailure(false)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Calendar;