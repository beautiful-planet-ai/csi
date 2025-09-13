import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useState } from "react";

const WaterModify = ({ waterData, waterSetData, isOpen, onClose }) => {
  const [editDialog, setEditDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedValues, setSelectedValues] = useState({
    zone: "",
    year: "",
    month: "",
  });
  const zones = [...new Set(waterData.map((item) => item.Divisions))];
  const years = [...new Set(waterData.map((item) => item.Year))];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleEdit = () => {
    const itemToEdit = waterData.find(
      (item) =>
        item.Divisions === selectedValues.zone &&
        item.Year === selectedValues.year &&
        item.Month === selectedValues.month
    );
    if (itemToEdit) {
      setSelectedData(itemToEdit);

      setEditDialog(true);
    } else {
      alert("No data found for the selected filters.");
    }
  };
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://api-csi.arahas.com/data/waterNew/${selectedData._id}`,
        selectedData,
        { headers: { "Content-Type": "application/json" } } // Specify content type if necessary
      );

      if (response.data.success) {
        onClose();
        setEditDialog(false);
        alert("Data updated successfully");
        waterSetData((prevData) =>
          prevData.map((item) =>
            item._id === response.data.data._id ? response.data.data : item
          )
        );
      }
    } catch (error) {
      console.error("Error saving data:", error); // Log error for debugging
      alert(
        error.response
          ? error.response.data.error
          : "An unexpected error occurred"
      );
    }
  };

  return (
    <>
      <Dialog
        header="Modify Data"
        isModal={true}
        visible={isOpen} // Control visibility with isOpen prop
        // close={onClose} // Handle close event
        style={{ width: "20rem" }}
        onHide={onClose}
      >
        <div className="flex flex-column align-items-center gap-2">
          <Dropdown
            value={selectedValues.zone}
            onChange={(e) =>
              setSelectedValues({ ...selectedValues, zone: e.value })
            }
            options={[
              // Use null or a specific value to indicate 'All Zones'
              ...zones.map((div) => ({ label: div, value: div })),
            ]}
            placeholder="Select Zone"
            className="w-full md:w-14rem"
          />
          <Dropdown
            value={selectedValues.year}
            onChange={(e) =>
              setSelectedValues({ ...selectedValues, year: e.value })
            }
            options={years.map((year) => ({ label: year, value: year }))}
            placeholder="Select Year"
            className="w-full md:w-14rem"
          />
          {/*  */}
          <Dropdown
            value={selectedValues.month}
            onChange={(e) =>
              setSelectedValues({ ...selectedValues, month: e.value })
            }
            options={monthNames.map((name, index) => ({
              label: name, // Display month name
              value: index + 1, // Store month number (1-12)
            }))}
            placeholder="Select Month"
            className="w-full md:w-14rem"
          />
          <Button
            label="Edit Data"
            onClick={handleEdit}
            className="bg-primary1 text-primary1 text-white text-xs"
            raised
          />
        </div>
      </Dialog>
      <Dialog
        header={
          <h2
            style={{ margin: 0, textAlign: "left" }}
            className="text-secondary2 text-lg"
          >
            Edit Data
          </h2>
        }
        visible={editDialog}
        style={{ width: "70rem" }}
        onHide={() => setEditDialog(false)}
      >
        <div className="flex align-items-start justify-content-between gap-8">
          <div className="flex flex-column gap-2">
            <h1 className="text-surface text-sm m-0 p-0">Zone</h1>
            <h1 className="text-secondary2 m-0 p-0 text-base ">
              {" "}
              {selectedValues.zone}
            </h1>
          </div>
          <div className="flex flex-column gap-2">
            <h1 className="text-surface text-sm m-0 p-0">Year</h1>
            <h1 className="text-secondary2 m-0 p-0"> {selectedValues.year}</h1>
          </div>
          <div className="flex flex-column gap-2">
            <h1 className="text-surface text-sm m-0 p-0">Month</h1>
            <h1 className="text-secondary2 m-0 p-0">
              {monthNames[selectedValues.month - 1]}
            </h1>
          </div>
        </div>
        <Divider />

        <div className="flex align-items-start flex-column gap-3 w-full">
          {/* 1: Water Supply Data Header */}
          <div className="w-full flex flex-column">
            <h3>Water Supply Data</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap w-full ">
              {["Population", "Current_Supply_MLD"].map((field, index) => {
                const customLabels = {
                  Population: "Total Population",
                  Current_Supply_MLD: "Current Water Supply (MLD)",
                };

                return (
                  <div key={index} className="flex flex-column gap-2 ">
                    <label className="text-sm text-surface-500  ">
                      {customLabels[field]}
                    </label>
                    <InputText
                      id={field.toLowerCase()}
                      value={selectedData?.[field]}
                      onChange={(e) =>
                        setSelectedData({
                          ...selectedData,
                          [field]: e.target.value,
                        })
                      }
                      placeholder={`Enter ${customLabels[field].toLowerCase()}`}
                      type={"number"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* 2: Infrastructure Data */}
          <div className="w-full flex flex-column">
            <h3>Infrastructure Data</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {["Canals", "Tanks", "Ponds", "Handpumps"].map((field, index) => {
                const customLabels = {
                  Canals: "Canals",
                  Tanks: "Tanks",
                  Ponds: "Ponds",
                  Handpumps: "Handpumps",
                };

                return (
                  <div key={index} className="flex flex-column gap-2">
                    <label className="text-sm text-surface-500 ">
                      {customLabels[field]}
                    </label>
                    <InputText
                      id={field.toLowerCase()}
                      value={selectedData?.[field]}
                      onChange={(e) =>
                        setSelectedData({
                          ...selectedData,
                          [field]: e.target.value,
                        })
                      }
                      placeholder={`Enter ${customLabels[field].toLowerCase()}`}
                      type={"number"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* 3: Household Data */}
          <div className="w-full flex flex-column">
            <h3>Household Data</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {[
                "Total_Households",
                "No_of_Households_with_Connections",
                "No_of_Households_with_Meters",
                "Households_with_Payments",
              ].map((field, index) => {
                const customLabels = {
                  Total_Households: "Total Households",
                  No_of_Households_with_Connections:
                    "Households with Connections",
                  No_of_Households_with_Meters: "Households with Water Meters",
                  Households_with_Payments:
                    "Households Participating in Bill Payments",
                };

                return (
                  <div key={index} className="flex flex-column gap-2">
                    <label className="text-sm text-surface-500 ">
                      {customLabels[field]}
                    </label>
                    <InputText
                      id={field.toLowerCase()}
                      value={selectedData?.[field]}
                      onChange={(e) =>
                        setSelectedData({
                          ...selectedData,
                          [field]: e.target.value,
                        })
                      }
                      placeholder={`Enter ${customLabels[field].toLowerCase()}`}
                      type={"number"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* 4: Rainwater Harvesting Data */}
          <div className="w-full flex flex-column">
            <h3>Rainwater Harvesting Data</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {[
                "Sites_with_Rainwater_Harvesting_System",
                "Total_Volume_Harvested",
              ].map((field, index) => {
                const customLabels = {
                  Sites_with_Rainwater_Harvesting_System:
                    "Sites with Rain Water Harvesting System",
                  Total_Volume_Harvested: "Harvested Water (m³)",
                };

                return (
                  <div key={index} className="flex flex-column gap-2">
                    <label className="text-sm text-surface-500 ">
                      {customLabels[field]}
                    </label>
                    <InputText
                      id={field.toLowerCase()}
                      value={selectedData?.[field]}
                      onChange={(e) =>
                        setSelectedData({
                          ...selectedData,
                          [field]: e.target.value,
                        })
                      }
                      placeholder={`Enter ${customLabels[field].toLowerCase()}`}
                      type={"number"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* 5: Maintenance and Awareness Programs */}
          <div className="w-full flex flex-column">
            <h3>Awareness Programs</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {["Awarness_Campaigns/Programs"].map((field, index) => {
                const customLabels = {
                  "Awarness_Campaigns/Programs": "Awareness Campaigns Launched",
                };
                return (
                  <div key={index} className="flex flex-column gap-2">
                    <label className="text-sm text-surface-500 ">
                      {customLabels[field]}
                    </label>
                    <InputText
                      id={field.toLowerCase()}
                      value={selectedData?.[field]}
                      onChange={(e) =>
                        setSelectedData({
                          ...selectedData,
                          [field]: e.target.value,
                        })
                      }
                      placeholder={`Enter ${customLabels[field].toLowerCase()}`}
                      type={"number"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          {/* 6: Infrastructure Data */}
          {/* <div className="w-full flex flex-column">
            <h3>Infrastructure Data</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {[
                "Number_of_Testing_Stations",
                "Number_of_Sample_Tested_in_Laboratories",
                "Number_of_Samples_found_contaminated_in_laboratories",
                "Temperature",
                "BOD",
                "TSS",
                "DO",
                "Conductivity",
                "WQI",
              ].map((field, index) => {
                const customLabels = {
                  Number_of_Testing_Stations: "Testing Stations",
                  Number_of_Sample_Tested_in_Laboratories: "Samples Tested",
                  Number_of_Samples_found_contaminated_in_laboratories:
                    "Contaminated Samples",
                  Temperature: "Temperature (°C)",
                  BOD: "Biological Oxygen Demand (mg/L)",
                  TSS: "Total Suspended Solids (mg/L)",
                  DO: "Dissolved Oxygen (mg/L)",
                  Conductivity: "Conductivity (μS/cm)",
                  WQI: "Water Quality Index",
                };
                return (
                  <div key={index} className="flex flex-column gap-2">
                    <label className="text-sm text-surface-500 ">
                      {customLabels[field]}
                    </label>
                    <InputText
                      id={field.toLowerCase()}
                      value={selectedData?.[field]}
                      onChange={(e) =>
                        setSelectedData({
                          ...selectedData,
                          [field]: e.target.value,
                        })
                      }
                      placeholder={`Enter ${customLabels[field].toLowerCase()}`}
                      type={"number"}
                    />
                  </div>
                );
              })}
            </div>
          </div> */}
          <div className="flex align-items-center justify-content-end  w-full">
            <Button
              label="Update"
              onClick={handleSave}
              className="bg-primary1 text-primary1 text-white text-xs"
              raised
            />
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default WaterModify;
