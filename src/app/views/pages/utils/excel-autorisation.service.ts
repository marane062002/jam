import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import * as fs from "file-saver";

import { Workbook } from "exceljs";
import * as logo from "./logo.js";
const EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
	providedIn: "root",
})
export class ExcelAutorisationService {
	constructor(private datePipe: DatePipe) {}

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
		/* ==================================================================================== */
		worksheet.addRow([]);

		worksheet.mergeCells("B1:G1");
		worksheet.getCell("B1").value = "Affaires sociales / Associations / Accompagnement et partenariat / Autorisation";
		worksheet.getCell("B1").alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getCell("B1").font = { size: 12, bold: true };
		worksheet.getCell("B1").fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "1E90FF" },
		};
		worksheet.getCell("E2").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		worksheet.addRow([]);
		/* ==================================================================================== */
		worksheet.addRow([]);
		worksheet.mergeCells("A1:A5");

		worksheet.mergeCells("B2:G2");
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
			worksheet.mergeCells("B3:G3");
			worksheet.getCell("B3").value = "Date : " + this.datePipe.transform(new Date(), "dd-MM-yyyy");
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

		// Add Image
		let myLogoImage = workbook.addImage({
			base64: logo.imgBase64,
			extension: "png",
		});
		// Image position
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

		//   worksheet.getColumn(2).numFmt = '#,##0.00;[Red]-#,##0.00';
		worksheet.getColumn(1).width = 20;
		worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(2).width = 20;
		worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(3).width = 20;
		worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(4).width = 20;
		worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(5).width = 20;
		worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(6).width = 20;
		worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(7).width = 20;
		worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(8).width = 20;
		worksheet.getColumn(8).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(9).width = 20;
		worksheet.getColumn(9).alignment = { vertical: "middle", horizontal: "center", wrapText: true };
		worksheet.getColumn(10).width = 20;
		worksheet.getColumn(10).alignment = { vertical: "middle", horizontal: "center", wrapText: true };

		worksheet.addRow([]);

		//Footer Row
		let footerRow = worksheet.addRow([]);
		(footerRow.getCell(2).value = "Ce tableau à été généré depuis le système  d'information de la commune marrakech"),
			(footerRow.getCell(2).fill = {
				type: "pattern",
				pattern: "solid",
				fgColor: { argb: "aed4d2c9" },
			});
		footerRow.getCell(2).border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
		footerRow.getCell(2).alignment = { vertical: "middle", horizontal: "center" };
		//Merge Cells
		worksheet.mergeCells(`B${footerRow.number}:G${footerRow.number}`);

		/* Save Excel File */
		workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
			const blob = new Blob([data], { type: EXCEL_TYPE });
			let now = new Date();
			let timeSpan = this.datePipe.transform(now, "ddMMyyyyHHmmss");
			fs.saveAs(blob, excelFileName + "-" + timeSpan + EXCEL_EXTENSION);
		});
	}
}
