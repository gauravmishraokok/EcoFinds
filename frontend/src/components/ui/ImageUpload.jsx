import React, { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import Button from './Button';

const ImageUpload = ({ images = [], onImagesChange, maxImages = 5, maxSizeMB = 10 }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = [];
    const errors = [];

    fileArray.forEach(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name} is not an image file`);
        return;
      }

      // Check file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        errors.push(`${file.name} is larger than ${maxSizeMB}MB`);
        return;
      }

      // Check total images limit
      if (images.length + validFiles.length >= maxImages) {
        errors.push(`Maximum ${maxImages} images allowed`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert(errors.join('\n'));
    }

    if (validFiles.length > 0) {
      // Convert files to base64 data URLs
      validFiles.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          // Store the base64 data URL directly
          const newImages = [...images, e.target.result];
          onImagesChange(newImages);
        };
        reader.readAsDataURL(file);
      });
    }
  };


  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-primary-500 bg-primary-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
        
        <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-600 mb-2">
          {dragActive ? 'Drop images here' : 'Upload product images'}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          PNG, JPG up to {maxSizeMB}MB each (max {maxImages} images)
        </p>
        <Button type="button" variant="outline" onClick={openFileDialog}>
          <Upload className="h-4 w-4 mr-2" />
          Choose Files
        </Button>
      </div>

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            Uploaded Images ({images.length}/{maxImages})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center">
                  {index === 0 ? 'Main' : index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
