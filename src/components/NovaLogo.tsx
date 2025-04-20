
import React from "react";

const NovaLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`text-center flex flex-col items-center ${className}`}>
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/20 rounded-full filter blur-xl"></div>
        <div className="absolute -top-5 -right-5 w-24 h-24 bg-nova-300/20 rounded-full filter blur-lg"></div>
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-2 relative z-10">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-nova-400 to-nova-600">
          Nova
        </span>
        <span>Chat</span>
      </h1>
      <p className="text-muted-foreground text-sm">
        Connect with anyone, anywhere
      </p>
    </div>
  );
};

export default NovaLogo;
