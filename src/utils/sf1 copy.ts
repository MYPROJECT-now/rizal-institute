import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export async function exportSF1() {
const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet("School Form 1 (SF1)");

sheet.columns = [
    { header: "LRN", width: 15 },
    { header: "NAME (Last Name, First Name, Middle Name)", width: 35 },
    { header: "Sex (M/F)", width: 10 },
    { header: "BIRTH DATE (mm/dd/yyyy)", width: 20 },
    { header: "AGE as of 1st Friday June", width: 25 },
    { header: "MOTHER TONGUE", width: 20 },
    { header: "IP (Ethnic Group)", width: 20 },
    { header: "RELIGION", width: 20 },
    { header: "House #/Street/Sitio/Purok", width: 25 },
    { header: "Barangay", width: 20 },
    { header: "Municipality/City", width: 20 },
    { header: "Province", width: 20 },
    { header: "Father’s Name", width: 25 },
    { header: "Mother’s Maiden Name", width: 25 },
    { header: "Guardian Name", width: 25 },
    { header: "Relationship", width: 15 },
    { header: "Contact Number", width: 20 },
    { header: "Remarks", width: 30 },
];

sheet.mergeCells("A1:R1");
sheet.getCell("A1").value = "School Form 1 (SF1) School Register";
sheet.getCell("A1").alignment = { horizontal: "center" };
sheet.getCell("A1").font = { size: 14, bold: true };

//   sheet.getRow(3).values = sheet.columns.map((col) => col.header);
sheet.getRow(3).values = sheet.columns.map((col) => col.header) as ExcelJS.CellValue[];
sheet.getRow(3).font = { bold: true };
sheet.getRow(3).alignment = { horizontal: "center" };

for (let i = 0; i < 20; i++) {
sheet.addRow([]);
}

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
