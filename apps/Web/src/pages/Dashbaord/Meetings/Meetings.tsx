import { useState } from "react";
import { useSelector } from "react-redux";
import { useMeetings } from "@/hooks/useMeetings";
import MeetingModal from "@/components/Meeting/MeetingModal";
import MeetingDetailModal from "@/components/Meeting/MeetingDetailModal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageControls } from "@/components/ui/PageControls";
import { MeetingsGrid } from "@/components/Meeting/MeetingsGrid";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { RootState } from "@/store/store";
import type { Meeting } from "@/types/meeting";

export default function Meetings() {
  const { user } = useSelector((state: RootState) => state.auth);
  const { meetings, loading, fetchMeetings, deleteMeeting } = useMeetings(user?._id);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meetingToEdit, setMeetingToEdit] = useState<Meeting | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (meeting: Meeting) => {
    setMeetingToEdit(meeting);
    setIsModalOpen(true);
  };

  const handleModalClose = async () => {
    setIsModalOpen(false);
    setMeetingToEdit(null);
    // Refresh meetings after modal closes
    if (user?._id) {
      await fetchMeetings(user._id);
    }
  };

  const handleCardClick = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsDetailModalOpen(true);
  };

  const handleDetailModalClose = () => {
    setIsDetailModalOpen(false);
    setSelectedMeeting(null);
  };

  const openDeleteAlert = (id: string) => {
    setDeleteId(id);
    setIsDeleteAlertOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      await deleteMeeting(deleteId);
      setIsDeleteAlertOpen(false);
      setDeleteId(null);
      // Refresh meetings after deletion
      if (user?._id) {
        await fetchMeetings(user._id);
      }
    }
  };

// Filter meetings based on search query
  const filteredMeetings = meetings.filter((meeting) => {
    const query = searchQuery.toLowerCase();

    // 1. Check basic meeting details
    const matchesDetails =
      meeting.title?.toLowerCase().includes(query) ||
      meeting.agenda?.toLowerCase().includes(query) ||
      meeting.location?.toLowerCase().includes(query);

    // 2. Check participants safely
    const matchesParticipants = meeting.participants?.some((participant) => {
      if (!participant) return false;

      // If participant is an object (e.g., { name: "John" })
      if (typeof participant === 'object' && 'name' in participant) {
        return (participant as { name: string }).name?.toLowerCase().includes(query);
      }

      // If participant is just a string (e.g., "John")
      if (typeof participant === 'string') {
        return participant.toLowerCase().includes(query);
      }

      return false;
    });

    return matchesDetails || matchesParticipants;
  });
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Meetings" 
        description="View and manage your scheduled meetings." 
        actionLabel="Schedule Meeting" 
        onAction={() => {
          setMeetingToEdit(null);
          setIsModalOpen(true);
        }} 
      />
        
      <MeetingModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose}
        meetingToEdit={meetingToEdit}
      />

      <MeetingDetailModal
        isOpen={isDetailModalOpen}
        onClose={handleDetailModalClose}
        meeting={selectedMeeting}
      />

      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the meeting.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <PageControls
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search meetings..."
      />

      {loading ? (
        <div className="flex justify-center p-8">Loading...</div>
      ) : (
        <MeetingsGrid
          meetings={filteredMeetings}
          onEdit={handleEdit}
          onDelete={openDeleteAlert}
          onCardClick={handleCardClick}
        />
      )}
    </div>
  );
}

