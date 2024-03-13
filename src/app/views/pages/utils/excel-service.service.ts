import { Injectable } from '@angular/core';
import * as fs from 'file-saver';
import { Workbook } from 'exceljs';
import * as logo from './logo.js'
import { DatePipe } from '@angular/common';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor(private datePipe: DatePipe) { }

  public exportAsExcelFile(
    reportHeading: string,
    reportSubHeading: string,
    headersArray: any[],
    json: any[],
    footerData: any,
    excelFileName: string,
    sheetName: string
  ) {
    const header = headersArray;
    const data = json;

    /* Create workbook and worksheet */
    const workbook = new Workbook();
    /* Set workbook properties */
    workbook.creator = 'Brome';
    workbook.lastModifiedBy = 'Brome';
    workbook.created = new Date();
    workbook.modified = new Date();
    const worksheet = workbook.addWorksheet(sheetName);
    /* file orientation */
    worksheet.views = [{ rightToLeft: true }]
    /* Add header row */
    worksheet.addRow([]);

    worksheet.mergeCells('D2:E2');
    worksheet.getCell('E2').value = reportHeading;
    worksheet.getCell('E2').alignment = { horizontal: 'center' };
    worksheet.getCell('E2').font = { size: 12, bold: true };
    worksheet.getCell('E2').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'aeb6e8c5' },
    };
    worksheet.getCell('E2').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    worksheet.addRow([]);
    //let subTitleRow = worksheet.addRow(['date: ' + this.datePipe.transform(new Date(), 'medium' ) ] );

    if (reportHeading !== '') {
      worksheet.mergeCells('D3:E3');
      worksheet.getCell('E3').value = 'تاريخ : ' + this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      worksheet.getCell('E3').alignment = { horizontal: 'center' };
      worksheet.getCell('E3').font = { size: 12, bold: true };
      worksheet.getCell('E3').fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'aedde9el' },
      };
      worksheet.getCell('E3').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      worksheet.addRow([]);
    }

    //Add Image
    let myLogoImage = workbook.addImage({
      base64: logo.imgBase64,
      extension: 'png',
    });
    // worksheet.addRow([]);
    // worksheet.mergeCells('E2:');
    worksheet.addImage(myLogoImage, {
      tl: { col: 0.6, row: 0.4 },
      ext: { width: 50, height: 80 }
    });
    // worksheet.mergeCells('A1:D2');
    worksheet.addRow([]);
    worksheet.addRow([]);
    /* Add header row */
    const headerRow = worksheet.addRow(header);

    // Cell style : Fill and border
    headerRow.eachCell((cell, index) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'ffb0eaf6' },
      };
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      cell.font = { size: 12, bold: true };

      worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].lenght;
    });

    // Add Data and Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(Object.values(d));
      row.alignment = { vertical: 'middle', horizontal: 'right' };
      let qty = row.getCell(1);
      let color = 'aefaf5b9';
      if (+qty.value < 500) {
        color = 'aefdb772'
      }

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      }
      row.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    }

    );
    worksheet.getColumn(1).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getColumn(2).width = 50;
    worksheet.getColumn(2).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true };
    worksheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);

    // Get all collumns from JSON
    /*
    let columnsArray: any[];
    for (const key in json) {
      if (json.hasOwnProperty(key)) {
        columnsArray = Object.keys(json[key]);
      }
    }
    */

    // Add data  and conditional formatting
    /*
    data.forEach((element: any) => {
      const eachRow = [];
      columnsArray.forEach((column) => {
        eachRow.push(element[column]);
      });

      if (element.isDeleted === 'y') {
        const deleteRow = worksheet.addRow(eachRow);
        deleteRow.eachCell((cell) => {
          cell.font = { name: 'Calibri', family: 4, size: 11, bold: false, strike: true };
        });
      } else {
        worksheet.addRow(eachRow);
      }
    });

    worksheet.addRow([]);
    if (footerData != null) {
      footerData.forEach((element: any) => {
        const eachRow = [];
        element.forEach((val: any) => {
          eachRow.push(val);
        });

        const footerRow = worksheet.addRow(eachRow);

        footerRow.eachCell((cell) => {
          cell.font = { bold: true };
        });
      });
    }
    */

    //Footer Row
    let footerRow = worksheet.addRow(['هذا الجدول تم إنشاءه من طرف نظام المعلومات']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'aed4d2c9' },
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    footerRow.getCell(1).alignment = { horizontal: 'center' }
    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`);

    /* Save Excel File */
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: EXCEL_TYPE });
      let now = new Date();
      let timeSpan = this.datePipe.transform(now, "ddMMyyyyHHmmss");
      fs.saveAs(blob, excelFileName + '-' + timeSpan + EXCEL_EXTENSION);
    })
  }




  public exportAsExcel(
    reportHeading: string,
    reportSubHeading: string,
    headersArray: any[],
    json: any,
    footerData: any,
    excelFileName: string,
    sheetName: string
  ) {
    const header = headersArray;
    const data = json;

    const workbook = new Workbook();
    workbook.creator = 'Brome';
    workbook.lastModifiedBy = 'Brome';
    workbook.created = new Date();
    workbook.modified = new Date();
    const worksheet = workbook.addWorksheet(sheetName);
    worksheet.views = [{ rightToLeft: false }]
    worksheet.addRow([]);

    worksheet.mergeCells("P13:P13");
    worksheet.getColumn("P").width = 30;
    worksheet.getCell("P13").value = '';
    worksheet.getCell("P13").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("P13").font = { name: "Calibri", size: 18, bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("O13:M13");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("O13").value = 'التوجه رقم 1';
    worksheet.getCell("O13").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("O13").font = { name: "Calibri", size: 18, bold: true, color: { argb: "FF000000" } };
    worksheet.getCell("O13").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "E2EFDA" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("L13:J13");
    worksheet.getColumn("L").width = 30;
    worksheet.getCell("L13").value = 'التوجه رقم 2';
    worksheet.getCell("L13").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("L13").font = { name: "Calibri", size: 18, bold: true, color: { argb: "FF000000" } };
    worksheet.getCell("L13").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "C6E0B4" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("I13:G13");
    worksheet.getColumn("I").width = 30;
    worksheet.getCell("I13").value = 'التوجه رقم 3';
    worksheet.getCell("I13").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("I13").font = { name: "Calibri", size: 18, bold: true, color: { argb: "FF000000" } };
    worksheet.getCell("I13").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "A9D08E" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("F13:D13");
    worksheet.getColumn("F").width = 30;
    worksheet.getCell("F13").value = 'التوجه رقم 4';
    worksheet.getCell("F13").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("F13").font = { name: "Calibri", size: 18, bold: true, color: { argb: "FF000000" } };
    worksheet.getCell("F13").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "B9DA84" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("C13:A13");
    worksheet.getColumn("C").width = 30;
    worksheet.getCell("C13").value = '';
    worksheet.getCell("C13").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("C13").font = { name: "Calibri", size: 18, bold: true, color: { argb: "FFFFFFFF" } };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("O14:O14");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("O14").value = 'عدد المشاريع';
    worksheet.getCell("O14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("O14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("O14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("O15:O15");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("O15").value = data.nombreProjetOr1Prog;
    worksheet.getCell("O15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("O15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("O15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("O16:O16");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("O16").value = data.nombreProjetOr1Achev;
    worksheet.getCell("O16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("O16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("O16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("O17:O17");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("O17").value = data.nombreProjetOr1EnCours;
    worksheet.getCell("O17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("O17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("O17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("O18:O18");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("O18").value = data.nombreProjetOr1NonLanc;
    worksheet.getCell("O18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("O18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("O18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("N14:N14");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("N14").value = 'تكلفة المشاريع';
    worksheet.getCell("N14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("N14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("N14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("N15:N15");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("N15").value = data.coutProjetOr1Prog;
    worksheet.getCell("N15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("N15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("N15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("N16:N16");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("N16").value = data.coutProjetOr1Achev;
    worksheet.getCell("N16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("N16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("N16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("N17:N17");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("N17").value = data.coutProjetOr1EnCours;
    worksheet.getCell("N17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("N17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("N17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("N18:N18");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("N18").value = data.coutProjetOr1NonLanc;
    worksheet.getCell("N18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("N18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("N18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("M14:M14");
    worksheet.getColumn("M").width = 50;
    worksheet.getCell("M14").value = 'المساهمة الكلية جماعة مراكش';
    worksheet.getCell("M14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("M14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("M14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("M15:M15");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("M15").value = data.ContributionTotaleCMMarrOr1Prog;
    worksheet.getCell("M15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("M15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("M15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("M16:M16");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("M16").value = data.ContributionTotaleCMMarrOr1Achev;
    worksheet.getCell("M16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("M16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("M16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("M17:M17");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("M17").value = data.ContributionTotaleCMMarrOr1EnCours;
    worksheet.getCell("M17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("M17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("M17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("M18:M18");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("M18").value = data.ContributionTotaleCMMarrOr1NonLanc;
    worksheet.getCell("M18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("M18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("M18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("L14:L14");
    worksheet.getColumn("L").width = 30;
    worksheet.getCell("L14").value = 'عدد المشاريع';
    worksheet.getCell("L14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("L14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("L14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("L15:L15");
    worksheet.getColumn("L").width = 30;
    worksheet.getCell("L15").value = data.nombreProjetOr2Prog;
    worksheet.getCell("L15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("L15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("L15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("L16:L16");
    worksheet.getColumn("L").width = 30;
    worksheet.getCell("L16").value = data.nombreProjetOr2Achev;
    worksheet.getCell("L16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("L16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("L16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("L17:L17");
    worksheet.getColumn("L").width = 30;
    worksheet.getCell("L17").value = data.nombreProjetOr2EnCours;
    worksheet.getCell("L17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("L17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("L17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("L18:L18");
    worksheet.getColumn("L").width = 30;
    worksheet.getCell("L18").value = data.nombreProjetOr2NonLanc;
    worksheet.getCell("L18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("L18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("L18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("K14:K14");
    worksheet.getColumn("K").width = 30;
    worksheet.getCell("K14").value = 'تكلفة المشاريع';
    worksheet.getCell("K14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("K14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("K14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("K15:K15");
    worksheet.getColumn("K").width = 30;
    worksheet.getCell("K15").value = data.coutProjetOr2Prog;
    worksheet.getCell("K15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("K15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("K15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("K16:K16");
    worksheet.getColumn("K").width = 30;
    worksheet.getCell("K16").value = data.coutProjetOr2Achev;
    worksheet.getCell("K16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("K16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("K16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("K17:K17");
    worksheet.getColumn("K").width = 30;
    worksheet.getCell("K17").value = data.coutProjetOr2EnCours;
    worksheet.getCell("K17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("K17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("K17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("K18:K18");
    worksheet.getColumn("K").width = 30;
    worksheet.getCell("K18").value = data.coutProjetOr2NonLanc;
    worksheet.getCell("K18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("K18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("K18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("J14:J14");
    worksheet.getColumn("J").width = 50;
    worksheet.getCell("J14").value = 'المساهمة الكلية جماعة مراكش';
    worksheet.getCell("J14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("J14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("J14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("J15:J15");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("J15").value = data.ContributionTotaleCMMarrOr2Prog;
    worksheet.getCell("J15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("J15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("J15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("J16:J16");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("J16").value = data.ContributionTotaleCMMarrOr2Achev;
    worksheet.getCell("J16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("J16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("J16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("J17:J17");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("J17").value = data.ContributionTotaleCMMarrOr2EnCours;
    worksheet.getCell("J17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("J17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("J17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("J18:J18");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("J18").value = data.ContributionTotaleCMMarrOr2NonLanc;
    worksheet.getCell("J18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("J18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("J18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("I14:I14");
    worksheet.getColumn("I").width = 30;
    worksheet.getCell("I14").value = 'عدد المشاريع';
    worksheet.getCell("I14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("I14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("I14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("I15:I15");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("I15").value = data.nombreProjetOr3Prog;
    worksheet.getCell("I15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("I15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("I15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("I16:I16");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("I16").value = data.nombreProjetOr3Achev;
    worksheet.getCell("I16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("I16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("I16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("I17:I17");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("I17").value = data.nombreProjetOr3EnCours;
    worksheet.getCell("I17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("I17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("I17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("I18:I18");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("I18").value = data.nombreProjetOr3NonLanc;
    worksheet.getCell("I18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("I18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("I18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("H14:H14");
    worksheet.getColumn("H").width = 30;
    worksheet.getCell("H14").value = 'تكلفة المشاريع';
    worksheet.getCell("H14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("H14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("H14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("H15:H15");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("H15").value = data.coutProjetOr3Prog;
    worksheet.getCell("H15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("H15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("H15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("H16:H16");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("H16").value = data.coutProjetOr3Achev;
    worksheet.getCell("H16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("H16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("H16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("H17:H17");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("H17").value = data.coutProjetOr3EnCours;
    worksheet.getCell("H17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("H17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("H17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("H18:H18");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("H18").value = data.coutProjetOr3NonLanc;
    worksheet.getCell("H18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("H18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("H18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("G14:G14");
    worksheet.getColumn("G").width = 50;
    worksheet.getCell("G14").value = 'المساهمة الكلية جماعة مراكش';
    worksheet.getCell("G14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("G14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("G14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("G15:G15");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("G15").value = data.ContributionTotaleCMMarrOr3Prog;
    worksheet.getCell("G15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("G15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("G15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("G16:G16");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("G16").value = data.ContributionTotaleCMMarrOr3Achev;
    worksheet.getCell("G16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("G16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("G16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("G17:G17");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("G17").value = data.ContributionTotaleCMMarrOr3EnCours;
    worksheet.getCell("G17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("G17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("G17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("G18:G18");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("G18").value = data.ContributionTotaleCMMarrOr3NonLanc;
    worksheet.getCell("G18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("G18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("G18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("F14:F14");
    worksheet.getColumn("F").width = 30;
    worksheet.getCell("F14").value = 'عدد المشاريع';
    worksheet.getCell("F14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("F14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("F14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("F15:F15");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("F15").value = data.nombreProjetOr4Prog;
    worksheet.getCell("F15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("F15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("F15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("F16:F16");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("F16").value = data.nombreProjetOr4Achev;
    worksheet.getCell("F16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("F16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("F16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("F17:F17");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("F17").value = data.nombreProjetOr4EnCours;
    worksheet.getCell("F17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("F17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("F17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("F18:F18");
    worksheet.getColumn("O").width = 30;
    worksheet.getCell("F18").value = data.nombreProjetOr4NonLanc;
    worksheet.getCell("F18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("F18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("F18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("E14:E14");
    worksheet.getColumn("E").width = 30;
    worksheet.getCell("E14").value = 'تكلفة المشاريع';
    worksheet.getCell("E14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("E14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("E14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("E15:E15");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("E15").value = data.coutProjetOr4Prog;
    worksheet.getCell("E15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("E15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("E15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("E16:E16");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("E16").value = data.coutProjetOr4Achev;
    worksheet.getCell("E16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("E16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("E16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("E17:E17");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("E17").value = data.coutProjetOr4EnCours;
    worksheet.getCell("E17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("E17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("E17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("E18:E18");
    worksheet.getColumn("N").width = 30;
    worksheet.getCell("E18").value = data.coutProjetOr4NonLanc;
    worksheet.getCell("E18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("E18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("E18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("D14:D14");
    worksheet.getColumn("D").width = 50;
    worksheet.getCell("D14").value = 'المساهمة الكلية جماعة مراكش';
    worksheet.getCell("D14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("D14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("D14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("D15:D15");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("D15").value = data.ContributionTotaleCMMarrOr4Prog;
    worksheet.getCell("D15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("D15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("D15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("D16:D16");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("D16").value = data.ContributionTotaleCMMarrOr4Achev;
    worksheet.getCell("D16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("D16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("D16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("D17:D17");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("D17").value = data.ContributionTotaleCMMarrOr4EnCours;
    worksheet.getCell("D17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("D17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("D17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("D18:D18");
    worksheet.getColumn("M").width = 30;
    worksheet.getCell("D18").value = data.ContributionTotaleCMMarrOr4NonLanc;
    worksheet.getCell("D18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("D18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("D18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("C14:C14");
    worksheet.getColumn("C").width = 50;
    worksheet.getCell("C14").value = 'التكلفة الاجمالية للمشاريع';
    worksheet.getCell("C14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("C14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("C14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "8EA9DB" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("C15:C15");
    worksheet.getColumn("C").width = 50;
    worksheet.getCell("C15").value = data.coutTotalProjetProg;
    worksheet.getCell("C15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("C15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FFD966" } };
    worksheet.getCell("C15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7B7B7B" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("C16:C16");
    worksheet.getColumn("C").width = 50;
    worksheet.getCell("C16").value = data.coutTotalProjetAchev;
    worksheet.getCell("C16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("C16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FFD966" } };
    worksheet.getCell("C16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("C17:C17");
    worksheet.getColumn("C").width = 50;
    worksheet.getCell("C17").value = data.coutTotalProjetEnCours;
    worksheet.getCell("C17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("C17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FFD966" } };
    worksheet.getCell("C17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("C18:C18");
    worksheet.getColumn("C").width = 50;
    worksheet.getCell("C18").value = data.coutTotalProjetNonLanc;
    worksheet.getCell("C18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("C18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FFD966" } };
    worksheet.getCell("C18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "D9E1F2" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("B14:B14");
    worksheet.getColumn("B").width = 50;
    worksheet.getCell("B14").value = 'العدد الاجمالي للمشاريع';
    worksheet.getCell("B14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("B14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("B14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "8EA9DB" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("B16:B16");
    worksheet.getColumn("B").width = 50;
    worksheet.getCell("B16").value = data.nombreTotalTotalProjetAchev;
    worksheet.getCell("B16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("B16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("B16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("B17:B17");
    worksheet.getColumn("B").width = 50;
    worksheet.getCell("B17").value = data.nombreTotalTotalProjetEnCours;
    worksheet.getCell("B17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("B17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("B17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("B18:B18");
    worksheet.getColumn("B").width = 50;
    worksheet.getCell("B18").value = data.nombreTotalTotalProjetNonLanc;
    worksheet.getCell("B18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("B18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("B18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("B15:B15");
    worksheet.getColumn("C").width = 50;
    worksheet.getCell("B15").value = data.nombreTotalTotalProjetProg;
    worksheet.getCell("B15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("B15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FFD966" } };
    worksheet.getCell("B15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7B7B7B" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("A14:A15");
    worksheet.getColumn("A").width = 50;
    worksheet.getCell("A14").value = 'نسبة التقدم الميداني للبرنامج';
    worksheet.getCell("A14").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("A14").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("A14").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B0F0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("A16:A16");
    worksheet.getColumn("A").width = 50;
    worksheet.getCell("A16").value = '-';
    worksheet.getCell("A16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("A16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("A16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B0F0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("A17:A17");
    worksheet.getColumn("A").width = 50;
    worksheet.getCell("A17").value = '-';
    worksheet.getCell("A17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("A17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("A17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B0F0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("A18:A18");
    worksheet.getColumn("A").width = 50;
    worksheet.getCell("A18").value = '-';
    worksheet.getCell("A18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("A18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("A18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B0F0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("P15:P15");
    worksheet.getColumn("P").width = 50;
    worksheet.getCell("P15").value = 'المشاريع المبرمجة';
    worksheet.getCell("P15").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("P15").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("P15").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "7030A0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("P16:P16");
    worksheet.getColumn("P").width = 50;
    worksheet.getCell("P16").value = 'المشاريع المنتهية';
    worksheet.getCell("P16").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("P16").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("P16").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B050" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("P17:P17");
    worksheet.getColumn("P").width = 50;
    worksheet.getCell("P17").value = 'المشاريع المنطلقة';
    worksheet.getCell("P17").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("P17").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("P17").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("P18:P18");
    worksheet.getColumn("P").width = 50;
    worksheet.getCell("P18").value = 'المشاريع التي لم تنطلق';
    worksheet.getCell("P18").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("P18").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("P18").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF0000" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("P19:P21");
    worksheet.getColumn("P").width = 50;
    worksheet.getCell("P19").value = 'المساهمة  الكلية جماعة مراكش';
    worksheet.getCell("P19").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("P19").font = { name: "Calibri", size: 19, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("P19").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD966" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("P22:P22");
    worksheet.getColumn("P").width = 50;
    worksheet.getCell("P22").value = 'نسبة التقدم  الميداني للبرنامج';
    worksheet.getCell("P22").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("P22").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("P22").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B0F0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("O22:A22");
    worksheet.getColumn("O").width = 50;
    worksheet.getCell("O22").value = '-';
    worksheet.getCell("O22").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("O22").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("O22").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "00B0F0" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("O19:M20");
    worksheet.getColumn("P").width = 50;
    worksheet.getCell("O19").value = data.ontributionTotalCMMarrOr1;
    worksheet.getCell("O19").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("O19").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("O19").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD966" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("L19:J20");
    worksheet.getColumn("P").width = 50;
    worksheet.getCell("L19").value = data.ontributionTotalCMMarrOr2;
    worksheet.getCell("L19").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("L19").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("L19").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD966" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.mergeCells("I19:G20");
    worksheet.getColumn("P").width = 50;
    worksheet.getCell("I19").value = data.ontributionTotalCMMarrOr3;
    worksheet.getCell("I19").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("I19").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("I19").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD966" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("F19:D20");
    worksheet.getColumn("P").width = 50;
    worksheet.getCell("F19").value = data.ontributionTotalCMMarrOr4;
    worksheet.getCell("F19").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("F19").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("F19").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD966" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };


    worksheet.mergeCells("O21:D21");
    worksheet.getColumn("P").width = 50;
    worksheet.getCell("O21").value = data.ontributionTotalCMMarr;
    worksheet.getCell("O21").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("O21").font = { name: "Calibri", size: 18, bold: false, color: { argb: "FF000000" } };
    worksheet.getCell("O21").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "BF8F00" },
    };
    worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

    worksheet.getColumn(1).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getColumn(2).width = 50;
    worksheet.getColumn(2).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true };
    worksheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.addRow([]);


    /* let footerRow = worksheet.addRow(['هذا الجدول تم إنشاءه من طرف نظام المعلومات']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'aed4d2c9' },
    }; */
    /*  footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
     footerRow.getCell(1).alignment = { horizontal: 'center' }
     worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`); */

    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: EXCEL_TYPE });
      let now = new Date();
      let timeSpan = this.datePipe.transform(now, "ddMMyyyyHHmmss");
      fs.saveAs(blob, excelFileName + '-' + timeSpan + EXCEL_EXTENSION);
    })
  }


  public exportAsExcelPatrimoineCommunalFr(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any[], footerData: any, excelFileName: string, sheetName: string) {
    const header = headersArray;
    const data = json;

    /* Create workbook and worksheet */
    const workbook = new Workbook();
    /* Set workbook properties */
    workbook.creator = "Brome";
    workbook.lastModifiedBy = "Brome";
    workbook.created = new Date();
    workbook.modified = new Date();
    const worksheet = workbook.addWorksheet(sheetName);
    /* file orientation */
    worksheet.views = [{ rightToLeft: false }];
    /* Add header row */
    worksheet.addRow([]);
    worksheet.mergeCells("A1:A5");
    // worksheet.mergeCells("B1:B5");

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

    worksheet.mergeCells("B2:K2");
    worksheet.getCell("B2").value = reportHeading;
    worksheet.getCell("B2").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("B2").font = { size: 12, bold: true };
    worksheet.getCell("B2").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "aeb6e8c5" },
    };
    worksheet.getCell("B2").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
    worksheet.addRow([]);
    /* ==================================================================================== */
    /* ==================================================================================== */

    //let subTitleRow = worksheet.addRow(['date: ' + this.datePipe.transform(new Date(), 'medium' ) ] );

    if (reportHeading !== "") {
      worksheet.mergeCells("B3:K3");
      worksheet.getCell("B3").value = "تاريخ : " + this.datePipe.transform(new Date(), "dd-MM-yyyy");
      worksheet.getCell("B3").alignment = { vertical: "middle", horizontal: "center" };
      worksheet.getCell("B3").font = { size: 12, bold: true };
      worksheet.getCell("B3").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "aedde9el" },
      };
      worksheet.getCell("B3").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      worksheet.addRow([]);
    }

    //Add Image
    let myLogoImage = workbook.addImage({
      base64: logo.imgBase64,
      extension: "png",
    });

    worksheet.addImage(myLogoImage, {
      tl: { col: 0.6, row: 0.4 },
      ext: { width: 50, height: 80 },
    });
    // worksheet.mergeCells('A1:D2');
    // worksheet.addRow([]);
    // worksheet.addRow([]);
    /* Add header row */
    const headerRow = worksheet.addRow(header);

    // Cell style : Fill and border
    headerRow.eachCell((cell, index) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffb0eaf6" },
      };
      cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      cell.font = { size: 12, bold: true };

      worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].lenght;
    });

    // Add Data and Conditional Formatting
    data.forEach((d) => {
      let row = worksheet.addRow(Object.values(d));
      row.alignment = { vertical: "middle", horizontal: "left" };
      let qty = row.getCell(1);
      let color = "aefaf5b9";
      if (+qty.value < 500) {
        color = "aefdb772";
      }

      qty.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: color },
      };
      row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
    });
    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(3).width = 10;
    worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(7).width = 25;
    worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(8).width = 20;
    worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(9).width = 20;
    worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(10).width = 25;
    worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(11).width = 30;
    worksheet.getColumn(11).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(12).width = 25;
    worksheet.getColumn(12).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(13).width = 20;
    worksheet.getColumn(13).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(14).width = 20;
    worksheet.getColumn(14).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(15).width = 20;
    worksheet.getColumn(15).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(16).width = 20;
    worksheet.getColumn(16).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(17).width = 20;
    worksheet.getColumn(17).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(18).width = 50;
    worksheet.getColumn(18).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(19).width = 20;
    worksheet.getColumn(19).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(20).width = 20;
    worksheet.getColumn(20).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(21).width = 50;
    worksheet.getColumn(21).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(22).width = 50;
    worksheet.getColumn(22).alignment = { vertical: "middle", horizontal: "center" };


    worksheet.addRow([]);

    //Footer Row
    let footerRow = worksheet.addRow(["هذا الجدول تم إنشاءه من طرف نظام المعلومات"]);
    footerRow.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "aed4d2c9" },
    };
    footerRow.getCell(1).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
    footerRow.getCell(1).alignment = { horizontal: "center" };
    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`);

    /* Save Excel File */
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: EXCEL_TYPE });
      let now = new Date();
      let timeSpan = this.datePipe.transform(now, "dd-MM-yyyy");
      fs.saveAs(blob, excelFileName + " " + timeSpan + EXCEL_EXTENSION);
    });
  }


  public exportAsExcelPatrimoineCommunalAr(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any[], footerData: any, excelFileName: string, sheetName: string) {
    const header = headersArray;
    const data = json;

    /* Create workbook and worksheet */
    const workbook = new Workbook();
    /* Set workbook properties */
    workbook.creator = "Brome";
    workbook.lastModifiedBy = "Brome";
    workbook.created = new Date();
    workbook.modified = new Date();
    const worksheet = workbook.addWorksheet(sheetName);
    /* file orientation */
    worksheet.views = [{ rightToLeft: true }];
    /* Add header row */
    worksheet.addRow([]);
    worksheet.mergeCells("A1:A5");
    // worksheet.mergeCells("B1:B5");

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

    worksheet.mergeCells("B2:K2");
    worksheet.getCell("B2").value = reportHeading;
    worksheet.getCell("B2").alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getCell("B2").font = { size: 12, bold: true };
    worksheet.getCell("B2").fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "aeb6e8c5" },
    };
    worksheet.getCell("B2").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
    worksheet.addRow([]);
    /* ==================================================================================== */
    /* ==================================================================================== */

    //let subTitleRow = worksheet.addRow(['date: ' + this.datePipe.transform(new Date(), 'medium' ) ] );

    if (reportHeading !== "") {
      worksheet.mergeCells("B3:K3");
      worksheet.getCell("B3").value = "تاريخ : " + this.datePipe.transform(new Date(), "dd-MM-yyyy");
      worksheet.getCell("B3").alignment = { vertical: "middle", horizontal: "center" };
      worksheet.getCell("B3").font = { size: 12, bold: true };
      worksheet.getCell("B3").fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "aedde9el" },
      };
      worksheet.getCell("B3").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      worksheet.addRow([]);
    }

    //Add Image
    let myLogoImage = workbook.addImage({
      base64: logo.imgBase64,
      extension: "png",
    });

    worksheet.addImage(myLogoImage, {
      tl: { col: 0.6, row: 0.4 },
      ext: { width: 50, height: 80 },
    });
    // worksheet.mergeCells('A1:D2');
    // worksheet.addRow([]);
    // worksheet.addRow([]);
    /* Add header row */
    const headerRow = worksheet.addRow(header);

    // Cell style : Fill and border
    headerRow.eachCell((cell, index) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "ffb0eaf6" },
      };
      cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      cell.font = { size: 12, bold: true };

      worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].lenght;
    });

    // Add Data and Conditional Formatting
    data.forEach((d) => {
      let row = worksheet.addRow(Object.values(d));
      row.alignment = { vertical: "middle", horizontal: "left" };
      let qty = row.getCell(1);
      let color = "aefaf5b9";
      if (+qty.value < 500) {
        color = "aefdb772";
      }

      qty.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: color },
      };
      row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
    });
    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(2).width = 30;
    worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(3).width = 10;
    worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(4).width = 15;
    worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(5).width = 15;
    worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(7).width = 25;
    worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(8).width = 20;
    worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(9).width = 20;
    worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(10).width = 25;
    worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(11).width = 30;
    worksheet.getColumn(11).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(12).width = 25;
    worksheet.getColumn(12).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(13).width = 20;
    worksheet.getColumn(13).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(14).width = 20;
    worksheet.getColumn(14).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(15).width = 20;
    worksheet.getColumn(15).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(16).width = 20;
    worksheet.getColumn(16).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(17).width = 20;
    worksheet.getColumn(17).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(18).width = 50;
    worksheet.getColumn(18).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(19).width = 20;
    worksheet.getColumn(19).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(20).width = 20;
    worksheet.getColumn(20).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(21).width = 50;
    worksheet.getColumn(21).alignment = { vertical: "middle", horizontal: "center" };
    worksheet.getColumn(22).width = 50;
    worksheet.getColumn(22).alignment = { vertical: "middle", horizontal: "center" };


    worksheet.addRow([]);

    //Footer Row
    let footerRow = worksheet.addRow(["هذا الجدول تم إنشاءه من طرف نظام المعلومات"]);
    footerRow.getCell(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "aed4d2c9" },
    };
    footerRow.getCell(1).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
    footerRow.getCell(1).alignment = { horizontal: "center" };
    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`);

    /* Save Excel File */
    workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: EXCEL_TYPE });
      let now = new Date();
      let timeSpan = this.datePipe.transform(now, "dd-MM-yyyy");
      fs.saveAs(blob, excelFileName + " " + timeSpan + EXCEL_EXTENSION);
    });
  }


}
