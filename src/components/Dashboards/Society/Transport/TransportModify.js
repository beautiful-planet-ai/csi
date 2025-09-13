import axios from "axios";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import React from "react";
import { useState } from "react";

const TransportModify = ({
  transportData,
  transportSetData,
  isOpen,
  onClose,
}) => {
  const [selectedValues, setSelectedValues] = useState({
    route: "",
    year: "",
    month: "",
  });
  const [selectedData, setSelectedData] = useState(null);
  const [editDialog, setEditDialog] = useState(false);
  const routes = [...new Set(transportData.map((item) => item.Route_Name))];
  const years = [...new Set(transportData.map((item) => item.Year))];
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
    console.log("Clicked");
    const itemToEdit = transportData.find(
      (item) =>
        item.Route_Name === selectedValues.route &&
        item.Year === selectedValues.year &&
        item.Month === selectedValues.month
    );
    if (itemToEdit) {
      setSelectedData(itemToEdit);
      console.log(itemToEdit);
      setEditDialog(true);
    } else {
      alert("No data found for the selected filters.");
    }
  };
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://api-csi.arahas.com/data/transport/${selectedData._id}`,
        selectedData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        setEditDialog(false);
        onClose();
        alert("Data updated successfully");
        transportSetData((prevData) =>
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
            value={selectedValues.route}
            onChange={(e) =>
              setSelectedValues({ ...selectedValues, route: e.value })
            }
            options={[
              // Use null or a specific value to indicate 'All Zones'
              ...routes.map((div) => ({ label: div, value: div })),
            ]}
            placeholder="Select Route"
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
            <h1 className="text-surface text-sm m-0 p-0">Route</h1>
            <h1 className="text-secondary2 m-0 p-0 text-base ">
              {" "}
              {selectedValues.route}
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
          {/* 1: Buses in Operation Header */}
          <div className="w-full flex flex-column">
            <h3>Buses in Operation</h3>

            <div className="flex flex-column gap-3">
              <div className="flex align-items-center justify-content-start gap-4 flex-wrap w-full ">
                {[
                  "No_of_Public_Buses",
                  "No_of_Semi_Public_Buses",
                  "Disabled_Friendly_Buses",
                ].map((field, index) => {
                  const customLabels = {
                    No_of_Public_Buses: "Public Buses",
                    No_of_Semi_Public_Buses: "Semi-Public Buses",
                    Disabled_Friendly_Buses: "Disable-Friendly Buses",
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
                        placeholder={`Enter ${customLabels[
                          field
                        ].toLowerCase()}`}
                        type={"number"}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex align-items-center justify-content-start gap-4 flex-wrap w-full ">
                {["Electric", "Hybrid", "Diesel", "Petrol"].map(
                  (field, index) => {
                    const customLabels = {
                      Electric: "Electric Buses",
                      Hybrid: "Hybrid Buses",
                      Diesel: "Diesel Buses",
                      Petrol: "Petrol Buses",
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
                          placeholder={`Enter ${customLabels[
                            field
                          ].toLowerCase()}`}
                          type={"number"}
                        />
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
          {/* 2: Availability */}
          <div className="w-full flex flex-column">
            <h3>Availability</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {["Avg_Passenger_Count", "Total_coaches_on_any_day"].map(
                (field, index) => {
                  const customLabels = {
                    Avg_Passenger_Count: "Avg. Passenger Count",
                    Total_coaches_on_any_day: "Total coaches on any day",
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
                        placeholder={`Enter ${customLabels[
                          field
                        ].toLowerCase()}`}
                        type={"number"}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {/* 3: Maintenance */}
          <div className="w-full flex flex-column">
            <h3>Maintenance Data</h3>

            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {[
                "Buses_older_than_7_years",
                "Buses_older_than_5_years",
                "Buses_going_for_Maintenance",
              ].map((field, index) => {
                const customLabels = {
                  Buses_older_than_7_years: "Buses older Than 7 Years",
                  Buses_older_than_5_years: "Buses older Than 5 Years",
                  Buses_going_for_Maintenance: "Under maintenance Buses",
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
          {/* 4: Route analysis */}
          <div className="w-full flex flex-column">
            <h3>Route Analysis</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {["Charging_Stations", "No_of_Accident_Cases"].map(
                (field, index) => {
                  const customLabels = {
                    Charging_Stations: "Charging Stations",
                    No_of_Accident_Cases: "Accidents",
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
                        placeholder={`Enter ${customLabels[
                          field
                        ].toLowerCase()}`}
                        type={"number"}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {/* 5:Peak Hour */}
          <div className="w-full flex flex-column">
            <h3>Peak Hour</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {["Three_Wheeler_P", "Two_Wheeler_P", "Bus_P"].map(
                (field, index) => {
                  const customLabels = {
                    // Peak_Hour: "Peak Hour",
                    Three_Wheeler_P: "Three Wheelers",
                    Two_Wheeler_P: "Two Wheelers",
                    Bus_P: "Buses",
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
                        placeholder={`Enter ${customLabels[
                          field
                        ].toLowerCase()}`}
                        type={"number"}
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
          {/* 6: Non-Peak Hour */}
          <div className="w-full flex flex-column">
            <h3>Non-Peak Hour</h3>
            <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
              {[
                // "Non_Peak_Hour",
                "Three_Wheeler_NP",
                "Two_Wheeler_NP",
                "Bus_NP",
              ].map((field, index) => {
                const customLabels = {
                  //   Non_Peak_Hour: "Peak Hour",
                  Three_Wheeler_NP: "Three Wheelers",
                  Two_Wheeler_NP: "Two Wheelers",
                  Bus_NP: "Buses",
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
export default TransportModify;
