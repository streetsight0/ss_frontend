import { useState } from "react";
import { useLocation } from "react-router-dom";

interface UploadImagesProps {
  onImagesSelected: (files: File[]) => void;
}

const UploadImages = ({ onImagesSelected }: UploadImagesProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const location = useLocation();

  // Adjust height based on the current page
  const containerHeight = location.pathname === "/client" ? "150px" : "100px";
  const containerwidth = location.pathname === "/client" ? "150px" : "200px";

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
      setPreviewImages(previewUrls);
      onImagesSelected(fileArray);
    }
  };

  return (
    <div className="upload-images-container" style={{ width: 300, height: 300 }}>
      <label>Upload Images:</label>
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />
      <div className="image-preview">
        {previewImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Preview ${index}`}
            className="preview-image"
            style={{ width:containerwidth, height: containerHeight }}
          />
        ))}
      </div>
    </div>
  );
};

export default UploadImages;
