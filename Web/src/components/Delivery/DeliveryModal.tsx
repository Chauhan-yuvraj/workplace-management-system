import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addDelivery } from "@/store/slices/deliverySlice";
import { fetchEmployees } from "@/store/slices/employeeSlice";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface DeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DeliveryModal({ isOpen, onClose }: DeliveryModalProps) {
  const dispatch = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employees);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    recipientId: "",
    carrier: "",
    trackingNumber: "",
    labelPhotoUrl: "",
  });

  useEffect(() => {
    if (isOpen && employees.length === 0) {
      dispatch(fetchEmployees());
    }
  }, [isOpen, dispatch, employees.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
          <select
            name="recipientId"
            value={formData.recipientId}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Carrier</label>
          <select
            name="carrier"
            value={formData.carrier}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md bg-background"
          >
            <option value="">Select Carrier</option>
            <option value="DHL">DHL</option>
            <option value="FEDEX">FedEx</option>
            <option value="UPS">UPS</option>
            <option value="AMAZON">Amazon</option>
            <option value="FOOD">Food Delivery</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tracking Number</label>
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
