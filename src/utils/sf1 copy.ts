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
  sheet.getColumn(10).width = 25;
  sheet.getColumn(11).width = 15;
  sheet.getColumn(12).width = 15;
  sheet.getColumn(13).width = 23;
  sheet.getColumn(14).width = 15;
  sheet.getColumn(15).width = 15;
  sheet.getColumn(16).width = 10;
  sheet.getColumn(17).width = 10;
  sheet.getColumn(18).width = 18;
  sheet.getColumn(19).width = 38;
  sheet.getColumn(20).width = 38;
  sheet.getColumn(21).width = 38;
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
  sheet.mergeCells("B1:Y1");
  sheet.getCell("B1").value = "School Form 1 (SF 1) School Register";
  sheet.getCell("B1").alignment = { horizontal: "center", vertical: "middle" };
  sheet.getCell("B1").font = { size: 22, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("B2:Y2");
  sheet.getCell("B2").value = "(This replaces Form 1, Master List & STS Form 2-Family Background and Profile)";
  sheet.getCell("B2").alignment = { horizontal: "center", vertical: "middle" };
  sheet.getCell("B2").font = { size: 12, italic: true, name: "Arial Narrow" };

  // === INFO CELLS ===
  
  sheet.mergeCells("D4:E4");
  sheet.getCell("D4").value = "School ID";
  sheet.getCell("D4").alignment = { horizontal: "right", vertical: "middle" };
  sheet.getCell("D4").font = { size: 28,  name: "Arial Narrow" };

  sheet.getCell("F4").value = "403358";
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

  sheet.getCell("F6").value = "Rizal Institute Canlubang Foundation INC.";
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
  sheet.getCell("L4").value = "Division";
  sheet.getCell("L4").alignment = { horizontal: "right", vertical: "middle" };
  sheet.getCell("L4").font = { size: 28,  name: "Arial Narrow" };

  sheet.mergeCells("N4:Q4");
  sheet.getCell("N4").value = "Calamba City";
  sheet.getCell("N4").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  sheet.getCell("N4").alignment = { horizontal: "left", vertical: "middle" };
  sheet.getCell("N4").font = { size: 28,  name: "Arial Narrow" };

  sheet.mergeCells("M6:O6");
  sheet.getCell("M6").value = "School Year";
  sheet.getCell("M6").alignment = { horizontal: "right", vertical: "middle" };
  sheet.getCell("M6").font = { size: 28,  name: "Arial Narrow" };

  sheet.mergeCells("P6:R6");
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
  sheet.getCell("U4").value = "District II ";
  sheet.getCell("U4").border = {
    top: { style: "thin" },
    left: { style: "thin" },
    bottom: { style: "thin" },
    right: { style: "thin" },
  };
  sheet.getCell("U4").alignment = { horizontal: "left", vertical: "middle" };
  sheet.getCell("U4").font = { size: 28,  name: "Arial Narrow" };


  sheet.mergeCells("S6:T6");
  sheet.getCell("S6").value = "Grade Level";
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

  sheet.getCell("W6").value = "Section";
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



  //HEADERS
  sheet.mergeCells("A8:A9"); 
  sheet.getCell("A8:A9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },

  };

  sheet.mergeCells("B8:B9"); 
  sheet.getCell("B8:B9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("B8").value = "LRN";
  sheet.getCell("B8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("B8").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("C8:F9"); 
  sheet.getCell("C8:F9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("C8").value = "Name (Last Name, First Name, Middle Name)";
  sheet.getCell("C8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("C8").font = { size: 18, bold: true, name: "Arial Narrow" };
  
  sheet.mergeCells("G8:G9"); 
  sheet.getCell("G8:G9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("G8").value = "Sex (M/F)";
  sheet.getCell("G8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("G8").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("H8:H9"); 
  sheet.getCell("H8:H9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("H8").value = "BIRTH DATE  (mm/dd/ yyyy)";
  sheet.getCell("H8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("H8").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("I8:I9"); 
  sheet.getCell("I8:I9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("I8").value = "AGE";
  sheet.getCell("I8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("I8").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("J8:J9"); 
  sheet.getCell("J8:J9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("J8").value = "MOTHER TONGUE";
  sheet.getCell("J8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("J8").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("K8:K9"); 
  sheet.getCell("K8:K9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("K8").value = "IP (Ethnic Group)";
  sheet.getCell("K8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("K8").font = { size: 18, bold: true, name: "Arial Narrow" };


  sheet.mergeCells("L8:L9"); 
  sheet.getCell("L8:L9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("L8").value = "RELIGION";
  sheet.getCell("L8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("L8").font = { size: 18, bold: true, name: "Arial Narrow" };


  sheet.mergeCells("M8:R8");
  sheet.getCell("M8:R8").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("M8").value = "ADDRESS";
  sheet.getCell("M8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("M8").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.getCell("M9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("M9").value = "House #/ Street/ Sitio/";
  sheet.getCell("M9").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("M9").font = { size: 18, bold: true, name: "Arial Narrow" };


  sheet.mergeCells("N9:O9");
  sheet.getCell("N9:O9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("N9").value = "Barangay";
  sheet.getCell("N9").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("N9").font = { size: 18, bold: true, name: "Arial Narrow" };

  
  sheet.mergeCells("P9:Q9");
  sheet.getCell("P9:Q9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("P9").value = "Municipality/ City ";
  sheet.getCell("P9").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("P9").font = { size: 18, bold: true, name: "Arial Narrow" };


  sheet.getCell("R9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("R9").value = "Province";
  sheet.getCell("R9").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("R9").font = { size: 18, bold: true, name: "Arial Narrow" };



  sheet.mergeCells("S8:T8"); 
  sheet.getCell("S8:T8").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("S8").value = "PARENTS ";
  sheet.getCell("S8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("S8").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.getCell("S9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("S9").value = "Father's Name (Last Name, First Name, Middle Name)";
  sheet.getCell("S9").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("S9").font = { size: 18, bold: true, name: "Arial Narrow" };


  sheet.getCell("T9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("T9").value = "Mother's Maiden Name (Last Name, First Name, Middle Name)";
  sheet.getCell("T9").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("T9").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("U8:V8"); 
  sheet.getCell("U8:V8").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("U8").value = "GUARDIAN (If not Parent) ";
  sheet.getCell("U8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("U8").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.getCell("U9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("U9").value = "Name";
  sheet.getCell("U9").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("U9").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.getCell("V9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("V9").value = "Relationship";
  sheet.getCell("V9").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("V9").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("W8:W9"); 
  sheet.getCell("W8").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("W8").value = "Contact Number of Parent or Guardian";
  sheet.getCell("W8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("W8").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("X8:Z8"); 
  sheet.getCell("X8").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("X8").value = "REMARKS";
  sheet.getCell("X8").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("X8").font = { size: 18, bold: true, name: "Arial Narrow" };

  sheet.mergeCells("X9:Z9"); 
  sheet.getCell("X9").border = {
    left: { style: "thin" },
    right: { style: "thin" },
    top: { style: "thin" },
    bottom: { style: "thin" },
  };
  sheet.getCell("X9").value = "(Please refer to the legend on last page)";
  sheet.getCell("X9").alignment = { horizontal: "center", vertical: "middle",  wrapText: true  };
  sheet.getCell("X9").font = { size: 18, bold: true, name: "Arial Narrow" };



  // === SAMPLE STUDENT ROWS ===
// ==== APPLY BORDERS FOR ROWS 10 TO 59 (COLUMNS A–Z) ====
for (let rowIndex = 10; rowIndex <= 59; rowIndex++) {
  // ===== MERGE CELLS PER ROW =====
  // === SAMPLE DATA ===
const sampleStudents = [
  {
    lrn: "123456789012",
    name: "Dela Cruz, Juan, Santos",
    sex: "M",
    birthdate: "01/15/2012",
    age: "13",
    motherTongue: "Tagalog",
    ip: "None",
    religion: "Catholic",
    address_street: "123 Mabini St.",
    address_brgy: "Barangay Uno",
    address_city: "Calamba",
    address_province: "Laguna",
    father: "Dela Cruz, Jose, Ramirez",
    mother: "Ramirez, Maria, Lopez",
    guardian_name: "",
    guardian_rel: "",
    contact: "09123456789",
    remarks: ""
  },
  {
    lrn: "109876543210",
    name: "Santos, Maria, Dizon",
    sex: "F",
    birthdate: "03/05/2013",
    age: "12",
    motherTongue: "Tagalog",
    ip: "None",
    religion: "Christian",
    address_street: "456 Rizal St.",
    address_brgy: "Barangay Dos",
    address_city: "Calamba",
    address_province: "Laguna",
    father: "Santos, Mark, Dizon",
    mother: "Dizon, Ana, Flores",
    guardian_name: "",
    guardian_rel: "",
    contact: "09987654321",
    remarks: ""
  }
];

// INSERT SAMPLE STUDENTS INTO ROW 10 AND 11
sampleStudents.forEach((data, idx) => {
  const rowNum = 10 + idx;

  sheet.getCell(`A${rowNum}`).value = idx + 1;
  sheet.getCell(`B${rowNum}`).value = data.lrn;

  sheet.getCell(`C${rowNum}`).value = data.name;

  sheet.getCell(`G${rowNum}`).value = data.sex;
  sheet.getCell(`H${rowNum}`).value = data.birthdate;
  sheet.getCell(`I${rowNum}`).value = data.age;
  sheet.getCell(`J${rowNum}`).value = data.motherTongue;
  sheet.getCell(`K${rowNum}`).value = data.ip;
  sheet.getCell(`L${rowNum}`).value = data.religion;

  sheet.getCell(`M${rowNum}`).value = data.address_street;
  sheet.getCell(`N${rowNum}`).value = data.address_brgy;
  sheet.getCell(`P${rowNum}`).value = data.address_city;
  sheet.getCell(`R${rowNum}`).value = data.address_province;

  sheet.getCell(`S${rowNum}`).value = data.father;
  sheet.getCell(`T${rowNum}`).value = data.mother;

  sheet.getCell(`U${rowNum}`).value = data.guardian_name;
  sheet.getCell(`V${rowNum}`).value = data.guardian_rel;

  sheet.getCell(`W${rowNum}`).value = data.contact;

  sheet.getCell(`X${rowNum}`).value = data.remarks;
});


  sheet.getRow(rowIndex).height = 60;


  sheet.mergeCells(`C${rowIndex}:F${rowIndex}`);
  sheet.mergeCells(`N${rowIndex}:O${rowIndex}`);
  sheet.mergeCells(`P${rowIndex}:Q${rowIndex}`);
  sheet.mergeCells(`X${rowIndex}:Z${rowIndex}`);

  // ===== APPLY BORDERS FOR A–Z =====
  const row = sheet.getRow(rowIndex);
  for (let colIndex = 1; colIndex <= 26; colIndex++) {
    const cell = row.getCell(colIndex);
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    cell.value = cell.value ?? "";
    cell.font= { size: 16,  name: "Arial Narrow" };  
    cell.alignment = {  wrapText: true };
  }
}




  // === EXPORT ===
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), "School_Form_1_SF1.xlsx");
}
