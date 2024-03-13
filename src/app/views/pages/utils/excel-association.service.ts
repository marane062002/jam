import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import * as fs from "file-saver";
import { Workbook } from "exceljs";
import * as logo from "./logo.js";
import { ConventionMarcheService } from "../shared/conventionService.js";
import { TranslateService } from "@ngx-translate/core";

const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
	providedIn: "root",
})
export class ExcelAssociationService {
	constructor(private datePipe: DatePipe, private conventionMarcheService: ConventionMarcheService, private translate: TranslateService) { }

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


	public exportAsExcelFile1(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any[], footerData: any, excelFileName: string, sheetName: string, selectedColumns: string[]) {
		const header = headersArray;

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

		let footerRow = worksheet.addRow([""]);
		let sumCout = 0.0;
		let sumContributionCommune = 0.0;
		let sumContributionCommune1 = 0.0;
		let sumTotalContributionCommunePA = 0.0;
		let sumContributionCommune2 = 0.0;
		let sumTotalContributionCommuneDA = 0.0;
		let sumContributionCommune3 = 0.0;
		let sumTotalContributionCommuneTA = 0.0;
		let sumContributionCommune3A = 0.0;
		let sumContributionPartenaire3A = 0.0;
		let sumContributionGlobal3PA = 0.0;
		let sumContributionGlobal3DA = 0.0;
		let sumMontantDispoCommune3PA = 0.0;
		let sumMontantIndispoCommune = 0.0;

		for (let i = 0; i < json.length; i++) {
			let parsedCoutValue = parseFloat(json[i].COUT);
			let parsedContributionCommuneValue = parseFloat(json[i].CONTRIBUTION_COMUNE);
			let parsedContributionCommune1Value = parseFloat(json[i].CONTRIBUTION_COMUNE_PREMIERE_ANNE);
			let parsedTotalContributionCommunePAValue = parseFloat(json[i].TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE);
			let parsedContributionCommune2Value = parseFloat(json[i].CONTRIBUTION_COMUNE_DEUXIEME_ANNE);
			let parsedTotalContributionCommuneDAValue = parseFloat(json[i].TOTAL_CONTRIBUTION_COMUNE_DEUXIEME_ANNE);
			let parsedContributionCommune3Value = parseFloat(json[i].CONTRIBUTION_COMUNE_TROISIEME_ANNE);
			let parsedTotalContributionCommuneTAValue = parseFloat(json[i].TOTAL_CONTRIBUTION_COMUNE_TROISIEME_ANNE);
			let parsedContributionCommuneTAValue = parseFloat(json[i].CONTRIBUTION_COMMUNE_TROIS_ANNEE);
			let parsedContributionPartenaireTAValue = parseFloat(json[i].CONTRIBUTION_PARTENAIRE_TROIS_ANNEE);
			let parsedContributionGlobal3PAValue = parseFloat(json[i].CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE);
			let parsedContributionGlobal3DAValue = parseFloat(json[i].CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE);
			let parsedMontantDispoCommune3PAValue = parseFloat(json[i].MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE);
			let parsedMontantIndispoCommuneAValue = parseFloat(json[i].MONTANT_INDISPO_COMMUNE);

			if (!isNaN(parsedCoutValue)) {
				sumCout += parsedCoutValue;
			}

			if (!isNaN(parsedContributionCommuneValue)) {
				sumContributionCommune += parsedContributionCommuneValue;
			}
			if (!isNaN(parsedContributionCommune1Value)) {
				sumContributionCommune1 += parsedContributionCommune1Value;
			}
			if (!isNaN(parsedTotalContributionCommunePAValue)) {
				sumTotalContributionCommunePA += parsedTotalContributionCommunePAValue;
			}
			if (!isNaN(parsedContributionCommune2Value)) {
				sumContributionCommune2 += parsedContributionCommune2Value;
			}
			if (!isNaN(parsedTotalContributionCommuneDAValue)) {
				sumTotalContributionCommuneDA += parsedTotalContributionCommuneDAValue;
			}
			if (!isNaN(parsedContributionCommune3Value)) {
				sumContributionCommune3 += parsedContributionCommune3Value;
			}
			if (!isNaN(parsedTotalContributionCommuneTAValue)) {
				sumTotalContributionCommuneTA += parsedTotalContributionCommuneTAValue;
			}
			if (!isNaN(parsedContributionCommuneTAValue)) {
				sumContributionCommune3A += parsedContributionCommuneTAValue;
			}
			if (!isNaN(parsedContributionPartenaireTAValue)) {
				sumContributionPartenaire3A += parsedContributionPartenaireTAValue;
			}
			if (!isNaN(parsedContributionGlobal3PAValue)) {
				sumContributionGlobal3PA += parsedContributionGlobal3PAValue;
			}
			if (!isNaN(parsedContributionGlobal3DAValue)) {
				sumContributionGlobal3DA += parsedContributionGlobal3DAValue;
			}
			if (!isNaN(parsedMontantDispoCommune3PAValue)) {
				sumMontantDispoCommune3PA += parsedMontantDispoCommune3PAValue;
			}
			if (!isNaN(parsedMontantIndispoCommuneAValue)) {
				sumMontantIndispoCommune += parsedMontantIndispoCommuneAValue;
			}
		}

		// Add Image
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

		// Filter headersArray based on selectedColumns
		const filteredHeadersArray = headersArray.filter(header => selectedColumns.includes(header));

		// Filter json data based on selectedColumns
		const filteredJsonData = json.map(item => {
			const filteredItem = {};
			Object.keys(item).forEach(key => {
				if (selectedColumns.includes(key)) {
					filteredItem[key] = item[key];
				}
			});
			return filteredItem;
		});

		// Add header row with styles
		const headerRow = worksheet.addRow(filteredHeadersArray);
		headerRow.eachCell(cell => {
			cell.fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "ffb0eaf6" }
			};
			let a = "PAGES.PROGRAMME." + cell.value;

			cell.value = this.translate.instant(a);
			cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
			cell.font = { size: 12, bold: true };
		});

		// Add data rows with styles
		filteredJsonData.forEach((d) => {
			const rowData = filteredHeadersArray.map(header => d[header]);
			const row = worksheet.addRow(rowData);
			row.eachCell(cell => {
				cell.alignment = { vertical: "middle", horizontal: "center" };
				cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
			});
		});

		// Calculate the maximum width needed for each column
		const columnWidths = filteredHeadersArray.map(header => {
			let maxCellWidth = header.length;
			filteredJsonData.forEach(row => {
				const cellWidth = String(row[header] || '').length;
				if (cellWidth > maxCellWidth) {
					maxCellWidth = cellWidth;
				}
			});
			return maxCellWidth;
		});

		// Set width and alignment dynamically
		filteredHeadersArray.forEach((header, index) => {
			const column = worksheet.getColumn(index + 1);
			column.width = columnWidths[index];
			column.alignment = { vertical: "middle", horizontal: "center" };
		});

		// Find the index of the "COUT" column in the filteredHeadersArray

		const coutColumnIndex = filteredHeadersArray.indexOf("COUT");
		const coutColumnLetter = String.fromCharCode(65 + coutColumnIndex);
		
		// Find the index of the "CONTRIBUTION_COMUNE" column in the filteredHeadersArray
		const contributionCommuneColumnIndex = filteredHeadersArray.indexOf("CONTRIBUTION_COMUNE");
		const contributionCommuneColumnLetter = String.fromCharCode(65 + contributionCommuneColumnIndex);

		// Find the index of the "CONTRIBUTION_COMUNE_PREMIERE_ANNE" column in the filteredHeadersArray
		const contributionCommune1ColumnIndex = filteredHeadersArray.indexOf("CONTRIBUTION_COMUNE_PREMIERE_ANNE");
		const contributionCommune1ColumnLetter = String.fromCharCode(65 + contributionCommune1ColumnIndex);

		// Find the index of the "TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE" column in the filteredHeadersArray
		const TotalContributionCommunePAColumnIndex = filteredHeadersArray.indexOf("TOTAL_CONTRIBUTION_COMUNE_PREMIERE_ANNE");
		const TotalContributionCommunePAColumnLetter = String.fromCharCode(65 + TotalContributionCommunePAColumnIndex);

		// Find the index of the "CONTRIBUTION_COMUNE_DEUXIEME_ANNE" column in the filteredHeadersArray
		const contributionCommune2ColumnIndex = filteredHeadersArray.indexOf("CONTRIBUTION_COMUNE_DEUXIEME_ANNE");
		const contributionCommune2ColumnLetter = String.fromCharCode(65 + contributionCommune2ColumnIndex);

		// Find the index of the "CONTRIBUTION_COMUNE_DEUXIEME_ANNE" column in the filteredHeadersArray
		const TotalContributionCommuneDAColumnIndex = filteredHeadersArray.indexOf("TOTAL_CONTRIBUTION_COMUNE_DEUXIEME_ANNE");
		const TotalContributionCommuneDAColumnLetter = String.fromCharCode(65 + TotalContributionCommuneDAColumnIndex);

		// Find the index of the "CONTRIBUTION_COMUNE_TROISIEME_ANNE" column in the filteredHeadersArray
		const contributionCommune3ColumnIndex = filteredHeadersArray.indexOf("CONTRIBUTION_COMUNE_TROISIEME_ANNE");
		const contributionCommune3ColumnLetter = String.fromCharCode(65 + contributionCommune3ColumnIndex);

		// Find the index of the "CONTRIBUTION_COMUNE_TROISIEME_ANNE" column in the filteredHeadersArray
		const TotalContributionCommuneTAColumnIndex = filteredHeadersArray.indexOf("TOTAL_CONTRIBUTION_COMUNE_TROISIEME_ANNE");
		const TotalContributionCommuneTAColumnLetter = String.fromCharCode(65 + TotalContributionCommuneTAColumnIndex);

		// Find the index of the "CONTRIBUTION_COMUNE_TROISIEME_ANNE" column in the filteredHeadersArray
		const contributionCommune3AColumnIndex = filteredHeadersArray.indexOf("CONTRIBUTION_COMMUNE_TROIS_ANNEE");
		const contributionCommune3AColumnLetter = String.fromCharCode(65 + contributionCommune3AColumnIndex);

		// Find the index of the "CONTRIBUTION_PARTENAIRE_TROIS_ANNEE" column in the filteredHeadersArray
		const contributionPartenaire3AColumnIndex = filteredHeadersArray.indexOf("CONTRIBUTION_PARTENAIRE_TROIS_ANNEE");
		const contributionPartenare3AColumnLetter = String.fromCharCode(65 + contributionPartenaire3AColumnIndex);

		// Find the index of the "CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE" column in the filteredHeadersArray
		const contributionGlobal3PAColumnIndex = filteredHeadersArray.indexOf("CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE");
		const contributionGlobal3PAColumnLetter = String.fromCharCode(65 + contributionGlobal3PAColumnIndex);

		// Find the index of the "CONTRIBUTION_GLOBAL_TROIS_PREMIERE_ANNEE" column in the filteredHeadersArray
		const contributionGlobal3DAColumnIndex = filteredHeadersArray.indexOf("CONTRIBUTION_GLOBAL_TROIS_DERNIERE_ANNEE");
		const contributionGlobal3DAColumnLetter = String.fromCharCode(65 + contributionGlobal3DAColumnIndex);

		// Find the index of the "MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE" column in the filteredHeadersArray
		const MontantDispoCommune3PAColumnIndex = filteredHeadersArray.indexOf("MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE");
		const MontantDispoCommune3PAColumnLetter = String.fromCharCode(65 + MontantDispoCommune3PAColumnIndex);

		// Find the index of the "MONTANT_DISPO_COMMUNE_TROIS_PREMIERE_ANNEE" column in the filteredHeadersArray
		const MontantIndispoCommuneColumnIndex = filteredHeadersArray.indexOf("MONTANT_INDISPO_COMMUNE");
		const MontantIndispoCommuneColumnLetter = String.fromCharCode(65 + MontantIndispoCommuneColumnIndex);

		// Determine the row number for the footer
		const footerRowNumber = worksheet.rowCount + 1;

		// Merge cells and set values for "Total des coûts" and "Total Contribution Commune"
		if (coutColumnIndex != -1) {
			worksheet.mergeCells(`${coutColumnLetter}${footerRowNumber}:${coutColumnLetter}${footerRowNumber}`);
			worksheet.getCell(`${coutColumnLetter}${footerRowNumber}`).value = "Total des coûts : " + sumCout.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
			worksheet.getCell(`${coutColumnLetter}${footerRowNumber}`).fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "aedde9el" },
			};}
		if (contributionCommuneColumnIndex != -1) {
		worksheet.mergeCells(`${contributionCommuneColumnLetter}${footerRowNumber}:${contributionCommuneColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${contributionCommuneColumnLetter}${footerRowNumber}`).value = sumContributionCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${contributionCommuneColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (contributionCommune1ColumnIndex != -1) {
		worksheet.mergeCells(`${contributionCommune1ColumnLetter}${footerRowNumber}:${contributionCommune1ColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${contributionCommune1ColumnLetter}${footerRowNumber}`).value = sumContributionCommune1.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${contributionCommune1ColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (TotalContributionCommunePAColumnIndex != -1) {
		worksheet.mergeCells(`${TotalContributionCommunePAColumnLetter}${footerRowNumber}:${TotalContributionCommunePAColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${TotalContributionCommunePAColumnLetter}${footerRowNumber}`).value = sumTotalContributionCommunePA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${TotalContributionCommunePAColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (contributionCommune2ColumnIndex != -1) {
		worksheet.mergeCells(`${contributionCommune2ColumnLetter}${footerRowNumber}:${contributionCommune2ColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${contributionCommune2ColumnLetter}${footerRowNumber}`).value = sumContributionCommune2.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${contributionCommune2ColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (TotalContributionCommuneDAColumnIndex != -1) {
		worksheet.mergeCells(`${TotalContributionCommuneDAColumnLetter}${footerRowNumber}:${TotalContributionCommuneDAColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${TotalContributionCommuneDAColumnLetter}${footerRowNumber}`).value = sumTotalContributionCommuneDA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${TotalContributionCommuneDAColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (contributionCommune3ColumnIndex != -1) {
		worksheet.mergeCells(`${contributionCommune3ColumnLetter}${footerRowNumber}:${contributionCommune3ColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${contributionCommune3ColumnLetter}${footerRowNumber}`).value = sumContributionCommune3.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${contributionCommune3ColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (TotalContributionCommuneTAColumnIndex != -1) {
		worksheet.mergeCells(`${TotalContributionCommuneTAColumnLetter}${footerRowNumber}:${TotalContributionCommuneTAColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${TotalContributionCommuneTAColumnLetter}${footerRowNumber}`).value = sumTotalContributionCommuneTA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${TotalContributionCommuneTAColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (contributionCommune3AColumnIndex != -1) {
		worksheet.mergeCells(`${contributionCommune3AColumnLetter}${footerRowNumber}:${contributionCommune3AColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${contributionCommune3AColumnLetter}${footerRowNumber}`).value = sumContributionCommune3A.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${contributionCommune3AColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (contributionPartenaire3AColumnIndex != -1) {
		worksheet.mergeCells(`${contributionPartenare3AColumnLetter}${footerRowNumber}:${contributionPartenare3AColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${contributionPartenare3AColumnLetter}${footerRowNumber}`).value = sumContributionPartenaire3A.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${contributionPartenare3AColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (contributionGlobal3PAColumnIndex != -1) {
		worksheet.mergeCells(`${contributionGlobal3PAColumnLetter}${footerRowNumber}:${contributionGlobal3PAColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${contributionGlobal3PAColumnLetter}${footerRowNumber}`).value = sumContributionGlobal3PA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${contributionGlobal3PAColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (contributionGlobal3DAColumnIndex != -1) {
		worksheet.mergeCells(`${contributionGlobal3DAColumnLetter}${footerRowNumber}:${contributionGlobal3DAColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${contributionGlobal3DAColumnLetter}${footerRowNumber}`).value = sumContributionGlobal3DA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${contributionGlobal3DAColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (MontantDispoCommune3PAColumnIndex != -1) {
		worksheet.mergeCells(`${MontantDispoCommune3PAColumnLetter}${footerRowNumber}:${MontantDispoCommune3PAColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${MontantDispoCommune3PAColumnLetter}${footerRowNumber}`).value = sumMontantDispoCommune3PA.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${MontantDispoCommune3PAColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};}
		if (MontantIndispoCommuneColumnIndex != -1) {
		worksheet.mergeCells(`${MontantIndispoCommuneColumnLetter}${footerRowNumber}:${MontantIndispoCommuneColumnLetter}${footerRowNumber}`);
		worksheet.getCell(`${MontantIndispoCommuneColumnLetter}${footerRowNumber}`).value = sumMontantIndispoCommune.toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });
		worksheet.getCell(`${MontantIndispoCommuneColumnLetter}${footerRowNumber}`).fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "aedde9el" },
		};	}
		/* Save Excel File */
		workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
			const blob = new Blob([data], { type: EXCEL_TYPE });
			let now = new Date();
			let timeSpan = this.datePipe.transform(now, "yyyyHHmmss");
			fs.saveAs(blob, excelFileName + "-" + timeSpan + EXCEL_EXTENSION);
		});
	}










	public exportAsExcelFileAutorisation(reportHeading: string, headersArray: any[], json: any[], excelFileName: string, sheetName: string) {
		const header = headersArray;
		const data = json;

		/* Create workbook and worksheet */
		const workbook = new Workbook();
		/* Set workbook properties */

		workbook.created = new Date();
		workbook.modified = new Date();
		const worksheet = workbook.addWorksheet(sheetName);
		/* file orientation */
		worksheet.views = [{ rightToLeft: true }];
		/* Add header row */
		worksheet.addRow([]);

		worksheet.mergeCells("B2:M2");
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


			let row = worksheet.addRow(Object.values(d));
			row.alignment = { vertical: "middle", horizontal: "center" };
			// let qty = row.getCell(1);

			row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		});
		worksheet.getColumn(1).width = 92;
		worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(2).width = 25;
		worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(3).width = 20;
		worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(4).width = 72;
		worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(5).width = 15;
		worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(6).width = 25;
		worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(7).width = 25;
		worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(8).width = 15;
		worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(9).width = 15;
		worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(10).width = 15;
		worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(11).width = 15;
		worksheet.getColumn(11).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(12).width = 30;
		worksheet.getColumn(12).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(13).width = 53;
		worksheet.getColumn(13).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.addRow([]);


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

	public exportAsExcelFileRetro4(reportHeading: string, reportSubHeading: string, headersArray: any[], json: any[], footerData: any, excelFileName: string, sheetName: string) {
		const header = headersArray;
		const data = json;

		const workbook = new Workbook();

		workbook.creator = "Brome";
		workbook.lastModifiedBy = "Brome";
		workbook.created = new Date();
		workbook.modified = new Date();

		const worksheet = workbook.addWorksheet(sheetName);

		worksheet.mergeCells("A1:D1");
		worksheet.getCell("A1").value = 'DATE DE MISE A JOUR: ' + this.formatDate(new Date());;
		worksheet.getCell("A1").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("A1").font = { name: "Calibri", size: 9, bold: false, color: { argb: "FF000000" } };
		worksheet.getCell("A1").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFFF00" },
		};

		worksheet.mergeCells("E1:N1");
		worksheet.getCell("E1").value = reportHeading;
		worksheet.getCell("E1").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("E1").font = { name: "Calibri", size: 18, bold: true, color: { argb: "FFFFFFFF" } };
		worksheet.getCell("E1").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "203764" },
		};
		worksheet.getCell("E1").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };

		worksheet.mergeCells("O1:Z1");
		worksheet.getCell("O1").value = '2023';
		worksheet.getCell("O1").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("O1").font = { name: "Calibri", size: 11, bold: false, color: { argb: "FF000000" } };
		worksheet.getCell("O1").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFFF99" },
		};
		worksheet.mergeCells("AA1:AL1");
		worksheet.getCell("AA1").value = '2024';
		worksheet.getCell("AA1").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("AA1").font = { name: "Calibri", size: 11, bold: false, color: { argb: "FF000000" } };
		worksheet.getCell("AA1").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFFF99" },
		};
		worksheet.mergeCells("AM1:AX1");
		worksheet.getCell("AM1").value = '2025';
		worksheet.getCell("AM1").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("AM1").font = { name: "Calibri", size: 11, bold: false, color: { argb: "FF000000" } };
		worksheet.getCell("AM1").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFFF99" },
		};
		worksheet.mergeCells("AY1:BJ1");
		worksheet.getCell("AY1").value = '2026';
		worksheet.getCell("AY1").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("AY1").font = { name: "Calibri", size: 11, bold: false, color: { argb: "FF000000" } };
		worksheet.getCell("AY1").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFFF99" },
		};
		worksheet.mergeCells("BK1:BV1");
		worksheet.getCell("BK1").value = '2027';
		worksheet.getCell("BK1").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("BK1").font = { name: "Calibri", size: 11, bold: false, color: { argb: "FF000000" } };
		worksheet.getCell("BK1").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFFF99" },
		};
		worksheet.mergeCells("BW1:CH1");
		worksheet.getCell("BW1").value = '2028';
		worksheet.getCell("BW1").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("BW1").font = { name: "Calibri", size: 11, bold: false, color: { argb: "FF000000" } };
		worksheet.getCell("BW1").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FFFF99" },
		};


		const headerRow = worksheet.addRow(header);

		headerRow.eachCell((cell, index) => {
			if (index >= 1 && index <= 12) { // Cells from A to L
				cell.fill = {
					type: "pattern",
					pattern: "solid",
					fgColor: { argb: "ED7D31" },
				};
				cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
				cell.font = { size: 9, bold: true, name: "Calibri" };

				worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;
			} else if (index >= 13 && index <= 14) {
				cell.fill = {
					type: "pattern",
					pattern: "solid",
					fgColor: { argb: "305496" },
				};
				cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
				cell.font = { size: 9, bold: true, name: "Calibri", color: { argb: "FFFFFFFF" } };

				worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;
			} else if (index >= 15 && index <= 86) {
				cell.fill = {
					type: "pattern",
					pattern: "solid",
					fgColor: { argb: "D0CECE" },
				};
				cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
				cell.font = { size: 9, bold: true, name: "Calibri", color: { argb: "FF000000" } };

				worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;
			}
		});
		let startIndex = 3;
		const baseYear = 2023;
		data.forEach((d) => {
			if (
				Array.isArray(d.numero) &&
				Array.isArray(d.object) &&
				Array.isArray(d.maitreOuvrageDelegue) &&
				Array.isArray(d.Avancement) &&
				Array.isArray(d.cout) &&
				d.numero.length === d.object.length &&
				d.numero.length === d.Avancement.length &&
				d.numero.length === d.cout.length &&
				d.numero.length === d.maitreOuvrageDelegue.length
			) {
				for (let i = 0; i < d.numero.length; i++) {
					let propertyValues1 = [
						d.nature, d.theme, d.sousTheme, d.codeProjet, d.nameProjet,
						d.numero[i],
						d.object[i],
						d.maitreOuvrageDelegue[i],
						d.convention.lenght != 0 ? d.convention[i] : '-', d.date, d.Avancement[i], d.cout[i], d.dateDebut[i], d.dateFin[i],
					];
					let row = worksheet.addRow(propertyValues1);
					row.alignment = { vertical: 'middle', horizontal: 'center' };
					let dateDebut = new Date(d.dateDebut[i]);
					let dateFin = new Date(d.dateFin[i]);
					let startYear = dateDebut.getFullYear();
					let startMonth = dateDebut.getMonth() + 1;
					let endYear = dateFin.getFullYear();
					let endMonth = dateFin.getMonth() + 1;
					let monthOffset = dateDebut.getDate() > 1 ? 1 : 0;
					let startColumnIndex;
					let endColumnIndex;
					for (let year = baseYear; year <= startYear; year++) {
						const indexOffset = (year - baseYear) * 12;
						startColumnIndex = indexOffset + startMonth + 13 + monthOffset;
						endColumnIndex = indexOffset + endMonth + 13 + monthOffset;

					}
					for (let columnIndex = startColumnIndex; columnIndex <= endColumnIndex; columnIndex++) {
						let cell = row.getCell(columnIndex);
						cell.fill = {
							type: 'pattern',
							pattern: 'solid',
							fgColor: { argb: '8EA9DB' }
						};
						cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
					}

					if (d.numero.lenght > 1) {
						let cellsToEmpty = [1, 2, 3, 4, 5];
						cellsToEmpty.forEach(cellIndex => {
							let cell = row.getCell(cellIndex);
							cell.value = null;
						});
					}
				}

			} else {
				let propertyValues1 = [d.nature, d.theme, d.sousTheme, d.codeProjet, d.nameProjet, d.numero, d.object, d.maitreOuvrageDelegue, d.convention.lenght != 0 ? d.convention : '-', d.AnnéeDébut, d.Avancement, d.cout, d.DateDebut, d.DateFin];

				let row = worksheet.addRow(propertyValues1);
				row.alignment = { vertical: 'middle', horizontal: 'center' };
				let dateDebut = new Date(d.dateDebut);
				let dateFin = new Date(d.dateFin);
				let startYear = dateDebut.getFullYear();
				let startMonth = dateDebut.getMonth() + 1;
				let endYear = dateFin.getFullYear();
				let endMonth = dateFin.getMonth() + 1;
				let monthOffset = dateDebut.getDate() > 1 ? 1 : 0;
				let startColumnIndex;
				let endColumnIndex;

				for (let year = baseYear; year <= startYear; year++) {
					const indexOffset = (year - baseYear) * 12;
					startColumnIndex = indexOffset + startMonth + 13 + monthOffset;
					endColumnIndex = indexOffset + endMonth + 13 + monthOffset;

				}
				for (let columnIndex = startColumnIndex; columnIndex <= endColumnIndex; columnIndex++) {
					let cell = row.getCell(columnIndex);
					cell.fill = {
						type: 'pattern',
						pattern: 'solid',
						fgColor: { argb: '8EA9DB' }
					};
					cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
				}
				if (d.numero.lenght > 1) {
					let cellsToEmpty = [1, 2, 3, 4, 5];
					cellsToEmpty.forEach(cellIndex => {
						let cell = row.getCell(cellIndex);
						cell.value = null;
					});
				}
			}

			if (Array.isArray(d.sousProjets) && d.sousProjets.length > 0) {
				const endIndex = startIndex + (d.sousProjets.length) - 1;
				worksheet.mergeCells(`A${startIndex}:A${endIndex}`);
				worksheet.mergeCells(`B${startIndex}:B${endIndex}`);
				worksheet.mergeCells(`C${startIndex}:C${endIndex}`);
				worksheet.mergeCells(`D${startIndex}:D${endIndex}`);
				worksheet.mergeCells(`E${startIndex}:E${endIndex}`);
				startIndex = endIndex + 1;
			}
		});

		worksheet.getColumn(1).width = 30;
		worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(2).width = 30;
		worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(3).width = 30;
		worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(4).width = 30;
		worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(5).width = 30;
		worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(6).width = 30;
		worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(7).width = 30;
		worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(7).width = 30;
		worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(8).width = 30;
		worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(9).width = 30;
		worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(10).width = 30;
		worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(11).width = 30;
		worksheet.getColumn(11).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(12).width = 30;
		worksheet.getColumn(12).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(13).width = 30;
		worksheet.getColumn(13).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.getColumn(13).width = 30;
		worksheet.getColumn(13).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
			const blob = new Blob([data], { type: EXCEL_TYPE });
			let now = new Date();
			let timeSpan = this.datePipe.transform(now, "dd-MM-yyyy");
			fs.saveAs(blob, excelFileName + " " + timeSpan + EXCEL_EXTENSION);
		});
	}


	getColumnLetter(cellIndex) {
		let columnIndex = cellIndex + 1;

		let code = (columnIndex + 64);

		if (columnIndex > 26) {
			let firstLetter = String.fromCharCode(Math.floor((columnIndex - 1) / 26) + 64);
			let secondLetter = String.fromCharCode((columnIndex - 1) % 26 + 65);
			return `${firstLetter}${secondLetter}`;
		}

		return String.fromCharCode(code);
	}

	formatDate(date) {
		const day = date.getDate().toString().padStart(2, '0');
		const month = (date.getMonth() + 1).toString().padStart(2, '0'); // January is 0!
		const year = date.getFullYear();
		return `${day}/${month}/${year}`;
	}
}

