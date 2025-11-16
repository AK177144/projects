import { useState } from "react";
import { Hero } from "@/components/Hero";
import { UploadZone } from "@/components/UploadZone";
import { ResultDisplay } from "@/components/ResultDisplay";
import { SupportedParts } from "@/components/SupportedParts";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    make: string;
    model: string;
    part: string;
    confidence: string;
  } | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { toast } = useToast();

  const analyzeImage = async (file: File) => {
    setIsAnalyzing(true);
    
    // Create URL for display
    const url = URL.createObjectURL(file);
    setImageUrl(url);

    try {
      // Convert image to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

      const imageBase64 = await base64Promise;

      // Call edge function for AI analysis
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-car-part`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ imageBase64 }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Analysis failed');
      }

      const analysisResult = await response.json();
      
      setResult({
        make: analysisResult.make,
        model: analysisResult.model,
        part: analysisResult.part,
        confidence: analysisResult.confidence,
      });

      toast({
        title: "Analysis Complete",
        description: "Successfully identified the car model",
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: error instanceof Error ? error.message : "Unable to identify the car part. Please try another image.",
        variant: "destructive",
      });
      // Reset on error
      handleReset();
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setImageUrl("");
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Hero />
      
      <div className="container mx-auto px-4 py-12">
        {!result ? (
          <UploadZone onImageUpload={analyzeImage} isAnalyzing={isAnalyzing} />
        ) : (
          <ResultDisplay result={result} imageUrl={imageUrl} onReset={handleReset} />
        )}
      </div>
      
      {!result && <SupportedParts />}
      
      <footer className="border-t border-border py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 CarPartAI. Powered by advanced AI recognition technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
