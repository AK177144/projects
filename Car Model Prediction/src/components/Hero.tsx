import { Car, Scan, Zap } from "lucide-react";

export const Hero = () => {
  return (
    <div className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border">
          <Zap className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground">AI-Powered Recognition</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-chrome-gray to-foreground">
          Identify Any Car Part
          <span className="block text-primary mt-2">Instantly</span>
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Upload an image of any car exterior part and our AI will identify the make and model with precision
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            <span>500+ Car Models</span>
          </div>
          <div className="flex items-center gap-2">
            <Scan className="w-5 h-5 text-secondary" />
            <span>Advanced AI Recognition</span>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
    </div>
  );
};
