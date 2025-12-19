import React from "react";
import { Package, CheckCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Delivery } from "@/types/delivery";

interface DeliveryGridProps {
  deliveries: Delivery[];
  onStatusUpdate: (id: string, status: string) => void;
  onDelete: (id: string) => void;
}

export const DeliveryGrid: React.FC<DeliveryGridProps> = ({
  deliveries,
  onStatusUpdate,
  onDelete,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {deliveries.map((delivery) => (
        <div key={delivery._id} className="bg-card text-card-foreground rounded-xl border shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{delivery.recipientId?.name || "Unknown Recipient"}</h3>
                <p className="text-sm text-muted-foreground">{delivery.carrier}</p>
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              delivery.status === "COLLECTED" 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {delivery.status}
            </span>
          </div>
          
          <div className="space-y-2 text-sm">
            {delivery.trackingNumber && (
              <p><span className="text-muted-foreground">Tracking:</span> {delivery.trackingNumber}</p>
            )}
            <p><span className="text-muted-foreground">Arrived:</span> {new Date(delivery.createdAt).toLocaleDateString()}</p>
            {delivery.collectedAt && (
              <p><span className="text-muted-foreground">Collected:</span> {new Date(delivery.collectedAt).toLocaleDateString()}</p>
            )}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            {delivery.status === "PENDING" && (
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2"
                onClick={() => onStatusUpdate(delivery._id, delivery.status)}
              >
                <CheckCircle className="h-4 w-4" />
                Mark Collected
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-destructive hover:text-destructive"
              onClick={() => onDelete(delivery._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
