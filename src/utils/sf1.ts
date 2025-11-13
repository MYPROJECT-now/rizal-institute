import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportSF1() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("School Form 1 (SF1)");

  // === COLUMN WIDTHS ===
  sheet.getColumn(1).width = 3;
  sheet.getColumn(2).width = 32;
  sheet.getColumn(3).width = 13;
  sheet.getColumn(4).width = 7;
  sheet.getColumn(5).width = 19;
  sheet.getColumn(6).width = 22;
  sheet.getColumn(7).width = 10;
  sheet.getColumn(8).width = 17;
  sheet.getColumn(9).width = 15;
  sheet.getColumn(10).width = 22;
  sheet.getColumn(11).width = 15;
  sheet.getColumn(12).width = 18;
  sheet.getColumn(13).width = 15;
  sheet.getColumn(14).width = 25;
  sheet.getColumn(15).width = 25;
  sheet.getColumn(16).width = 20;
  sheet.getColumn(17).width = 15;
  sheet.getColumn(18).width = 18;
  sheet.getColumn(19).width = 20;
  sheet.getColumn(20).width = 20;
  sheet.getColumn(21).width = 18;
  sheet.getColumn(22).width = 18;
  sheet.getColumn(23).width = 24;

  
  sheet.getRow(1).height = 30;
  sheet.getRow(2).height = 22;
  sheet.getRow(3).height = 22;
  sheet.getRow(4).height = 55;
  sheet.getRow(5).height = 25;
  sheet.getRow(6).height = 65;
  sheet.getRow(7).height = 11;
  sheet.getRow(8).height = 45;
  sheet.getRow(9).height = 90;
  for (let i = 10; i <= 59; i++) sheet.getRow(i).height = 18;
  // === ADD IMAGE ===
  const response = await fetch("/form.png");
  const imageBlob = await response.blob();
  const arrayBuffer = await imageBlob.arrayBuffer();
  const imageId = workbook.addImage({ buffer: arrayBuffer, extension: "png" });
  sheet.addImage(imageId, "A1:B6");

  // === TITLE ===
  sheet.mergeCells("B1:S1");
  sheet.getCell("B1").value = "School Form 1 (SF 1) School Register";
  sheet.getCell("B1").alignment = { horizontal: "center", vertical: "middle" };
  sheet.getCell("B1").font = { size: 22, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("B2:S2");
  sheet.getCell("B2").value = "(This replaces Form 1, Master List & STS Form 2-Family Background and Profile)";
  sheet.getCell("B2").alignment = { horizontal: "center", vertical: "middle" };
  sheet.getCell("B2").font = { size: 12, italic: true, name: "Arial Narrow" };

  // === INFO CELLS ===
  
  sheet.mergeCells("D4:E4");
  sheet.getCell("D4").value = "School ID";
  sheet.getCell("D4").alignment = { horizontal: "right", vertical: "middle" };
  sheet.getCell("D4").font = { size: 28,  name: "Arial Narrow" };

  sheet.getCell("F4").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  sheet.getCell("F4").alignment = { horizontal: "left", vertical: "middle" };
  sheet.getCell("F4").font = { size: 28,  name: "Arial Narrow" };


  sheet.mergeCells("C6:E6");
  sheet.getCell("C6").value = "School Name";
  sheet.getCell("C6").alignment = { horizontal: "right", vertical: "middle" };
  sheet.getCell("C6").font = { size: 28,  name: "Arial Narrow" };

  sheet.mergeCells("F6:K6");
  sheet.getCell("F6").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  sheet.getCell("F6").alignment = { horizontal: "left", vertical: "middle" };
  sheet.getCell("F6").font = { size: 28,  name: "Arial Narrow" };

  sheet.mergeCells("L4:M4");
  sheet.getCell("L4").value = "Division:";
  sheet.getCell("L4").alignment = { horizontal: "right", vertical: "middle" };
  sheet.getCell("L4").font = { size: 28,  name: "Arial Narrow" };

  sheet.mergeCells("N4:Q4");
  sheet.getCell("N4").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  sheet.getCell("N4").alignment = { horizontal: "left", vertical: "middle" };
  sheet.getCell("N4").font = { size: 28,  name: "Arial Narrow" };

  sheet.mergeCells("M6:O6");
  sheet.getCell("M6").value = "School Year:";
  sheet.getCell("M6").alignment = { horizontal: "right", vertical: "middle" };
  sheet.getCell("M6").font = { size: 28,  name: "Arial Narrow" };

  sheet.mergeCells("P6:Q6");
  sheet.getCell("P6").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  sheet.getCell("P6").alignment = { horizontal: "left", vertical: "middle" };
  sheet.getCell("P6").font = { size: 28,  name: "Arial Narrow" };

  sheet.mergeCells("S4:T4");
  sheet.getCell("S4").value = "District:";
  sheet.getCell("S4").alignment = { horizontal: "right", vertical: "middle" };
  sheet.getCell("S4").font = { size: 28,  name: "Arial Narrow" };

  sheet.mergeCells("U4:X4");
  sheet.getCell("U4").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  sheet.getCell("U4").alignment = { horizontal: "left", vertical: "middle" };
  sheet.getCell("U4").font = { size: 28,  name: "Arial Narrow" };


  sheet.mergeCells("S6:T6");
  sheet.getCell("S6").value = "Grade Level:";
  sheet.getCell("S6").alignment = { horizontal: "right", vertical: "middle" };
  sheet.getCell("S6").font = { size: 28,  name: "Arial Narrow" };

    sheet.mergeCells("U6:V6");
  sheet.getCell("U6").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  sheet.getCell("U6").alignment = { horizontal: "left", vertical: "middle" };
  sheet.getCell("U6").font = { size: 28,  name: "Arial Narrow" };

  sheet.getCell("W6").value = "Section:";
  sheet.getCell("W6").alignment = { horizontal: "right", vertical: "middle" };
  sheet.getCell("W6").font = { size: 28,  name: "Arial Narrow" };

  sheet.mergeCells("X6:Z6");
  sheet.getCell("X6").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  sheet.getCell("X6").alignment = { horizontal: "left", vertical: "middle" };
  sheet.getCell("X6").font = { size: 28,  name: "Arial Narrow" };

  // === HEADER ROWS (Explicit placement) ===
  const headerRow1 = [
    "", 
    "LRN", 
    "NAME\n(Last Name, First Name, Middle Name)", 
    "Sex (M/F)",
    "BIRTH DATE\n(mm/dd/yyyy)", 
    "AGE as of\n1st Friday June", 
    "MOTHER TONGUE",
    "IP (Ethnic Group)", 
    "RELIGION", 
    "ADDRESS", 
    "", 
    "", 
    "", 
    "PARENTS", 
    "",
    "GUARDIAN\n(if not Parent)", 
    "", 
    "Contact Number\nof Parent or Guardian", 
    "REMARKS"
  ];
  const headerRow2 = [
    "", "", "", "", "", "", "", "", "",
    "House #/Street/Sitio/Purok", "Barangay", "Municipality/City", "Province",
    "Father’s Name\n(Last Name, First Name, Middle Name)",
    "Mother’s Maiden Name\n(Last Name, First Name, Middle Name)",
    "Name", "Relationship", "", "(Please refer to legend)"
  ];

  // place these manually to fixed rows
  sheet.getRow(8).values = headerRow1;
  sheet.getRow(9).values = headerRow2;

  // sheet.mergeCells("A8:Z9"); 
  sheet.mergeCells("A8:A9"); 
  sheet.mergeCells("B8:B9"); 
  sheet.mergeCells("C8:F9"); 
  sheet.mergeCells("G8:G9"); 
  sheet.mergeCells("H8:H9"); 
  sheet.mergeCells("I8:I9"); 
  sheet.mergeCells("J8:J9"); 
  sheet.mergeCells("K8:K9"); 
  sheet.mergeCells("L8:L9"); 
  sheet.mergeCells("M8:R8"); 
  sheet.mergeCells("N9:O9");
  sheet.mergeCells("P9:Q9");
  sheet.mergeCells("S8:T8"); 
  sheet.getCell("T9").border = {
    top: { style: "thin" },
    right: { style: "thin" },
    bottom: { style: "thin" },

  };
  sheet.getCell("U9").border = {
    top: { style: "thin" },
    right: { style: "thin" },
    bottom: { style: "thin" },

  };
  sheet.getCell("V9").border = {
    top: { style: "thin" },
    right: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.mergeCells("U8:V8"); 
  sheet.mergeCells("W8:W9"); 
  sheet.mergeCells("X8:Z9"); 




  // === STYLE HEADERS ===
  [8, 9].forEach((r) => {
    const row = sheet.getRow(r);
    row.eachCell((cell) => {
      cell.font = { bold: true, name: "Arial Narrow", size: 16 };
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // === SAMPLE STUDENT ROWS ===
  for (let i = 10; i <= 25; i++) {
    const row = sheet.getRow(i);
    row.height = 18;
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  }

  // === EXPORT ===
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "School_Form_1_SF1.xlsx");
}
