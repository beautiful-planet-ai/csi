import React from "react";
import "primeflex/primeflex.css";
import waves from "assets/KYC/wave.svg";
import geo_area from "assets/KYC/geographical-removebg.png";
import { Divider } from "primereact/divider";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DonutChart } from "Layout/GraphVisuals";
import { Tooltip } from "primereact/tooltip";
import "./KYC.css";
import { Building2, Factory, PartyPopper } from "lucide-react";

const CityDemographics = () => {
  return (
    <div className="flex flex-column gap-3">
      <div className="flex align-items-center justify-content-center gap-3 w-full">
        {/* Geographical Overview Card */}
        <div
          className="shadow-2 p-3 border-round-2xl h-auto"
          style={{
            flex: "55%",
            background: "linear-gradient(-135deg , #1F8297, #166C7D, #003940)",
          }}
          // style={{
          //   background: " linear-gradient(to left , #1F8297, #166C7D, #003940)",
          // }}
        >
          <div className="flex align-items-center justify-content-between w-full ">
            <h1 className="m-0 p-0 text-white font-semibold">
              Geographical Overview
            </h1>
            <i className="pi pi-map-marker text-white"></i>
          </div>
          <div className="flex align-items-center justify-content-center gap-2 p-2">
            <div className="flex align-items-center justify-content-center flex-column w-full gap-2">
              <div className="flex align-items-center justify-content-center w-full gap-2">
                <div
                  className="flex align-items-center justify-content-center flex-column p-3 border-round-xl w-full "
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-xl font-medium text-white">
                    133.67 <span className="text-sm">sq.km</span>
                  </h1>
                  <p className="p-0 m-0 text-white text-sm">
                    Geographical Area
                  </p>
                </div>

                <div
                  className="flex align-items-center justify-content-center border-round-xl flex-column p-3"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-2xl font-medium text-white">
                    11
                  </h1>
                  <p className="p-0 m-0 text-white text-sm">Blocks</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center p-3 border-round-xl flex-column"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-2xl font-medium text-white">
                    60
                  </h1>
                  <p className="p-0 m-0 text-white text-sm">Wards</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center p-3 border-round-xl flex-column"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-2xl font-medium text-white">1</h1>
                  <div className="flex justify-content-between align-items-center gap-2">
                    <p className="p-0 m-0 text-white text-sm">Highways</p>
                    <i className="pi pi-info-circle text-white w-full text-right highway text-xs"></i>
                  </div>
                  <Tooltip
                    target=".highway"
                    position="right"
                    style={{ backgroundColor: "white !important" }}
                    tooltipOptions={{
                      className: "hoverClass",
                      showDelay: 500,
                      hideDelay: 101300,
                    }}
                  >
                    <div className="flex">
                      <li>Lucknow Ayodhya Expressway (252 kms)</li>
                    </div>
                  </Tooltip>
                </div>
              </div>
              <div className="flex align-items-center justif-content-center w-full gap-2">
                <div
                  className="flex align-items-center justify-content-center p-3 border-round-xl flex-column w-full"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-2xl text-white font-medium ">
                    5
                  </h1>
                  <p className="p-0 m-0 text-white text-sm">Water Bodies</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center p-3 border-round-xl flex-column"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-2xl font-medium  text-white">
                    1
                  </h1>
                  <p className="p-0 m-0 text-white text-sm">Nallahs</p>
                </div>
                <div
                  className="flex align-items-center justify-content-center p-3 border-round-xl flex-column w-full"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                >
                  <h1 className="p-1 m-0 text-2xl font-medium text-white">
                    163.31 <span className="text-sm">ha</span>{" "}
                  </h1>
                  <p className="p-0 m-0 text-white text-sm">
                    Parks & Open Spaces
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex align-items-center justify-content-center border-round-xl p-3"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <img
                src={geo_area}
                alt="area"
                className="h-9rem w-14rem surface-2"
                // style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              />
            </div>
          </div>
        </div>
        {/* Population Insights */}
        <div
          className="shadow-2 p-3 border-round-2xl"
          style={{
            flex: "45%",
            background: "linear-gradient(-135deg , #1F8297, #166C7D, #003940)",
          }}
        >
          <div className="flex align-items-center justify-content-between">
            <h1 className="m-0 p-0 text-white font-semibold">
              Population Insights
            </h1>
            <i className="pi pi-users text-white"></i>
          </div>
          <div className="flex align-items-center justify-content-center gap-3 p-2">
            {/* waves */}
            <div
              className="flex align-items-center justify-content-between flex-column bg-theme border-round-xl"
              // style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <div className="flex align-items-center justify-content-between bg-white border-round-top-xl">
                <div className="flex align-items-center justify-content-center p-3 flex-column text-center">
                  <h1 className="p-1 m-0 text-2xl text-theme font-medium">
                    2,21,118
                  </h1>
                  <p className="p-0 m-0 text text-xs font-medium ">
                    Census Population
                  </p>
                </div>
                <Divider layout="vertical" />
                <div className="flex align-items-center justify-content-center p-3 flex-column text-center">
                  <h1 className="p-1 m-0 text-2xl font-medium text-theme">
                    25,669
                  </h1>
                  <p className="p-0 m-0 text text-xs font-medium ">
                    Slum Population
                  </p>
                </div>
              </div>
              {/* <img src={waves} className="p-0" alt="waves" /> */}
              <div className="flex align-items-center justify-content-center flex-column p-3">
                <h1 className="p-1 m-0 text-2xl font-medium text-white">
                  4,65,206
                </h1>
                <p className="p-1 font-medium m-0 text-white text-sm">
                  Current Population
                </p>
              </div>
            </div>{" "}
            <div
              className="flex justify-content-center border-round-xl p-1 flex-column w-full gap-2"
              style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <p className="p-1 m-0 text-left font-medium text-white">
                Sex Ratio- <span className="text-white font-semibold">980</span>
              </p>

              <DonutChart
                title={""}
                labels={["Male", "Female"]}
                series={[1000, 980]}
                height={110}
                colorArray={["#FFDD82", "#47B881"]}
                horizontal={"center"}
                vertical={"bottom"}
                fontColor={"#fff"}
              />
            </div>
            {/* literacy-rate */}
            <div className="flex align-items-center justify-content-center flex-column gap-2">
              <div
                className="flex align-items-center justify-content-center gap-1 p-2 border-round-xl w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <div
                  style={{
                    width: "4rem",
                    height: "4rem",
                    marginTop: "0.5rem",
                  }}
                >
                  <CircularProgressbar
                    value={73}
                    text="73%"
                    className="m-0 p-0 font-medium"
                    strokeWidth={12}
                    styles={buildStyles({
                      pathColor: "#FFDD82",
                      textColor: "#fff",
                      trailColor: "#BAD8DF",
                      textSize: "2rem",
                      pathTransition: "stroke-dashoffset 0.5s ease 0s",
                      transform: "rotate(2.25turn)",
                    })}
                  />
                </div>
                <p className="p-0 m-0 text-white text-sm text-center font-medium ">
                  Literacy Rate
                </p>
              </div>

              <div
                className="flex align-items-center justify-content-center p-3 flex-column border-round-xl w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <h1 className="p-0 m-0 text-2xl text-white font-medium">
                  980<span className="text-lg">/sq.km</span>
                </h1>
                <p className="p-1 m-0 text-white font-medium text-xs text-center">
                  Population Density
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex align-items-center justify-content-center gap-3 w-full">
        <div className="flex align-items-center justify-content-center w-full">
          {/* Civic Infrastructure */}
          <div
            className="w-full shadow-2 p-3 border-round-2xl"
            style={{
              background:
                " linear-gradient(-135deg , #1F8297, #166C7D, #003940)",
            }}
          >
            <div className="flex align-items-center justify-content-between ">
              <h1 className="m-0 p-0 text-white font-semibold">
                Civic Infrastructure
              </h1>
              <Factory size={15} className="text-white" />
            </div>
            <div className="flex align-items-center justify-content-center flex-column gap-3 p-2">
              {/* Sewage Treatment Plants */}
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round-xl w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right w-full text-xs cursor-pointer sewage"></i>
                <h1 className="text-white p-0 m-0 text-2xl font-medium ">1</h1>
                <p className="text-white p-1 m-0">Sewage Treatment Plants</p>
                <Tooltip
                  target=".sewage"
                  position="right"
                  style={{ backgroundColor: "white !important" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <div className="flex">
                    <li>Capacity: 12MLD</li>
                  </div>
                </Tooltip>
              </div>
              {/* Landfills & Dumpsites */}
              <div
                className="flex align-items-center justify-content-center flex-column p-3 border-round-xl w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                {/* <i className="pi pi-info-circle text-white text-right w-full text-xs"></i> */}
                <h1 className="text-white p-0 m-0 text-2xl font-medium ">0</h1>
                <p className="text-white p-1 m-0">Landfills & Dumpsites</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex align-items-center justify-content-center w-full">
          {/* Public Utilities */}
          <div
            className="w-full shadow-2 p-3 border-round-2xl"
            style={{
              background:
                " linear-gradient(-135deg , #1F8297, #166C7D, #003940)",
            }}
          >
            <div className="flex align-items-center justify-content-between ">
              <h1 className="m-0 p-0 text-white font-semibold">
                Public Utilities
              </h1>
              <Building2 className="text-white" size={15} />
            </div>
            <div className="flex align-items-center justify-content-center gap-2 m-2">
              {/* Hospitals */}
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round-xl w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right w-full hospitals cursor-pointer text-xs"></i>
                <h1 className="text-white p-1 m-0 text-2xl font-medium">188</h1>
                <p className="text-white p-1 m-0 text-sm">Hospitals</p>
                <Tooltip target=".hospitals" position="right">
                  <div className="flex flex-column w-20rem">
                    <p className="text-left font-bold">
                      List of Top 4 Hospitals
                    </p>
                    <li>Government Hospital, Ayodhya</li>
                    <li>Anand Multispeciality Hospital</li>
                    <li>Sewa Hospital and Research Centre</li>
                    <li>Chiranjeev Hospital</li>
                  </div>
                </Tooltip>
              </div>
              {/* Educational Facilities */}
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round-xl w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right education cursor-pointer text-xs w-full"></i>
                <h1 className="text-white p-1 m-0 text-2xl font-medium">252</h1>
                <p className="text-white p-1 m-0 text-sm">
                  Educational Facilities
                </p>
                <Tooltip target=".education" position="right">
                  <div className="flex flex-column">
                    <p>
                      Schools : <span className="font-semibold">236</span>
                    </p>
                    <Divider className="m-0" />
                    <p>
                      {" "}
                      Colleges : <span className="font-semibold">16</span>
                    </p>
                  </div>
                </Tooltip>
              </div>
            </div>
            <div className="flex align-items-center justify-content-center gap-2 m-2">
              {/* Hotels */}
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round-xl w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right hotels cursor-pointer text-xs w-full"></i>
                <h1 className="text-white p-1 m-0 font-medium text-2xl">17</h1>
                <p className="text-white p-1 m-0 text-sm">Hotels</p>
                <Tooltip
                  target=".hotels"
                  position="top"
                  style={{ backgroundColor: "white !important" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <div className="flex flex-column w-22rem">
                    <p className="font-bold">List of Top 5 Hotels </p>
                    <li>
                      Hotel Saket, a Unit of Uttar Pradesh State Tourism
                      Development Corporation Ltd.
                    </li>
                    <li>
                      {" "}
                      Rahi Yatri Niwas Ayodhya, a Unit of Uttar Pradesh State
                      Tourism Development Corporation Ltd
                    </li>
                    <li>Ramprastha Hotel and Resorts</li>
                    <li>A P Palace</li>
                    <li>Tirupati Hotel</li>
                  </div>
                </Tooltip>
              </div>
              {/* Dharamshalas */}
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round-xl w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right dharamshala cursor-pointer text-xs w-full"></i>
                <h1 className="text-white p-1 m-0 font-medium text-2xl">70</h1>
                <p className="text-white p-1 m-0 text-sm">Dharamshalas</p>
                <Tooltip
                  target=".dharamshala"
                  position="top"
                  style={{ backgroundColor: "white !important" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <div className="flex flex-column w-18rem">
                    <p className="font-bold">List of Top 4 Dharamshalas</p>
                    <li>Ayodhya Dharamshala</li>
                    <li> Anand Birla Dharamshala</li>
                    <li> Hanumat Bhavan Dharamshala</li>
                    <li>Baranwal Dharamshala</li>
                  </div>
                </Tooltip>
              </div>
              {/* A.P.M.C. Markets */}
              <div
                className="flex align-items-center justify-content-center flex-column p-2 border-round-xl w-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <i className="pi pi-info-circle text-white text-right w-full text-xs market"></i>
                <h1 className="text-white p-1 m-0 font-medium text-2xl">1</h1>
                <p className="text-white p-1 m-0 text-sm">A.P.M.C. Markets</p>
                <Tooltip
                  target=".market"
                  position="top"
                  style={{ backgroundColor: "white !important" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                    hideDelay: 101300,
                  }}
                >
                  <div className="flex flex-column">
                    <ul>
                      Area: <span className="font-semibold">39.30 acre</span>
                    </ul>
                    <Divider className="m-0" />
                    <ul>
                      Quantity:{" "}
                      <span className="font-semibold">2616387 Quintals</span>
                    </ul>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
        <div className="flex align-items-center justify-content-center w-full">
          {/* Culture */}
          <div
            className="w-full shadow-2 p-3 border-round-2xl"
            style={{
              background:
                "linear-gradient(-135deg , #1F8297, #166C7D, #003940)",
            }}
          >
            <div className="flex align-items-center justify-content-between ">
              <h1 className="m-0 p-0 text-white font-semibold">
                Culture & Attractions
              </h1>
              <PartyPopper size={15} className="text-white" />
            </div>
            <div className="flex align-items-center justify-content-center flex-column gap-2 w-full p-2">
              {/* Major Attractions */}
              <div
                className="flex align-items-center justify-content-between w-full border-round-xl p-2 m-1 gap-8"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <div className="flex align-items-center justify-content-center gap-1">
                  <p className="p-1 m-0 text-white text-lg">
                    Major Attractions
                  </p>
                  <i className="pi pi-info-circle attractions text-white text-xs" />
                </div>
                <h1 className="p-1 m-0 text-white font-medium text-xl">9</h1>
                <Tooltip
                  target=".attractions"
                  position="top"
                  style={{ backgroundColor: "white !important" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                  }}
                >
                  <div className="flex flex-column w-15rem">
                    <li>Ram Mandir</li>
                    <li>Gulab Bari</li>
                    <li>Bahu Begum ka Maqbara</li>
                    <li>Guptar Ghat</li>
                    <li>Lakshman Kila</li>
                    <li>Company Gardens</li>
                    <li>Hanuman Ghari</li>
                    <li>Kanak Bhawan</li>
                    <li>Nageshwarnath Mandir</li>
                  </div>
                </Tooltip>
              </div>
              {/* Fairs & Festivals */}
              <div
                className="flex align-items-center justify-content-between w-full border-round-xl p-2 m-1 gap-8"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <div className="flex align-items-center justify-content-center gap-1">
                  <p className="p-1 m-0 text-white text-lg">
                    Fairs & Festivals
                  </p>
                  <i className="pi pi-info-circle fairs cursor-pointer text-xs text-white text-xs" />
                </div>
                <h1 className="p-1 m-0 text-white font-medium text-xl">4</h1>
                <Tooltip
                  target=".fairs"
                  position="top"
                  tooltipOptions={{
                    className: "hoverClass",
                    backgroundColor: "white",
                    showDelay: 500,
                  }}
                  style={{ padding: "0" }}
                >
                  <div className="flex flex-column w-12rem">
                    <li>Ram Leela</li>
                    <li>Ram Navmi Mela</li>
                    <li>Sravan Jhula Mela</li>
                    <li>Parikramas</li>
                  </div>
                </Tooltip>
              </div>
              {/* Socio-Cultural Facilities */}
              <div
                className="flex align-items-center justify-content-between w-full border-round-xl p-2 m-1 gap-8"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <div className="flex align-items-center justify-content-center gap-1">
                  <p className="p-1 m-0 text-white  text-lg">
                    Socio-Cultural Facilities
                  </p>
                  <i className="pi pi-info-circle text-white socio-culture cursor-pointer text-xs text-xs" />
                </div>
                <h1 className="p-1 m-0 text-white font-medium text-xl">7</h1>
                <Tooltip
                  target=".socio-culture"
                  position="top"
                  style={{ backgroundColor: "white !importanat" }}
                  tooltipOptions={{
                    className: "hoverClass",
                    showDelay: 500,
                  }}
                >
                  <div className="flex flex-column w-18rem">
                    <li>Anganwari-Housing Area</li>
                    <li>Community room </li>
                    <li>Community hall and library</li>
                    <li>Recreational club</li>
                    <li>Music, dance, and drama center</li>
                    <li>Meditation and spiritual center</li>
                    <li>Old-age home</li>
                  </div>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="p-0 m-0 border-top-1 surface-border text-right text-sm text-700 font-italic">
        *These numbers are subject to variation.
      </p>
    </div>
  );
};

export default CityDemographics;
