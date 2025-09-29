import React from 'react';
import { cn } from '@/lib/utils';
import { Upload, Camera } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  className?: string;
  accept?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  className,
  accept = "image/*"
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className={cn(
        "relative border-2 border-dashed border-border rounded-lg p-8 text-center transition-colors hover:border-primary/50",
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          <div className="p-3 rounded-full bg-hotdog-bun">
            <Upload className="w-6 h-6 text-hotdog-sausage" />
          </div>
          <div className="p-3 rounded-full bg-hotdog-mustard">
            <Camera className="w-6 h-6 text-hotdog-sausage" />
          </div>
        </div>
        
        <div>
          <p className="text-lg font-medium text-foreground mb-2">
            Drop an image or click to upload
          </p>
          <p className="text-sm text-muted-foreground">
            PNG, JPG, WebP up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};