import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { scheduleVisit, updateVisit, fetchVisits } from "@/store/slices/visitSlice";
import { fetchVisitors } from "@/store/slices/visitorSlice";
import { fetchEmployees } from "@/store/slices/employeeSlice";
import { Button } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";
import { Search, ChevronDown, Plus, Check, User } from "lucide-react";
import type { VisitStatus } from "@/types/visit";
import VisitorModal from "@/components/Visitor/VisitorModal";

// --- 1. Reusable Searchable Select Component (Kept same as before) ---
interface Option {
  value: string;
  label: string;
  subLabel?: string;
  imageUri?: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  searchPlaceholder?: string;
  onAddNew?: () => void;
  addNewLabel?: string;
}

const SearchableSelect = ({
  options,
  value,
  onChange,
  placeholder,
  searchPlaceholder = "Search...",
  onAddNew,
  addNewLabel,
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (option.subLabel && option.subLabel.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <div
        className="flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md bg-background cursor-pointer ring-offset-background hover:bg-muted/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          {selectedOption ? (
            <>
              {selectedOption.imageUri ? (
                <img src={selectedOption.imageUri} alt="" className="w-5 h-5 rounded-full object-cover" />
              ) : (
                <User className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="truncate">{selectedOption.label}</span>
            </>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground opacity-50" />
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-popover border rounded-md shadow-md animate-in fade-in-0 zoom-in-95">
          <div className="flex items-center px-3 py-2 border-b">
            <Search className="w-4 h-4 mr-2 text-muted-foreground" />
            <input
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-auto p-1">
            {filteredOptions.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                No results found.
              </div>
            ) : (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`relative flex items-center w-full px-2 py-2 text-sm rounded-sm cursor-pointer select-none hover:bg-accent hover:text-accent-foreground ${
                    value === option.value ? "bg-accent text-accent-foreground" : ""
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  <div className="flex items-center gap-2 w-full">
                    {option.imageUri ? (
                      <img src={option.imageUri} alt="" className="w-6 h-6 rounded-full object-cover" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                         <span className="text-[10px] font-bold">{option.label.charAt(0)}</span>
                      </div>
                    )}
                    <div className="flex flex-col items-start overflow-hidden">
                      <span className="truncate font-medium">{option.label}</span>
                      {option.subLabel && (
                        <span className="text-xs text-muted-foreground truncate">{option.subLabel}</span>
                      )}
                    </div>
                  </div>
                  {value === option.value && <Check className="w-4 h-4 ml-auto" />}
                </div>
              ))
            )}
          </div>
          
          {onAddNew && (
            <div 
              className="p-1 border-t bg-muted/30"
              onClick={() => {
                setIsOpen(false);
                onAddNew();
              }}
            >
              <div className="flex items-center w-full px-2 py-2 text-sm font-medium text-primary rounded-sm cursor-pointer hover:bg-accent">
                <Plus className="w-4 h-4 mr-2" />
                {addNewLabel || "Add New"}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// --- 2. Main Page Component ---

export default function ScheduleVisit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { visitors } = useAppSelector((state) => state.visitors);
  const { employees } = useAppSelector((state) => state.employees);
  const { visits } = useAppSelector((state) => state.visits);

  const isEditMode = Boolean(id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    visitorId: "",
    hostId: "",
    scheduledCheckIn: "",
    purpose: "",
    isWalkIn: false,
    status: "PENDING" as VisitStatus,
  });

  // 1. Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 2. Fetch dependencies
  useEffect(() => {
    if (visitors.length === 0) dispatch(fetchVisitors());
    if (employees.length === 0) dispatch(fetchEmployees());
    // FIX: Passed "" as argument to fetchVisits to satisfy TypeScript (assuming it takes a search query)
    if (isEditMode && visits.length === 0) dispatch(fetchVisits(""));
  }, [dispatch, visitors.length, employees.length, visits.length, isEditMode]);

  // 3. Populate Form Data
  useEffect(() => {
    if (isEditMode && id) {
      const visitToEdit = visits.find((v) => v._id === id);
      
      if (visitToEdit) {
        const date = new Date(visitToEdit.scheduledCheckIn);
        const offset = date.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(date.getTime() - offset)).toISOString().slice(0, 16);

        setFormData({
          visitorId: visitToEdit.visitor.id,
          hostId: visitToEdit.host.id,
          scheduledCheckIn: localISOTime,
          purpose: visitToEdit.purpose || "",
          isWalkIn: visitToEdit.isWalkIn,
          status: visitToEdit.status,
        });
      }
    } else if (!isEditMode && !formData.scheduledCheckIn) {
      const now = new Date();
      const offset = now.getTimezoneOffset() * 60000;
      const localISOTime = (new Date(now.getTime() - offset)).toISOString().slice(0, 16);
      setFormData((prev) => ({ ...prev, scheduledCheckIn: localISOTime }));
    }
  // FIX: Added formData.scheduledCheckIn to dependencies to fix ESLint warning
  }, [isEditMode, id, visits, formData.scheduledCheckIn]); 

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        scheduledCheckIn: new Date(formData.scheduledCheckIn).toISOString(),
        purpose: formData.purpose,
        isWalkIn: formData.isWalkIn,
      };

      if (isEditMode && id) {
        await dispatch(
          updateVisit({
            id: id,
            data: { ...payload, status: formData.status },
          })
        ).unwrap();
      } else {
        await dispatch(
          scheduleVisit({
            ...payload,
            visitorId: formData.visitorId,
            hostId: formData.hostId,
          })
        ).unwrap();
      }
      navigate("/dashboard/visits");
    } catch (error) {
      console.error("Failed to save visit:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in duration-500">
      <PageHeader
        title={isEditMode ? "Edit Visit" : "Schedule Visit"}
        description={isEditMode ? "Update details for an existing visit." : "Register a new upcoming visit."}
      />

      <VisitorModal 
        isOpen={isVisitorModalOpen}
        onClose={() => setIsVisitorModalOpen(false)}
      />

      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isEditMode && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Visitor</label>
                <SearchableSelect
                  placeholder="Select a visitor..."
                  searchPlaceholder="Search by name or email..."
                  value={formData.visitorId}
                  onChange={(val) => setFormData(prev => ({ ...prev, visitorId: val }))}
                  options={visitors.map(v => ({
                    value: v._id,
                    label: v.name,
                    subLabel: v.email,
                    imageUri: v.profileImgUri
                  }))}
                  onAddNew={() => setIsVisitorModalOpen(true)}
                  addNewLabel="Add new visitor"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Host (Employee)</label>
                <SearchableSelect
                  placeholder="Select a host..."
                  searchPlaceholder="Search by name or department..."
                  value={formData.hostId}
                  onChange={(val) => setFormData(prev => ({ ...prev, hostId: val }))}
                  options={employees.map(e => ({
                    value: e._id || "",
                    label: e.name,
                    subLabel: (e.departments?.[0] as { departmentName?: string })?.departmentName || "No Dept",
                    imageUri: e.profileImgUri
                  }))}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Scheduled Time</label>
              <input
                type="datetime-local"
                name="scheduledCheckIn"
                value={formData.scheduledCheckIn}
                onChange={handleChange}
                required
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {isEditMode && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <div className="relative">
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as VisitStatus }))}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CHECKED_IN">Checked In</option>
                    <option value="CHECKED_OUT">Checked Out</option>
                    <option value="DECLINED">Declined</option>
                    <option value="MISSED">Missed</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Purpose</label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              // FIX: Used standard tailwind class for min-height to fix warning
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-32 resize-none"
              placeholder="Enter the purpose of the meeting..."
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="isWalkIn"
              name="isWalkIn"
              checked={formData.isWalkIn}
              onChange={handleCheckboxChange}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isWalkIn" className="text-sm font-medium cursor-pointer">
              This is a Walk-in Visit
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/dashboard/visits")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="min-w-32">
              {isSubmitting ? "Saving..." : isEditMode ? "Save Changes" : "Schedule Visit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}