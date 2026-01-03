import API from "./api";

export interface AvailabilitySlot {
  startTime: string;
  endTime: string;
  status: "UNAVAILABLE" | "OUT_OF_OFFICE" | "EMERGENCY";
  reason?: string;
}

export interface AvailabilityResponse {
  success: boolean;
  data?: unknown[];
  message?: string;
}

export const availabilityService = {
  // Get availability for an employee on a specific date
  getAvailability: async (
    employeeId: string,
    date: string
  ): Promise<AvailabilityResponse> => {
    try {
      // console.log("Making the API call");
      const response = await API.get(
        `/availability?employeeId=${employeeId}&date=${date}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching availability:", error);
      throw error;
    }
  },

  // Update availability slots
  updateAvailability: async (
    employeeId: string,
    slots: AvailabilitySlot[]
  ): Promise<AvailabilityResponse> => {
    try {
      const response = await API.post("/availability", { employeeId, slots });
      return response.data;
    } catch (error) {
      console.error("Error updating availability:", error);
      throw error;
    }
  },

  // Delete availability slot
  deleteAvailability: async (id: string): Promise<AvailabilityResponse> => {
    try {
      const response = await API.delete(`/availability/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting availability:", error);
      throw error;
    }
  },
};
