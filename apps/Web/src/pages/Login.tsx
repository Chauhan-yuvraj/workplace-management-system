import Background from "@/components/ui/Background";
import { LoginForm } from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <Background>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md space-y-8 rounded-2xl bg-white/80 p-8 shadow-xl backdrop-blur-sm ring-1 ring-gray-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please sign in to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </div>
    </Background>
  );
};

export default Login;
