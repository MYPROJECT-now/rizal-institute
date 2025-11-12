import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportSF1() {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("School Form 1 (SF1)");

  // === TITLE ===
  sheet.mergeCells("A1:R1");
  sheet.getCell("A1").value = "School Form 1 (SF 1) School Register";
  sheet.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };
  sheet.getCell("A1").font = { size: 14, bold: true };
  sheet.getRow(1).height = 25;

  // === SUBHEADERS ===
  sheet.mergeCells("A2:B2");
  sheet.getCell("A2").value = "School ID:";
  sheet.mergeCells("C2:D2");

  sheet.mergeCells("E2:F2");
  sheet.getCell("E2").value = "Division:";
  sheet.mergeCells("G2:H2");

  sheet.mergeCells("I2:J2");
  sheet.getCell("I2").value = "District:";
  sheet.mergeCells("K2:L2");

  sheet.mergeCells("A3:D3");
  sheet.getCell("A3").value = "School Name:";
  sheet.mergeCells("E3:F3");
  sheet.getCell("E3").value = "School Year:";
  sheet.mergeCells("G3:H3");
  sheet.getCell("G3").value = "Grade Level:";
  sheet.mergeCells("I3:J3");
  sheet.getCell("I3").value = "Section:";

  // === HEADER ROWS ===
  const headerRow1 = [
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
    "(Please refer to legend)"
  ];

  sheet.addRow([]);
  sheet.addRow(headerRow1);
  sheet.addRow(headerRow2);

  // === MERGE CELLS FOR GROUP HEADERS ===
  sheet.mergeCells("I5:L5"); // ADDRESS
  sheet.mergeCells("M5:N5"); // PARENTS
  sheet.mergeCells("O5:P5"); // GUARDIAN
  sheet.getCell("I5").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  sheet.getCell("M5").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
  sheet.getCell("O5").alignment = { horizontal: "center", vertical: "middle", wrapText: true };

  // === STYLE HEADERS ===
  const headerRows = [5, 6];
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

  // === COLUMN WIDTHS ===
  const widths = [
    12, 30, 8, 15, 18, 18, 18, 15, 22, 15, 18, 15,
    25, 25, 20, 15, 18, 20
  ];
  widths.forEach((w, i) => sheet.getColumn(i + 1).width = w);

  // === SAMPLE EMPTY ROWS ===
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

  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "School_Form_1_SF1.xlsx");
}
