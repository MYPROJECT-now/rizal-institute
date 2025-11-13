import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportSF1() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("School Form 1 (SF1)");

  // === COLUMN WIDTHS (adjusted for logo balance) ===
  sheet.getColumn(1).width = 3;  // A = padding / logo space
  sheet.getColumn(2).width = 32; // B = logo width
  sheet.getColumn(3).width = 13; // rest of your structure follows
  sheet.getColumn(4).width = 7;
  sheet.getColumn(5).width = 19;
  sheet.getColumn(6).width = 18;
  sheet.getColumn(7).width = 18;
  sheet.getColumn(8).width = 18;
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

  // === ROW HEIGHTS ===
  sheet.getRow(1).height = 30;
  sheet.getRow(2).height = 22;
  sheet.getRow(3).height = 22;
  sheet.getRow(4).height = 55;
  sheet.getRow(5).height = 25;
  sheet.getRow(6).height = 65;
  sheet.getRow(7).height = 11;
  sheet.getRow(8).height = 16;
  sheet.getRow(9).height = 16;
  for (let i = 10; i <= 59; i++) sheet.getRow(i).height = 10;

  // === ADD IMAGE FROM PUBLIC FOLDER (A1:B6) ===
  const response = await fetch("/form.png"); // ✅ image from public folder
  const imageBlob = await response.blob();
  const arrayBuffer = await imageBlob.arrayBuffer();

  const imageId = workbook.addImage({
    buffer: arrayBuffer,
    extension: "png",
  });

  // The image scales to the merged cell range
  sheet.addImage(imageId, "A1:B6");

  // === TITLE ===
  sheet.mergeCells("B1:S1");
  sheet.getCell("B1").value = "School Form 1 (SF 1) School Register";
  sheet.getCell("B1").alignment = { horizontal: "center", vertical: "middle" };
  sheet.getCell("B1").font = { size: 22, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("B2:S2");
  sheet.getCell("B2").value = "(This replaces  Form 1, Master List & STS Form 2-Family Background and Profile)";
  sheet.getCell("B2").alignment = { horizontal: "center", vertical: "middle" };
  sheet.getCell("B2").font = { size: 12, italic: true, name: "Arial Narrow"};

  // === SUBHEADERS ===
  sheet.mergeCells("D4:E4");
  sheet.getCell("D4").value = "School ID:";
  sheet.mergeCells("D5:E5");

  sheet.mergeCells("L4:M4");
  sheet.getCell("L4").value = "Division:";
  sheet.mergeCells("L5:M5");

  sheet.mergeCells("J2:K2");
  sheet.getCell("J2").value = "District:";
  sheet.mergeCells("L2:M2");

  sheet.mergeCells("C6:D6");
  sheet.getCell("C6").value = "School Name:";
  sheet.mergeCells("M6:O6");
  sheet.getCell("M6").value = "School Year:";
  sheet.mergeCells("S6:T6");
  sheet.getCell("S6").value = "Grade Level:";
  sheet.mergeCells("W6:X6");
  sheet.getCell("W6").value = "Section:";

  // === HEADER ROWS ===
  const headerRow1 = [
    "", // empty col A
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
    "REMARKS",
  ];

  const headerRow2 = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "House #/Street/Sitio/Purok",
    "Barangay",
    "Municipality/City",
    "Province",
    "Father’s Name\n(Last Name, First Name, Middle Name)",
    "Mother’s Maiden Name\n(Last Name, First Name, Middle Name)",
    "Name",
    "Relationship",
    "",
    "(Please refer to legend)",
  ];

  sheet.addRow([]); // row 4
  sheet.addRow(headerRow1);
  sheet.addRow(headerRow2);

  // === MERGE CELLS FOR GROUP HEADERS ===
  sheet.mergeCells("J8:M8"); // ADDRESS
  sheet.mergeCells("N8:O8"); // PARENTS
  sheet.mergeCells("P8:Q8"); // GUARDIAN
  sheet.getCell("J8").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  sheet.getCell("N8").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  sheet.getCell("P8").alignment = { horizontal: "center", vertical: "middle", wrapText: true };

  // === STYLE HEADERS ===
  const headerRows = [6, 7];
  headerRows.forEach((r) => {
    const row = sheet.getRow(r);
    row.eachCell((cell) => {
      cell.font = { bold: true, name: "Arial Narrow", size: 10 };
      cell.alignment = { horizontal: "center", vertical: "middle", wrapText: true };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // === SAMPLE EMPTY ROWS (FOR STUDENTS) ===
  for (let i = 0; i < 15; i++) {
    const row = sheet.addRow([]);
    row.height = 18;
  }

  // === APPLY BORDER TO ALL CELLS ===
  sheet.eachRow({ includeEmpty: true }, (row) => {
    row.eachCell((cell) => {
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  // === EXPORT FILE ===
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "School_Form_1_SF1.xlsx");
}
