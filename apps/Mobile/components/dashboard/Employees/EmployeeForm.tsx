import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Save,
  User,
  Mail,
  Phone,
  Briefcase,
  Building,
} from "lucide-react-native";
import { Employee } from "@/store/types/user";
import { FormInput } from "@/components/ui/FormInput";
import { SelectionList } from "@/components/ui/SelectionList";
import { ImageUpload } from "./ImageUpload";
import { EmployeeFormHeader } from "./EmployeeFormHeader";
import { useEmployeeForm } from "@/hooks/Dashboard/employees/useEmployeeForm";
import type { IDepartment } from "@repo/types";

interface EmployeeFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Employee> | FormData) => void;
  initialData?: Employee | null;
  isSubmitting?: boolean;
}

export default function EmployeeForm({
  visible,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
}: EmployeeFormProps) {
  const {
    formData,
    setFormData,
    departments,
    imageUri,
    showImagePickerOptions,
    handleSubmit,
  } = useEmployeeForm({ initialData, onSubmit, visible });

  const [showDepartmentList, setShowDepartmentList] = React.useState(false);

  const selectedDepartment = React.useMemo(
    () => departments.find(d => d._id === formData.departmentId),
    [departments, formData.departmentId]
  );

  if (!visible) return null;

  // ✅ EARLY RETURN FOR DEPARTMENT SELECTION
  if (showDepartmentList) {
    return (
      <SelectionList
        data={departments}
        title="Select Department"
        searchKeys={["departmentName", "departmentCode"]}
        onSelect={(dept: IDepartment) => {
          setFormData({ ...formData, departmentId: dept._id || "" });
          setShowDepartmentList(false);
        }}
        onClose={() => setShowDepartmentList(false)}
        renderItem={(dept: IDepartment) => (
          <View className="py-3">
            <Text className="text-base font-medium text-gray-900">
              {dept.departmentName}
            </Text>
            <Text className="text-sm text-gray-500">
              {dept.departmentCode}
            </Text>
          </View>
        )}
      />
    );
  }

  return (
    <View className="absolute inset-0 z-50 bg-black/50 flex-1 justify-end">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1 justify-end"
      >
        <View className="bg-surface rounded-t-3xl h-[85%] shadow-2xl">
          <EmployeeFormHeader
            isEditMode={!!initialData}
            onClose={onClose}
          />

          <ScrollView
            className="flex-1 px-6 pt-6"
            showsVerticalScrollIndicator={false}
          >
            <ImageUpload
              imageUri={imageUri}
              onPress={showImagePickerOptions}
            />

            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
              Personal Information
            </Text>

            <FormInput
              label="Full Name *"
              placeholder="e.g. Rahul Sharma"
              value={formData.name}
              onChangeText={(t) => setFormData({ ...formData, name: t })}
              icon={User}
            />

            <FormInput
              label="Email Address *"
              placeholder="e.g. rahul@company.com"
              value={formData.email}
              onChangeText={(t) => setFormData({ ...formData, email: t })}
              icon={Mail}
              keyboardType="email-address"
            />

            <FormInput
              label="Phone Number"
              placeholder="e.g. +91 98765 43210"
              value={formData.phone}
              onChangeText={(t) => setFormData({ ...formData, phone: t })}
              icon={Phone}
              keyboardType="phone-pad"
            />

            <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 mt-2">
              Role & Department
            </Text>

            <FormInput
              label="Job Title *"
              placeholder="e.g. Software Engineer"
              value={formData.jobTitle}
              onChangeText={(t) =>
                setFormData({ ...formData, jobTitle: t })
              }
              icon={Briefcase}
            />

            <TouchableOpacity
              onPress={() => setShowDepartmentList(true)}
              className="mb-4"
            >
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Department
              </Text>
              <View className="flex-row items-center justify-between bg-gray-50 border border-gray-300 rounded-lg px-4 py-3">
                <Text className="text-base text-gray-900">
                  {selectedDepartment?.departmentName || "Select Department"}
                </Text>
                <Building size={20} color="#6B7280" />
              </View>
            </TouchableOpacity>

            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Access Role
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {["employee", "hr", "admin", "executive"].map((role) => (
                  <TouchableOpacity
                    key={role}
                    onPress={() =>
                      setFormData({ ...formData, role })
                    }
                    className={`px-4 py-2 rounded-full border ${
                      formData.role === role
                        ? "bg-black border-black"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    <Text
                      className={`capitalize text-sm font-medium ${
                        formData.role === role
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      {role}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="flex-row items-center justify-between bg-white p-4 rounded-xl border border-gray-200 mb-8">
              <View>
                <Text className="text-base font-semibold text-gray-900">
                  Active Account
                </Text>
                <Text className="text-xs text-gray-500">
                  Enable or disable access
                </Text>
              </View>
              <Switch
                trackColor={{ false: "#D1D5DB", true: "#10B981" }}
                thumbColor="#FFFFFF"
                value={formData.isActive}
                onValueChange={(val) =>
                  setFormData({ ...formData, isActive: val })
                }
              />
            </View>

            <View className="h-24" />
          </ScrollView>

          <View className="absolute bottom-0 w-full bg-white border-t border-gray-100 p-6 flex-row gap-4 rounded-t-3xl pb-10">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 bg-gray-100 py-4 rounded-xl items-center justify-center"
            >
              <Text className="font-bold text-gray-700">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleSubmit}
              disabled={isSubmitting}
              className={`flex-1 py-4 rounded-xl items-center justify-center flex-row ${
                isSubmitting ? "bg-gray-400" : "bg-black"
              }`}
            >
              <Save size={18} color="white" />
              <Text className="ml-2 font-bold text-white">
                {isSubmitting ? "Saving..." : "Save Details"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
