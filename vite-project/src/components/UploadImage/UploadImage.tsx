import { useState } from "react";

interface UploadImagesProps {
  onImagesSelected: (files: File[]) => void;
}

const UploadImages = ({ onImagesSelected }: UploadImagesProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>([]);

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
    <div className="upload-images-container">
      <label>Upload Images:</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />
      <div className="image-preview">
        {previewImages.map((src, index) => (
          <img key={index} src={src} alt={`Preview ${index}`} className="preview-image" style={{ width: "250px", height: "250px" }} />
        ))}
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default UploadImages;
=======
export default UploadImages;
>>>>>>> 00fb98199a544a79957ab1b2277f2e271fd44efa
