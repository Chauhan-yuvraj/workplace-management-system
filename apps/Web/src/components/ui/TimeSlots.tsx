import React, { useState, useEffect } from "react";
import { Clock, CheckCircle, XCircle, Edit3, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface TimeSlot {
  time: string;
  available: boolean;
  booked?: boolean;
  reason?: string;
  person?: string;
  meetingLink?: string;
  type?: "meeting" | "maintenance" | "personal" | "other";
}

interface TimeSlotsProps {
  selectedDate?: Date;
  onSlotSelect?: (time: string) => void;
  selectedSlot?: string;
  editMode?: boolean;
  onSlotsUpdate?: (slots: TimeSlot[]) => void;
  onSlotsData?: (slots: TimeSlot[]) => void;
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
  selectedDate,
  onSlotSelect,
  selectedSlot,
  editMode = false,
  onSlotsUpdate,
  onSlotsData,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [slots, setSlots] = useState<TimeSlot[]>([]);

  // Check if slots can be edited (not past dates)
  const canEditSlots = (): boolean => {
    if (!selectedDate) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateOnly = new Date(selectedDate);
    selectedDateOnly.setHours(0, 0, 0, 0);
    
    // If date is in the past, cannot edit
    if (selectedDateOnly < today) return false;
    
    // If date is today, check if current time allows editing
    if (selectedDateOnly.getTime() === today.getTime()) {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Only allow editing if current time is before 6:00 PM
      return currentHour < 18 || (currentHour === 18 && currentMinute === 0);
    }
    
    // Future dates can be edited
    return true;
  };

  // Check if a specific slot can be edited
  const canEditSlot = (slot: TimeSlot): boolean => {
    if (!selectedDate) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDateOnly = new Date(selectedDate);
    selectedDateOnly.setHours(0, 0, 0, 0);
    
    // If date is in the past, cannot edit
    if (selectedDateOnly < today) return false;
    
    // If date is today, check if slot time is in the future
    if (selectedDateOnly.getTime() === today.getTime()) {
      const now = new Date();
      // Parse time like "10:00 AM" or "02:30 PM"
      const timeMatch = slot.time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
      if (!timeMatch) return false;
      
      let hours = parseInt(timeMatch[1]);
      const minutes = parseInt(timeMatch[2]);
      const ampm = timeMatch[3].toUpperCase();
      
      if (ampm === 'PM' && hours !== 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
      
      const slotTime = new Date();
      slotTime.setHours(hours, minutes, 0, 0);
      
      // Only allow editing if slot time is after current time
      return slotTime > now;
    }
    
    // Future dates can be edited
    return true;
  };

  // Generate time slots from 9:30 AM to 6:00 PM in 30-minute intervals
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const startTime = new Date();
    startTime.setHours(9, 30, 0, 0); // 9:30 AM

    const endTime = new Date();
    endTime.setHours(18, 0, 0, 0); // 6:00 PM

    const currentTime = new Date(startTime);

    while (currentTime <= endTime) {
      const timeString = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // Mock some booked/unavailable slots
      let slot: TimeSlot = {
        time: timeString,
        available: true,
      };

      // Example: 10:00 AM booked for meeting
      if (timeString === "10:00 AM") {
        slot = {
          time: timeString,
          available: false,
          booked: true,
          reason: "Team meeting",
          person: "John Doe",
          meetingLink: "https://meet.google.com/abc-defg-hij",
          type: "meeting",
        };
      }
      // Example: 11:30 AM unavailable for maintenance
      else if (timeString === "11:30 AM") {
        slot = {
          time: timeString,
          available: false,
          booked: false,
          reason: "System maintenance",
          type: "maintenance",
        };
      }
      // Example: 2:00 PM booked for personal appointment
      else if (timeString === "02:00 PM") {
        slot = {
          time: timeString,
          available: false,
          booked: true,
          reason: "Personal appointment",
          person: "Jane Smith",
          type: "personal",
        };
      }

      slots.push(slot);

      // Add 30 minutes
      currentTime.setMinutes(currentTime.getMinutes() + 30);
    }

    return slots;
  };

  // Initialize slots when component mounts or date changes
  useEffect(() => {
    if (selectedDate) {
      const newSlots = generateTimeSlots();
      setSlots(newSlots);
      onSlotsData?.(newSlots);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const handleSlotClick = (slot: TimeSlot, index: number) => {
    if (isEditing) {
      // Check if this specific slot can be edited
      if (!canEditSlot(slot)) return;
      
      // Only allow editing available and unavailable slots, not booked ones
      const newSlots = [...slots];
      if (newSlots[index].available) {
        // Available -> Unavailable
        newSlots[index] = {
          ...newSlots[index],
          available: false,
          booked: false,
        };
      } else if (!newSlots[index].available && !newSlots[index].booked) {
        // Unavailable -> Available
        newSlots[index] = {
          ...newSlots[index],
          available: true,
          booked: false,
        };
      }
      // If booked, do nothing
      setSlots(newSlots);
      onSlotsData?.(newSlots);
    } else {
      // Allow selecting any slot to view details
      onSlotSelect?.(slot.time);
    }
  };

  const handleSaveChanges = () => {
    onSlotsUpdate?.(slots);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    const resetSlots = generateTimeSlots(); // Reset to all available
    setSlots(resetSlots);
    onSlotsData?.(resetSlots);
    setIsEditing(false);
  };

  const getSlotDisplay = (slot: TimeSlot) => {
    if (slot.available) {
      return {
        icon: CheckCircle,
        iconColor: "text-green-500",
        text: "Available",
        textColor: "text-green-600",
        bgColor:
          selectedSlot === slot.time
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-background hover:bg-accent hover:border-accent-foreground border-border",
      };
    } else if (slot.booked) {
      return {
        icon: XCircle,
        iconColor: "text-red-500",
        text: "Booked",
        textColor: "text-red-600",
        bgColor: "bg-destructive/10 border-destructive/20 text-destructive",
      };
    } else {
      return {
        icon: XCircle,
        iconColor: "text-muted-foreground",
        text: "Unavailable",
        textColor: "text-muted-foreground",
        bgColor: "bg-muted border-muted-foreground/20 text-muted-foreground",
      };
    }
  };

  return (
    <div className="bg-card rounded-xl border shadow-sm p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h3 className="font-semibold text-base sm:text-lg">
            {selectedDate
              ? `Time Slots - ${selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}`
              : "Select a date to view time slots"}
          </h3>
        </div>

        {selectedDate && editMode && canEditSlots() && (
          <div className="flex gap-2">
            {!isEditing ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2"
              >
                <Edit3 className="h-4 w-4" />
                Edit Slots
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </Button>
                <Button
                  size="sm"
                  onClick={handleSaveChanges}
                  className="flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {!selectedDate ? (
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>
            Please select a date from the calendar to view available time slots.
          </p>
        </div>
      ) : (
        <>
          {isEditing && (
            <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Edit Mode:</strong> Click on slots to toggle between Available and Unavailable. Booked slots and past time slots cannot be modified.
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-7 gap-2 sm:gap-3">
            {slots.map((slot, index) => {
              const display = getSlotDisplay(slot);
              const IconComponent = display.icon;

              return (
                <button
                  key={slot.time}
                  onClick={() => handleSlotClick(slot, index)}
                  disabled={isEditing ? (slot.booked || !canEditSlot(slot)) : false}
                  className={cn(
                    "flex flex-col items-center justify-center p-2 sm:p-3 rounded-lg border transition-all duration-200 text-center",
                    isEditing
                      ? slot.booked || !canEditSlot(slot)
                        ? "cursor-not-allowed opacity-60"
                        : "hover:scale-105 active:scale-95 cursor-pointer"
                      : "hover:scale-105 active:scale-95 cursor-pointer",
                    display.bgColor,
                    selectedSlot === slot.time &&
                      !isEditing &&
                      "ring-2 ring-primary/20"
                  )}
                >
                  <span className="text-xs sm:text-sm font-medium mb-1">
                    {slot.time}
                  </span>
                  <div className="flex items-center gap-1">
                    <IconComponent
                      className={cn("h-3 w-3", display.iconColor)}
                    />
                    <span
                      className={cn(
                        "text-xs hidden sm:inline",
                        display.textColor
                      )}
                    >
                      {display.text}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </>
      )}

      {selectedDate && !isEditing && (
        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-red-500" />
              <span>Booked</span>
            </div>
            <div className="flex items-center gap-1">
              <XCircle className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
              <span>Unavailable</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
