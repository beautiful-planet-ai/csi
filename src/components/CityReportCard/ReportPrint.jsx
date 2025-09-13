import React, { useRef } from "react";
import { Button } from "primereact/button";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Report from "./Report";
import Recommendations from "./Recommendations";

export default function ReportPrint() {
  const contentRef = useRef(null);

  // Set up the print function using react-to-print
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    pageStyle: `
      @media print {
        @page { margin: 20mm; }
      }
      body { margin: 0; padding: 0; font-family: Arial, sans-serif; }
      .print-container { padding: 20px; }
      .text-theme { color: #007bff; }
      .text-900 { color: #333; }
    `,
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

      pdf.save("_summary_report.pdf");
    }
  };

  return (
    <>
      <div ref={contentRef} className="w-full print-container sec-theme p-4">
        <div className="flex flex-column gap-2 align-items-center w-full mb-2">
          <h1
            style={{ color: "#166c7d" }}
            className="m-0 p-0 text-3xl font-semibold"
          >
            City Sustainability Index 2024
          </h1>
          <h1 className="m-0 p-0 text-primary1 text-2xl font-medium">
            City Report Card
          </h1>
          {/* <h4 className="m-0 p-0">Ayodhya, Uttar Pradesh</h4> */}
        </div>
        <div className="w-full">
          <Report />
        </div>
        <div className="w-full">
          <h1 className="text-left text-xl mt-4">Recommendations</h1>
          <Recommendations />
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
