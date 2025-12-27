import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { Employee, UserRole } from "@/store/types/user";
import { useImagePicker } from "@/hooks/useImagePicker";
import { getDepartments } from "@/services/department.service";
import type { IDepartment } from "@repo/types";

interface UseEmployeeFormProps {
  initialData?: Employee | null;
  onSubmit: (data: Partial<Employee> | FormData) => void;
  visible: boolean;
}

export const useEmployeeForm = ({
  initialData,
  onSubmit,
  visible,
}: UseEmployeeFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    departmentId: "",
    role: "employee" as UserRole | string,
    isActive: true,
    profileImgUri: "",
  });

  const [departments, setDepartments] = useState<IDepartment[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const { handleTakePhoto, handleChooseFromGallery } = useImagePicker((uri) => {
    if (uri) setImageUri(uri);
  });

  const showImagePickerOptions = () => {
    Alert.alert("Profile Photo", "Choose an option", [
      { text: "Camera", onPress: handleTakePhoto },
      { text: "Gallery", onPress: handleChooseFromGallery },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const deps = await getDepartments();
        setDepartments(deps);
      } catch (error) {
        console.error("Failed to fetch departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        jobTitle: initialData.jobTitle || "",
        departmentId: typeof initialData.departmentId === 'object' ? initialData.departmentId?._id || "" : initialData.departmentId || "",
        role: initialData.role || "employee",
        isActive: initialData.isActive ?? true,
        profileImgUri: initialData.profileImgUri || "",
      });
      setImageUri(initialData.profileImgUri || null);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        jobTitle: "",
        departmentId: "",
        role: "employee",
        isActive: true,
        profileImgUri: "",
      });
      setImageUri(null);
    }
  }, [initialData, visible]);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.jobTitle) {
      Alert.alert(
        "Error",
        "Please fill in all required fields (Name, Email, Job Title)."
      );
      return;
    }

    const hasNewImage = imageUri && !imageUri.startsWith("http");

    if (hasNewImage) {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("phone", formData.phone);
      data.append("jobTitle", formData.jobTitle);
      data.append("department", formData.department);
      data.append("role", formData.role);
      data.append("isActive", String(formData.isActive));

      // @ts-ignore
      data.append("profileImg", {
        uri: imageUri,
        type: "image/jpeg",
        name: "profile.jpg",
      });

      onSubmit(data);
    } else {
      onSubmit({ ...formData, profileImgUri: imageUri || "" });
    }
  };

  return {
    formData,
    setFormData,
    departments,
    imageUri,
    showImagePickerOptions,
    handleSubmit,
  };
};
