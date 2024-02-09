import { Component, OnInit } from "@angular/core";
import { AffairesConseilService } from "../../shared/affaires-conseil.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";

@Component({
	selector: "kt-ordre-jour-session-form",
	templateUrl: "./ordre-jour-session-form.component.html",
	styleUrls: ["./ordre-jour-session-form.component.scss"],
})
export class OrdreJourSessionFormComponent implements OnInit {
	// =======================================================================
	//
	// =======================================================================
	formData = { nomOrdreJour: "", statut: "مقترح", session: { id: 0,nomSession:"" } };
	sessions;
	//statut = ["مقترح", " موافق عليه من طرف المكتب","موافق عليه من طرف الولاية","مرسل إلى الولاية","محصور"];
	// =======================================================================
	//
	// =======================================================================
	constructor(
		private service: AffairesConseilService,
		private router: Router
	) {}
	// =======================================================================
	//
	// =======================================================================
	ngOnInit() {
		this.service.getSessionOperationnelle().subscribe((data) => {
			this.sessions = data;
		});
	}
	// =======================================================================
	//
	// =======================================================================
	onSubmit(form: NgForm) {
		this.service.sendOrdreJourSession(this.formData).subscribe((res) => {
			console.log(res);
			this.router.navigate(["/affaires-conseil/ordre-jour-session-list"]);
		});
	}
	// =======================================================================
	//
	// =======================================================================
	selectOrderChanged(){
		var session = this.formData.session.nomSession;
		console.log("Order jour session: "+ JSON.stringify(session,null,2));
		this.formData.nomOrdreJour = "جدول أعال دورة-"+session;
	}
}
