import { HttpResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CheckboxControlValueAccessor, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Observable, Subject } from "rxjs";
import { map, startWith, take, takeUntil } from "rxjs/operators";
import { Emballage } from "../../../../core/_base/layout/models/emballage";
import { Produit } from "../../../../core/_base/layout/models/produit";
import { Hangar } from "../../../../core/_base/layout/models/Hangar";
import { Vehicule } from "../../../../core/_base/layout/models/vehicule";
import { EmballageService } from "../../marcheGros/Service/emballage.service";
import { HangarService } from "../../marcheGros/Service/hangar.service";
import { ProduitService } from "../../marcheGros/Service/produit.service";
import { PeseeService } from "../Services/pesee.service";
import { VehiculeService } from "../Services/vehicule.service";
import { MatPaginator, MatSelect, MatTable, MatTableDataSource } from "@angular/material";
import { ThrowStmt } from "@angular/compiler";
import { Pesee } from "../../../../core/_base/layout/models/pesee";
import { PeseeProduit } from "../../../../core/_base/layout/models/pesee-produit";
import Swal from "sweetalert2";
import { DatePipe } from "@angular/common";
import { AuthService } from "../../../../core/auth";
import { GestionPartsService } from "../../parametrage/Services/gestion-des-parts.service";

@Component({
	selector: "kt-edit-pesee",
	templateUrl: "./edit-pesee.component.html",
	styleUrls: ["./edit-pesee.component.scss"],
})
export class EditPeseeComponent implements OnInit {
	num_genre
	maxIds
	Hangar: Hangar[];
	public dataImm: Vehicule[];

	constructor(				private gestionPartsService: GestionPartsService,
		private serviceUser: AuthService,
		private datePipe: DatePipe, private router: Router, private peseeService: PeseeService, private translate: TranslateService, private hangarService: HangarService, private vehiculeServ: VehiculeService, private prodServ: ProduitService, private embServ: EmballageService, protected activatedRoute: ActivatedRoute) { }
	// numBon: number = JSON.parse(localStorage.getItem("numBon")) | 0;
	numBon: number;

	getCurrentDateTime(): string {
		const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
		const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

		const now = new Date();
		const dayOfWeek = daysOfWeek[now.getDay()];
		const day = now.getDate();
		const month = months[now.getMonth()];
		const year = now.getFullYear();
		const hours = this.padZero(now.getHours());
		const minutes = this.padZero(now.getMinutes());

		return `${dayOfWeek} ${day} ${month} ${year} ${hours}:${minutes}`;
	}
	padZero(value: number): string {
		return value.toString().padStart(2, '0');
	}
	@ViewChild("exportData", { static: false }) table: MatTable<any>;
	columns: any[];

	displayedColumns: string[] = [
		"NumProduit",
		"TypeProduit",
		"Prix",
		"PoidsNet",
		"TypeEmballage",
		"Quantite",
		"Total",
		"actions"
	];

	data: Produit[] = [];
	protected _onDestroy = new Subject<void>();
	@ViewChild("singleSelect", { static: true }) singleSelect: MatSelect;
	PeseeForm = new FormGroup({

		numBon: new FormControl(""),
		nomConducteur: new FormControl("", [Validators.required]),
		date: new FormControl("", [Validators.required]),
		poidGlobal: new FormControl("", [Validators.required]),
		numGenre: new FormControl("", [Validators.required]),
		poidEmballageTotal: new FormControl("", [Validators.required]),
		totalPoidNet: new FormControl(0, [Validators.required]),
		taxe: new FormControl("", [Validators.required]),
		PeseeProduitForm: new FormGroup({
			quantiteProduit: new FormControl(0, [Validators.required]),
			poidNetProduit: new FormControl(0, [Validators.required]),
			totalProduit: new FormControl(0, [Validators.required]),
			numProduit: new FormControl(0, [Validators.required]),
			TypeProduit: new FormControl(0, [Validators.required]),
			tarif: new FormControl(0, [Validators.required]),
			TypeEmballage: new FormControl(0, [Validators.required]),
		}),
		vehicule: new FormGroup({
			id: new FormControl("", Validators.required),
		}),
		genre: new FormControl("", Validators.required),

		hangar: new FormGroup({
			id: new FormControl("", Validators.required),
		}),
		mondataire: new FormGroup({
			id: new FormControl("", Validators.required),
		}),
		tarra: new FormControl("", [Validators.required]),
		peseeProduits: new FormControl([]),
		chiffreTransaction: new FormControl("", Validators.required),
		restePoid: new FormControl("", Validators.required),
		penalite: new FormControl(0),
		createurUser:new FormControl(window.localStorage.getItem("fullnameUser"))
	});
	Pesee: any;
	PeseeProduit: any;
	showButton: boolean = false;

	public filteredBanks: Observable<Vehicule[]> = new Observable<Vehicule[]>();
	public prods: Observable<Produit[]> = new Observable<Produit[]>();
	private _filter(value: string): Vehicule[] {
		const filterValue = value.toLowerCase();
		let list: Vehicule[] = this.dataImm.filter((option) => option.numVehicule.toLowerCase().indexOf(filterValue) > -1);
		this.showButton = list.length === 0;
		return list;
	}

	private _filter1(value: number): Produit[] {
		const filterValue = value.toString();
		let list: Produit[] = this.datap.filter((option) => option.refProduit.toString().indexOf(filterValue) > -1);
		this.showButton = list.length === 0;
		return list;
	}
	datap: Produit[] = [];
	Emb: Emballage[];
	currentTime: string;

	datePesee
	Mondataires
	parts
	ngOnInit() {
		
		this.serviceUser.getUserByRole(34).then((res: any) => {
			this.Mondataires=res
			
		})
		
		this.prodServ.getAllProduits().subscribe({
			next: (res: HttpResponse<Produit[]>) => {
				this.data = res.body;
				this.typeProduitOptions=res.body
				
				console.log("les produits================>", this.data);
			},
			error: () => { },
		});
		this.PeseeForm.controls['date'].setValue(this.getCurrentDateTime());
		
		this.currentTime = this.getCurrentDateTime();
		
		setInterval(() => {
			this.currentTime = this.getCurrentDateTime();
		}, 60000);
		

		this.columns = [
			"NumProduit",
			"TypeProduit",
			"Prix",
			"PoidsNet",
			"TypeEmballage",
			"Quantite",
			"Total",
			"action"];
			
		// this.vehiculeServ.query().subscribe({
		// 	next: (res: HttpResponse<Vehicule[]>) => {
		// 		for (let i = 0; i < res.body.length; i++) {
		// 			res.body[i].numVehicule = "\u202A" +
		// 				res.body[i].numVehiculeNumbers + "\u202A" +
		// 				res.body[i].numVehiculeAlphabet + "\u202C" +
		// 				res.body[i].numVehiculeTwoNumbers
		// 		}
		// 		this.dataImm = res.body;
		// 		
		// 		let vehicule = this.PeseeForm.get("vehicule");
		// 		
		// 		this.filteredBanks = vehicule.get("id").valueChanges.pipe(
		// 			startWith(""),
		// 			map((value) => this._filter(value || ""))
		// 		);
		// 		console.log("les vehicles==========>", this.dataImm);
		// 	},

		// 	error: () => { },
		// });

		// if (this.PeseeForm.get("vehicule").get("id").value) {
		// 	let selectedTypeV = this.dataImm.filter((item) => item.id == this.PeseeForm.get("vehicule").get("id").value);
		// 	this.v = selectedTypeV[0];
		// }
		this.prodServ.getAllProduits().subscribe({
			next: (res: HttpResponse<Produit[]>) => {
				this.datap = res.body;
				console.log("les produits================>", this.datap);
				/* this.prods = this.PeseeForm.get("prod").valueChanges.pipe(
					startWith(""),
					map((value) => this._filter1(value || ""))
				); */

			},
			error: () => { },
		});
		this.embServ.getAllEmballages().subscribe({
			next: (res: HttpResponse<Emballage[]>) => {
				this.Emb = res.body;
				console.log("emballage=======>", this.Emb);
			},

			error: () => { },
		});
		this.hangarService.getAllHangars().subscribe({
			next: (res: HttpResponse<Hangar[]>) => {
				this.Hangar = res.body;
				console.log("hangar", this.Hangar);
			},

			error: () => { },
		});
		//
		this.activatedRoute.data.subscribe(({ pesee }) => {
			// this.serviceUser.getUserById()
			if(pesee.gestionParts!=null){
				this.gestionPartsService.getPartsById(pesee.gestionParts.id).subscribe((res)=>{
				this.parts=res
				})
			}
			
			pesee.vehicule.numVehicule = "\u202A";

			this.RestePoid = pesee.restePoid
			this.taxe = pesee.taxe
			this.totalPoidNet = pesee.totalPoidNet
			this.chiffreTransaction = pesee.chiffreTransaction
			this.poidEmballage = pesee.poidEmballageTotal
			
			this.PeseeForm.get('tarra').setValue(pesee.vehicule.tarra);
			/* const vehiculeFormControl = this.PeseeForm.get('vehicule');
			vehiculeFormControl.setValue(pespshow-peseeee.vehicule); */
			this.maxIds = pesee.numBon;
			if (pesee.date != null && pesee.heure != null) {
				this.datePesee = this.datePipe.transform(pesee.date + ' ' + pesee.heure, 'yyyy-MM-dd HH:mm');
			}
			if (pesee.date == null && pesee.heure != null) {
				this.datePesee = this.datePipe.transform(pesee.heure, 'HH:mm');
			}
			if (pesee.date != null && pesee.heure == null) {
				this.datePesee = this.datePipe.transform(pesee.date, 'yyyy-MM-dd');
			}
			
			this.vehiculeServ.AllVehicule().subscribe((res)=>{
					for (let i = 0; i < res.length; i++) {
						res[i].numVehicule = "\u202A" +
							res[i].numVehiculeNumbers + "\u202A" +
							res[i].numVehiculeAlphabet + "\u202C" +
							res[i].numVehiculeTwoNumbers
					}
					this.dataImm = res;
					
					let vehicule = this.PeseeForm.get("vehicule");
					
					this.filteredBanks = vehicule.get("id").valueChanges.pipe(
						startWith(""),
						map((value) => this._filter(value || ""))
					);
					console.log("les vehicles==========>", this.dataImm);
					this.getvehicule(pesee.vehicule.id);
					this.PeseeForm.patchValue({vehicule:{id:pesee.vehicule.id}})

	
			});

			this.PeseeForm.patchValue({ ...pesee });
			
			this.PeseeForm.patchValue({mondataire:{id:pesee.idCompte}})
			

			console.log(this.PeseeForm.value);
			this.Pesee = pesee;


			this.PeseeProduit = this.Pesee.peseeProduits;
			console.log("1111111111", this.Pesee.penalite);
			console.log("222222222", this.PeseeProduit);

			this.dataSource = new MatTableDataSource(this.PeseeProduit);

		});
		

		console.log(this.Pesee);
	}
	v: Vehicule;
	selectedVehicule: number;
	testV = false;
	
	onSelectionChangeV(event: any) {
		if( typeof event==='number'){
			
			let selectedTypeV = this.dataImm.filter((item) => item.id == event);
			this.v = selectedTypeV[0];
			this.selectedVehicule = selectedTypeV[0].tarra;
			this.PeseeForm.get("tarra").setValue(this.selectedVehicule);
			let r = this.PeseeForm.get("poidGlobal").value - (this.PeseeForm.get("tarra").value + this.PeseeForm.get("poidEmballageTotal").value + this.PeseeForm.get("totalPoidNet").value);
			
			if (r >= 0) {
				this.testV = true;
				this.PeseeForm.get("restePoid").setValue(r);
			}
			
			console.log("selected vehicule", this.selectedVehicule);

		}else{
			console.log("event.target vehicule", event.option.value);
			if (event.option.value) {
				let selectedTypeV = this.dataImm.filter((item) => item.id == event.option.value);
				this.v = selectedTypeV[0];
				this.selectedVehicule = selectedTypeV[0].tarra;
				this.PeseeForm.get("tarra").setValue(this.selectedVehicule);
				let r = this.PeseeForm.get("poidGlobal").value - (this.PeseeForm.get("tarra").value + this.PeseeForm.get("poidEmballageTotal").value + this.PeseeForm.get("totalPoidNet").value);
				if (r >= 0) {
					this.testV = true;
					this.PeseeForm.get("restePoid").setValue(r);
				}
	
				console.log("selected vehicule", this.selectedVehicule);
	
	
			}
		}
		
	}


	private fieldArray: Array<any> = [];
	private newAttribute: any = {};
	currentPeseeIndex: number = -1;
	dataSource = new MatTableDataSource<any>();
	dataSourceEdit = new MatTableDataSource<any>();

	addEnregistrement() {

		let pp = {
			id: null,
			numBon: this.PeseeForm.get("numBon").value,

			produit: new Produit(),
			poidNetProduit: 0,
			emballage: new Emballage(),
			poidEmballageProduit: 0,
			quantiteProduit: 0,
			totalProduit: 0,
			isEdit: true,
		};

		this.dataSource.data = [pp].concat(this.dataSource.data);
		this.Edit = false;


	}
	totalPoidNet: any = 0;
	chiffreTransaction: any = 0;
	taxe = 0;
	RestePoid = 0;

	ancienchiffretransaction = 0;
	calculTotalPoidNet(row) {
		if (this.Edit == false) {
			this.ancientotalPoidNet = 0;
		}
		console.log(this.dataSource.data);
		this.totalPoidNet = this.dataSource.data.reduce((total, current) => total + parseInt(current.poidNetProduit), 0);
		this.chiffreTransaction = this.dataSource.data.reduce((total, current) => total + parseInt(current.totalProduit), 0);
		this.taxe = (this.chiffreTransaction * this.parts.partMontant) / 100;
		this.RestePoid;
		this.totalPoidNet;
		
		this.RestePoid = this.RestePoid + this.ancientotalPoidNet - row.poidNetProduit;
		
		if (this.RestePoid < 0) {
			Swal.fire({
				title: this.translate.instant("le reste doit être sup a 0"),

				showCloseButton: true,

			}).then((result) => {
				this.ancientotalPoidNet = row.poidNetProduit;
				this.ancienchiffretransaction = row.totalProduit;

				this.totalPoidNet -= this.ancientotalPoidNet;
				this.chiffreTransaction -= this.ancienchiffretransaction;
				this.taxe = (this.chiffreTransaction * this.parts.partMontant) / 100;

				this.RestePoid += this.ancientotalPoidNet;


				row.isEdit = true;
				this.ancientotalPoidNet = 0;
				this.ancienchiffretransaction = 0;
				
			});
		} else {
			this.RestePoid = this.RestePoid;
			this.calculTotalQuantite(row);
		}
	}
	poidEmballage = 0;

	calculTotalQuantite(row) {
		if (this.Edit == false) {
			this.ancienpoidEmballageProduit = 0;
		}
		this.poidEmballage = this.dataSource.data.reduce((total, current) => total + parseInt(current.poidEmballageProduit), 0);
		this.RestePoid;

		this.RestePoid = this.RestePoid + this.ancienpoidEmballageProduit - row.poidEmballageProduit;
		
		if (this.RestePoid < 0) {
			Swal.fire({
				title: this.translate.instant("le reste doit être sup a 0"),

				showCloseButton: true,

			}).then((result) => {
				this.ancienpoidEmballageProduit = row.poidEmballageProduit;

				this.RestePoid = this.RestePoid - this.ancienpoidEmballageProduit;

				this.poidEmballage -= this.poidEmballage - this.ancienpoidEmballageProduit;

				row.isEdit = true;
				this.ancienpoidEmballageProduit = 0;
			});

		} else {
			this.RestePoid = this.RestePoid;
		}
	}
	editRow(row: PeseeProduit) {
		if (row.id === null) {
			this.PeseeForm.value.PeseeProduitForm;
			
			this.dataSourceEdit.data.push(row);
			row.isEdit = false;
			
			this.calculTotalPoidNet(row);
			

		} else {
			;

			this.peseeService.updatePeseeProduit(row).subscribe((res) => {
				row.isEdit = false;
				this.calculTotalPoidNet(row);
				;
			});
		}
	}
	ancientotalPoidNet = 0;
	ancienpoidEmballageProduit = 0;
	Edit: boolean = false;
	isEditChange(row) {
		this.ancientotalPoidNet = row.poidNetProduit;
		this.ancienpoidEmballageProduit = row.poidEmballageProduit;

		row.isEdit = true;
		this.Edit = true;
	}
	changeTotalQuantite(event: any, i: number) {
		this.dataSource.data[i].poidEmballageProduit = this.dataSource.data[i].emballage.poidEmballage * parseInt(event.target.value);
		this.dataSource.data[i].quantiteProduit = parseInt(event.target.value);


	}
	changeTotalPoidNet(event: any, i: number) {
		this.dataSource.data[i].poidNetProduit = parseInt(event.target.value);
		this.dataSource.data[i].totalProduit = parseInt(event.target.value) * this.dataSource.data[i].produit.tarif;

		this.dataSource = new MatTableDataSource(this.dataSource.data);
	}
	onSelectionChangeH(event) { }

	deleteRow(index) {

		this.totalPoidNet -= this.dataSource.data[index].poidNetProduit

		this.poidEmballage -= this.dataSource.data[index].poidEmballageProduit
		this.RestePoid += this.dataSource.data[index].poidNetProduit + this.dataSource.data[index].poidEmballageProduit


		this.chiffreTransaction -= this.dataSource.data[index].totalProduit
		this.taxe = (this.chiffreTransaction * this.parts.partMontant) / 100
		this.dataSource.data.splice(index, 1)
		this.dataSource = new MatTableDataSource(this.dataSource.data);



	}

	selecteProduct: string = "";
	prix: number;
	onSelectionChangeType(event: any, i: number) {

		if (event.option.value != null) {
			let selectedType = this.data.filter(
				(item) => item.lib == event.option.value
			);
			console.log("=========>", selectedType[0]);
			// this.fieldArray[i].produit = selectedType[0];
			// this.fieldArray[i].produit.lib = selectedType[0].lib;
			// this.fieldArray[i].produit.tarif = selectedType[0].tarif;
			// this.fieldArray[i].produit.refProduit = selectedType[0].refProduit;
			// this.dataSource = new MatTableDataSource(this.fieldArray);


			 ;this.selecteProduct = "" + selectedType[0].lib;
			 ;this.prix = selectedType[0].tarif;
			 ;this.dataSource.data[i].produit = selectedType[0];
			 ;this.dataSource.data[i].produit.lib = this.selecteProduct;
			this.dataSource.data[i].produit.tarif = this.prix;
			 ;this.dataSource = new MatTableDataSource(this.dataSource.data);
			
		}
	}
	typeProduitOptions: any[] = []; // This should be an array of strings representing the options for TypeProduit

// Method to filter options based on user input
filterTypeProduitOptions(value: string): void {
    // Perform filtering on your options array based on the input value
    // For example, if typeProduitOptions is an array of strings, you can filter like this:
    this.typeProduitOptions = this.data.filter(option => option.lib.toLowerCase().includes(value.toLowerCase()));
}

	onSelectionChange(event: any, index: number) {

		if (event.option.value != null) {
			//
			let selectedType = this.datap.filter(
				(item) => item.refProduit == event.option.value
			);


			this.selecteProduct = "" + selectedType[0].typeProduit.nomArticleProduit;
			this.prix = selectedType[0].tarif;


			this.dataSource.data[index].produit = selectedType[0];

			this.dataSource.data[index].produit.lib = this.selecteProduct;
			this.dataSource.data[index].produit.tarif = this.prix;

			this.dataSource = new MatTableDataSource(this.dataSource.data);

		}
	}
	test = 0;
	r = 0;

	ondelete(event: number, index: number) {
		this.test = 1;

		this.somme = this.PeseeForm.get("totalPoidNet").value;
		this.p = this.PeseeForm.get("chiffreTransaction").value;

		this.r += this.somme;

		console.log(this.PeseeProduit[index].totalProduit);
		this.somme -= this.PeseeProduit[index].poidNetProduit;
		this.p -= this.PeseeProduit[index].totalProduit;

		this.PeseeProduit[index].poidNetProduit = +event;
		this.PeseeProduit[index].totalProduit = parseFloat("" + event) * parseFloat(this.PeseeProduit[index].produit.tarif);
		this.p += this.PeseeProduit[index].totalProduit;

		this.somme += this.PeseeProduit[index].poidNetProduit;

		this.PeseeForm.get("totalPoidNet").setValue(this.somme);
		this.PeseeForm.get("chiffreTransaction").setValue(this.p);

		this.PeseeForm.get("restePoid").setValue((this.r -= this.somme));

		this.PeseeForm.get("taxe").setValue((this.p * this.parts.partMontant) / 100 + this.PeseeForm.get("penalite").value);
		if (this.PeseeProduit[index].poidNetProduit == 0) {
			this.PeseeProduit[index].totalProduit = 0;
			this.PeseeForm.get("totalPoidNet").setValue(this.somme);
			this.PeseeForm.get("chiffreTransaction").setValue(this.PeseeProduit[index].totalProduit);
			this.PeseeForm.get("taxe").setValue(this.PeseeForm.get("penalite").value);
		}

		this.dataSource = new MatTableDataSource(this.PeseeProduit);
	}
	test1() {
		this.test = 0;
	}
	poidNet: number;
	total: number = 0;
	poidnettotal: number = 0;
	t = 0;
	pa = 0;
	pnt = 0;

	somme = 0;

	onSelectionChangeP(event: number, index: number) {

		if (this.test == 0) {
			this.pa = +this.PeseeForm.get("chiffreTransaction").value;
			this.PeseeProduit[index].totalProduit = parseFloat("" + event) * parseFloat(this.PeseeProduit[index].produit.tarif);
			this.r += this.PeseeForm.get("totalPoidNet").value;
			this.PeseeProduit[index].poidNetProduit = event;
			console.log(this.PeseeProduit[index].poidNetProduit);
			this.somme = this.PeseeForm.get("totalPoidNet").value;

			this.somme += +this.PeseeProduit[index].poidNetProduit;
			this.pa += +this.PeseeProduit[index].totalProduit;
			this.r -= this.somme;
			this.PeseeForm.get("chiffreTransaction").setValue(this.pa);
			this.PeseeForm.get("taxe").setValue((this.pa * this.parts.partMontant) / 100 + this.PeseeForm.get("penalite").value);
			this.PeseeForm.get("totalPoidNet").setValue(this.somme);
			this.PeseeForm.get("restePoid").setValue(this.r);

			this.dataSource = new MatTableDataSource(this.PeseeProduit);
		}

	}


	getvehicule(id: number) {
		if (this.dataImm != undefined) {
			return this.dataImm.find((vehicule) => vehicule.id === id).numVehicule;
		}
	}
	poidE: number = 0;
	a = 0;
	onSelectionChangeE(event: any, i) {
		this.r += this.sp;

		this.sp -= this.dataSource.data[i].poidEmballageProduit;
		if (event.option.value) {
			let selectedType = this.Emb.filter((item) => item.description == event.option.value);
			this.e = selectedType[0];
			this.dataSource.data[i].poidEmballageProduit = this.e.poidEmballage;
			this.dataSource.data[i].emballage = this.e;
			console.log("emballage choisit", this.dataSource.data[i].emballage);
			console.log(this.dataSource.data);

			this.dataSource.data[i].poidEmballageProduit = this.dataSource.data[i].quantiteProduit * this.e.poidEmballage;
			for (let j = i; j < this.dataSource.data.length; j++) {
				this.sp += this.dataSource.data[j].poidEmballageProduit;
				this.r -= this.sp;
			}
		}

		this.dataSource = new MatTableDataSource(this.dataSource.data);

	}

	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	ngAfterViewInit() {
		this.setInitialValue();
		this.dataSource.paginator = this.paginator;
	}
	ngOnDestroy() {
		this._onDestroy.next();
		this._onDestroy.complete();
	}
	protected setInitialValue() {
		this.filteredBanks.pipe(take(1), takeUntil(this._onDestroy));

	}

	pe: number = 0;
	PoidEmbTotal = 0;

	sp = 0;
	e: any;
	onSelectionChangeQ(event: number, i: number) {

		this.r += this.sp;

		this.sp -= this.PeseeProduit[i].poidEmballageProduit;

		this.PeseeProduit[i].quantiteProduit = event;
		this.PeseeProduit[i].poidEmballageProduit = this.e.poidEmballage * event;
		this.sp += +this.e.poidEmballage * event;

		this.r -= this.sp;

		this.PeseeForm.get("poidEmballageTotal").setValue(this.sp);
		this.PeseeForm.get("restePoid").setValue(this.r);

		this.dataSource = new MatTableDataSource(this.PeseeProduit);
	}
	ondeleteQ(event, index: number) {

	}




	show: boolean = false;

	testPT = false;
	onSelectionChangePT(event: number) {
		this.testPT = true;
		if (this.PeseeForm.get("vehicule").get("id").value) {
			let selectedTypeV = this.dataImm.filter((item) => item.id == this.PeseeForm.get("vehicule").get("id").value);
			this.v = selectedTypeV[0];
		}
		
		this.v.tarra;

		
		if (event < this.PeseeForm.get("tarra").value) {
			alert("poidGlobal doit etre > tarra==========>");
		} else {
			let t = this.v.tarra;
			let p = this.PeseeForm.get("poidEmballageTotal").value;
			let to = this.PeseeForm.get("totalPoidNet").value;
			this.r = event - (t + to + p);
			
			if (this.r >= 0) {
				this.PeseeForm.get("restePoid").setValue(this.r);
				this.RestePoid=this.r
				
			}
		}
	}
	annuler() {
		this.router.navigate(["pesee/list-pesees"]);
	}
	confirmbox() {
		console.log(this.Pesee.penalite);
		console.log(this.Pesee);

		if (this.PeseeForm.get("vehicule").get("id").value) {
			let selectedTypeV = this.dataImm.filter((item) => item.id == this.PeseeForm.get("vehicule").get("id").value);
			this.v = selectedTypeV[0];
		}
		console.log("aaaaaaaaaaaaaaaaaaaaaaaaa");
		if (this.testV) {
		}
		let pesee = {
			statutPesee:this.Pesee.statutPesee,
			heure:this.Pesee.heure,
			nomConducteur: this.PeseeForm.get("nomConducteur").value,
			idCompte: this.PeseeForm.get("mondataire").value.id,
			chiffreTransaction: this.chiffreTransaction,
			date: this.PeseeForm.get("date").value,
			// heure: this.PeseeForm.get("date").value.split("T")[1],
			hangar: this.PeseeForm.get("hangar").value,
			numBon: this.PeseeForm.get("numBon").value,
			numGenre: this.PeseeForm.get("numGenre").value,
			peseeProduits: this.dataSource.data,
			poidEmballageTotal: this.poidEmballage,
			poidGlobal: this.PeseeForm.get("poidGlobal").value,
			restePoid: this.PeseeForm.get("restePoid").value,
			taxe: this.taxe + this.PeseeForm.get("penalite").value,
			totalPoidNet: this.totalPoidNet,
			vehicule: this.v,
			id: this.Pesee.id,
			genre: this.PeseeForm.get('genre').value,
			penalite: this.Pesee.penalite,
			createurUser:this.PeseeForm.get('createurUser').value,
			gestionParts: { id: this.parts.id },

		};
		let a=this.PeseeForm.get("poidGlobal").value < pesee.vehicule.tarra + this.PeseeForm.get("poidEmballageTotal").value + this.PeseeForm.get("totalPoidNet").value
		
		if (this.RestePoid != 0) {
			Swal.fire({
				title: this.translate.instant("le reste doit être égale à 0"),

				showCloseButton: true,

			}).then((result) => { })
		}
		else if (this.PeseeForm.get("poidGlobal").value < pesee.vehicule.tarra + this.PeseeForm.get("poidEmballageTotal").value + this.PeseeForm.get("totalPoidNet").value) {

			alert("poid global doit etre > la somme");


		} /* else {
			if (this.testV) {
				let r = this.PeseeForm.get("poidGlobal").value - (this.PeseeForm.get("tarra").value + this.PeseeForm.get("poidEmballageTotal").value + this.PeseeForm.get("totalPoidNet").value);

				pesee.restePoid = r;
			}
		}
		if (pesee.restePoid < 0 || pesee.restePoid > 0) {
			alert("reste du poid doit etre =0");
		} */ else {
			this.PeseeForm.patchValue({ peseeProduits: this.PeseeProduit });
			console.log("affichage", this.PeseeForm.value);
			this.peseeService.update(pesee).subscribe(
				(data) => {
					console.log("data==============>", data), this.annuler();
				},
				(error) => console.log(error)
			);
		}


	}

	p = 0;


	penalite: number;
	onSelectionChangePE(event) {
		this.penalite = event;
		this.Pesee.penalite += +this.penalite;
		console.log(this.Pesee);

		console.log("apres saisir penalite", this.Pesee.penalite);
		console.log("vehicule ==>", this.PeseeForm.get("vehicule").get("id").value);

		if (event) {
			let selectedTypeV = this.dataImm.filter((item) => item.id == this.PeseeForm.get("vehicule").get("id").value);
			selectedTypeV[0].message = "Ce conducteur a une penalité de" + this.Pesee.penalite + "";
			console.log(selectedTypeV[0]);
			this.vehiculeServ.updateVehicule(selectedTypeV[0]).subscribe(
				(data) => console.log("data==============>", data),
				(error) => console.log(error)
			);


			this.p = JSON.parse(this.PeseeForm.get("taxe").value) + parseInt(event);

			this.PeseeForm.get("taxe").setValue(this.p);
		}
	}
}
