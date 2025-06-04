import Calendar from "../../components/Calendar/Calendar";
import ScheduleOfClasses from "../../components/ScheduleOfClasses/ScheduleOfClasses";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <div className="pt-4 px-10 flex justify-between">
        <ScheduleOfClasses />
        <Calendar />
      </div>
    </div>
  );
}
