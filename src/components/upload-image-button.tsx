"use client";
import { S3UploadResponse } from "@/types";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

export default function ImageUploadButton({
  onSuccess,
  onError,
  children,
}: {
  children?: React.ReactNode;
  onSuccess?: (data: S3UploadResponse) => void;
  onError?: (error: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      const error = 'Please select an image file';
      toast.error(error);
      if (onError) onError(error);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      const error = 'Image size must be less than 5MB';
      toast.error(error);
      if (onError) onError(error);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setIsUploading(true);
    toast.loading('Uploading image...');

    try {
      const res = await fetch(
        "https://ultratec-admin-backend.onrender.com/api/v1/helper/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );

      toast.dismiss();

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = (await res.json()) as S3UploadResponse;

      console.log('Upload response:', data);

      if (data.error) {
        throw new Error(data.message || 'Upload failed');
      }

      if (onSuccess) {
        onSuccess(data);
      }
    } catch (err: any) {
      console.error("Upload failed:", err);
      const errorMessage = err?.message || 'Failed to upload image';
      toast.error(errorMessage);
      if (onError) onError(errorMessage);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div onClick={!isUploading ? handleClick : undefined} className={isUploading ? 'cursor-wait' : ''}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
        disabled={isUploading}
      />
      {children}
    </div>
  );
}
