// src/reports/MaintenanceBill.js
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import JsBarcode from "jsbarcode";


// ✅ Reusable date formatting function
const formatDate = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString)
    .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .replace(/ /g, "-");
};

export const generateMaintenancePDF = (billingData, projects) => {

// 🔹 Step 1: Extract both objects from API response
 const { maintenanceBills, customersMaintenance } = billingData[0];

  const doc = new jsPDF("p", "mm", "a4");

  

  //Header
  autoTable(doc, {
    head: [],
    body: [
      [
        { content: "", rowSpan: 5, styles: { valign: "middle" } },
        {
          content:
            "BAHRIA TOWN PVT-SERVICES & MAINTENANCE",
          colSpan: 4,
          styles: {
            lineWidth: { top: 0.1, right: 0.1, bottom: 0, left: 0.1 },
            fontStyle: "bold",
            font: "helvetica",
            fontSize: 13,
            minCellHeight: 7,
            cellPadding: { top: 1.5 },
            halign: "center",
          },
        },
      ],
      [
        {
          content: "YOUR LIFE STYLE DESTINATION",
          colSpan: 4,
          styles: {
            lineWidth: { top: 0, right: 0.1, bottom: 0.1, left: 0.1 },
            fontSize: 6,
            minCellHeight: 4,
            // fontStyle: 'bold',
            cellPadding: { left: 26.5 },
            halign: "Left",
          },
        },

      ],

      [
        { content: `${customersMaintenance.customerName} \nPloNo  ${customersMaintenance.ploNo} \nBlock  ${customersMaintenance.block}   Sector  ${customersMaintenance.sector}`, colSpan: 3, styles: { halign: "left", fontSize: 8 } },
        { content: "", rowSpan: 3, styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0.1 } } },
      ],


      [
        { content: "BILLING MONTH", styles: { fontSize: 7 } },
        { content: "ISSUE DATE", styles: { fontSize: 7 } },
        { content: "DUE DATE", styles: { fontSize: 7 } },
      ],

      [
        { content: `${maintenanceBills.billingMonth}\n${maintenanceBills.billingYear}`, styles: { fontSize: 8 } },
        { content: formatDate(maintenanceBills.issueDate), styles: { fontSize: 8 } },
        { content: formatDate(maintenanceBills.dueDate), styles: { fontSize: 8 } },
      ],

    ],
    theme: "grid",
    bodyStyles: {
      fillColor: false,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      halign: "center",
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 32 },
      4: { cellWidth: 65 }
    },


    didParseCell: function (data) {
      if (data.section !== "body") return;

      const { row,
        // column,
        cell } = data;
      const r = row.index;
      // const c = column.index;

      // Helper to merge style properties
      const setCell = (styles) => Object.assign(cell.styles, styles);

      if (r === 3) {
        setCell({
          minCellHeight: 1,
          fillColor: [190, 190, 190],
          cellPadding: 0.2,
        })

      }

      if (r === 4) {
        setCell({
          minCellHeight: 15
        })

      }

    }
  });


  let headerY = doc.lastAutoTable.finalY;

  //Header Table
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    body: [

      [
        { content: "BARCODE NO.", styles: {} },
        { content: "REFRENCE NO . ", styles: {} },
        { content: "BANK ACCOUNT NO . ", colSpan: 2, styles: {} },
        { content: "Please Visit for Duplicate Bill visit:https://e-billingbahriatownlahore.com", rowSpan: 13, styles: { lineWidth: { top: 0, right: 0.1, bottom: 0.1, left: 0.1 }, fontStyle: "bold", halign: "left" } },
      ],

      [
        { content: `${maintenanceBills.btNo}`, styles: {} },
        { content: `${maintenanceBills.customerNo}`, styles: {} },
        { content: "", colSpan: 2, styles: {} },
      ],


      [
        { content: "Maintenance Charges", colSpan: 2, styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0.5 }, halign: "left" } },
        { content: "Rs", styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0 } } },
        { content: `${maintenanceBills.maintCharges}`, styles: { lineWidth: { top: 0.1, right: 0.5, bottom: 0, left: 0 } } },
      ],

      [
        { content: "Tax on Services", colSpan: 2, styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.5 }, halign: "left" } },
        { content: "Rs", styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } } },
        { content: `${maintenanceBills.taxAmount}`, styles: { lineWidth: { top: 0, right: 0.5, bottom: 0, left: 0 } } },
      ],


      [
        { content: "Fine", colSpan: 2, styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.5 }, halign: "left" } },
        { content: "Rs", styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } } },
        { content: `${maintenanceBills.fine}`, styles: { lineWidth: { top: 0, right: 0.5, bottom: 0, left: 0 } } },
      ],


      [
        { content: "Paint Charges", colSpan: 2, styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.5 }, halign: "left" } },
        { content: "Rs", styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } } },
        { content: "0", styles: { lineWidth: { top: 0, right: 0.5, bottom: 0, left: 0 } } },
      ],


      [
        { content: "Water Charges", colSpan: 2, styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.5 }, halign: "left" } },
        { content: "Rs", styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } } },
        { content: `${maintenanceBills.waterCharges}`, styles: { lineWidth: { top: 0, right: 0.5, bottom: 0, left: 0 } } },
      ],


      [
        { content: "Advance Charges", colSpan: 2, styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.5 }, halign: "left" } },
        { content: "Rs", styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } } },
        { content: "0", styles: { lineWidth: { top: 0, right: 0.5, bottom: 0, left: 0 } } },
      ],


      [
        { content: "Previous Arrears(If Any)", colSpan: 2, styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.5 }, halign: "left" } },
        { content: "Rs", styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } } },
        { content: `${maintenanceBills.arrears}`, styles: { lineWidth: { top: 0, right: 0.5, bottom: 0, left: 0 } } },
      ],


      [
        { content: "G. Total", colSpan: 2, styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.5 }, halign: "left" } },
        { content: "Rs", styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } } },
        { content: `${maintenanceBills.billAmountInDueDate}`, styles: {} },
      ],


      [
        { content: "Amount Payable within due Date", colSpan: 2, styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.5 }, fontSize: 8, halign: "left" } },
        { content: "Rs", styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } } },
        { content: `${maintenanceBills.billAmountInDueDate}`, styles: {} },
      ],


      [
        { content: "Surcharge", colSpan: 2, styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.5 }, halign: "left" } },
        { content: "Rs", styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } } },
        { content: `${maintenanceBills.billSurcharge}`, styles: {} },
      ],


      [
        { content: "Amount Payable after due date ", colSpan: 2, styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0.5 }, halign: "left" } },
        { content: "Rs", styles: { lineWidth: { top: 0, right: 0, bottom: 0, left: 0 } } },
        { content: `${maintenanceBills.billAmountAfterDueDate}`, styles: {} },
      ],


    ],
    theme: "grid",
    bodyStyles: {
      fillColor: false,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      fontSize: 8,
      halign: "center",
    },
    columnStyles: {
      0: { cellWidth: 25 },
      1: { cellWidth: 32 },
      4: { cellWidth: 65 }
    },


    didParseCell: function (data) {
      if (data.section !== "body") return;

      const { row,
        column,
        cell } = data;
      const r = row.index;
      const c = column.index;

      // Helper to merge style properties
      const setCell = (styles) => Object.assign(cell.styles, styles);


      if (r === 0) {
        setCell({
          minCellHeight: 1,
          cellPadding: 0.2,
          fillColor: [190, 190, 190]
        })

      }


      if (c === 4) {
        setCell({
          fillColor: false,
          valign: "bottom",
          cellPadding: { bottom: 10, left: 2 },
          //halign:"center"
        })

      }
      if (r === 1) {
        setCell({
          minCellHeight: 28,
          //fillColor:[190, 190, 190]
        })

      }

      if (r === 10) {
        setCell({
          minCellHeight: 1,
          fillColor: [190, 190, 190]
        })

      }

      if (r === 12) {
        setCell({
          minCellHeight: 1,
          fillColor: [190, 190, 190]
        })

      }

      if (r >= 2 && r <= 12) {
        setCell({
          cellPadding: 1.2
        })

      }

    }
  });

  let chargesY = doc.lastAutoTable.finalY;
   

  // ✅ Notice
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    body: [
      [
        { content: "Notice", styles: { lineWidth: { top: 0.1, right: 0.1, bottom: 0, left: 0.1 }, fontStyle: "bold", fontSize: 8, halign: "left" } },


      ],
      [
        { content: "", styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0.1 }, fontStyle: "bold", fontSize: 8, halign: "left" } },
      ],

      [
        { content: "1. The above charges are in lieu of services i.e Security,Solid Wasre Disposal,Cleaning and maintaining of the Streets/Roads etc.", styles: { lineWidth: { top: 0, right: 0.1, bottom: 0, left: 0.1 }, fontStyle: "bold", fontSize: 8 }, halign: "left" },
      ],

    ],
    theme: "grid",
    bodyStyles: {
      fillColor: false,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      //halign: "center",
    },
    columnStyles: {
      //0: { cellWidth: 20 },
      // 1:{cellWidth:70},
      // 2:{cellWidth: 55}
    },
  });

  let NoticeY = doc.lastAutoTable.finalY;

  // ✅ Bank copy
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    body: [

      [
        { content: '--------------------------------------------------     CUT HERE    ----------------------------------------------', colSpan: 5, styles: { halign: "center" } }
      ],
      [

        { content: "Bank Copy", styles: { fontStyle: "normal", fontSize: 7, halign: "center" } },
        { content: "BAHRIA TOWN LAHORE - MAINTENANCE BILL", colSpan: 4, styles: { fontStyle: "bold", fontSize: 8, halign: "center" } },

      ],


      [
        { content: `Name : ${customersMaintenance.customerName} \nAddress :  ${customersMaintenance.ploNo}            ${customersMaintenance.block} \nSector:   ${customersMaintenance.sector} `, colSpan: 3, styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0.1 }, fontStyle: "normal", fontSize: 8, halign: "left" } },
        { content: `Refrence Number \n ${customersMaintenance.customerNo}`, styles: { fontStyle: "normal", fontSize: 8, halign: "center" } },
        { content: `${maintenanceBills.btNo}`, styles: { fontStyle: "normal", fontSize: 8, halign: "left" } },
      ],



      [
        { content: "BILL MONTH", colSpan: 2, styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: "DUE DATE", styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: "PAYMENT WITHIN DUE DATE", styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: `${maintenanceBills.billAmountInDueDate}`, styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
      ],


      [
        { content: `${maintenanceBills.billingMonth}`, colSpan: 2, styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: formatDate(maintenanceBills.dueDate), styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: "PAYMENT AFTER DUE DATE", styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: `${maintenanceBills.billAmountAfterDueDate}`, styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
      ],



      [
        { content: '--------------------------------------------------     CUT HERE    ----------------------------------------------', colSpan: 5, styles: { halign: "center" } }
      ],

      [

        { content: "BTL Copy ", styles: { fontStyle: "normal", fontSize: 7, halign: "center" } },
        { content: "BAHRIA TOWN LAHORE - MAINTENANCE BILL", colSpan: 4, styles: { fontStyle: "bold", fontSize: 8, halign: "center" } },

      ],


      [
        { content: `Name : ${customersMaintenance.customerName} \nAddress :  ${customersMaintenance.ploNo}              ${customersMaintenance.block} \nSector:   ${customersMaintenance.sector} `, colSpan: 3, styles: { lineWidth: { top: 0.1, right: 0, bottom: 0, left: 0.1 }, fontStyle: "normal", fontSize: 8, halign: "left" } },
        { content: `Refrence Number \n ${customersMaintenance.customerNo}`, styles: { fontStyle: "normal", fontSize: 8, halign: "center" } },
        { content: `${maintenanceBills.btNo}`, styles: { fontStyle: "normal", fontSize: 8, halign: "left" } },
      ],



      [
        { content: "BILL MONTH", colSpan: 2, styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: "DUE DATE", styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: "PAYMENT WITHIN DUE DATE", styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: `${maintenanceBills.billAmountInDueDate}`, styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
      ],


      [
        { content: `${maintenanceBills.billingMonth}`, colSpan: 2, styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: formatDate(maintenanceBills.dueDate), styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: "PAYMENT AFTER DUE DATE", styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
        { content: `${maintenanceBills.billAmountAfterDueDate}`, styles: { fontStyle: "normal", fontSize: 7, halign: "left" } },
      ],

      [
        { content: "For duplicate bill visit:https://e-billingbahriatownlahore.com", colSpan: 5, styles: { lineWidth: { top: 0, right: 0, bottom: 0.1, left: 0 }, fontStyle: "bold", halign: "center" } },
      ]

    ],


    theme: "grid",
    bodyStyles: {
      fillColor: false,
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      // halign: "left",
    },

    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 30 },
      3: { cellWidth: 40 }
    },
    didParseCell: function (data) {
      if (data.section !== "body") return;

      const { row,
        // column,
        cell } = data;
      const r = row.index;
      // const c = column.index;

      // Helper to merge style properties
      const setCell = (styles) => Object.assign(cell.styles, styles);

      if (r === 6) {
        setCell({
          minCellHeight: 20
        })

      }

    }

  });


  //Bank Account No (BTL Branch)
  autoTable(doc, {
    startY: headerY + 6,
    margin: { left: 74 },
    tableWidth: 60,
    body: [
      ["Faysal Bank (3130301900222505)"],
      ["Facilitation Center Bahria-Alfalah plaza(only Cash)"],
      ["Facilitation Center Bahria Orchard (only Cash) "],
      [""],
      ["Bill Collection Timing From"],
      ["9:00 to 17:00(Only Working Days)"],
      [""],
    ],
    theme: "plain",
    bodyStyles: {
      textColor: [0, 0, 0],
      lineColor: [0, 0, 0],
      valign: "middle",
      fontSize: 7,
      cellPadding: { top: 0.5 },
      halign: "left"
    }
  });

  // 🔹 Watermark: DUPLICATE BILL
  doc.saveGraphicsState(); // <-- save current graphics state
  doc.setGState(new doc.GState({ opacity: 1 })); // Only affects this block
  doc.setFont("helvetica", "normal");
  doc.setFontSize(55);
  doc.setTextColor(165, 165, 165); // Light gray
  doc.text("Duplicate Bill", 40, 120, { angle: 20 });
  doc.text("Duplicate  Bill", 40, 220, { angle: 20 });
  doc.restoreGraphicsState(); // <-- restore so rest of PDF is normal


  // Generate Barcode
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, "BTL-10014September2025", {
    format: "CODE39",
    displayValue: true,
    fontSize: 14,
  });
  const imgData = canvas.toDataURL("image/png");
  doc.addImage(imgData, "PNG", 86, NoticeY + 53, 70, 14);


  doc.addImage("Bahria_Town_Logo.png", "PNG", 18, 25, 17, 20);
  doc.addImage("urduinstructionmaint02.jpeg", "JPEG", 20, chargesY + 5, 170, 8);
  doc.addImage("scissors.png", "PNG", 178, NoticeY + 2, 3.8, 3.8);
  doc.addImage("scissors.png", "PNG", 178, NoticeY + 42, 3.8, 3.8);


  
  // window.open(doc.output("bloburl"), "_blank");

  // ✅ 1. Proper filename banana
  const fileName = `Maintenance Bill Lahore ${maintenanceBills.btNo}.pdf`;

  // ✅ 1. Create a Blob and a temporary URL
  const blob = doc.output("blob");
  const blobUrl = URL.createObjectURL(blob);

  const html = `
    <html>
      <head>
        <title>${fileName.replace(".pdf", "")}</title>
      </head>
      <body style="margin:0; background:#f0f0f0;">
        <div style="position:fixed; top:16px; right:125px; z-index:10;">
          <a href="${blobUrl}" download="${fileName}" 
             style="background:#d32f2f; color:white; padding:10px 20px; border-radius:8px;
                    text-decoration:none; font-family:sans-serif; font-weight:bold;">
            ⬇ Download Bill
          </a>
        </div>
        <embed src="${blobUrl}" type="application/pdf" width="100%" height="100%" />
      </body>
    </html>
  `;

  const newTab = window.open();
  newTab.document.write(html);
  newTab.document.close();
};

