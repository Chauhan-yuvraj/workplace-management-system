import { useAppSelector } from "@/store/hooks"

export const usePermission = () => {

    const { permissions, user, isAuthenticated } = useAppSelector((state) => state.auth);

    const hasPermission = (requiredPermission: string): boolean => {

        if (!isAuthenticated || !user || !permissions) {
            return false;
        }

        if (permissions.includes('all')) {
            return true;
        }

        return permissions.includes(requiredPermission);
    };
    return { hasPermission, user, isAuthenticated, };
};
