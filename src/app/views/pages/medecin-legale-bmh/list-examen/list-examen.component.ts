import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ExamenService } from "../services/examen.service";

@Component({
	selector: "kt-list-examen",
	templateUrl: "./list-examen.component.html",
	styleUrls: ["./list-examen.component.scss"],
})
export class ListExamenComponent implements OnInit {
	examen: InterfaceExamen[] = [];
	displayedColumns: string[] = ["ID", "Casier", "Deces", "Status", "Date", "actions"];
    id:any;
	constructor(private router: Router, private service: ExamenService,private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.params.subscribe((params) => {
			this.id = +params['id']; 
		});
		this.service.getAll(this.id).subscribe((res) => {
			this.examen = res;

			console.log("examen:",res);
		});
		
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-obstacle"]);
	}
	add() {
		this.router.navigate([`/bmh1/add-examen/${this.id}`]);
	}

	Details(id: any) {
		this.router.navigate(["/bmh1/details-examen/", id]);
	}
	update(id: any) {
		this.router.navigate(["/bmh1/update-examen", id]);
	}
}
export interface InterfaceExamen {
	id: number;
	date: Date;
	typeExamen: string;
	medecinOperant: string;
	status: string;
}
