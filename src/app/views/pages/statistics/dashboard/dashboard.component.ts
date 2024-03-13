import { DatePipe } from "@angular/common";
import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
	MatTableDataSource,
	MatPaginator,
	MatSort,
	MatOptionSelectionChange,
	MatRadioChange,
} from "@angular/material";

import { Input } from '@angular/core';
import * as logo from "../../utils/logo.js";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { ArrondissemntService } from "../../parametrage-bmh/services/arrondissemnt.service";
import { InterfaceArrondissement } from "../../parametrage-bmh/list-arrondissement/list-arrondissement.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { BehaviorSubject } from "rxjs";

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Workbook } from "exceljs";




@Component({
	selector: "kt-dashboard",
	templateUrl: "./dashboard.component.html",
	styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
	public xAxisData = [];
	
	tableData: any[] = [];
	public yAxisData = [];

	arrondissements: any[];

	datef = null;
	dated = null;
	datas: [][];
	sexes: string[];
	arrondis : any[];
	sexesContater : string[];
	constater : string[];
	
	

	decesData: any[];
	filtredData: any[]=[];
	dataa: any[][] = [];
	dataConst: any[][] = [];
	filtred2Data: any[]=[];
	deces2Data: any[];
	dataSubject = new BehaviorSubject<any[]>([]);

	
	listAssocaition: any[];
	private baseUrl = environment.API_BMH_URL;
	private headers = new HttpHeaders({
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
	});
	arrondissement:InterfaceArrondissement[]=[]
	types;
	data: affaireData[] = [];

	isLoading = true;
	searchForm: FormGroup;
	dash;
	dash1;
	chartType = "pie";
	chartType1 = "bar";
	sizeData: number = 0;
	idassoction = 0;


	displayedColumns: string[] = [
		"Categorie",
		"constaterItem",
		"Total",
	];
	// ============================================
	// constructeur
	// ============================================
	constructor(
		private ArrondissementService:ArrondissemntService,
		private fb: FormBuilder,
		private translate: TranslateService,
		private datePipe: DatePipe,
		private router: Router,
		private http: HttpClient
	) {
		this.data = [
			{
				num: "1/2022",
				nom: "nom affaire 1 ",
				defendresse: "Commune Casablanca",
				tribunal: "Tech ",
				typeAffaire: "Type 1",
				demandresse: "Partie  ",
				dateDebut: "01-01-2020",
			},
			{
				num: "2/2022",
				nom: "nom affaire 2",
				defendresse: "CM ",
				tribunal: "Tribunal ",
				typeAffaire: "Type 2",
				demandresse: "Partie",
				dateDebut: "21-2-2020",
			},
			{
				num: "3/2022",
				nom: "nom affaire 3",
				defendresse: "Tech ",
				tribunal: "Tech ",
				typeAffaire: "Type 3",
				demandresse: "Partie",
				dateDebut: "01-01-2020",
			},
			{
				num: "4/2022",
				nom: "nom affaire 4",
				defendresse: "Tech ",
				tribunal: "Tribunal ",
				typeAffaire: "Type 4",
				demandresse: "Partie",
				dateDebut: "01-01-2020",
			},
			{
				num: "5/2022",
				nom: "nom affaire 5",
				defendresse: "Tech ",
				tribunal: "Tech ",
				typeAffaire: "Type 5",
				demandresse: "CM",
				dateDebut: "01-01-2020",
			},
		];
	}

	// ============================================
	//
	// ============================================


	dataSource: MatTableDataSource<any>;
	// displayedColumns: string[] = [
	// 	"nbAffaire",
	// 	"type",
	// 	"tribunal",
	// 	"demandresse",
	// 	"defenderesse",
	// ];
	// @ViewChild('excelTabledom ', { static: false }) excelTabledom!: ElementRef;
	@ViewChild('excelTable', { static: false }) excelTable!: ElementRef;
	@ViewChild('excelTableDom', { static: false }) excelTableDom!: ElementRef;

	// @ViewChild('bomTable', { static: false }) bomTable: ElementRef;
	
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;


	// dataSourcee = new MatTableDataSource<BoMItem>();
	// displayedColumns: string[] = ['item', 'symbol', 'qty', 'mfg', 'partNumber', 'desc'];
	displayedColumnsd: string[] = ['partNumber', 'mfg', 'desc', 'qty'];
  
	importFile: File;
	storeData: any;
	csvData: any;
	jsonData: any;
	textData: any;
	worksheet: any;
	arrData: any;


	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
		// const labels = ['Label 1', 'Label 2', 'Label 3']; 
		// const data = [10, 20, 30];
		// this.createChart(labels, data);
		this.fetchDecesData();
		this.fetchData();
		this.searchForm = this.fb.group({
			arrondissement:[''],
			dated:[''],
			datef:['']
		});
		this.getDataDropDownList();
		
	}
	
	  processWorkbook(workbook: XLSX.WorkBook) {
		const firstSheetName: string = workbook.SheetNames[0];
		const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];
		const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
		this.tableData = jsonData.filter(obj => obj['__EMPTY_1'] !== 'BMH' && obj['__EMPTY_1'] !== 'تاريخ : 19-02-2024');
	    console.log(this.tableData)  
	}
	
	uploadedFile(evt: any) {
		const target: DataTransfer = (evt.target) as DataTransfer;
	
		const reader: FileReader = new FileReader();
	
		reader.onload = (e: any) => {
		  let bstr: string = e.target.result;
	
		  let wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
	
		  let wsName: string = wb.SheetNames[0];
	
		  let ws: XLSX.WorkSheet = wb.Sheets[wsName];
	
		  this.datas = (XLSX.utils.sheet_to_json(ws, { raw: true }));
		  console.log('Data: ', this.datas);
		  this.jsonData = JSON.stringify(this.datas);
	
		  console.log('JsonData: ', this.jsonData);
	
		};
	
		reader.readAsBinaryString(target.files[0]);
	  }


	getRandomNumberr(min: number, max: number): number {
			return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	  
	 
	fetchData(){
		this.ArrondissementService.getAll().subscribe(res=>{
		this.arrondissement = res
		console.log(res);
		console.log(this.arrondissement);
		this.fetchDecesData();
	})
	}
	
	exportToExcel() {
	
				// Create a new Excel workbook and worksheet
				const wb: XLSX.WorkBook = XLSX.utils.book_new();
				const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.getTableDataConst());

				// Append the worksheet to the workbook
				XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

				// Generate Excel file buffer
				const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

				const table: HTMLTableElement = this.excelTableDom.nativeElement;
				const rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
				const jsonData: any[] = [];
			
				// Iterate over rows
				for (let i = 1; i < rows.length; i++) {
					
				  const row: HTMLTableRowElement = rows[i];
				  const rowData: any = {};
			
				  // Iterate over cells
				  for (let j = 0; j < row.cells.length; j++) {
					
					const cell: HTMLTableCellElement = row.cells[j];
					rowData[`column${j + 1}`] = cell.innerText;
				  }
			
				  jsonData.push(rowData);
				}
				
				console.log("json : ", jsonData)
			
				let columns = this.dataConst[0];
				console.log("cols :",columns)
				
				this.saveAsExcelFile("BMH (Décés constatés à domicile et enregistrés au BCH)", columns, jsonData, "Décés Constatés", "Décés constatés à domicile et enregistrés au BCH ");
				
	  }
	  private saveAsExcelFilee(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
        FileSaver.saveAs(data, fileName + new Date().getTime() + '.xlsx');
      }

	  exportToExcelSurvenu() {
		// Create a new Excel workbook and worksheet
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.getTableData());
	
		// Append the worksheet to the workbook
		XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
	
		// Generate Excel file buffer
		const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
	

		const table: HTMLTableElement = this.excelTable.nativeElement;
		const rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
		const jsonData: any[] = [];
	
		// Iterate over rows
		for (let i = 1; i < rows.length; i++) {
		  const row: HTMLTableRowElement = rows[i];
		  const rowData: any = {};
	
		  // Iterate over cells
		  for (let j = 0; j < row.cells.length; j++) {
			const cell: HTMLTableCellElement = row.cells[j];
			rowData[`column${j + 1}`] = cell.innerText;
		  }
	
		  jsonData.push(rowData);
		}
	    console.log("json : ", jsonData)
		console.log("constater : ", this.constater)
		// return jsonData; // Return JSON data

		let columns = this.dataa[0];
		console.log("cols :",columns)
		// Save Excel file
		this.saveAsExcelFile("BMH (Décés survenus aux hopitaux et aux cliniques et enregistrés au BCH)", columns, jsonData, "Décés survenus", "Décés survenus aux hopitaux et aux cliniques et enregistrés au BCH ");
		// this.getTableData()
	}
	  
	private getTableData(): any[][] {
		// Get the table element
		const table = document.getElementById('exportDataSurvenus');
		
	
		// Iterate over table rows and cells to extract data
		if (table) {
			const rows = table.querySelectorAll('tr');
			rows.forEach(row => {
				const rowData: any[] = [];
				row.querySelectorAll('th, td').forEach(cell => {
					rowData.push(cell.textContent);
				});
				this.dataa.push(rowData);
			});
		}
	    console.log("dataaaaaa:", this.dataa[0])
		return this.dataa;
	}
	private getTableDataConst(): any[][] {
		// Get the table element
		const table = document.getElementById('exportData');
		
	
		// Iterate over table rows and cells to extract data
		if (table) {
			const rows = table.querySelectorAll('tr');
			rows.forEach(row => {
				const rowData: any[] = [];
				row.querySelectorAll('th, td').forEach(cell => {
					rowData.push(cell.textContent);
				});
				this.dataConst.push(rowData);
			});
		}
	    console.log("dataaaaaaConst:", this.dataConst[0])
		return this.dataConst;
	}

	private tableToJson(): any[] {
		const table: HTMLTableElement = this.excelTable.nativeElement;
		const rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
		const jsonData: any[] = [];
	
		// Iterate over rows
		for (let i = 1; i < rows.length; i++) {
		  const row: HTMLTableRowElement = rows[i];
		  const rowData: any = {};
	
		  // Iterate over cells
		  for (let j = 0; j < row.cells.length; j++) {
			const cell: HTMLTableCellElement = row.cells[j];
			rowData[`column${j + 1}`] = cell.innerText;
		  }
	
		  jsonData.push(rowData);
		}
	    console.log("json : ", jsonData)
		console.log("constater : ", this.constater)
		return jsonData; // Return JSON data
	  }


	  private saveAsExcelFile(reportHeading: string, headersArray: any[], json: any[],  excelFileName: string, sheetName: string) {
		const header = headersArray;
        const data = json;

        /* Create workbook and worksheet */
        const workbook = new Workbook();
        /* Set workbook properties */

        workbook.created = new Date();
        workbook.modified = new Date();
        const worksheet = workbook.addWorksheet(sheetName);
        worksheet.addRow([]);

        worksheet.mergeCells("B2:H2");
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
            worksheet.mergeCells("B3:H3");
            worksheet.getCell("B3").value = "DATE : " + this.datePipe.transform(new Date(), "dd-MM-yyyy");
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
        worksheet.addRow([]);

        /* Save Excel File */
        workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            let now = new Date();
            let timeSpan = this.datePipe.transform(now, "yyyyHHmmss");
            FileSaver.saveAs(blob, excelFileName  + "-" + timeSpan + '.xlsx');
        });

	  } 
	  
	fetchDecesData() {
		
		this.http.get<any[]>(`${this.baseUrl}deces/statistics`, { headers: this.headers }).subscribe(data => {
			
			this.decesData = data;

            if(this.dated == null && this.datef == null){
				this.filtredData = this.decesData
			}
		  this.sexes = Array.from(new Set(data.map(item => item.Sexe)));
		  this.arrondis = Array.from(new Set(data.map(item => item.Arrondissement)));
		  const dataa = this.arrondissement.map(constater =>  this.getTotalCountByArrondissement(constater.libelle)); 
		  const libelles = this.arrondissement.map((constater:any) => constater.libelle) ; 
		  this.createChart2(libelles, dataa);
		});
	  
		this.http.get<any[]>(`${this.baseUrl}deces/constater/statistics`, { headers: this.headers }).subscribe(data => {
			this.deces2Data = data;
			if(this.dated == null && this.datef == null){
				this.filtred2Data = this.deces2Data
			}
			this.sexesContater = Array.from(new Set(data.map(item => item.Sexe)));
			this.constater = Array.from(new Set(data.map(item => item.Constater)));
			const datas = this.constater.map(constater =>  this.getTotalCountByConstater(constater)); 
			const labels = this.constater.map((constater:any) => constater) ; 
			this.createChart(labels, datas);
		  });
					
	  }

	  filterDecesData() {
		this.dated = this.searchForm.get('dated').value;
		this.datef = this.searchForm.get('datef').value;
		
		if(this.dated != null || this.datef != null ){
			this.filtredData = this.decesData
			this.filtred2Data = this.deces2Data

			this.filtredData = this.filtredData.filter(item => {	
			const date = new Date(item.CreatedAt);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0'); 
			const day = String(date.getDate()).padStart(2, '0');
			const createdAt = `${year}-${month}-${day}`;
			
			return createdAt >= this.dated && createdAt <= this.datef;
		});
		
		this.filtred2Data = this.filtred2Data.filter(item => {	
			const date = new Date(item.CreatedAt);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0'); 
			const day = String(date.getDate()).padStart(2, '0');
			const createdAt = `${year}-${month}-${day}`;
			
			return createdAt >= this.dated && createdAt <= this.datef;
		});


		console.log("filtred data :", this.filtredData);
		console.log("deces data : ", this.decesData)
		}else {
			
			this.filtredData = this.decesData.slice();
			this.filtred2Data = this.deces2Data.slice();
		}
		this.fetchDecesData()
	}
	  getTotalCountByArrondissement(arrondissement: string): number {
		const totalCount = this.filtredData
		  .filter(item => item.Arrondissement === arrondissement)
		  .reduce((acc, curr) => acc + curr.NombreDeDeces, 0);
		return totalCount;
	  }
	  

	  getTotalCount(sexe: any): number {
		const ttl = this.filtred2Data
		  .filter(item => item.Sexe === sexe)
		  .reduce((total, item) => total + item.NombreDeDeces, 0);
		  return ttl
	 }
	 getDeathCount(sexe: number, constater: string): number {
		const totalCount = this.filtred2Data
        .filter(item => item.Sexe === sexe && item.Constater === constater)
        .reduce((acc, curr) => acc + curr.NombreDeDeces, 0);
		return totalCount;
	  } 
	 getTotalCountByConstater(constater: any): number {
		return this.filtred2Data
		  .filter(item => item.Constater === constater)
		  .reduce((total, item) => total + item.NombreDeDeces, 0);
	  }
	  createChart2(labels: string[], data: number[]) {
		const ctx = document.getElementById('canva2') as HTMLCanvasElement;
		new Chart(ctx, {
		  type: 'bar',
		  data: {
			labels: labels,
			datasets: [{
			  label: 'Nombre de décès constatés à domicile',
			  data: data,
			  backgroundColor: labels.map(() => `rgba(${this.getRandomNumberr(0, 255)},${this.getRandomNumberr(0, 255)},${this.getRandomNumberr(0, 255)}, 1)`),
			  borderWidth: 1
			}]
		  },
		  options: {
			tooltips: {
				enabled: true
			},
			scales: {
			  yAxes: [{
				ticks: {
				  beginAtZero: true,
				  stepSize: 1
				}
			  }]
			}
		  }
		});
	  }
	  
	  
	  createChart(labels: string[], data: number[]) {
		const ctx = document.getElementById('canva') as HTMLCanvasElement;
		new Chart(ctx, {
		  type: "pie",
		  data: {
			labels: labels,
			datasets: [{
			  label: 'عدد',
			  data: data,
			  backgroundColor: labels.map(() => `rgba(${this.getRandomNumberr(0, 255)},${this.getRandomNumberr(0, 255)},${this.getRandomNumberr(0, 255)}, 1)`),
			  borderWidth: 0,
			  fill: true
			}]
		  },
		  options: {
			legend: {
			  display: true
			}
		  }
		});
	  }
	  
	  
	  




	  getNombreDeces(arrondissementId: number, sexe: string): { total: number, count: number } {
	    

		if (!this.arrondissement || !this.decesData ) {
			return { total: 0, count: 0 };
		}
	    
		const arrondissement = this.arrondissement.find(a => a.id === arrondissementId);
	    
		// Check if arrondissement is null or undefined
		if (!arrondissement) {
			return { total: 0, count: 0 };
		}
	

		const totalCountdr = this.filtredData
        .filter(item => item.Arrondissement === arrondissement.libelle && item.Sexe === sexe )
        .reduce((acc, curr) => acc + curr.NombreDeDeces, 0);
        
		const totalCount = this.filtredData
        .filter(item => item.Arrondissement === arrondissement.libelle )
        .reduce((acc, curr) => acc + curr.NombreDeDeces, 0);

		const entry = this.decesData.find(item => item.Arrondissement === arrondissement.libelle && item.Sexe === sexe);
		// if(this.filtredData.length === 0 || this.dated || this.datef){
		// 	console.log('use deces count ')
		
		return {
				total: totalCount,
				count: totalCountdr
			};
					
		// }
		
		
	}
	

	// getDeathCount(sexe: number, constater: string): { total: number, count: number } {
	// 	const entry = this.deces2Data.find(item => item.Sexe === sexe && item.Constater === constater);
  	// 	return entry ? entry.NombreDeDeces : 0;
	// }
	  


	  
	// getNombreDecesConstater(arrondissementId: number, sexe: string): { total: number, count: number } {
	    
	// 	// Check if arrondissements and decesData are null or undefined
	// 	if (!this.arrondissement || !this.decesData) {
	// 		return { total: 0, count: 0 };
	// 	}
	
	// 	const arrondissement = this.arrondissement.find(a => a.id === arrondissementId);
	    
	// 	// Check if arrondissement is null or undefined
	// 	if (!arrondissement) {
	// 		return { total: 0, count: 0 };
	// 	}

	// 	const totalCount = this.decesData
    //     .filter(item => item.Arrondissement === arrondissement.libelle )
    //     .reduce((acc, curr) => acc + curr.NombreDeDeces, 0);

	// 	const entry = this.decesData.find(item => item.Arrondissement === arrondissement.libelle && item.Sexe === sexe);
	// 	return {
    //     total: totalCount,
    //     count: entry ? entry.NombreDeDeces : 0
    //     };
		
	// }
	
	reset() {
		this.searchForm.reset({
		  dated: null,
		  datef: null
		});
	  }
	
	EtapeDernier(): void {
		this.router.navigate(["pages/affaires/dashboard"]);
	}

	// ============================================
	// ngAfterView
	// ============================================
	ngAfterViewInit() {
		//	this.data.map((data) => data.num);
		let nbrAssoc = ["1", "2", "4", "1", "5"];
		let typeAssoc = this.data.map((data) => data.typeAffaire);
		//console.log("List of labels: " + typeAssoc);
		this.chartOption(typeAssoc, nbrAssoc, this.chartType);
	}
	// ============================================
	// OnSubmit
	// ============================================

	onSubmit() {}
	selectAssoication(event: MatOptionSelectionChange) {
		console.log(event.isUserInput);
		//this.dash1.destroy();
		if (event.isUserInput) {
			this.idassoction = event.source.value;
			this.chartType1 = "bar";
		}
	}

	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(type, commune, chartType, dateD, dateF) {
		const _this = this;
	}

	// ============================================
	// Charger les liste externe
	// ============================================
	getDataDropDownList() {
		/*this.service.getData().subscribe(
			(data) => {
				this.types = data[1];
				console.log(data[1]);
			},
			(err) => {
				console.log(err);
			}
    );*/
	}
	// ============================================
	// OnChange radio
	// ============================================
	appliquer(){
		console.log(this.searchForm)
	}
	selectionChanged(event: MatRadioChange) {
		var type = this.searchForm.get("type").value;
		var commune = this.searchForm.get("commune").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		this.chartType = event.value;
		console.log("Type & commune: " + type + "|" + commune);
		if (type == "" || commune == "") {
			this.chartType = event.value;
			this.dash.destroy();
			this.ngAfterViewInit();
		}
		const controls = this.searchForm.controls;
		/** check form */
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}

		if (event.value == "pie" || event.value == "doughnut") {
			this.fillChartByParam(
				type,
				commune,
				this.chartType,
				dateDebut,
				dateFin
			);
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(
				type,
				commune,
				this.chartType,
				dateDebut,
				dateFin
			);
		}
	}
	selectionChanged1(event: MatRadioChange) {
		this.chartType1 = event.value;
		console.log(event);
	}
	// ============================================
	//ngAfterView
	// ============================================
	getCharts() {}

	// ============================================
	//
	// ============================================
	getRandomNumber(min, max) {
		return Math.floor(Math.random() * (+max - +min)) + +min;
	}
	// ============================================
	// Download graphe
	// ============================================
	downloadCanvas(event) {
		var anchor = event.target;
		console.log("Downloading ...");
		anchor.href = document.getElementsByTagName("canvas")[0].toDataURL();
		anchor.download = "chart.jpg";
	}

	// ============================================
	// Refresh datatable & graph
	// ============================================
	refresh() {
		this.dataSource = new MatTableDataSource(null);
		this.isLoading = true;
		this.dash.destroy();
		this.ngAfterViewInit();
	}
	// ===========================================
	// ChartJs
	// ===========================================
	chartOption(libelle, id, type) {
		var ctx = document.getElementById("canvas");
		if (type == "pie" || type == "doughnut") {
			this.dash = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد ",
							data: id,
							backgroundColor: libelle.map(
								() =>
									`rgba(${this.getRandomNumber(
										0,
										255
									)},${this.getRandomNumber(
										0,
										255
									)} ,${this.getRandomNumber(0, 255)} , 1)`
							),
							borderColor: libelle.map(
								() =>
									`rgba(${this.getRandomNumber(
										0,
										255
									)},${this.getRandomNumber(
										0,
										255
									)} ,${this.getRandomNumber(0, 255)} , 1)`
							),
							borderWidth: 0,
							fill: true,
						},
					],
				},
				options: {
					legend: {
						display: true,
					},
				},
			});
		} else {
			this.dash = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد ",
							data: id,
							backgroundColor: libelle.map(
								() =>
									`rgba(${this.getRandomNumber(
										0,
										255
									)},${this.getRandomNumber(
										0,
										255
									)} ,${this.getRandomNumber(0, 255)} , 1)`
							),
							//borderColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							borderWidth: 0,
							fill: false,
						},
					],
				},
				options: {
					legend: {
						display: false,
					},
					scales: {
						xAxes: [
							{
								display: true,
							},
						],
						yAxes: [
							{
								display: true,
								ticks: {
									beginAtZero: true,
								},
							},
						],
					},
				},
			});
		}
	}

	chartOptionAssocation(libelle, id, type) {
		var ctx = document.getElementById("canvas1");
		if (type == "pie" || type == "doughnut") {
			this.dash1 = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد الجمعيات",
							data: id,
							backgroundColor: libelle.map(
								() =>
									`rgba(${this.getRandomNumber(
										0,
										255
									)},${this.getRandomNumber(
										0,
										255
									)} ,${this.getRandomNumber(0, 255)} , 1)`
							),
							borderWidth: 0,
							fill: true,
						},
					],
				},
				options: {
					legend: {
						display: true,
					},
				},
			});
		} else {
			this.dash = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد ",
							data: id,
							backgroundColor: libelle.map(
								() =>
									`rgba(${this.getRandomNumber(
										0,
										255
									)},${this.getRandomNumber(
										0,
										255
									)} ,${this.getRandomNumber(0, 255)} , 1)`
							),
							//borderColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							borderWidth: 0,
							fill: false,
						},
					],
				},
				options: {
					legend: {
						display: false,
					},
					scales: {
						xAxes: [
							{
								display: true,
							},
						],
						yAxes: [
							{
								display: true,
								ticks: {
									beginAtZero: true,
								},
							},
						],
					},
				},
			});
		}
	}
}
export interface affaireData {
	num: string;
	nom: string;
	defendresse: string;
	tribunal: string;
	typeAffaire: string;
	demandresse: string;
	dateDebut: string;
}
