import { Car, Lightbulb, RectangleHorizontal, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";

const parts = [
  {
    icon: Circle,
    name: "Logos & Emblems",
    description: "Brand badges and manufacturer emblems",
  },
  {
    icon: Lightbulb,
    name: "Headlamps",
    description: "Front and rear lighting systems",
  },
  {
    icon: RectangleHorizontal,
    name: "Bumpers",
    description: "Front and rear bumper designs",
  },
  {
    icon: Car,
    name: "Grilles",
    description: "Front grille patterns and designs",
  },
];

export const SupportedParts = () => {
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Supported Car Parts
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI can identify vehicles from a wide range of exterior parts
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {parts.map((part, index) => (
            <Card
              key={index}
              className="p-6 bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 transition-all duration-300 hover:shadow-glow group"
            >
              <div className="mb-4 relative">
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <part.icon className="relative w-12 h-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{part.name}</h3>
              <p className="text-muted-foreground text-sm">{part.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
