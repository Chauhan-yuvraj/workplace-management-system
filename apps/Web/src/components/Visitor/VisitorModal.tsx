import React, { useState, useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { addVisitor, updateVisitor } from "@/store/slices/visitorSlice";
import Modal from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { Visitor } from "@/types/visitor";

interface VisitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  visitorToEdit?: Visitor | null;
}

export default function VisitorModal({
  isOpen,
  onClose,
  visitorToEdit,
}: VisitorModalProps) {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyNameFallback: "",
    notes: "",
    isVip: false,
    isBlocked: false,
  });

  useEffect(() => {
    if (visitorToEdit) {
      setFormData({
        name: visitorToEdit.name || "",
        email: visitorToEdit.email || "",
        phone: visitorToEdit.phone || "",
        companyNameFallback: visitorToEdit.companyNameFallback || "",
        notes: visitorToEdit.notes || "",
        isVip: visitorToEdit.isVip || false,
        isBlocked: visitorToEdit.isBlocked || false,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        companyNameFallback: "",
        notes: "",
        isVip: false,
        isBlocked: false,
      });
    }
    setSelectedFile(null);
  }, [visitorToEdit, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("companyNameFallback", formData.companyNameFallback);
      submitData.append("notes", formData.notes);
      submitData.append("isVip", String(formData.isVip));
      submitData.append("isBlocked", String(formData.isBlocked));

      if (selectedFile) {
        submitData.append("profileImg", selectedFile);
      }

      if (visitorToEdit) {
        await dispatch(
          updateVisitor({ id: visitorToEdit._id, data: submitData })
        ).unwrap();
      } else {
        await dispatch(addVisitor(submitData)).unwrap();
      }

      onClose();
    } catch (error) {
      console.error("Failed to save visitor:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={visitorToEdit ? "Edit Visitor" : "Add Visitor"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center gap-4 mb-4">
          <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center overflow-hidden border">
            {selectedFile ? (
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="h-full w-full object-cover"
              />
            ) : visitorToEdit?.profileImgUri ? (
              <img
                src={visitorToEdit.profileImgUri}
                alt={visitorToEdit.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-muted-foreground text-xs">No Image</span>
            )}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="John Doe"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="+1 234 567 890"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Company</label>
            <input
              name="companyNameFallback"
              value={formData.companyNameFallback}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              placeholder="Company Name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-20"
            placeholder="Additional notes..."
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            <input
              type="checkbox"
              name="isVip"
              checked={formData.isVip}
              onChange={handleCheckboxChange}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            VIP Visitor
          </label>
          <label className="flex items-center gap-2 text-sm font-medium cursor-pointer text-destructive">
            <input
              type="checkbox"
              name="isBlocked"
              checked={formData.isBlocked}
              onChange={handleCheckboxChange}
              className="rounded border-gray-300 text-destructive focus:ring-destructive"
            />
            Block Visitor
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : visitorToEdit ? "Save Changes" : "Add Visitor"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
