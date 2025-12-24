import { useAppSelector } from "@/store/hooks";
import { UserRole } from "@/types/user";

export const usePermission = () => {
    const { permissions, user, isAuthenticated, role } =
        useAppSelector((state) => state.auth);

    const hasPermission = (requiredPermission: string): boolean => {
        if (!isAuthenticated) {
            return false;
        }

        // Admins get implicit full access (optional but recommended)
        if (role === UserRole.ADMIN) {
            return true;
        }

        // Explicit permission override
        if (permissions?.includes("all")) {
            return true;
        }

        return permissions?.includes(requiredPermission) ?? false;
    };

    return {
        hasPermission,
        user,
        isAuthenticated,
    };
};
