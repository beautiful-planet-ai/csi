import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";

const WasteModify = ({ wasteData, wasteSetData, isOpen, onClose }) => {
  const [editDialog, setEditDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedValues, setSelectedValues] = useState({
    zone: "",
    year: "",
    month: "",
  });

  const zones = [...new Set(wasteData.map((item) => item.Zone))];
  const years = [...new Set(wasteData.map((item) => item.Year))];
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
    const itemToEdit = wasteData.find(
      (item) =>
        item.Zone === selectedValues.zone &&
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
        `https://api-csi.arahas.com/data/waste/${selectedData._id}`, //  API endpoint for updating waste data
        selectedData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        onClose();
        setEditDialog(false);
        alert("Data updated successfully");
        wasteSetData((prevData) =>
          prevData.map((item) =>
            item._id === response.data.data._id ? response.data.data : item
          )
        );
      }
    } catch (error) {
      console.error("Error saving data:", error);
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
        header="Modify Waste Data"
        isModal={true}
        visible={isOpen}
        style={{ width: "20rem" }}
        onHide={onClose}
      >
        <div className="flex flex-column align-items-center gap-2">
          <Dropdown
            value={selectedValues.zone}
            onChange={(e) =>
              setSelectedValues({ ...selectedValues, zone: e.value })
            }
            options={zones.map((zone) => ({
              label: zone,
              value: zone,
            }))}
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
          <Dropdown
            value={selectedValues.month}
            onChange={(e) =>
              setSelectedValues({ ...selectedValues, month: e.value })
            }
            options={monthNames.map((name, index) => ({
              label: name,
              value: index + 1,
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
            Edit Waste Data
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
          {/* 1: Waste Generation Data */}
          <div className="w-full flex flex-column">
            <h3>Waste Generation Data</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap w-full ">
              {[
                "Total_Waste_Generated",
                "Waste_generated_per_capita_per_day",
                "Residential",
                "Commercial",
                "Institutional",
                "Others",
              ].map((field, index) => {
                const customLabels = {
                  Total_Waste_Generated: "Total Waste Generated (MT)",
                  Waste_generated_per_capita_per_day:
                    "Waste Per Capita Per Day (kg)",
                  Residential: "Residential Waste (MT)",
                  Commercial: "Commercial Waste (MT)",
                  Institutional: "Institutional Waste (MT)",
                  Others: "Other Waste (MT)",
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
          {/* 2: Waste Collection Data */}
          <div className="w-full flex flex-column">
            <h3>Waste Collection Data</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {[
                // "Total_Waste_Collected",
                "Door_to_door",
                "Community_Bins",
                // "Street_Sweeping",
                "Other_waste_collected",
              ].map((field, index) => {
                const customLabels = {
                  //   Total_Waste_Collected: "Total Waste Collected (MT)",
                  Door_to_door: "Door-to-Door Collection (MT)",
                  Community_Bins: "Community Bins Collection (MT)",
                  //   Street_Sweeping: "Street Sweeping (MT)",
                  Other_waste_collected: "Other Collection Methods (MT)",
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
          {/* 3: Transportation Data */}
          <div className="w-full flex flex-column">
            <h3>Transportation Data</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {[
                "No_of_Transport_or_Vehicles",
                "Avg_Capacity_of_Transport",
                "Avg_no_of_staff_members",
                // "Fuel_Consumption",
              ].map((field, index) => {
                const customLabels = {
                  No_of_Transport_or_Vehicles: "Number of Vehicles",
                  Avg_Capacity_of_Transport: "Avg Vehicle Capacity (MT)",
                  Avg_no_of_staff_members: "Avg Staff Members",
                  //   Fuel_Consumption: "Fuel Consumption (L)",
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
          {/* 4: Processing Data */}
          <div className="w-full flex flex-column">
            <h3>Processing Data</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {[
                "No_of_processing_plants",
                "Avg_capacity_of_plants",
                "Percent_of_waste_processed",
                // "Composting",
                // "Recycling",
                // "Energy_Recovery",
                // "Other_Processing",
              ].map((field, index) => {
                const customLabels = {
                  No_of_processing_plants: "Number of Plants",
                  Avg_capacity_of_plants: "Avg Plant Capacity (MT)",
                  Percent_of_waste_processed: "Waste Processed (%)",
                  //   Composting: "Composting (MT)",
                  //   Recycling: "Recycling (MT)",
                  //   Energy_Recovery: "Energy Recovery (MT)",
                  //   Other_Processing: "Other Processing (MT)",
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
          {/* 5. Waste Composition */}
          <div className="w-full flex flex-column">
            <h3>Waste Composition</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {[
                "Green_waste",
                "Debris_and_silt",
                "Biodegradable",
                "Recyclable",
              ].map((field, index) => {
                const customLabels = {
                  Green_waste: "Green Waste",
                  Debris_and_silt: "Debris and Silt",
                  Biodegradable: "Biodegradable Waste",
                  Recyclable: "Recyclable Waste",
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

export default WasteModify;
