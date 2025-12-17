import Background from "../components/ui/Background";
import { Button } from "@/components/ui/Button";
import { useAppSelector } from "@/store/hooks";

import { useNavigate } from "react-router-dom";

export default function HomeScreen() {
  // 3. Initialize the hook
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  // Function to handle button click
  const handleClick = () => {
    // Navigate to the /login route
    if (isAuthenticated) {
      navigate("/dashboard");
      return;
    }
    navigate("/login");
  };
  return (
    <Background>
      <main className="flex flex-col w-full min-h-screen relative">
        <div className="flex-1 flex flex-col justify-center items-center w-full gap-y-12 px-4">
          <div className="relative">
            <div
              className="absolute inset-0 z-5 pointer-events-none"
              style={{
                background: `linear-gradient(to top, 
                  rgba(255,255,255,0.90) 0%, 
                  rgba(255,255,255,0.50) 25%, 
                  rgba(255,255,255,0.25) 75%, 
                  rgba(255,255,255,0.00) 100%
                )`,
              }}
            />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold  p-4 text-center leading-tight text-primary">
              Welcome to the Abhyuday Bharat
            </h1>
          </div>

          <div className="">
            <Button
              variant="outline"
              className="cursor-pointer"
              size="lg"
              // 4. Use the navigate function here
              onClick={handleClick}
            >
              Get Started
            </Button>
          </div>
        </div>
      </main>
    </Background>
  );
}
