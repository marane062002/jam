import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatRadioChange, MatSort, MatTableDataSource } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { BoServiceService } from '../../../utils/bo-service.service';
import { PatrimoineService } from '../../services/patrimoine.service';
import { InitFormPatrimoineDTO } from '../dtos/InitFormPatrimoineDTO';
import { BienscommunalService } from '../../services/bienscommunal.service';

@Component({
  selector: 'kt-dashboard-marche',
  templateUrl: './dashboard-marche.component.html',
  styleUrls: ['./dashboard-marche.component.scss']
})
export class DashboardMarcheComponent implements OnInit {

  public xAxisData = [];
	public yAxisData = [];
  divisions: any[]= [];
  origines: any[]= [];
  types: any[]= [];
  references: any[]= [];
  villes: any[]= [];
  Marches: any[]= [];
  arrondissements: any[]= [];
	isLoading = true;
	searchForm: FormGroup;
	dash;
	chartType = "bar";
	sizeData:number = 0;

	options = {
		fieldSeparator: ',',
		quoteStrings: '"',
		decimalseparator: '.',
		headers: ['column 1 header', 'column 2 header'],
		showTitle: true,
		useBom: true,
		removeNewLines: false,
		keys: []
	  };
	  dataExport:any=[];
	// ============================================
	// constructeur
	// ============================================
	constructor(
		private service: PatrimoineService,
		private fb: FormBuilder,
		private translate: TranslateService,
		private datePipe: DatePipe,
    private patrimoineService: PatrimoineService,
    private MarcheService:BienscommunalService,
	) {}
	// getter pour acceder au champs fourmulaire
	get f() { return this.searchForm.controls; }
	// ============================================
	//
	// ============================================
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] =[]//=["Nombre de voie",	"type"];
	@ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: false }) sort: MatSort;
	@ViewChild('TABLE', { static: false }) table: any;

	// ============================================
	// ngOninit
	// ============================================
	ngOnInit() {
	this.searchForm = this.fb.group({
	type: ["", Validators.required],
	marcheId: ["", ]
		});

		// get datasource
    this.MarcheService.getMarches().subscribe(res=>{
    console.log(res);
    this.Marches=res[0];
    },err=>{
      console.log(err)
    })
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
console.log(this.searchForm.value)
		if(this.searchForm.value.type==='1'){
			const _this = this;
			this.MarcheService.getCountMagasinAndSeanceByMarche(this.searchForm.value.marcheId).subscribe((data) => {
				console.log('date   serech ')
				console.log(JSON.stringify(data));


        var d:any[]=[];
        d[0]=data;
					_this.sizeData = d.length;
					this.getDataSource(d);
					this.isLoading = false;
					console.log("Data AfterView : " + JSON.stringify(data));
					let col =[data.nuberMag,data.numberSeace];
				let row =["Nombre Magasin",	"Nombre boutique"];
			      this.displayedColumns=["Nombre Magasin",	"Nombre boutique"];
					//console.log("List of labels: " + dateExpedetion);
				//	this.dash.destroy();
		this.chartOption(row, col, this.chartType);
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
		}
		if(this.searchForm.value.type==='2'){
			const _this = this;
			this.service.findCountClasseMarche().subscribe((data) => {
				console.log('date   serech ')
				console.log(JSON.stringify(data));
					_this.sizeData = data.length;
					this.getDataSource(data);
					this.isLoading = false;
					//console.log("Data AfterView : " + JSON.stringify(data));
					let col = data.map((data) => data.nbrPatremoine);
					let row = data.map((data) =>  data.categorie ==='OUI' ?"Classé":"Non Classé");
				this.displayedColumns=["classe",	"NBRPatremoine"];
					//console.log("List of labels: " + dateExpedetion);
				//	this.dash.destroy();
					this.chartOption(row, col, this.chartType);
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
		}
		if(this.searchForm.value.type==='3'){
			const _this = this;
			this.service.findCountStatutGroup().subscribe((data) => {
				console.log('date   serech ')
				console.log(JSON.stringify(data));
					_this.sizeData = data.length;
					this.getDataSource(data);
					this.isLoading = false;
					//console.log("Data AfterView : " + JSON.stringify(data));
					let col = data.map((data) => data.nbrPatremoine);
					let row = data.map((data) =>  data.categorie ==='1' ?"immatriculé":data.categorie ==='2' ?" non immatriculé" : "en cours d’immatriculation");
				this.displayedColumns=["Statut",	"NBRPatremoine"];
					//console.log("List of labels: " + dateExpedetion);
				//	this.dash.destroy();
					this.chartOption(row, col, this.chartType);
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
			
		}
		if(this.searchForm.value.type==='4'){
			const _this = this;
			this.service.getTotalSuperficieByType(this.searchForm.value.types).subscribe((data) => {
				console.log('date   serech ')
				console.log(JSON.stringify(data));
					_this.sizeData = data.length;
					this.getDataSource(data);
					this.isLoading = false;
					//console.log("Data AfterView : " + JSON.stringify(data));
					let col = data.map((data) => data.nbrPatremoine);
					let row = data.map((data) =>  data.categorie);
				this.displayedColumns=["type de bien",	"Surface total (ha)"];
					//console.log("List of labels: " + dateExpedetion);
				//	this.dash.destroy();
					this.chartOption(row, col, this.chartType);
				},
				(err) => {
					this.isLoading = false;
					console.log(err);
				}
			);
			
		}
	/* 	console.log(this.searchForm.value)
		const controls = this.searchForm.controls;
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach((controlName) =>
				controls[controlName].markAsTouched()
			);
			return;
		}
		var type = this.searchForm.get("type").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");

		var type = this.searchForm.get("type").value;
		var dateDebut = this.searchForm.get("dateDebut").value;
		var dateFin = this.searchForm.get("dateFin").value;
		dateDebut = this.datePipe.transform(dateDebut, "yyyy-MM-dd");
		dateFin = this.datePipe.transform(dateFin, "yyyy-MM-dd");
		this.fillChartByParam(type, this.chartType); */
	}

	// ============================================
	// Charger les statistiques sous forme graphe
	// ============================================
	fillChartByParam(type, chartType) {
		const _this = this;
		console.log(chartType);

		this.service.getSatatPAermoineByCategorie(type).subscribe((data) => {
				console.log('date   serech ')
				console.log(JSON.stringify(data));
					_this.sizeData = data.length;
					this.getDataSource(data);
					this.isLoading = false;
					//console.log("Data AfterView : " + JSON.stringify(data));
					let col = data.map((data) => data.nbrPatremoine);
					let row = data.map((data) =>  data.categorie);
					
					//console.log("List of labels: " + dateExpedetion);
				//	this.dash.destroy();
					this.chartOption(row, col, chartType);
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
		//var origine = this.searchForm.get("origine").value;
		var type = this.searchForm.get("type").value;
		this.chartType= event.value;
		if(type==='1' || type==='2'|| type==='3' || type==='4'){
			//this.fillChartByParam(this.searchForm.value.arrondissement, event.value);
			this.onSubmit();
		}
		/* if (event.value == "pie" || event.value == "doughnut") {
			
		} else if (event.value == "bar" || event.value == "line") {
			this.fillChartByParam(type, event.value);
		} */
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
		this.dataExport=data;
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
							label: "عدد المراسلات الواردة",
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
							label: "عدد المراسلات الواردة",
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
