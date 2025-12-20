import { usePermission } from "@/hooks/auth/usePermission";

interface Props {
  permission: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const PermissionGuard = ({
  permission,
  children,
  fallback = null,
}: Props) => {
  const { hasPermission } = usePermission();

  if (!hasPermission(permission)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
