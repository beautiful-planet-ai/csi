import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

// forwardRef to expose openDialog method to the parent component
const UserDialog = forwardRef(({ onSuccess }, ref) => {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useImperativeHandle(ref, () => ({
    openDialog() {
      setVisible(true);
    },
  }));

  const closeDialog = () => {
    setVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      onSuccess("Thank you! Our team will get in touch with you soon.");
      setFormData({ name: "", email: "", message: "" });
      setVisible(false);
    }
  };

  const footer = (
    <div>
      <Button
        label="Submit"
        onClick={handleSubmit}
        className="bg-theme"
        raised
      />
      <Button
        label="Cancel"
        onClick={closeDialog}
        className="text-primary2 bg-white"
        raised
      />
    </div>
  );

  const customHeader = (
    <div className="flex justify-content-between align-items-center">
      <h3 className="text-theme text-xl m-0 font-bold text-primary1">
        Get in Touch
      </h3>
      {/* <Button icon="pi pi-times" onClick={closeDialog} className="p-button-rounded p-button-text" /> */}
    </div>
  );

  return (
    <>
      <Dialog
        header={customHeader}
        visible={visible}
        style={{ width: "25vw" }}
        footer={footer}
        onHide={closeDialog}
      >
        <div className="p-field mb-3">
          <label htmlFor="name">Name</label>
          <InputText
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div className="p-field mb-3">
          <label htmlFor="email">Email</label>
          <InputText
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        <div className="p-field">
          <label htmlFor="message">Message</label>
          <InputText
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
      </Dialog>
    </>
  );
});

export default UserDialog;
