import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { User, Mail, Phone, Building, FileText, Trash2, Edit, ShieldAlert, Star } from "lucide-react";
import type { Visitor } from "@/types/visitor";

interface VisitorProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitor: Visitor | null;
  onEdit: (visitor: Visitor) => void;
  onDelete: (visitorId: string) => void;
}

export default function VisitorProfileModal({
  isOpen,
  onClose,
  visitor,
  onEdit,
  onDelete,
}: VisitorProfileModalProps) {
  if (!visitor) return null;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this visitor?")) {
      onDelete(visitor._id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Visitor Profile">
      <div className="flex flex-col items-center space-y-6">
        {/* Profile Image */}
        <div className="relative h-32 w-32 rounded-full bg-secondary flex items-center justify-center overflow-hidden border-4 border-background shadow-lg">
          {visitor.profileImgUri ? (
            <img
              src={visitor.profileImgUri}
              alt={visitor.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-16 w-16 text-muted-foreground" />
          )}
        </div>

        {/* Name and Status */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            {visitor.name}
            {visitor.isVip && <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />}
          </h2>
          <div className="flex justify-center pt-2 gap-2">
            {visitor.isBlocked && (
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20">
                <ShieldAlert className="h-3 w-3 mr-1" />
                Blocked
              </span>
            )}
            {!visitor.isBlocked && (
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20">
                Active
              </span>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 bg-secondary/20 p-4 rounded-lg">
          <div className="flex items-center gap-3 p-2">
            <div className="p-2 bg-background rounded-full shadow-sm">
              <Mail className="h-4 w-4 text-primary" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium truncate" title={visitor.email}>
                {visitor.email || "N/A"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2 bg-background rounded-full shadow-sm">
              <Phone className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm font-medium">{visitor.phone || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2 bg-background rounded-full shadow-sm">
              <Building className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Company</p>
              <p className="text-sm font-medium">{visitor.companyNameFallback || "N/A"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2">
            <div className="p-2 bg-background rounded-full shadow-sm">
              <FileText className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Notes</p>
              <p className="text-sm font-medium truncate" title={visitor.notes}>
                {visitor.notes || "None"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex w-full gap-3 pt-2">
          <Button
            variant="outline"
            className="flex-1 gap-2 border-destructive text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
          <Button className="flex-1 gap-2" onClick={() => onEdit(visitor)}>
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </div>
    </Modal>
  );
}
