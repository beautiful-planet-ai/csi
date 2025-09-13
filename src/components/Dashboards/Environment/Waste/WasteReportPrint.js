import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import WasteDashboard from "./WasteDashboard";
import WasteRecommendations from "./WasteRecommendations";

export default function WasteReportPrint({ visible, toggleModalVisibility }) {
  const contentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    bodyClass: "p-2",
  });

  const handleExport = async () => {
    if (contentRef.current) {
      const canvas = await html2canvas(contentRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, -heightLeft, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const now = new Date();
      const dateStr = `${now.getDate()}/${
        now.getMonth() + 1
      }/${now.getFullYear()}`;
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

      pdf.setFontSize(10);
      pdf.text(
        `Generated on ${dateStr} at ${timeStr}`,
        10,
        pdf.internal.pageSize.height - 10
      );

      pdf.save("Waste_summary_report.pdf");
    }
  };

  return (
    <>
      <div ref={contentRef} className="w-full print-container sec-theme p-4">
        <div className="flex flex-column gap-2 align-items-center w-full">
          <h1
            style={{ color: "#166c7d" }}
            className="m-0 p-0 text-3xl font-semibold"
          >
            City Sustainability Index 2024
          </h1>
          <h4 className="m-0 p-0">Ayodhya, Uttar Pradesh</h4>
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            Waste Management
          </h1>
        </div>
        <div className="w-full">
          <WasteDashboard show={false} />
        </div>
        <div className="w-full">
          <h1 className="text-left text-xl">Recommendations</h1>
          <WasteRecommendations />
        </div>
      </div>
      <div className="flex align-items-center justify-content-end p-2 w-full gap-2">
      <Button
          label="Export PDF"
          icon="pi pi-file-export"
          size="small"
          className="bg-primary1"
          onClick={handleExport}
          raised
        />
        <Button
          label="Print"
          icon="pi pi-print"
          size="small"
          className="bg-white text-secondary2"
          onClick={handlePrint}
          raised
        />
      </div>
    </>
  );
}
