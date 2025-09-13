import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useState } from "react";

const Upload = ({ visible, onHide, parameter }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message

  const handleUpload = async () => {
    try {
      if (!file) {
        setErrorMessage("No file chosen. Please select a file to upload.");
        return;
      }

      setLoading(true);
      setErrorMessage(""); // Clear any previous error message

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `https://api-csi.arahas.com/upload/${parameter}`,
        // `http://localhost:8010/upload/${parameter}`,
        formData
      );

      if (response.status === 200) {
        setLoading(false);
        alert("File uploaded successfully!");
        onHide(); // Close dialog after successful upload
      } else {
        setLoading(false);
        setErrorMessage(`Upload failed with status: ${response.status}`);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Upload error (server response):", error.response.data);
        setErrorMessage(
          error.response.data.msg || "Upload failed due to server error."
        ); // Display the error message from the backend
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Upload error (no response):", error.request);
        setErrorMessage("No response from server. Please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Upload error (general):", error.message);
        setErrorMessage("Error uploading file.");
      }
    }
  };

  const handleDownloadTemplate = () => {
    // URL of the Excel template file in the public directory
    var url = "";
    if (parameter === "waterNew") {
      url = `${process.env.PUBLIC_URL}/Water_New_Template.xlsx`;
    }
    if (parameter === "aqinew") {
      url = `${process.env.PUBLIC_URL}/AQI_Template.xlsx`;
    }
    if (parameter === "transport") {
      url = `${process.env.PUBLIC_URL}/Transport.xlsx`;
    }
    if (parameter === "healthcare") {
      url = `${process.env.PUBLIC_URL}/Healthcare.xlsx`;
    }
    if (parameter === "waste") {
      url = `${process.env.PUBLIC_URL}/Waste.xlsx`;
    }

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "template.xlsx"); // Set the name for the downloaded file

    // Append to body, trigger click and remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link); // Clean up
  };

  return (
    <Dialog
      header="Upload File"
      visible={visible}
      style={{ width: "55vw", fontSize: "2rem" }}
      onHide={onHide}
      className="font-bold text-xl"
    >
      <div className="w-full flex align-items-start justify-content-center gap-4 flex-column p-2">
        {loading && (
          <ProgressSpinner
            style={{ width: "50px", height: "50px" }}
            strokeWidth="8"
            fill="var(--surface-ground)"
          />
        )}
        {!loading && (
          <>
            {errorMessage && (
              <div className="p-error p-0 m-0">Error: {errorMessage}</div> // Display error message
            )}
            <div className="flex align-items-center justify-content-between w-full">
              <p className="font-medium text-secondary2 p-0 m-0">
                Use the provided template for your data. Download, fill, and
                then upload.
              </p>
              <Button
                label="Template"
                icon="pi pi-download"
                onClick={handleDownloadTemplate}
                className="bg-transparent text-primary1 border-1"
                // Attach download handler
              />
            </div>
            <FileUpload
              name="file"
              auto
              customUpload
              accept=".xlsx, .xls"
              uploadHandler={(event) => {
                setFile(event.files[0]);
              }}
              emptyTemplate={<p>Please upload the excel file</p>}
              className="w-full"
            />
            <div className="flex w-full align-items-end justify-content-end">
              <Button
                onClick={handleUpload}
                label="Upload File"
                className="bg-primary1 text-white"
                raised
              ></Button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
};

export default Upload;
