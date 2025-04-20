
import React from "react";
import WelcomeForm from "@/components/WelcomeForm";
import NovaLogo from "@/components/NovaLogo";
import ThemeToggle from "@/components/ThemeToggle";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="max-w-md w-full space-y-8">
        <NovaLogo className="mb-8" />
        <WelcomeForm />
      </div>
      <footer className="absolute bottom-4 text-center text-sm text-muted-foreground">
        Created with ❤️ by Sayantan
      </footer>
    </div>
  );
};

export default LandingPage;
