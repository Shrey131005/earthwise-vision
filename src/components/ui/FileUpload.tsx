
import { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Upload, X, FileType, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelected: (file: File) => void;
  accept?: string;
  maxSize?: number; // in MB
}

const FileUpload = ({ 
  onFileSelected, 
  accept = "image/tiff,image/png,image/jpeg", 
  maxSize = 50 
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    processFile(selectedFile);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    processFile(droppedFile);
  };

  const processFile = (selectedFile?: File) => {
    setError(null);
    
    if (!selectedFile) {
      setError("No file selected");
      return;
    }

    // Check file type
    const fileType = selectedFile.type;
    const validTypes = accept.split(',');
    
    if (!validTypes.includes(fileType) && !validTypes.some(type => 
      selectedFile.name.toLowerCase().endsWith(type.replace('image/', '.'))
    )) {
      setError(`Invalid file type. Please upload ${accept.replace(/image\//g, '')}`);
      return;
    }

    // Check file size
    const fileSizeMB = selectedFile.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      setError(`File is too large. Maximum size is ${maxSize}MB`);
      return;
    }

    setFile(selectedFile);
    onFileSelected(selectedFile);

    // Generate preview for image types
    if (fileType.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          onClick={triggerFileInput}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50 hover:bg-secondary/50",
          )}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
          />
          <div className="flex flex-col items-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload size={24} className="text-primary" />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Drag and drop your file here</p>
              <p className="text-xs text-muted-foreground">
                or <span className="text-primary font-medium">browse files</span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Supports GeoTIFF, PNG, or JPEG (max {maxSize}MB)
            </p>
          </div>
        </div>
      ) : (
        <div className="relative border rounded-xl overflow-hidden animate-fade-in">
          <div className="absolute top-2 right-2 z-10">
            <button
              onClick={handleRemoveFile}
              className="p-1 rounded-full bg-background/80 backdrop-blur-sm border shadow-sm"
              aria-label="Remove file"
            >
              <X size={16} />
            </button>
          </div>
          
          {preview ? (
            <div className="relative aspect-video w-full">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center aspect-video bg-secondary p-6">
              <div className="flex items-center space-x-3">
                <FileType size={24} className="text-muted-foreground" />
                <div className="text-left">
                  <p className="text-sm font-medium truncate max-w-[250px]">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
