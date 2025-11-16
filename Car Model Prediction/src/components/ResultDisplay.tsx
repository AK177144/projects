import { Car, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ResultDisplayProps {
  result: {
    make: string;
    model: string;
    part: string;
    confidence: string;
  };
  imageUrl: string;
  onReset: () => void;
}

export const ResultDisplay = ({ result, imageUrl, onReset }: ResultDisplayProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="p-8 bg-card/80 backdrop-blur-sm border-border shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-primary/10 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-2xl font-bold">Identification Complete</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <img
              src={imageUrl}
              alt="Uploaded car part"
              className="w-full h-64 object-cover rounded-xl border border-border"
            />
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Detected Part</span>
                <span className="font-semibold text-primary">{result.part}</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Confidence</span>
                <span className="font-semibold text-secondary">{result.confidence}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Car className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground uppercase tracking-wider">
                    Vehicle Information
                  </span>
                </div>
                <h2 className="text-4xl font-bold mb-2">{result.make}</h2>
                <p className="text-2xl text-muted-foreground">{result.model}</p>
              </div>
              
              <div className="p-6 bg-gradient-primary rounded-xl">
                <p className="text-sm text-background/80 mb-2">AI Analysis</p>
                <p className="text-background">
                  Based on the {result.part.toLowerCase()} design characteristics, our AI has identified this as a {result.make} {result.model} with {result.confidence} confidence.
                </p>
              </div>
            </div>
            
            <Button
              onClick={onReset}
              variant="outline"
              size="lg"
              className="w-full mt-6"
            >
              Analyze Another Part
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
