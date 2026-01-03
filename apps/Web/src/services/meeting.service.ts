import type { Meeting, CreateMeetingRequest, ParticipantAvailability } from '@repo/types';
import api from './api';

export const meetingService = {
  // Create a new meeting
  createMeeting: async (meetingData: CreateMeetingRequest): Promise<{
    success: boolean;
    data?: Meeting;
    conflicts?: ParticipantAvailability[];
    message?: string;
  }> => {
    try {
      const response = await api.post('/meetings', meetingData);
      // Backend returns { success: true, data: meeting, availabilityLogs, conflicts? }
      if (response.data.success && response.data.data) {
        return {
          success: true,
          data: response.data.data,
          conflicts: response.data.conflicts
        };
      }
      // If not success, but has conflicts, return them
      if (response.data.conflicts) {
        return {
          success: false,
          conflicts: response.data.conflicts,
          message: 'Conflicts detected'
        };
      }
      return { success: false, message: response.data.message || 'Failed to create meeting due to conflicts' };
    } catch (error: unknown) {
      console.error('Error creating meeting:', error);
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to create meeting due to conflicts '
      };
    }
  },

  // Get meetings for a user
  getMeetings: async (userId: string): Promise<{ success: boolean; data?: Meeting[]; message?: string }> => {
    try {
      const response = await api.get(`/meetings/user/${userId}`);
      // Backend returns { success: true, data: meetings }
      if (response.data.success && response.data.data) {
        return { success: true, data: response.data.data };
      }
      return { success: false, message: 'No meetings found' };
    } catch (error: unknown) {
      console.error('Error fetching meetings:', error);
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to fetch meetings'
      };
    }
  },

  // Get meeting by ID
  getMeeting: async (meetingId: string): Promise<{ success: boolean; data?: Meeting; message?: string }> => {
    try {
      const response = await api.get(`/meetings/${meetingId}`);
      // Backend returns { success: true, data: meeting }
      if (response.data.success && response.data.data) {
        return { success: true, data: response.data.data };
      }
      return { success: false, message: 'Meeting not found' };
    } catch (error: unknown) {
      console.error('Error fetching meeting:', error);
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to fetch meeting'
      };
    }
  },

  // Update meeting
  updateMeeting: async (meetingId: string, meetingData: Partial<CreateMeetingRequest>): Promise<{ success: boolean; data?: Meeting; message?: string }> => {
    try {
      const response = await api.put(`/meetings/${meetingId}`, meetingData);
      // Backend returns { success: true, data: meeting }
      if (response.data.success && response.data.data) {
        return { success: true, data: response.data.data };
      }
      return { success: false, message: 'Failed to update meeting' };
    } catch (error: unknown) {
      console.error('Error updating meeting:', error);
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to update meeting'
      };
    }
  },

  // Delete meeting
  deleteMeeting: async (meetingId: string): Promise<{ success: boolean; message?: string }> => {
    try {
      await api.delete(`/meetings/${meetingId}`);
      return { success: true };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to delete meeting'
      };
    }
  },

  // Get available time slots for scheduling
  getAvailableSlots: async (date: string, duration: number = 30): Promise<{ success: boolean; data?: unknown[]; message?: string }> => {
    try {
      const response = await api.get(`/meetings/available-slots?date=${date}&duration=${duration}`);
      return { success: true, data: response.data };
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      return {
        success: false,
        message: err.response?.data?.message || 'Failed to fetch available slots'
      };
    }
  }
};