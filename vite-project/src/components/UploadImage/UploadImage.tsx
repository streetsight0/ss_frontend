import { useState } from "react";
import { useLocation } from "react-router-dom";

interface UploadImagesProps {
  onImagesSelected: (files: File[]) => void;
}

const UploadImages = ({ onImagesSelected }: UploadImagesProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const location = useLocation();
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
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "10px",
          background: "#fff",
          border: "2px solid #e0e0e0",
          borderRadius: "8px",
          padding: "10px",
          minHeight: "100px",
          width: "37vw",
        }}
      >
      <input type="file" multiple accept="image/*" onChange={handleImageChange} />
      <div style={{
              width: "80px",
              height: "80px",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid #ddd",
            }}>
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
    </div>
  );
};

export default UploadImages;
