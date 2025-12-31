import { Request, Response } from "express";
import { MeetingService } from "../services/meeting.service";
import { Meeting } from "../models/meeting.model";
import { ROLE_PERMISSIONS, UserRole } from "@repo/types";

export class MeetingController {
  // Get all meetings with permission-based filtering
  static async getAllMeetings(req: Request, res: Response) {
    try {
      const user = (req as any).user;
      const userPermissions = ROLE_PERMISSIONS[user?.role as UserRole] || [];

      let query = {};

      // Filter based on permissions
      if (userPermissions.includes('view_all_meetings')) {
        // Admin and HR can see all meetings
        query = {};
      } else if (userPermissions.includes('view_department_meetings')) {
        // Managers and employees can only see meetings related to their departments
        query = {
          $or: [
            { organizer: user._id },
            { host: user._id },
            { participants: user._id },
            // For department filtering, we need to check if any participant/host/organizer is in the same department
            // This is complex, so for now we'll show meetings where the user is directly involved
          ]
        };
      } else {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to view meetings"
        });
      }

      const meetings = await Meeting.find(query)
        .populate('organizer', 'name email departments')
        .populate('host', 'name email departments')
        .populate('participants', 'name email departments')
        .sort({ createdAt: -1 });

      res.json({
        success: true,
        data: meetings
      });

    } catch (error: any) {
      console.error("Error fetching meetings:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch meetings"
      });
    }
  }

  // Create a new meeting
  static async createMeeting(req: Request, res: Response) {
    try {
      const {
        organizer,
        host,
        participants,
        title,
        agenda,
        location,
        isVirtual,
        timeSlots,
        remarks
      } = req.body;

      // Check if user has permission to create meetings
      const userPermissions = ROLE_PERMISSIONS[(req as any).user?.role as UserRole] || [];
      if (!userPermissions.includes('create_meetings')) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to create meetings"
        });
      }

      // Validate required fields
      if (!organizer || !host || !participants || !title || !timeSlots || timeSlots.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }

      // Check availability first
      const availabilityResults = await MeetingService.checkAvailability(participants, timeSlots);

      // Check if all participants are available for at least one time slot
      const hasAvailableSlot = availabilityResults.some(slotResults =>
        slotResults.every(result => result.status === 'available')
      );

      if (!hasAvailableSlot) {
        // Return availability information
        return res.status(409).json({
          success: false,
          message: "No suitable time slots available for all participants",
          availabilityResults
        });
      }

      // Create the meeting
      const { meeting, availabilityLogs } = await MeetingService.createMeeting({
        organizer,
        host,
        participants,
        title,
        agenda,
        location,
        isVirtual,
        timeSlots,
        remarks,
      });

      res.status(201).json({
        success: true,
        data: meeting,
        availabilityLogs
      });

    } catch (error: any) {
      console.error("Error creating meeting:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to create meeting"
      });
    }
  }

  // Force create meeting (override conflicts)
  static async forceCreateMeeting(req: Request, res: Response) {
    try {
      const meetingData = req.body;

      // Check permissions
      const userPermissions = ROLE_PERMISSIONS[(req as any).user?.role as UserRole] || [];
      if (!userPermissions.includes('create_meetings')) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to create meetings"
        });
      }

      const { meeting, availabilityLogs } = await MeetingService.createMeeting(meetingData, true);

      res.status(201).json({
        success: true,
        data: meeting,
        availabilityLogs,
        message: "Meeting created and schedules updated"
      });

    } catch (error: any) {
      console.error("Error force creating meeting:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to create meeting"
      });
    }
  }

  // Get meetings for a user
  static async getUserMeetings(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "User ID is required"
        });
      }

      const meetings = await MeetingService.getUserMeetings(userId);

      res.json({
        success: true,
        data: meetings
      });

    } catch (error: any) {
      console.error("Error fetching user meetings:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch meetings"
      });
    }
  }

  // Get meeting by ID
  static async getMeeting(req: Request, res: Response) {
    try {
      const { meetingId } = req.params;

      const meeting = await Meeting.findById(meetingId)
        .populate('organizer', 'name email')
        .populate('host', 'name email')
        .populate('participants', 'name email');

      if (!meeting) {
        return res.status(404).json({
          success: false,
          message: "Meeting not found"
        });
      }

      res.json({
        success: true,
        data: meeting
      });

    } catch (error: any) {
      console.error("Error fetching meeting:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch meeting"
      });
    }
  }

  // Update meeting
  static async updateMeeting(req: Request, res: Response) {
    try {
      const { meetingId } = req.params;
      const updateData = req.body;

      // Check permissions
      const userPermissions = ROLE_PERMISSIONS[(req as any).user?.role as UserRole] || [];
      if (!userPermissions.includes('create_meetings')) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to update meetings"
        });
      }

      const meeting = await Meeting.findByIdAndUpdate(
        meetingId,
        { ...updateData, updatedAt: new Date() },
        { new: true }
      )
      .populate('organizer', 'name email')
      .populate('host', 'name email')
      .populate('participants', 'name email');

      if (!meeting) {
        return res.status(404).json({
          success: false,
          message: "Meeting not found"
        });
      }

      res.json({
        success: true,
        data: meeting
      });

    } catch (error: any) {
      console.error("Error updating meeting:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to update meeting"
      });
    }
  }

  // Update meeting time slots
  static async updateMeetingTimeSlots(req: Request, res: Response) {
    try {
      const { meetingId } = req.params;
      const { timeSlots, forceSchedule = false } = req.body;

      // Check permissions
      const userRole = (req as any).user?.role;
      if (!userRole || !['manager', 'admin'].includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "Only managers and administrators can update meeting time slots"
        });
      }

      const { meeting, availabilityLogs } = await MeetingService.updateMeetingTimeSlots(
        meetingId,
        timeSlots,
        forceSchedule
      );

      res.json({
        success: true,
        data: meeting,
        availabilityLogs
      });

    } catch (error: any) {
      console.error("Error updating meeting time slots:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to update meeting time slots"
      });
    }
  }

  // Delete meeting
  static async deleteMeeting(req: Request, res: Response) {
    try {
      const { meetingId } = req.params;

      // Check permissions
      const userPermissions = ROLE_PERMISSIONS[(req as any).user?.role as UserRole] || [];
      if (!userPermissions.includes('create_meetings')) {
        return res.status(403).json({
          success: false,
          message: "You do not have permission to delete meetings"
        });
      }

      const meeting = await Meeting.findByIdAndUpdate(
        meetingId,
        { status: 'cancelled' },
        { new: true }
      );

      if (!meeting) {
        return res.status(404).json({
          success: false,
          message: "Meeting not found"
        });
      }

      res.json({
        success: true,
        message: "Meeting cancelled successfully"
      });

    } catch (error: any) {
      console.error("Error deleting meeting:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to delete meeting"
      });
    }
  }

  // Get availability logs for a meeting
  static async getMeetingAvailabilityLogs(req: Request, res: Response) {
    try {
      const { meetingId } = req.params;

      const logs = await MeetingService.getMeetingAvailabilityLogs(meetingId);

      res.json({
        success: true,
        data: logs
      });

    } catch (error: any) {
      console.error("Error fetching availability logs:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch availability logs"
      });
    }
  }

  // Get available time slots for a date
  static async getAvailableSlots(req: Request, res: Response) {
    try {
      const { date, duration = 30 } = req.query;

      if (!date) {
        return res.status(400).json({
          success: false,
          message: "Date is required"
        });
      }

      // This would need more implementation for generating available slots
      // For now, return a basic response
      const availableSlots: any[] = [
        // Generate time slots for the day
        // This is a simplified implementation
      ];

      res.json({
        success: true,
        data: availableSlots
      });

    } catch (error: any) {
      console.error("Error fetching available slots:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to fetch available slots"
      });
    }
  }
}