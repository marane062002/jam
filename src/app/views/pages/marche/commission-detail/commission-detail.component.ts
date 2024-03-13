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
	idao
	commission = {
		id: 0,
		typeCommission: { id: 0, libelle: "" },
		dateOuveture: null,
		ao: { id: 0 },
	};
	// ===========================================================
	//
	// ===========================================================
	ao
	ngOnInit() {
		 this.activatedRoute.queryParams.subscribe((params) => {
			this.idcommission = params["idcomm"];
			//  this.idao= params["id"];
			
		}); 

		this.service.data$.subscribe(res=>this.idao=res);
		this.service.getAoById(this.idao).subscribe((res)=>{
			this.ao=res
		})
		this.service.getCommissionById(this.idcommission).subscribe((data) => {
			console.log("Commission : "+ JSON.stringify(data,null,2));
			this.commission = data;
			
			this.service.sendData(this.commission.id);

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
		
		this.idao;
		
		this.service.sendData(this.idao);
		this.service.sendData(this.commission.id);

		this.router.navigate(
			["/marches/commission-detail/participants-externes"]
		);
	}
	ShowPET() {
		
		this.idao;
		
		this.service.sendData(this.idao);
		this.service.sendData(this.commission.id);

		this.router.navigate(
			["/marches/commission-detail/participants-externes-technique"]
		);
	}
	// ===========================================================
	//
	// ===========================================================
	ShowPI() {
		this.idao
		this.service.sendData(this.commission.id);

		this.service.sendData(this.idao);
		this.router.navigate(
			["/marches/commission-detail/participants-internes"]
		);
	}

	ShowPIT() {
		this.idao
		this.service.sendData(this.commission.id);

		this.service.sendData(this.idao);
		this.router.navigate(
			["/marches/commission-detail/participants-internes-tehnique"]
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
