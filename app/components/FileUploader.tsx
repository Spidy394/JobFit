import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "../lib/utils";

interface FileUploaderProps {
  onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;

      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: maxFileSize,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="w-full p-1 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 shadow-lg">
      <div
        {...getRootProps()}
        className={`bg-white rounded-xl p-8 flex flex-col items-center justify-center border-2 border-dashed transition-all duration-300 ${isDragActive
          ? "border-primary-500 bg-primary-50"
          : "border-gray-300 bg-white"
        }`}
      >
        <input {...getInputProps()} />

        <div className="space-y-4 cursor-pointer w-full">
          {file ? (
            <div
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <img src="/images/pdf.png" alt="pdf" className="size-10" />
              <div className="flex items-center space-x-3">
                <div>
                  <p className="text-base font-medium text-gray-800 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatSize(file.size)}
                  </p>
                </div>
              </div>
              <button
                className="p-2 cursor-pointer text-gray-500 hover:text-gray-700 transition-colors"
                onClick={(e) => {
                  onFileSelect?.(null);
                }}
              >
                <img src="/icons/cross.svg" alt="remove" className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                <img src="/icons/info.svg" alt="upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-700 mb-1">
                <span className="font-semibold text-primary-600">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-sm text-gray-500">
                PDF (max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default FileUploader;
