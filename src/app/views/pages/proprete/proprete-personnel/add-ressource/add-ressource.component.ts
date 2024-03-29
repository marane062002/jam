import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
	selector: "kt-add-ressource",
	templateUrl: "./add-ressource.component.html",
	styleUrls: ["./add-ressource.component.scss"],
})
export class AddRessourceComponent implements OnInit {
	personnelForm: FormGroup;
	constructor(private router: Router,private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.personnelForm = this.formBuilder.group({
			nom: ['', Validators.required],
			prenom: ['', Validators.required],
			ficheCNSS: [''],
			fichePointage: [''],
			fichePersonnelle: ['']
		  });
	}
	onSubmit(){}
	backList() {
		this.router.navigate(["/pages/proprete-personnel/show-personnel"]);
	}
}
