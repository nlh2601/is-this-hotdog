import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/components/ui/file-upload';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Check, X, RotateCcw } from 'lucide-react';
import { pipeline, env } from '@huggingface/transformers';

// Configure transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

type ClassificationResult = {
  isHotdog: boolean;
  confidence: number;
  label: string;
};

export const HotdogClassifier: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [classifier, setClassifier] = useState<any>(null);

  const initializeClassifier = async () => {
    if (!classifier) {
      const pipe = await pipeline('image-classification', 'google/vit-base-patch16-224', {
        device: 'webgpu',
      });
      setClassifier(pipe);
      return pipe;
    }
    return classifier;
  };

  const classifyImage = async (imageUrl: string) => {
    try {
      setIsLoading(true);
      const pipe = await initializeClassifier();
      const results = await pipe(imageUrl);
      
      // Check if any of the top results contain hotdog-related terms
      const hotdogTerms = ['hot dog', 'hotdog', 'chili dog', 'corn dog', 'sausage'];
      const isHotdog = results.some((result: any) => 
        hotdogTerms.some(term => 
          result.label.toLowerCase().includes(term)
        )
      );
      
      const topResult = results[0];
      
      setResult({
        isHotdog,
        confidence: topResult.score,
        label: topResult.label
      });
    } catch (error) {
      console.error('Classification failed:', error);
      setResult({
        isHotdog: false,
        confidence: 0,
        label: 'Classification failed'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (file: File) => {
    const url = URL.createObjectURL(file);
    setSelectedImage(url);
    setResult(null);
    classifyImage(url);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {!selectedImage ? (
        <Card className="p-8 bg-gradient-warm border-hotdog-bun shadow-warm">
          <FileUpload onFileSelect={handleFileSelect} />
        </Card>
      ) : (
        <div className="space-y-6">
          <Card className="p-6 bg-gradient-warm border-hotdog-bun shadow-warm">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected for classification"
                className="w-full h-64 object-cover rounded-lg"
              />
              
              {isLoading && (
                <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                  <div className="bg-white rounded-lg p-4 flex items-center gap-3">
                    <LoadingSpinner size="sm" />
                    <span className="text-sm font-medium">Analyzing...</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {result && (
            <Card className={`p-8 text-center ${
              result.isHotdog 
                ? 'bg-gradient-hotdog border-hotdog-sausage shadow-hotdog' 
                : 'bg-gradient-bun border-hotdog-mustard shadow-warm'
            }`}>
              <div className="flex flex-col items-center gap-4">
                <div className={`p-4 rounded-full ${
                  result.isHotdog ? 'bg-white/20' : 'bg-hotdog-sausage/20'
                }`}>
                  {result.isHotdog ? (
                    <Check className="w-12 h-12 text-white" />
                  ) : (
                    <X className="w-12 h-12 text-hotdog-sausage" />
                  )}
                </div>
                
                <div>
                  <h2 className={`text-4xl font-bold mb-2 ${
                    result.isHotdog ? 'text-white' : 'text-hotdog-sausage'
                  }`}>
                    {result.isHotdog ? 'HOTDOG!' : 'NOT HOTDOG'}
                  </h2>
                  
                  <p className={`text-lg ${
                    result.isHotdog ? 'text-white/90' : 'text-hotdog-sausage/80'
                  }`}>
                    Detected: {result.label}
                  </p>
                  
                  <p className={`text-sm mt-1 ${
                    result.isHotdog ? 'text-white/70' : 'text-hotdog-sausage/60'
                  }`}>
                    Confidence: {(result.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </Card>
          )}

          <div className="flex justify-center">
            <Button 
              onClick={handleReset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Try Another Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};