import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatRadioChange, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { InitFormPatrimoineDTO } from '../../patrimoine-communal/patrimoine/dtos/InitFormPatrimoineDTO';
import { PatrimoineService } from '../../patrimoine-communal/services/patrimoine.service';
import { AoService } from '../../shared/ao.service';

@Component({
  selector: 'kt-dashboard-division-marche',
  templateUrl: './dashboard-division-marche.component.html',
  styleUrls: ['./dashboard-division-marche.component.scss']
})
export class DashboardDivisionMarcheComponent implements OnInit {

  public yAxisData = [];
  divisions: any[]= [];
  origines: any[]= [];
  types: any[]= [];
  references: any[]= [];
  villes: any[]= [];
  arrondissements: any[]= [];
	isLoading = true;
	searchForm: FormGroup;
  typeMarcheAll:any[];
	dash;
	chartType = "bar";
	sizeData:number = 0;
	// ============================================
	// constructeur
	// ============================================
	constructor(
		private service: AoService,
		private fb: FormBuilder,
		private translate: TranslateService,
		private datePipe: DatePipe,
    private patrimoineService: PatrimoineService,
	) {}
	// getter pour acceder au champs fourmulaire
	get f() { return this.searchForm.controls; }
	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = [
		// "id",
		"NumMarche",
		"prestation",
		"mntAdjucataire",
		"MntEngage",
		"cautionDefinitive",
		"dateDebutMarche",
		"modePassation"
	];
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;

	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
    this.service.getAllTypeMarche().subscribe((data) => {
			this.typeMarcheAll = data;
		});
		this.searchForm = this.fb.group({
			type: ["", Validators.required],
		dateDebut: ["", ],
			dateFin: ["",],
      typeMarche: ["",]
     
		});

		// get datasource
	//	this.getData();
	//	this.getDataDropDownList();
	}


  getTypesByNaturePAtrimoine():any[]{
    console.log(this.searchForm.value);
	  if(this.searchForm.value.naturePAtrimoine)
	  return this.types.filter((element) => element.naturePatrimoine == this.searchForm.value.naturePAtrimoine);
	  return [];
  }
	// ============================================
	// OnSubmit
	// ============================================

	onSubmit() {
		const _this = this;
    var dateDebut = this.searchForm.get("dateDebut").value;
    var dateFin = this.searchForm.get("dateFin").value;
    dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
    dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
          if(this.searchForm.value.type==='1'){
          
			this.service.getStatMarchebyPeriode(dateDebut,dateFin).subscribe((data) => {
				console.log('date   serech ')
				console.log(JSON.stringify(data));
				let col = data.map((data) => data.nombre);
					let row = data.map((data) =>  data.typePrestation);
					this.chartOption(row, col, this.chartType);
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				})
				this.service.getDataMarchebyPeriode(dateDebut,dateFin).subscribe((data) => {
				console.log(data)	;
				this.isLoading = false;
				this.dataSource = new MatTableDataSource(data);
				this.dataSource.paginator = this.paginator;
				this.dataSource.sort = this.sort;
				},err => {
				_this.sizeData = 0;
				this.isLoading = false;
				})
			
		}
		  if(this.searchForm.value.type==='2'){
			this.service.getStatMarchebyPeriodeAndType(dateDebut, dateFin,this.searchForm.value.typeMarche).subscribe((data) => {
					console.log("Data AfterView : " + JSON.stringify(data));
					let col = data.map((data) => data.nombre);
					let row = data.map((data) =>  data.typePrestation);
					this.chartOption(row, col, this.chartType);
						},
				(err) => {
					this.isLoading = false;
					console.log(err);
				})
				this.service.getDataMarchebyPeriodeAndType(dateDebut,dateFin,this.searchForm.value.typeMarche).subscribe((data) => {
					console.log(data)	;
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					_this.sizeData = data.length;
					///	this.getDataSource(data);
					//	this.isLoading = false;
					},err => {
					_this.sizeData = 0;
					this.isLoading = false;
					})
		  } if(this.searchForm.value.type==='3'){
			this.service.getStatMarcheByretard().subscribe((data) => {
				console.log('date   serech ')
				console.log(JSON.stringify(data));
					this.isLoading = false;
					let col = [ data.length]
								_this.sizeData = data.length;
								this.getDataSource(data);
								this.isLoading = false;
								console.log("Data AfterView : " + JSON.stringify(data));
								
			        	let row = ["Nombre de projet en retard"];
							this.chartOption(row, col, this.chartType);
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				})
		  }
		  if(this.searchForm.value.type==='4'){
			this.service.getStatMarcheByRetardMois().subscribe((data) => {
				console.log('date   serech ')
				console.log(JSON.stringify(data));
					this.isLoading = false;
								let col = [data.length]
								_this.sizeData = data.length;
								this.getDataSource(data);
								this.isLoading = false;
								console.log("Data AfterView : " + JSON.stringify(data));
							
			        	let row = ["Nombre de projet en retard"];
						//	this.displayedColumns=["Nombre de projet en retard"];
							this.chartOption(row, col, this.chartType);
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				})
		  }
		  if(this.searchForm.value.type==='5'){
			this.service.getStatMarcheByPenaliteAndMoratoires().subscribe((data) => {
				console.log('date   serech ')
				console.log(JSON.stringify(data));
				//	_this.sizeData = data.length;
				//	{"nbrPenalite":2,"nbrMoratoire":2}

					this.isLoading = false;
					var d:any[]=[];
					d[0]=data;
					console.log(d)
								_this.sizeData = d.length;
								//this.getDataSource(d);
								this.isLoading = false;
								console.log("Data AfterView : " + JSON.stringify(data));
								let col =[data.nbrPenalite];
							let row =["Nombre de projet ayant des pénalités"];
							this.chartOption(row, col, this.chartType);
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				})
				this.service.getDataMarcheByPenalite().subscribe((data) => {
					console.log(data)	;
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					_this.sizeData = data.length;
					///	this.getDataSource(data);
					//	this.isLoading = false;
					},err => {
					_this.sizeData = 0;
					this.isLoading = false;
					})
		  }
		  if(this.searchForm.value.type==='6'){
			this.service.getStatMarcheByPenaliteAndMoratoires().subscribe((data) => {
				console.log('date   serech ')
				console.log(JSON.stringify(data));

					this.isLoading = false;
					var d:any[]=[];
					d[0]=data;
					console.log(d)
								_this.sizeData = d.length;
								//this.getDataSource(d);
								this.isLoading = false;
								console.log("Data AfterView : " + JSON.stringify(data));
								let col =[data.nbrMoratoire];
							let row =["Nombre de projet ayant des moratoires"];
							this.chartOption(row, col, this.chartType);
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				})
				this.service.getDataMarcheBymoratoire().subscribe((data) => {
					console.log(data)	;
					this.isLoading = false;
					this.dataSource = new MatTableDataSource(data);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					_this.sizeData = data.length;
					///	this.getDataSource(data);
					//	this.isLoading = false;
					},err => {
					_this.sizeData = 0;
					this.isLoading = false;
					})
		  }
		
		
	}

	
	// ============================================
	// Charger les liste externe
	// ============================================
	getDataDropDownList() {
	/*	this.service.getData().subscribe(
			(data) => {
				this.types = data[0];
			},
			(err) => {
				console.log(err);
			}
		);*/
	}
	// ============================================
	// OnChange radio
	// ============================================
	selectionChanged(event: MatRadioChange) {
		console.log(event)
		var type = this.searchForm.get("type").value;
		this.chartType= event.value;
		if(type==='1' || type==='2'|| type==='3'|| type==='4'|| type==='5' || type==='6'){
			//this.fillChartByParam(this.searchForm.value.arrondissement, event.value);
			this.onSubmit();
		}
	}

	// ============================================
	// get data
	// ============================================
// ==================================================================
  //
  // ==================================================================
  getData() {
    this.patrimoineService.getInitformPatrimoine()
      .subscribe((obj:InitFormPatrimoineDTO) => {
        this.origines = obj.origines;
        this.types = obj.typepatrimoines;
      //this.divisions = obj.divisions;
      //  this.references = obj.typeReferenceFoncieres;
        this.arrondissements = obj.arrondissementPatrimoines;

      }, err => {
        console.log(err);
      }
      );
  }
	// ============================================
	//
	// ============================================
	getDataSource(data: any) {
		this.dataSource = new MatTableDataSource(data);
		this.paginator._intl.itemsPerPageLabel = this.translate.instant(
			"PAGES.GENERAL.ITEMS_PER_PAGE_LABEL"
		);
		this.paginator._intl.nextPageLabel = this.translate.instant(
			"PAGES.GENERAL.NEXT_PAGE_LABEL"
		);
		this.paginator._intl.previousPageLabel = this.translate.instant(
			"PAGES.GENERAL.PREVIOUS_PAGE_LABEL"
		);
		this.paginator._intl.lastPageLabel = this.translate.instant(
			"PAGES.GENERAL.LAST_PAGE_LABEL"
		);
		this.paginator._intl.firstPageLabel = this.translate.instant(
			"PAGES.GENERAL.FIRST_PAGE_LABEL"
		);
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
		anchor.href = document.getElementsByTagName("canvas")[0].toDataURL();
		anchor.download = "chart.jpg";
	}
	// ============================================
	// Refresh datatable & graph
	// ============================================
	refresh() {
		this.dataSource = new MatTableDataSource(null);
		this.isLoading = true;
		this.searchForm.reset();
		this.dash.destroy();
		this.getData();
	//	this.ngAfterViewInit();
	}


   // ==================================================================
  //
  // ==================================================================
  /**
   * Checking control validation
   *
   * @param controlName: string => Equals to formControlName
   * @param validationType: string => Equals to valitors name
   */
   isControlHasError(controlName: string, validationType: string): boolean {
    const control = this.searchForm.controls[controlName];
    if (!control) {
      return false;
    }

    const result = control.hasError(validationType) && (control.dirty || control.touched);
    return result;
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
							label: "عدد  الاسواق",
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
							label: "عدد  الاسواق",
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
