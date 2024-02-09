import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import * as fs from "file-saver";
import { Workbook } from "exceljs";
import * as logo from "./logo.js";
import { difference, property } from "lodash";

const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
	providedIn: "root",
})
export class ExcelAssociationService {
	constructor(private datePipe: DatePipe) {}

	public exportAsExcelFile2(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any[], footerData: any, excelFileName: string, sheetName: string) {
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
		worksheet.getColumn(1).width = 20;
		worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(2).width = 40;
		worksheet.getColumn(10).width = 20;
		worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center" };

		worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center" };

		worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center" };

		worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center" };

		worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center" };

		worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center" };

		worksheet.getColumn(11).width = 60;
		worksheet.getColumn(11).alignment = { vertical: "middle", horizontal: "center" };

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
			let timeSpan = this.datePipe.transform(now, "ddMMyyyyHHmmss");
			fs.saveAs(blob, excelFileName + "-" + timeSpan + EXCEL_EXTENSION);
		});
	}

	public exportAsExcelFile(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any[], footerData: any, excelFileName: string, sheetName: string) {
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

		worksheet.mergeCells("B2:E2");
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
		//let subTitleRow = worksheet.addRow(['date: ' + this.datePipe.transform(new Date(), 'medium' ) ] );

		if (reportHeading !== "") {
			worksheet.mergeCells("B3:E3");
			worksheet.getCell("B3").value = "تاريخ : " + this.datePipe.transform(new Date(), "dd-MM-yyyy");
			worksheet.getCell("B3").alignment = { horizontal: "center" };
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
		worksheet.mergeCells("A1:A5");
		worksheet.addImage(myLogoImage, {
			tl: { col: 0.6, row: 0.4 },
			ext: { width: 50, height: 80 },
		});
		// worksheet.mergeCells('A1:D2');
		worksheet.addRow([]);
		worksheet.addRow([]);
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

			worksheet.getColumn(index).width = header[index - 1].length < 40 ? 40 : header[index - 1].lenght;
		});

		// Add Data and Conditional Formatting
		data.forEach((d) => {
			const year = d.date.split(",")[0].split("/")[2];
			// const yearFin = d.dateFin.split(",")[0];
			d.date = year;
			// d.dateFin = yearFin;
			let row = worksheet.addRow(Object.values(d));
			row.alignment = { vertical: "middle", horizontal: "center" };
			// let qty = row.getCell(1);
			let color = "aefaf5b9";
			/*  if (+qty.value < 500) {
         color = 'aefdb772'
       }
 
       qty.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: color }
       } */
			row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		});
		worksheet.getColumn(1).width = 60;
		worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(2).width = 20;
		worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(3).width = 40;
		worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(4).width = 15;
		worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(5).width = 60;
		worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(6).width = 70;
		worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(7).width = 20;
		worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(8).width = 20;
		worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(9).width = 130;
		worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(10).width = 80;
		worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(11).width = 30;
		worksheet.getColumn(11).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(12).width = 30;
		worksheet.getColumn(12).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(13).width = 30;
		worksheet.getColumn(13).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(14).width = 30;
		worksheet.getColumn(14).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(15).width = 30;
		worksheet.getColumn(15).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(16).width = 30;
		worksheet.getColumn(16).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(17).width = 30;
		worksheet.getColumn(17).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(18).width = 30;
		worksheet.getColumn(18).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(19).width = 30;
		worksheet.getColumn(19).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(20).width = 30;
		worksheet.getColumn(20).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(21).width = 50;
		worksheet.getColumn(21).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(22).width = 50;
		worksheet.getColumn(22).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(23).width = 50;
		worksheet.getColumn(23).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(24).width = 50;
		worksheet.getColumn(24).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(25).width = 50;
		worksheet.getColumn(25).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(26).width = 50;
		worksheet.getColumn(26).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(27).width = 60;
		worksheet.getColumn(27).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(28).width = 70;
		worksheet.getColumn(28).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(29).width = 60;
		worksheet.getColumn(29).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(30).width = 60;
		worksheet.getColumn(30).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(31).width = 60;
		worksheet.getColumn(31).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(32).width = 70;
		worksheet.getColumn(32).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(33).width = 60;
		worksheet.getColumn(33).alignment = { vertical: "middle", horizontal: "center" };
		// worksheet.getColumn(2).width = 30;
		// worksheet.getColumn(10).width = 20;
		// worksheet.getColumn(2).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true };
		// worksheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'right' };
		worksheet.addRow([]);

		//Footer Row
		// let footerRow = worksheet.addRow(['هذا الجدول تم إنشاءه من طرف نظام المعلومات']);
		let footerRow = worksheet.addRow([""]);
		let countCout = 0;
		let countContributionCommuneP1P2 = 0.0;
		let countContributionCP1 = 0.0;
		let countContributionTotalP1 = 0.0;
		let countContributionCP2 = 0.0;
		let countContributionTotalP2 = 0.0;
		let countContributionCP3 = 0.0;
		let countContributionTotalP3 = 0.0;
		let countContributionCommune = 0.0;
		let countContributionPartenaires = 0.0;
		let countTotalContribution3PAnnees = 0.0;
		let countTotalContribution3DAnnees = 0.0;
		let countMontantDispoCommune3PA = 0.0;
		let countMontantIndispoCommune = 0.0;
		for (let i = 0; i < data.length; i++) {
			countCout += data[i].cout;
		}
		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContributionCommunePh1Ph2);
			if (!isNaN(parsedValue)) {
				countContributionCommuneP1P2 += parsedValue;
			}
		}
		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].contributionCommune1);
			if (!isNaN(parsedValue)) {
				countContributionCP1 += parsedValue;
			}
		}
		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContribution1);
			if (!isNaN(parsedValue)) {
				countContributionTotalP1 += parsedValue;
			}
		}
		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].contributionCommune2);
			if (!isNaN(parsedValue)) {
				countContributionCP2 += parsedValue;
			}
		}
		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContribution2);
			if (!isNaN(parsedValue)) {
				countContributionTotalP2 += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].contributionCommune3);
			if (!isNaN(parsedValue)) {
				countContributionCP3 += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContribution3);
			if (!isNaN(parsedValue)) {
				countContributionTotalP3 += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].contributionCommune);
			if (!isNaN(parsedValue)) {
				countContributionCommune += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].contributionPartenaires);
			if (!isNaN(parsedValue)) {
				countContributionPartenaires += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContribution3PAnnees);
			if (!isNaN(parsedValue)) {
				countTotalContribution3PAnnees += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContribution3DAnnees);
			if (!isNaN(parsedValue)) {
				countTotalContribution3DAnnees += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].montantDispoCommune3PA);
			if (!isNaN(parsedValue)) {
				countMontantDispoCommune3PA += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].montantIndispoCommune);
			if (!isNaN(parsedValue)) {
				countMontantIndispoCommune += parsedValue;
			}
		}

		/* worksheet.mergeCells('D450:E450');
    worksheet.getCell('E450').value = 'Total des coût : ' + countCout;
    worksheet.getCell('E450').alignment = { horizontal: 'center' };
    worksheet.getCell('E450').font = { size: 12, bold: true };
    worksheet.getCell('E450').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'aedde9el' },
    }; */
		/* footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'aed4d2c9' },
    }; */
		footerRow.getCell(4).fill = {
			type: "pattern",
			pattern: "solid",
			// fgColor: { argb: 'aed4d2c9' },
			fgColor: { argb: "aedde9el" },
		};
		/* footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    footerRow.getCell(1).alignment = { horizontal: 'center' } */
		footerRow.getCell(4).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		footerRow.getCell(4).alignment = { horizontal: "center" };
		//Merge Cells
		worksheet.mergeCells(`D${footerRow.number}:E${footerRow.number}`);
		worksheet.getCell(`D${footerRow.number}:E${footerRow.number}`).value = "Total des coûts : " + countCout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

		worksheet.mergeCells(`T${footerRow.number}:T${footerRow.number}`);
		worksheet.getCell(`T${footerRow.number}:T${footerRow.number}`).value = countCout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`T`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`T${footerRow.number}:T${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`U${footerRow.number}:U${footerRow.number}`);
		worksheet.getCell(`U${footerRow.number}:U${footerRow.number}`).value = countContributionCommuneP1P2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`U`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`U${footerRow.number}:U${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`V${footerRow.number}:V${footerRow.number}`);
		worksheet.getCell(`V${footerRow.number}:V${footerRow.number}`).value = countContributionCP1.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`V`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`V${footerRow.number}:V${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`W${footerRow.number}:W${footerRow.number}`);
		worksheet.getCell(`W${footerRow.number}:W${footerRow.number}`).value = countContributionTotalP1.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`W`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`W${footerRow.number}:W${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`X${footerRow.number}:X${footerRow.number}`);
		worksheet.getCell(`X${footerRow.number}:X${footerRow.number}`).value = countContributionCP2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`X`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`X${footerRow.number}:X${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`Y${footerRow.number}:Y${footerRow.number}`);
		worksheet.getCell(`Y${footerRow.number}:Y${footerRow.number}`).value = countContributionTotalP2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`Y`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`Y${footerRow.number}:Y${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`Z${footerRow.number}:Z${footerRow.number}`);
		worksheet.getCell(`Z${footerRow.number}:Z${footerRow.number}`).value = countContributionCP3.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`Z`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`Z${footerRow.number}:Z${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AA${footerRow.number}:AA${footerRow.number}`);
		worksheet.getCell(`AA${footerRow.number}:AA${footerRow.number}`).value = countContributionTotalP3.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AA`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AA${footerRow.number}:AA${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AB${footerRow.number}:AB${footerRow.number}`);
		worksheet.getCell(`AB${footerRow.number}:AB${footerRow.number}`).value = countContributionCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AB`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AB${footerRow.number}:AB${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AC${footerRow.number}:AC${footerRow.number}`);
		worksheet.getCell(`AC${footerRow.number}:AC${footerRow.number}`).value = countContributionPartenaires.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AC`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AC${footerRow.number}:AC${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AD${footerRow.number}:AD${footerRow.number}`);
		worksheet.getCell(`AD${footerRow.number}:AD${footerRow.number}`).value = countTotalContribution3PAnnees.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AD`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AD${footerRow.number}:AD${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AE${footerRow.number}:AE${footerRow.number}`);
		worksheet.getCell(`AE${footerRow.number}:AE${footerRow.number}`).value = countTotalContribution3DAnnees.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AE`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AE${footerRow.number}:AE${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AF${footerRow.number}:AF${footerRow.number}`);
		worksheet.getCell(`AF${footerRow.number}:AF${footerRow.number}`).value = countMontantDispoCommune3PA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AF`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AF${footerRow.number}:AF${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AG${footerRow.number}:AG${footerRow.number}`);
		worksheet.getCell(`AG${footerRow.number}:AG${footerRow.number}`).value = countMontantIndispoCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AG`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AG${footerRow.number}:AG${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		/* Save Excel File */
		workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
			const blob = new Blob([data], { type: EXCEL_TYPE });
			let now = new Date();
			let timeSpan = this.datePipe.transform(now, "yyyyHHmmss");
			fs.saveAs(blob, excelFileName + "-" + timeSpan + EXCEL_EXTENSION);
		});
	}

	public exportAsExcelFileAr(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any[], footerData: any, excelFileName: string, sheetName: string) {
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

		worksheet.mergeCells("B2:E2");
		worksheet.getCell("B2").value = reportHeading;
		worksheet.getCell("B2").alignment = { horizontal: "center" };
		worksheet.getCell("B2").font = { size: 12, bold: true };
		worksheet.getCell("B2").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("B2").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.addRow([]);
		//let subTitleRow = worksheet.addRow(['date: ' + this.datePipe.transform(new Date(), 'medium' ) ] );

		if (reportHeading !== "") {
			worksheet.mergeCells("B3:E3");
			worksheet.getCell("B3").value = "تاريخ : " + this.datePipe.transform(new Date(), "dd-MM-yyyy");
			worksheet.getCell("B3").alignment = { horizontal: "center" };
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
		worksheet.mergeCells("A1:A5");
		worksheet.addImage(myLogoImage, {
			tl: { col: 0.6, row: 0.4 },
			ext: { width: 50, height: 80 },
		});
		// worksheet.mergeCells('A1:D2');
		worksheet.addRow([]);
		worksheet.addRow([]);
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

			worksheet.getColumn(index).width = header[index - 1].length < 40 ? 40 : header[index - 1].lenght;
		});

		// Add Data and Conditional Formatting
		data.forEach((d) => {
			const year = d.date.split(",")[0].split("/")[2];
			// const yearFin = d.dateFin.split(",")[0];
			d.date = year;
			// d.dateFin = yearFin;
			let row = worksheet.addRow(Object.values(d));
			row.alignment = { vertical: "middle", horizontal: "center" };
			// let qty = row.getCell(1);
			let color = "aefaf5b9";
			/*  if (+qty.value < 500) {
         color = 'aefdb772'
       }
 
       qty.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: color }
       } */
			row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		});
		worksheet.getColumn(1).width = 60;
		worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(2).width = 20;
		worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(3).width = 40;
		worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(4).width = 15;
		worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(5).width = 60;
		worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(6).width = 70;
		worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(7).width = 20;
		worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(8).width = 20;
		worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(9).width = 130;
		worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(10).width = 80;
		worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(11).width = 30;
		worksheet.getColumn(11).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(12).width = 30;
		worksheet.getColumn(12).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(13).width = 30;
		worksheet.getColumn(13).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(14).width = 30;
		worksheet.getColumn(14).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(15).width = 30;
		worksheet.getColumn(15).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(16).width = 30;
		worksheet.getColumn(16).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(17).width = 30;
		worksheet.getColumn(17).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(18).width = 30;
		worksheet.getColumn(18).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(19).width = 30;
		worksheet.getColumn(19).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(20).width = 30;
		worksheet.getColumn(20).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(21).width = 50;
		worksheet.getColumn(21).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(22).width = 50;
		worksheet.getColumn(22).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(23).width = 50;
		worksheet.getColumn(23).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(24).width = 50;
		worksheet.getColumn(24).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(25).width = 50;
		worksheet.getColumn(25).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(26).width = 50;
		worksheet.getColumn(26).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(27).width = 60;
		worksheet.getColumn(27).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(28).width = 70;
		worksheet.getColumn(28).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(29).width = 60;
		worksheet.getColumn(29).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(30).width = 60;
		worksheet.getColumn(30).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(31).width = 60;
		worksheet.getColumn(31).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(32).width = 70;
		worksheet.getColumn(32).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(33).width = 60;
		worksheet.getColumn(33).alignment = { vertical: "middle", horizontal: "center" };
		// worksheet.getColumn(2).width = 30;
		// worksheet.getColumn(10).width = 20;
		// worksheet.getColumn(2).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true };
		// worksheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'right' };
		worksheet.addRow([]);

		//Footer Row
		// let footerRow = worksheet.addRow(['هذا الجدول تم إنشاءه من طرف نظام المعلومات']);
		let footerRow = worksheet.addRow([""]);
		let countCout = 0;
		let countContributionCommuneP1P2 = 0.0;
		let countContributionCP1 = 0.0;
		let countContributionTotalP1 = 0.0;
		let countContributionCP2 = 0.0;
		let countContributionTotalP2 = 0.0;
		let countContributionCP3 = 0.0;
		let countContributionTotalP3 = 0.0;
		let countContributionCommune = 0.0;
		let countContributionPartenaires = 0.0;
		let countTotalContribution3PAnnees = 0.0;
		let countTotalContribution3DAnnees = 0.0;
		let countMontantDispoCommune3PA = 0.0;
		let countMontantIndispoCommune = 0.0;
		for (let i = 0; i < data.length; i++) {
			countCout += data[i].cout;
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContributionCommunePh1Ph2);
			if (!isNaN(parsedValue)) {
				countContributionCommuneP1P2 += parsedValue;
			}
		}
		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].contributionCommune1);
			if (!isNaN(parsedValue)) {
				countContributionCP1 += parsedValue;
			}
		}
		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContribution1);
			if (!isNaN(parsedValue)) {
				countContributionTotalP1 += parsedValue;
			}
		}
		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].contributionCommune2);
			if (!isNaN(parsedValue)) {
				countContributionCP2 += parsedValue;
			}
		}
		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContribution2);
			if (!isNaN(parsedValue)) {
				countContributionTotalP2 += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].contributionCommune3);
			if (!isNaN(parsedValue)) {
				countContributionCP3 += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContribution3);
			if (!isNaN(parsedValue)) {
				countContributionTotalP3 += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].contributionCommune);
			if (!isNaN(parsedValue)) {
				countContributionCommune += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].contributionPartenaires);
			if (!isNaN(parsedValue)) {
				countContributionPartenaires += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContribution3PAnnees);
			if (!isNaN(parsedValue)) {
				countTotalContribution3PAnnees += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].totalContribution3DAnnees);
			if (!isNaN(parsedValue)) {
				countTotalContribution3DAnnees += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].montantDispoCommune3PA);
			if (!isNaN(parsedValue)) {
				countMontantDispoCommune3PA += parsedValue;
			}
		}

		for (let i = 0; i < data.length; i++) {
			let parsedValue = parseFloat(data[i].montantIndispoCommune);
			if (!isNaN(parsedValue)) {
				countMontantIndispoCommune += parsedValue;
			}
		}

		/* worksheet.mergeCells('D450:E450');
    worksheet.getCell('E450').value = 'Total des coût : ' + countCout;
    worksheet.getCell('E450').alignment = { horizontal: 'center' };
    worksheet.getCell('E450').font = { size: 12, bold: true };
    worksheet.getCell('E450').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'aedde9el' },
    }; */
		/* footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'aed4d2c9' },
    }; */
		footerRow.getCell(4).fill = {
			type: "pattern",
			pattern: "solid",
			// fgColor: { argb: 'aed4d2c9' },
			fgColor: { argb: "aedde9el" },
		};
		/* footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    footerRow.getCell(1).alignment = { horizontal: 'center' } */
		footerRow.getCell(4).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		footerRow.getCell(4).alignment = { horizontal: "center" };
		//Merge Cells
		worksheet.mergeCells(`D${footerRow.number}:E${footerRow.number}`);
		worksheet.getCell(`D${footerRow.number}:E${footerRow.number}`).value = "التكلفة الاجمالية  : " + countCout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });

		worksheet.mergeCells(`T${footerRow.number}:T${footerRow.number}`);
		worksheet.getCell(`T${footerRow.number}:T${footerRow.number}`).value = countCout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`T`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`T${footerRow.number}:T${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`U${footerRow.number}:U${footerRow.number}`);
		worksheet.getCell(`U${footerRow.number}:U${footerRow.number}`).value = countContributionCommuneP1P2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`U`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`U${footerRow.number}:U${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`V${footerRow.number}:V${footerRow.number}`);
		worksheet.getCell(`V${footerRow.number}:V${footerRow.number}`).value = countContributionCP1.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`V`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`V${footerRow.number}:V${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`W${footerRow.number}:W${footerRow.number}`);
		worksheet.getCell(`W${footerRow.number}:W${footerRow.number}`).value = countContributionTotalP1.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`W`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`W${footerRow.number}:W${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`X${footerRow.number}:X${footerRow.number}`);
		worksheet.getCell(`X${footerRow.number}:X${footerRow.number}`).value = countContributionCP2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`X`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`X${footerRow.number}:X${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`Y${footerRow.number}:Y${footerRow.number}`);
		worksheet.getCell(`Y${footerRow.number}:Y${footerRow.number}`).value = countContributionTotalP2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`Y`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`Y${footerRow.number}:Y${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`Z${footerRow.number}:Z${footerRow.number}`);
		worksheet.getCell(`Z${footerRow.number}:Z${footerRow.number}`).value = countContributionCP3.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`Z`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`Z${footerRow.number}:Z${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AA${footerRow.number}:AA${footerRow.number}`);
		worksheet.getCell(`AA${footerRow.number}:AA${footerRow.number}`).value = countContributionTotalP3.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AA`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AA${footerRow.number}:AA${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AB${footerRow.number}:AB${footerRow.number}`);
		worksheet.getCell(`AB${footerRow.number}:AB${footerRow.number}`).value = countContributionCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AB`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AB${footerRow.number}:AB${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AC${footerRow.number}:AC${footerRow.number}`);
		worksheet.getCell(`AC${footerRow.number}:AC${footerRow.number}`).value = countContributionPartenaires.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AC`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AC${footerRow.number}:AC${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AD${footerRow.number}:AD${footerRow.number}`);
		worksheet.getCell(`AD${footerRow.number}:AD${footerRow.number}`).value = countTotalContribution3PAnnees.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AD`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AD${footerRow.number}:AD${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AE${footerRow.number}:AE${footerRow.number}`);
		worksheet.getCell(`AE${footerRow.number}:AE${footerRow.number}`).value = countTotalContribution3DAnnees.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AE`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AE${footerRow.number}:AE${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AF${footerRow.number}:AF${footerRow.number}`);
		worksheet.getCell(`AF${footerRow.number}:AF${footerRow.number}`).value = countMontantDispoCommune3PA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AF`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AF${footerRow.number}:AF${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		worksheet.mergeCells(`AG${footerRow.number}:AG${footerRow.number}`);
		worksheet.getCell(`AG${footerRow.number}:AG${footerRow.number}`).value = countMontantIndispoCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		footerRow.getCell(`AG`).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.getCell(`AG${footerRow.number}:AG${footerRow.number}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};

		/* Save Excel File */
		workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
			const blob = new Blob([data], { type: EXCEL_TYPE });
			let now = new Date();
			let timeSpan = this.datePipe.transform(now, "yyyyHHmmss");
			fs.saveAs(blob, excelFileName + "-" + timeSpan + EXCEL_EXTENSION);
		});
	}

	public exportFicheProjetAsExcelFile(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any, footerData: any, excelFileName: string, sheetName: string) {
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

		worksheet.mergeCells("B2:M2");
		worksheet.getCell("M2").value = reportHeading;
		worksheet.getCell("M2").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("M2").font = { size: 12, bold: true };
		worksheet.getCell("M2").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("M2").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.addRow([]);

		if (reportHeading !== "") {
			worksheet.mergeCells("B3:M3");
			worksheet.getCell("M3").value = "تاريخ : " + this.datePipe.transform(new Date(), "dd-MM-yyyy");
			worksheet.getCell("M3").alignment = { vertical: "middle", horizontal: "center" };
			worksheet.getCell("M3").font = { size: 12, bold: true };
			worksheet.getCell("M3").fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "aedde9el" },
			};
			worksheet.getCell("M3").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
			worksheet.addRow([]);
		}

		//Add Image
		let myLogoImage = workbook.addImage({
			base64: logo.imgBase64,
			extension: "png",
		});

		worksheet.mergeCells("A1:A5");
		worksheet.addImage(myLogoImage, {
			tl: { col: 0.6, row: 0.4 },
			ext: { width: 50, height: 80 },
		});

		worksheet.addRow([]);
		worksheet.addRow([]);
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

			worksheet.getColumn(index).width = header[index - 1].length < 8 ? 8 : header[index - 1].lenght;
		});

		// Add Data and Conditional Formatting
		let row = worksheet.addRow(Object.values(data));
		row.alignment = { vertical: "middle", horizontal: "center" };
		// let qty = row.getCell(1);
		let color = "aefaf5b9";
		/*  if (+qty.value < 500) {
       color = 'aefdb772'
     }
 
     qty.fill = {
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: color }
     } */
		row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.getColumn(1).width = 75;
		worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(2).width = 115;
		worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(3).width = 65;
		worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(4).width = 10;
		worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(5).width = 15;
		worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(6).width = 65;
		worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(7).width = 65;
		worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(8).width = 45;
		worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(9).width = 45;
		worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(10).width = 20;
		worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(11).width = 24;
		worksheet.getColumn(11).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(12).width = 13;
		worksheet.getColumn(12).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(13).width = 13;
		worksheet.getColumn(13).alignment = { vertical: "middle", horizontal: "center" };
		/* worksheet.getColumn(9).width = 130;
    worksheet.getColumn(9).alignment = { vertical: 'middle', horizontal: 'left' };
    worksheet.getColumn(10).width = 80;
    worksheet.getColumn(10).alignment = { vertical: 'middle', horizontal: 'left' };
    worksheet.getColumn(11).width = 30;
    worksheet.getColumn(11).alignment = { vertical: 'middle', horizontal: 'left' };
    worksheet.getColumn(12).width = 30;
    worksheet.getColumn(12).alignment = { vertical: 'middle', horizontal: 'left' };
    worksheet.getColumn(13).width = 30;
    worksheet.getColumn(13).alignment = { vertical: 'middle', horizontal: 'left' }; */
		worksheet.addRow([]);

		/* Save Excel File */
		workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
			const blob = new Blob([data], { type: EXCEL_TYPE });
			let now = new Date();
			let timeSpan = this.datePipe.transform(now, "yyyyHHmmss");
			fs.saveAs(blob, excelFileName + "-" + timeSpan + EXCEL_EXTENSION);
		});
	}

	public exportFicheProjetAsExcelFileAr(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any, footerData: any, excelFileName: string, sheetName: string) {
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

		worksheet.mergeCells("B2:M2");
		worksheet.getCell("B2").value = reportHeading;
		worksheet.getCell("B2").alignment = { horizontal: "center" };
		worksheet.getCell("B2").font = { size: 12, bold: true };
		worksheet.getCell("B2").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("B2").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.addRow([]);

		worksheet.addRow([]);
		worksheet.addRow([]);
		/* Add header row */

		if (reportHeading !== "") {
			worksheet.mergeCells("B3:M3");
			worksheet.getCell("B3").value = "تاريخ : " + this.datePipe.transform(new Date(), "dd-MM-yyyy");
			worksheet.getCell("B3").alignment = { horizontal: "center" };
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
		worksheet.mergeCells("A1:A5");
		worksheet.addImage(myLogoImage, {
			tl: { col: 0.6, row: 0.4 },
			ext: { width: 50, height: 80 },
		});

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

			worksheet.getColumn(index).width = header[index - 1].length < 8 ? 8 : header[index - 1].lenght;
		});

		// Add Data and Conditional Formatting
		let row = worksheet.addRow(Object.values(data));
		row.alignment = { vertical: "middle", horizontal: "center" };
		// let qty = row.getCell(1);
		let color = "aefaf5b9";
		/*  if (+qty.value < 500) {
       color = 'aefdb772'
     }
 
     qty.fill = {
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: color }
     } */
		row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.getColumn(1).width = 75;
		worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(2).width = 115;
		worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(3).width = 65;
		worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(4).width = 10;
		worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(5).width = 15;
		worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(6).width = 65;
		worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(7).width = 65;
		worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(8).width = 45;
		worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(9).width = 45;
		worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(10).width = 20;
		worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(11).width = 24;
		worksheet.getColumn(11).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(12).width = 13;
		worksheet.getColumn(12).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(13).width = 13;
		worksheet.getColumn(13).alignment = { vertical: "middle", horizontal: "center" };
		/* worksheet.getColumn(9).width = 130;
    worksheet.getColumn(9).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getColumn(10).width = 80;
    worksheet.getColumn(10).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getColumn(11).width = 30;
    worksheet.getColumn(11).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getColumn(12).width = 30;
    worksheet.getColumn(12).alignment = { vertical: 'middle', horizontal: 'right' };
    worksheet.getColumn(13).width = 30;
    worksheet.getColumn(13).alignment = { vertical: 'middle', horizontal: 'right' }; */
		worksheet.addRow([]);

		/* Save Excel File */
		workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
			const blob = new Blob([data], { type: EXCEL_TYPE });
			let now = new Date();
			let timeSpan = this.datePipe.transform(now, "yyyyHHmmss");
			fs.saveAs(blob, excelFileName + "-" + timeSpan + EXCEL_EXTENSION);
		});
	}

	public exportAsExcelFileRetro(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any[], footerData: any, excelFileName: string, sheetName: string) {
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

		worksheet.mergeCells("B2:BY2");
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
		//let subTitleRow = worksheet.addRow(['date: ' + this.datePipe.transform(new Date(), 'medium' ) ] );

		if (reportHeading !== "") {
			worksheet.mergeCells("B3:BY3");
			worksheet.getCell("B3").value = "تاريخ : " + this.datePipe.transform(new Date(), "dd-MM-yyyy");
			worksheet.getCell("B3").alignment = { horizontal: "center" };
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
		worksheet.mergeCells("A1:A4");
		worksheet.addImage(myLogoImage, {
			tl: { col: 0.6, row: 0.4 },
			ext: { width: 50, height: 80 },
		});
		// worksheet.mergeCells('A1:D2');
		worksheet.addRow([]);
		worksheet.addRow([]);
		/* Add header row */

		worksheet.mergeCells("A6:BY6");
		worksheet.getCell("A6").value = "Rétroplanning";
		worksheet.getCell("A6").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("A6").font = { size: 12, bold: true };
		worksheet.getCell("A6").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "B4C6E7" },
		};
		worksheet.getCell("A6").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("A7:I7");
		worksheet.getCell("A7").value = "";
		worksheet.getCell("A7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("A7").font = { size: 12, bold: true };
		worksheet.getCell("A7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "eae6e6" },
		};
		worksheet.getCell("A7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("J7:Q7");
		worksheet.getCell("J7").value = "2023";
		worksheet.getCell("J7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("J7").font = { size: 12, bold: true };
		worksheet.getCell("J7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("J7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("R7:AC7");
		worksheet.getCell("R7").value = "2024";
		worksheet.getCell("R7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("R7").font = { size: 12, bold: true };
		worksheet.getCell("R7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("R7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("AD7:AO7");
		worksheet.getCell("AD7").value = "2025";
		worksheet.getCell("AD7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("AD7").font = { size: 12, bold: true };
		worksheet.getCell("AD7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("AD7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("AP7:BA7");
		worksheet.getCell("AP7").value = "2026";
		worksheet.getCell("AP7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("AP7").font = { size: 12, bold: true };
		worksheet.getCell("AP7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("AP7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("BB7:BM7");
		worksheet.getCell("BB7").value = "2027";
		worksheet.getCell("BB7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("BB7").font = { size: 12, bold: true };
		worksheet.getCell("BB7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("BB7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("BN7:BY7");
		worksheet.getCell("BN7").value = "2028";
		worksheet.getCell("BN7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("BN7").font = { size: 12, bold: true };
		worksheet.getCell("BN7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("BN7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		const headerRow = worksheet.addRow(header);

		// Cell style : Fill and border
		headerRow.eachCell((cell, index) => {
			cell.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "f8cbad" },
			};
			cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
			cell.font = { size: 12, bold: true };

			worksheet.getColumn(index).width = header[index - 1].length < 41 ? 41 : header[index - 1].lenght;
		});

		// Add Data and Conditional Formatting
		let i = 9;
		const startingRows1 = new Map();
		const startingRows2 = new Map();
		const startingRows3 = new Map();
		const startingRows4 = new Map();
		const startingRows5 = new Map();
		const startingRows6 = new Map();
		const Color = require("xlsx").utils.rgb;
		const colors = ["FF3300", "FFC000", "A9D08E", "9999FF", "BF8F00", "FFCCCC", "33CCCC", "B4C6E7", "D9D9D9"];
		data.forEach((d, index) => {
			let year: any = this.datePipe.transform(d.dateDebut, "yyyy");
			let yearFin: any = this.datePipe.transform(d.dateFin, "yyyy");
			let monthDebut: any = this.datePipe.transform(d.dateDebut, "MM");
			let monthFin: any = this.datePipe.transform(d.dateFin, "MM");
			const diffMonths = (yearFin - year) * 12 + parseInt(monthFin) - parseInt(monthDebut) + 1;
			let startColumn = String.fromCharCode(69 + parseInt(monthDebut)); // ASCII code for 'A' is 65
			// Define the range of columns that should be filled based on the difference in months
			let endColumn = String.fromCharCode(startColumn.charCodeAt(0) + diffMonths - 1);
			let columnRange: any = `${startColumn}:${endColumn}`;
			// worksheet.mergeCells(`${startColumn}9:${endColumn}9`)

			let propertyValues1 = [d.axe];
			let mergeKey1 = propertyValues1.join("|");
			let startRow1;
			if (startingRows1.has(mergeKey1)) {
				startRow1 = startingRows1.get(mergeKey1);
			} else {
				startRow1 = i;
				startingRows1.set(mergeKey1, startRow1);
			}

			if (index > 0) {
				let prevData1 = data[index - 1];
				let prevPropertyValues1 = [prevData1.axe];
				let prevMergeKey1 = prevPropertyValues1.join("|");
				let prevStartRow1 = startingRows1.get(prevMergeKey1);

				if (prevMergeKey1 !== mergeKey1 || startRow1 !== prevStartRow1) {
					worksheet.mergeCells(`A${prevStartRow1}:A${i - 1}`);

					const colorIndex = prevStartRow1 % colors.length; // Calculate the index of the color in the array
					const fillColor = colors[colorIndex]; // Get the color value from the array
					colors.splice(colorIndex, 1);
					for (let row = prevStartRow1; row <= i - 1; row++) {
						let cell = worksheet.getCell(`A${row}`);
						cell.fill = {
							type: "pattern",
							pattern: "solid",
							fgColor: { argb: fillColor },
						};
					}
				}
			}

			let propertyValues2 = [d.numero];
			let mergeKey2 = propertyValues2.join("|");
			let startRow2;
			if (startingRows2.has(mergeKey2)) {
				startRow2 = startingRows2.get(mergeKey2);
			} else {
				startRow2 = i;
				startingRows2.set(mergeKey2, startRow2);
			}

			if (index > 0) {
				let prevData2 = data[index - 1];
				let prevPropertyValues2 = [prevData2.numero];
				let prevMergeKey2 = prevPropertyValues2.join("|");
				let prevStartRow2 = startingRows2.get(prevMergeKey2);

				if (prevMergeKey2 !== mergeKey2 || startRow2 !== prevStartRow2) {
					worksheet.mergeCells(`B${prevStartRow2}:B${i - 1}`);
				}
			}

			let propertyValues3 = [d.projet];
			let mergeKey3 = propertyValues3.join("|");
			let startRow3;
			if (startingRows3.has(mergeKey3)) {
				startRow3 = startingRows3.get(mergeKey3);
			} else {
				startRow3 = i;
				startingRows3.set(mergeKey3, startRow3);
			}

			if (index > 0) {
				let prevData3 = data[index - 1];
				let prevPropertyValues3 = [prevData3.projet];
				let prevMergeKey3 = prevPropertyValues3.join("|");
				let prevStartRow3 = startingRows3.get(prevMergeKey3);

				if (prevMergeKey3 !== mergeKey3 || startRow3 !== prevStartRow3) {
					worksheet.mergeCells(`C${prevStartRow3}:C${i - 1}`);
				}
			}

			let propertyValues6 = [d.emplacement];
			let mergeKey6 = propertyValues6.join("|");
			let startRow6;
			if (startingRows6.has(mergeKey6)) {
				startRow6 = startingRows6.get(mergeKey6);
			} else {
				startRow6 = i;
				startingRows6.set(mergeKey6, startRow6);
			}

			if (index > 0) {
				let prevData6 = data[index - 1];
				let prevPropertyValues6 = [prevData6.emplacement];
				let prevMergeKey6 = prevPropertyValues6.join("|");
				let prevStartRow6 = startingRows6.get(prevMergeKey6);

				if (prevMergeKey6 !== mergeKey6 || startRow6 !== prevStartRow6) {
					worksheet.mergeCells(`D${prevStartRow6}:D${i - 1}`);
				}
			}

			let propertyValues4 = [d.consistance];
			let mergeKey4 = propertyValues4.join("|");
			let startRow4;
			if (startingRows4.has(mergeKey4)) {
				startRow4 = startingRows4.get(mergeKey4);
			} else {
				startRow4 = i;
				startingRows4.set(mergeKey4, startRow4);
			}

			if (index > 0) {
				let prevData4 = data[index - 1];
				let prevPropertyValues4 = [prevData4.consistance];
				let prevMergeKey4 = prevPropertyValues4.join("|");
				let prevStartRow4 = startingRows4.get(prevMergeKey4);

				if (prevMergeKey4 !== mergeKey4 || startRow4 !== prevStartRow4) {
					worksheet.mergeCells(`E${prevStartRow4}:E${i - 1}`);
				}
			}

			let propertyValues5 = [d.mod];
			let mergeKey5 = `${propertyValues1}|${propertyValues3}|${propertyValues5}`;
			let startRow5;
			if (startingRows5.has(mergeKey5)) {
				startRow5 = startingRows5.get(mergeKey5);
			} else {
				startRow5 = i;
				startingRows5.set(mergeKey5, startRow5);
			}

			if (index > 0) {
				let prevData5 = data[index - 1];
				let prevPropertyValues5 = [prevData5.mod];
				let prevPropertyValues15 = [prevData5.axe];
				let prevPropertyValues35 = [prevData5.projet];
				let prevMergeKey5 = `${prevPropertyValues15}|${prevPropertyValues35}|${prevPropertyValues5}`;
				let prevStartRow5 = startingRows5.get(prevMergeKey5);

				if (prevMergeKey5 !== mergeKey5 || startRow5 !== prevStartRow5) {
					worksheet.mergeCells(`F${prevStartRow5}:F${i - 1}`);
				}
			}

			let row = worksheet.addRow([propertyValues1[0], propertyValues2[0], propertyValues3[0], propertyValues6[0], propertyValues4[0], propertyValues5[0], d.dateDebut, d.dateFin, d.delai]);
			row.alignment = { vertical: "middle", horizontal: "center" };
			// let qty = row.getCell(1);
			let color = "aefaf5b9";
			/*  if (+qty.value < 500) {
         color = 'aefdb772'
       }
 
       qty.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: color }
       } */
			const lastMergeKey1 = Array.from(startingRows1.keys()).pop();
			const lastStartRow1 = startingRows1.get(lastMergeKey1);
			const colorIndex = lastStartRow1 % colors.length; // Calculate the index of the color in the array
			const fillColor = colors[colorIndex]; // Get the color value from the array

			for (let column = startColumn; column <= endColumn; column = String.fromCharCode(column.charCodeAt(0) + 1)) {
				let cell = worksheet.getCell(`${column}${i}`);
				cell.fill = {
					type: "pattern",
					pattern: "solid",
					fgColor: { argb: fillColor }, // Fill color (red in this example)
				};
			}
			row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
			i = i + 1;

			if (index === data.length - 1) {
				const lastRowData = data[index - 1];
				if (lastRowData.axe === d.axe) {
					for (let column of ["A"]) {
						worksheet.mergeCells(`${column}${i - 2}:${column}${i - 1}`);
						let cell = worksheet.getCell(`${column}${i - 2}`);
						cell.fill = {
							type: "pattern",
							pattern: "solid",
							fgColor: { argb: fillColor },
						};
					}
				}
			}

			if (index === data.length - 1) {
				const lastRowData = data[index - 1];
				if (lastRowData.numero === d.numero) {
					for (let column of ["B"]) {
						worksheet.mergeCells(`${column}${i - 2}:${column}${i - 1}`);
					}
				}
			}

			if (index === data.length - 1) {
				const lastRowData = data[index - 1];
				if (lastRowData.projet === d.projet) {
					for (let column of ["C"]) {
						worksheet.mergeCells(`${column}${i - 2}:${column}${i - 1}`);
					}
				}
			}

			if (index === data.length - 1) {
				const lastRowData = data[index - 1];
				if (lastRowData.emplacement === d.emplacement) {
					for (let column of ["D"]) {
						worksheet.mergeCells(`${column}${i - 2}:${column}${i - 1}`);
					}
				}
			}

			if (index === data.length - 1) {
				const lastRowData = data[index - 1];
				if (lastRowData.consistance === d.consistance) {
					for (let column of ["E"]) {
						worksheet.mergeCells(`${column}${i - 2}:${column}${i - 1}`);
					}
				}
			}

			if (index === data.length - 1) {
				const lastRowData = data[index - 1];
				if (lastRowData.axe === d.axe && lastRowData.projet === d.projet && lastRowData.mod === d.mod) {
					for (let column of ["F"]) {
						worksheet.mergeCells(`${column}${i - 2}:${column}${i - 1}`);
					}
				}
			}

			if (startingRows1.size > 0) {
				const lastMergeKey1 = Array.from(startingRows1.keys()).pop();
				const lastStartRow1 = startingRows1.get(lastMergeKey1);

				// Set the fill color for the last merged cells
				const colorIndex = lastStartRow1 % colors.length; // Calculate the index of the color in the array
				const fillColor = colors[colorIndex]; // Get the color value from the array

				for (let row = lastStartRow1; row < i; row++) {
					let cell = worksheet.getCell(`A${row}`);
					cell.fill = {
						type: "pattern",
						pattern: "solid",
						fgColor: { argb: fillColor },
					};
				}
			}
		});
		worksheet.getColumn(1).width = 20;
		worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(2).width = 12;
		worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(3).width = 50;
		worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(4).width = 60;
		worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(5).width = 50;
		worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(6).width = 40;
		worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(7).width = 15;
		worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(8).width = 15;
		worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(9).width = 10;
		worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center" };

		worksheet.getColumn(10).width = 6.3;
		worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(11).width = 6.3;
		worksheet.getColumn(11).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(12).width = 6.3;
		worksheet.getColumn(12).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(13).width = 6.3;
		worksheet.getColumn(13).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(14).width = 6.3;
		worksheet.getColumn(14).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(15).width = 6.3;
		worksheet.getColumn(15).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(16).width = 6.3;
		worksheet.getColumn(16).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(17).width = 6.3;
		worksheet.getColumn(17).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(18).width = 6.3;
		worksheet.getColumn(18).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(19).width = 6.3;
		worksheet.getColumn(19).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(20).width = 6.3;
		worksheet.getColumn(20).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(21).width = 6.3;
		worksheet.getColumn(21).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(22).width = 6.3;
		worksheet.getColumn(22).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(23).width = 6.3;
		worksheet.getColumn(23).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(24).width = 6.3;
		worksheet.getColumn(24).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(25).width = 6.3;
		worksheet.getColumn(25).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(26).width = 6.3;
		worksheet.getColumn(26).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(27).width = 6.3;
		worksheet.getColumn(27).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(28).width = 6.3;
		worksheet.getColumn(28).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(29).width = 6.3;
		worksheet.getColumn(29).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(30).width = 6.3;
		worksheet.getColumn(30).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(31).width = 6.3;
		worksheet.getColumn(31).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(32).width = 6.3;
		worksheet.getColumn(32).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(33).width = 6.3;
		worksheet.getColumn(33).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(34).width = 6.3;
		worksheet.getColumn(34).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(35).width = 6.3;
		worksheet.getColumn(35).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(36).width = 6.3;
		worksheet.getColumn(36).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(37).width = 6.3;
		worksheet.getColumn(37).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(38).width = 6.3;
		worksheet.getColumn(38).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(39).width = 6.3;
		worksheet.getColumn(39).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(40).width = 6.3;
		worksheet.getColumn(40).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(41).width = 6.3;
		worksheet.getColumn(41).alignment = { vertical: "middle", horizontal: "center" };

		worksheet.getColumn(42).width = 6.3;
		worksheet.getColumn(42).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(43).width = 6.3;
		worksheet.getColumn(43).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(44).width = 6.3;
		worksheet.getColumn(44).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(45).width = 6.3;
		worksheet.getColumn(45).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(46).width = 6.3;
		worksheet.getColumn(46).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(47).width = 6.3;
		worksheet.getColumn(47).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(48).width = 6.3;
		worksheet.getColumn(48).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(49).width = 6.3;
		worksheet.getColumn(49).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(50).width = 6.3;
		worksheet.getColumn(50).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(51).width = 6.3;
		worksheet.getColumn(51).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(52).width = 6.3;
		worksheet.getColumn(52).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(53).width = 6.3;
		worksheet.getColumn(53).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(54).width = 6.3;
		worksheet.getColumn(54).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(55).width = 6.3;
		worksheet.getColumn(55).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(56).width = 6.3;
		worksheet.getColumn(56).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(57).width = 6.3;
		worksheet.getColumn(57).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(58).width = 6.3;
		worksheet.getColumn(58).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(59).width = 6.3;
		worksheet.getColumn(59).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(60).width = 6.3;
		worksheet.getColumn(60).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(61).width = 6.3;
		worksheet.getColumn(61).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(62).width = 6.3;
		worksheet.getColumn(62).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(63).width = 6.3;
		worksheet.getColumn(63).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(64).width = 6.3;
		worksheet.getColumn(64).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(65).width = 6.3;
		worksheet.getColumn(65).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(66).width = 6.3;
		worksheet.getColumn(66).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(67).width = 6.3;
		worksheet.getColumn(67).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(68).width = 6.3;
		worksheet.getColumn(68).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(69).width = 6.3;
		worksheet.getColumn(69).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(70).width = 6.3;
		worksheet.getColumn(70).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(71).width = 6.3;
		worksheet.getColumn(71).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(72).width = 6.3;
		worksheet.getColumn(72).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(73).width = 6.3;
		worksheet.getColumn(73).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(74).width = 6.3;
		worksheet.getColumn(74).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(75).width = 6.3;
		worksheet.getColumn(75).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(76).width = 6.3;
		worksheet.getColumn(76).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(77).width = 6.3;
		worksheet.getColumn(77).alignment = { vertical: "middle", horizontal: "center" };
		// worksheet.getColumn(2).width = 30;
		// worksheet.getColumn(10).width = 20;
		// worksheet.getColumn(2).alignment = { vertical: 'middle', horizontal: 'right', wrapText: true };
		// worksheet.getColumn(3).alignment = { vertical: 'middle', horizontal: 'right' };
		worksheet.addRow([]);

		//Footer Row
		// let footerRow = worksheet.addRow(['هذا الجدول تم إنشاءه من طرف نظام المعلومات']);

		/* worksheet.mergeCells('D450:E450');
    worksheet.getCell('E450').value = 'Total des coût : ' + countCout;
    worksheet.getCell('E450').alignment = { horizontal: 'center' };
    worksheet.getCell('E450').font = { size: 12, bold: true };
    worksheet.getCell('E450').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'aedde9el' },
    }; */
		/* footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'aed4d2c9' },
    }; */

		/* Save Excel File */
		workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
			const blob = new Blob([data], { type: EXCEL_TYPE });
			let now = new Date();
			let timeSpan = this.datePipe.transform(now, "yyyyHHmmss");
			fs.saveAs(blob, excelFileName + "-" + timeSpan + EXCEL_EXTENSION);
		});
	}

	public exportAsExcelFileRetro3(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any[], footerData: any, excelFileName: string, sheetName: string) {
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
		// /* file orientation */
		// worksheet.views = [{ rightToLeft: true }];
		/* Add header row */
		worksheet.addRow([]);
		worksheet.mergeCells("A1:A5");
		// worksheet.mergeCells("B1:B5");

		// worksheet.getColumn(1).width = 40;
		// worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

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

		worksheet.mergeCells("A6:CH6");
		worksheet.getCell("A6").value = "Rétroplanning";
		worksheet.getCell("A6").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("A6").font = { size: 12, bold: true };
		worksheet.getCell("A6").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "B4C6E7" },
		};
		worksheet.mergeCells("A7:N7");
		worksheet.getCell("A7").value = "";
		worksheet.getCell("A7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("A7").font = { size: 12, bold: true };
		worksheet.getCell("A7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "eae6e6" },
		};
		worksheet.getCell("A7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.mergeCells("O7:Z7");
		worksheet.getCell("O7").value = "2023";
		worksheet.getCell("O7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("O7").font = { size: 12, bold: true };
		worksheet.getCell("O7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("O7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("AA7:AL7");
		worksheet.getCell("AA7").value = "2024";
		worksheet.getCell("AA7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("AA7").font = { size: 12, bold: true };
		worksheet.getCell("AA7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("AA7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("AM7:AX7");
		worksheet.getCell("AM7").value = "2025";
		worksheet.getCell("AM7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("AM7").font = { size: 12, bold: true };
		worksheet.getCell("AM7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("AM7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("AY7:BJ7");
		worksheet.getCell("AY7").value = "2026";
		worksheet.getCell("AY7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("AY7").font = { size: 12, bold: true };
		worksheet.getCell("AY7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("AY7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("BK7:BV7");
		worksheet.getCell("BK7").value = "2027";
		worksheet.getCell("BK7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("BK7").font = { size: 12, bold: true };
		worksheet.getCell("BK7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("BK7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("BW7:CH7");
		worksheet.getCell("BW7").value = "2028";
		worksheet.getCell("BW7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("BW7").font = { size: 12, bold: true };
		worksheet.getCell("BW7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("BW7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

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
		let i = 9;
		const startingRows1 = new Map();
		const startingRows6 = new Map();

		const colors = ["FF3300", "FFC000", "A9D08E", "9999FF", "BF8F00", "FFCCCC", "33CCCC", "B4C6E7", "D9D9D9"];
		// Add Data and Conditional Formatting
		//   data.forEach((d, index) => {
		//     let propertyValues1 = [d.nature, d.theme, d.sousTheme, d.codeProjet, d.nameProjet, d.projet, d.numero];
		//     let mergeKey1 = propertyValues1.join('|');
		//     let startRow1;

		//     if (startingRows1.has(mergeKey1)) {
		//         startRow1 = startingRows1.get(mergeKey1);
		//     } else {
		//         startRow1 = i;
		//         startingRows1.set(mergeKey1, startRow1);
		//     }

		//     if (index > 0) {
		//         let prevData1 = data[index - 1];
		//         let prevPropertyValues1 = [prevData1.nature, prevData1.theme, prevData1.sousTheme, prevData1.codeProjet, prevData1.nameProjet, prevData1.projet, prevData1.numero];
		//         let prevMergeKey1 = prevPropertyValues1.join('|');
		//         let prevStartRow1 = startingRows1.get(prevMergeKey1);

		//         if (prevMergeKey1 !== mergeKey1 || startRow1 !== prevStartRow1) {
		//             if (prevStartRow1 < i - 1) {
		//                 for (let column = 1; column <= 6; column++) {
		//                     worksheet.mergeCells(`${String.fromCharCode(64 + column)}${prevStartRow1}:${String.fromCharCode(64 + column)}${i - 1}`);
		//                 }
		//                 worksheet.mergeCells(`F${prevStartRow1}:F${i - 1}`); // Assuming F is the column for "numero"
		//             }

		//             const colorIndex = prevStartRow1 % colors.length;
		//             const fillColor = colors[colorIndex];

		//             for (let row = prevStartRow1; row <= i - 1; row++) {
		//                 for (let column = 1; column <= 7; column++) {
		//                     let cell = worksheet.getCell(`${String.fromCharCode(64 + column)}${row}`);
		//                     cell.fill = {
		//                         type: 'pattern',
		//                         pattern: 'solid',
		//                         fgColor: { argb: fillColor },
		//                     };
		//                 }
		//             }
		//         }
		//     }

		//     let row = worksheet.addRow(propertyValues1);
		//     row.alignment = { vertical: 'middle', horizontal: 'center' };

		//     const lastMergeKey1 = Array.from(startingRows1.keys()).pop();
		//     const lastStartRow1 = startingRows1.get(lastMergeKey1);
		//     const colorIndex = lastStartRow1 % colors.length;
		//     const fillColor = colors[colorIndex];

		//     for (let column = 1; column <= 7; column++) {
		//         row.getCell(column).fill = {
		//             type: 'pattern',
		//             pattern: 'solid',
		//             fgColor: { argb: fillColor },
		//         };
		//     }

		//     row.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
		//     i = i + 1;

		//     // Additional logic for handling the last row and merging cells if needed
		// });

		const mergedCellsByProjetNumero = new Map();

		data.forEach((d, index) => {
			const allNumbers = d.numero;

			allNumbers.forEach((numero, numIndex) => {
				let propertyValues1 = [d.nature, d.theme, d.sousTheme, d.codeProjet, d.nameProjet, d.projet, numero];
				let mergeKey1 = propertyValues1.slice(0, -1).join("|"); // Exclude the last value (numero) for merging
				let startRow1;

				if (startingRows1.has(mergeKey1)) {
					startRow1 = startingRows1.get(mergeKey1);
				} else {
					startRow1 = i;
					startingRows1.set(mergeKey1, startRow1);
				}

				if (index > 0) {
					let prevData1 = data[index - 1];
					let prevPropertyValues1 = [prevData1.nature, prevData1.theme, prevData1.sousTheme, prevData1.codeProjet, prevData1.nameProjet, prevData1.projet, prevData1.numero];
					let prevMergeKey1 = prevPropertyValues1.slice(0, -1).join("|");
					let prevStartRow1 = startingRows1.get(prevMergeKey1);

					if (prevMergeKey1 !== mergeKey1 || startRow1 !== prevStartRow1) {
						if (prevStartRow1 < i - 1) {
							for (let column = 1; column <= 6; column++) {
								worksheet.mergeCells(`${String.fromCharCode(64 + column)}${prevStartRow1}:${String.fromCharCode(64 + column)}${i - 1}`);
							}
							worksheet.mergeCells(`G${prevStartRow1}:G${i - 1}`); // Assuming G is the column for "numero"
						}
					}
				}

				let row = worksheet.addRow(propertyValues1);
				row.alignment = { vertical: "middle", horizontal: "center" };

				const lastMergeKey1 = Array.from(startingRows1.keys()).pop();
				const lastStartRow1 = startingRows1.get(lastMergeKey1);
				const colorIndex = lastStartRow1 % colors.length;
				const fillColor = colors[colorIndex];

				for (let column = 1; column <= 7; column++) {
					row.getCell(column).fill = {
						type: "pattern",
						pattern: "solid",
						fgColor: { argb: fillColor },
					};
				}

				row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
				i = i + 1;

				// // Track merged cells for each unique combination of projet and numero
				// const projetNumeroKey = `${d.projet || ''}_${numero || ''}`;
				// if (!mergedCellsByProjetNumero.has(projetNumeroKey)) {
				//     mergedCellsByProjetNumero.set(projetNumeroKey, new Set());
				// }
				// const mergedCellsForProjetNumero = mergedCellsByProjetNumero.get(projetNumeroKey);

				// for (let column = 1; column <= 7; column++) {
				//     mergedCellsForProjetNumero.add(row.number);
				// }

				// Track merged cells for each unique combination of projet and numero
				const projetNumeroKey = `${d.projet || ""}_${numero || ""}`;
				if (!mergedCellsByProjetNumero.has(projetNumeroKey)) {
					mergedCellsByProjetNumero.set(projetNumeroKey, new Set());
				}
				const mergedCellsForProjetNumero = mergedCellsByProjetNumero.get(projetNumeroKey);

				for (let column = 1; column <= reportSubHeading.length; column++) {
					mergedCellsForProjetNumero.add(row.number);
				}
			});
		});

		// // Apply fill color to merged cells for each unique combination of projet and numero
		// mergedCellsByProjetNumero.forEach((mergedCellsForProjetNumero) => {
		//     const colorIndex = Array.from(mergedCellsForProjetNumero)[0] as number % colors.length;
		//     const fillColor = colors[colorIndex];

		//     for (let row of mergedCellsForProjetNumero) {
		//         for (let column = 1; column <= 7; column++) {
		//             let cell = worksheet.getCell(`${String.fromCharCode(64 + column)}${row}`);
		//             cell.fill = {
		//                 type: 'pattern',
		//                 pattern: 'solid',
		//                 fgColor: { argb: fillColor },
		//             };
		//         }
		//     }
		// });

		// Apply fill color to merged cells for each unique combination of projet and numero
		mergedCellsByProjetNumero.forEach((mergedCellsForProjetNumero) => {
			const colorIndex = (Array.from(mergedCellsForProjetNumero)[0] as number) % colors.length;

			for (let row of mergedCellsForProjetNumero) {
				for (let column = 1; column <= reportSubHeading.length; column++) {
					let cell = worksheet.getCell(`${String.fromCharCode(64 + column)}${row}`);
					cell.fill = {
						type: "pattern",
						pattern: "solid",
						fgColor: { argb: colors[colorIndex] },
					};
				}
			}
		});

		worksheet.getColumn(1).width = 40;
		worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(2).width = 40;
		worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(3).width = 25;
		worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(4).width = 10;
		worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(5).width = 60;
		worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(6).width = 10;
		worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		// worksheet.getColumn(7).width = 40;
		// worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		// worksheet.getColumn(8).width = 30;
		// worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		// worksheet.getColumn(9).width = 30;
		// worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		// worksheet.getColumn(10).width = 30;
		// worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		// worksheet.getColumn(11).width = 20;
		// worksheet.getColumn(11).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		// worksheet.getColumn(12).width = 20;
		// worksheet.getColumn(12).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		// worksheet.getColumn(13).width = 20;
		// worksheet.getColumn(13).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		// worksheet.getColumn(14).width = 20;
		// worksheet.getColumn(14).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		// worksheet.getColumn(15).width = 6.30;
		// worksheet.getColumn(15).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		// worksheet.getColumn(16).width = 6.30;
		// worksheet.getColumn(16).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(17).width = 6.30;
		// worksheet.getColumn(17).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(18).width = 6.30;
		// worksheet.getColumn(18).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(19).width = 6.30;
		// worksheet.getColumn(19).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(20).width = 6.30;
		// worksheet.getColumn(20).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(21).width = 6.30;
		// worksheet.getColumn(21).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(22).width = 6.30;
		// worksheet.getColumn(22).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(23).width = 6.30;
		// worksheet.getColumn(23).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(24).width = 6.30;
		// worksheet.getColumn(24).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(25).width = 6.30;
		// worksheet.getColumn(25).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(26).width = 6.30;
		// worksheet.getColumn(26).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(27).width = 6.30;
		// worksheet.getColumn(27).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(28).width = 6.30;
		// worksheet.getColumn(28).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(29).width = 6.30;
		// worksheet.getColumn(29).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(30).width = 6.30;
		// worksheet.getColumn(30).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(31).width = 6.30;
		// worksheet.getColumn(31).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(32).width = 6.30;
		// worksheet.getColumn(32).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(33).width = 6.30;
		// worksheet.getColumn(33).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(34).width = 6.30;
		// worksheet.getColumn(34).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(35).width = 6.30;
		// worksheet.getColumn(35).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(36).width = 6.30;
		// worksheet.getColumn(36).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(37).width = 6.30;
		// worksheet.getColumn(37).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(38).width = 6.30;
		// worksheet.getColumn(38).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(39).width = 6.30;
		// worksheet.getColumn(39).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(40).width = 6.30;
		// worksheet.getColumn(40).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(41).width = 6.30;
		// worksheet.getColumn(41).alignment = { vertical: 'middle', horizontal: 'center' };

		// worksheet.getColumn(42).width = 6.30;
		// worksheet.getColumn(42).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(43).width = 6.30;
		// worksheet.getColumn(43).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(44).width = 6.30;
		// worksheet.getColumn(44).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(45).width = 6.30;
		// worksheet.getColumn(45).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(46).width = 6.30;
		// worksheet.getColumn(46).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(47).width = 6.30;
		// worksheet.getColumn(47).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(48).width = 6.30;
		// worksheet.getColumn(48).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(49).width = 6.30;
		// worksheet.getColumn(49).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(50).width = 6.30;
		// worksheet.getColumn(50).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(51).width = 6.30;
		// worksheet.getColumn(51).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(52).width = 6.30;
		// worksheet.getColumn(52).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(53).width = 6.30;
		// worksheet.getColumn(53).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(54).width = 6.30;
		// worksheet.getColumn(54).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(55).width = 6.30;
		// worksheet.getColumn(55).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(56).width = 6.30;
		// worksheet.getColumn(56).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(57).width = 6.30;
		// worksheet.getColumn(57).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(58).width = 6.30;
		// worksheet.getColumn(58).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(59).width = 6.30;
		// worksheet.getColumn(59).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(60).width = 6.30;
		// worksheet.getColumn(60).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(61).width = 6.30;
		// worksheet.getColumn(61).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(62).width = 6.30;
		// worksheet.getColumn(62).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(63).width = 6.30;
		// worksheet.getColumn(63).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(64).width = 6.30;
		// worksheet.getColumn(64).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(65).width = 6.30;
		// worksheet.getColumn(65).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(66).width = 6.30;
		// worksheet.getColumn(66).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(67).width = 6.30;
		// worksheet.getColumn(67).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(68).width = 6.30;
		// worksheet.getColumn(68).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(69).width = 6.30;
		// worksheet.getColumn(69).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(70).width = 6.30;
		// worksheet.getColumn(70).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(71).width = 6.30;
		// worksheet.getColumn(71).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(72).width = 6.30;
		// worksheet.getColumn(72).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(73).width = 6.30;
		// worksheet.getColumn(73).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(74).width = 6.30;
		// worksheet.getColumn(74).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(75).width = 6.30;
		// worksheet.getColumn(75).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(76).width = 6.30;
		// worksheet.getColumn(76).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(77).width = 6.30;
		// worksheet.getColumn(77).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(78).width = 6.30;
		// worksheet.getColumn(78).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(79).width = 6.30;
		// worksheet.getColumn(79).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(80).width = 6.30;
		// worksheet.getColumn(80).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(81).width = 6.30;
		// worksheet.getColumn(81).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(82).width = 6.30;
		// worksheet.getColumn(82).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(83).width = 6.30;
		// worksheet.getColumn(83).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(84).width = 6.30;
		// worksheet.getColumn(84).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(85).width = 6.30;
		// worksheet.getColumn(85).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(86).width = 6.30;
		// worksheet.getColumn(86).alignment = { vertical: 'middle', horizontal: 'center' };
		// worksheet.getColumn(87).width = 6.30;
		// worksheet.getColumn(87).alignment = { vertical: 'middle', horizontal: 'center' };
		worksheet.addRow([]);

		//Footer Row
		// let footerRow = worksheet.addRow(["هذا الجدول تم إنشاءه من طرف نظام المعلومات"]);
		// footerRow.getCell(1).fill = {
		//   type: "pattern",
		//   pattern: "solid",
		//   fgColor: { argb: "aed4d2c9" },
		// };
		// footerRow.getCell(1).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		// footerRow.getCell(1).alignment = { horizontal: "center" };
		// //Merge Cells
		// worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`);

		/* Save Excel File */
		workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
			const blob = new Blob([data], { type: EXCEL_TYPE });
			let now = new Date();
			let timeSpan = this.datePipe.transform(now, "ddMMyyyyHHmmss");
			fs.saveAs(blob, excelFileName + "-" + timeSpan + EXCEL_EXTENSION);
		});
	}
	public exportAsExcelFileRetro4(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any[], footerData: any, excelFileName: string, sheetName: string) {
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

		/* Add header row */
		// worksheet.addRow([]);
		worksheet.mergeCells("A1:A5");

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
		// worksheet.addRow([]);
		// /* ==================================================================================== */
		// /* ==================================================================================== */

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
			// worksheet.addRow([]);
		}

		worksheet.mergeCells("A6:CH6");
		worksheet.getCell("A6").value = "Rétroplanning";
		worksheet.getCell("A6").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("A6").font = { size: 12, bold: true };
		worksheet.getCell("A6").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "B4C6E7" },
		};
		worksheet.mergeCells("A7:N7");
		worksheet.getCell("A7").value = "";
		worksheet.getCell("A7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("A7").font = { size: 12, bold: true };
		worksheet.getCell("A7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "eae6e6" },
		};
		worksheet.getCell("A7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.mergeCells("O7:Z7");
		worksheet.getCell("O7").value = "2023";
		worksheet.getCell("O7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("O7").font = { size: 12, bold: true };
		worksheet.getCell("O7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("O7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("AA7:AL7");
		worksheet.getCell("AA7").value = "2024";
		worksheet.getCell("AA7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("AA7").font = { size: 12, bold: true };
		worksheet.getCell("AA7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("AA7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("AM7:AX7");
		worksheet.getCell("AM7").value = "2025";
		worksheet.getCell("AM7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("AM7").font = { size: 12, bold: true };
		worksheet.getCell("AM7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("AM7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("AY7:BJ7");
		worksheet.getCell("AY7").value = "2026";
		worksheet.getCell("AY7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("AY7").font = { size: 12, bold: true };
		worksheet.getCell("AY7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("AY7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("BK7:BV7");
		worksheet.getCell("BK7").value = "2027";
		worksheet.getCell("BK7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("BK7").font = { size: 12, bold: true };
		worksheet.getCell("BK7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("BK7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("BW7:CH7");
		worksheet.getCell("BW7").value = "2028";
		worksheet.getCell("BW7").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("BW7").font = { size: 12, bold: true };
		worksheet.getCell("BW7").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aeb6e8c5" },
		};
		worksheet.getCell("BW7").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

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
		let i = 9;
		const startingRows1 = new Map();
		const startingRows2 = new Map();

		const colors = ["FF3300", "FFC000", "A9D08E", "9999FF", "BF8F00", "FFCCCC", "33CCCC", "B4C6E7", "D9D9D9"];
		// // Add Data and Conditional Formatting
    data.forEach((d, index) => {
      // Check if 'numero', 'object', and 'maitreOuvrageDelegue' are arrays
      if (
          Array.isArray(d.numero) &&
          Array.isArray(d.object) &&
          Array.isArray(d.maitreOuvrageDelegue) &&
     
          d.numero.length === d.object.length &&
         
          d.numero.length === d.maitreOuvrageDelegue.length
      ) {
          // Iterate over pairs of 'numero', 'object', and 'maitreOuvrageDelegue'
          for (let i = 0; i < d.numero.length; i++) {
			let conventions = this.getConventionsAsString(d.convention);

              let propertyValues1 = [
                  d.nature, d.theme, d.sousTheme, d.codeProjet, d.nameProjet,
                  d.numero[i],  // Use 'numero' element
                  d.object[i],  // Use 'object' element
                  d.maitreOuvrageDelegue[i],  // Use 'maitreOuvrageDelegue' element
				  conventions, d.AnnéeDébut, d.Avancement, d.cout, d.DateDebut, d.DateFin
              ];
  
              // Rest of your existing logic for merging and formatting
              // ...
  
              // Add the row to the worksheet
              let row = worksheet.addRow(propertyValues1);
              row.alignment = { vertical: 'middle', horizontal: 'center' };
  
              // Other formatting as needed
              row.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
          }
      } else {
		let conventions = this.getConventionsAsString(d.convention);

          // Your existing code for a single row
          let propertyValues1 = [d.nature, d.theme, d.sousTheme, d.codeProjet, d.nameProjet, d.numero, d.object, d.maitreOuvrageDelegue, conventions, d.AnnéeDébut, d.Avancement, d.cout, d.DateDebut, d.DateFin];
  
          // Your existing logic for merging and formatting
          // ...
  
          // Add the row to the worksheet
          let row = worksheet.addRow(propertyValues1);
          row.alignment = { vertical: 'middle', horizontal: 'center' };
  
          // Other formatting as needed
          row.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
      }
  });
  
  
  
  
  
  
  
  
  

// 		data.forEach((d, index) => {
// 			let propertyValues1 = [d.nature];
// 			let mergeKey1 = propertyValues1.join("|");
// 			let startRow1;
// 			if (startingRows1.has(mergeKey1)) {
// 				startRow1 = startingRows1.get(mergeKey1);
// 			} else {
// 				startRow1 = i;
// 				startingRows1.set(mergeKey1, startRow1);
// 			}

// 			// if (index > 0) {
// 			//   let prevData1 = data[index - 1];
// 			//   let prevPropertyValues1 = [prevData1.nature];
// 			//   let prevMergeKey1 = prevPropertyValues1.join('|');
// 			//   let prevStartRow1 = startingRows1.get(prevMergeKey1);

// 			//   if (prevMergeKey1 !== mergeKey1 || startRow1 !== prevStartRow1) {
// 			//     console.log('mergeKey11:', mergeKey1);
// 			//     console.log('prevMergeKey11:', prevMergeKey1);
// 			//     console.log('startRow11:', startRow1);
// 			//     console.log('prevStartRow11:', prevStartRow1);
// 			//     console.log('iA:', i);
// 			//     console.log('index:', index);
// 			//     worksheet.mergeCells(`A${prevStartRow1}:A${i - 1}`);

// 			//     const colorIndex = prevStartRow1 % colors.length; // Calculate the index of the color in the array
// 			//     const fillColor = colors[colorIndex]; // Get the color value from the array
// 			//     colors.splice(colorIndex, 1);
// 			//     for (let row = prevStartRow1; row <= i - 1; row++) {
// 			//       let cell = worksheet.getCell(`A${row}`);
// 			//       cell.fill = {
// 			//         type: 'pattern',
// 			//         pattern: 'solid',
// 			//         fgColor: { argb: fillColor },
// 			//       };
// 			//     }
// 			//   }
// 			//   console.log('mergeKey1:', mergeKey1);
// 			//   console.log('prevMergeKey1:', prevMergeKey1);
// 			//   console.log('startRow1:', startRow1);
// 			//   console.log('prevStartRow1:', prevStartRow1);
// 			// }

// 			let propertyValues2 = [d.theme];
// 			let mergeKey2 = propertyValues2.join("|");
// 			let startRow2;

// 			if (startingRows2.has(mergeKey2)) {
// 				startRow2 = startingRows2.get(mergeKey2);
// 			} else {
// 				startRow2 = i;
// 				startingRows2.set(mergeKey2, startRow2);
// 			}

// 			//       if (index > 0) {
// 			//           let prevData2 = data[index - 1];
// 			//           let prevPropertyValues2 = [prevData2.theme];
// 			//           let prevMergeKey2 = prevPropertyValues2.join('|');
// 			//           let prevStartRow2 = startingRows2.get(prevMergeKey2);

// 			//           if (prevMergeKey2 !== mergeKey2 || startRow2 !== prevStartRow2) {
// 			//             console.log('mergeKey21:', mergeKey2);
// 			//             console.log('prevMergeKey21:', prevMergeKey2);
// 			//             console.log('startRow21:', startRow2);
// 			//             console.log('prevStartRow21:', prevStartRow2);
// 			//             console.log('iB:', i);
// 			//             console.log('index:', index);
// 			//               // Check if cells are not already merged before attempting to merge
// 			//               if (!worksheet.getCell(`B${prevStartRow2}`).isMerged) {
// 			//                   worksheet.mergeCells(`B${prevStartRow2}:B${i - 1}`);
// 			//                   const colorIndex = prevStartRow2 % colors.length;
// 			//                   const fillColor = colors[colorIndex];
// 			//                   colors.splice(colorIndex, 1);

// 			//                   for (let row = prevStartRow2; row <= i - 1; row++) {
// 			//                       let cell = worksheet.getCell(`B${row}`);
// 			//                       cell.fill = {
// 			//                           type: 'pattern',
// 			//                           pattern: 'solid',
// 			//                           fgColor: { argb: fillColor },
// 			//                       };
// 			//                   }
// 			//               }

// 			//           }
// 			//           console.log('mergeKey2:', mergeKey2);
// 			// console.log('prevMergeKey2:', prevMergeKey2);
// 			// console.log('startRow2:', startRow2);
// 			// console.log('prevStartRow2:', prevStartRow2);
// 			//       }
//       let mergedCellsA = [];
//       let mergedCellsB = [];
// if (index > 0) {
//   let prevData1 = data[index - 1];
//   let prevPropertyValues1 = [prevData1.nature];
//   let prevMergeKey1 = prevPropertyValues1.join("|");
//   let prevStartRow1 = startingRows1.get(prevMergeKey1);
//   let prevData2 = data[index - 1];
//   let prevPropertyValues2 = [prevData2.theme];
//   let prevMergeKey2 = prevPropertyValues2.join("|");
//   let prevStartRow2 = startingRows2.get(prevMergeKey2);
//   const colorIndex2 = prevStartRow2 % colors.length;
//   const fillColor2 = colors[colorIndex2];
//   colors.splice(colorIndex2, 1);
//   const colorIndex1 = prevStartRow1 % colors.length;
//   const fillColor1 = colors[colorIndex1];
//   colors.splice(colorIndex1, 1);

//   if (prevMergeKey1 !== mergeKey1 || startRow1 !== prevStartRow1) {
//       console.log("Merging cells for A:", prevStartRow1, "to", i - 1);
//       this.mergeCellsAndApplyColor(worksheet, prevStartRow1, i - 1, "A", fillColor1, mergedCellsA);
//   }

//   if (prevMergeKey2 !== mergeKey2 || startRow2 !== prevStartRow2) {
//       console.log("Merging cells for B:", prevStartRow2, "to", i - 1);
//       this.mergeCellsAndApplyColor(worksheet, prevStartRow2, i - 1, "B", fillColor2, mergedCellsB);
//   }
// }

// 			let row = worksheet.addRow([propertyValues1[0], propertyValues2[0]]);
// 			row.alignment = { vertical: "middle", horizontal: "center" };
// 			// let qty = row.getCell(1);
// 			let color = "aefaf5b9";
// 			/*  if (+qty.value < 500) {
//          color = 'aefdb772'
//        }
 
//        qty.fill = {
//          type: 'pattern',
//          pattern: 'solid',
//          fgColor: { argb: color }
//        } */
// 			const lastMergeKey1 = Array.from(startingRows1.keys()).pop();
// 			const lastStartRow1 = startingRows1.get(lastMergeKey1);
// 			const colorIndex = lastStartRow1 % colors.length; // Calculate the index of the color in the array
// 			const fillColor = colors[colorIndex]; // Get the color value from the array

// 			row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
// 			i = i + 1;

// 			if (index === data.length - 1) {
// 				const lastRowData = data[index - 1];
// 				if (lastRowData.nature === d.nature) {
// 					for (let column of ["A"]) {
// 						worksheet.mergeCells(`${column}${i - 2}:${column}${i - 1}`);
// 						let cell = worksheet.getCell(`${column}${i - 2}`);
// 						cell.fill = {
// 							type: "pattern",
// 							pattern: "solid",
// 							fgColor: { argb: fillColor },
// 						};
// 					}
// 				}
// 			}
//       const lastMergeKey2 = Array.from(startingRows2.keys()).pop();
// 			const lastStartRow2 = startingRows2.get(lastMergeKey2);
// 			const colorIndex2 = lastStartRow2 % colors.length; // Calculate the index of the color in the array
// 			const fillColor2 = colors[colorIndex2]; // Get the color value from the array
// 			if (index === data.length - 1) {
// 				const lastRowData2 = data[index - 1];
// 				if (lastRowData2.theme === d.theme) {
// 					for (let column of ["B"]) {
// 						worksheet.mergeCells(`${column}${i - 2}:${column}${i - 1}`);
// 						let cell = worksheet.getCell(`${column}${i - 2}`);
// 						cell.fill = {
// 							type: "pattern",
// 							pattern: "solid",
// 							fgColor: { argb: fillColor2 },
// 						};
// 					}
// 				}
// 			}
// 		});

		worksheet.getColumn(1).width = 40;
		worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(2).width = 40;
		worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

    worksheet.getColumn(3).width = 40;
		worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

    worksheet.getColumn(4).width = 40;
		worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

    worksheet.getColumn(5).width = 50;
		worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

    worksheet.getColumn(6).width = 30;
		worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

    worksheet.getColumn(7).width = 70;
		worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		// worksheet.addRow([]);

		workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
			const blob = new Blob([data], { type: EXCEL_TYPE });
			let now = new Date();
			let timeSpan = this.datePipe.transform(now, "ddMMyyyyHHmmss");
			fs.saveAs(blob, excelFileName + "-" + timeSpan + EXCEL_EXTENSION);
		});
	}
// Define a helper function to merge cells and apply color
mergeCellsAndApplyColor(worksheet, startRow, endRow, column, fillColor, mergedCells) {
  for (let row = startRow; row <= endRow; row++) {
      let cell = worksheet.getCell(`${column}${row}`);
      // Check if the cell address is not already in mergedCells array
      
      if (!mergedCells.includes(`${column}${row}`)) {
          worksheet.mergeCells(`${column}${startRow}:${column}${endRow}`);
          cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: fillColor },
          };
          // Add the cell address to the mergedCells array
          mergedCells.push(`${column}${startRow}`);
      }
  }
}
getConventionsAsString(conventions) {
    if (conventions && conventions.length > 0) {
        return conventions.map(convention => convention.object).join(', ');
    }
    return '';
}
}

