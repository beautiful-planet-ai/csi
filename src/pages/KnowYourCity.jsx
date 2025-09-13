import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";

import CityDemographics from "../components/knowYourCity/CityDemographics";
import CityProgress from "../components/knowYourCity/CityProgress";
import { useUser } from "components/context/UserContext";
import { useRef } from "react";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import Profile from "components/knowYourCity/Profile";

const KnowYourCity = ({ show }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { citizenDetails } = useUser(); // Accessing user details from context
  const { name, phone, email, city, state } = citizenDetails; // Extracting the city
  const overlayPanelRef = useRef(null);

  const handleProfileClick = (event) => {
    overlayPanelRef.current.toggle(event);
  };

  return (
    <div className="">
      <div className="flex align-items-center justify-content-between px-3">
        <div className="flex align-items-center gap-2 mt-3">
          <h1 className="m-0 p-0 text-primary1 text-3xl font-medium">
            Know Your City-
          </h1>
          {city ? (
            <p className="text-secondary2 text-2xl p-0 m-0 font-semibold">
              {city}
            </p>
          ) : (
            // <p className="card-text p-0 m-0">No city selected.</p>
            <p className="text-secondary2 text-2xl p-0 m-0 font-semibold">
              Ayodhya
            </p>
          )}
        </div>
        {/* Profile Section */}
        {name && (
          <div className="flex flex-column align-items-center pt-2">
            <Button
              icon={<Profile letter={name.charAt(0).toUpperCase()} />}
              tooltip="Citizen Profile"
              tooltipOptions={{ position: "left" }}
              className="bg-white text-primary1"
              onClick={handleProfileClick}
              raised
              rounded
              outlined
              // label={name.charAt(0).toUpperCase()}
            />
            {/* <Button
              // icon={<Profile letter={name.charAt(0).toUpperCase()} />}
              tooltip="Citizen Profile"
              tooltipOptions={{ position: "left" }}
              className="bg-white text-primary1 border-circle"
              onClick={handleProfileClick}
              raised
              // rounded
              // outlined
              label={name.charAt(0).toUpperCase()}
            /> */}
            <OverlayPanel
              ref={overlayPanelRef}
              // showCloseIcon dismissable
            >
              <div className="flex flex-column gap-3">
                <div className="flex gap-2 align-items-end">
                  <label htmlFor="name" className="text-secondary2 font-medium">
                    Citizen Name:
                  </label>
                  {/* <input
                  id="name"
                  value={name}
                  readOnly
                  className="p-inputtext p-component"
                /> */}
                  <div id="name" className="font-semibold text-xl card-text">
                    {name}
                  </div>
                </div>
                <div className="flex gap-2 flex-column">
                  <div className="flex flex-column">
                    <label
                      htmlFor="phone"
                      className="text-secondary2 font-medium"
                    >
                      Phone Number:
                    </label>
                    <input
                      id="phone"
                      value={phone}
                      readOnly
                      className="p-inputtext p-component"
                    />
                  </div>
                  <div className="flex flex-column">
                    <label
                      htmlFor="email"
                      className="text-secondary2 font-medium"
                    >
                      Email:
                    </label>
                    <input
                      id="email"
                      value={email}
                      readOnly
                      className="p-inputtext p-component"
                    />
                  </div>
                  <div className="flex flex-column">
                    <label
                      htmlFor="city"
                      className="text-secondary2 font-medium"
                    >
                      City:
                    </label>
                    <input
                      id="city"
                      value={city}
                      readOnly
                      className="p-inputtext p-component"
                    />
                  </div>
                  <div className="flex flex-column">
                    <label
                      htmlFor="state"
                      className="text-secondary2 font-medium"
                    >
                      State:
                    </label>
                    <input
                      id="state"
                      value={state}
                      readOnly
                      className="p-inputtext p-component"
                    />
                  </div>
                </div>
              </div>
            </OverlayPanel>
            {/* <p className="text-secondary2 text-lg p-0 m-0 font-semibold ml-3">
              Hello {name}!
            </p> */}
          </div>
        )}
      </div>
      <TabView
        activeIndex={activeTab}
        onTabChange={(e) => setActiveTab(e.index)}
      >
        <TabPanel header="City Demographics">
          <CityDemographics />
        </TabPanel>
        <TabPanel header="City Progress">
          <CityProgress />
        </TabPanel>
      </TabView>
    </div>
  );
};

export default KnowYourCity;
