import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { FestivaleService } from "../../utils/festivale.service";

@Component({
	selector: "kt-show-festivales",
	templateUrl: "./show-festivales.component.html",
	styleUrls: ["./show-festivales.component.scss"],
})
export class ShowFestivalesComponent implements OnInit {
	id: number;
	details;
	dataSource = new MatTableDataSource<any>();

	constructor(private service: FestivaleService, private route: ActivatedRoute, private router: Router) {}

	ngOnInit() {
		this.id = this.route.snapshot.params["id"];
		this.service.getObjectById("/festivales/showBy/", this.id).subscribe(
			(data) => {
				console.log("12222222222");
				console.log(data);
				this.details = data;
				this.dataSource = new MatTableDataSource(data);
			},

			(error) => {
				console.log(error);
			}
		);
	}
	back() {
		this.router.navigate(["festivales/list-festivales"]);
	}

	editFestivale(id: number) {
		this.id = this.route.snapshot.params["id"];
		this.router.navigate(["festivales/updat-festivales/" + this.id]);
	}
	// Historique
	// ============================================
	showHitory() {
		Swal.fire({
			title: "معلومات",
			icon: "info",
			confirmButtonText: "حسنا",
			html: '<table width="100%" style="direction: rtl;">' + "<tbody>" + '<tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">أنشأ من طرف :</th>' + '<td style="font-size: 15px;" class="donnee_show">' + this.getCreator(this.details.fullName) + "</td>" + '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ الإنشاء :</th>' + '<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.details.creationDate) + "</td>" + '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تاريخ التعديل :</th>' + '<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getDates(this.details.updateDate) + "</td>" + '</tr><tr style="border-bottom: 1px dotted;"><th style="color: #0a447d;">تم التعديل من طرف :</th>' + '<td style="font-size: 15px; direction: initial;" class="donnee_show">' + this.getModificator(this.details.modificateurUser) + "</td>" + "</tr>" + "</tbody>" + "</table>",
		});
	}
	// get Creator
	// ============================================
	getCreator(user): string {
		var result = "لا توجد معلومات";
		if (user != null) {
			result = this.details.fullName;
		}
		return result;
	}
	// ============================================
	// get Modificator
	// ============================================
	getModificator(user): string {
		var result = "لا توجد معلومات";
		if (user != null) {
			result = this.details.modificateurUser;
		}
		return result;
	}
	// ============================================
	// Date format
	// ============================================
	getDates(date): string {
		var result = "لا توجد معلومات";
		if (date != null) {
			result = formatDate(date, "dd/MM/yyyy HH:mm", "ar-MA");
		}
		return result;
	}
}
