import { Component, OnInit } from "@angular/core";
import { AoService } from "../../shared/ao.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
	selector: "kt-commission-detail",
	templateUrl: "./commission-detail.component.html",
	styleUrls: ["./commission-detail.component.scss"],
})
export class CommissionDetailComponent implements OnInit {
	// ===========================================================
	//
	// ===========================================================
	constructor(
		private service: AoService,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) {}
	// ===========================================================
	//
	// ===========================================================
	idcommission;
	commission = {
		id: 0,
		typeCommission: { id: 0, libelle: "" },
		dateOuveture: null,
		ao: { id: 0 },
	};
	// ===========================================================
	//
	// ===========================================================
	ngOnInit() {
		this.activatedRoute.queryParams.subscribe((params) => {
			this.idcommission = params["id"];
		});
		this.service.getCommissionById(this.idcommission).subscribe((data) => {
			console.log("Commission : "+ JSON.stringify(data,null,2));
			this.commission = data;
		});
	}
	// ===========================================================
	//
	// ===========================================================
	ShowOffreDeposee() {
		console.log(this.commission);
		this.router.navigate(["/marches/commission-detail/offres-deposees"], {
			queryParams: {
				id: this.commission.ao.id,
				typecommission: this.commission.typeCommission.id,
			},
		});
	}
	// ===========================================================
	//
	// ===========================================================
	ShowPE() {
		this.router.navigate(
			["/marches/commission-detail/participants-externes"],
			{ queryParams: { id: this.commission.id } }
		);
	}
	// ===========================================================
	//
	// ===========================================================
	ShowPI() {
		this.router.navigate(
			["/marches/commission-detail/participants-internes"],
			{ queryParams: { id: this.commission.id } }
		);
	}
		// ==================================================================
	//
	// ==================================================================
	backList(id){
		this.router.navigate(["/marches/ao-detail"], {
			queryParams: { id: id },
		});
	}
}
