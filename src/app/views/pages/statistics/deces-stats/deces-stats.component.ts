import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Workbook } from "exceljs";
import { InterfaceArrondissement } from '../../parametrage-bmh/list-arrondissement/list-arrondissement.component';
import { affaireData } from '../dashboard/dashboard.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from "../../../../../environments/environment";
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import * as logo from "../../utils/logo.js";
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
@Component({
  selector: 'kt-deces-stats',
  templateUrl: './deces-stats.component.html',
  styleUrls: ['./deces-stats.component.scss']
})
export class DecesStatsComponent implements OnInit {
  searchForm: FormGroup;
  datef = null;
	dated = null;
  public xAxisData = [];
	
	tableData: any[] = [];
	public yAxisData = [];

	arrondissements: any[];


  AoLength: any;
	ExLength: any;


	datas: [][];
	// sexes: string[];
	arrondis : any[];
	sexesContater : string[];
	constater : string[];
	decesData: any[];
	filtredData: any[]=[];
	dataa: any[][] = [];
	dataConst: any[][] = [];
  dataAnalyse : any[][]=[];
	filtred2Data: any[]=[];
  filtred3Data: any[]=[];
  filtred4Data: any[]=[];
	deces2Data: any[];
  // statisticsData: any[] = [];
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
	
	dash;
	dash1;
	chartType = "pie";
	chartType1 = "bar";
	sizeData: number = 0;

	idassoction = 0;
  statisticsData: any[] = [];
  statisticsDataEx: any[] = [];
  statisticsDataAu: any[] = [];
  statisticsDataPr: any[] = [];
  sexes: string[] = ['Homme', 'Femme', 'NN', 'NRS', 'Enfant', 'Indéterminé'];
  nationalities: string[] = ['Marocain', 'Etrangers'];
  analyses : string[] = ['Toxico','Anapath','Génétique'];
  medico: string[] = [];
  constructor(
		private fb: FormBuilder,
		private translate: TranslateService,
		private datePipe: DatePipe,
		private router: Router,
		private http: HttpClient
	) { }
	dataSource: MatTableDataSource<any>;
  @ViewChild('excelTable', { static: false }) excelTable!: ElementRef;
	@ViewChild('excelTableDom', { static: false }) excelTableDom!: ElementRef;
  @ViewChild('excelTable3', { static: false }) excelTable3!: ElementRef;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
  ngOnInit() {
		this.searchForm = this.fb.group({
			arrondissement:[''],
			dated:[''],
			datef:['']
		});
    // this.fetchStatisticsData();
    this.fetchStatisticsDataEx();
    // this.fetchStatisticsDataAu();
    // this.fetchStatisticsDataPr()
  }
  reset() {
		this.searchForm.reset({
		  dated: null,
		  datef: null
		});
	  }
  fetchStatisticsDataEx() {
    this.http.get<any>(`${this.baseUrl}examenn/statistics-examens`, { headers: this.headers }).subscribe(
        (data) => {
          this.statisticsDataEx = data;
          if(this.dated == null && this.datef == null){
             this.filtred3Data = this.statisticsDataEx
          }  
          },
        (error) => {
            console.error('Error fetching statistics data:', error);
        }
    );
    this.http.get<any>(`${this.baseUrl}autopsie/statistics-autopsie`, { headers: this.headers }).subscribe(
      (data) => {
          this.statisticsDataAu = data;
          if(this.dated == null && this.datef == null){
            this.filtred2Data = this.statisticsDataAu
          }
          const labels = ['Examens','Autopsie']
          this.ExLength = this.filtred3Data.reduce((acc, curr) => acc + curr.NombreDeExams, 0);
          this.AoLength = this.filtred2Data.reduce((acc, curr) => acc + curr.NombreDeExams, 0);
          const totalRowsArray = [this.ExLength, this.AoLength];
          const datas = this.statisticsDataEx.map(con =>  this.getTotalRowValueEx(con.Sexe));        
          this.createChart(labels,totalRowsArray)
      },
      (error) => {
          console.error('Error fetching statistics data:', error);
      }
    );
    this.http.get<any>(`${this.baseUrl}prlv/statistics-prelvements`, { headers: this.headers }).subscribe(
      (data) => {
          this.statisticsDataPr = this.processStatisticsData(data);
          
          if(this.dated == null && this.datef == null){
            this.filtred4Data = this.statisticsDataPr
          }
         
          this.analyses = Array.from(new Set(this.statisticsDataPr.map(item => item.AnalyseType)));
          const uniqueNationalities = Array.from(new Set(this.filtred4Data.map(item => item.AnalyseType)));
          const totals = uniqueNationalities.map(nat => this.getTotalRowValueByAnalyse(nat));
          this.createChart3(this.analyses,totals)
      },
      (error) => {
          console.error('Error fetching statistics data:', error);
      }
    );
    this.http.get<any>(`${this.baseUrl}defunt/count-defunts`, { headers: this.headers }).subscribe(
      (data) => {
          this.statisticsData = this.processStatisticsData(data);

          if(this.dated == null && this.datef == null){
            this.filtredData = this.statisticsData
          }

          this.nationalities = Array.from(new Set(this.statisticsData.map(item => item.Nationalite)));
          this.sexes = Array.from(new Set(this.statisticsData.map(item => item.Sexe)));
          const uniqueNationalities = Array.from(new Set(this.filtredData.map(item => item.Nationalite)));
          const totals = uniqueNationalities.map(nat => this.getTotalRowValueByNat(nat));
          this.createChart2(this.nationalities, totals);
        },
      (error) => {
          console.error('Error fetching statistics data:', error);
      }
    );
  }
//   fetchStatisticsDataAu() {
//     this.http.get<any>(`${this.baseUrl}autopsie/statistics-autopsie`, { headers: this.headers }).subscribe(
//         (data) => {
//             this.statisticsDataAu = data;
//             const labels = ['Examens','Autopsie']
//             this.AoLength = this.statisticsDataAu.reduce((acc, curr) => acc + curr.NombreDeExams, 0);
//             const totalRowsArray = [this.ExLength, this.AoLength];
//             const datas = this.statisticsDataEx.map(con =>  this.getTotalRowValueEx(con.Sexe));        
//             this.createChart(labels,totalRowsArray)
//         },
//         (error) => {
//             console.error('Error fetching statistics data:', error);
//         }
//     );
//   }



//   fetchStatisticsDataPr() {
//     this.http.get<any>(`${this.baseUrl}prlv/statistics-prelvements`, { headers: this.headers }).subscribe(
//         (data) => {
//             this.statisticsDataPr = this.processStatisticsData(data);
//             this.analyses = Array.from(new Set(this.statisticsDataPr.map(item => item.AnalyseType)));
//             const uniqueNationalities = Array.from(new Set(this.statisticsDataPr.map(item => item.AnalyseType)));
//             const totals = uniqueNationalities.map(nat => this.getTotalRowValueByAnalyse(nat));
//             this.createChart3(this.analyses,totals)
//         },
//         (error) => {
//             console.error('Error fetching statistics data:', error);
//         }
//     );
//   }


// fetchStatisticsData() {
//     this.http.get<any>(`${this.baseUrl}defunt/count-defunts`, { headers: this.headers }).subscribe(
//         (data) => {
//             this.statisticsData = this.processStatisticsData(data);
//             this.nationalities = Array.from(new Set(this.statisticsData.map(item => item.Nationalite)));
//             this.sexes = Array.from(new Set(this.statisticsData.map(item => item.Sexe)));
//             const uniqueNationalities = Array.from(new Set(this.statisticsData.map(item => item.Nationalite)));
//             const totals = uniqueNationalities.map(nat => this.getTotalRowValueByNat(nat));
//             console.log(totals)
//             this.createChart2(this.nationalities, totals);
//           },
//         (error) => {
//             console.error('Error fetching statistics data:', error);
//         }
//     );
// }


getRandomNumberr(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



// export excel //

exportToExcel() {

  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.getTableDataConst());

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  const table: HTMLTableElement = this.excelTableDom.nativeElement;
  const rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
  const jsonData: any[] = [];
  for (let i = 1; i < rows.length; i++) {
    
    const row: HTMLTableRowElement = rows[i];
    const rowData: any = {};
    for (let j = 0; j < row.cells.length; j++) {
    
    const cell: HTMLTableCellElement = row.cells[j];
    rowData[`column${j + 1}`] = cell.innerText;
    }

    jsonData.push(rowData);
  }
  console.log("json : ", jsonData)
  let columns = this.dataConst[0];
  console.log("cols :",columns)
  this.saveAsExcelFile("BMH (Décès enregistrés à la morgue communale - Adulte)", columns, jsonData, "Adulte", "Décès enregistrés à la morgue communale ");
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

private getTableDataAnalyse(): any[][] {
  const table = document.getElementById('exportDataAnalyse');
  if (table) {
    const rows = table.querySelectorAll('tr');
    rows.forEach(row => {
      const rowData: any[] = [];
      row.querySelectorAll('th, td').forEach(cell => {
        rowData.push(cell.textContent);
      });
      this.dataAnalyse.push(rowData);
    });
  }
  return this.dataAnalyse;
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
  this.saveAsExcelFile("BMH (Décès enregistrés à la morgue communale - Nombre d'experises médico-légales)", columns, jsonData, "Médico-légales", "Décès enregistrés à la morgue communale ");
  // this.getTableData()
}

exportToExcel3() {
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.getTableDataAnalyse());

  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  const table: HTMLTableElement = this.excelTable3.nativeElement;
  const rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
  const jsonData: any[] = [];
  for (let i = 1; i < rows.length; i++) {
    
    const row: HTMLTableRowElement = rows[i];
    const rowData: any = {};
    for (let j = 0; j < row.cells.length; j++) {
    
    const cell: HTMLTableCellElement = row.cells[j];
    rowData[`column${j + 1}`] = cell.innerText;
    }

    jsonData.push(rowData);
  }
  console.log("json : ", jsonData)
  let columns = this.dataAnalyse[0];
  console.log("cols :",columns)
  this.saveAsExcelFile("BMH (Décès enregistrés à la morgue communale - Nombre de prélèvement pour analyse)", columns, jsonData, "Nombre de prélèvement pour analyse", "Nombre de prélèvement pour analyse");
}

private getTableData(): any[][] {
  // Get the table element
  const table = document.getElementById('exportDataSurvenus');
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



//              //


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
		  type: "doughnut",
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

    createChart3(labels: string[], data: number[]) {
      const ctx = document.getElementById('canva3') as HTMLCanvasElement;
      new Chart(ctx, {
        type: "doughnut",
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

getCellValue(nationality: string, sex: string): number {
    return this.filtredData.filter(d => d.Nationalite === nationality && d.Sexe === sex ).reduce((acc, curr) => acc + curr.Total, 0);
}

getTotalRowValueByNat(nat: string): number {
  const filteredDatas = this.filtredData.filter(d => d.Nationalite === nat);
  const total = filteredDatas.reduce((acc, curr) => acc + curr.Total, 0)
  return total;
}

getTotalRowValueByAnalyse(analyse: string): number {
  const filteredDatas = this.filtred4Data.filter(d => d.AnalyseType === analyse);
  const total = filteredDatas.reduce((acc, curr) => acc + curr.NombreDePrelevements, 0)
  return total;
}

getTotalRowValue(sex: string): number {
  return this.filtredData.filter(d => d.Sexe === sex).reduce((acc, curr) => acc + curr.Total, 0);
}

getCellValuePr(sex: string, analyse: any): number {
  return this.filtred4Data.filter(d => d.AnalyseType === analyse && d.Sexe === sex ).reduce((acc, curr) => acc + curr.NombreDePrelevements, 0);
}
getTotalRowValuePr(sex: string): number {
  return this.filtred4Data.filter(d => d.Sexe === sex).reduce((acc, curr) => acc + curr.NombreDePrelevements, 0);
}

getCellValueEx(sex: string): number {
 return this.filtred3Data.filter(d => d.Sexe === sex).reduce((acc, curr) => acc + curr.NombreDeExams, 0);
}


getTotalRowValueEx(sex: string): number {
  const mergedData = [...this.filtred3Data, ...this.filtred2Data];
  return mergedData.filter(d => d.Sexe === sex).reduce((acc, curr) => acc + curr.NombreDeExams, 0);
}


getCellValueAu(sex: string, autopsie: string): number {
  return this.filtred2Data.filter(d => d.Sexe === sex).reduce((acc, curr) => acc + curr.NombreDeExams, 0);
}



  processStatisticsData(data: any[]): any[] {
    console.log('data 21 : ',data)
    return data;
  }










  filterDecesData() {
		this.dated = this.searchForm.get('dated').value;
		this.datef = this.searchForm.get('datef').value;
		
		if(this.dated != null || this.datef != null ){
			this.filtredData = this.statisticsData
			this.filtred2Data = this.statisticsDataAu
      this.filtred4Data = this.statisticsDataPr
			this.filtred3Data = this.statisticsDataEx


			this.filtredData = this.filtredData.filter(item => {	
			const date = new Date(item.LatestCreatedAt);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0'); 
			const day = String(date.getDate()).padStart(2, '0');
			const createdAt = `${year}-${month}-${day}`;
			console.log("createdAt :",createdAt)
			return createdAt >= this.dated && createdAt <= this.datef;
		});
		
		this.filtred2Data = this.filtred2Data.filter(item => {	
			const date = new Date(item.CreatedAt);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0'); 
			const day = String(date.getDate()).padStart(2, '0');
			const createdAt = `${year}-${month}-${day}`;
			console.log("createdAt :",createdAt)
			return createdAt >= this.dated && createdAt <= this.datef;
		});


    this.filtred3Data = this.filtred3Data.filter(item => {	
			const date = new Date(item.CreatedAt);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0'); 
			const day = String(date.getDate()).padStart(2, '0');
			const createdAt = `${year}-${month}-${day}`;
			console.log("createdAt :",createdAt)
			return createdAt >= this.dated && createdAt <= this.datef;
		});
		
		this.filtred4Data = this.filtred4Data.filter(item => {	
			const date = new Date(item.CreatedAt);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0'); 
			const day = String(date.getDate()).padStart(2, '0');
			const createdAt = `${year}-${month}-${day}`;
			console.log("createdAt :",createdAt)
			return createdAt >= this.dated && createdAt <= this.datef;
		});

		// console.log("filtred data :", this.filtredData);
		// console.log("deces data : ", this.decesData)
		}else {
			this.filtredData = this.statisticsData.slice();
			this.filtred2Data = this.statisticsDataAu.slice();
      this.filtred3Data = this.statisticsDataEx.slice();
			this.filtred4Data = this.statisticsDataPr.slice();
		}
		this.fetchStatisticsDataEx()
	}



}
