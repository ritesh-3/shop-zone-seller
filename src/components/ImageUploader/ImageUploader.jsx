import React, { useEffect, useState } from 'react';
import { useImageUploader } from './ImageUploaderHook';
import './imageUploader.css'
import uploadImagePng from '../../assets/upload-image-icon.png'
import { toast } from 'react-toastify';

/**
 *   
 * @description Image Uploader which uploads images
 * to firebase storage and returns back upladed imgs download url
 * @param folderName
 * @param onImagesUploaded
 */
const ImageUploader = ({ onImagesUploaded, folderName, resetUploads }) => {
  const [uploadedImages, setuploadedImages] = useState([]);
  const {
    removeFromPreview,
    error,
    selectedImages,
    uploading,
    handleFileChange,
    uploadImages,
  } = useImageUploader(folderName);

  useEffect(
    () => {
      if (resetUploads) setuploadedImages([]);
    }, [resetUploads]
  )

  const handleUpload = async () => {
    let uploadPromise = uploadImages().then(
      (res) => {
        if (res && res.length > 0) {
          setuploadedImages((prevImages) => [...prevImages, ...res]);
          onImagesUploaded([...uploadedImages, ...res]);
          toast.success("Images Uploaded Successfully...")
        }
      }
    ).catch(err => {
      console.log(err)
      toast.error("Error occured while uploading")
    })
  };


  return (
    <div className="image-uploader">
      <div className="image-uploader__input-wrapper">

        <span className="image-uploader__upload-icon">
          <input
            type="file"
            id="imageUpload"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="image-uploader__input"
          />
          <img width='80px' src={uploadImagePng} alt="Upload" />
        </span>
      </div>
      {selectedImages.length > 0 && (
        <div className="image-uploader__preview">
          {selectedImages.length > 0 && (
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-4 mt-2">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img width={200} src={URL.createObjectURL(image)} alt="Selected" />
                    <button
                      onClick={() => removeFromPreview(image)}
                      className="absolute top-[1px] right-[1px] text-gray-600 bg-none hover:bg-[transparent!important] hover:text-rose-400 rounded-full focus:outline-none"
                    >
                      <span className="material-symbols-outlined"> close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {uploadedImages && uploadedImages.length > 0 && (
        <div className="mb-4">
          Uploaded Images :
          <div className="grid grid-cols-3 gap-4 mt-2">
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <img width={150} src={image} alt="Selected" />
                {/* <button
                  onClick={() => removeFromPreview(image)}
                  className="absolute top-[1px] right-[1px] text-gray-600 bg-none hover:bg-[transparent!important] hover:text-rose-400 rounded-full focus:outline-none"
                >
                  <span className="material-symbols-outlined"> close</span>
                </button> */}
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <p className="image-uploader__error">Error: {error.message}</p>}
      <button
        onClick={handleUpload}
        disabled={selectedImages.length === 0 || uploading}
        className="image-uploader__button"
      >
        {uploading ? "Uploading..." : "upload"}
      </button>
    </div>
  );
};

export default ImageUploader;
