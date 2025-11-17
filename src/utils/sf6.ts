// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";



// export async function exportSF6(sf5Data: any) {
//   const workbook = new ExcelJS.Workbook();
//   const sheet = workbook.addWorksheet("School Form 1 (SF1)");

//   // === COLUMN WIDTHS ===
//   sheet.getColumn(1).width = 3;
//   sheet.getColumn(2).width = 14;
//   sheet.getColumn(3).width = 15;
//   sheet.getColumn(4).width = 15;
//   sheet.getColumn(5).width = 15;
//   sheet.getColumn(6).width = 15;
//   sheet.getColumn(7).width = 15;
//   sheet.getColumn(8).width = 15;
//   sheet.getColumn(9).width = 15;
//   sheet.getColumn(10).width = 15;
//   sheet.getColumn(11).width = 2;
//   sheet.getColumn(12).width = 15;
//   sheet.getColumn(13).width = 7;
//   sheet.getColumn(14).width = 7;
//   sheet.getColumn(15).width = 15;
//   sheet.getColumn(16).width = 15;
//   sheet.getColumn(17).width = 15;


  
//   sheet.getRow(1).height = 32;
//   sheet.getRow(2).height = 24;
//   sheet.getRow(3).height = 42;
//   sheet.getRow(4).height = 10;
//   sheet.getRow(5).height = 42;
//   sheet.getRow(6).height = 8;
//   sheet.getRow(7).height = 42;
//   sheet.getRow(8).height = 8;
//   sheet.getRow(9).height = 50;
//   sheet.getRow(10).height = 90;
//   sheet.getRow(11).height = 20;


//   for (let i = 12; i <= 61; i++) sheet.getRow(i).height = 24;

//   // === ADD IMAGE ===
//   const response = await fetch("/form.png");
//   const imageBlob = await response.blob();
//   const arrayBuffer = await imageBlob.arrayBuffer();
//   const imageId = workbook.addImage({ buffer: arrayBuffer, extension: "png" });
//   sheet.addImage(imageId, "A1:B4");

//   // === TITLE ===
//   sheet.mergeCells("B1:Q1");
//   sheet.getCell("B1").value = "School Form 5 (SF 5) Report on Promotion and Learning Progress & Achievement";
//   sheet.getCell("B1").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("B1").font = { size: 22, bold: true, name: "Arial Narrow" };

//   sheet.mergeCells("B2:Q2");
//   sheet.getCell("B2").value = "Revised to conform with the instructions of Deped Order 8, s. 2015";
//   sheet.getCell("B2").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("B2").font = { size: 12, italic: true, name: "Arial Narrow" };

//   // === INFO CELLS ===
//   sheet.getCell("C3").value = "Region";
//   sheet.getCell("C3").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("C3").font = { size: 14,  name: "Arial Narrow" };

//   sheet.getCell("D3").value = "Region - 4A";
//   sheet.getCell("D3").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("D3").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("D3").font = { size: 14,  name: "Arial Narrow" };

//   sheet.getCell("C5").value = "School ID";
//   sheet.getCell("C5").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("C5").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("D5:E5");
//   sheet.getCell("D5").value = "403358";
//   sheet.getCell("D5").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("D5").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("D5").font = { size: 14,  name: "Arial Narrow" };


//   sheet.getCell("C7").value = "School Name";
//   sheet.getCell("C7").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("C7").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("D7:H7");
//   sheet.getCell("D7").value = "Rizal Institute Canlubang Foundation INC.";
//   sheet.getCell("D7").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("D7").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("D7").font = { size: 14,  name: "Arial Narrow" };

//   sheet.getCell("E3").value = "Division";
//   sheet.getCell("E3").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("E4").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("F3:H3");
//   sheet.getCell("F3").value = "Calamba City";
//   sheet.getCell("F3").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("F3").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("F3").font = { size: 14,  name: "Arial Narrow" };

//   sheet.getCell("F5").value = "School Year";
//   sheet.getCell("F5").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("F5").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("G5:H5");
//   sheet.getCell("G5").value = sf5Data[0].schoolYear;
//   sheet.getCell("G5").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("G5").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("G5").font = { size: 14,  name: "Arial Narrow" };


//   sheet.getCell("I3").value = "District";
//   sheet.getCell("I3").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("I3").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("J3:L3");
//   sheet.getCell("J3").value = "District II";
//   sheet.getCell("J3").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("J3").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("J3").font = { size: 14,  name: "Arial Narrow" };

  
//   sheet.getCell("I5").value = "Curriculum";
//   sheet.getCell("I5").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("I5").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("J5:L5");
//   sheet.getCell("J5").value = "Junior High School";
//   sheet.getCell("J5").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("J5").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("J5").font = { size: 14,  name: "Arial Narrow" };

    
//   sheet.getCell("I7").value = "Grade Level";
//   sheet.getCell("I7").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("I7").font = { size: 14,  name: "Arial Narrow" };

//   sheet.getCell("J7").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("J7").value = sf5Data[0].gradeLevelName;
//   sheet.getCell("J7").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("J7").font = { size: 14,  name: "Arial Narrow" };

//   sheet.getCell("L7").value = "Section";
//   sheet.getCell("L7").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("L7").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("M7:O7");
//   sheet.getCell("M7").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("M7").value = sf5Data[0].sectionName;
//   sheet.getCell("M7").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("M7").font = { size: 14,  name: "Arial Narrow" };

// //HEADERS

//   sheet.mergeCells("A9:A11"); 
//   sheet.getCell("A9:A11").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  


//   sheet.mergeCells("B9:B11"); 
//   sheet.getCell("B9:A11").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },

//   };  
//   sheet.getCell("B9").value = "LRN";
//   sheet.getCell("B9").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("B9").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   sheet.mergeCells("C9:E11"); 
//   sheet.getCell("C9:E11").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },

//   };  
//   sheet.getCell("C9").value = "LRN LEARNER'S NAME (Last Name, First Name, Middle Name)";
//   sheet.getCell("C9").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
//   sheet.getCell("C9").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   sheet.getCell("F9:F11").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },

//   };  

//   sheet.mergeCells("F9:F11"); 
//   sheet.getCell("F9").value = "GENERAL AVERAGE ";
//   sheet.getCell("F9").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
//   sheet.getCell("F9 ").font = { size: 11, bold: true,  name: "Arial Narrow", };

//   sheet.mergeCells("G9:H11"); 
//   sheet.getCell("G9:H11").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },

//   };  
//   sheet.getCell("G9").value = "ACTION TAKEN: PROMOTED, CONDITIONAL, or RETAINED";
//   sheet.getCell("G9").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
//   sheet.getCell("G9 ").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   sheet.mergeCells("I9:J11"); 
//   sheet.getCell("I9:J11").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },

//   };  
//   sheet.getCell("I9").value = "Did Not Meet Expectations of the ff. Learning Area/s as of end of current School Year ";
//   sheet.getCell("I9").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
//   sheet.getCell("I9  ").font = { size: 11, bold: true,  name: "Arial Narrow" };

// for (let rowIndex = 12; rowIndex <= 61; rowIndex++) {
  
//   sheet.mergeCells(`C${rowIndex}:E${rowIndex}`);
//   sheet.mergeCells(`G${rowIndex}:H${rowIndex}`);
//   sheet.mergeCells(`I${rowIndex}:J${rowIndex}`);

//   const row = sheet.getRow(rowIndex);
//   for (let colIndex = 1; colIndex <= 10; colIndex++) {
//     const cell = row.getCell(colIndex);
//     cell.border = {
//       top: { style: "thin" },
//       left: { style: "thick" },
//       bottom: { style: "thin" },
//       right: { style: "thick" },
//     };
//   }
// }

// // NOW apply THICK borders to specific rows
// function applyThickBorderToRow(rowNumber: number) {
//   const row = sheet.getRow(rowNumber);

//   for (let colIndex = 1; colIndex <= 10; colIndex++) {
//     const cell = row.getCell(colIndex);
//     cell.border = {
//       top: { style: "thick" },
//       left: { style: "thick" },
//       bottom: { style: "thick" },
//       right: { style: "thick" },
//     };
//   }
// }

// applyThickBorderToRow(34);
// applyThickBorderToRow(60);
// applyThickBorderToRow(61);


// const maleStudents = sf5Data.filter((s: any) => s.gender === "Male");
// const femaleStudents = sf5Data.filter((s: any) => s.gender === "Female");

// // Sort alphabetically (optional but recommended)
// maleStudents.sort((a:any, b:any) => a.name.localeCompare(b.name));
// femaleStudents.sort((a:any, b:any) => a.name.localeCompare(b.name));

// // --- Fill MALE rows (12–33)
// let maleRow = 12;
// maleStudents.forEach((stud: any) => {
//   if (maleRow > 33) return; // stop when limit reached

//   sheet.getCell(`B${maleRow}`).value = stud.lrn;
//   sheet.getCell(`C${maleRow}`).value = stud.name;
//   sheet.getCell(`F${maleRow}`).value = stud.finalGrade ? Number(stud.finalGrade).toFixed(2) : "";
//   sheet.getCell(`G${maleRow}`).value = stud.promotion || "";
//   sheet.getCell(`I${maleRow}`).value = ""; // Learning areas not met (optional)

//   maleRow++;
// });

// // --- Fill FEMALE rows (35–59)
// let femaleRow = 35;
// femaleStudents.forEach((stud: any) => {
//   if (femaleRow > 59) return;

//   sheet.getCell(`B${femaleRow}`).value = stud.lrn;
//   sheet.getCell(`C${femaleRow}`).value = stud.name;
//   sheet.getCell(`F${femaleRow}`).value = stud.finalGrade ? Number(stud.finalGrade).toFixed(2) : "";
//   sheet.getCell(`G${femaleRow}`).value = stud.promotion || "";
//   sheet.getCell(`I${femaleRow}`).value = "";

//   femaleRow++;
// });


//   // === EXPORT ===
//   const buffer = await workbook.xlsx.writeBuffer();
//   saveAs(new Blob([buffer]), "School_Form_6_SF6.xlsx");
// }
