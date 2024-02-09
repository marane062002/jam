import { Component, OnInit, ViewChild } from "@angular/core";
import { ConsultationService } from "../../shared/consultation.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { forkJoin } from "rxjs";
import { flatMap } from "rxjs/operators";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";

@Component({
	selector: "kt-lign-commande-consultation",
	templateUrl: "./lign-commande-consultation.component.html",
	styleUrls: ["./lign-commande-consultation.component.scss"],
})
export class LignCommandeConsultationComponent implements OnInit {
	dataSource: MatTableDataSource<any>;
	constructor(
		private service: ConsultationService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	@ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
	@ViewChild(MatSort, { static: true }) sort: MatSort;
	displayedColumns = [
		"type",
		"article",
		"intituleService",
		"isForfait",
		"prixUnitaire",
		"quantite",
		"prixTotal",
		"actions",
	];
	tvaLocal = 0;
	idConsultation;
	formData = {
		article: { id: 0 },
		isForfait: null,
		prixTotal: 0,
		prixUnitaire: 0,
		prixTtc: 0,
		tva: 0,
		quantite: 1,
		commande: { id: 0 },
		unite: "",
		type: "",
		intituleService: "",
	};
	frmLigne = true;
	showArticleRef = false;
	showIntitulService = false;
	articles;
	consultation = { commande: { id: 0 } };
	commande = { id: -1, tva: 0, mntTotal: 0, mntTtc: 0 };
	unites = [
		{ id: 1, libelle: "جزافي" },
		{ id: 2, libelle: "عددي" },
	];
	dataArray = [];
	type = ["طلب غرض", "طلب خدمة"];
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idConsultation = params["id"];
		});
		forkJoin(
			this.service.getAllArticles(),
			this.service.getConsultationById(this.idConsultation)
		).subscribe((res) => {
			this.populate(res[0], res[1]);
		});
		/* this.service.getAllArticles().subscribe(data => {
      this.articles=data;
      this.dataArray=data;
     });*/
	}

	populate(a, b) {
		this.articles = a;
		this.dataArray = a;
		this.consultation = b;
		if (b.commande != null) {
			this.service
				.getAllLigneCommandes(b.commande.id)
				.subscribe((res7) => {
					console.log("in here");
					for (var i = 0; i < res7.length; i++) {
						if (res7[i].article == null) {
							res7[i].article = { numRef: "", libelle: "" };
						}
					}
					console.log(res7);
					this.dataSource = new MatTableDataSource(res7);
					this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
					this.paginator._intl.nextPageLabel = "الصفحة التالية";
					this.paginator._intl.previousPageLabel = "الصفحة السابقة";
					this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
					this.paginator._intl.firstPageLabel = "الصفحة الأولى";
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
				});
			this.commande = b.commande;
		} else {
			this.consultation.commande = { id: 0 };
		}
	}

	onKey(value) {
		this.dataArray = [];
		this.selectSearch(value);
	}
	selectSearch(value) {
		console.log(this.dataArray);
		let filter = value;
		for (let i = 0; i < this.articles.length; i++) {
			let option = this.articles[i].libelle;
			if (
				option.toLowerCase().indexOf(filter) >= 0 ||
				option.toUpperCase().indexOf(filter) >= 0
			) {
				console.log("in if");
				this.dataArray.push(this.articles[i]);
				console.log(this.dataArray);
			}
		}
	}

	applyFilter(filterValue: string) {
		filterValue = filterValue.trim(); // Remove whitespace
		filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
		this.dataSource.filter = filterValue;
	}

	onChangeofOptionsType(a) {
		if (a.value == "طلب خدمة") {
			this.showArticleRef = false;
			this.showIntitulService = true;
		} else {
			this.showIntitulService = false;
			this.showArticleRef = true;
		}
	}

	onChangeofOptionsUnite(a) {
		if (a.value == 2) {
			document.getElementById("qte").style.display = "inline";
			this.formData.isForfait = false;
		} else {
			document.getElementById("qte").style.display = "none";
			this.formData.isForfait = true;
		}
	}

	onChangeofOptions1(a) {
		this.formData.article.id = a.value;
	}

	nouvelleLigne() {
		document.getElementById("frmLigne").style.display = "inline";
	}

	onSubmit(form: NgForm) {
		this.showArticleRef = false;
		this.showIntitulService = false;
		document.getElementById("qte").style.display = "none";
		console.log(this.commande);
		this.formData.tva = this.formData.tva * 1;
		this.formData.prixUnitaire = this.formData.prixUnitaire * 1;
		if (this.formData.article.id == 0) {
			this.formData.article = null;
		}
		this.formData.prixTotal =
			this.formData.prixUnitaire * this.formData.quantite;
		var ttTva = (this.formData.prixTotal * this.formData.tva) / 100;
		this.formData.prixTtc = this.formData.prixTotal + ttTva;
		this.commande.mntTotal =
			this.commande.mntTotal + this.formData.prixTotal;
		this.commande.mntTtc = this.commande.mntTtc + this.formData.prixTtc;
		if (this.commande.id == -1) {
			console.log("in - 1");
			this.service.sendCommande(this.commande).subscribe((res3) => {
				this.consultation.commande.id = res3.id;
				this.commande.id = res3.id;
				console.log(this.consultation);
				this.service
					.addCommandeConsultation(this.consultation)
					.subscribe((res4) => {
						this.formData.commande.id = res3.id;
						console.log(this.formData);
						this.service
							.sendLigneCommande(this.formData)
							.subscribe((res5) => {
								console.log(res5);
								this.populate1(res3);
							});
					});
			});
		} else {
			console.log("in ELSE");
			this.service.sendCommande(this.commande).subscribe((res3) => {
				this.formData.commande.id = res3.id;
				console.log(this.formData);
				this.service
					.sendLigneCommande(this.formData)
					.subscribe((res5) => {
						console.log(res5);
						this.populate1(res3);
					});
			});
		}
	}

	populate1(b) {
		console.log(b);
		this.formData = {
			article: { id: 0 },
			isForfait: null,
			prixTotal: 0,
			prixUnitaire: 0,
			prixTtc: 0,
			tva: 0,
			quantite: 1,
			commande: { id: 0 },
			unite: "",
			type: "",
			intituleService: "",
		};

		document.getElementById("frmLigne").style.display = "none";
		this.service.getAllLigneCommandes(b.id).subscribe((res7) => {
			for (var i = 0; i < res7.length; i++) {
				if (res7[i].article == null) {
					res7[i].article = { numRef: "", libelle: "" };
				}
			}
			this.dataSource = new MatTableDataSource(res7);
			this.paginator._intl.itemsPerPageLabel = "مصفوفة لكل صفحة";
			this.paginator._intl.nextPageLabel = "الصفحة التالية";
			this.paginator._intl.previousPageLabel = "الصفحة السابقة";
			this.paginator._intl.lastPageLabel = "الصفحة الأخيرة";
			this.paginator._intl.firstPageLabel = "الصفحة الأولى";
			this.dataSource.paginator = this.paginator;
			this.dataSource.sort = this.sort;
		});
	}
}
