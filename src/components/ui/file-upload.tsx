'use client';

import * as React from 'react';
import { UploadCloud, File, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileUploadProps {
  onFileSelect?: (file: File) => void;
  accept?: string;
  maxSizeMB?: number;
}

export function FileUpload({ onFileSelect, accept = 'image/*', maxSizeMB = 5 }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [dragActive, setDragActive] = React.useState(false);

  const handleFile = (file: File) => {
    if (file.size > maxSizeMB * 1024 * 1024) {
      alert(`File size exceeds ${maxSizeMB}MB limit.`);
      return;
    }
    setSelectedFile(file);
    onFileSelect?.(file);
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragActive(false);
            if (e.dataTransfer.files?.[0]) {
              handleFile(e.dataTransfer.files[0]);
            }
          }}
          className={cn(
            'flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-800 bg-[#0A0E1A] p-6 text-center transition-colors cursor-pointer hover:border-brand-500/50 hover:bg-[#0E1422]',
            dragActive && 'border-brand-500 bg-brand-500/5'
          )}
        >
          <input
            type="file"
            accept={accept}
            className="hidden"
            id="file-upload-input"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFile(e.target.files[0]);
            }}
          />
          <label htmlFor="file-upload-input" className="cursor-pointer flex flex-col items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 mb-3">
              <UploadCloud className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-slate-200">
              <span className="text-brand-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max {maxSizeMB}MB)</p>
          </label>
        </div>
      ) : (
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-[#0E1422] p-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-brand-400">
              <File className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-200 truncate max-w-[200px]">
                {selectedFile.name}
              </p>
              <p className="text-xs text-slate-500">
                {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <button
            onClick={() => setSelectedFile(null)}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
