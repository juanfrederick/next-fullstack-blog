import LottieContainer from "@/components/atoms/LottieContainer";
import LoginAnimation from "@/assets/login-animation.json";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-screen flex">
      <div className="hidden md:flex md:w-[40%] md:items-center md:justify-center md:flex-col md:p-12 h-full bg-secondary gap-6">
        <div>
          <h1 className="text-primary-content font-bold text-2xl">
            Welcome Back!
          </h1>
          <h3 className="text-primary-content font-bold text-lg italic">
            Ready to share your thoughts?
          </h3>
          <h3 className="text-primary-content font-bold text-lg">
            Log in now to create and connect with others!
          </h3>
        </div>
        <LottieContainer animationData={LoginAnimation} />
      </div>
      <div className="w-full md:w-[60%] h-full relative background-image">
        {children}
      </div>
    </section>
  );
}
