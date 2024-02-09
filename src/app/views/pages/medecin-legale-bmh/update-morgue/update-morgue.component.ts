import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { MorgueService } from "../services/morgue.service";
import { InterfaceMorgue } from "../list-morgue/list-morgue.component";

@Component({
	selector: "kt-update-morgue",
	templateUrl: "./update-morgue.component.html",
	styleUrls: ["./update-morgue.component.scss"],
})
export class UpdateMorgueComponent implements OnInit {
	// m:InterfaceType[]=[]
	constructor(private router: Router, private route: ActivatedRoute, private service: MorgueService) {}
	FormArticle = new FormGroup({
		id: new FormControl(""),
		numCasier: new FormControl("", Validators.required),
		numDeces: new FormControl("", Validators.required),
		status: new FormControl("", Validators.required),
	});
    pcj: File;
	ngOnInit() {
		const id = this.route.snapshot.params["id"];
		this.service.getById(id).subscribe(
			(res) => {
				console.log(res);
				this.FormArticle.patchValue({ ...res });
				//
				// const dateFormatee = this.datePipe.transform(this.FormArticle.value.date, 'yyyy-MM-dd');
				// // this.FormArticle.value.date = dateFormatee
				// this.FormArticle.patchValue({date: dateFormatee});
				//
				// console.log(dateFormatee)
				this.FormArticle.value;
			},
			(err) => {
				console.log(err);
			}
		);
		// this.typeService.getAllTypes().subscribe(res=>{
		//   this.type=res;
		// })
	}
	RetourEmbalages() {
		this.router.navigate(["/bmh1/list-morgue"]);
	}

	selectedValueMorgueFunction(p1: InterfaceMorgue, p2: InterfaceMorgue) {
		if (p1 && p2) {
			return p1.id === p2.id;
		}
		return false;
	}
	update() {
		if (this.FormArticle.valid) {
			this.service.update(this.FormArticle.value.id, this.FormArticle.value).subscribe(
				(res) => {
					console.log("Type mis à jour avec succès :", res);
					Swal.fire({
						title: "Enregistrement réussi!",
						text: "Type Examen enregistré avec succès.",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						this.FormArticle.reset();
						this.RetourEmbalages();
						this.ngOnInit(); 
					});
				},
				(err) => {
					console.error("Erreur lors de la mise à jour du type :", err);
					Swal.fire({
						title: "Erreur!",
						text: "Un problème est survenu lors de l'enregistrement du Type examen.",
						icon: "error",
						confirmButtonText: "OK",
					});
				}
			);
		} else {
			console.log("le formulaire est invalide");
		}
	}
}
