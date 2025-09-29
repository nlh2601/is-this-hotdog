import { HotdogClassifier } from '@/components/HotdogClassifier';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-warm">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-hotdog-sausage mb-4">
            🌭 Not Hotdog
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The most advanced hotdog detection technology in the world. 
            Upload an image and discover if it's a hotdog or not!
          </p>
        </div>
        
        <HotdogClassifier />
        
        <div className="text-center mt-12 text-sm text-muted-foreground">
          <p>Powered by AI • Inspired by Silicon Valley</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
