import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatOptionSelectionChange, MatPaginator, MatRadioChange, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { delay, sample } from 'lodash';
import { OrganisationService } from '../../../organisation/organisation.service';
import { AssociationService } from '../../../utils/association.service';
import { SaerchSubventionDTO } from '../../../utils/class/saerch-subvention-dto';
import { SubventionsService } from '../../../utils/subventions.service';

@Component({
  selector: 'kt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public xAxisData = [];
	public yAxisData = [];
	types;
	arrondissements: any;
	isLoading = true;
	searchForm: FormGroup;
	dash;
	chartType1
	chartType = 'bar';
	sizeData:number = 0;
	Saerch
	listAssocaition:any[];
	dash1;
	idassoction=0;
	// ============================================
	// constructeur
	// ============================================
	constructor(
		private service: SubventionsService,
		private service2: OrganisationService,
		private fb: FormBuilder,
		private translate: TranslateService,
		private datePipe: DatePipe,
		private service3: AssociationService,
	) {}

	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ["nbProject","Statut"];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
	dataSourceProjet: MatTableDataSource<any>;
	displayedColumnsProjet: string[] = ["nomProjet","responsableProjet","statutProjet"];
	@ViewChild(MatPaginator, { static: true }) paginatorProjet: MatPaginator;
    @ViewChild(MatSort, { static: true }) sortProjet: MatSort;

	// ============================================
	// ngOninit
    // ============================================
	ngOnInit() {
		this.searchForm = this.fb.group({
			dateDebut: ["", Validators.required],
			dateFin: ["", Validators.required],
			statutProjet: ["",Validators.required],
		});

		// get datasource
		this.getData();
		this.getDataDropDownList();
	}

    // ============================================
	// ngAfterView
	// ============================================
	ngAfterViewInit() {
		this.service.getAllObject("/association/all").subscribe(
			(data) => {
				//console.log("Data AfterView : " + JSON.stringify(data));
				let nbrAssoc = data.map((data) => data.nbAssociation);
				let typeAssoc = data.map((data) => data.type);
				//console.log("List of labels: " + typeAssoc);
				this.chartOption(typeAssoc, nbrAssoc, this.chartType);
			},
			(error) => {
				console.log("Something went wrong.");
			}
		);
	}
	// ============================================
	// OnSubmit
  // ============================================

	onSubmit() {
		const controls = this.searchForm.controls;
		/** check form */
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		var statutProjet = this.searchForm.get("statutProjet").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		this.Saerch =new SaerchSubventionDTO(statutProjet,dateDebut,dateFin);
	
		//console.log("Type : " + JSON.stringify(type));
		//console.log("Commune : " + JSON.stringify(commune));

		this.fillChartByParam(this.Saerch);
	
  }
  selectAssoication(event:MatOptionSelectionChange ){
	console.log(event.isUserInput)
	//this.dash1.destroy();
	if(event.isUserInput){
	   this.idassoction=event.source.value;
	   this.chartType1="bar";
	   var dateDebut = this.searchForm.get("dateDebut").value;
	   var dateFin = this.searchForm.get("dateFin").value;
	    var s =new SaerchSubventionDTO(null,dateDebut,dateFin);
	   this.service.getStatSUbvenstionByAss(event.source.value,s).subscribe(res=>{
		   let data:any=res;
		   this.dataSourceProjet = new MatTableDataSource(data);
		   this.paginatorProjet._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
		   this.paginatorProjet._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
		   this.paginatorProjet._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
		   this.paginatorProjet._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
		   this.paginatorProjet._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
		   this.dataSourceProjet.paginator = this.paginator;
		   this.dataSourceProjet.sort = this.sort;
		//   let nbrAssoc = data.map((data) => data.nbSubention);
		//   let typeAssoc = data.map((data) => data.satutProject==1 ? "تم التنفيد" : data.satutProject== 3 ? "في طور التنفيذ":" لم تتم العملية" );
		 //  this.chartOptionAssocation(nbrAssoc,typeAssoc, this.chartType1);
		   console.log(res)
	   },err=>{
		   console.log(err)
	   })
	}
   
	 }
	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
  fillChartByParam(Saerch) {
	const _this = this;

	this.service.getAllStatSubention(Saerch).subscribe(	(data) => {
	
		console.log(data)
		console.log(data.map((data) => data.nom))
		this.service3.getALLAssByIds("/association",data.map((data) => data.nom)).subscribe(res=>{
			this.listAssocaition=res;
		},err=>{
			console.log(err)
		});
				_this.sizeData = data.length;
				this.getDataSource(data);
				this.isLoading = false;
			
				let nbrAssoc = data.map((data) => data.nbSubention);
				let typeAssoc = data.map((data) => data.satutProject==1 ? "تم التنفيد" : data.satutProject== 3 ? "في طور التنفيذ":" لم تتم العملية" );
				console.log("List of labels: " + typeAssoc);
			//	this.dash.destroy();
				this.chartOption(typeAssoc, nbrAssoc, this.chartType);
			},
			(err) => {
				this.isLoading = false;
				console.log(err);
			}
		); 
  }

  
	// ============================================
	// Charger les liste externe
	// ============================================
	getDataDropDownList() {
		this.service.getData().subscribe(
			(data) => {
				this.types = data[1];
				console.log(data[1]);
			},
			(err) => {
				console.log(err);
			}
    );
    this.service2.getRessource("/arrondissements/index").subscribe((data) => {
		(this.arrondissements = data), console.log(data);
	});
	}
	// ============================================
	// OnChange radio
	// ============================================
	selectionChanged(event: MatRadioChange) {
      console.log(event)
		this.chartType=event.value;
    const controls = this.searchForm.controls;
		/** check form */
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
    }

		if (event.value == "pie" || event.value == "doughnut") {
      this.fillChartByParam(this.Saerch);
		}else if (event.value == "bar" || event.value == "line"){
      this.fillChartByParam(this.Saerch);
		}
	}
/* 	selectionChanged1(event: MatRadioChange) {
		this.chartType1 = event.value;
		console.log(event);
		this.service.getStatSUbvenstionByAss(this.idassoction).subscribe(res=>{
			let data:any=res;
			let nbrAssoc = data.map((data) => data.nbSubention);
			let typeAssoc = data.map((data) => data.satutProject==1 ? "تم التنفيد" : data.satutProject== 3 ? "في طور التنفيذ":" لم يتم التنفيذ" );
			this.chartOptionAssocation(nbrAssoc,typeAssoc, this.chartType1);
			console.log(res)
		},err=>{
			console.log(err)
		})
	} */
	// ============================================
	//ngAfterView
	// ============================================
	getCharts() {
		this.service.getAllObject("/association/all").subscribe(
			(data) => {
				data.forEach((res) => {
					console.log("Donnees !: " + JSON.stringify(res));
					this.xAxisData.push(res.type);
					this.yAxisData.push(res.nbAssociation);
					//this.pieChart.push({value:res.nbAssociation,name:res.type});
				  });
			},
			(err) => {
				console.log(err);
			}
		);
	}

	// ============================================
	// get data
	// ============================================
	public getData() {
	const _this = this;

    this.service.getAllObject("/association/all").subscribe(	(data) => {
				console.log(data)
				_this.sizeData = data.length;	
				this.getDataSource(data);
				this.isLoading = false;
			},
			(err) => {
				console.log(err);
				this.isLoading = false;
			}
		);
	}
	// ============================================
	//
	// ============================================
	getDataSource(data:any){
		this.dataSource = new MatTableDataSource(data);
		this.paginator._intl.itemsPerPageLabel = this.translate.instant("PAGES.GENERAL.ITEMS_PER_PAGE_LABEL");
	    this.paginator._intl.nextPageLabel = this.translate.instant("PAGES.GENERAL.NEXT_PAGE_LABEL");
		this.paginator._intl.previousPageLabel = this.translate.instant("PAGES.GENERAL.PREVIOUS_PAGE_LABEL");
		this.paginator._intl.lastPageLabel = this.translate.instant("PAGES.GENERAL.LAST_PAGE_LABEL");
		this.paginator._intl.firstPageLabel = this.translate.instant("PAGES.GENERAL.FIRST_PAGE_LABEL");
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
	}
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
		// get the canvas
		anchor.href = document.getElementsByTagName('canvas')[0].toDataURL();
		anchor.download = "chart.jpg";
    }
  // ============================================
	// Refresh datatable & graph
  // ============================================
  refresh(){
    this.dataSource = new MatTableDataSource(null);
    this.isLoading = true;
    this.dash.destroy();
    this.getData()
    this.ngAfterViewInit();
  }
    // ===========================================
	// ChartJs
	// ===========================================
	chartOption(libelle, id, type) {
    var ctx = document.getElementById('canvas');
    //var ctxPie = document.getElementById('canvasPie');
		if (type == "pie" || type == "doughnut"){
			this.dash = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد الجمعيات",
							data: id,
							backgroundColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							borderColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							borderWidth: 0,
							fill: true,
						}
					],
				},
				options: {
					legend: {
						display: true,
					}
				},
			});
		}else{
			this.dash = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد الجمعيات",
							data: id,
							backgroundColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							//borderColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							borderWidth: 0,
							fill: false,
						}
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
  
  chartOptionAssocation(id,libelle, type) {
	  console.log(libelle)
	  console.log(id)
    var ctx = document.getElementById('canvas1');
    //var ctxPie = document.getElementById('canvasPie');
		if (type == "pie" || type == "doughnut"){
			this.dash1 = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد الجمعيات",
							data: id,
							backgroundColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							borderColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							borderWidth: 0,
							fill: true,
						}
					],
				},
				options: {
					legend: {
						display: true,
					}
				},
			});
		}else{
			this.dash = new Chart(ctx, {
				type: type,
				data: {
					labels: libelle, // date par ex
					datasets: [
						{
							label: "عدد الجمعيات",
							data: id,
							backgroundColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							//borderColor: libelle.map(() => `rgba(${this.getRandomNumber(0,255)},${this.getRandomNumber(0,255)} ,${this.getRandomNumber(0,255)} , 1)`),
							borderWidth: 0,
							fill: false,
						}
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
