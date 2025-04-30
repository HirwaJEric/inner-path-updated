
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import StreakSubmissionDetails from "@/components/streaks/StreakSubmissionDetails";

interface StreakCalendarViewProps {
  checkedDays: Date[];
  missedDays: Date[];
  onDayClick: (date: Date) => void;
  selectedSubmission: any;
}

const StreakCalendarView = ({ 
  checkedDays, 
  missedDays, 
  onDayClick, 
  selectedSubmission 
}: StreakCalendarViewProps) => {
  const isDateChecked = (date: Date) => {
    return checkedDays.some(checkedDate => 
      date.getDate() === checkedDate.getDate() && 
      date.getMonth() === checkedDate.getMonth() && 
      date.getFullYear() === checkedDate.getFullYear()
    );
  };

  const isDateMissed = (date: Date) => {
    return missedDays.some(missedDate => 
      date.getDate() === missedDate.getDate() && 
      date.getMonth() === missedDate.getMonth() && 
      date.getFullYear() === missedDate.getFullYear()
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Streak Calendar</CardTitle>
        <CardDescription>
          Track your check-ins and missed days. Click on a day to view submission details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="multiple"
          selected={checkedDays}
          className="rounded-md border"
          components={{
            DayContent: ({ date, ...props }) => {
              const isChecked = isDateChecked(date);
              const isMissed = isDateMissed(date);
              
              return (
                <div
                  {...props}
                  className={`relative h-9 w-9 p-0 font-normal aria-selected:opacity-100 cursor-pointer ${
                    isChecked
                      ? "bg-green-100 text-green-800 rounded-full"
                      : isMissed
                      ? "bg-red-100 text-red-800 rounded-full"
                      : ""
                  }`}
                  onClick={() => onDayClick(date)}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    {date.getDate()}
                    {isChecked && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                        <div className="h-1 w-1 rounded-full bg-green-600"></div>
                      </div>
                    )}
                    {isMissed && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                        <div className="h-1 w-1 rounded-full bg-red-600"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            },
          }}
        />
        
        {selectedSubmission && (
          <StreakSubmissionDetails submission={selectedSubmission} />
        )}

        <div className="flex gap-4 mt-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-600"></div>
            <span className="text-sm">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-600"></div>
            <span className="text-sm">Missed</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCalendarView;
