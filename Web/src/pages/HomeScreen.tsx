import { User } from "lucide-react";
import Background from "../components/ui/Background";

export default function HomeScreen() {
  return (
    <Background>
      {/* SafeAreaView equivalent: Main container with padding */}
      <main className="flex flex-col w-full min-h-screen relative">
        {/* Top Header */}
        <div className="flex flex-row justify-end p-8">
          <button
            // onClick={handleProfilePress}
            className="border border-black rounded-full p-3 hover:bg-black/10 transition-colors duration-200 outline-none focus:ring-2 focus:ring-black/20"
            aria-label="Profile"
          >
            <User color="#555" size={24} />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-center items-center w-full gap-y-12 px-4">
          <div className="relative">
            <div
              className="absolute inset-0 z-[5] pointer-events-none"
              style={{
                background: `linear-gradient(to top, 
                  rgba(255,255,255,0.90) 0%, 
                  rgba(255,255,255,0.50) 25%, 
                  rgba(255,255,255,0.25) 75%, 
                  rgba(255,255,255,0.00) 100%
                )`,
              }}
            />

            {/* Title Text */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold max-w-[700px] p-4 text-center leading-tight">
              Welcome to the Abhyuday Bharat
            </h1>
          </div>

          <div className="">
            <button
            // text="Get Started"
            // onClick={() => router.push("/selectVisit")}
            >
              Get Started
            </button>
          </div>
        </div>
      </main>
    </Background>
  );
}
