import React from "react";
import { Label } from "@/components/ui/Label";
import { TimeSlots } from "@/components/ui/TimeSlots";
import type { MeetingTimeSlot } from "@/types/meeting";

interface StepTimeSlotsProps {
  selectedDate: Date | undefined;
  selectedSlots: MeetingTimeSlot[];
  onSlotSelect: (slot: {
    time: string;
    available: boolean;
    booked?: boolean;
  }) => void;
}

export const StepTimeSlots: React.FC<StepTimeSlotsProps> = ({
  selectedDate,
  selectedSlots,
  onSlotSelect,
}) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Step 5: Time Slots</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Choose one or more available time slots for your meeting.
        </p>
      </div>

      {/* Content */}
      <div className="space-y-4">
        {/* Time Slots Selection */}
        <div className="space-y-2">
          <Label>Select Time Slots</Label>
          <div className="border rounded-md p-4 max-h-125 overflow-hidden">
            <TimeSlots
              selectedDate={selectedDate}
              onSlotSelect={onSlotSelect}
              // Convert startTime to a string like "09:30 AM" to match the UI slots
              selectedSlots={selectedSlots.map((s) =>
                new Date(s.startTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              )}
              variant="scheduling" // Added variant to trigger blue highlight
              editMode={false}
              availabilityData={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};