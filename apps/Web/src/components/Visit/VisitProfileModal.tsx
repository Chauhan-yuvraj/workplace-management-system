import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Calendar,  User, Building, FileText, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";
import type { Visit } from "@/types/visit";

interface VisitProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  visit: Visit | null;
  onEdit: (visit: Visit) => void;
  onDelete: (visitId: string) => void;
}

export default function VisitProfileModal({
  isOpen,
  onClose,
  visit,
  onEdit,
  onDelete,
}: VisitProfileModalProps) {
  if (!visit) return null;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this visit?")) {
      onDelete(visit._id);
      onClose();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CHECKED_IN": return "bg-green-100 text-green-800";
      case "CHECKED_OUT": return "bg-gray-100 text-gray-800";
      case "PENDING": return "bg-yellow-100 text-yellow-800";
      case "DECLINED": return "bg-red-100 text-red-800";
      case "MISSED": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Visit Details">
      <div className="flex flex-col space-y-6">
        {/* Header with Status */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">Visit #{visit._id.slice(-6)}</h2>
            <p className="text-sm text-muted-foreground">
              Created on {new Date(visit.createdAt).toLocaleDateString()}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(visit.status)}`}>
            {visit.status.replace("_", " ")}
          </span>
        </div>

        {/* Visitor & Host Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg bg-card">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <User className="h-4 w-4" /> Visitor
            </h3>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                {visit.visitor.profileImgUri ? (
                  <img src={visit.visitor.profileImgUri} alt={visit.visitor.name} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium">{visit.visitor.name}</p>
                <p className="text-xs text-muted-foreground">{visit.visitor.company || "No Company"}</p>
              </div>
            </div>
          </div>

          <div className="p-4 border rounded-lg bg-card">
            <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
              <Building className="h-4 w-4" /> Host
            </h3>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                {visit.host.profileImgUri ? (
                  <img src={visit.host.profileImgUri} alt={visit.host.name} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="font-medium">{visit.host.name}</p>
                <p className="text-xs text-muted-foreground">{visit.host.department || "General"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Time & Purpose */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Scheduled Time</p>
              <p className="text-sm text-muted-foreground">{formatDate(visit.scheduledCheckIn)}</p>
            </div>
          </div>

          {visit.actualCheckIn && (
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Actual Check-in</p>
                <p className="text-sm text-muted-foreground">{formatDate(visit.actualCheckIn)}</p>
              </div>
            </div>
          )}

          {visit.actualCheckOut && (
            <div className="flex items-start gap-3">
              <XCircle className="h-5 w-5 text-gray-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Actual Check-out</p>
                <p className="text-sm text-muted-foreground">{formatDate(visit.actualCheckOut)}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <FileText className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm font-medium">Purpose</p>
              <p className="text-sm text-muted-foreground">{visit.purpose || "No purpose specified"}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex w-full gap-3 pt-4 border-t">
          <Button
            variant="outline"
            className="flex-1 gap-2 border-destructive text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <Button className="flex-1 gap-2" onClick={() => onEdit(visit)}>
            <Edit className="h-4 w-4" />
            Edit Visit
          </Button>
        </div>
      </div>
    </Modal>
  );
}
