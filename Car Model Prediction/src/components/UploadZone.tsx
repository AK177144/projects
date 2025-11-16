import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  onImageUpload: (file: File) => void;
  isAnalyzing: boolean;
}

export const UploadZone = ({ onImageUpload, isAnalyzing }: UploadZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        onImageUpload(imageFile);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file",
          variant: "destructive",
        });
      }
    },
    [onImageUpload, toast]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300",
          isDragging
            ? "border-primary bg-primary/5 scale-105"
            : "border-border bg-card/50 backdrop-blur-sm hover:border-primary/50",
          isAnalyzing && "opacity-50 pointer-events-none"
        )}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
          disabled={isAnalyzing}
        />
        
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          {isAnalyzing ? (
            <Loader2 className="w-16 h-16 text-primary animate-spin mb-4" />
          ) : (
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
              <ImageIcon className="relative w-16 h-16 text-primary" />
            </div>
          )}
          
          <h3 className="text-2xl font-semibold mb-2">
            {isAnalyzing ? "Analyzing..." : "Upload Car Part Image"}
          </h3>
          
          <p className="text-muted-foreground mb-6 text-center">
            {isAnalyzing
              ? "Our AI is identifying the car model"
              : "Drag & drop or click to select an image of a car logo, headlamp, bumper, or any exterior part"}
          </p>
          
          {!isAnalyzing && (
            <Button
              variant="default"
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose File
            </Button>
          )}
        </label>
      </div>
    </div>
  );
};
