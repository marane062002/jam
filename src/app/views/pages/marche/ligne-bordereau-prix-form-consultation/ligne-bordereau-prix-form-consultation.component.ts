import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AoService } from '../../shared/ao.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../../shared/notification.service';
import { delay } from 'rxjs/operators';
import { EditLigneBpComponent } from '../dialog-forms/edit-ligne-bp/edit-ligne-bp.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'kt-ligne-bordereau-prix-form-consultation',
  templateUrl: './ligne-bordereau-prix-form-consultation.component.html',
  styleUrls: ['./ligne-bordereau-prix-form-consultation.component.scss']
})
export class LigneBordereauPrixFormConsultationComponent implements OnInit {
// ===========================================================================
	//
	// ===========================================================================
	dataShow:any; 
	tableData: any[] = [];
	jsonData: any;
	datas: [][];
	excelTojson :any[] = [];
	formData = {
		id: 0,
		isForfait: true,
		bordereauPrix: { id: 0 },
		prixUnite: 0,
		tva: 0,
		quantite: 1,
		totalHt: 0,
		unite: "",
		designation: "",
		numPrix: "",
		prixEstimati:0
		
	};
	// ===========================================================================
	//
	// ===========================================================================
	formDataBP = { id: -1, totalHt: 0, totalTva: 0, totalTtc: 0 };
	selectedOption = 1;
	unites = [
		{ id: 1, libelle: "Forfaitaire" },
		{ id: 2, libelle: "Numérique" },
	];
	myForm: FormGroup;
	arr: FormArray;
	typeBien;
	lignes;
	idao;
	tvaLocal;
	selectedAE;
	selectedAvis;
	ao = {
		typeMarche: { libelle: "" },
		natureAo: { libelle: "" },
		bordereauPrix: { id: 0 },
	};
	EnableQte:boolean = true;
	dataSize = 0;
	// ===========================================================================
	//
	// ===========================================================================
	displayedColumns = [
		"numPrix",
		"objet",
		"unite",
		"tva",
		"prixU",
		"quantite",
		"totalHt",
		"pourcentage",
		"actions",
	];
	// ============================================================================
	// Filter datasource
	// ============================================================================
	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSourceLBP.filter = filterValue;
	}
	isLoading = true;
	// ===========================================================================
	//
	// ===========================================================================
	dataSourceLBP: MatTableDataSource<any>;
	constructor(
		private fb: FormBuilder,
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private translate: TranslateService,
		private notification: NotificationService,
		public dialog: MatDialog,
	) {
		this.populate()
	}
	// ===========================================================================
	//
	// ===========================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	//ligneBPDatasource: LigneBP[] = [];
	// ===========================================================================
	//
	// ===========================================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
		});
		this.service.getAoById(this.idao).subscribe((d) => {
			this.ao = d;

			if (d.bordereauPrix != null) {
				this.service.getBPById(d.bordereauPrix.id).subscribe((da) => {
					if (da != []) {
						this.formDataBP = da;
						//  this.tvaLocal=this.formDataBP.tva;
					}
					this.service
						.getAllLigneBP(this.formDataBP.id) 
						.subscribe((dlignes) => {
							if (dlignes != []) {
								this.lignes = dlignes;
								this.populate();
							}
							// this.lignes=d;
						});
				});
			}
			if (d.bordereauPrix == null) {
				this.ao.bordereauPrix = { id: 1 };
			}
		});

		this.populate();
	}
	// ===========================================================================
	//
	// ===========================================================================
	deleteLigneBP(idBP){
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			//console.log("AO deleted : " + idBP);
			const _this = this;
		  this.service.getLigneBPById(idBP).subscribe((data) => {
			//console.log(data);
			_this.dataShow = data;
		  });

		this.formDataBP.totalHt = this.formDataBP.totalHt - this.dataShow.totalHt;
		// Total TVA
		this.formDataBP.totalTva = this.formDataBP.totalTva - (this.dataShow.totalHt * this.dataShow.tva) / 100;
		// Total TTC
		this.formDataBP.totalTtc = this.formDataBP.totalTtc - this.dataShow.totalHt + (this.dataShow.totalHt * this.dataShow.tva) / 100;

		this.service.sendBP(this.formDataBP).subscribe((res) => {
			this.service
			.deleteLigneBPById(idBP)
			.subscribe(data => {
				//console.log("AO deleted : " + idBP);
				this.populate();
			});
		});

		this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}


	onFileSelected(event: any) {
		const file: File = event.target.files[0];
		const reader: FileReader = new FileReader();
		reader.onload = (e: any) => {
		  const binaryString: string = e.target.result;
		  const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
		  this.processWorkbook(workbook);
		};
	
		reader.readAsBinaryString(file);
	  }
	
 
	//   uploadedFile(evt: any) {
	// 	const target: DataTransfer = (evt.target) as DataTransfer;
	
	// 	const reader: FileReader = new FileReader();
	
	// 	reader.onload = (e: any) => {
	// 	  let bstr: string = e.target.result;
	
	// 	  let wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });
	
	// 	  let wsName: string = wb.SheetNames[0];
	
	// 	  let ws: XLSX.WorkSheet = wb.Sheets[wsName];
	
	// 	  this.datas = (XLSX.utils.sheet_to_json(ws, { raw: true }));
	// 	  console.log('Data: ', this.datas);
	// 	  this.jsonData = JSON.stringify(this.datas);
	
	// 	  console.log('JsonData: ', this.jsonData);
	
	// 	};
	
	// 	reader.readAsBinaryString(target.files[0]);
	//   }

	 
	

	


	// ===========================================================================
	//
	// ===========================================================================
	populate() {
		const _this = this;
		this.service.getAllLigneBP(this.formDataBP.id)
			.pipe(delay(300))
			.subscribe(
				(data) => {
					console.log(data)
					_this.dataSize = data.length;
					this.dataSourceLBP = new MatTableDataSource(data);
					this.isLoading = false;
					this.dataSourceLBP.paginator = this.paginator;
					this.dataSourceLBP.sort = this.sort;
				},
				(err) => {
					//console.log(err);
					this.isLoading = false;
				}
			);
	}
	// ===========================================================================
	//
	// ===========================================================================
	nouvelleLigne() {
		document.getElementById("frmLigne").style.display = "inline-table";
	}
	// ===========================================================================
	//
	// ===========================================================================
	onChangeofQte($event) {
		//console.log(event);
	}
	// ===========================================================================
	//
	// ===========================================================================
	onChangeofOptionsUnite($event) {
		//console.log($event);
		if ($event.value == 2) {
			//document.getElementById("qte").style.display = "inline";
			this.EnableQte = false;
		} else {
			this.formData.quantite = 1;
			this.EnableQte = true;
			//document.getElementById("qte").style.display = "none";
		}
	}
	// ===========================================================================
	//
	// ===========================================================================
	


	// processWorkbook(workbook: XLSX.WorkBook) {
	// 	const firstSheetName: string = workbook.SheetNames[0];
	// 	const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];
	// 	console.log("Worksheet:", worksheet);
	// 	// Convert to JSON
	// 	const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      
	// 	const newData = jsonData.slice(1);
	// 	this.excelTojson = newData;
    //     console.log("json data :",newData)
	// 	this.dataSourceLBP = newData.map(item => {
	// 	  return {
	// 		numPrix: item['__EMPTY'], 
	// 		objet: item['__EMPTY_1'], 
	// 		unite: item['__EMPTY_2'], 
	// 		tva: item['__EMPTY_3'], 
	// 		prixUnite: item['__EMPTY_4'],
	// 		quantite: item['__EMPTY_5'], 
	// 		totalHt: item['__EMPTY_6'], 
	// 		pourcentage: item['__EMPTY_7'], 
	// 	  };
	// 	});
	// 	// this.populate()
	// 	this.dataSize = newData.length;
	// 	// this.dataSourceLBP = new MatTableDataSource(this.excelTojson);
	// 	this.isLoading = false;
	// 	this.dataSourceLBP.paginator = this.paginator;
	// 	this.dataSourceLBP.sort = this.sort;
	// 	console.log(this.dataSourceLBP)
	//   }
	



	processWorkbook(workbook: XLSX.WorkBook) {
		const firstSheetName: string = workbook.SheetNames[0];
		const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];
		console.log("Worksheet:", worksheet);
	
		// Convert to JSON
		const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
	
		// Skip the first row
		const newData = jsonData.slice(1);
	
		// Check if newData is not empty
		if (newData.length > 0) {
			// Dynamically extract column headers from the first object in newData
			const columns = Object.keys(newData[0]);
	 
			this.dataSourceLBP.data = newData.map(item => {
				const mappedItem: any = {};
				columns.forEach(column => {
					mappedItem[column] = item[column];
				});
				console.log("mapdata items : ",mappedItem)
				return mappedItem;
				
			});

			this.dataSourceLBP.data.forEach(item => {
				item.numPrix = parseFloat(item.Num_Prix);
				item.tva = item.TVA;
				item.objet = item.objet;
                item.unite = item.Unité;
				item.prixUnite = parseFloat(item.Prix_Unitaire);
				item.quantite = parseFloat(item.QTE);
				item.totalHt = parseFloat(item.total_HT);
				item.pourcentage = item.Pourcentage;
                item.prixEstimati = item.prix_estimatif;
				item.designation = item.objet;
				item.isForfait = true
			});
			console.log("datasrc :", this.dataSourceLBP)
				this.dataSize = newData.length;
			// 	// this.dataSourceLBP = new MatTableDataSource(this.excelTojson);
				this.isLoading = false;
				this.dataSourceLBP.paginator = this.paginator;
				this.dataSourceLBP.sort = this.sort;
				console.log("dttt: " , this.dataSourceLBP)
		} else {
			// Handle case where newData is empty
			console.log('No data found in the Excel sheet.');
		}
	
		// Other operations...
	}
	

	onSubmitExcel() {
		if (this.selectedOption == 2) {
			this.formData.isForfait = false;
		}
		this.dataSourceLBP.data.forEach(item => {
			if ('prixUnite' in item && 'quantite' in item && 'tva' in item && 'totalHt' in item) {
				item.totalHt = item.prixUnite * item.quantite;
				this.formDataBP.totalHt += item.totalHt;
				this.formDataBP.totalTva += (item.totalHt * item.tva) / 100;
				this.formDataBP.totalTtc += item.totalHt + (item.totalHt * item.tva) / 100;
	            
				if (this.formDataBP.id == -1) {
					
					this.service.sendBP(this.formDataBP).subscribe(res => {
						
						this.formData.bordereauPrix.id = res.id;
						this.formDataBP.id = res.id;
						this.ao.bordereauPrix.id = res.id;

						this.formData.bordereauPrix.id = this.formDataBP.id;
						this.formData.designation = item.objet;
						this.formData.tva = item.tva;
						this.formData.unite = item.unite;
						this.formData.isForfait = item.isForfait;
						this.formData.prixEstimati = item.prixEstimati;
						this.formData.numPrix = item.numPrix;
						this.formData.prixUnite = item.prixUnite
						this.formData.quantite = item.quantite

                        
						this.service.sendao(this.ao).subscribe(result => {});
						
						this.service.sendLigneBP(this.formData).subscribe(r => {
							console.log('LigneBP data sent successfully:', r);
							this.resetFormData();
							this.populate();
						});
					});
				} else {

				// 	item.numPrix = parseFloat(item.Num_Prix);
				// item.tva = item.TVA;
				// item.objet = item.objet;
                // item.unite = item.Unité;
				// item.prixUnite = parseFloat(item.Prix_Unitaire);
				// item.quantite = parseFloat(item.QTE);
				// item.totalHt = parseFloat(item.total_HT);
				// item.pourcentage = item.Pourcentage;
                // item.prixEstimati = item.prix_estimatif;
				// item.designation = item.objet;
				// item.isForfait = true

					
					this.formData.bordereauPrix.id = this.formDataBP.id;
					this.formData.designation = item.objet;
					this.formData.tva = item.tva;
					this.formData.unite = item.unite;
					this.formData.isForfait = item.isForfait;
					this.formData.prixEstimati = item.prixEstimati;
					this.formData.numPrix = item.numPrix;
					this.formData.prixUnite = item.prixUnite
					this.formData.quantite = item.quantite
					
					this.service.sendBP(this.formDataBP).subscribe((res) => {});
					this.service.sendLigneBP(this.formData).subscribe(r => {
						document.getElementById("frmLigne").style.display = "none";
					
						this.formData = {
						id:0,
						isForfait: true,
						bordereauPrix: { id: 0 },
						prixUnite: 0,
						tva: 0,
						quantite: 1,
						totalHt: 0,
						unite: "",
						designation: "",
						numPrix: "",
						prixEstimati:0
					};
				this.populate();
					});
				}
			} else {
				console.error('Invalid item format:', item);
			}
			console.log("frm data lbp", this.formData)
		});
	}
	
	
	resetFormData() {
		// Reset formData after submission
		this.formData = {
			id: 0,
			isForfait: true,
			bordereauPrix: { id: 0 },
			prixUnite: 0,
			tva: 0,
			quantite: 1,
			totalHt: 0,
			unite: "",
			designation: "",
			numPrix: "",
			prixEstimati: 0
		};
	}
	
	
	onSubmit(form: NgForm) {
		if (this.selectedOption == 2) {
			this.formData.isForfait = false;
		}
		//console.log("Ligne BP after submit: "+ JSON.stringify(this.formData,null,2));
		// Tota HT
		this.formData.totalHt = this.formData.prixUnite * this.formData.quantite;
		this.formDataBP.totalHt = this.formDataBP.totalHt + this.formData.totalHt;
		// Total TVA
		this.formDataBP.totalTva = this.formDataBP.totalTva + (this.formData.totalHt * this.formData.tva) / 100;
		// Total TTC
		this.formDataBP.totalTtc = this.formDataBP.totalTtc + this.formData.totalHt + (this.formData.totalHt * this.formData.tva) / 100;

		if (this.formDataBP.id == -1) {
			
			this.service.sendBP(this.formDataBP).subscribe((res) => {
				this.formData.bordereauPrix.id = res.id;
				this.formDataBP.id = res.id;
				this.ao.bordereauPrix.id = res.id;
				
				this.service.sendao(this.ao).subscribe((result) => {});
				this.service.sendLigneBP(this.formData).subscribe((r) => {
					document.getElementById("frmLigne").style.display = "none";
					this.formData = {
						id: 0,
						isForfait: true,
						bordereauPrix: { id: 0 },
						prixUnite: 0,
						tva: 0,
						quantite: 1,
						totalHt: 0,
						unite: "",
						designation: "",
						numPrix: "",
						prixEstimati:0
					};
					this.populate();
				});
			});
		}
		if (this.formDataBP.id != -1) {
			
			this.formData.bordereauPrix.id = this.formDataBP.id;
			
			this.service.sendBP(this.formDataBP).subscribe((res) => {});
			this.service.sendLigneBP(this.formData).subscribe((r) => {
				//console.log(r);
				document.getElementById("frmLigne").style.display = "none";
				this.formData = {
					id: 0,
					isForfait: true,
					bordereauPrix: { id: 0 },
					prixUnite: 0,
					tva: 0,
					quantite: 1,
					totalHt: 0,
					unite: "",
					designation: "",
					numPrix: "",
					prixEstimati:0
				};
				this.populate();
				//this.router.navigate(['/personne-physique/personne-physique-list']);
			});
		}
		/* if(this.selectedOption==2){
      this.formData.isForait=JSON.parse("false");
      console.log(this.formData.isForait);
    }*/
		/* console.log(this.formData)
    this.service.sendao(this.formData).subscribe(res => {
      console.log(res)
      //this.router.navigate(['/personne-physique/personne-physique-list']);
    })*/
	}
	// ===========================================================================
	//
	// ===========================================================================
	openDialog(): void {
		const dialogRef = this.dialog.open(EditLigneBpComponent, {
		  width: '600px',
		  data: {
				isForfait: true,
				bordereauPrix: { id: 0 },
				prixUnite: 0,
				tva: 0,
				quantite: 1,
				totalHt: 0,
				unite: "",
				designation: "",
				numPrix: "",
		}
		});
		dialogRef.afterClosed().subscribe(res => {
			//console.log("Res: "+ JSON.stringify(res,null,2))
			if (res){
				this.formData = res;
				//console.log("Ligne BP: "+ JSON.stringify(this.formData,null,2))
				this.afterSave();
			}
		});
	  }

	  afterSave(){
		
		if (this.selectedOption == 2) {
			this.formData.isForfait = false;
		}
		//console.log("Ligne BP after save: "+ JSON.stringify(this.formData,null,2));
		// Tota HT
		this.formData.totalHt = this.formData.prixUnite * this.formData.quantite;
		this.formDataBP.totalHt = this.formDataBP.totalHt + this.formData.totalHt;
		// Total TVA
		this.formDataBP.totalTva = this.formDataBP.totalTva + (this.formData.totalHt * this.formData.tva) / 100;
		// Total TTC
		this.formDataBP.totalTtc = this.formDataBP.totalTtc + this.formData.totalHt + (this.formData.totalHt * this.formData.tva) / 100;

		if (this.formDataBP.id == -1) {
			
			this.service.sendBP(this.formDataBP).subscribe((res) => {
				this.formData.bordereauPrix.id = res.id;
				this.formDataBP.id = res.id;
				this.ao.bordereauPrix.id = res.id;
				this.service.sendao(this.ao).subscribe((result) => {});
				this.service.sendLigneBP(this.formData).subscribe((r) => {
					
					document.getElementById("frmLigne").style.display = "none";
					this.formData = {
						id:0,
						isForfait: true,
						bordereauPrix: { id: 0 },
						prixUnite: 0,
						tva: 0,
						quantite: 1,
						totalHt: 0,
						unite: "",
						designation: "",
						numPrix: "",
						prixEstimati:0
					};
					this.populate();
				});
			});
		}
		if (this.formDataBP.id != -1) {
			this.formData.bordereauPrix.id = this.formDataBP.id;
			this.service.sendBP(this.formDataBP).subscribe((res) => {});
			this.service.sendLigneBP(this.formData).subscribe((r) => {
				//console.log(r);
				document.getElementById("frmLigne").style.display = "none";
				this.formData = {
					id:0,
					isForfait: true,
					bordereauPrix: { id: 0 },
					prixUnite: 0,
					tva: 0,
					quantite: 1,
					totalHt: 0,
					unite: "",
					designation: "",
					numPrix: "",
					prixEstimati:0
				};
				this.populate();
				//this.router.navigate(['/personne-physique/personne-physique-list']);
			});
		}
	  }
	// ===========================================================================
	//
	// ===========================================================================
	editFormDialog(idlbp){
		  //console.log('id ligneBP: '+ idlbp)
		  this.service.getLigneBPById(idlbp).subscribe((data) => {
			console.log(data);
			this.formData = data;
			//console.log("Show Ligne BP: "+ JSON.stringify(this.formData,null,2))

			const dialogRef = this.dialog.open(EditLigneBpComponent, {
				width: '600px',
				data: {
					  id: this.formData.id,
					  isForfait: true,
					  bordereauPrix: this.formData.bordereauPrix,
					  prixUnite: this.formData.prixUnite,
					  tva: this.formData.tva,
					  quantite: this.formData.quantite,
					  totalHt: this.formData.totalHt,
					  unite: this.formData.unite,
					  designation: this.formData.designation,
					  numPrix: this.formData.numPrix,
					  prixEstimati:this.formData.prixEstimati
			  }
		  });
		  dialogRef.afterClosed().subscribe(res => {
			//console.log("Res: "+ JSON.stringify(res,null,2))
			if (res){
				this.formData = res;
				//this.formData.id = this.formData.id;
				//console.log("Ligne BP: "+ JSON.stringify(this.formData,null,2))
				this.afterSave();
			}
		});

		  });
	}
}
