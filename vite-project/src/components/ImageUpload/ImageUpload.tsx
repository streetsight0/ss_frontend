import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import "../../pages/AddCampaign/AddCampaign.css"; 

interface ImageUploadProps {
  maxImages?: number;
  onImagesChange: (images: File[]) => void;
  resetTrigger?: number; 
}

const ImageUpload: React.FC<ImageUploadProps> = ({ maxImages = 5, onImagesChange, resetTrigger }) => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    
    const newFiles = Array.from(event.target.files).slice(0, maxImages - images.length);
    const updatedImages = [...images, ...newFiles];

    setImages(updatedImages);
    onImagesChange(updatedImages); 
  };

  useEffect(() => {
    if (resetTrigger === 0) {
      setImages([]); 
    }
  }, [resetTrigger]);

  return (
    <Box className="upload-container">
      <h3 className="UploadImageTitle">Upload images</h3>
      <Box className="image-grid">
        {images.map((file, index) => (
          <Box key={index} className="image-preview">
            <img src={URL.createObjectURL(file)} alt="upload preview" />
          </Box>
        ))}
        {images.length < maxImages && (
          <label htmlFor="file-upload" className="upload-box">
            <CloudUpload fontSize="large" className="upload-icon" />
            <input id="file-upload" type="file" accept="image/*" multiple onChange={handleImageUpload} />
          </label>
        )}
      </Box>
    </Box>
  );
};

export default ImageUpload;

