import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { User ,FileText, Trash2, MessageSquare, Image as ImageIcon } from "lucide-react";
import type { Record, SerializablePathData } from "@/types/record";

interface RecordDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: Record | null;
  onDelete: (recordId: string) => void;
}

const SvgPreview = ({ paths, width = 200, height = 100 }: { paths: SerializablePathData[], width?: number, height?: number }) => {
  if (!paths || paths.length === 0) return <div className="text-xs text-muted-foreground">No signature</div>;
  
  return (
    <div className="border rounded bg-white" style={{ width, height }}>
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        {paths.map((path, i) => (
          <path
            key={i}
            d={path.svg}
            stroke={path.color || "black"}
            strokeWidth={path.strokeWidth || 2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
};

export default function RecordDetailModal({
  isOpen,
  onClose,
  record,
  onDelete,
}: RecordDetailModalProps) {
  if (!record) return null;

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      onDelete(record._id);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Details">
      <div className="flex flex-col space-y-6 max-h-[80vh] overflow-y-auto pr-2">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">Visit Record</h2>
            <p className="text-sm text-muted-foreground">
              {new Date(record.timeStamp).toLocaleString()}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary">
            {record.visitType}
          </span>
        </div>

        {/* Visitor Info */}
        <div className="p-4 border rounded-lg bg-card">
          <h3 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
            <User className="h-4 w-4" /> Visitor
          </h3>
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
              {record.VisitorId?.profileImgUri ? (
                <img src={record.VisitorId.profileImgUri} alt={record.VisitorId.name} className="h-full w-full object-cover" />
              ) : (
                <User className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium">{record.VisitorId?.name || "Unknown Visitor"}</p>
              <p className="text-xs text-muted-foreground">{record.VisitorId?.company || "No Company"}</p>
              <p className="text-xs text-muted-foreground">{record.VisitorId?.email}</p>
            </div>
          </div>
        </div>

        {/* Feedback */}
        {record.feedbackText && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <MessageSquare className="h-4 w-4" /> Feedback
            </h3>
            <div className="p-3 bg-secondary/20 rounded-md text-sm">
              {record.feedbackText}
            </div>
          </div>
        )}

        {/* Signature */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" /> Signature
          </h3>
          <SvgPreview paths={record.signature} width={300} height={150} />
        </div>

        {/* Images */}
        {record.images && record.images.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Attached Images
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {record.images.map((img, idx) => (
                <div key={idx} className="aspect-video bg-secondary rounded-md overflow-hidden">
                  <img src={img} alt={`Attachment ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex w-full gap-3 pt-4 border-t">
          <Button
            variant="outline"
            className="flex-1 gap-2 border-destructive text-destructive hover:bg-destructive/10"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
            Delete Record
          </Button>
          <Button className="flex-1" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}
