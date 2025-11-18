// import ExcelJS from "exceljs";
// import { saveAs } from "file-saver";



// export async function exportSF6(sf6Data: any) {
//   const workbook = new ExcelJS.Workbook();
//   const sheet = workbook.addWorksheet("School Form 1 (SF1)");

//   // === COLUMN WIDTHS ===
//   sheet.getColumn(1).width = 2;
//   sheet.getColumn(2).width = 10;
//   sheet.getColumn(3).width = 10;
//   sheet.getColumn(4).width = 13;
//   sheet.getColumn(5).width = 15;
//   sheet.getColumn(6).width = 15;
//   sheet.getColumn(7).width = 15;
//   sheet.getColumn(8).width = 15;
//   sheet.getColumn(9).width = 15;
//   sheet.getColumn(10).width = 15;
//   sheet.getColumn(11).width = 15;
//   sheet.getColumn(12).width = 15;
//   sheet.getColumn(13).width = 15;
//   sheet.getColumn(14).width = 15;
//   sheet.getColumn(15).width = 15;
//   sheet.getColumn(16).width = 15;
//   sheet.getColumn(17).width = 15;
//   sheet.getColumn(18).width = 15;
//   sheet.getColumn(19).width = 15;


  
//   sheet.getRow(1).height = 40;
//   sheet.getRow(2).height = 40;
//   sheet.getRow(3).height = 25;
//   sheet.getRow(4).height = 5;
//   sheet.getRow(5).height = 40;
//   sheet.getRow(6).height = 5;
//   sheet.getRow(7).height = 40;
//   sheet.getRow(8).height = 5;
//   sheet.getRow(9).height = 90;
//   sheet.getRow(10).height = 40;

//   sheet.getRow(11).height = 40;
//   sheet.getRow(12).height = 40;
//   sheet.getRow(13).height = 40;


//   sheet.getRow(14).height = 90;
//   sheet.getRow(15).height = 50;
//   sheet.getRow(16).height = 50;
//   sheet.getRow(17).height = 50;
//   sheet.getRow(18).height = 50;
//   sheet.getRow(19).height = 50;
//   sheet.getRow(20).height = 50;



//   // === ADD IMAGE ===
//   const response = await fetch("/form.png");
//   const imageBlob = await response.blob();
//   const arrayBuffer = await imageBlob.arrayBuffer();
//   const imageId = workbook.addImage({ buffer: arrayBuffer, extension: "png" });
//   sheet.addImage(imageId, "A1:C5");

//   // === TITLE ===


//   sheet.mergeCells("A1:S1");
//   sheet.getCell("A1").value = "School Form 6 (SF6)";
//   sheet.getCell("A1").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("A1").font = { size: 22, bold: true, name: "Arial Narrow" };

//   sheet.mergeCells("A2:S2");
//   sheet.getCell("A2").value = "Summarized Report on Promotion and Learning Progress & Achievement ";
//   sheet.getCell("A2").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("A2").font = { size: 20, bold: true, name: "Arial Narrow" };

//   sheet.mergeCells("A3:S3");
//   sheet.getCell("A3").value = "Revised to conform with the instructions of Deped Order 8, s. 2015 ";
//   sheet.getCell("A3").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("A3").font = { size: 12, italic: true, name: "Arial Narrow" };

    


//   sheet.getCell("D5").value = "School ID";
//   sheet.getCell("D5").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("D5").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("E5:F5");
//   sheet.getCell("E5").value = "403358";
//   sheet.getCell("E5").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("E5").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("E5").font = { size: 14,  name: "Arial Narrow" };


//   sheet.getCell("D7").value = "School Name";
//   sheet.getCell("D7").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("D7").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("E7:J7");
//   sheet.getCell("E7").value = "Rizal Institute Canlubang Foundation INC.";
//   sheet.getCell("E7").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("E7").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("E7").font = { size: 14,  name: "Arial Narrow" };


//   sheet.getCell("H5").value = "Region";
//   sheet.getCell("H5").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("H5").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("I5:J5");
//   sheet.getCell("I5").value = "Region IV-A";
//   sheet.getCell("I5").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("I5").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("I5").font = { size: 14,  name: "Arial Narrow" };


//   sheet.getCell("L5").value = "Division";
//   sheet.getCell("L5").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("L5").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("M5:O5");
//   sheet.getCell("M5").value = "Calamba City";
//   sheet.getCell("M5").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("M5").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("M5").font = { size: 14,  name: "Arial Narrow" };


//   sheet.getCell("L7").value = "District";
//   sheet.getCell("L7").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("L7").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("M7:O7");
//   sheet.getCell("M7").value = "District II ";
//   sheet.getCell("M7").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("M7").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("M7").font = { size: 14,  name: "Arial Narrow" };

//   sheet.getCell("Q7").value = "School Year";
//   sheet.getCell("Q7").alignment = { horizontal: "right", vertical: "middle" };
//   sheet.getCell("Q7").font = { size: 14,  name: "Arial Narrow" };

//   sheet.mergeCells("R7:S7");
//   sheet.getCell("R7").border = {
//     top: { style: "thin" },
//     left: { style: "thin" },
//     bottom: { style: "thin" },
//     right: { style: "thin" },
//   };
//   sheet.getCell("R7").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("R7").font = { size: 14,  name: "Arial Narrow" };



// // header
//   sheet.mergeCells("A9:A10"); 
//   sheet.getCell("A9:A10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  

//   sheet.mergeCells("B9:D10"); 
//   sheet.getCell("B9").value = "SUMMARY TABLE";
//   sheet.getCell("B9:D10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("B9").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("B9").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   sheet.mergeCells("E9:G9"); 
//   sheet.getCell("E9").value = "GRADE 7";
//   sheet.getCell("E9:D10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("E9").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("E9").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   sheet.getCell("E10").value = "MALE";
//   sheet.getCell("E10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("E10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("E10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("F10").value = "FEMALE";
//   sheet.getCell("F10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("F10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("F10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("G10").value = "TOTAL";
//   sheet.getCell("G10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("G10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("G10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.mergeCells("H9:J9"); 
//   sheet.getCell("H9").value = "GRADE 8";
//   sheet.getCell("H9:J9").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("H9").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("H9").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   sheet.getCell("H10").value = "MALE";
//   sheet.getCell("H10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("H10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("H10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("I10").value = "FEMALE";
//   sheet.getCell("I10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("I10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("I10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("J10").value = "TOTAL";
//   sheet.getCell("J10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("J10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("J10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.mergeCells("K9:M9"); 
//   sheet.getCell("K9").value = "GRADE 9";
//   sheet.getCell("K9:M9").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("K9").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("K9").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   sheet.getCell("K10").value = "MALE";
//   sheet.getCell("K10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("K10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("K10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("L10").value = "FEMALE";
//   sheet.getCell("L10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("L10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("L10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("M10").value = "TOTAL";
//   sheet.getCell("M10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("M10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("M10").font = { size: 11,  name: "Arial Narrow" };



//   sheet.mergeCells("N9:P9"); 
//   sheet.getCell("N9").value = "GRADE 10";
//   sheet.getCell("N9:P9").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("N9").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("N9").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   sheet.getCell("N10").value = "MALE";
//   sheet.getCell("N10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("N10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("N10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("O10").value = "FEMALE";
//   sheet.getCell("O10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("O10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("O10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("P10").value = "TOTAL";
//   sheet.getCell("P10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("P10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("P10").font = { size: 11,  name: "Arial Narrow" };



//   sheet.mergeCells("Q9:S9"); 
//   sheet.getCell("Q9").value = "TOTAL";
//   sheet.getCell("Q9:S9").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("Q9").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("Q9").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   sheet.getCell("Q10").value = "MALE";
//   sheet.getCell("Q10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("Q10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("Q10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("R10").value = "FEMALE";
//   sheet.getCell("R10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("R10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("R10").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("S10").value = "TOTAL";
//   sheet.getCell("S10").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("S10").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("S10").font = { size: 11,  name: "Arial Narrow" };


// sheet.getRow(11).height = 40;
// sheet.getRow(12).height = 40;
// sheet.getRow(13).height = 40;

// sheet.getCell("A11").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
// };  
// sheet.getCell("A12").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
// };  
// sheet.getCell("A13").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
// };  

//   sheet.mergeCells("B11:D11"); 
//   sheet.getCell("B11").value = "PROMOTED";
//   sheet.getCell("B11:D11").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("B11").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("B11").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   sheet.mergeCells("B12:D12"); 
//   sheet.getCell("B12").value = "CONDITIONAL";
//   sheet.getCell("B12:D12").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("B12").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("B12").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   sheet.mergeCells("B13:D13"); 
//   sheet.getCell("B13").value = "RETAINED";
//   sheet.getCell("B13:D13").border = {
//     left: { style: "thick" },
//     right: { style: "thick" },
//     top: { style: "thick" },
//     bottom: { style: "thick" },
//   };  
//   sheet.getCell("B13").alignment = { horizontal: "left", vertical: "middle" };
//   sheet.getCell("B13").font = { size: 11, bold: true,  name: "Arial Narrow" };


//   //header 2
//   sheet.getCell("A14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  

//   sheet.mergeCells("B14:D14"); 
//   sheet.getCell("B14").value = "LEARNING PROGRESS & ACHIEVEMENT (based on Learners' General Average)";
//   sheet.getCell("B14:D14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("B14").alignment = { horizontal: "left", vertical: "middle", wrapText: true };
//   sheet.getCell("B14").font = { size: 11, bold: true,  name: "Arial Narrow" };

//   //g7
//   sheet.getCell("E14").value = "MALE";
//   sheet.getCell("E14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("E14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("E14").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("F14").value = "FEMALE";
//   sheet.getCell("F14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("F14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("F14").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("G14").value = "TOTAL";
//   sheet.getCell("G14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("G14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("G14").font = { size: 11,  name: "Arial Narrow" };

//   //g8

//   sheet.getCell("H14").value = "MALE";
//   sheet.getCell("H14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("H14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("H14").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("I14").value = "FEMALE";
//   sheet.getCell("I14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("I14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("I14").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("J14").value = "TOTAL";
//   sheet.getCell("J14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("J14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("J14").font = { size: 11,  name: "Arial Narrow" };

// //g9

//   sheet.getCell("K14").value = "MALE";
//   sheet.getCell("K14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("K14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("K14").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("L14").value = "FEMALE";
//   sheet.getCell("L14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("L14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("L14").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("M14").value = "TOTAL";
//   sheet.getCell("M14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("M14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("M14").font = { size: 11,  name: "Arial Narrow" };

// //g10
//   sheet.getCell("N14").value = "MALE";
//   sheet.getCell("N14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("N14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("N14").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("O14").value = "FEMALE";
//   sheet.getCell("O14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("O14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("O14").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("P14").value = "TOTAL";
//   sheet.getCell("P14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("P14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("P14").font = { size: 11,  name: "Arial Narrow" };

//   //total
//   sheet.getCell("Q14").value = "MALE";
//   sheet.getCell("Q14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("Q14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("Q14").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("R14").value = "FEMALE";
//   sheet.getCell("R14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("R14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("R14").font = { size: 11,  name: "Arial Narrow" };


//   sheet.getCell("S14").value = "TOTAL";
//   sheet.getCell("S14").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  
//   sheet.getCell("S14").alignment = { horizontal: "center", vertical: "middle" };
//   sheet.getCell("S14").font = { size: 11,  name: "Arial Narrow" };

// // ADD BORDER FOR ROWS 11–13 (A–S)
// for (let r = 11; r <= 13; r++) {
//   for (let c = 4; c <= 19; c++) {
//     sheet.getCell(r, c).border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//   }
// }

// for (let r = 15; r <= 20; r++) {
//   for (let c = 4; c <= 19; c++) {
//     sheet.getCell(r, c).border = {
//       top: { style: "thin" },
//       left: { style: "thin" },
//       bottom: { style: "thin" },
//       right: { style: "thin" },
//     };
//   }
// }

//   sheet.getCell("B15").value = "Did Not Meet Expectations ( 74 and below)";
//   sheet.getCell("B15").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
//   sheet.getCell("B15").font = { size: 11,  name: "Arial Narrow" };
//   sheet.mergeCells("B15:D15"); 
//   sheet.getCell("B15:D15").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  


//   sheet.getCell("B16").value = "Fairly Satisfactory ( 75-79)";
//   sheet.getCell("B16").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
//   sheet.getCell("B16").font = { size: 11,  name: "Arial Narrow" };
//   sheet.mergeCells("B16:D16"); 
//   sheet.getCell("B16:D16").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  

  
//   sheet.getCell("B17").value = "Satisfactory ( 80-84)";
//   sheet.getCell("B17").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
//   sheet.getCell("B17").font = { size: 11,  name: "Arial Narrow" };
//   sheet.mergeCells("B17:D17"); 
//   sheet.getCell("B17:D17").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  

//   sheet.getCell("B18").value = "Very Satisfactory ( 85-89)";
//   sheet.getCell("B18").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
//   sheet.getCell("B18").font = { size: 11,  name: "Arial Narrow" };
//   sheet.mergeCells("B18:D18"); 
//   sheet.getCell("B18:D18").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  


//   sheet.getCell("B19").value = "Outstanding (90-100)";
//   sheet.getCell("B19").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
//   sheet.getCell("B19").font = { size: 11,  name: "Arial Narrow" };
//   sheet.mergeCells("B19:D19"); 
//   sheet.getCell("B19:D19").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  



//   sheet.getCell("B20").value = "TOTAL";
//   sheet.getCell("B20").alignment = { horizontal: "center", vertical: "middle", wrapText: true };
//   sheet.getCell("B20").font = { size: 11,  name: "Arial Narrow" };
//   sheet.mergeCells("B20:D20"); 
//   sheet.getCell("B20:D20").border = {
//     left: { style: "thin" },
//     right: { style: "thin" },
//     top: { style: "thin" },
//     bottom: { style: "thin" },
//   };  

// // Map promotion keys in your data to your rows
// const promotionMap = {
//   PROMOTED: 11,
//   SUMMER: 12,      // SUMMER seems to correspond to CONDITIONAL in your sheet
//   RETAINED: 13
// };

// // Map grades to starting columns
// const gradeColumns = {
//   '7': { male: 5, female: 6, total: 7 },
//   '8': { male: 8, female: 9, total: 10 },
//   '9': { male: 11, female: 12, total: 13 },
//   '10': { male: 14, female: 15, total: 16 },
//   TOTAL: { male: 17, female: 18, total: 19 }
// };
// type Promotion = 'PROMOTED' | 'SUMMER' | 'RETAINED';
// type GradeKey = '7' | '8' | '9' | '10' | 'TOTAL';

// // type GenderData = Record<Promotion, number>;
// // type GradeData = {
// //   male: GenderData;
// //   female: GenderData;
// //   total: GenderData;
// // };

// // type SF6Data = Record<GradeKey, GradeData>;


// // Insert data into the sheet
// // for (const [grade, data] of Object.entries(sf6Data)) {
// //   const columns = gradeColumns[grade];
// //   for (const [promotion, row] of Object.entries(promotionMap)) {
// //     sheet.getCell(row, columns.male).value = data.male[promotion] || 0;
// //     sheet.getCell(row, columns.female).value = data.female[promotion] || 0;
// //     sheet.getCell(row, columns.total).value = data.total[promotion] || 0;
// //   }
// // }
// for (const gradeKey of Object.keys(sf6Data) as GradeKey[]) {
//   const data = sf6Data[gradeKey]; // Now properly typed

//   const columns = gradeColumns[gradeKey];
//   for (const [promotion, row] of Object.entries(promotionMap)) {
//     const p = promotion as Promotion; // cast promotion
//     sheet.getCell(row, columns.male).value = data.male[p] || 0;
//     sheet.getCell(row, columns.female).value = data.female[p] || 0;
//     sheet.getCell(row, columns.total).value = data.total[p] || 0;
//   }
// }


// // Calculate TOTAL column if needed
// for (const row of [11, 12, 13]) {
//   sheet.getCell(row, 17).value = 
//     (sheet.getCell(row, 5).value as number || 0) +
//     (sheet.getCell(row, 8).value as number || 0) +
//     (sheet.getCell(row, 11).value as number || 0) +
//     (sheet.getCell(row, 14).value as number || 0);

//   sheet.getCell(row, 18).value = 
//     (sheet.getCell(row, 6).value as number || 0) +
//     (sheet.getCell(row, 9).value as number || 0) +
//     (sheet.getCell(row, 12).value as number || 0) +
//     (sheet.getCell(row, 15).value as number || 0);

//   sheet.getCell(row, 19).value = 
//     (sheet.getCell(row, 7).value as number || 0) +
//     (sheet.getCell(row, 10).value as number || 0) +
//     (sheet.getCell(row, 13).value as number || 0) +
//     (sheet.getCell(row, 16).value as number || 0);
// }




// const gradeRanges = [
//   { label: "Did Not Meet Expectations (Below 75)", key: "below75" },
//   { label: "Fairly Satisfactory (75-79)", key: "75to79" },
//   { label: "Satisfactory (80-84)", key: "80to84" },
//   { label: "Very Satisfactory (85-89)", key: "85to89" },
//   { label: "Outstanding (90-100)", key: "90to100" },
// ];

// // Grade levels (7–10)
// const gradeLevels = ["7", "8", "9", "10"];

// const rowStart = 15; // first row of grade ranges

// gradeRanges.forEach((range, i) => {
//   const row = rowStart + i;

//   // Label column (B–D)
//   // sheet.mergeCells(`B${row}:D${row}`);
//   // sheet.getCell(`B${row}`).value = range.label;
//   // sheet.getCell(`B${row}`).alignment = { horizontal: "left", vertical: "middle", wrapText: true };
//   // sheet.getCell(`B${row}`).font = { size: 11, name: "Arial Narrow" };
//   // sheet.getCell(`B${row}`).border = {
//   //   top: { style: "thin" },
//   //   bottom: { style: "thin" },
//   //   left: { style: "thin" },
//   //   right: { style: "thin" },
//   // };

//   // Insert data per grade (columns E–P)
//   let colStart = 5; // E = 5
//   gradeLevels.forEach((g) => {
//     const male = sf6Data[g]?.male?.[range.key] || 0;
//     const female = sf6Data[g]?.female?.[range.key] || 0;
//     const total = male + female;

//     sheet.getCell(row, colStart).value = male;
//     sheet.getCell(row, colStart + 1).value = female;
//     sheet.getCell(row, colStart + 2).value = total;

//     // Borders and alignment for each cell
//     for (let c = colStart; c <= colStart + 2; c++) {
//       sheet.getCell(row, c).border = {
//         top: { style: "thin" },
//         bottom: { style: "thin" },
//         left: { style: "thin" },
//         right: { style: "thin" },
//       };
//       sheet.getCell(row, c).alignment = { horizontal: "center", vertical: "middle" };
//     }

//     colStart += 3; // move to next grade
//   });

//   // TOTAL across all grades (columns Q–S)
//   const totalMale = gradeLevels.reduce((sum, g) => sum + (sf6Data[g]?.male?.[range.key] || 0), 0);
//   const totalFemale = gradeLevels.reduce((sum, g) => sum + (sf6Data[g]?.female?.[range.key] || 0), 0);
//   const totalAll = totalMale + totalFemale;

//   sheet.getCell(row, 17).value = totalMale; // Q
//   sheet.getCell(row, 18).value = totalFemale; // R
//   sheet.getCell(row, 19).value = totalAll; // S

//   for (let c = 17; c <= 19; c++) {
//     sheet.getCell(row, c).border = {
//       top: { style: "thin" },
//       bottom: { style: "thin" },
//       left: { style: "thin" },
//       right: { style: "thin" },
//     };
//     sheet.getCell(row, c).alignment = { horizontal: "center", vertical: "middle" };
//   }
// });

//   // === EXPORT ===
//   const buffer = await workbook.xlsx.writeBuffer();
//   saveAs(new Blob([buffer]), "School_Form_6_SF6.xlsx");
// }
