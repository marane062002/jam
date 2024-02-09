import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable, ReplaySubject, Subject } from "rxjs";
import { map, startWith, take, takeUntil } from "rxjs/operators";
import { MatDialog, MatSelect, MatSort, MatTable, MatTableDataSource } from "@angular/material";
import { MatPaginator } from "@angular/material/paginator";
import { debug, log } from "console";
import Swal from "sweetalert2";
import { TranslateService } from "@ngx-translate/core";
import { DataSource } from "@angular/cdk/collections";
import { HangarService } from "../../marcheGros/Service/hangar.service";
import { HttpResponse } from "@angular/common/http";
import { Vehicule } from "../../../../core/_base/layout/models/vehicule";
import { VehiculeService } from "../Services/vehicule.service";
import { Produit } from "../../../../core/_base/layout/models/produit";
import { ProduitService } from "../../marcheGros/Service/produit.service";
import { PeseeProduit } from "../../../../core/_base/layout/models/pesee-produit";
import { EmballageService } from "../../marcheGros/Service/emballage.service";
import { Emballage } from "../../../../core/_base/layout/models/emballage";
import { PeseeService } from "../Services/pesee.service";
import { Hangar } from "../../../../core/_base/layout/models/Hangar";
import { IPesee, Pesee } from "../../../../core/_base/layout/models/pesee";
import { AuthService } from "../../../../core/auth";
import { DatePipe } from "@angular/common";

@Component({
	selector: "kt-add-pesee",
	templateUrl: "./add-pesee.component.html",
	styleUrls: ["./add-pesee.component.scss"],
})
export class AddPeseeComponent implements OnInit, AfterViewInit, OnDestroy {
	maxId: number;
	PoidEmbTotal = 0;
	Hangar: Hangar[];
	Emb: Emballage[];
	@ViewChild("exportData", { static: false }) table: MatTable<any>;
	poidsCtrl: FormControl;
	data: Produit[] = [];
	valeur: false;
	columns: any[];
	showButton: boolean = false;

	displayedColumns: string[] = [
		"NumProduit",
		"TypeProduit",
		"Prix",
		"PoidsNet",
		"TypeEmballage",
		"Quantite",
		"Total",
		"actions",
	];

	dataSource = new MatTableDataSource<any>();
	dataSourceAdd = new MatTableDataSource<any>();
	totalPoidNet: any = 0;
	chiffreTransaction: any = 0;
	today: number = Date.now();
	public dataImm: Vehicule[] = [];
	formEntreeUpdate: FormGroup;
	public filteredBanks: Observable<Vehicule[]> = new Observable<Vehicule[]>();
	public prods: Observable<Produit[]> = new Observable<Produit[]>();
	protected _onDestroy = new Subject<void>();
	@ViewChild("singleSelect", { static: true }) singleSelect: MatSelect;
	v: Vehicule;
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

	peseeForm :FormGroup
	constructor(
		private router: Router,
		private translate: TranslateService,
		private hangarService: HangarService,
		private serviceUser: AuthService,
		private vehiculeServ: VehiculeService,
		private prodServ: ProduitService,
		private embServ: EmballageService,
		private fb: FormBuilder, private datePipe: DatePipe,
		private peseeService: PeseeService) {
			const currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-ddTHH:mm');
			this.peseeForm = new FormGroup({

				numBon: new FormControl(),
				date:new FormControl(currentDate),
				poidGlobal: new FormControl("", [Validators.required]),
				numGenre: new FormControl("", [Validators.required]),
				nomConducteur: new FormControl("", [Validators.required]),
				poidEmballageTotal: new FormControl(0, [Validators.required]),
				totalPoidNet: new FormControl({ value: this.totalPoidNet }, [Validators.required]),
				taxe: new FormControl(0, [Validators.required]),
				//numVehicule:new FormControl("", [Validators.required]),
				PeseeProduitForm: new FormGroup({
					quantiteProduit: new FormControl(0, [Validators.required]),
					poidNetProduit: new FormControl(0, [Validators.required]),
					totalProduit: new FormControl(0, [Validators.required]),
					numProduit: new FormControl(0, [Validators.required]),
					TypeProduit: new FormControl(0, [Validators.required]),
					tarif: new FormControl(0, [Validators.required]),
					TypeEmballage: new FormControl(0, [Validators.required]),
				}),
				genre: new FormControl('', [Validators.required]),
		
				vehicule: new FormGroup({
					id: new FormControl("", Validators.required),
				}),
		
				hangar: new FormGroup({
					id: new FormControl("", Validators.required),
				}),
				
				tarra: new FormControl(0, [Validators.required]),
				peseeProduits: new FormControl([]),
				chiffreTransaction: new FormControl(0, Validators.required),
				restePoid: new FormControl(0, Validators.required),
				penalite: new FormControl(0),
				createurUser:new FormControl(window.localStorage.getItem("fullnameUser"))
			});

	}
	inputRequired: boolean;
	inputsEmpty: boolean = true;
	inputs: any;
	Pesee: any
	currentTime: string;
	RestePoid :number
	ngOnInit() {
		
		// this.peseeForm.controls['date'].setValue(this.getCurrentDateTime());

		this.currentTime = this.getCurrentDateTime();

		setInterval(() => {
			this.currentTime = this.getCurrentDateTime();
		}, 60000);


		this.peseeService.getMaxId().subscribe(
			(res) => {
				if (res.body === null) {
					this.maxId = 1;
				}
				else {
					this.maxId = res.body + 1;
				}
			},
			(error: any) => {
				console.error('Error fetching max ID:', error);
			}
		);

		this.hangarService.getAllHangars().subscribe({
			next: (res: HttpResponse<Hangar[]>) => {
				this.Hangar = res.body;
				console.log("hangar", this.Hangar);
			},

			error: () => { },
		});
		this.vehiculeServ.query().subscribe({
			next: (res: HttpResponse<Vehicule[]>) => {
				for (let i = 0; i < res.body.length; i++) {
					res.body[i].numVehicule = "\u202A" +
						res.body[i].numVehiculeNumbers + "\u202A" +
						res.body[i].numVehiculeAlphabet + "\u202C" +
						res.body[i].numVehiculeTwoNumbers
				}

				this.dataImm = res.body;
				let vehicule = this.peseeForm.get("vehicule");

				this.filteredBanks = vehicule.get("id").valueChanges.pipe(
					startWith(""),
					map((value) => this._filter(value || ""))
				);
			},

			error: () => { },
		});

		this.prodServ.getAllProduits().subscribe({
			next: (res: HttpResponse<Produit[]>) => {
				this.data = res.body;
				console.log("les produits================>", this.data);
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
		this.columns = [
			"NumProduit",
			"TypeProduit",
			"Prix",
			"PoidsNet",
			"TypeEmballage",
			"Quantite",
			"Total",
			"action",
		];

		this.RestePoid = 0;
	}
	changeTotalPoidNet(event: any, i: number) {
		this.dataSource.data[i].poidNetProduit = parseInt(event.target.value);
		this.dataSource.data[i].totalProduit = parseInt(event.target.value) * this.dataSource.data[i].produit.tarif;

		this.dataSource = new MatTableDataSource(this.dataSource.data);


	}
	num_genre: boolean = false
	onChangeGenre(e) {
		this.num_genre = true

	}
	ancienchiffretransaction = 0
	calculTotalPoidNet(row) {
		if(this.Edit==false){
			this.ancientotalPoidNet=0;
		}
		this.totalPoidNet = this.dataSource.data.reduce((total, current) => total + parseInt(current.poidNetProduit), 0);
		this.chiffreTransaction = this.dataSource.data.reduce((total, current) => total + parseInt(current.totalProduit), 0);
		this.taxe = (this.chiffreTransaction * 7) / 100;
		this.RestePoid;
		this.totalPoidNet;
		if(this.ancientotalPoidNet!=0 || !isNaN(this.RestePoid)){
		this.RestePoid = this.RestePoid + this.ancientotalPoidNet - row.poidNetProduit;
		}
		if(isNaN(this.RestePoid)){
			this.RestePoid=this.peseeForm.get("poidGlobal").value-this.peseeForm.get("tarra").value-row.poidNetProduit;
		}

		if (this.RestePoid < 0) {
			Swal.fire({
				title: this.translate.instant("le reste doit être supérieur à 0"),

				showCloseButton: true,
			}).then((result) => {
				this.ancientotalPoidNet = row.poidNetProduit;
				this.ancienchiffretransaction = row.totalProduit;
				this.totalPoidNet -= this.ancientotalPoidNet;
				this.chiffreTransaction -= this.ancienchiffretransaction;
				this.taxe = (this.chiffreTransaction * 7) / 100;
				this.RestePoid += this.ancientotalPoidNet;
				row.isEdit = true;
				this.ancientotalPoidNet = 0;
				this.ancienchiffretransaction = 0;

			})
		} else {
			this.RestePoid = this.RestePoid;
			this.calculTotalQuantite(row);
		}
		;
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

	private _filter(value: string): Vehicule[] {

		let list: Vehicule[] = this.dataImm.filter((option) => option.numVehicule.toLowerCase().indexOf(value) > -1);

		this.showButton = list.length === 0;

		return list;
	}


	addvehicule(event: Event) {
		console.log("Click", event);
		this.router.navigate(["pesee/add-vehicule"]);
	}

	selectedVehicule: number;
	onSelectionChangeV(event: any) {
		console.log("event.target vehicule", event.option.value);
		if (event.option.value) {
			let selectedTypeV = this.dataImm.filter((item) => item.id == event.option.value);
			this.selectedVehicule = selectedTypeV[0].tarra;
			this.peseeForm.get("tarra").setValue(this.selectedVehicule);
			console.log("selected vehicule", this.selectedVehicule);
		}
	}
	ancientotalPoidNet = 0
	ancienpoidEmballageProduit = 0
	isEditChange(row) {
		this.ancientotalPoidNet = row.poidNetProduit;
		this.ancienpoidEmballageProduit = row.poidEmballageProduit;
		this.RestePoid;
		row.isEdit = true;
		this.Edit=true;
	}

	editRow(row: PeseeProduit) {

		if (row.id === null) {
			this.peseeForm.value.PeseeProduitForm;

			this.dataSourceAdd.data.push(row);

			row.isEdit = false;

			this.calculTotalPoidNet(row);
		} else {
			this.peseeService.updatePeseeProduit(this.peseeForm.value.PeseeProduitForm)
				.subscribe(() => (row.isEdit = false));
		}

	}

	private fieldArray: PeseeProduit[] = [];
	private newAttribute: any = {};
	currentPeseeIndex: number = -1;
	Edit: boolean = false;
	addEnregistrement() {

		let pp = {
			id: null,
			numBon: this.peseeForm.get("numBon").value,
			produit: new Produit(),
			poidNetProduit: 0,
			emballage: new Emballage(),
			poidEmballageProduit: 0,
			quantiteProduit: 0,
			totalProduit: 0,
			isEdit: true,
		};

		this.dataSource.data = [pp].concat(this.dataSource.data);
		this.Edit=false;
	}

	deleteRow(index) {
		console.log(this.peseeForm.value);
		this.totalPoidNet -= this.dataSource.data[index].poidNetProduit;
		this.poidEmballage -= this.dataSource.data[index].poidEmballageProduit
		this.chiffreTransaction -= this.dataSource.data[index].totalProduit
		this.taxe = (this.chiffreTransaction * 7) / 100
		this.RestePoid = this.RestePoid+ this.dataSource.data[index].poidNetProduit+this.dataSource.data[index].poidEmballageProduit;
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
			this.fieldArray[i].produit = selectedType[0];
			this.fieldArray[i].produit.lib = selectedType[0].lib;
			this.fieldArray[i].produit.tarif = selectedType[0].tarif;
			this.fieldArray[i].produit.refProduit = selectedType[0].refProduit;
			this.dataSource = new MatTableDataSource(this.fieldArray);

		}
	}

	onSelectionChange(event: any, index: number) {

		if (event.option.value != null) {
			let selectedType = this.data.filter(
				(item) => item.refProduit == event.option.value
			);
			this.selecteProduct = "" + selectedType[0].lib;
			this.prix = selectedType[0].tarif;

			this.dataSource.data[index].produit = selectedType[0];

			this.dataSource.data[index].produit.lib = this.selecteProduct;
			this.dataSource.data[index].produit.tarif = this.prix;

			this.dataSource = new MatTableDataSource(this.dataSource.data);
			selectedType = [];

		}
	}

	getvehicule(id: number) {
		const vehicule = this.dataImm.find((vehicule) => vehicule.id === id);
		return vehicule ? vehicule.numVehicule : '';
	}


	sp = 0;
	e: any;
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
	changeTotalQuantite(event: any, i: number) {

		this.dataSource.data[i].poidEmballageProduit = this.dataSource.data[i].emballage.poidEmballage * parseInt(event.target.value);
		this.dataSource.data[i].quantiteProduit = parseInt(event.target.value);



	}
	poidEmballage = 0
	calculTotalQuantite(row) {
		if(this.Edit==false){
			this.ancienpoidEmballageProduit=0;
		}
		this.poidEmballage = this.dataSource.data.reduce((total, current) => total + parseInt(current.poidEmballageProduit), 0);
		this.RestePoid

		this.RestePoid = this.RestePoid + this.ancienpoidEmballageProduit - row.poidEmballageProduit

		if (this.RestePoid < 0) {

			Swal.fire({
				title: this.translate.instant("le reste doit être sup a 0"),

				showCloseButton: true,

			}).then((result) => {
				this.ancienpoidEmballageProduit = row.poidEmballageProduit
				this.RestePoid = this.RestePoid - this.ancienpoidEmballageProduit
				this.poidEmballage -= this.poidEmballage - this.ancienpoidEmballageProduit
				row.isEdit = true
				this.ancienpoidEmballageProduit = 0

			})
		} else {
			this.RestePoid = this.RestePoid
		}
	}
	onSelectionChangeQ(event: number, i: number) {
		this.r;

		this.r += this.sp;

		this.dataSource.data[i].poidEmballageProduit = this.peseeForm.get("poidEmballageTotal").value;

		this.dataSource.data[i].quantiteProduit = event;

		this.dataSource.data[i].poidEmballageProduit = this.e.poidEmballage * event;

		this.sp += +this.e.poidEmballage * event;

		this.r -= this.sp;

		if (this.r >= 0) {
			this.peseeForm.get("poidEmballageTotal").setValue(this.sp);
			this.peseeForm.get("restePoid").setValue(this.r);
		} else {
			this.peseeForm.get("poidEmballageTotal").reset();
			this.peseeForm.get("PeseeProduitForm").get("Quantite").reset();
			this.r += this.sp;

			this.sp -= this.e.poidEmballage * event;
			alert("le reste doit être >0");
		}
	}

	ondeleteQ(event, index: number) {
		this.test2 = 1;
	}

	show: boolean = false;

	r = 0;
	q = 1;
	touched = 0;
	onSelectionChangePT(event: number) {
		if (this.testPt == 0) {
			let t = this.peseeForm.get("tarra").value;
			let tpn = this.peseeForm.get("totalPoidNet").value;
			let pet = this.peseeForm.get("poidEmballageTotal").value;
			this.r = event - (this.peseeForm.get("tarra").value + this.peseeForm.get("totalPoidNet").value + this.peseeForm.get("poidEmballageTotal").value);
			this.RestePoid = event - (this.peseeForm.get("tarra").value + this.peseeForm.get("totalPoidNet").value + this.peseeForm.get("poidEmballageTotal").value);

			if (this.r < 0) {
				Swal.fire({
					title: this.translate.instant("poidGlobal doit être supérieur à tare"),


					showCloseButton: true,

				}).then((result) => {
					this.peseeForm.get("poidGlobal").reset();
					this.peseeForm.get("restePoid").setValue(0);
					this.RestePoid = 0
				})


			} else {
				this.peseeForm.get("restePoid").setValue(this.r);
				this.RestePoid = this.r
			}
		}
	}
	testPt = 0;
	ondeletePT(event) {
		let pg = this.peseeForm.get("poidGlobal").value;
		let t = this.peseeForm.get("tarra").value;
		let tpn = this.peseeForm.get("totalPoidNet").value;
		let pet = this.peseeForm.get("poidEmballageTotal").value;
		let r = event - (this.peseeForm.get("tarra").value + this.peseeForm.get("totalPoidNet").value + this.peseeForm.get("poidEmballageTotal").value);
		if (r > 0) {
			this.peseeForm.get("restePoid").setValue(r);
		} else {
			this.testPt = 1;
			alert("reste du poid <0");
			this.peseeForm.get("poidGlobal").reset();

			this.peseeForm.get("restePoid").setValue(0);
		}
	}
	confirmbox() {
		let pesee: Pesee = {

			numBon: this.maxId,
			numGenre: this.peseeForm.get("numGenre").value,
			nomConducteur: this.peseeForm.get("nomConducteur").value,
			date: this.peseeForm.get("date").value,
			heure: this.peseeForm.get("date").value.split("T")[1],
			poidGlobal: this.peseeForm.get("poidGlobal").value,
			poidEmballageTotal: this.poidEmballage,
			totalPoidNet: this.totalPoidNet,
			genre: this.peseeForm.get('genre').value,
			chiffreTransaction: this.chiffreTransaction,
			taxe: this.taxe,
			vehicule: { id: this.peseeForm.get("vehicule").value.id },
			restePoid: this.RestePoid,
			penalite: this.peseeForm.get("penalite").value,
			hangar: { id: this.peseeForm.get("hangar").value.id },
			peseeProduits: this.dataSource.data,
			createurUser:this.peseeForm.get('createurUser').value
		};

		if (this.RestePoid != 0) {
			Swal.fire({
				title: this.translate.instant("le reste doit être égale à 0"),

				showCloseButton: true,

			}).then((result) => { })
		} else if (this.peseeForm.get("poidGlobal").value < this.peseeForm.get("tarra").value + this.peseeForm.get("totalPoidNet").value + this.peseeForm.get("poidEmballageTotal").value) {
			Swal.fire({
				title: this.translate.instant("poid global doit être supérieur à la somme"),

				showCloseButton: true,

			}).then((result) => { })
		} else {

			let pesee: Pesee = {

				numBon: this.maxId,
				numGenre: this.peseeForm.get("numGenre").value,
				nomConducteur: this.peseeForm.get("nomConducteur").value,
				date: this.peseeForm.get("date").value,
				heure: this.peseeForm.get("date").value.split("T")[1],
				poidGlobal: this.peseeForm.get("poidGlobal").value,
				poidEmballageTotal: this.poidEmballage,
				totalPoidNet: this.totalPoidNet,
				genre: this.peseeForm.get('genre').value,
				chiffreTransaction: this.chiffreTransaction,
				taxe: this.taxe,
				vehicule: { id: this.peseeForm.get("vehicule").value.id },
				restePoid: this.RestePoid,
				penalite: this.peseeForm.get("penalite").value,
				hangar: { id: this.peseeForm.get("hangar").value.id },
				peseeProduits: this.dataSource.data,
				createurUser:this.peseeForm.get('createurUser').value
			};
			this.peseeForm.get("PeseeProduitForm").patchValue({ peseeProduits: this.fieldArray });
			console.log("affichage", pesee);
			console.log("fieldarray final=========>", this.fieldArray);
			this.peseeService.createPesee(pesee).subscribe(
				(data) => {


					console.log("data==============>", data), this.annuler();
				},
				(error) => console.log(error)
			);

		}
	}
	annuler() {
		this.peseeForm.reset();
		this.router.navigate(["pesee/list-pesees"]);
	}

	test = 0;
	test2 = 0;
	ondelete(event: number, index: number) {
		this.test = 1;

		this.r += this.somme;

		this.somme -= this.fieldArray[index].poidNetProduit;

		this.p -= this.fieldArray[index].totalProduit;
		this.fieldArray[index].poidNetProduit = +event;

		this.fieldArray[index].totalProduit = parseFloat("" + event) * this.fieldArray[index].produit.tarif;

		this.peseeForm.get("totalPoidNet").setValue(this.somme);
		this.peseeForm.get("chiffreTransaction").setValue(this.p);

		this.peseeForm.get("restePoid").setValue((this.r -= this.somme));

		this.peseeForm.get("taxe").setValue((this.p * 7) / 100);
		if (this.fieldArray[index].poidNetProduit == 0) {
			this.fieldArray[index].totalProduit = 0;
			this.peseeForm.get("totalPoidNet").setValue(this.somme);
			this.peseeForm.get("chiffreTransaction").setValue(this.fieldArray[index].totalProduit);
			this.peseeForm.get("taxe").setValue(this.peseeForm.get("penalite").value);
		}

		this.dataSource = new MatTableDataSource(this.fieldArray);

	}
	test1() {
		this.test = 0;
	}
	test3() {
		this.test2 = 0;
	}

	somme = 0;
	p = 0;
	taxe = 0;
	onSelectionChangeP(event: any, index: number) {
		this.somme;
		this.r;
		this.fieldArray;

		this.r += this.somme;
		this.somme;
		this.r;


		for (let j = index; j < this.fieldArray.length; j++) {

			this.fieldArray[j].totalProduit = event * this.fieldArray[j].produit.tarif;
			let tpn = this.peseeForm.get("totalPoidNet").value;
			this.somme -= this.somme + this.fieldArray[j].poidNetProduit - parseInt(event);

			this.fieldArray[j].poidNetProduit = event;

			this.p += this.fieldArray[j].totalProduit;
			this.taxe = (this.p * 7) / 100;
			this.r -= this.somme;
		}
		if (this.r >= 0) {
			this.peseeForm.get("chiffreTransaction").setValue(this.p);
			this.peseeForm.get("taxe").setValue(this.taxe);
			this.peseeForm.get("totalPoidNet").setValue(this.somme);
			this.peseeForm.get("restePoid").setValue(this.r);
		} else {
			this.p -= this.fieldArray[index].totalProduit;
			this.peseeForm.get("totalPoidNet").setValue(this.somme - this.fieldArray[index].poidNetProduit);
			this.peseeForm.get("chiffreTransaction").setValue(this.p);
			this.taxe = (this.peseeForm.get("chiffreTransaction").value * 7) / 100;

			this.somme;
			this.r;
			this.fieldArray;
			this.r += this.somme;

			this.somme -= +this.fieldArray[index].poidNetProduit;
			this.fieldArray;

			this.somme;
			this.r;
			this.fieldArray;

			this.peseeForm.get("PeseeProduitForm").get("poidNetProduit").setValue(0);

			this.fieldArray[index].totalProduit = 0;
			this.fieldArray[index].poidNetProduit = 0;

			alert("reste doit être > 0");
		}

		this.dataSource = new MatTableDataSource(this.fieldArray);

	}

	testPoidNet: number = 0;
	somme1: number = 0;
	tpn = 0;
	av;
	testpoidNet(event: any, index: number) {
		if (this.testPoidNet == 0) {
			this.av = +this.peseeForm.get("PeseeProduitForm").get("poidNetProduit").value;
			let av = +this.peseeForm.get("PeseeProduitForm").get("poidNetProduit").value;
			let npn = av - parseInt(this.peseeForm.get("PeseeProduitForm").get("poidNetProduit").value) + parseInt(event);

			console.log(npn);

			for (let j = index; j < this.fieldArray.length; j++) {
				this.fieldArray[j].totalProduit = event * this.fieldArray[j].produit.tarif;
				this.tpn += +event;
				this.somme1 += this.fieldArray[j].totalProduit;
			}
		}

		;
	}
	deleteTestPoidNet(event: any, index: number) {
		this.testPoidNet = 1;
		let av = +this.peseeForm.get("PeseeProduitForm").get("poidNetProduit").value;
		this.av;
		for (let j = index; j < this.fieldArray.length; j++) {
			this.fieldArray[j].totalProduit = event * this.fieldArray[j].produit.tarif;
			this.tpn += +event - this.av;
			;
			this.somme1 += this.fieldArray[j].totalProduit;
		}
	}

	ondeleteT(event, index: number) {
		this.peseeForm.get("chiffreTransaction").setValue(0);
		this.peseeForm.get("taxe").setValue(0);
	}
}
