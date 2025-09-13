import React, { useState, useEffect } from "react";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";

const HealthcareModify = ({ isOpen, onClose, healthSetData, healthData }) => {
  const [year, setYear] = useState(null);
  const [years, setYears] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    // Extract unique years from the healthcare data
    if (healthData) {
      const uniqueYears = [...new Set(healthData.map((item) => item.Year))];
      const sortedYears = uniqueYears.sort((a, b) => a - b); // Sort years in ascending order
      setYears(sortedYears.map((year) => ({ label: year, value: year })));
    }
  }, [healthData]);

  useEffect(() => {
    // Update selectedData when the selected year changes
    if (year && healthData) {
      const dataForYear = healthData.find((item) => item.Year === year);
      setSelectedData(dataForYear || {});
    }
  }, [year, healthData]);

  const handleYearChange = (e) => {
    setYear(e.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://api-csi.arahas.com/data/healthcare/${selectedData._id}`,
        selectedData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        onClose();
        alert("Data updated successfully");
        healthSetData((prevData) =>
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

  const dialogFooter = (
    <div>
      {/* <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={onClose}
        className="p-button-text"
      /> */}
      <Button
        label="Save"
        icon="pi pi-check"
        onClick={handleSave}
        // loading={loading}
        // disabled={loading}
        autoFocus
        className="bg-primary1 text-primary1 text-white text-xs"
      />
    </div>
  );

  return (
    <Dialog
      header="Modify Healthcare Data"
      visible={isOpen}
      style={{ width: "80vw", maxWidth: "900px" }}
      footer={dialogFooter}
      onHide={onClose}
      maximizable
    >
      {years.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div className="p-fluid">
          <div className="p-field">
            <label htmlFor="year">Year</label>
            <Dropdown
              inputId="year"
              value={year}
              options={years}
              onChange={handleYearChange}
              placeholder="Select a Year"
              style={{ width: "100%" }}
            />
          </div>

          {year && (
            <div>
              {/* Category 1: Institutes */}
              <div className="w-full flex flex-column">
                <h3>Healthcare Institutes</h3>
                <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
                  {[
                    "Healthcare_Institutes",
                    "Laboratories",
                    "Government_Institutes",
                    "Private_Institutes",
                  ].map((field, index) => {
                    const customLabels = {
                      Healthcare_Institutes: "Healthcare Institutes",
                      Laboratories: "Laboratories",
                      Government_Institutes: "Government Institutes",
                      Private_Institutes: "Private Institutes",
                    };

                    return (
                      <div key={index} className="flex flex-column gap-2">
                        <label className="text-sm text-surface-500 ">
                          {customLabels[field]}
                        </label>
                        <InputText
                          id={field.toLowerCase()}
                          value={selectedData?.[field] || ""}
                          onChange={(e) =>
                            setSelectedData({
                              ...selectedData,
                              [field]: e.target.value,
                            })
                          }
                          placeholder={`Enter ${customLabels[
                            field
                          ].toLowerCase()}`}
                          type="number"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 2: Resources */}
              <div className="w-full flex flex-column">
                <h3>Healthcare Resources</h3>
                <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
                  {["Hospital_Beds", "Doctors", "Nurses", "Medical_Staff"].map(
                    (field, index) => {
                      const customLabels = {
                        Hospital_Beds: "Hospital Beds",
                        Doctors: "Doctors",
                        Nurses: "Nurses",
                        Medical_Staff: "Medical Staff",
                      };

                      return (
                        <div key={index} className="flex flex-column gap-2">
                          <label className="text-sm text-surface-500 ">
                            {customLabels[field]}
                          </label>
                          <InputText
                            id={field.toLowerCase()}
                            value={selectedData?.[field] || ""}
                            onChange={(e) =>
                              setSelectedData({
                                ...selectedData,
                                [field]: e.target.value,
                              })
                            }
                            placeholder={`Enter ${customLabels[
                              field
                            ].toLowerCase()}`}
                            type="number"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>

              {/* Category 3: Patient Demographics */}
              <div className="w-full flex flex-column">
                <h3>Patient Demographics</h3>
                <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
                  {[
                    "Patients_0_18",
                    "Patients_19_35",
                    "Patients_36_60",
                    "Patients_61_above",
                  ].map((field, index) => {
                    const customLabels = {
                      Patients_0_18: "Patients 0-18",
                      Patients_19_35: "Patients 19-35",
                      Patients_36_60: "Patients 36-60",
                      Patients_61_above: "Patients 61+",
                    };

                    return (
                      <div key={index} className="flex flex-column gap-2">
                        <label className="text-sm text-surface-500 ">
                          {customLabels[field]}
                        </label>
                        <InputText
                          id={field.toLowerCase()}
                          value={selectedData?.[field] || ""}
                          onChange={(e) =>
                            setSelectedData({
                              ...selectedData,
                              [field]: e.target.value,
                            })
                          }
                          placeholder={`Enter ${customLabels[
                            field
                          ].toLowerCase()}`}
                          type="number"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 4: Vaccinations */}
              <div className="w-full flex flex-column">
                <h3>Vaccinations</h3>
                <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
                  {[
                    "Vaccination_Newborn_Baby_Immunization",
                    "Flu_Vaccinations",
                    "Cervical_Cancer_Vaccinations",
                  ].map((field, index) => {
                    const customLabels = {
                      Vaccination_Newborn_Baby_Immunization:
                        "Newborn Baby Immunization",
                      Flu_Vaccinations: "Flu Vaccinations",
                      Cervical_Cancer_Vaccinations:
                        "Cervical Cancer Vaccinations",
                    };

                    return (
                      <div key={index} className="flex flex-column gap-2">
                        <label className="text-sm text-surface-500 ">
                          {customLabels[field]}
                        </label>
                        <InputText
                          id={field.toLowerCase()}
                          value={selectedData?.[field] || ""}
                          onChange={(e) =>
                            setSelectedData({
                              ...selectedData,
                              [field]: e.target.value,
                            })
                          }
                          placeholder={`Enter ${customLabels[
                            field
                          ].toLowerCase()}`}
                          type="number"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 5: Mortality Rates */}
              <div className="w-full flex flex-column">
                <h3>Mortality Rates</h3>
                <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
                  {[
                    "Mortality_Rate_Infants",
                    "Mortality_Rate_Pregnant_Ladies",
                  ].map((field, index) => {
                    const customLabels = {
                      Mortality_Rate_Infants: "Infant Mortality Rate",
                      Mortality_Rate_Pregnant_Ladies:
                        "Pregnant Ladies Mortality Rate",
                    };

                    return (
                      <div key={index} className="flex flex-column gap-2">
                        <label className="text-sm text-surface-500 ">
                          {customLabels[field]}
                        </label>
                        <InputText
                          id={field.toLowerCase()}
                          value={selectedData?.[field] || ""}
                          onChange={(e) =>
                            setSelectedData({
                              ...selectedData,
                              [field]: e.target.value,
                            })
                          }
                          placeholder={`Enter ${customLabels[
                            field
                          ].toLowerCase()}`}
                          type="number"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 6: Diseases */}
              <div className="w-full flex flex-column">
                <h3>Diseases</h3>
                <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
                  {[
                    "Malaria",
                    "Japanese_encephalitis",
                    "Acute_Encephalitis_Syndrome",
                    "Dengue",
                    "Chikungunia",
                    "TB",
                    "Heart_Disease",
                    "Diabetes",
                    "Respiratory_Illness",
                  ].map((field, index) => {
                    const customLabels = {
                      Malaria: "Malaria",
                      Japanese_encephalitis: "Japanese Encephalitis",
                      Acute_Encephalitis_Syndrome:
                        "Acute Encephalitis Syndrome",
                      Dengue: "Dengue",
                      Chikungunia: "Chikengunia",
                      TB: "Tuberculosis (TB)",
                      Heart_Disease: "Heart Disease",
                      Diabetes: "Diabetes",
                      Respiratory_Illness: "Respiratory Illness",
                    };

                    return (
                      <div key={index} className="flex flex-column gap-2">
                        <label className="text-sm text-surface-500 ">
                          {customLabels[field]}
                        </label>
                        <InputText
                          id={field.toLowerCase()}
                          value={selectedData?.[field] || ""}
                          onChange={(e) =>
                            setSelectedData({
                              ...selectedData,
                              [field]: e.target.value,
                            })
                          }
                          placeholder={`Enter ${customLabels[
                            field
                          ].toLowerCase()}`}
                          type="number"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 7: Suicide Cases */}
              <div className="w-full flex flex-column">
                <h3>Suicide Cases</h3>
                <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
                  {[
                    "Suicide_Cases_10_24",
                    "Suicide_Cases_25_44",
                    "Suicide_Cases_44_64",
                    "Suicide_Cases_64_above",
                  ].map((field, index) => {
                    const customLabels = {
                      Suicide_Cases_10_24: "Suicide Cases (10-24)",
                      Suicide_Cases_25_44: "Suicide Cases (25-44)",
                      Suicide_Cases_44_64: "Suicide Cases (44-64)",
                      Suicide_Cases_64_above: "Suicide Cases (64+)",
                    };

                    return (
                      <div key={index} className="flex flex-column gap-2">
                        <label className="text-sm text-surface-500 ">
                          {customLabels[field]}
                        </label>
                        <InputText
                          id={field.toLowerCase()}
                          value={selectedData?.[field] || ""}
                          onChange={(e) =>
                            setSelectedData({
                              ...selectedData,
                              [field]: e.target.value,
                            })
                          }
                          placeholder={`Enter ${customLabels[
                            field
                          ].toLowerCase()}`}
                          type="number"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Category 8: Rehab Centers */}
              <div className="w-full flex flex-column">
                <h3>Rehab Centers</h3>
                <div className="flex align-items-center justify-content-start gap-4 flex-wrap">
                  {["Rehab_Centres", "Avg_Capacity"].map((field, index) => {
                    const customLabels = {
                      Rehab_Centres: "Rehab Centres",
                      Avg_Capacity: "Average Capacity",
                    };

                    return (
                      <div key={index} className="flex flex-column gap-2">
                        <label className="text-sm text-surface-500 ">
                          {customLabels[field]}
                        </label>
                        <InputText
                          id={field.toLowerCase()}
                          value={selectedData?.[field] || ""}
                          onChange={(e) =>
                            setSelectedData({
                              ...selectedData,
                              [field]: e.target.value,
                            })
                          }
                          placeholder={`Enter ${customLabels[
                            field
                          ].toLowerCase()}`}
                          type="number"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Dialog>
  );
};

export default HealthcareModify;
