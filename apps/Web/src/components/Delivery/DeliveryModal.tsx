import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addDelivery } from "@/store/slices/deliverySlice";
import { fetchActiveEmployees } from "@/store/slices/employeeSlice";
import { UserRole } from "@/types/user";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeliveryModal({ isOpen, onClose }: DeliveryModalProps) {
  const dispatch = useAppDispatch();
  const { activeEmployees } = useAppSelector((state) => state.employees);
  const { user, role } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipientId: "",
    carrier: "",
    trackingNumber: "",
    labelPhotoUrl: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (role === UserRole.EMPLOYEE && user) {
        setFormData((prev) => ({
          ...prev,
          recipientId: user._id || user.id || "",
        }));
      } else if (activeEmployees.length === 0) {
        dispatch(fetchActiveEmployees());
      }
    }
  }, [isOpen, dispatch, activeEmployees.length, role, user]);

  useEffect(() => {
    console.log(activeEmployees);
  }, [activeEmployees]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await dispatch(addDelivery(formData)).unwrap();
      onClose();
      setFormData({
        recipientId: "",
        carrier: "",
        trackingNumber: "",
        labelPhotoUrl: "",
      });
    } catch (error) {
      console.error("Failed to create delivery:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Record Delivery">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Recipient</label>
          {role === UserRole.EMPLOYEE && user ? (
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full p-2 border rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          ) : (
            <Select
              value={formData.recipientId}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, recipientId: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Employee" />
              </SelectTrigger>
              <SelectContent>
                {activeEmployees.map((emp) => (
                  <SelectItem key={emp._id} value={emp._id || ""}>
                    {emp.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Carrier</label>
          <Select
            value={formData.carrier}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, carrier: value }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Carrier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DHL">DHL</SelectItem>
              <SelectItem value="FEDEX">FedEx</SelectItem>
              <SelectItem value="UPS">UPS</SelectItem>
              <SelectItem value="AMAZON">Amazon</SelectItem>
              <SelectItem value="FOOD">Food Delivery</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Tracking Number
          </label>
          <input
            type="text"
            name="trackingNumber"
            value={formData.trackingNumber}
            onChange={handleChange}
            placeholder="Optional"
            className="w-full p-2 border rounded-md bg-background"
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Delivery"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
