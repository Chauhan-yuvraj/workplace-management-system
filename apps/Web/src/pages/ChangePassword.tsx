import Background from "@/components/ui/Background";
import { ChangePasswordForm } from "@/components/auth/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <Background>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm ring-1 ring-gray-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Change Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please update your password to continue!
            </p>
          </div>
          <ChangePasswordForm />
        </div>
      </div>
    </Background>
  );
};

export default ChangePassword;
