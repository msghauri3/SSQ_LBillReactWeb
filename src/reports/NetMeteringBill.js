// src/reports/electricityBillsNetMeter.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// ✅ Reusable date formatting function
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/ /g, "-");
};

export const generateNetMeteringPDF = (billingData, projects) => {
  // 🔹 Step 1: Extract both objects from API response
  const { electricityBillsNetMeter, customerDetail, billHistory } = billingData;



  const doc = new jsPDF("p", "mm", "a4");

  
  //Header
  autoTable(doc, {
    head: [],
    body: [
      [
        {
          content: "",
          rowSpan: 7,
          styles: {
            lineWidth: { top: 0.1, right: 0.1, bottom: 0.1, left: 0.1 },
          },
        },
        {
          content: "BAHRIA TOWN PVT LTD - NET METER ELECTRICITY BILL",
          colSpan: 6,
          styles: {
            lineWidth: { top: 0.1, right: 0.1, bottom: 0, left: 0.1 },
            fontStyle: "bold",
            font: "helvetica",
            fontSize: 15,
            minCellHeight: 7,
            cellPadding: { top: 2 },
          },
        },
      ],
      [
        {
          content: "                YOUR LIFE STYLE DESTINATION",
          colSpan: 3,
          styles: {
            lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0.1 },
            fontSize: 8,
            minCellHeight: 4,
            cellPadding: { bottom: 0.5 },
            halign: "left",
          },
        },
        {
          content: "GST NO. 07-02-8400-061-28               ",
          colSpan: 3,
          styles: {
            lineWidth: { top: 0, right: 0.1, bottom: 0.1, left: 0 },
            fontSize: 8,
            minCellHeight: 4,
            cellPadding: { bottom: 0.5 },
            halign: "right",
          },
        },
      ],
      [
        {
          content: `  ${customerDetail.customerName} CNIC No: ${customerDetail.cnicNo} NTN No: ${customerDetail.ntnNumber}`,
          colSpan: 6,
          styles: { lineWidth: { top: 0.1, right: 0.1, bottom: 0, left: 0 } },
        },
      ],
      [
        {
          content: `  House No: ${customerDetail.ploNo}  Block: ${customerDetail.block}  Sector: ${customerDetail.sector}`,
          colSpan: 6,
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0 } },
        },
      ],
      [
        {
          content: `  Invoice No: ${electricityBillsNetMeter.invoiceNo}`,
          colSpan: 3,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.1 } },
        },
        {
          content: `Valid Date: ${formatDate(electricityBillsNetMeter.validDate)}`,
          colSpan: 3,
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0 } },
        },
      ],
      [
        {
          content: "Reference No",
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.1 } },
        },
        "MF@",
        "Billing Month",
        "Reading Date",
        "Issue Date",
        {
          content: "Due Date",
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0 } },
        },
      ],
      [
        electricityBillsNetMeter.customerNo,
        "1",
        `${electricityBillsNetMeter.billingMonth} ${electricityBillsNetMeter.billingYear}`,
        {
          content: formatDate(electricityBillsNetMeter.readingDate),
          styles: { fontStyle: "normal" },
        },
        formatDate(electricityBillsNetMeter.issueDate),
        {
          content: formatDate(electricityBillsNetMeter.dueDate),
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0 } },
        },
      ],
    ],
    theme: "plain",
    margin: { top: 10 },
    bodyStyles: {
      fillColor: false,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      halign: "center",
    },
    columnStyles: {
      0: { cellWidth: 20 },
      2: { cellWidth: 25 },
    },
    didParseCell: function (data) {
      if (data.section === "body") {
        if (data.row.index === 2) {
          data.cell.styles.minCellHeight = 3;
          data.cell.styles.cellPadding = 0.5;
          data.cell.styles.halign = "left";
          data.cell.styles.fontSize = 9;
        }
        if (data.row.index === 3) {
          data.cell.styles.minCellHeight = 3;
          data.cell.styles.cellPadding = 0.5;
          data.cell.styles.halign = "left";
          data.cell.styles.fontSize = 9;
        }
        if (data.row.index === 4) {
          data.cell.styles.minCellHeight = 4;
          data.cell.styles.cellPadding = 0.5;
          data.cell.styles.halign = "left";
          data.cell.styles.fontSize = 9;
          data.cell.styles.fillColor = [235, 235, 235];
        }
        if (data.row.index === 5) {
          data.cell.styles.minCellHeight = 3;
          data.cell.styles.cellPadding = 0.5;
          data.cell.styles.fontSize = 8;
          data.cell.styles.valign = "middle";
          data.cell.styles.fontStyle = "bold";
          data.cell.styles.fillColor = [190, 190, 190];
        }
        if (data.row.index === 6) {
          data.cell.styles.minCellHeight = 3;
          data.cell.styles.cellPadding = 0.5;
          data.cell.styles.fontSize = 8;
          data.cell.styles.valign = "middle";
          data.cell.styles.fontStyle = "bold";

          // 🔑 Example: row 4, column 3 wale cell ko normal rakho
          if (data.column.index === 4 || data.column.index === 5) {
            data.cell.styles.fontStyle = "normal"; // ye sirf is cell pe apply hoga
          } else {
            data.cell.styles.fontStyle = "bold"; // baaki sab bold
          }
        }
      }
    },
  });
  let headerY = doc.lastAutoTable.finalY;
   doc.addImage("urdumessage1.jpeg", "JPEG", 15, headerY + 53, 110, 23);
   doc.addImage("urdumessage2.png", "PNG", 25, headerY + 76, 96, 18);

  //Body-1
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    head: [],
    body: [
      [
        { content: "Bar Code No", styles: {} },
        { content: "Tariff", styles: {} },
        { content: "Conn Date", styles: {} },
        { content: "Bank Account No (BTL Branch)", colSpan: 3, styles: {} },
        { content: "  Electricity", styles: { halign: "left" } },
      ],
      [
        {
          content: `${electricityBillsNetMeter.btNo}`,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0.1 } },
        },
        {
          content: ``,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: `${electricityBillsNetMeter.installedOn}`,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "",
          colSpan: 3,
          rowSpan: 3,
          styles: {
            lineWidth: { top: 0.1, right: 0.1, bottom: 0.1, left: 0 },
            cellPadding: 0,
            fontSize: 10,
          },
        },
        { content: "", rowSpan: 13, styles: {} },
      ],
      [
        {
          content: "GRID",
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.1 } },
        },
        {
          content: "Meter Type",
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "Category",
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
      ],
      [
        {
          content: "BTL FEEDER - 1",
          styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0.1 } },
        },
        {
          content: `${electricityBillsNetMeter.meterType}`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0 } },
        },
        {
          content: `${customerDetail.category}`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0 } },
        },
      ],
      [
        { content: "METER No", styles: {} },
        { content: "PREVIOUS", styles: {} },
        { content: "PRESENT", styles: {} },
        { content: "UNITS", styles: {} },
        { content: "MDI Reading", styles: {} },
        { content: "Status", styles: {} }
      ],
      [
        {
          content: `${electricityBillsNetMeter.meterNo}`,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0.1 } },
        },
        {
          content: `${electricityBillsNetMeter.previousReading1}`,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: `${electricityBillsNetMeter.currentReading1}`,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: `${electricityBillsNetMeter.difference1}`,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "",
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "(P) Import Units  ",
          styles: { lineWidth: { top: 0.1, right: 0.1, bottom: 0, left: 0 } },
        }
      ],
      [
        {
          content: ``,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.1 } },
        },
        {
          content: `${electricityBillsNetMeter.previousReading2}`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: `${electricityBillsNetMeter.currentReading2}`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: `${electricityBillsNetMeter.difference2}`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "",
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "(OP) Import Units",
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0 } },
        }
      ],
      [
        {
          content: ``,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0.1 } },
        },
        {
          content: `${electricityBillsNetMeter.previousSolarReading}`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0 } },
        },
        {
          content: `${electricityBillsNetMeter.currentSolarReading}`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0 } },
        },
        {
          content: `${electricityBillsNetMeter.differenceSolar}`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0 } },
        },
        {
          content: "",
          styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0 } },
        },
        {
          content: "(OP) Export Units",
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0.1, left: 0 } },
        }
      ],
      [
        { content: "Units", styles: {} },
        { content: "Rate", styles: {} },
        { content: "Amount", styles: {} },
        { content: "", styles: {} },
        { content: "Units Consumed", colSpan: 2, styles: {} },
      ],
      [
        {
          content: `${electricityBillsNetMeter.sumUnitsImport}`,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0.1 } },
        },
        {
          content: `${electricityBillsNetMeter.sumRateImport}`,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: `${electricityBillsNetMeter.sumAmountImport}`,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
         {
          content: `Import Units`,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "",
          colSpan: 2,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
      ],
      [
        {
          content: `${electricityBillsNetMeter.sumUnitsExport}`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.1 } },
        },
        {
          content: `${electricityBillsNetMeter.sumRateExport}`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: `${electricityBillsNetMeter.sumAmountExport}`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
         {
          content: `Export Units`,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "",
          colSpan: 2,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
      ],
      [
        {
          content: "",
          colSpan: 6,
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0.1 } },
        },
      ],
      [
        {
          content:
            "Complaint Office (Mohlanwal) 042-35341646\nComplaint Office (Orchard)     042-35470996   042-35470997\nComplaint Office (Nasheman) 042-35935515",
          colSpan: 6,
          styles: {
            lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0.1 },
            cellPadding: 0.5,
            fontSize: 8,
            fontStyle: "bold",
            halign: "left",
          },
        },
      ],
    ],
    theme: "grid",
    bodyStyles: {
      fillColor: false,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      halign: "center",
      valign: "middle",
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 20 },
      2: { cellWidth: 20 },
      6: { cellWidth: 65 },
    },
    // didParseCell: function (data) {
    //   if (data.section === "body") {
    //     if (data.row.index === 0 || data.row.index === 4 || data.row.index === 6) {
    //       data.cell.styles.minCellHeight = 3;
    //       data.cell.styles.fontSize = 8;
    //       data.cell.styles.cellPadding = 0;
    //       data.cell.styles.valign = "middle";
    //       data.cell.styles.fillColor = "black";
    //       data.cell.styles.textColor = "white";
    //     }
    //     if ((data.row.index === 1 && data.column.index >= 0 && data.column.index <= 2) || data.row.index === 5 || data.row.index === 7) {
    //       data.cell.styles.minCellHeight = 8;
    //       data.cell.styles.fontSize = 8;
    //       data.cell.styles.cellPadding = { top: 1 };
    //       data.cell.styles.valign = "top";
    //     }
    //     if (data.row.index === 2) {
    //       data.cell.styles.minCellHeight = 3;
    //       data.cell.styles.fontSize = 8;
    //       data.cell.styles.cellPadding = 0;
    //       data.cell.styles.valign = "middle";
    //       data.cell.styles.fontStyle = "bold";
    //     }
    //     if (data.row.index === 3) {
    //       data.cell.styles.minCellHeight = 15;
    //       data.cell.styles.fontSize = 8;
    //       data.cell.styles.cellPadding = 0;
    //       data.cell.styles.valign = "top";
    //     }
    //     if (data.row.index === 8) {
    //       data.cell.styles.minCellHeight = 30;
    //     }
    //   }
    // }
    didParseCell: function (data) {
      if (data.section !== "body") return;

      const { row, column, cell } = data;
      const r = row.index;
      const c = column.index;

      // Helper to merge style properties
      const setCell = (styles) => Object.assign(cell.styles, styles);

      // Header-style rows (black background)
      if (r === 0 || r === 4 || r === 8) {
        setCell({
          minCellHeight: 3,
          fontSize: 8,
          cellPadding: 0,
          valign: "middle",
          fillColor: "black",
          textColor: "white",
        });
      }

      // Top-aligned rows (multi-line or numeric data)
      if (r === 1 && c <= 2) {
        setCell({
          minCellHeight: 8,
          fontSize: 8,
          cellPadding: { top: 1 },
          valign: "top",
        });
      }
      if ((r >= 5 && r <= 7)|| (r >= 9 && r <=10)) {
        setCell({
          // minCellHeight: 6,
          fontSize: 8,
          cellPadding: { top: 0.2 },
          valign: "top",
        });
      }

      // Bold row
      if (r === 2) {
        setCell({
          minCellHeight: 3,
          fontSize: 8,
          cellPadding: 0,
          valign: "middle",
          fontStyle: "bold",
        });
      }

      // Tall row
      if (r === 3) {
        setCell({
          minCellHeight: 15,
          fontSize: 8,
          cellPadding: 0,
          valign: "top",
        });
      }

      // Urdu text or image row
      if (r === 11) {
        setCell({
          minCellHeight: 40,
        });
      }
    },
  });





  //Please Visit for Duplicate Bill:
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    head: [],
    body: [
      [
        {
          content:
            "   In case of non receipt or loss of bill,duplicate bill can be",
          styles: {
            lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0.1 },
            halign: "left",
          },
        },
        {
          content: "Quries regarding electric bills dial      ",
          styles: {
            lineWidth: { top: 0.1, right: 0.1, bottom: 0, left: 0 },
            halign: "right",
          },
        },
      ],
      [
        {
          content: "   obtained from Billing Offce before 5th of each month. ",
          styles: {
            lineWidth: { top: 0, right: 0, bottom: 0, left: 0.1 },
            halign: "left",
          },
        },
        {
          content: "042-35341623 (Ext.120-121-126 )   ",
          styles: {
            lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0 },
            halign: "right",
            fontStyle: "bold",
          },
        },
      ],
      [
        {
          content:
            "Please Visit for Duplicate Bill: https://www.e-billingbahriatownlahore.com",
          colSpan: 2,
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0.1, left: 0.1 } },
        },
      ],
    ],
    theme: "grid",
    bodyStyles: {
      fillColor: false,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      halign: "center",
      valign: "middle",
      cellPadding: 0,
    },
    didParseCell: function (data) {
      if (data.section !== "body") return;

      const {
        row,
        // column,
        cell,
      } = data;
      const r = row.index;
      // const c = column.index;

      // Helper to merge style properties
      const setCell = (styles) => Object.assign(cell.styles, styles);

      if (r === 0 || r === 1) {
        setCell({
          fontSize: 8,
          cellPadding: { top: 0.5 },
        });
      }
      if (r === 2) {
        setCell({
          fillColor: [225, 225, 225],
          fontStyle: "bold",
        });
      }
    },
  });
  let duplicatelinkY = doc.lastAutoTable.finalY + 3;
   

  //Bill Amount
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    head: [],
    body: [
      [
        {
          content: "",
          rowSpan: 22,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0.1, left: 0.1 } },
        },
        {
          content:
            "> In case of Gazetted Holidays on due date, bill will be received by bank on next working day.",
          colSpan: 5,
          styles: {
            lineWidth: { top: 0.1, right: 0.1, bottom: 0, left: 0 },
            cellPadding: { top: 0.5 },
          },
        },
      ],
      [
        {
          content:
            "> In case of non-payment of electric bill for one month your electricity will be disconnected.",
          colSpan: 5,
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0 } },
        },
      ],
      [
        {
          content:
            "Connection will be restored on payment of Reconnection fee as under:-",
          colSpan: 5,
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0.1, left: 0 } },
        },
      ],
      [
        { content: "Bill Amount", styles: {} },
        { content: "Charges", styles: {} },
        { content: "Bill Amount",colSpan:2, styles: {} },
        { content: "Charges", styles: {} },
      ],
      [
        {
          content: "Up to 1,000",
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0.1 } },
        },
        {
          content: "Rs.100/-",
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "Between 15,001 to 50,000",
          colSpan:2,
          styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "Rs.2,500/-",
          styles: { lineWidth: { top: 0.1, right: 0.1, bottom: 0, left: 0 } },
        },
      ],
      [
        {
          content: "1,001 to 5,000",
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.1 } },
        },
        {
          content: "Rs.500/-",
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "Between 50,001 to 1 Lac",
          colSpan:2,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } },
        },
        {
          content: "Rs.5,000/-",
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0 } },
        },
      ],
      [
        {
          content: "5,001 to 15,000",
          styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0.1 } },
        },
        {
          content: "Rs.1000/-",
          styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0 } },
        },
        {
          content: "Over 1 Lac",
          colSpan:2,
          styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0 } },
        },
        {
          content: "Rs.7,000",
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0.1, left: 0 } },
        },
      ],
      [
        {
          content:
            "> Minimum Charges. A-1 Residential (Rs-200/-) A-2-a Commercial ( Rs-450/-) E-1-i Temp (Rs-600/- ) PEAK / OFF PEAK TIMINGS",
          colSpan: 5,
          styles: { lineWidth: { top: 0.1, right: 0.1, bottom: 0.1, left: 0 } },
        },
      ],
      [
        { content: "Season", styles: {} },
        { content: "Peak Timing",colSpan:2, styles: {} },
        { content: "Off-Peak Timing",colSpan:2, styles: {} },
      ],
      [
        { content: "Dec to Feb",  styles: {} },
        { content: "5 PM to 9 PM",colSpan:2, styles: {} },
        { content: "Remaining 20 Hours",colSpan: 2, styles: {} },
      ],
      [
        { content: "Mar to May",  styles: {} },
        { content: "6 PM to 10 PM",colSpan:2, styles: {} },
        { content: "              -do-",colSpan: 2, styles: {} },
      ],
      [
        { content: "Jun to Aug", styles: {} },
        { content: "7 PM to 11 PM",colSpan:2, styles: {} },
        { content: "              -do-", colSpan: 2, styles: {} },
      ],
      [
        { content: "Sep to Nov",  styles: {} },
        { content: "6 PM to 10 PM",colSpan:2, styles: {} },
        { content: "              -do-",colSpan: 2, styles: {} },
      ],
      [
        {
          content: "FPA VAR",
          colSpan: 2,
          styles: {
            lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 },
            fontStyle: "bold",
          },
        },
        {
          content: `     ${electricityBillsNetMeter.fpa1}`,
          colSpan: 3,
          styles: { lineWidth: { top: 0.1, right: 0.1, bottom: 0, left: 0 } },
        },
      ],
      [
        {
          content: "FPA ED",
          colSpan: 2,
          styles: {
            lineWidth: { top: 0, right: 0, bottom: 0, left: 0 },
            fontStyle: "bold",
          },
        },
        {
          content: `     ${electricityBillsNetMeter.fpa2}`,
          colSpan: 3,
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0 } },
        },
      ],
      [
        {
          content: "FPA GST",
          colSpan: 2,
          styles: {
            lineWidth: { top: 0, right: 0, bottom: 0, left: 0 },
            fontStyle: "bold",
          },
        },
        {
          content: `     ${electricityBillsNetMeter.fpa3}`,
          colSpan: 3,
          styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0 } },
        },
      ],
      [
        { content: "Category", styles: {} },
        { content: "Max Permissible Export Units per Month",colSpan: 4, styles: {} }
      ],
      [
        { content: "", styles: {} },
        { content: "Mar", styles: {} },
        { content: "Apr", styles: {} },
        { content: "May", styles: {} },
        { content: "June", styles: {} },
      ],
      [
        { content: "5 Marla", styles: {} },
        { content: "375", styles: {} },
        { content: "375", styles: {} },
        { content: "500", styles: {} },
        { content: "500", styles: {} },
      ],
      [
        { content: "8 Marla", styles: {} },
        { content: "450", styles: {} },
        { content: "450", styles: {} },
        { content: "600", styles: {} },
        { content: "600", styles: {} },
      ],
      [
        { content: "10 Marla", styles: {} },
        { content: "600", styles: {} },
        { content: "600", styles: {} },
        { content: "800", styles: {} },
        { content: "800", styles: {} },
      ],
      [
        { content: "Kanal & Above", styles: {} },
        { content: "900", styles: {} },
        { content: "900", styles: {} },
        { content: "1200", styles: {} },
        { content: "1200", styles: {} },
      ]
    ],
    theme: "grid",
    bodyStyles: {
      fillColor: false,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      halign: "center",
      valign: "middle",
      cellPadding: 0,
      fontSize: 6,
    },
    columnStyles: {
      0: { cellWidth: 85 },
      2: { cellWidth: 18 },
      3: { cellWidth: 15 },
      4: { cellWidth: 15 },
      5: { cellWidth: 18 },
    },
    didParseCell: function (data) {
      if (data.section !== "body") return;

      const {
        row,
        column,
        cell,
      } = data;
      const r = row.index;
      const c = column.index;

      // Helper to merge style properties
      const setCell = (styles) => Object.assign(cell.styles, styles);

      if (r === 0 || r === 1 || r === 2 || r === 7) {
        setCell({
          halign: "left",
        });
      }
      if (r === 3 || r === 4 || r === 5 || r === 6) {
        setCell({
          halign: "left",
          cellPadding: { top: 0.5, left: 3 },
        });
      }
      if (r >= 8 && r <= 15) {
        setCell({
          halign: "left",
          cellPadding: { top: 0.5, left: 1 },
        });
      }
      if (r === 3) {
        setCell({
          fillColor: "black",
          textColor: "white",
        });
      }
      if (r === 1 || r === 2 || r === 8) {
        setCell({
          fontStyle: "bold",
        });
      }
     
      if (r === 7) {
        setCell({
          cellPadding: { top: 0.2, bottom: 0.2 },
        });
      }
       if (r >= 16 && r <= 21) {
        setCell({
          cellPadding: {top:0.5,bottom:0.5},
          fontSize: 7
        });
      }
       if ((c === 1 && r >= 16 && r <= 21) || r === 16 || r ===17) {
        setCell({
          fontStyle: "bold",
          
        });
      }
    },
  });

  let HistoryY = doc.lastAutoTable.finalY + 3;

  //Bank Copy
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    head: [],
    body: [
      [
        {
          content:
            "--------------------------------------------------- CUT HERE --------------------------------------------------",
          colSpan: 6,
          styles: {},
        },
      ],
      [
        { content: "Bank Copy", styles: {} },
        {
          content: "BAHRIA TOWNLAHORE - NET METER ELECTRICITY BILL",
          colSpan: 3,
          styles: { fontStyle: "bold" },
        },
        { content: "Reference No", styles: {} },
        { content: electricityBillsNetMeter.customerNo, styles: {} },
      ],
      [
        { content: electricityBillsNetMeter.customerName, colSpan: 2, styles: {} },
        {
          content: `${customerDetail.ploNo}    /   ${electricityBillsNetMeter.block}    /    ${electricityBillsNetMeter.sector}`,
          colSpan: 2,
          styles: {},
        },
        { content: "Meter Number", styles: {} },
        { content: electricityBillsNetMeter.meterNo, styles: {} },
      ],
      [
        { content: "Bill Month", colSpan: 2, styles: {} },
        { content: "Due Date", styles: {} },
        { content: "Barcode No.", styles: {} },
        { content: "Total Payable", styles: {} },
        {
          content: electricityBillsNetMeter.billAmountInDueDate,
          styles: { fontStyle: "bold" },
        },
      ],
      [
        {
          content: `${electricityBillsNetMeter.billingMonth} ${electricityBillsNetMeter.billingYear}`,
          colSpan: 2,
          styles: {},
        },
        {
          content: formatDate(electricityBillsNetMeter.dueDate),
          styles: { fontStyle: "bold" },
        },
        { content: electricityBillsNetMeter.btNo, styles: { fontStyle: "bold" } },
        { content: "Late Payment", styles: {} },
        {
          content: electricityBillsNetMeter.billAmountAfterDueDate,
          styles: { fontStyle: "bold" },
        }
      ]
    ],
    theme: "grid",
    bodyStyles: {
      fillColor: false,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      halign: "center",
      valign: "middle",
      cellPadding: { top: 0.5, bottom: 0.5 },
      fontSize: 8,
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 30 },
    },
  });

  let bankcopyY = doc.lastAutoTable.finalY;

  //BTL Copy
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    head: [],
    body: [
      [
        {
          content:
            "--------------------------------------------------- CUT HERE --------------------------------------------------",
          colSpan: 6,
          styles: {},
        },
      ],
      [
        { content: "BTL Copy", styles: {} },
        {
          content: "BAHRIA TOWNLAHORE - NET METER ELECTRICITY BILL",
          colSpan: 3,
          styles: { fontStyle: "bold" },
        },
        { content: "Reference No", styles: {} },
        { content: electricityBillsNetMeter.customerNo, styles: {} },
      ],
      [
        { content: electricityBillsNetMeter.customerName, colSpan: 2, styles: {} },
        {
          content: `${customerDetail.ploNo}    /   ${electricityBillsNetMeter.block}    /    ${electricityBillsNetMeter.sector}`,
          colSpan: 2,
          styles: {},
        },
        { content: "Meter Number", styles: {} },
        { content: electricityBillsNetMeter.meterNo, styles: {} },
      ],
      [
        { content: "Bill Month", colSpan: 2, styles: {} },
        { content: "Due Date", styles: {} },
        { content: "Barcode No.", styles: {} },
        { content: "Total Payable", styles: {} },
        {
          content: electricityBillsNetMeter.billAmountInDueDate,
          styles: { fontStyle: "bold" },
        },
      ],
      [
        {
          content: `${electricityBillsNetMeter.billingMonth} ${electricityBillsNetMeter.billingYear}`,
          colSpan: 2,
          styles: {},
        },
        {
          content: formatDate(electricityBillsNetMeter.dueDate),
          styles: { fontStyle: "bold" },
        },
        { content: electricityBillsNetMeter.btNo, styles: { fontStyle: "bold" } },
        { content: "Late Payment", styles: {} },
        {
          content: electricityBillsNetMeter.billAmountAfterDueDate,
          styles: { fontStyle: "bold" },
        },
      ],
    ],
    theme: "grid",
    bodyStyles: {
      margin:0,
      fillColor: false,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      halign: "center",
      valign: "middle",
      cellPadding: { top: 0.5, bottom: 0.5 },
      fontSize: 8,
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 30 },
    },
  });






  //Electricity Table
  // const isCredit = electricityBillsNetMeter.nmTotalCredit < 0;
  autoTable(doc, {
    startY: headerY + 3,
    margin: { left: 131 },
    tableWidth: 64.75,
    body: [
      ["Energy Charges", `-                 ${electricityBillsNetMeter.unitsAmount}`],
      [`OPC @ ${electricityBillsNetMeter.opcRate}    -    ${electricityBillsNetMeter.opc}`, `  GST    -    ${electricityBillsNetMeter.gst}`],
      ["PTV Fee", `-                 ${electricityBillsNetMeter.ptvfee}`],
      ["Further Tax", `-                 ${electricityBillsNetMeter.furthertax}`],
      ["Sales Tax", `-                 ${electricityBillsNetMeter.salesTax ?? ""}`],
      ["Extra Tax", `-                 ${electricityBillsNetMeter.extraTax ?? ""}`],
      ["Income Tax", `-                 ${electricityBillsNetMeter.incomeTax ?? ""}`],
      [{ content: `FPA (Feb-24 @4.9213)`, styles: { fontSize: 7.5 } }, `-                ${electricityBillsNetMeter.fpacharges}`],
      ["NM(Cur-crdt)", `-                ${electricityBillsNetMeter.nmPreviousCredit}`],
      ["NM(Pre-Crdt)", `-                ${electricityBillsNetMeter.nmCurrentCredit}`],
      [{ content: "NM(Total-Crdt) Remaining", styles: { fontSize: 7.4 } }, `-                ${electricityBillsNetMeter.nmTotalCredit}`],
      ["Current Bill", `-                 ${electricityBillsNetMeter.billAmount}`],
      ["Arrears", `-                 ${electricityBillsNetMeter.arrears}`],
      // ["Total Payable", `-                 ${isCredit ? "CR " : ""}${electricityBillsNetMeter.billAmountInDueDate}`],
      ["Total Payable", `-                 ${electricityBillsNetMeter.billAmountInDueDate}`],
      ["L.P Surcharge", `-                 ${electricityBillsNetMeter.billSurcharge}`],
      // ["Late Payment", `-                 ${isCredit ? "CR " : ""}${electricityBillsNetMeter.billAmountAfterDueDate}`],
      ["Late Payment", `-                 ${electricityBillsNetMeter.billAmountAfterDueDate}`],
    ],
    theme: "grid",
    bodyStyles: {
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      valign: "middle",
      fillColor: false,
      fontSize:8,
      cellPadding: 1.53
    },
    columnStyles: {
      0: { cellWidth: 33, lineWidth:{right:0, left:0.1, top:0.1, bottom:0.1} },
      1: { lineWidth:{right:0.1, left:0, top:0.1, bottom:0.1} },
    },
  
  });

  //Bank Account No (BTL Branch)
  autoTable(doc, {
    startY: headerY + 4,
    margin: { left: 74.5 },
    tableWidth: 55.5,
    body: [
      ["UBL Bank(PK60 UNIL 0109000201226209)"],
      [""],
      ["Facilitation Center Bahria Mohlanwal (only Cash)"],
      [""],
      ["Facilitation Center Bahria Orchard (only Cash)"],
      [""],
      ["Bahria Orchard Head Office (only Cash)"],
      [""],
    ],
    theme: "plain",
    bodyStyles: {
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      valign: "middle",
      fontSize: 6.5,
      cellPadding: { top: 0.5 },
      halign: "left",
    },
  });

  //BiLL History
  autoTable(doc, {
    startY: duplicatelinkY,
    margin: { left: 26 },
    tableWidth: 60,
    body: [
      [{ content: "Month", colSpan: 2 }, "Units", "Bill"],
      [`${billHistory[0]?.billingMonth?.slice(0, 3)}`, `${billHistory[0]?.billingYear}`, `${billHistory[0]?.units}`, `${billHistory[0]?.bill}`],
      [`${billHistory[1]?.billingMonth?.slice(0, 3)}`, `${billHistory[1]?.billingYear}`, `${billHistory[1]?.units}`, `${billHistory[1]?.bill}`],
      [`${billHistory[2]?.billingMonth?.slice(0, 3)}`, `${billHistory[2]?.billingYear}`, `${billHistory[2]?.units}`, `${billHistory[2]?.bill}`],
      [`${billHistory[3]?.billingMonth}`,              `${billHistory[3]?.billingYear}`, `${billHistory[3]?.units}`, `${billHistory[3]?.bill}`],
      [`${billHistory[4]?.billingMonth}`,              `${billHistory[4]?.billingYear}`, `${billHistory[4]?.units}`, `${billHistory[4]?.bill}`],
      [`${billHistory[5]?.billingMonth}`,              `${billHistory[5]?.billingYear}`, `${billHistory[5]?.units}`, `${billHistory[5]?.bill}`],
      [`${billHistory[6]?.billingMonth}`,              `${billHistory[6]?.billingYear}`, `${billHistory[6]?.units}`, `${billHistory[6]?.bill}`],
      [`${billHistory[7]?.billingMonth?.slice(0, 3)}`, `${billHistory[7]?.billingYear}`, `${billHistory[7]?.units}`, `${billHistory[7]?.bill}`],
      [`${billHistory[8]?.billingMonth?.slice(0, 3)}`, `${billHistory[8]?.billingYear}`, `${billHistory[8]?.units}`, `${billHistory[8]?.bill}`],
      [`${billHistory[9]?.billingMonth?.slice(0, 3)}`, `${billHistory[9]?.billingYear}`, `${billHistory[9]?.units}`, `${billHistory[9]?.bill}`],
      [`${billHistory[10]?.billingMonth?.slice(0, 3)}`, `${billHistory[10]?.billingYear}`, `${billHistory[10]?.units}`, `${billHistory[10]?.bill}`],
      [`${billHistory[11]?.billingMonth?.slice(0, 3)}`, `${billHistory[11]?.billingYear}`, `${billHistory[11]?.units}`, `${billHistory[11]?.bill}`],
    ],
    theme: "plain",
    bodyStyles: {
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      valign: "middle",
      halign: "center",
      fontSize: 7,
      cellPadding: 0.3,
    },
    columnStyles: {
      // 0: { cellWidth: 10 },
      // 1: { cellWidth: 10 },
      // 2: { cellWidth: 15 },
    },
    didParseCell: function (data) {
      if (data.section !== "body") return;

      const {
        row,
        // column,
        cell,
      } = data;
      const r = row.index;
      // const c = column.index;

      // Helper to merge style properties
      const setCell = (styles) => Object.assign(cell.styles, styles);

      if (r === 0) {
        setCell({
          fillColor: "black",
          textColor: "white",
        });
      }
    },
  });

  // Images
  //doc.addImage("imageName", "type", x, y, width, height);
  doc.addImage("logo.png", "PNG", 15, 18, 18, 18);
  doc.addImage("urdumessage3.png", "PNG", 21, duplicatelinkY + 49, 70, 14);
  doc.setFont("times", "normal");
  doc.setFontSize(12);
  doc.text("Note:", 21, duplicatelinkY + 48);
  doc.addImage("scissors.png", "PNG", 161, HistoryY - 2.5, 3.5, 3.5);
  doc.addImage("scissors.png", "PNG", 161, bankcopyY+0.5, 3.5, 3.5);

  


  

  // window.open(doc.output("bloburl"), "_blank");



  const fileName = `NetMetering ${electricityBillsNetMeter.btNo} ${electricityBillsNetMeter.billingMonth} ${electricityBillsNetMeter.billingYear} .pdf`;
  const blob = doc.output("blob");
  const blobUrl = URL.createObjectURL(blob);


  const faviconUrl = `${window.location.origin}/solar-cell.png`;

  // ✅ HTML structure
  const html = `
<html>
  <head>
    <title>${fileName.replace(".pdf", "")}</title>

    <!-- PNG favicon -->
    <link rel="icon" type="image/png" href="${faviconUrl}" />

    <style>
      body {
        margin: 0;
        background: #f4f4f4;
        font-family: 'Segoe UI', sans-serif;
      }
      .download-btn {
        position: fixed;
        top: 7px;
        right: 95px;
        background: #1976d2;
        color: white;
        padding: 10px 18px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      }
      .download-btn:hover {
        background: #0d47a1;
      }
      embed {
        border: none;
      }
    </style>
  </head>
  <body>
    <a href="${blobUrl}" download="${fileName}" class="download-btn">⬇ Download Bill</a>
    <embed src="${blobUrl}" type="application/pdf" width="100%" height="100%" />
    <script>
      window.addEventListener('unload', () => URL.revokeObjectURL("${blobUrl}"));
    </script>
  </body>
</html>
`;

  const newTab = window.open();
  newTab.document.open();
  newTab.document.write(html);
  newTab.document.close();

};

