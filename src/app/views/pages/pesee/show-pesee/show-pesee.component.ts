import { AssociationService } from "../../utils/association.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatAccordion } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from '@ngx-translate/core';
import { FilesUtilsService } from '../../utils/files-utils.service';
import { SpinnerService } from '../../utils/spinner.service';
import { Produit } from "../../../../core/_base/layout/models/produit";
import { Emballage } from "../../../../core/_base/layout/models/emballage";
import { round } from "lodash";
import { DatePipe } from "@angular/common";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { AuthService } from "../../../../core/auth";

export interface Association360Tab {
	label: string;
	content: string;
}

@Component({
	selector: 'kt-show-pesee',
	templateUrl: './show-pesee.component.html',
	styleUrls: ['./show-pesee.component.scss']
})

export class ShowPeseeComponent implements OnInit {
	language=localStorage.getItem('language');
	@ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;
	// ============================================
	// Datasource mandat
	// ============================================
	dataSource = new MatTableDataSource<any>();
	isLoading = true;
	history: boolean = false;

	// =====================================
	// Declarations
	// =====================================
	asyncTabs: Observable<Association360Tab[]>;
	selected = new FormControl(0);
	id: number;
	details;
	isLoadingResults = true;
	files: Observable<any>;
	start: boolean = true;
	assocInfo: boolean = false;
	nbMembre: number = 0;
	nbrH: number = 0;
	nbrF: number = 0;
	mandatList: Array<{
		id: string,
		dateD: string,
		dateF: String,
		mandat: string,
		duree: string,
		totalMmbre: number,
		totalMmbreH: number,
		totalMmbreF: number
	}> = [];
	tab: Array<{
		totalMmbreH: number,
		totalMmbreF: number
	}> = [];
	mandatdata: any;
	public obs$: Observable<any[]>
	myData: BehaviorSubject<number> = new BehaviorSubject<number>(0);
	varData: any;
	// ============================================
	// Constructeur
	// ============================================
	constructor(
		private service: AssociationService,
		private router: Router,
		protected activatedRoute: ActivatedRoute,

		private translate: TranslateService,
		private fileService: FilesUtilsService,
		private spinnerService: SpinnerService,
		private datePipe: DatePipe,
		private authService:AuthService
	) { }
	// =====================================
	// Afficher les details association
	// =====================================
	taxe = "7%"
	showPesee: any
	private fieldArray: Array<any> = [];
	peseeForm: FormGroup;
	PeseeProduit: any;
	chiffreTransaction: any;
mondataire
	ngOnInit() {

		this.activatedRoute.data.subscribe(({ Showpesee }) => {
			this.authService.getUserById(Showpesee.idCompte).then((res)=>{

this.mondataire=res.fullname
			})
			
			this.showPesee = Showpesee
			if (this.showPesee != null && this.showPesee.date!=null && this.showPesee.heure!=null) {
				this.showPesee.date = this.datePipe.transform(this.showPesee.date + ' ' + this.showPesee.heure, 'yyyy-MM-dd HH:mm');
			}
			if (this.showPesee.chiffreTransaction != null) {
				this.chiffreTransaction = (this.showPesee.chiffreTransaction).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });;
				this.showPesee.partCommune = (this.showPesee.chiffreTransaction * 0.0525).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });;
				this.showPesee.partMondataire = (this.showPesee.chiffreTransaction * 0.0175).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });;
				this.showPesee.taxe = (this.showPesee.chiffreTransaction * 0.07).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });;
			}
			console.log(this.showPesee);
			this.PeseeProduit = this.showPesee.peseeProduits;
			if (this.PeseeProduit.length > 0) {
				for (let i = 0; i < this.PeseeProduit.length; i++) {
					if (this.PeseeProduit[i].produit != null) {
						if (this.PeseeProduit[i].produit.tarif != null) {
							this.PeseeProduit[i].produit.tarif = (this.PeseeProduit[i].produit.tarif).toLocaleString("fr", { minimumFractionDigits: 1, maximumFractionDigits: 1, useGrouping: true });;
							this.PeseeProduit[i].totalProduit = (this.PeseeProduit[i].totalProduit).toLocaleString("fr", { minimumFractionDigits: 2, maximumFractionDigits: 2, useGrouping: true });;

						}
					}
				}
			}
			console.log("peseeproduit====>", this.PeseeProduit);


		});
		this.peseeForm = new FormGroup({
			// imm: new FormControl("", [Validators.required]),
			// prod: new FormControl(),
			numBon: new FormControl(this.showPesee.numBon, [Validators.required]),
			date: new FormControl("", [Validators.required]),
			poidGlobal: new FormControl("", [Validators.required]),
			poidEmballageTotal: new FormControl("", [Validators.required]),
			totalPoidNet: new FormControl("", [Validators.required]),
			taxe: new FormControl("", [Validators.required]),

			vehicule: new FormGroup({
				id: new FormControl("", Validators.required),
			}),
			// utilisateurs: new FormGroup({
			// 	id: new FormControl("", Validators.required),
			// }),
			hangar: new FormGroup({
				id: new FormControl("", Validators.required),
			}),
			// typeProduit: new FormControl(""),
			// quantiteProduit: new FormControl(""),
			// tarif: new FormControl(""),
			// poidNetProduit: new FormControl(""),
			// totalProduit: new FormControl(""),
			tarra: new FormControl("", [Validators.required]),
			// emballage: new FormControl(),
			peseeProduits: new FormControl([]),
			// poidEmballageProduit: new FormControl([], Validators.required),
			chiffreTransaction: new FormControl("", Validators.required),
			restePoid: new FormControl("", Validators.required),
			// entreeArticleSotck: this.fb.array([]),
		});



		let pp = {
			numBon: this.peseeForm.get("numBon").value,
			// prod: "",
			// typeProduit: "",
			// tarif: "",
			produit: Produit,
			poidNetProduit: "",
			emballage: Emballage,
			poidEmballageProduit: "",
			quantiteProduit: "",
			totalProduit: "",
		};

		this.fieldArray.push(pp);
		this.dataSource = new MatTableDataSource(this.fieldArray);

		// this.id = this.route.snapshot.params["id"];
		// this.service
		// 	.getObjectById("/affaire/show/", this.id)
		// 	.subscribe(
		// 		(data) => {
		// 			console.log("12222222222");
		// 			console.log(data);
		// 			this.details = data;
		// 			this.dataSource = new MatTableDataSource(data);
		// 		},

		// 		(error) => {
		// 			console.log(error);
		// 		}
		// 	);
	}
	// =====================================
	// back to list
	// =====================================
	back() {
		//this.location.back();
		this.router.navigate(["pesee/list-pesees"]);
	}
	formatNumVehicule(value: any): string {
		return "\u202A" + value.numVehiculeNumbers + "\u202A" + value.numVehiculeAlphabet + "\u202C" + value.numVehiculeTwoNumbers;
	}
	// ============================================
	//
	// ============================================
	toPrint: any;

	printCourrierEntrant(data: any): void {
		this.toPrint = data;
		this.authService.getUserById(this.toPrint.idCompte).then((res)=>{

			this.toPrint.mondataire=res.fullname
			setTimeout(() => {
				var spinnerRef = this.spinnerService.start(this.translate.instant("PAGES.GENERAL.LOADING"));
				let DATA: any = document.getElementById("htmlData");
	
				html2canvas(DATA, {}).then((canvas) => {
					const FILEURI = canvas.toDataURL("image/png");
					let PDF = new jsPDF("p", "mm", "a4");
					let fileWidth = PDF.internal.pageSize.getWidth();
					let fileHeight = (canvas.height * fileWidth) / canvas.width;
					let position = 0;
					PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
					PDF.save("Reçu N° " + this.toPrint.numBon + ".pdf");
					this.spinnerService.stop(spinnerRef);
				});
			}, 250);
						})
		
	
	}


}
