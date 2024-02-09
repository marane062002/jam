import { ConfirmDialogComponent } from './../confirm-dialog/confirm-dialog.component';
import { Component, OnInit } from "@angular/core";
import * as $ from "jquery";
import { AoService } from "../../shared/ao.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { OrganisationService } from "../../organisation/organisation.service";
import { MatTableDataSource, MatDialog, MatSelectChange } from "@angular/material";
import { FilesUtilsService } from "../../utils/files-utils.service";
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { ConventionMarcheService } from '../../shared/conventionService';
import { ProgrammeService } from '../../shared/ProgrammeService';

@Component({
	selector: "kt-ao-form",
	templateUrl: "./ao-form.component.html",
	styleUrls: ["./ao-form.component.scss"],
})
export class AoFormComponent implements OnInit {
	checkLang: string;
	// ====================================================
	// variable  pour check  estimation 
	//=====================================================
	estimation:number;
	typePrestation:number;

	codes=[ "A", "B", "C", "D", "E", "F", "G"," H", "I"," J", "K", "L", "M", "N"," O", "P", "Q", "R", "S", "T", "U", "V", "W", "X"," Y", "Z"]

	// ====================================================
	//
	//=====================================================
	constructor(
		private service: AoService,
		private service2: OrganisationService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private fileUtils: FilesUtilsService,
		private dialog: MatDialog,
		private translate: TranslateService,
		private  programmeService:ProgrammeService,
		private conventionMarcheService:ConventionMarcheService
	) { this.checkLang = window.localStorage.getItem("language"); }
	// ====================================================
	//
	//=====================================================
	checked: boolean = false;
	formPj = { type: 0, selecetedFile: {},LabelPj:"" };
	allpjs = [];
	showAddDoc = false;
	unites;
	typeMarcheAll;
	natureAoAll;
	selectedCps;
	selectedRc;
	selectedOption = 1;
	bool;
	divisions: any;
	services: any;
	loading = false;
/* 	isSelected:false;
	isVisible=1;
	isVisible3=1; */

	
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
	


	listProjet;
  listConvention;
  listprogramme;
	lisTypePrestationAo;
	listSousTypePrestationAo;
	// ====================================================
	//
	//=====================================================
	dataSource1: MatTableDataSource<any>;
	displayedColumns1 = ["type", "nomDoc"];
	typeBien = [
		{ id: 1, libelle: "service1" },
		{ id: 2, libelle: "service2" },
	];
	typeBien1 = [
		{ id: 1, libelle: "division 1" },
		{ id: 2, libelle: "division 2" },
	];
	data = [{ label: "Envoyer au service marché", checked: false }];
	dataExistenceVisite = [{ label: "Existence des visites des lieux", checked: false }];
	formData = {
		id: 0,
		typeMarche: { id: 1, libelle: "" },
		natureAo: { id: 1, libelle: "" },
		statutAo: { id: 1, libelle: "" },
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
		objetAR : [""],
		loi :"",
		numAo: "",
		existanceVisite: false,
		service: 0,
		typeAO: "",
		sousTypePrestation: { id: 1, libelle: "" },
		naturePrix: "",
		createurUser: "",
		estimation:0,
		idProject: null,
		idConvention: null,

		existEchantillon: false,
		existanceAgrement: false,
		existanceAllotisse: "",
		qualification: "",
	};
	typesAO = ["PME", "Copérative" ,"Autoentrepreneur"];
	naturePrix = ["Révisable", "Non révisable"]; // Révisable = (1% des intérêt moratoires + 3% ..) (+4%)
	fromesLivarison = ["العرض الأدنى", "العرض الأفضل"];
	// ====================================================
	//
	//=====================================================
	ngOnInit() {
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
  

		  this.conventionMarcheService.all().subscribe(res=>{
			this.listConvention=res;
		  },err=>{
			console.log(err)
		  })
		this.service.getAlltypePjAo().subscribe((res) => {
			console.log(res);
			this.unites = res;
		});
		this.fileUtils.fileSizeDetector();
		this.getDivisions();
		this.service.getAllTypeMarche().subscribe((data) => {
			this.typeMarcheAll = data;
		});
		this.service.getAllNatureAo().subscribe((data) => {
			this.natureAoAll = data;
		});
		// Liste des types prestation
		this.service.getAllTypePrestationAo().subscribe((data) => {
			this.lisTypePrestationAo = data;
		});
	}

	// ====================================================
	// check estimation 
	//=====================================================

	changeBudgetEstimation(event:any){
		console.log(this.formData.budgetEstimatif)
		console.log(this.typePrestation)
		console.log(this.formData.budgetEstimatif>=75550000 && this.typePrestation ==1)
		if(this.formData.budgetEstimatif>=75550000 && this.typePrestation ==1){
			this.formData.estimation=40;
			this.estimation=40;

		}else if(this.formData.budgetEstimatif>=5364050 && (this.typePrestation ==2 ||this.typePrestation ==3) ){
				this.formData.estimation=40;
				this.estimation=40;
	
			
		}else{
			this.estimation=0;
		}
	}

	selectedCode(event:MatSelectChange){
		this.programmeService.finAllByCode(event.value).subscribe(res=>{
			this.listprogramme=res;
		  },err=>{
			console.log(err)
		  })
	}
	changeEstimation(event:any){

		if(this.estimation>0){
			this.formData.estimation=this.estimation;
			Swal.fire(
				"	L'estimation qui impacte la date de publication : ",
				'40 jours ',
				'warning'
			  )
		}
	}
	// ====================================================
	//
	//=====================================================
	getDivisions() {
		this.service2
			.getRessource("/divisions/index")
			.subscribe((data) => (this.divisions = data));
	}
	// ====================================================
	//
	//=====================================================
	save(event: any): void {
		$("#test").val(event.target.files[0].name);
		this.formPj.selecetedFile = event.target.files;
	}
	// ====================================================
	//
	//=====================================================
	validerPj() {
		this.allpjs.push(this.formPj);
		console.log(this.allpjs);
		this.dataSource1 = new MatTableDataSource(this.allpjs);
		this.showAddDoc = false;
		this.formPj = { type: 0, selecetedFile: {} ,LabelPj:this.formPj.LabelPj};
	}
	// ====================================================
	//
	//=====================================================
	addItem() {
		this.showAddDoc = true;
	}
	// ====================================================
	//
	//=====================================================
	onChangeDivision(f) {
		const idDivision = f.value;
		this.formData.service = 0;
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
	// ====================================================
	//
	//=====================================================
	onChangeTypePrestationAo(f) {
		const type = f.value;
		this.typePrestation=f.value;
		if (type != 0) {
			this.typePrestation=type;
			// Liste des sous types prestation
			this.service.getAllSoustypePresattaionAo(type)
				.subscribe(
					(data) => {
						this.listSousTypePrestationAo = data;
					},
					(error) => console.log(error)
				);
		} else {
			this.listSousTypePrestationAo = null;
		}
	}
	// ====================================================
	//
	//=====================================================
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
	// slide toggle button
	change(e) {
		if (this.checked) {
			// at first, reset to the previous value
			// so that the user could not see that the mat-slide-toggle has really changed
			e.source.checked = true;
			this.bool = this.checked;
			const dialogRef = this.dialog.open(ConfirmDialogComponent);
			dialogRef.afterClosed().subscribe((response) => {
				if (response) {
					this.bool = false;
					this.checked = false;
				} else {
					this.checked = true;
					this.bool = true;
				}
			});
			console.log("Send  : " + this.bool);
		} else {
			this.checked = !this.checked;
			this.bool = true;
			console.log("Send YES : " + this.bool);
		}
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
	// ====================================================
	//
	//=====================================================
	save1(event: any): void {
		this.selectedRc = event.target.files;
		console.log(this.selectedRc);
	}
	// ====================================================
	//
	//=====================================================
	onSubmit(form: NgForm) {
		if (this.bool == true) {
			this.formData.statutAo.id = 2;
			console.log("A: " + JSON.stringify(this.formData, null, 2));
		}
		this.loading = true;
		this.formData.createurUser = window.localStorage.getItem("fullnameUser");
		this.service.sendao(this.formData).subscribe((res) => {
			console.log("B: " + JSON.stringify(res, null, 2));
			if (this.allpjs.length > 0) {
				for (var i = 0; i < this.allpjs.length; i++) {
					this.service.nouvellepj(this.allpjs[i].selecetedFile,	res.id,	this.allpjs[i].type.id,"AO",this.formPj.LabelPj)
						.subscribe((data) => {
							console.log("C: " + JSON.stringify(data, null, 2));
						});
				}
			}
			/*  this.service.nouvellepjCps(this.selectedCps,res.id).subscribe(result => {
      })
      this.service.nouvellepjRc(this.selectedRc,res.id).subscribe(result => {
      })*/
			this.router.navigate(["/marches/ao-list"]);
		});
	}
	// ====================================================
	//
	//=====================================================
	backList() {
		this.router.navigate(["/marches/ao-list"]);
	}
}
