import { useRef } from "react";
import Calendar from "../../components/Calendar/Calendar";
import ScheduleOfClasses from "../../components/ScheduleOfClasses/ScheduleOfClasses";

export default function HomePage() {
  const calendarRef = useRef(null);

  const handleAddClass = (course, section) => {
    if (calendarRef.current) {
      calendarRef.current.addClass(course, section);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="pt-4 px-10 flex justify-between">
        <ScheduleOfClasses calendarRef={calendarRef} />
        <Calendar ref={calendarRef} />
      </div>
    </div>
  );
}
