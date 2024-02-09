import { Component, OnInit } from "@angular/core";
import { AttestationService } from "../../services/attestation.service";
import { PersonnelService } from "../../services/personnel.service";
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import * as $ from "jquery";
import { environment } from "../../../../../../environments/environment";

@Component({
	selector: "kt-attestation-show",
	templateUrl: "./attestation-show.component.html",
	styleUrls: ["./attestation-show.component.scss"],
})
export class AttestationShowComponent implements OnInit {
	isloading = false;
	loading = false;
	id: number;
	pjs: any;
	demande: any;
	personnel: any;

	pjsForm: FormGroup;
	public uploadPjsFiles: Array<File>;
	constructor(
		private serviceAttestation: AttestationService,
		private servicePersonnel: PersonnelService,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.route.queryParams.subscribe((params) => {
			this.id = params["id"];
		});

		this.getAttestation(this.id);
	}

	ngOnInit() {
		this.pjsForm = this.fb.group({
			_file: [],
		});

		$(function () {
			// We can attach the `fileselect` event to all file inputs on the page
			$(document).on("change", ":file", function () {
				var input = $(this),
					numFiles = input.get(0).files
						? input.get(0).files.length
						: 1,
					label =  (new String(input.val())).replace(/\\/g, "/").replace(/.*\//, "");
				input.trigger("fileselect", [numFiles, label]);
			});

			// We can watch for our custom `fileselect` event like this
			$(document).ready(function () {
				$(":file").on("fileselect", function (event, numFiles, label) {
					var input = $(this).parents(".input-group").find(":text"),
						log = numFiles > 1 ? numFiles + " وثائق مختارة" : label;

					if (input.length) {
						input.val(log);
					} else {
						if (log) alert(log);
					}
				});
			});
		});
	}
	getAttestation(id) {
		this.serviceAttestation.getDataShowAttestation(id).then(
			(data) => {
				this.demande = data[0];
				console.log('DataShow: '+ JSON.stringify(this.demande,null,2))
				/*
				this.pjs = data[1];
				console.log(this.pjs);
				if (this.demande)
					this.servicePersonnel
						.getPersonnelById(this.demande.idPersonnel)
						.then((p) => {
							this.personnel = p;
						});
						*/
			},
			(error) => console.log(error)
		);
	}
	public delete(id: number) {
		this.serviceAttestation
			.deleteRessource(id, "/demandes/delete/")
			.subscribe(
				(data) => {
					console.log(data),
						this.router.navigate(["attestation/attestation-index"]);
				},
				(error) => console.log(error)
			);
	}
	cancel() {
		this.isloading = true;
		this.serviceAttestation.cancelDemande(this.demande, this.id).subscribe(
			(data) => {
				this.router.navigate(["attestation/attestation-index"]);
			},
			(error) => console.log(error)
		);
	}

	validate() {
		this.router.navigate(["/attestation/attestation-validate"], {
			queryParams: { id: this.id },
		});
	}
	update() {
		this.router.navigate(["/attestation/attestation-edit"], {
			queryParams: { id: this.id },
		});
	}

	add_copie_attestation(id) {
		if (this.uploadPjsFiles) {
			this.loading = true;

			this.serviceAttestation
				.updloadFileAttestation(this.uploadPjsFiles, id)
				.then(
					(resp) => {},
					(error) => {
						console.log(error);
					}
				);
			location.reload();
		}
	}
	onClickPjName(e, id) {
		console.log("You clicked: " + e);
		var r = e.substring(0, e.length - 4);

		window.open(environment.API_ALFRESCO_URL + "/PjAttestations/" + r, "_blank");
	}

	// ============================================
	// Upload file event
	// ============================================
	fileChange(event) {
		this.uploadPjsFiles = event.target.files;

		if (event.target.files.length > 0) {
			console.log("target : " + event.target.files.length);
			this.pjsForm.patchValue(this.uploadPjsFiles);
			console.log("OK get");
		}
	}

	printInvoice() {
		window.print();
/*
	this.serviceAttestation.printInvoice().subscribe((response) => {
	  //console.log('OUT: '+ JSON.stringify(response,null,2))
	  const file = new Blob([response], { type: 'application/pdf' });
	  const fileURL = URL.createObjectURL(file);
	  window.open(fileURL);
	});
	*/
	}

	printGenerator() :void{
		this.serviceAttestation.PrintGenerator(1).subscribe((res) =>{
			const file = new Blob([res as unknown as BlobPart], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL);
		})
	}
}
