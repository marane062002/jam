import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";
import { OrganisationService } from "../../organisation/organisation.service";
import { MatTableDataSource, MatDialog } from "@angular/material";
import * as $ from "jquery";
import { ConfirmDialogComponent } from "./../confirm-dialog/confirm-dialog.component";
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { SpinnerService } from '../../utils/spinner.service';
import { finalize } from 'rxjs/operators';
import { ProgrammeService } from "../../shared/ProgrammeService";
@Component({
	selector: "kt-ao-edit-sm",
	templateUrl: "./ao-edit-sm.component.html",
	styleUrls: ["./ao-edit-sm.component.scss"],
})
export class AoEditSmComponent implements OnInit {
	// =========================================================================
	//
	// =========================================================================
	displayedColumns = [
		"id",
		"numPrix",
		"objet",
		"isForfait",
		"unite",
		"prixU",
		"quantite",
		"totalHt",
	];
	// =========================================================================
	//
	// =========================================================================
	checkLang: string;
	checked: boolean = false;
	bool;
	dataSource1: MatTableDataSource<any>;
	displayedColumns1 = ["type", "nomDoc"];
	formPj = { type: 0, selecetedFile: {},LabelPj:'' };
	allpjs = [];
	showAddDoc = false;
	unites;
	heureOverturePlis = { hour: 10, minute: 10 };
	checked1: boolean = false;

	isVisible10=false;
	isSelected10:false;
	
	
	isVisible: any;

	isVisible3: any;
	isSelected: boolean = true;

	isVisible4=false;
	isSelected4:false;

	isVisible5=false;
	isSelected5:false;

	isVisible6="";
	isSelected6:false;
	// =========================================================================
	//
	// =========================================================================
	constructor(
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private service2: OrganisationService,
		private dialog: MatDialog,
		private spinnerService: SpinnerService,
		private translate: TranslateService,
		private  programmeService:ProgrammeService,
	) {
		this.checkLang = window.localStorage.getItem("language");
	}
	// =========================================================================
	//
	// =========================================================================
	divisions;
	services;
	data = [{ label: "Acceptez le marché", checked: false }];
	dataExistenceVisite = [{ label: "Existence des visites des lieux", checked: false }];
	codes=[ "A", "B", "C", "D", "E", "F", "G"," H", "I"," J", "K", "L", "M", "N"," O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"," Y", "Z"]
	idao;
	modepassation = [{ libelle: "Moins disant" }, { libelle: "Mieux disant" }];
	lignes;
	formDataBP;
	pjsCps;
	pjsRc;
	typeMarcheAll;
	natureAoAll;
	lisTypePrestationAo;
	listprogramme;


	// =========================================================================
	//
	// =========================================================================
	formData = {
		typeMarche: { id: 1, libelle: "" },
		natureAo: { id: 1, libelle: "" },
		statutAo: { id: 1 },
		pfinancier: 0,
		ptechnique: 0,
		modePassation: "",
		seuilMinimal: 0,
		caution: 0,
		dateOuverturePlis: null,
		dateReception: null,
		serviceGestionnaire: 0,
		division: 0,
		descriptif: "",
		budgetEstimatif: 0,
		objet: "",
		objetAR: "",
		numAo: "",
		modificateurUser: "",
		existanceVisite: false,
		typeAO:'',
		estimation:'',
		naturePrix:'',
		loi:'',

		qualification: "",
		existEchantillon: false,
		existanceAgrement: false,
		existanceAllotisse: "",
	};
	typesAO = ["PME", "Copérative" ,"Autoentrepreneur"];
	naturePrix = ["Révisable", "Non révisable"]; // Révisable = (1% des intérêt moratoires + 3% ..) (+4%)
	fromesLivarison = ["العرض الأدنى", "العرض الأفضل"];
	// =========================================================================
	//
	// =========================================================================
	ngOnInit() {
		var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING")); // start spinner
		this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
			if (event.lang == 'ar') {
				this.checkLang = 'ar';
			} else if (event.lang == 'fr') {
				this.checkLang = 'fr';
			}
		});
		this.programmeService.all().subscribe(res=>{
			this.listprogramme=res;
		  },err=>{
			console.log(err)
		  })

		this.activatedRoute.queryParams.subscribe((params) => {
			this.idao = params["id"];
		});
		this.service.getAlltypePjAo().subscribe((res) => {
			console.log(res);
			this.unites = res;
		});
		this.service.getAllTypeMarche().subscribe((data) => {
			this.typeMarcheAll = data;
		});
		this.service.getAllNatureAo().subscribe((data) => {
			this.natureAoAll = data;
		});
		this.getDivisions();


		this.service.getAoById(this.idao)
		.pipe(finalize(() => {
			this.spinnerService.stop(spinnerRef);// stop spinner
		}))
		.subscribe((data) => {
			this.formData = data;

			if (data) {
				if (this.formData.dateOuverturePlis != null)
					this.formData.dateOuverturePlis = new Date(data.dateOuverturePlis).toISOString();
				if (this.formData.dateReception != null)
					this.formData.dateReception = new Date(data.dateReception).toISOString();
				if (this.formData.dateOuverturePlis != null) {
					var m = new Date(this.formData.dateOuverturePlis);
					this.heureOverturePlis = { hour: m.getHours(), minute: m.getMinutes() }
				}
			}

			if (data.modePassation == "Mieux disant") {
				document.getElementById("mdpassation").style.display = "inline-table";
				document.getElementById("pfinancier").style.display = "inline-table";
			}
			this.service2
				.getRessourceById(this.formData.division,"/services/divisions/")
				.subscribe((data) => {
					this.services = data;
				});
		},
			(err) => {
				console.log(err);
			});
				// Liste des types prestation
		this.service.getAllTypePrestationAo().subscribe((data) => {
			this.lisTypePrestationAo = data;
		});
	}

	backList() {
		this.router.navigate(["/marches/ao-list"]);
	}

	existenceVisite(e){
		this.formData.existanceVisite = e.checked;
		console.log(this.formData.existanceVisite);
	}
	existenceVisite2(){
		this.formData.existanceVisite = this.isVisible10;
		console.log("teeeeeeeeeeeeeeeeeest",this.formData.existanceVisite);
	}
	existEchantillon(){
		this.formData.existEchantillon = this.isVisible4;
		console.log("existEchantillon",this.formData.existEchantillon);
	}
	existanceAgrement(){
		this.formData.existanceAgrement = this.isVisible5;
		console.log("existanceAgrement",this.formData.existanceAgrement);
	}
 	existenceVisite6(){
		this.formData.existanceAllotisse = this.isVisible6;
		console.log("existanceAllotisse",this.formData.existanceAllotisse);
	}
	// =========================================================================
	//
	// =========================================================================
	onChangeofModePassation($event) {
		if ($event.value == "Mieux disant") {
			document.getElementById("mdpassation").style.display =
				"inline-table";
			//document.getElementById("seuilmin").style.display="inline-table";
			document.getElementById("pfinancier").style.display =
				"inline-table";
		} else {
			document.getElementById("mdpassation").style.display = "none";
			//document.getElementById("seuilmin").style.display="none";
			document.getElementById("pfinancier").style.display = "none";
		}
	}
	// =========================================================================
	//
	// =========================================================================
	onChange(event, index, item) {
		item.checked = !item.checked;
		console.log(
			"index: " +
			index +
			", label: " +
			item.label +
			", checked: " +
			item.checked
		);
		this.bool = item.checked;
	}
	// =========================================================================
	//
	// =========================================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// =========================================================================
	//
	// =========================================================================
	onChangeDivision(f) {
		const idDivision = f.value;
		this.formData.serviceGestionnaire = 0;
		if (idDivision != 0) {
			this.service2
				.getRessourceById(idDivision, "/services/divisions/")
				.subscribe(
					(data) => {
						this.services = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.services = null;
		}
	}
	// =========================================================================
	//
	// =========================================================================
	onSubmit(form: NgForm) {
		if (this.bool == true) {
			this.formData.statutAo.id = 3;
		}
		for (var i = 0; i < this.allpjs.length; i++) {
			this.service
				.nouvellepj(
					this.allpjs[i].selecetedFile,
					this.idao,
					this.allpjs[i].type.id,
					"AO",this.formPj.LabelPj
				)
				.subscribe((data) => {
					console.log(data);
				});
		}
		var dt = new Date(this.formData.dateOuverturePlis);
		this.formData.dateOuverturePlis = new Date(
			dt.getFullYear() +
			"/" +
			(dt.getMonth() + 1) +
			"/" +
			dt.getDate() +
			" " +
			this.heureOverturePlis.hour +
			":" +
			this.heureOverturePlis.minute
		);
		this.formData.modificateurUser = window.localStorage.getItem("fullnameUser");
		this.service.updateAoSM(this.formData).subscribe((res) => {
			this.router.navigate(["/marches/ao-list"]);
		});
	}
	// =========================================================================
	//
	// =========================================================================
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
		// this.selectedFiles = event.target.files;
	}
	// =========================================================================
	//
	// =========================================================================
	validerPj() {
		this.allpjs.push(this.formPj);
		//console.log("PJ TABLE : " + JSON.stringify(this.allpjs, null, 2));
		this.dataSource1 = new MatTableDataSource(this.allpjs);
		this.showAddDoc = false;
		this.formPj = { type: 0, selecetedFile: {},LabelPj:this.formPj.LabelPj };
	}
	// =========================================================================
	//
	// =========================================================================
	addItem() {
		this.showAddDoc = true;
	}
	// =========================================================================
	//
	// =========================================================================
	back() {
		this.router.navigate(["/marches/ao-list"]);
	}
	// =========================================================================
	// slide toggle button
	// =========================================================================
	change(e) {
		if (this.checked) {
			// at first, reset to the previous value
			// so that the user could not see that the mat-slide-toggle has really changed
			e.source.checked = true;
			this.bool = this.checked;
			const dialogRef = this.dialog.open(ConfirmDialogComponent);
			dialogRef.afterClosed().subscribe((response) => {
				//console.log("response ", response);
				if (response) {
					this.bool = false;
					this.checked = false;
					//console.log("+++++")
				} else {
					this.checked = true;
					this.bool = true;
					//console.log("####")
				}
			});
			//console.log("Send  : " + this.bool);
		} else {
			this.checked = !this.checked;
			this.bool = true;
			//console.log("Send YES : " + this.bool);
		}
	}
}
