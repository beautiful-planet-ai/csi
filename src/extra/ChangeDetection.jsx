// import React, { useState } from "react";
// import { Card } from "primereact/card";
// import { Button } from "primereact/button";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Popup,
//   GeoJSON,
//   LayersControl,
// } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";
// import ADABoundary from "../components/Dashboards/Environment/Maps/ADA_Boundary.json";
// import canal_2016 from "./Assets/Canal_2016.json";
// import canal_2024 from "./Assets/Canal_2024.json";
// import canal_1975 from "./Assets/Canal_Toposheet.json";
// import drain_2016 from "./Assets/Drainage_2016.json";
// import drain_2024 from "./Assets/Drainage_2024.json";
// import drain_1975 from "./Assets/Drainage_Toposheet.json";
// import mark_drain from "./Assets/Mark_Drainage.json";
// import mark_waterbody from "./Assets/Mark_Waterbody.json";
// import riverbed_2016 from "./Assets/Riverbed_2016.json";
// import riverbed_2024 from "./Assets/Riverbed_2024.json";
// import riverbed_1975 from "./Assets/Riverbed_Toposheet.json";
// import river_2016 from "./Assets/RiverWater_2016.json";
// import river_2024 from "./Assets/RiverWater_2024.json";
// import river_1975 from "./Assets/RiverWater_Toposheet.json";
// import waterbody_1975 from "./Assets/Waterbody_ADA_Topo.json";
// import waterbody_2016 from "./Assets/Waterbody_ADA_2016.json";
// import waterbody_2024 from "./Assets/Waterbody_ADA_2024.json";
// import { MoveDown, MoveUp } from "lucide-react";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";

// const ChangeDetection = () => {
//   const mapCenter = [26.783869, 82.144132];

//   const [selectedType, setSelectedType] = useState("river");

//   // Function to change the selected type
//   const handleTypeChange = (type) => {
//     setSelectedType(type);
//   };
//   const river_data = [
//     {
//       Year: "1975",
//       MapScale: "1:50,000",
//       RasterResolution: ">25m",
//       Area: "40.03267 sq. km",
//     },
//     {
//       Year: "2016",
//       MapScale: "1:10,000",
//       RasterResolution: "10 m",
//       Area: "23.5311 sq. km",
//     },
//     {
//       Year: "2024",
//       MapScale: "1:10,000",
//       RasterResolution: "10 m",
//       Area: "31.757505 sq. km",
//     },
//   ];
//   const riverbed_data = [
//     {
//       Year: "1975",
//       MapScale: "1:50,000",
//       RasterResolution: ">25m",
//       Area: "71.526907 sq. km",
//     },
//     {
//       Year: "2016",
//       MapScale: "1:10,000",
//       RasterResolution: "10 m",
//       Area: "44.0977 sq. km",
//     },
//     {
//       Year: "2024",
//       MapScale: "1:10,000",
//       RasterResolution: "10 m",
//       Area: "43.7084 sq. km",
//     },
//   ];

//   const geoJsonStyleChange = (year) => {
//     switch (year) {
//       case 1975:
//         return { color: "green", weight: 2, opacity: 1 };
//       case 2016:
//         return { color: "#6C4E31", weight: 2, opacity: 1 };
//       case 2024:
//         return { color: "blue", weight: 2, opacity: 1 };
//       default:
//         return { color: "#C63C51", weight: 2 };
//     }
//   };

//   return (
//     <>
//       <h1 className="m-2 p-2 text-cyan-700 text-center text-2xl ">
//         Ayodhya Waterbody Change Detection
//       </h1>
//       <div className="flex align-items-center justify-content-start gap-2 flex-row ml-4 mt-5">
//         <Button
//           label="River"
//           className={`bg-cyan-700 text-xs p-2 ${
//             selectedType === "river" ? "bg-cyan-900" : ""
//           }`}
//           onClick={() => handleTypeChange("river")}
//         />
//         <Button
//           label="Riverbed"
//           className={`bg-cyan-700 text-xs p-2 ${
//             selectedType === "riverbed" ? "bg-cyan-900" : ""
//           }`}
//           onClick={() => handleTypeChange("riverbed")}
//         />
//         <Button
//           label="Canal"
//           className={`bg-cyan-700 text-xs p-2 ${
//             selectedType === "canal" ? "bg-cyan-900" : ""
//           }`}
//           onClick={() => handleTypeChange("canal")}
//         />
//         <Button
//           label="Drainage"
//           className={`bg-cyan-700 text-xs p-2 ${
//             selectedType === "drain" ? "bg-cyan-900" : ""
//           }`}
//           onClick={() => handleTypeChange("drain")}
//         />
//         <Button
//           label="Waterbodies"
//           className={`bg-cyan-700 text-xs p-2 ${
//             selectedType === "waterbody" ? "bg-cyan-900" : ""
//           }`}
//           onClick={() => handleTypeChange("waterbody")}
//         />
//       </div>

//       <div className="flex align-items-center justify-content-center flex-row gap-4 p-4">
//         <Card className="w-full">
//           <MapContainer
//             center={mapCenter}
//             zoom={11}
//             style={{ height: "30rem" }}
//           >
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <GeoJSON
//               data={ADABoundary}
//               style={{ color: "#89A8B2", weight: 5 }}
//             />

//             <LayersControl position="topright">
//               {selectedType === "river" && (
//                 <>
//                   <LayersControl.Overlay name="River_1975" checked>
//                     <GeoJSON
//                       data={river_1975}
//                       style={geoJsonStyleChange(1975)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="River_2016" checked>
//                     <GeoJSON
//                       data={river_2016}
//                       style={geoJsonStyleChange(2016)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="River_2024" checked>
//                     <GeoJSON
//                       data={river_2024}
//                       style={geoJsonStyleChange(2024)}
//                     />
//                   </LayersControl.Overlay>
//                 </>
//               )}
//               {selectedType === "riverbed" && (
//                 <>
//                   <LayersControl.Overlay name="Riverbed_1975" checked>
//                     <GeoJSON
//                       data={riverbed_1975}
//                       style={geoJsonStyleChange(1975)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="Riverbed_2016" checked>
//                     <GeoJSON
//                       data={riverbed_2016}
//                       style={geoJsonStyleChange(2016)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="Riverbed_2024" checked>
//                     <GeoJSON
//                       data={riverbed_2024}
//                       style={geoJsonStyleChange(2024)}
//                     />
//                   </LayersControl.Overlay>
//                 </>
//               )}
//               {selectedType === "canal" && (
//                 <>
//                   <LayersControl.Overlay name="Canal_1975" checked>
//                     <GeoJSON
//                       data={canal_1975}
//                       style={geoJsonStyleChange(1975)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="Canal_2016" checked>
//                     <GeoJSON
//                       data={canal_2016}
//                       style={geoJsonStyleChange(2016)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="Canal_2024" checked>
//                     <GeoJSON
//                       data={canal_2024}
//                       style={geoJsonStyleChange(2024)}
//                     />
//                   </LayersControl.Overlay>
//                 </>
//               )}
//               {selectedType === "drain" && (
//                 <>
//                   <LayersControl.Overlay name="Drainage_1975" checked>
//                     <GeoJSON
//                       data={drain_1975}
//                       style={geoJsonStyleChange(1975)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="Drainage_2016" checked>
//                     <GeoJSON
//                       data={drain_2016}
//                       style={geoJsonStyleChange(2016)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="Drainage_2024" checked>
//                     <GeoJSON
//                       data={drain_2024}
//                       style={geoJsonStyleChange(2024)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="Marked_Drainage" checked>
//                     <GeoJSON data={mark_drain} style={geoJsonStyleChange()} />
//                   </LayersControl.Overlay>
//                 </>
//               )}
//               {selectedType === "waterbody" && (
//                 <>
//                   <LayersControl.Overlay name="Waterbody_1975" checked>
//                     <GeoJSON
//                       data={waterbody_1975}
//                       style={geoJsonStyleChange(1975)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="Waterbody_2016" checked>
//                     <GeoJSON
//                       data={waterbody_2016}
//                       style={geoJsonStyleChange(2016)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="Waterbody_2024" checked>
//                     <GeoJSON
//                       data={waterbody_2024}
//                       style={geoJsonStyleChange(2024)}
//                     />
//                   </LayersControl.Overlay>
//                   <LayersControl.Overlay name="Marked_Waterbody" checked>
//                     <GeoJSON
//                       data={mark_waterbody}
//                       style={geoJsonStyleChange()}
//                     />
//                   </LayersControl.Overlay>
//                 </>
//               )}
//             </LayersControl>
//           </MapContainer>
//         </Card>
//         <Card className="w-full">
//           {selectedType === "river" && (
//             <>
//               <DataTable value={river_data}>
//                 <Column field="Year" header="Year"></Column>
//                 <Column field="MapScale" header="Map Scale"></Column>
//                 <Column
//                   field="RasterResolution"
//                   header="Raster Resolution"
//                 ></Column>
//                 <Column field="Area" header="Area"></Column>
//               </DataTable>
//               <Card>
//                 <div className="w-full flex flex-row justify-content-around">
//                   <h1 className="text-center">
//                     Change in Area Between 1975 & 2024
//                     <p className="text-red-600">
//                       {(31.757505 - 40.03267).toFixed(4)} sq. km
//                     </p>
//                   </h1>
//                   <h1 className="text-center">
//                     Percentage Change in Area
//                     <p className="text-red-600">
//                       {(((31.757505 - 40.03267) / 31.757505) * 100).toFixed(4)}{" "}
//                       % <MoveDown size={10} className="text-bold" />
//                     </p>
//                   </h1>
//                 </div>
//               </Card>
//             </>
//           )}
//           {selectedType === "riverbed" && (
//             <>
//               <DataTable value={riverbed_data}>
//                 <Column field="Year" header="Year"></Column>
//                 <Column field="MapScale" header="Map Scale"></Column>
//                 <Column
//                   field="RasterResolution"
//                   header="Raster Resolution"
//                 ></Column>
//                 <Column field="Area" header="Area"></Column>
//               </DataTable>
//               <Card>
//                 <div className="w-full flex flex-row justify-content-around">
//                   <h1 className="text-center">
//                     Change in Area Between 1975 & 2024
//                     <p className="text-red-600">
//                       {(43.7084 - 71.526907).toFixed(4)} sq. km
//                     </p>
//                   </h1>
//                   <h1 className="text-center">
//                     Percentage Change in Area
//                     <p className="text-red-600">
//                       {(((43.7084 - 71.526907) / 43.7084) * 100).toFixed(4)} %{" "}
//                       <MoveDown size={10} className="text-bold" />
//                     </p>
//                   </h1>
//                 </div>
//               </Card>
//             </>
//           )}
//           {selectedType === "canal" && (
//             <>
//               <DataTable value={riverbed_data}>
//                 <Column field="Year" header="Year"></Column>
//                 <Column field="MapScale" header="Map Scale"></Column>
//                 <Column
//                   field="RasterResolution"
//                   header="Raster Resolution"
//                 ></Column>
//                 <Column field="Area" header="Area"></Column>
//               </DataTable>
//               <Card>
//                 <div className="w-full flex flex-row justify-content-around">
//                   <h1 className="text-center">
//                     Change in Area Between 1975 & 2024
//                     <p className="text-red-600">
//                       {(43.7084 - 71.526907).toFixed(4)} sq. km
//                     </p>
//                   </h1>
//                   <h1 className="text-center">
//                     Percentage Change in Area
//                     <p className="text-red-600">
//                       {(((43.7084 - 71.526907) / 43.7084) * 100).toFixed(4)} %{" "}
//                       <MoveDown size={10} className="text-bold" />
//                     </p>
//                   </h1>
//                 </div>
//               </Card>
//             </>
//           )}
//         </Card>
//       </div>
//     </>
//   );
// };

// export default ChangeDetection;
