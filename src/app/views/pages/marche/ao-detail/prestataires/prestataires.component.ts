import { Component, OnInit, ViewChild } from "@angular/core";
import { AoService } from "../../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { MatPaginator, MatSort, MatTableDataSource, PageEvent, throwToolbarMixedModesError } from "@angular/material";
import { NgForm } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NotificationService } from "../../../shared/notification.service";
import { delay } from "rxjs/operators";
import Swal from "sweetalert2";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Workbook } from "exceljs";
import { DatePipe } from "@angular/common";
import { PourcentageOffreFinanciereService } from "../../../shared/pourcentage-offre-financiere.service";
import * as logo from "../../../utils/logo.js";

@Component({
	selector: "kt-prestataires",
	templateUrl: "./prestataires.component.html",
	styleUrls: ["./prestataires.component.scss"],
})
export class PrestatairesComponent implements OnInit {
	// ================================================================
	//
	// ================================================================
	constructor(
		private datePipe: DatePipe,
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private translate: TranslateService,
		private notification: NotificationService,
		private pourcentageOffreFinanciereService: PourcentageOffreFinanciereService
	) { }
	// ================================================================
	//
	// ================================================================
	idao;
	lignes;
	dataSourceLBP:any [] =[];
	ao = {
		typeMarche: { libelle: "" },
		natureAo: { libelle: "" },
		bordereauPrix: { id: 0 },
	};
	newData: any [] = [];
	compareObject: any[] = [];
	formDataBP = { id: -1, totalHt: 0, totalTva: 0, totalTtc: 0 };
	formDataPrestataire = { ao: { id: 1 } };
	formDataOffreProposee = {
		ao: { id: 1 },
		montantPropose: 0,
		prestataire: { id: 1 }
	};
	validations;
	prestataires;
	valueToSend;
	// ================================================================
	//
	// ================================================================
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	validationDatasource: MatTableDataSource<any>;
	dataSource: MatTableDataSource<any>;
	dataArray = [];
	prestaList;
	dataSize = 0;
	isLoading = true;
	isPrestataire = false;
	montantPropose = 0;

	formData2 = {
		prixUnitaire: 0,
		objet:'',
		numPrix:0
	};

	formData = {
		id: 0,
		bordereauPrix: { id: 0 },
		prixUnitaire: 0,
		objet:'',
		numPrix:0,
		prestataire: {id: 0}

	};
	// ================================================================
	// Filter de recherche
	// ================================================================
	applyFilter(filterValue: string) {
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

	// ================================================================
	//
	// ================================================================
	displayedColumns = [
		"nom",
		"tel",
		"mail",
		"rc",
		"ice",
		"idFisc",
		'pourcentage',
		'statut',

		// "adresse",
		"actions",
	];
	showArticleRef = true;
	ao2;
	// ================================================================
	//
	// ================================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
		});
		this.service.getAllPrestatairesAll().subscribe((data) => {
			this.prestataires = data;
			this.dataArray = data;
		});
		this.service.data$.subscribe(res => {
			if (res != undefined && res != null) {
				this.ao2 = res;
			}
		})
		this.getPrestataires();
		this.getPrestatairesTotal();


		this.getAllPourcentages();


		// this.activatedRoute.queryParams.subscribe((params) => {
		// 	this.idao = params["id"];
		// });
		console.log('idao :', this.idao)
		this.service.getAoById(this.idao).subscribe((d) => {
			this.ao = d;

			if (d.bordereauPrix != null) {
				console.log("brd prix id :", d.bordereauPrix.id)
				console.log("dbrd price :",d.bordereauPrix)

				this.service.getBPById(d.bordereauPrix.id).subscribe((da) => {
					if (da.lenght!=0) {
						this.formDataBP = da;
						//  this.tvaLocal=this.formDataBP.tva;
					}
					// ID_LIGNEBYBP
					console.log("frm data bp id :", this.formDataBP.id)
					// console.log("frm data bp :", this.formDataBP)
					this.service
						.getAllLigneBP(this.formDataBP.id)
						.subscribe((dlignes) => {
							if (dlignes.lenght!=0) {
								this.lignes = dlignes;
								this.newData = dlignes.map(item => ({
									numPrix: item.numPrix,
									designation: item.designation
								}));
							
								console.log("lignes :",this.lignes)
								console.log("new data : ", this.newData)
								// this.populate();
							}
							
						});
					
				});

			}
			if (d.bordereauPrix == null) {
				this.ao.bordereauPrix = { id: 1 };
			}
		});
		//this.populate();
	}

	p1Travaux: number;
	p2Travaux: number;
	p1Fournitures: number;
	p2Fournitures: number;
	getAllPourcentages() {
		this.pourcentageOffreFinanciereService.getPourcentageOffreFinanciere().subscribe((res: any) => {
			if (res.body[(res.body.length) - 2].categorie == 'Travaux') {
				this.p1Travaux = res.body[(res.body.length) - 2].pourcentage1
				this.p2Travaux = res.body[(res.body.length) - 2].pourcentage2
				this.p1Fournitures = res.body[(res.body.length) - 1].pourcentage1
				this.p2Fournitures = res.body[(res.body.length) - 1].pourcentage2
			}
			else {
				this.p1Travaux = res.body[(res.body.length) - 1].pourcentage1
				this.p2Travaux = res.body[(res.body.length) - 1].pourcentage2
				this.p1Fournitures = res.body[(res.body.length) - 2].pourcentage1
				this.p2Fournitures = res.body[(res.body.length) - 2].pourcentage2
			}
		});
	}
	// =========================================================================
	//
	// =========================================================================
	back() {
		this.router.navigate(["/marches/ao-list"]);
	}
	// ================================================================
	//
	// ================================================================
	nouvelleLigne() {
		this.showArticleRef = !this.showArticleRef;
	}
	// ================================================================
	//
	// ================================================================
	summAccepte = 0;
	async getPrestataires() {
		await this.service
			.getAllOffreDeposee(this.idao, 0, 5)
			.pipe(delay(300))
			.subscribe(
				(res) => {
					this.isLoading = false;
					this.dataSize = res.totalElements;
					this.dataSource = new MatTableDataSource(res.content);
				},
				(err) => {
					console.log(err);
					this.isLoading = false;
				}
			);
	}

	numeroPrix
	async getPrestatairesTotal() {
		await this.service
			.getAllOffreDeposeeWithoutPagination(this.idao)
			.pipe(delay(300))
			.subscribe(
				(res) => {
					for (let i = 0; i < res.length; i++) {
						if (res[i].statut.id == 1) {
							this.summAccepte++;
						}
					}
					this.numeroPrix = (this.summAccepte % res.length) + (this.ao2.estimation / 2);
				},
				(err) => {
					console.log(err);
				}
			);
	}


	handlePageEvent(event: PageEvent) {
		let pageSize = event.pageSize;
		let pageIndex = event.pageIndex;
		this.service.getAllOffreDeposee(this.idao, pageIndex, pageSize).subscribe((res: any) => {
			this.dataSize = res.totalElements;
			this.dataSource = new MatTableDataSource(res.content);
		})

	}
	accepter = false
	valideofferDeposer(id: number) {
		let statut = new updateStatutOfferBean();
		statut.motifAnnuler = "";
		statut.statut = 1;
		this.service.updateStatutOffer(id, 1, statut).subscribe(res => {
			Swal.fire('validation de offer depose à été bien traité', ' ', 'success')
			this.ngOnInit();
			this.accepter = true
		}, err => {
			console.log(err)
		})
	}
	refuser = false
	refuseofferDeposer(id: number) {
		let statut = new updateStatutOfferBean();
		statut.statut = 2;
		Swal.fire({
			title: "Voulez-vous changer   le statut de cet offer  ?",
			icon: "question",
			iconHtml: "?",
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Oui'
		}).then((result) => {
			if (result.isConfirmed) {
				Swal.fire({
					title: "Motif ",
					text: "Vous devez Écrire le motif d'annulation ",
					input: 'text',
					showCancelButton: true
				}).then((result) => {
					if (result.value) {
						statut.motifAnnuler = result.value;
						this.service.updateStatutOffer(id, 2, statut).subscribe(res => {
							Swal.fire("L'offre dépose à être refusé", ' ', 'success');
							this.refuser = true
							this.ngOnInit();
						}, err => {
							console.log(err)
						})
					}
				});
			}
		})





	}
	// ================================================================
	//
	// ================================================================
	/*populate(){
	this.service.getAllPrestataires(this.idao).subscribe(data => {
	this.validationDatasource = [];
	this.validations = data;
	console.log(this.validations);
	for (let i = 0; i < this.validations.length; i++) {
	  this.validationDatasource.push(
		this.createNewLigne(i)
	  ); }
	  this.dataSource = new MatTableDataSource(this.validationDatasource);
	  this.paginator._intl.itemsPerPageLabel = 'مصفوفة لكل صفحة';
	  this.paginator._intl.nextPageLabel = 'الصفحة التالية';
	  this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
	  this.paginator._intl.lastPageLabel="الصفحة الأخيرة";
	  this.paginator._intl.firstPageLabel="الصفحة الأولى";
	  this.dataSource.paginator = this.paginator;
	  this.dataSource.sort = this.sort;
	  //this.dataSource.filter = "1";
  });}*/
	// ================================================================
	//
	// ================================================================
	createNewLigne(i: number): Prestataire {
		return {
			id: this.validations[i].id,
			nom: this.validations[i].nom,
			tel: this.validations[i].tel,
			rc: this.validations[i].rc,
			mail: this.validations[i].mail,
			adresse: this.validations[i].adresse,
			ice: this.validations[i].ice,
			idFisc: this.validations[i].idFisc,
		};
	}
	// ================================================================
	//
	// ================================================================
	send() {
		var offre = {
			prestataire: { id: this.valueToSend },
			ao: { id: this.idao },
			montantPropose: this.montantPropose,
			statut: { 'id': null }
		};
		let a = (this.montantPropose * 100) / this.ao2.estimation;
		if (this.ao2.typePrestation.libelle == 'Travaux') {
			if (a > this.p1Travaux && a < this.p2Travaux) {
				offre.statut = { 'id': 1 };
			} else {
				offre.statut = { 'id': 2 };
			}
		}
		if (this.ao2.typePrestation.libelle == 'Fournitures') {
			if (a > this.p1Fournitures && a < this.p2Fournitures) {
				offre.statut = { 'id': 1 };
			} else {
				offre.statut = { 'id': 2 };
			}
		}
		this.isPrestataire = false;
		this.service.OffreByIdPrestataire(this.valueToSend, this.idao).subscribe(
			(data) => {
				console.log("Id prestataire: " + this.valueToSend);
				console.log("Prestataire: " + JSON.stringify(data, null, 2));
				if (data == null) {
					this.service.sendOffreDeposee([offre]).subscribe((data) => {
						this.getPrestataires();
						this.montantPropose = 0;
					});
				}
			},
			(err) => {
				console.log(err);
			}
		);
	}
	// ================================================================
	//
	// ================================================================
	onChangeofOptions1(a) {
		this.valueToSend = a.value;
	}
	// ================================================================
	//
	// ================================================================
	onSubmit(form: NgForm) {
		console.log(this.formDataOffreProposee)
		this.formDataPrestataire.ao.id = this.idao;
		this.formDataOffreProposee.ao.id = this.idao;
		this.service
			.sendReservePrestataire(this.formDataPrestataire)
			.subscribe((res) => {
				this.formDataOffreProposee.prestataire.id = res.id;
				var x = [this.formDataOffreProposee];
				this.service.sendOffreDeposee(x).subscribe((r) => {
					this.formDataPrestataire = { ao: { id: 1 } };
					this.getPrestataires();
					//this.router.navigate(['/marches/ao-list']);
				});
			});
	}
	// ================================================================
	//
	// ================================================================
	editPrestation() { }
	// ================================================================
	//
	// ================================================================
	deletePrestation(idPrest) {
		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
			this.service.deleteOffreDeposee(idPrest).subscribe((data) => {
				console.log("Destinataire Deleted  : " + idPrest);
				this.getPrestataires();
				this.getPrestatairesTotal();
			});

			this.notification.warn(
				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
			);
		}
	}


	exportToExcel(id) {
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		const jsonData: any[] = [];
		const columns = ['Numéro de prix','Désignation','Prix Unitaire de péstataire','Prix Unitaire (Bordereau)']
		this.saveAsExcelFileCompa("AO", columns, this.compareObject, "Préstataires", "AO");
		console.log("compare object :",this.compareObject)
	}


	private saveAsExcelFileCompa(reportHeading: string, headersArray: any[], json: any[],  excelFileName: string, sheetName: string) {
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

        // Add Image
        let myLogoImage = workbook.addImage({
            base64: logo.imgBase64,
            extension: "png",
        });
        worksheet.mergeCells("A1:A5");
        worksheet.addImage(myLogoImage, {
            tl: { col: 0.4, row: 0.2 },
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

		data.forEach((d, index) => {
			const ligne = this.lignes[index];
			console.log(index ,"ligne :", ligne)
			if (d.prixUnitaire !== ligne.prixUnite ) {
		    let row = worksheet.addRow(Object.values(d));
			row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
				cell.fill = {
					type: 'pattern',
					pattern: 'solid',
					fgColor: { argb: 'ffff6347' } // '80' represents 50% transparency (80 in hexadecimal)
				};
			});
			row.alignment = { vertical: "middle", horizontal: "center" };
			row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
			}
			else if(d.prixUnitaire == ligne.prixUnite ) {	
            let row = worksheet.addRow(Object.values(d));
			row.alignment = { vertical: "middle", horizontal: "center" };
			row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
			}
			
		});

        worksheet.getColumn(1).width = 25;
        worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center" };
        worksheet.getColumn(2).width = 25;
        worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center" };
        worksheet.getColumn(3).width = 65;
        worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center" };
		worksheet.getColumn(4).width = 65;
        worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center" };
        /* Save Excel File */
        workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            let now = new Date();
            let timeSpan = this.datePipe.transform(now, "yyyyHHmmss");
            FileSaver.saveAs(blob, excelFileName  + "-" + timeSpan + '.xlsx');
        });
	  } 

	exportToExcelSurvenu() {
		const wb: XLSX.WorkBook = XLSX.utils.book_new();
		const jsonData: any[] = [];
		const columns = ['Num_Prix','objet','Prix_Unitaire']
		console.log("enw data :",this.newData)
		// Save Excel file
		this.saveAsExcelFile("AO", columns, this.newData, "Préstataires", "AO");
	}

	onFileSelected(event: any, id, row) {
		console.log("idd:", id);
		console.log("row :", row);
		const file: File = event.target.files[0];
		const reader: FileReader = new FileReader();
		
		reader.onload = (e: any) => {
			const binaryString: string = e.target.result;
			const workbook: XLSX.WorkBook = XLSX.read(binaryString, { type: 'binary' });
			this.processWorkbook(workbook);
			this.onSubmitExcel(id);
		};
		reader.readAsBinaryString(file);
	}
	
	  processWorkbook(workbook: XLSX.WorkBook) {
		const firstSheetName: string = workbook.SheetNames[0];
		const worksheet: XLSX.WorkSheet = workbook.Sheets[firstSheetName];
		console.log("Worksheet:", worksheet);
	
		// Convert to JSON
		const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { raw: true });
	
		// Skip the first row
		const newData = jsonData.slice(3);

		if (newData.length > 0) {

			const columns = Object.keys(newData[0]);
			this.dataSourceLBP = newData.map(item => {
				const mappedItem: any = {};
				columns.forEach(column => {
					mappedItem[column] = item[column];
				});
				console.log("mapdata items : ",mappedItem)
				return mappedItem;
				
			});
            console.log("newdata : ", newData)
			console.log("dt src lbp :",this.dataSourceLBP)
			
			this.dataSourceLBP.forEach(item => {
				item.numPrix = parseFloat(item.__EMPTY);
				item.objet = item.__EMPTY_1;
				item.prixUnitaire = parseFloat(item.__EMPTY_2);

			});
			console.log(this.dataSourceLBP)
		} else {
			console.log('No data found in the Excel sheet.');
		}

	}
	



	async onSubmitExcel(id) {
		
		// this.service.DeletePrixPrestataire(this.formDataBP.id, id).toPromise();

		for (const item of this.dataSourceLBP) {
			if ('prixUnitaire' in item) {
				try {
					let res;
					if (this.formDataBP.id == -1) {
						res = await this.service.sendBP(this.formDataBP).toPromise();
						this.formData.bordereauPrix.id = res.id;
						this.formDataBP.id = res.id;
						this.ao.bordereauPrix.id = res.id;
						this.formData.bordereauPrix.id = this.formDataBP.id;
					} else {
						this.formData.bordereauPrix.id = this.formDataBP.id;
					}
					
					this.formData.prixUnitaire = item.prixUnitaire;
					this.formData.numPrix = item.numPrix;
					this.formData.objet = item.objet;
					this.formData.prestataire.id = id;
	
					await this.service.sendPrixPrestataire(this.formData).toPromise();
					
					console.log('LigneBP data sent successfully for item:', item);
				} catch (error) {
					console.error('Error sending LigneBP data for item:', item, error);
				}
	
				this.resetFormData();
			} else {
				console.error('Invalid item format:', item);
			}
			console.log("frm data lbp", this.formData);
		}
		Swal.fire("OK!",' ','success');
		this.service.GetPrixPrestataire(this.formDataBP.id, id)
			.subscribe((res) => {
				console.log("res :", res);
				this.compareObject = res.map((item, index) => ({
					numPrix: item.numPrix,
					designation: item.objet,
					prixUnitaire: item.prixUnitaire,
					prb: this.lignes[index].prixUnite,
				}));
				console.log("compareObject:", this.compareObject);
			});
	}
	


	resetFormData() {
		// Reset formData after submission
		this.formData = {
			id: 0,
			bordereauPrix: { id: 0 },
			prixUnitaire: 0,
			objet:'',
			numPrix:0,
			prestataire: {id: 0}
		};
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

        // Add Image
        let myLogoImage = workbook.addImage({
            base64: logo.imgBase64,
            extension: "png",
        });
        worksheet.mergeCells("A1:A5");
        worksheet.addImage(myLogoImage, {
            tl: { col: 0.4, row: 0.2 },
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
        /* Save Excel File */
        workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            let now = new Date();
            let timeSpan = this.datePipe.transform(now, "yyyyHHmmss");
            FileSaver.saveAs(blob, excelFileName  + "-" + timeSpan + '.xlsx');
        });
	  } 


	// ================================================================
	//
	// ================================================================
	onKey(value) {
		this.dataArray = [];
		this.selectSearch(value);
	}
	// ================================================================
	//
	// ================================================================
	selectSearch(value) {
		console.log(this.dataArray);
		let filter = value;
		for (let i = 0; i < this.prestataires.length; i++) {
			let option = this.prestataires[i].libelle;
			if (
				option.toLowerCase().indexOf(filter) >= 0 ||
				option.toUpperCase().indexOf(filter) >= 0
			) {
				console.log("in if");
				this.dataArray.push(this.prestataires[i]);
				console.log(this.dataArray);
			}
		}
	}
	// ================================================================
	//
	// ================================================================
	lettreMaintien(idPrest, prestataire, statut) {
		console.log(statut)
		if (statut === 'Accepté') {
			this.service.lettreMaintienGenerator("lettreAttribution/", this.idao, prestataire).subscribe(
				(res) => {
					const file = new Blob([res as unknown as BlobPart], {
						type: 'application/msword'
					});
					const fileURL = URL.createObjectURL(file);
					window.open(fileURL);
					const readfile = URL.createObjectURL(file);
					const link = document.createElement("a");
					link.download = "lettre d'attribution.docx";
					link.href = readfile;
					link.dispatchEvent(
						new MouseEvent("click", {
							bubbles: true,
							cancelable: true,
							view: window,
						})
					);
					setTimeout(() => {
						window.URL.revokeObjectURL(readfile);
						link.remove();
					}, 100);
				},
				(err) => {
					console.log(err);
				});

		}
		if (statut === 'Réfusé') {
			this.service.lettreMaintienGenerator("lettreEcart/" + idPrest + "/", this.idao, prestataire).subscribe(
				(res) => {
					const file = new Blob([res as unknown as BlobPart], {
						type: 'application/msword'
					});
					const fileURL = URL.createObjectURL(file);
					window.open(fileURL);
					const readfile = URL.createObjectURL(file);
					const link = document.createElement("a");
					link.download = "notification écarter.docx";
					link.href = readfile;
					link.dispatchEvent(
						new MouseEvent("click", {
							bubbles: true,
							cancelable: true,
							view: window,
						})
					);
					setTimeout(() => {
						window.URL.revokeObjectURL(readfile);
						link.remove();
					}, 100);
				},
				(err) => {
					console.log(err);
				});

		}

	}
}
export interface Prestataire {
	id: string;
	nom: string;
	tel: string;
	rc: string;
	mail: string;
	adresse: String;
	ice: String;
	idFisc: String;
}
export class updateStatutOfferBean {
	statut: number;
	motifAnnuler: string = "";
}

// import { Component, OnInit, ViewChild } from "@angular/core";
// import { AoService } from "../../../shared/ao.service";
// import { Router, ActivatedRoute } from "@angular/router";
// import { MatPaginator, MatSort, MatTableDataSource, throwToolbarMixedModesError } from "@angular/material";
// import { NgForm } from "@angular/forms";
// import { TranslateService } from "@ngx-translate/core";
// import { NotificationService } from "../../../shared/notification.service";
// import { delay } from "rxjs/operators";
// import Swal from "sweetalert2";
// import * as XLSX from 'xlsx';
// import * as FileSaver from 'file-saver';
// import { Workbook } from "exceljs";
// import { DatePipe } from "@angular/common";

// @Component({
// 	selector: "kt-prestataires",
// 	templateUrl: "./prestataires.component.html",
// 	styleUrls: ["./prestataires.component.scss"],
// })
// export class PrestatairesComponent implements OnInit {
// 	// ================================================================
// 	//
// 	// ================================================================
// 	constructor(
// 		private datePipe : DatePipe,
// 		private service: AoService,
// 		private router: Router,
// 		private activatedRoute: ActivatedRoute,
// 		private translate: TranslateService,
// 		private notification: NotificationService
// 	) { }
// 	// ================================================================
// 	//
// 	// ================================================================
// 	idao;
// 	formDataPrestataire = { ao: { id: 1 } };
// 	formDataOffreProposee = { ao: { id: 1 },
// 	montantPropose: 0,
// 	 prestataire: { id: 1 } };
// 	validations;
// 	prestataires;
// 	valueToSend; 
// 	// ================================================================
// 	//
// 	// ================================================================
// 	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
// 	@ViewChild(MatSort, { static: true }) sort: MatSort;
// 	validationDatasource: MatTableDataSource<any>;
// 	dataSource: MatTableDataSource<any>;
// 	dataArray = [];
// 	prestaList;
// 	dataSize = 0;
// 	isLoading = true;
// 	isPrestataire = false;
// 	montantPropose=0;
// 	// ================================================================
// 	// Filter de recherche
// 	// ================================================================
// 	applyFilter(filterValue: string) {
// 		this.dataSource.filter = filterValue.trim().toLowerCase();

// 		if (this.dataSource.paginator) {
// 			this.dataSource.paginator.firstPage();
// 		}
// 	}
	
// 	// ================================================================
// 	//
// 	// ================================================================
// 	displayedColumns = [
// 		"nom",
// 		"tel",
// 		"mail",
// 		"rc",
// 		"ice",
// 		"idFisc",
// 		'pourcentage',
// 		'statut',
	
// 		// "adresse",
// 		"actions",
// 	];
// 	showArticleRef = true;
// 	// ================================================================
// 	//
// 	// ================================================================
// 	ngOnInit() {
// 		this.activatedRoute.queryParams.subscribe((params) => {
// 			this.idao = params["id"];
// 		});
// 		this.service.getAllPrestatairesAll().subscribe((data) => {
// 			this.prestataires = data;
// 			this.dataArray = data;
// 		});
// 		this.getPrestataires();
// 		//this.populate();
// 	}
// 	// =========================================================================
// 	//
// 	// =========================================================================
// 	back() {
// 		this.router.navigate(["/marches/ao-list"]);
// 	}
// 	// ================================================================
// 	//
// 	// ================================================================
// 	nouvelleLigne() {
// 		this.showArticleRef = !this.showArticleRef;
// 	}
// 	// ================================================================
// 	//
// 	// ================================================================
// 	async getPrestataires() {
// 		const _this = this;
// 		await this.service
// 			.getAllOffreDeposee(this.idao)
// 			.pipe(delay(300))
// 			.subscribe(
// 				(data) => {
// 					//console.log('DATA-OUT: '+ JSON.stringify(data,null,2));
// 					this.isLoading = false;
// 					_this.dataSize = data.length;
// 					this.dataSource = new MatTableDataSource(data);
// 					this.dataSource.paginator = this.paginator;
// 					this.dataSource.sort = this.sort;
// 				},
// 				(err) => {
// 					console.log(err);
// 					this.isLoading = false;
// 				}
// 			);
// 	}
// 	accepter=false
// 	valideofferDeposer(id:number){
// 		let statut=new updateStatutOfferBean();
// 		statut.motifAnnuler="";
// 		statut.statut=1;
// 		this.service.updateStatutOffer(id, 1,statut).subscribe(res=>{
// 			Swal.fire(	'validation de offer depose à été bien traité',	' ','success'  )
// 			  this.ngOnInit();
// 			  this.accepter=true
// 		},err=>{
// 			console.log(err)
// 		})


// 	}
// 	refuser=false
// 	refuseofferDeposer(id:number){
// 		let statut=new updateStatutOfferBean();
// 		statut.statut=2;
// 		Swal.fire({
// 			title: "Voulez-vous changer   le statut de cet offer  ?",
// 			icon: "question",
// 			iconHtml: "?",
// 			showCancelButton: true,
// 			confirmButtonColor: '#3085d6',
// 			cancelButtonColor: '#d33',
// 			confirmButtonText: 'Oui'
// 		  }).then((result) => {
// 			if (result.isConfirmed) {
// 				Swal.fire({
// 					title: "Motif ",
// 					text: "Vous devez Écrire le motif d'annulation ",
// 					input: 'text',
// 					showCancelButton: true        
// 				}).then((result) => {
// 					if (result.value) {
// 						statut.motifAnnuler=result.value;
// 							this.service.updateStatutOffer(id, 2,statut).subscribe(res=>{
// 							Swal.fire("L'offre dépose à être refusé",' ',	'success');
// 							this.refuser=true
// 			  this.ngOnInit();
// 		},err=>{
// 			console.log(err)
// 		})
// 					}
// 				});
// 			}
// 		  })


		
	
		
// 	}
// 	// ================================================================
// 	//
// 	// ================================================================
// 	/*populate(){
//     this.service.getAllPrestataires(this.idao).subscribe(data => {
//     this.validationDatasource = [];
//     this.validations = data;
//     console.log(this.validations);
//     for (let i = 0; i < this.validations.length; i++) {
//       this.validationDatasource.push(
//         this.createNewLigne(i)
//       ); }
//       this.dataSource = new MatTableDataSource(this.validationDatasource);
//       this.paginator._intl.itemsPerPageLabel = 'مصفوفة لكل صفحة';
// 	  this.paginator._intl.nextPageLabel = 'الصفحة التالية';
// 	  this.paginator._intl.previousPageLabel = 'الصفحة السابقة';
// 	  this.paginator._intl.lastPageLabel="الصفحة الأخيرة";
// 	  this.paginator._intl.firstPageLabel="الصفحة الأولى";
//       this.dataSource.paginator = this.paginator;
//       this.dataSource.sort = this.sort;
//       //this.dataSource.filter = "1";
//   });}*/
// 	// ================================================================
// 	//
// 	// ================================================================
// 	createNewLigne(i: number): Prestataire {
// 		return {
// 			id: this.validations[i].id,
// 			nom: this.validations[i].nom,
// 			tel: this.validations[i].tel,
// 			rc: this.validations[i].rc,
// 			mail: this.validations[i].mail,
// 			adresse: this.validations[i].adresse,
// 			ice: this.validations[i].ice,
// 			idFisc: this.validations[i].idFisc,
// 		};
// 	}
// 	// ================================================================
// 	//
// 	// ================================================================
// 	send() {
// 		var offre = {
// 			prestataire: { id: this.valueToSend },
// 			ao: { id: this.idao },
// 			montantPropose:this.montantPropose
// 		};
		
// 		this.isPrestataire = false;
// 		this.service.OffreByIdPrestataire(this.valueToSend,this.idao).subscribe(
// 			(data) => {
// 				console.log("Id prestataire: "+ this.valueToSend);
// 				console.log("Prestataire: "+ JSON.stringify(data, null, 2));

// 				if (data == null) {
// 					this.service.sendOffreDeposee([offre]).subscribe((data) => {
// 						this.getPrestataires();
// 						this.montantPropose=0;
// 					});
// 				}
// 			},
// 			(err) => {
// 				console.log(err);
// 			}
// 		);
// 		// if (this.isPrestataire = true) {
// 		// 	this.service.sendOffreDeposee([offre]).subscribe((data) => {
// 		// 		this.getPrestataires();
// 		// 	});
// 		// }
// 	}
// 	// ================================================================
// 	//
// 	// ================================================================
// 	onChangeofOptions1(a) {
// 		this.valueToSend = a.value;
// 	}
// 	// ================================================================
// 	//
// 	// ================================================================
// 	onSubmit(form: NgForm) {
// 		console.log(this.formDataOffreProposee)
// 		this.formDataPrestataire.ao.id = this.idao;
// 		this.formDataOffreProposee.ao.id = this.idao;
// 		this.service
// 			.sendReservePrestataire(this.formDataPrestataire)
// 			.subscribe((res) => {
// 				this.formDataOffreProposee.prestataire.id = res.id;
// 				var x = [this.formDataOffreProposee];
// 				this.service.sendOffreDeposee(x).subscribe((r) => {
// 					this.formDataPrestataire = { ao: { id: 1 } };
// 					this.getPrestataires();
// 					//this.router.navigate(['/marches/ao-list']);
// 				});
// 			});
// 	}
// 	// ================================================================
// 	//
// 	// ================================================================
// 	editPrestation() { }
// 	// ================================================================
// 	//
// 	// ================================================================
// 	deletePrestation(idPrest) {
// 		if (confirm(this.translate.instant("PAGES.GENERAL.MSG_DELETED"))) {
// 			this.service.deleteOffreDeposee(idPrest).subscribe((data) => {
// 				console.log("Destinataire Deleted  : " + idPrest);
// 				this.getPrestataires();
// 			});

// 			this.notification.warn(
// 				this.translate.instant("PAGES.GENERAL.MSG_DEL_CONFIRMED")
// 			);
// 		}
// 	}






// 	exportToExcelSurvenu() {
// 		// Create a new Excel workbook and worksheet
// 		const wb: XLSX.WorkBook = XLSX.utils.book_new();
// 		// const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.getTableData());
	
// 		// Append the worksheet to the workbook
// 		// XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
	
// 		// Generate Excel file buffer
// 		// const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
	

// 		// const table: HTMLTableElement = this.excelTable.nativeElement;
// 		// const rows: HTMLCollectionOf<HTMLTableRowElement> = table.rows;
// 		const jsonData: any[] = [];
	
// 		// Iterate over rows
// 		// for (let i = 1; i < rows.length; i++) {
// 		//   const row: HTMLTableRowElement = rows[i];
// 		//   const rowData: any = {};
	
// 		//   // Iterate over cells
// 		//   for (let j = 0; j < row.cells.length; j++) {
// 		// 	const cell: HTMLTableCellElement = row.cells[j];
// 		// 	rowData[`column${j + 1}`] = cell.innerText;
// 		//   }
	
// 		//   jsonData.push(rowData);
// 		// }
	   
// 		// return jsonData; // Return JSON data

// 		const columns = ['Num_Prix','objet','Unité','TVA','Prix_Unitaire','QTE','total_HT','prix_estimatif','Pourcentage']
// 		// Save Excel file
// 		this.saveAsExcelFile("AO", columns, jsonData, "Décés survenus", "Décés survenus aux hopitaux et aux cliniques et enregistrés au BCH ");
// 		// this.getTableData()
// 	}


// 	private saveAsExcelFile(reportHeading: string, headersArray: any[], json: any[],  excelFileName: string, sheetName: string) {
// 		const header = headersArray;
//         const data = json;

//         /* Create workbook and worksheet */
//         const workbook = new Workbook();
//         /* Set workbook properties */

//         workbook.created = new Date();
//         workbook.modified = new Date();
//         const worksheet = workbook.addWorksheet(sheetName);
//         worksheet.addRow([]);

//         worksheet.mergeCells("B2:H2");
//         worksheet.getCell("B2").value = reportHeading;
//         worksheet.getCell("B2").alignment = { vertical: "middle", horizontal: "center" };
//         worksheet.getCell("B2").font = { size: 12, bold: true };
//         worksheet.getCell("B2").fill = {
//             type: "pattern",
//             pattern: "solid",
//             fgColor: { argb: "aeb6e8c5" },
//         };
//         worksheet.getCell("B2").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
//         worksheet.addRow([]);
//         //let subTitleRow = worksheet.addRow(['date: ' + this.datePipe.transform(new Date(), 'medium' ) ] );

//         if (reportHeading !== "") {
//             worksheet.mergeCells("B3:H3");
//             worksheet.getCell("B3").value = "DATE : " + this.datePipe.transform(new Date(), "dd-MM-yyyy");
//             worksheet.getCell("B3").alignment = { horizontal: "center" };
//             worksheet.getCell("B3").font = { size: 12, bold: true };
//             worksheet.getCell("B3").fill = {
//                 type: "pattern",
//                 pattern: "solid",
//                 fgColor: { argb: "aedde9el" },
//             };
//             worksheet.getCell("B3").border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
//             worksheet.addRow([]);
//         }

//         //Add Image
//         // let myLogoImage = workbook.addImage({
//         //     base64: logo.imgBase64,
//         //     extension: "png",
//         // });
//         worksheet.mergeCells("A1:A5");
//         // worksheet.addImage(myLogoImage, {
//         //     tl: { col: 0.6, row: 0.4 },
//         //     ext: { width: 50, height: 80 },
//         // });
//         // worksheet.mergeCells('A1:D2');
//         worksheet.addRow([]);
//         worksheet.addRow([]);
//         /* Add header row */
//         const headerRow = worksheet.addRow(header);

//         // Cell style : Fill and border
//         headerRow.eachCell((cell, index) => {
//             cell.fill = {
//                 type: "pattern",
//                 pattern: "solid",
//                 fgColor: { argb: "ffb0eaf6" },
//             };
//             cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
//             cell.font = { size: 12, bold: true };

//             worksheet.getColumn(index).width = header[index - 1].length < 40 ? 40 : header[index - 1].lenght;
//         });

//         // Add Data and Conditional Formatting
//         data.forEach((d) => {
        
            
//             let row = worksheet.addRow(Object.values(d));
//             row.alignment = { vertical: "middle", horizontal: "center" };
//             // let qty = row.getCell(1);
        
//             row.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
//         });
//         worksheet.getColumn(1).width = 92;
//         worksheet.getColumn(1).alignment = { vertical: "middle", horizontal: "center" };
//         worksheet.getColumn(2).width = 25;
//         worksheet.getColumn(2).alignment = { vertical: "middle", horizontal: "center" };
//         worksheet.getColumn(3).width = 20;
//         worksheet.getColumn(3).alignment = { vertical: "middle", horizontal: "center" };
//         worksheet.getColumn(4).width = 72;
//         worksheet.getColumn(4).alignment = { vertical: "middle", horizontal: "center" };
//         worksheet.getColumn(5).width = 15;
//         worksheet.getColumn(5).alignment = { vertical: "middle", horizontal: "center" };
//         worksheet.getColumn(6).width = 25;
//         worksheet.getColumn(6).alignment = { vertical: "middle", horizontal: "center" };
//         worksheet.getColumn(7).width = 25;
//         worksheet.getColumn(7).alignment = { vertical: "middle", horizontal: "center" };
//         worksheet.addRow([]);

//         /* Save Excel File */
//         workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
//             const blob = new Blob([data], { type: 'application/octet-stream' });
//             let now = new Date();
//             let timeSpan = this.datePipe.transform(now, "yyyyHHmmss");
//             FileSaver.saveAs(blob, excelFileName  + "-" + timeSpan + '.xlsx');
//         });

// 	  } 


// 	// ================================================================
// 	//
// 	// ================================================================
// 	onKey(value) {
// 		this.dataArray = [];
// 		this.selectSearch(value);
// 	}
// 	// ================================================================
// 	//
// 	// ================================================================
// 	selectSearch(value) {
// 		console.log(this.dataArray);
// 		let filter = value;
// 		for (let i = 0; i < this.prestataires.length; i++) {
// 			let option = this.prestataires[i].libelle;
// 			if (
// 				option.toLowerCase().indexOf(filter) >= 0 ||
// 				option.toUpperCase().indexOf(filter) >= 0
// 			) {
// 				console.log("in if");
// 				this.dataArray.push(this.prestataires[i]);
// 				console.log(this.dataArray);
// 			}
// 		}
// 	}
// 	// ================================================================
// 	//
// 	// ================================================================
// 	lettreMaintien(idPrest, prestataire, statut){
// 		console.log(statut)
// 		if(statut==='Accepté'){
// 			this.service.lettreMaintienGenerator("lettreAttribution/",this.idao, prestataire).subscribe(
// 				(res) => {
// 					const file = new Blob([res as unknown as BlobPart], {
// 						type: 'application/msword' 
// 					});
// 					const fileURL = URL.createObjectURL(file);
// 					window.open(fileURL);
// 					const readfile = URL.createObjectURL(file);
// 				const link = document.createElement("a");
// 					link.download = "lettre d'attribution.docx";
// 				link.href = readfile;
// 				link.dispatchEvent(
// 					new MouseEvent("click", {
// 						bubbles: true,
// 						cancelable: true,
// 						view: window,
// 					})
// 				);
// 				setTimeout(() => {
// 					window.URL.revokeObjectURL(readfile);
// 					link.remove();
// 				}, 100);
// 				},
// 				(err) => {
// 					console.log(err);
// 				});

// 		}
// 		if(statut==='Réfusé'){
// 			this.service.lettreMaintienGenerator("lettreEcart/"+idPrest+"/",this.idao, prestataire).subscribe(
// 				(res) => {
// 					const file = new Blob([res as unknown as BlobPart], {
// 						type: 'application/msword' 
// 					});
// 					const fileURL = URL.createObjectURL(file);
// 					window.open(fileURL);
// 					const readfile = URL.createObjectURL(file);
// 				const link = document.createElement("a");
// 					link.download = "notification écarter.docx";
// 				link.href = readfile;
// 				link.dispatchEvent(
// 					new MouseEvent("click", {
// 						bubbles: true,
// 						cancelable: true,
// 						view: window,
// 					})
// 				);
// 				setTimeout(() => {
// 					window.URL.revokeObjectURL(readfile);
// 					link.remove();
// 				}, 100);
// 				},
// 				(err) => {
// 					console.log(err);
// 				});

// 		}
	
// 	}
// }
// export interface Prestataire {
// 	id: string;
// 	nom: string;
// 	tel: string;
// 	rc: string;
// 	mail: string;
// 	adresse: String;
// 	ice: String;
// 	idFisc: String;
// }
// export class updateStatutOfferBean {
// 	statut: number;
// 	motifAnnuler: string = "";
// }
