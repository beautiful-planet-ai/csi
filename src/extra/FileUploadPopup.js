import React, { useState } from "react";
import axios from "axios";
import "./FileUpload.css"; // Import CSS file for FileUploadPopup component styling
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const FileUploadPopup = ({
  onClose,
  onUpload,
  department,
  action,
  subCategory,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    setSelectedFile(event.dataTransfer.files[0]);
  };

  const handleBrowseClick = () => {
    document.getElementById("file-input").click();
  };

  const handleSubmit = async () => {
    console.log("Submit button clicked"); // Debugging statement
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append("file", selectedFile); // Ensure the key 'file' matches the key expected by the backend

        const response = await axios.post(
          `http://localhost:8009/${action}/${department}/${subCategory}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("File uploaded successfully"); // Debugging statement
        console.log(response.data); // Log the response from the backend
        onUpload(selectedFile);
        onClose();
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="file-upload-popup-container">
      <div
        className={`file-upload-popup ${dragging ? "dragging" : ""}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <CloseIcon className="close-icon" onClick={onClose} />

        <input
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }} // Hide default file input
          id="file-input" // Added id for the label's htmlFor attribute
        />
        <label className="drop-area" htmlFor="file-input">
          {selectedFile ? (
            selectedFile.name
          ) : (
            <React.Fragment>
              <CloudUploadIcon style={{ height: "6vw", width: "20vw" }} /> Drag
              & Drop to Upload
            </React.Fragment>
          )}
          <button className="browse-button" onClick={handleBrowseClick}>
            Browse
          </button>
        </label>

        <div className="button-container">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default FileUploadPopup;
